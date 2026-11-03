import { createContext, useContext, useEffect, useState } from 'react';
import { events as startingEvents, makeSampleOrders, products } from './data.js';

const StoreContext = createContext(null);

// Drop anything saved in an old cart that is no longer for sale, or isn't a sensible quantity.
function cleanCart(saved) {
  const cart = {};
  if (!saved || typeof saved !== 'object') return cart;
  for (const p of products) {
    const n = saved[p.id];
    if (Number.isInteger(n) && n > 0) cart[p.id] = n;
  }
  return cart;
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function defaultEvents() {
  return startingEvents.map((ev, i) => ({ id: 'e' + (i + 1), repeat: 'weekly', time: '', fee: '', ...ev }));
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Theme and cart live here so they carry across pages and reloads.
export function StoreProvider({ children }) {
  const [dark, setDark] = useState(() => load('theme-dark', true));
  const [cart, setCart] = useState(() => cleanCart(load('cart', {})));
  // Orders are kept in this browser only until a real database is connected (see README).
  const [orders, setOrders] = useState(() => {
    const saved = load('orders', null);
    return Array.isArray(saved) ? saved : makeSampleOrders();
  });

  useEffect(() => {
    save('theme-dark', dark);
    // Colours the phone's browser bar (Android Chrome, iPhone Safari) to match the page.
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#121417' : '#F7F8FA');
  }, [dark]);
  useEffect(() => save('cart', cart), [cart]);
  // Staff can add and edit events on the admin page. Until then everyone sees the events in data.js.
  const [events, setEvents] = useState(() => {
    const saved = load('events', null);
    return Array.isArray(saved) ? saved : defaultEvents();
  });

  useEffect(() => save('orders', orders), [orders]);
  // Show orders placed in another tab straight away, e.g. the shop open in one tab and admin in another.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'orders') {
        const saved = load('orders', []);
        setOrders(Array.isArray(saved) ? saved : []);
      } else if (e.key === 'events') {
        const saved = load('events', null);
        setEvents(Array.isArray(saved) ? saved : defaultEvents());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setQty = (id, n) => setCart((c) => {
    const next = { ...c };
    if (n <= 0) delete next[id]; else next[id] = n;
    return next;
  });

  const addOrder = (order) => {
    const id = Date.now().toString(36).slice(-6).toUpperCase();
    setOrders((os) => [{ ...order, id, placedAt: new Date().toISOString(), status: 'to-pack', packed: [] }, ...os]);
    return id;
  };

  // Events are saved only when staff change them (not on every visit), so edits to data.js still reach visitors.
  const changeEvents = (fn) => setEvents((es) => {
    const next = fn(es);
    save('events', next);
    return next;
  });

  const value = {
    dark,
    toggleTheme: () => setDark((d) => !d),
    cart,
    setQty,
    clearCart: () => setCart({}),
    cartCount: Object.values(cart).reduce((a, n) => a + n, 0),
    orders,
    addOrder,
    updateOrder: (id, patch) => setOrders((os) => os.map((o) => (o.id === id ? { ...o, ...patch } : o))),
    clearSampleOrders: () => setOrders((os) => os.filter((o) => !o.sample)),
    events,
    addEvent: (ev) => changeEvents((es) => [...es, { ...ev, id: 'e' + Date.now().toString(36), taken: 0 }]),
    updateEvent: (id, patch) => changeEvents((es) => es.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev))),
    deleteEvent: (id) => changeEvents((es) => es.filter((ev) => ev.id !== id)),
    resetEvents: () => {
      try { localStorage.removeItem('events'); } catch {}
      setEvents(defaultEvents());
    }
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

export function useTitle(title) {
  useEffect(() => { document.title = title; }, [title]);
}
