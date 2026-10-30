import { useState } from 'react';
import { Link } from 'react-router';
import { products } from '../data.js';
import { useStore, useTitle } from '../store.jsx';
import { CheckCircle, LockIcon } from '../components/Icons.jsx';
import { ChipGroup, Field, ImagePlaceholder } from '../components/ui.jsx';

const GAMES = ['All', 'Pokémon', 'Magic', 'Yu-Gi-Oh!', 'One Piece', 'Lorcana'];
const TYPES = ['All', 'Singles', 'Sealed', 'Supplies', 'Pre-orders'];

const plural = (n) => n + (n === 1 ? ' item' : ' items');

function useCartItems() {
  const { cart } = useStore();
  const items = products.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] }));
  return { items, count: items.reduce((a, c) => a + c.qty, 0) };
}

function ProductCard({ p }) {
  const { cart, setQty } = useStore();
  const n = cart[p.id] || 0;
  const label = n ? `In cart (${n}) · Add 1` : (p.type === 'Pre-orders' ? 'Pre-order' : 'Add to cart');
  return (
    <article className="panel cut stack" style={{ padding: 12, gap: 12 }}>
      <ImagePlaceholder ratio={p.ratio} iconSize={28} />
      <div className="stack" style={{ gap: 3 }}>
        <span className="small-caps" style={{ fontSize: 11, letterSpacing: '0.1em' }}>{p.game} · {p.type}</span>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{p.name}</h3>
        <span className="muted" style={{ fontSize: 13 }}>{p.detail}</span>
      </div>
      <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)' }}>
        <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink-accent)' }}>[PRICE]</span>
        <span className="muted" style={{ fontSize: 12 }}>{p.stock}</span>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        style={{ fontSize: 13, letterSpacing: '0.06em', minHeight: 44, padding: 0, ...(n ? { background: 'transparent', color: 'var(--ink-accent)', border: '1px solid var(--ink-accent)' } : {}) }}
        onClick={() => setQty(p.id, n + 1)}
      >
        {label}
      </button>
    </article>
  );
}

function Cart({ onCheckout }) {
  const { setQty } = useStore();
  const { items, count } = useCartItems();
  return (
    <aside id="cart" aria-label="Your cart" className="panel cut stack side-panel cart-panel" style={{ flex: '1 1 300px', minWidth: 0, padding: 22, gap: 16 }}>
      <div className="row" style={{ alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your cart</h2>
        <span className="muted" style={{ fontSize: 13 }}>{plural(count)}</span>
      </div>
      {count === 0 && (
        <p className="muted" style={{ padding: 16, border: '1px dashed var(--line2)', fontSize: 14 }}>Your cart is empty. Tap “Add to cart” on any item.</p>
      )}
      <ul className="stack" style={{ margin: 0, padding: 0, listStyle: 'none', gap: 12 }}>
        {items.map((c) => (
          <li key={c.id} className="stack" style={{ gap: 8, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <div className="stack" style={{ minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                <span className="muted" style={{ fontSize: 12 }}>{c.game} · {c.type}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>[PRICE]</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)' }}>
                <button type="button" aria-label="Decrease quantity" style={qtyBtn} onClick={() => setQty(c.id, c.qty - 1)}>−</button>
                <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }} aria-live="polite">{c.qty}</span>
                <button type="button" aria-label="Increase quantity" style={qtyBtn} onClick={() => setQty(c.id, c.qty + 1)}>+</button>
              </div>
              <button type="button" className="link-btn" style={{ fontSize: 13, color: 'var(--muted)', alignSelf: 'auto' }} onClick={() => setQty(c.id, 0)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <Totals rows={[['Subtotal', '[SUBTOTAL]'], ['Delivery', 'Calculated at checkout']]} />
      <button type="button" className="btn btn-primary btn-block cut" disabled={count === 0} onClick={onCheckout}>Checkout</button>
    </aside>
  );
}

const qtyBtn = { width: 40, height: 40, background: 'none', border: 'none', color: 'var(--text)', font: 'inherit', fontSize: 18, cursor: 'pointer' };

function Totals({ rows }) {
  return (
    <div className="stack" style={{ gap: 6, fontSize: 14 }}>
      {rows.map(([k, v]) => (
        <div key={k} className="muted" style={{ display: 'flex', justifyContent: 'space-between' }}><span>{k}</span><span>{v}</span></div>
      ))}
    </div>
  );
}

function Browse({ onCheckout }) {
  const [game, setGame] = useState('All');
  const [type, setType] = useState('All');
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const list = products.filter((p) =>
    (game === 'All' || p.game === game || p.game === 'Any game') &&
    (type === 'All' || p.type === type) &&
    (!query || (p.name + ' ' + p.detail + ' ' + p.game).toLowerCase().includes(query))
  );

  return (
    <>
      <section className="band" style={{ borderTop: 'none' }}>
        <div className="container row" style={{ paddingTop: 48, paddingBottom: 40, alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 620 }}>
            <p className="eyebrow">Shop online</p>
            <h1 className="h-page">Order online, pick up or get it delivered</h1>
            <p className="muted">Add items to your cart, check out in a minute, and collect in store or have it delivered to your door.</p>
          </div>
          <div className="row" style={{ gap: 10, fontSize: 13, color: 'var(--text2)' }}>
            <span className="tag">PayNow · Card · Pay in store</span>
            <Link to="/account" className="tag" style={{ textDecoration: 'none', color: 'var(--ink-accent)' }}>Sign in for faster checkout</Link>
          </div>
        </div>
      </section>

      <section className="container stack" style={{ paddingTop: 32, paddingBottom: 72, gap: 24 }}>
        <div className="row" style={{ gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div className="field" style={{ flex: '1 1 280px', maxWidth: 380 }}>
            <label htmlFor="shop-search" className="label">Search</label>
            <input id="shop-search" className="input" type="search" placeholder="Card name, set or product" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="field">
            <span id="f-type" className="label">Category</span>
            <ChipGroup labelledBy="f-type" options={TYPES} value={type} onChange={setType} />
          </div>
        </div>
        <div className="field">
          <span id="f-game" className="label">Game</span>
          <ChipGroup labelledBy="f-game" options={GAMES} value={game} onChange={setGame} />
        </div>

        <div className="row" style={{ gap: 24, alignItems: 'flex-start' }}>
          <div className="stack" style={{ flex: '999 1 560px', minWidth: 0, gap: 14 }}>
            <p className="muted" style={{ fontSize: 13 }}>{plural(list.length)}</p>
            <div className="product-grid">
              {list.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            {list.length === 0 && (
              <p className="muted" style={{ padding: '40px 0', textAlign: 'center' }}>Nothing matches that search. Try another game or category — or ask us, we may have it in the back.</p>
            )}
          </div>
          <Cart onCheckout={onCheckout} />
        </div>
      </section>
      <MobileCartBar onCheckout={onCheckout} />
    </>
  );
}

// On phones the cart sits below the products, so keep a summary pinned to the bottom of the screen.
function MobileCartBar({ onCheckout }) {
  const { count } = useCartItems();
  if (count === 0) return null;
  return (
    <>
      <div className="mobile-cart-spacer" />
      <div className="mobile-cart-bar">
        <button type="button" className="link-btn" style={{ alignSelf: 'auto', fontSize: 15 }} onClick={() => document.getElementById('cart').scrollIntoView({ behavior: 'smooth' })}>
          View cart · {plural(count)}
        </button>
        <button type="button" className="btn btn-primary cut" onClick={onCheckout}>Checkout</button>
      </div>
    </>
  );
}

function Checkout({ onBack, onPlaced }) {
  const { items, count } = useCartItems();
  const [fulfil, setFulfil] = useState('Store pickup');
  const [payPick, setPay] = useState('PayNow');
  const delivery = fulfil === 'Delivery';
  const payOptions = delivery ? ['PayNow', 'Credit / debit card'] : ['PayNow', 'Credit / debit card', 'Pay in store'];
  const pay = payOptions.includes(payPick) ? payPick : 'PayNow';
  const placeLabel = pay === 'Pay in store' ? 'Place order' : (pay === 'PayNow' ? 'Place order & pay with PayNow' : 'Pay now');

  return (
    <section aria-label="Checkout" className="container stack" style={{ paddingTop: 40, paddingBottom: 72, gap: 24 }}>
      <button type="button" className="link-btn" style={{ textDecoration: 'none' }} onClick={onBack}>← Back to shop</button>
      <h1 className="h-page" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Checkout</h1>
      <div className="row" style={{ gap: 24, alignItems: 'flex-start' }}>
        <div className="stack" style={{ flex: '999 1 560px', minWidth: 0, gap: 20 }}>
          <div className="panel cut stack" style={{ padding: 24, gap: 16 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h2 className="h-card">1. Your details</h2>
              <Link to="/account" style={{ fontSize: 14, color: 'var(--ink-accent)' }}>Have an account? Sign in</Link>
            </div>
            <div className="grid-fields">
              <Field id="co-name" label="Full name" type="text" autoComplete="name" />
              <Field id="co-phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" placeholder="+65 " />
              <Field id="co-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="panel cut stack" style={{ padding: 24, gap: 16 }}>
            <h2 id="co-ful" className="h-card">2. Pickup or delivery</h2>
            <ChipGroup labelledBy="co-ful" options={['Store pickup', 'Delivery']} value={fulfil} onChange={setFulfil} />
            {delivery ? (
              <>
                <div className="grid-fields">
                  <Field id="co-addr" className="span-all" label="Address" type="text" autoComplete="street-address" />
                  <Field id="co-unit" label="Unit number" type="text" placeholder="#00-00" />
                  <Field id="co-postal" label="Postal code" type="text" inputMode="numeric" autoComplete="postal-code" />
                </div>
                <p className="muted" style={{ fontSize: 13 }}>Delivery fee [DELIVERY FEE] · arrives in [DELIVERY TIME].</p>
              </>
            ) : (
              <p className="muted">Collect at [STREET ADDRESS] during opening hours. We’ll message you when your order is ready.</p>
            )}
          </div>

          <div className="panel cut stack" style={{ padding: 24, gap: 16 }}>
            <h2 id="co-pay" className="h-card">3. Payment method</h2>
            <ChipGroup labelledBy="co-pay" options={payOptions} value={pay} onChange={setPay} />
            {pay === 'PayNow' && (
              <div className="row" style={{ gap: 20, alignItems: 'center' }}>
                <div role="img" aria-label="PayNow QR code placeholder" className="img-placeholder" style={{ width: 140, height: 140, fontSize: 12 }}>[PAYNOW QR]</div>
                <p className="muted" style={{ flex: '1 1 220px' }}>After you place the order, scan the QR code with your banking app. Your order is confirmed once payment is received.</p>
              </div>
            )}
            {pay === 'Credit / debit card' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
                  <Field id="co-card" className="span-all" label="Card number" type="text" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" />
                  <Field id="co-exp" label="Expiry" type="text" autoComplete="cc-exp" placeholder="MM / YY" />
                  <Field id="co-cvc" label="CVC" type="text" inputMode="numeric" autoComplete="cc-csc" placeholder="123" />
                </div>
                <p className="muted" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}><LockIcon />Payments are processed securely by [PAYMENT PROVIDER].</p>
              </>
            )}
            {pay === 'Pay in store' && (
              <p className="muted">Pay by cash, card or PayNow when you collect. Only available for store pickup.</p>
            )}
          </div>
        </div>

        <aside aria-label="Order summary" className="panel cut stack side-panel" style={{ flex: '1 1 300px', minWidth: 0, padding: 22, gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>Order summary</h2>
          <ul className="stack" style={{ margin: 0, padding: 0, listStyle: 'none', gap: 10 }}>
            {items.map((c) => (
              <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 14 }}><span>{c.qty} × {c.name}</span><span>[PRICE]</span></li>
            ))}
          </ul>
          <div className="stack" style={{ gap: 6, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
            <Totals rows={[['Subtotal', '[SUBTOTAL]'], [fulfil, delivery ? '[DELIVERY FEE]' : 'Free']]} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 700, paddingTop: 6 }}><span>Total</span><span style={{ color: 'var(--ink-accent)' }}>[TOTAL]</span></div>
          </div>
          <label className="check"><input type="checkbox" />I agree to the terms and refund policy.</label>
          <button type="button" className="btn btn-primary btn-block cut" disabled={count === 0} onClick={() => onPlaced(delivery)}>{placeLabel}</button>
        </aside>
      </div>
    </section>
  );
}

function Done({ delivery, onKeepShopping }) {
  return (
    <section aria-label="Order confirmed" className="stack" style={{ maxWidth: 640, margin: '0 auto', padding: '72px 24px 96px', gap: 16, alignItems: 'flex-start' }}>
      <CheckCircle size={48} />
      <p className="eyebrow">Order [ORDER #]</p>
      <h1 className="h-page" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Thanks for your order!</h1>
      <p className="muted">
        {delivery ? 'Your order will arrive in [DELIVERY TIME].' : 'We’ll message you when it’s ready to collect.'} A confirmation has been sent to your email and WhatsApp.
      </p>
      <div className="row" style={{ gap: 12, paddingTop: 8 }}>
        <button type="button" className="btn btn-primary cut" onClick={onKeepShopping}>Keep shopping</button>
        <Link to="/account" className="btn btn-outline">Create an account to track orders</Link>
      </div>
    </section>
  );
}

export default function Shop() {
  useTitle('Shop online – [SHOP NAME]');
  const { clearCart } = useStore();
  const { count } = useCartItems();
  const [step, setStep] = useState('browse');
  const [delivery, setDelivery] = useState(false);

  const go = (s) => { setStep(s); window.scrollTo(0, 0); };

  if (step === 'checkout' && count > 0) {
    return <Checkout onBack={() => go('browse')} onPlaced={(d) => { setDelivery(d); clearCart(); go('done'); }} />;
  }
  if (step === 'done') {
    return <Done delivery={delivery} onKeepShopping={() => go('browse')} />;
  }
  return <Browse onCheckout={() => go('checkout')} />;
}
