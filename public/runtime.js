/*
 * Tiny template runtime for Cities of Champions.
 *
 * The page markup (in index.html, <script id="tpl">) uses three constructs:
 *   {{dotted.path}}                       a value from renderVals()
 *   <sc-if value="{{path}}">...</sc-if>   render the body when truthy
 *   <sc-for list="{{path}}" as="x">...</sc-for>   repeat the body for each item
 * plus on* attributes whose value is a function, e.g. onClick="{{item.pick}}".
 *
 * Each state change re-renders the template to a string and morphs it into the
 * live DOM (morphdom), so focus, scroll positions and in-progress drags survive.
 */
(function () {
  'use strict';

  var EVENTS = {
    onclick: 'click',
    onchange: 'change',
    ondragstart: 'dragstart',
    ondragover: 'dragover',
    ondragleave: 'dragleave',
    ondrop: 'drop',
    ondragend: 'dragend',
    onkeydown: 'keydown'
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---- compile: split the template on <sc-if>/<sc-for> into a small tree
  function compile(src) {
    var re = /<(\/?)sc-(for|if)\b([^>]*)>/g;
    var root = { kids: [] };
    var stack = [root];
    var last = 0;
    var m;
    while ((m = re.exec(src))) {
      if (m.index > last) stack[stack.length - 1].kids.push({ type: 'text', s: src.slice(last, m.index) });
      last = re.lastIndex;
      if (m[1] === '/') { stack.pop(); continue; }
      var attrs = {};
      m[3].replace(/([\w:-]+)="([^"]*)"/g, function (_, k, v) { attrs[k] = v; return ''; });
      var node = {
        type: m[2],
        path: (attrs[m[2] === 'for' ? 'list' : 'value'] || '').replace(/[{}\s]/g, ''),
        as: attrs.as,
        kids: []
      };
      stack[stack.length - 1].kids.push(node);
      stack.push(node);
    }
    if (last < src.length) root.kids.push({ type: 'text', s: src.slice(last) });
    return root;
  }

  function get(scope, path) {
    var parts = path.split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length && v !== null && v !== undefined; i++) v = v[parts[i]];
    return v;
  }

  function renderText(s, scope, ctx) {
    // attributes whose whole value is one hole: handlers, booleans, strings
    s = s.replace(/(\s)([\w:.-]+)="\{\{\s*([\w$.]+)\s*\}\}"/g, function (all, sp, name, path) {
      var v = get(scope, path);
      var ev = EVENTS[name.toLowerCase()];
      if (ev) {
        if (typeof v !== 'function') return '';
        ctx.handlers.push(v);
        return sp + 'data-ev-' + ev + '="' + (ctx.handlers.length - 1) + '"';
      }
      if (typeof v === 'boolean') {
        if (name.indexOf('aria-') === 0) return sp + name + '="' + v + '"';
        return v ? sp + name : '';
      }
      if (v === null || v === undefined) return '';
      return sp + name + '="' + esc(v) + '"';
    });
    // every other hole is interpolated text
    return s.replace(/\{\{\s*([\w$.]+)\s*\}\}/g, function (all, path) {
      var v = get(scope, path);
      return v === null || v === undefined ? '' : esc(v);
    });
  }

  function renderNodes(kids, scope, ctx) {
    var out = '';
    for (var k = 0; k < kids.length; k++) {
      var n = kids[k];
      if (n.type === 'text') {
        out += renderText(n.s, scope, ctx);
      } else if (n.type === 'if') {
        if (get(scope, n.path)) out += renderNodes(n.kids, scope, ctx);
      } else if (n.type === 'for') {
        var list = get(scope, n.path) || [];
        for (var i = 0; i < list.length; i++) {
          var child = Object.create(scope);
          child[n.as] = list[i];
          child.$index = i;
          out += renderNodes(n.kids, child, ctx);
        }
      }
    }
    return out;
  }

  // ---- component base class: this.props, this.state, setState, forceUpdate
  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (p) {
    var next = typeof p === 'function' ? p(this.state, this.props) : p;
    if (next === null || next === undefined) return;
    this.state = Object.assign({}, this.state, next);
    this.forceUpdate();
  };
  DCLogic.prototype.forceUpdate = function () {
    if (this.__schedule) this.__schedule();
  };

  // ---- mount: render now, re-render (batched per microtask) on every setState
  function mountDC(Component, opts) {
    var root = opts.root;
    var tree = compile(opts.template);
    var inst = new Component(opts.props || {});
    var handlers = [];
    var queued = false;

    function render() {
      queued = false;
      var ctx = { handlers: [] };
      var html;
      try {
        html = renderNodes(tree.kids, inst.renderVals(), ctx);
      } catch (err) {
        console.error('render failed', err);
        return;
      }
      handlers = ctx.handlers;
      morphdom(root, '<div id="' + root.id + '">' + html + '</div>', { childrenOnly: true });
      // a select's value is not an attribute: apply the one the template asked for
      var sels = root.querySelectorAll('select[value]');
      for (var i = 0; i < sels.length; i++) sels[i].value = sels[i].getAttribute('value');
      if (opts.onRender) opts.onRender(root, inst);
    }

    inst.__schedule = function () {
      if (queued) return;
      queued = true;
      Promise.resolve().then(render);
    };

    // event delegation: walk up from the target like a bubbling handler would
    function dispatch(type, e) {
      var el = e.target;
      var stopped = false;
      while (el && el !== root.parentNode && !stopped) {
        if (el.nodeType === 1 && el.hasAttribute('data-ev-' + type)) {
          var fn = handlers[+el.getAttribute('data-ev-' + type)];
          if (fn) {
            fn({
              type: e.type,
              target: e.target,
              currentTarget: el,
              key: e.key,
              relatedTarget: e.relatedTarget,
              dataTransfer: e.dataTransfer,
              preventDefault: function () { e.preventDefault(); },
              stopPropagation: function () { stopped = true; e.stopPropagation(); }
            });
          }
        }
        el = el.parentNode;
      }
    }
    ['click', 'dragstart', 'dragover', 'dragleave', 'drop', 'dragend', 'keydown'].forEach(function (t) {
      root.addEventListener(t, function (e) { dispatch(t, e); });
    });
    // "onChange": sliders report live while dragging, selects report on commit
    root.addEventListener('input', function (e) { if (e.target.tagName === 'INPUT') dispatch('change', e); });
    root.addEventListener('change', function (e) { if (e.target.tagName === 'SELECT') dispatch('change', e); });

    render();
    if (inst.componentDidMount) inst.componentDidMount();
    window.addEventListener('pagehide', function () { if (inst.componentWillUnmount) inst.componentWillUnmount(); });
    return inst;
  }

  window.DCLogic = DCLogic;
  window.mountDC = mountDC;
})();
