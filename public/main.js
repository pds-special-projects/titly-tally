// Start the app. `Component` is declared in app.js (a classic script shares its top-level scope).
mountDC(Component, {
  root: document.getElementById('app'),
  template: document.getElementById('tpl').textContent,
  props: { theme: 'auto' },
  // keep the page background in step with the light/dark theme so overscroll matches
  onRender: function (root) {
    var coc = root.querySelector('.coc');
    if (coc) document.body.style.background = getComputedStyle(coc).getPropertyValue('--paper');
  }
});
