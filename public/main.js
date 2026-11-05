// Start the app. `Component` is declared in app.js (a classic script shares its top-level scope).

// Anchor jumps stop just below the pinned banner + nav, whatever height they have right now
// (the banner can be dismissed and the nav changes height at phone widths).
function syncStickyOffset(root) {
  var coc = root.querySelector('.coc');
  var bar = root.querySelector('.stickytop');
  if (coc && bar) coc.style.setProperty('--sticky-h', bar.offsetHeight + 'px');
}

var app = document.getElementById('app');
mountDC(Component, {
  root: app,
  template: document.getElementById('tpl').textContent,
  props: { theme: 'auto' },
  onRender: function (root) {
    syncStickyOffset(root);
    // keep the page background in step with the light/dark theme so overscroll matches
    var coc = root.querySelector('.coc');
    if (coc) document.body.style.background = getComputedStyle(coc).getPropertyValue('--paper');
  }
});
window.addEventListener('resize', function () { syncStickyOffset(app); });
