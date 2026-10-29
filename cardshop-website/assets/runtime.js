/* Tiny runtime that powers the interactive parts of each page.
   Each page defines a Component class with state and renderVals(),
   and the markup uses {{name}} placeholders, data-if, data-for and data-click. */
class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; }
  setState(patch) {
    this.state = Object.assign({}, this.state, patch);
    if (patch && Object.prototype.hasOwnProperty.call(patch, 'dark') && patch.dark !== null) {
      try { localStorage.setItem('theme-dark', patch.dark ? '1' : '0'); } catch (e) {}
    }
    if (this._render) this._render();
  }
}

const DC = (function () {
  const RE = /\{\{([^}]+)\}\}/g;
  const BOOL = ['disabled', 'checked', 'hidden'];
  function get(scope, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), scope);
  }
  function interp(str, scope) {
    return str.replace(RE, (m, p) => { const v = get(scope, p); return v == null ? '' : String(v); });
  }
  function single(str) { const m = str.match(/^\s*\{\{([^}]+)\}\}\s*$/); return m ? m[1] : null; }

  function setAttr(el, name, tpl, scope) {
    const key = single(tpl);
    if (BOOL.indexOf(name) !== -1 && key) {
      const v = get(scope, key);
      if (v && v !== 'false') el.setAttribute(name, ''); else el.removeAttribute(name);
      if (name === 'checked') el.checked = !!v;
      return;
    }
    el.setAttribute(name, interp(tpl, scope));
  }

  // Bind a list item once (no re-binding needed; lists are rebuilt on every render).
  function bindOnce(frag, scope) {
    const walker = document.createTreeWalker(frag, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      if (n.nodeType === 3) { if (n.nodeValue.indexOf('{{') !== -1) n.nodeValue = interp(n.nodeValue, scope); return; }
      Array.from(n.attributes).forEach((a) => { if (a.value.indexOf('{{') !== -1) setAttr(n, a.name, a.value, scope); });
      wire(n, () => scope);
    });
  }

  function wire(el, getScope) {
    [['data-click', 'click'], ['data-input', 'input']].forEach(([attr, ev]) => {
      const key = el.getAttribute(attr);
      if (!key) return;
      el.addEventListener(ev, (e) => { const f = get(getScope(), key); if (typeof f === 'function') f(e); });
    });
  }

  function mount(Component, props) {
    const comp = new Component(props);
    try {
      const saved = localStorage.getItem('theme-dark');
      if (saved !== null && 'dark' in comp.state) comp.state.dark = saved === '1';
    } catch (e) {}
    let vals = {};
    const attrs = [], texts = [], ifs = [], lists = [];
    const root = document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (n.nodeType === 3) { if (n.nodeValue.indexOf('{{') !== -1) texts.push({ n, tpl: n.nodeValue }); continue; }
      if (n.tagName === 'SCRIPT') continue;
      if (n.tagName === 'TEMPLATE' && n.hasAttribute('data-for')) {
        lists.push({ t: n, key: n.getAttribute('data-for'), as: n.getAttribute('data-as') || 'item', nodes: [] });
        continue;
      }
      Array.from(n.attributes).forEach((a) => { if (a.value.indexOf('{{') !== -1) attrs.push({ el: n, name: a.name, tpl: a.value }); });
      if (n.hasAttribute('data-if')) ifs.push({ el: n, key: n.getAttribute('data-if') });
      wire(n, () => vals);
    }
    function render() {
      vals = comp.renderVals();
      attrs.forEach((b) => setAttr(b.el, b.name, b.tpl, vals));
      texts.forEach((b) => { b.n.nodeValue = interp(b.tpl, vals); });
      ifs.forEach((b) => { b.el.hidden = !get(vals, b.key); });
      lists.forEach((b) => {
        b.nodes.forEach((x) => x.remove());
        b.nodes = [];
        (get(vals, b.key) || []).forEach((item) => {
          const scope = Object.assign({}, vals); scope[b.as] = item;
          const frag = b.t.content.cloneNode(true);
          bindOnce(frag, scope);
          b.nodes.push(...Array.from(frag.childNodes));
          b.t.parentNode.insertBefore(frag, b.t);
        });
      });
    }
    comp._render = render;
    render();
  }
  return { mount };
})();
