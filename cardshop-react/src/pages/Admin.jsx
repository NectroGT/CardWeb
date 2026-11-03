import { useRef, useState } from 'react';
import { useStore, useTitle } from '../store.jsx';

// Not linked from the site. Open it at /admin.
const VIEWS = [
  { name: 'To pack', match: (o) => o.status === 'to-pack', empty: 'Nothing to pack. You’re all caught up.' },
  { name: 'Ready', match: (o) => o.status === 'ready', empty: 'No orders waiting for pickup or delivery.' },
  { name: 'Completed', match: (o) => o.status === 'done', empty: 'No completed orders yet.' },
  { name: 'All', match: () => true, empty: 'No orders yet.' }
];

const BADGE = { 'to-pack': 'badge-blue', ready: 'badge-green', done: 'badge-grey' };

const isDelivery = (o) => o.fulfilment === 'Delivery';
const itemCount = (o) => o.items.reduce((a, i) => a + i.qty, 0);
const plural = (n) => n + (n === 1 ? ' item' : ' items');
const when = (iso) => new Date(iso).toLocaleString([], { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

function statusLabel(o) {
  if (o.status === 'to-pack') return 'To pack';
  if (o.status === 'ready') return isDelivery(o) ? 'Ready to ship' : 'Ready for pickup';
  return isDelivery(o) ? 'Shipped' : 'Collected';
}

function Badges({ o }) {
  return (
    <span className="row" style={{ gap: 6 }}>
      <span className={'badge ' + BADGE[o.status]}>{statusLabel(o)}</span>
      {!o.paid && <span className="badge badge-rose">Unpaid</span>}
      {o.items.some((i) => i.type === 'Pre-orders') && <span className="badge badge-amber">Pre-order</span>}
      {o.sample && <span className="badge">Sample</span>}
    </span>
  );
}

function OrderRow({ o, selected, onSelect }) {
  return (
    <li>
      <button type="button" className="order-row" aria-current={selected} onClick={onSelect}>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontWeight: 700, minWidth: 0 }}>#{o.id} · {o.customer.name}</span>
          <span className="muted" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{when(o.placedAt)}</span>
        </span>
        <span className="muted" style={{ fontSize: 13 }}>{plural(itemCount(o))} · {o.fulfilment} · {o.payment}</span>
        <Badges o={o} />
      </button>
    </li>
  );
}

function OrderDetail({ o, onUpdate }) {
  const packed = o.packed || [];
  const packedCount = o.items.filter((i) => packed.includes(i.id)).length;
  const allPacked = packedCount === o.items.length;
  const toggle = (id) => onUpdate({ packed: packed.includes(id) ? packed.filter((x) => x !== id) : [...packed, id] });

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="stack" style={{ gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <h2 className="h-card">Order #{o.id}</h2>
          <span className="muted" style={{ fontSize: 13 }}>{when(o.placedAt)}</span>
        </div>
        <Badges o={o} />
      </div>

      <dl className="order-facts">
        <dt>Customer</dt>
        <dd>
          {o.customer.name}<br />
          <a href={'tel:' + o.customer.phone}>{o.customer.phone}</a><br />
          <a href={'mailto:' + o.customer.email}>{o.customer.email}</a>
        </dd>
        <dt>{o.fulfilment}</dt>
        <dd>{isDelivery(o) ? o.address : 'Customer collects in store'}</dd>
        <dt>Payment</dt>
        <dd>{o.payment} · {o.paid ? 'Paid' : 'Not paid yet'}</dd>
        {o.discount && <><dt>Discount</dt><dd>Code {o.discount}</dd></>}
      </dl>

      <div className="stack" style={{ gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <span className="small-caps">Packing list</span>
          <span className="muted" style={{ fontSize: 13 }} aria-live="polite">{packedCount} of {o.items.length} packed</span>
        </div>
        <ul className="pack-list">
          {o.items.map((i) => (
            <li key={i.id}>
              <label className="pack-item">
                <input type="checkbox" checked={packed.includes(i.id)} disabled={o.status !== 'to-pack'} onChange={() => toggle(i.id)} />
                <span className="pack-qty">{i.qty}×</span>
                <span className="stack" style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: 600 }}>{i.name}</span>
                  <span className="muted" style={{ fontSize: 13 }}>{i.game} · {i.type} · {i.detail}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="stack" style={{ gap: 10 }}>
        {o.status === 'to-pack' && (
          <button type="button" className="btn btn-primary btn-block" disabled={!allPacked} onClick={() => onUpdate({ status: 'ready' })}>
            {allPacked ? 'Mark as packed' : 'Tick every item to finish'}
          </button>
        )}
        {o.status === 'ready' && (
          <>
            {isDelivery(o) && !o.paid && <p className="admin-warn">Not paid yet. Don’t ship until payment is received.</p>}
            <button type="button" className="btn btn-primary btn-block" onClick={() => onUpdate({ status: 'done' })}>
              {isDelivery(o) ? 'Mark as shipped' : 'Mark as collected'}
            </button>
            <button type="button" className="link-btn" onClick={() => onUpdate({ status: 'to-pack' })}>Back to packing</button>
          </>
        )}
        {o.status === 'done' && (
          <button type="button" className="btn btn-outline btn-block" onClick={() => onUpdate({ status: 'ready' })}>Undo: move back to Ready</button>
        )}
        {!o.paid && <button type="button" className="btn btn-outline btn-block" onClick={() => onUpdate({ paid: true })}>Mark as paid</button>}
        <button type="button" className="btn btn-outline btn-block" onClick={() => window.print()}>Print packing slip</button>
      </div>
    </div>
  );
}

// Only shown when printing (see .print-slip in styles.css).
function PackingSlip({ o }) {
  return (
    <div className="print-slip">
      <h1>[SHOP NAME] · Packing slip</h1>
      <p>Order #{o.id} · {when(o.placedAt)}</p>
      <p>
        <strong>{o.customer.name}</strong> · {o.customer.phone}<br />
        {isDelivery(o) ? 'Deliver to: ' + o.address : 'Store pickup'}
      </p>
      <table>
        <thead><tr><th>Packed</th><th>Qty</th><th>Item</th></tr></thead>
        <tbody>
          {o.items.map((i) => (
            <tr key={i.id}><td>☐</td><td>{i.qty}</td><td>{i.name} · {i.game} · {i.type} · {i.detail}</td></tr>
          ))}
        </tbody>
      </table>
      <p>Payment: {o.payment} · {o.paid ? 'Paid' : 'NOT PAID'}{o.discount && ' · Discount code ' + o.discount}</p>
    </div>
  );
}

export default function Admin() {
  useTitle('Orders – [SHOP NAME] admin');
  const { orders, updateOrder, clearSampleOrders } = useStore();
  const [view, setView] = useState('To pack');
  const [q, setQ] = useState('');
  const [selId, setSelId] = useState(null);
  const detailRef = useRef(null);

  const current = VIEWS.find((v) => v.name === view);
  const query = q.trim().toLowerCase();
  // Oldest first while there's work to do; newest first when looking back.
  const oldestFirst = view === 'To pack' || view === 'Ready';
  const list = orders
    .filter(current.match)
    .filter((o) => !query || [o.id, o.customer.name, o.customer.phone, o.customer.email].join(' ').toLowerCase().includes(query))
    .sort((a, b) => (oldestFirst ? a.placedAt.localeCompare(b.placedAt) : b.placedAt.localeCompare(a.placedAt)));
  const selected = list.find((o) => o.id === selId) || list[0];
  const hasSamples = orders.some((o) => o.sample);

  const select = (id) => {
    setSelId(id);
    // On phones the details sit below the list, so jump down to them.
    if (window.matchMedia('(max-width: 860px)').matches) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth' }));
    }
  };

  return (
    <>
      <section className="container stack no-print" style={{ paddingTop: 40, paddingBottom: 72, gap: 24 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div className="stack" style={{ gap: 8 }}>
            <p className="eyebrow">Staff only</p>
            <h1 className="h-page" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Orders</h1>
          </div>
          <div className="field" style={{ flex: '0 1 320px', minWidth: 0 }}>
            <label htmlFor="admin-search" className="label">Search</label>
            <input id="admin-search" className="input" type="search" placeholder="Order #, name, phone or email" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div className="admin-note row" style={{ gap: '8px 16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Demo mode: orders are saved in this browser only. Connect a database and staff login before going live.</span>
          {hasSamples && <button type="button" className="link-btn" style={{ padding: 0, alignSelf: 'auto' }} onClick={clearSampleOrders}>Clear sample orders</button>}
        </div>

        <div role="group" aria-label="Show orders" className="row" style={{ gap: 8 }}>
          {VIEWS.map((v) => (
            <button key={v.name} type="button" className="chip" aria-pressed={view === v.name} onClick={() => setView(v.name)}>
              {v.name} · {orders.filter(v.match).length}
            </button>
          ))}
        </div>

        <div className="row" style={{ gap: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: '999 1 480px', minWidth: 0 }}>
            {list.length > 0 ? (
              <ul className="order-list">
                {list.map((o) => <OrderRow key={o.id} o={o} selected={o === selected} onSelect={() => select(o.id)} />)}
              </ul>
            ) : (
              <p className="muted" style={{ padding: 24, border: '1px dashed var(--line2)', borderRadius: 'var(--radius-btn)' }}>
                {query ? 'No orders match that search.' : current.empty}
              </p>
            )}
          </div>
          {selected && (
            <aside ref={detailRef} aria-label="Order details" className="panel cut side-panel detail-panel" style={{ flex: '1 1 360px', minWidth: 0, padding: 22 }}>
              <OrderDetail o={selected} onUpdate={(patch) => updateOrder(selected.id, patch)} />
            </aside>
          )}
        </div>
      </section>
      {selected && <PackingSlip o={selected} />}
    </>
  );
}
