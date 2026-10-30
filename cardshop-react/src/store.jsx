import { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Theme and cart live here so they carry across pages and reloads.
export function StoreProvider({ children }) {
  const [dark, setDark] = useState(() => load('theme-dark', true));
  const [cart, setCart] = useState(() => load('cart', {}));

  useEffect(() => {
    save('theme-dark', dark);
    // Colours the phone's browser bar (Android Chrome, iPhone Safari) to match the page.
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#121417' : '#F7F8FA');
  }, [dark]);
  useEffect(() => save('cart', cart), [cart]);

  const setQty = (id, n) => setCart((c) => {
    const next = { ...c };
    if (n <= 0) delete next[id]; else next[id] = n;
    return next;
  });

  const value = {
    dark,
    toggleTheme: () => setDark((d) => !d),
    cart,
    setQty,
    clearCart: () => setCart({}),
    cartCount: Object.values(cart).reduce((a, n) => a + n, 0)
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

export function useTitle(title) {
  useEffect(() => { document.title = title; }, [title]);
}
