import { useStore } from '../store.jsx';
import { ImagePlaceholder } from './ui.jsx';

// A product with an Add to cart button. Used in the shop and in "Just landed" on the home page.
export default function ProductCard({ p }) {
  const { cart, setQty } = useStore();
  const n = cart[p.id] || 0;
  const label = n ? `In cart (${n}) · Add 1` : (p.type === 'Pre-orders' ? 'Pre-order' : 'Add to cart');
  return (
    <article className="panel cut stack" style={{ padding: 12, gap: 12 }}>
      <ImagePlaceholder ratio={p.ratio} iconSize={28} />
      <div className="stack" style={{ gap: 3 }}>
        <span className="small-caps" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
          {p.isNew && <span className="badge badge-rose" style={{ marginRight: 6 }}>New</span>}
          {p.game} · {p.type}
        </span>
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
