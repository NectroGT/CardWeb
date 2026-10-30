import { useState } from 'react';
import { wanted } from '../data.js';
import { useTitle } from '../store.jsx';
import { Cross, Tick } from '../components/Icons.jsx';
import { ChipGroup, Field, Success } from '../components/ui.jsx';

const STEPS = [
  { n: '[01]', title: 'Bring it in or send a quote', text: 'Walk in during buy hours [BUY HOURS], or use the form below for big collections.' },
  { n: '[02]', title: 'We grade & price', text: 'Each card is checked for condition and priced against current market value, in front of you.' },
  { n: '[03]', title: 'Get paid on the spot', text: 'Take cash, PayNow or store credit. No obligation — you can always say no.' }
];

const WE_BUY = [
  'Singles from Pokémon, Magic, Yu-Gi-Oh!, One Piece and Lorcana',
  'Graded slabs (PSA, BGS, CGC)',
  'Sealed booster boxes and packs',
  'Bulk commons and uncommons, sorted by game'
];

const WE_DONT_BUY = [
  'Heavily damaged cards (water damage, creases, writing)',
  'Counterfeit or proxy cards',
  'Opened or resealed sealed product'
];

function OfferCard({ label, value, note, highlight }) {
  return (
    <div className={highlight ? 'cut stack' : 'panel cut stack'} style={{ padding: 22, gap: 8, ...(highlight ? { background: 'var(--accent)', color: 'var(--on-accent)' } : {}) }}>
      <span className={highlight ? '' : 'small-caps'} style={highlight ? { fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' } : undefined}>{label}</span>
      <span style={{ fontSize: 30, fontWeight: 700 }}>{value}</span>
      <span className={highlight ? '' : 'muted'} style={{ fontSize: 13 }}>{note}</span>
    </div>
  );
}

function WantedList() {
  const [game, setGame] = useState('All');
  const rows = wanted.filter((w) => game === 'All' || w.game === game);
  return (
    <section id="wanted" className="container stack" style={{ paddingTop: 64, paddingBottom: 40, gap: 24 }}>
      <div className="row" style={{ alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
        <div className="stack" style={{ gap: 10, maxWidth: 560 }}>
          <p className="eyebrow">Updated [DATE]</p>
          <h2 className="h-section">Wanted list</h2>
          <p className="muted">Cards we’re actively looking for right now. Prices are for Near Mint copies.</p>
        </div>
        <ChipGroup label="Filter by game" options={['All', 'Pokémon', 'Magic', 'Yu-Gi-Oh!', 'One Piece']} value={game} onChange={setGame} />
      </div>
      <div className="table-wrap panel">
        <table className="table" style={{ minWidth: 640 }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              <th scope="col">Card</th>
              <th scope="col">Game</th>
              <th scope="col">Set</th>
              <th scope="col" className="num">Cash</th>
              <th scope="col" className="num">Credit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{w.name}</td>
                <td className="muted">{w.game}</td>
                <td className="muted">{w.set}</td>
                <td className="num">[CASH PRICE]</td>
                <td className="num" style={{ fontWeight: 600, color: 'var(--ink-accent)' }}>[CREDIT PRICE]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [kinds, setKinds] = useState([]);
  if (sent) {
    return (
      <Success title="Thanks — request sent!" actionLabel="Send another request" onAction={() => { setSent(false); setKinds([]); }}>
        We’ll get back to you within [RESPONSE TIME].
      </Success>
    );
  }
  return (
    <form className="stack" style={{ gap: 18 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <div className="grid-fields" style={{ gap: 16 }}>
        <Field id="q-name" label="Name" type="text" autoComplete="name" placeholder="Your name" />
        <Field id="q-phone" label="WhatsApp / phone" type="tel" autoComplete="tel" placeholder="+65 " />
      </div>
      <div className="stack" style={{ gap: 8 }}>
        <span id="q-kind" className="label">What are you selling?</span>
        <ChipGroup labelledBy="q-kind" multi options={['Singles', 'Bulk', 'Graded slabs', 'Sealed']} value={kinds} onChange={setKinds} />
      </div>
      <Field id="q-count" label="Roughly how many cards?" type="text" inputMode="numeric" placeholder="e.g. 500" />
      <div className="field">
        <label htmlFor="q-desc" className="label">Tell us about it</label>
        <textarea id="q-desc" className="input" rows={4} placeholder="Games, sets, any standout cards, condition…" />
      </div>
      <button type="submit" className="btn btn-primary btn-block cut">Send request</button>
    </form>
  );
}

export default function Sell() {
  useTitle('Sell your cards – [SHOP NAME]');
  return (
    <>
      <section className="container row" style={{ paddingTop: 56, paddingBottom: 48, gap: 40, alignItems: 'center' }}>
        <div className="stack" style={{ flex: '1 1 460px', minWidth: 0, gap: 18 }}>
          <p className="eyebrow">Buy · Sell · Trade</p>
          <h1 className="h-hero" style={{ letterSpacing: 0 }}>We buy cards</h1>
          <p className="muted" style={{ maxWidth: 520, fontSize: 16 }}>From a single chase card to a full binder or graded slabs — get a fair offer based on current market prices, paid on the spot.</p>
          <div className="row" style={{ gap: 12 }}>
            <a href="#quote" className="btn btn-primary cut">Get a quote</a>
            <a href="#wanted" className="btn btn-outline">See what we’re buying</a>
          </div>
        </div>
        <div className="offer-grid" style={{ flex: '1 1 380px', minWidth: 0 }}>
          <OfferCard label="Cash" value="[X]%" note="of market value, paid by PayNow or cash" />
          <OfferCard highlight label="Store credit" value="[Y]%" note="of market value — our best offer, spend it on anything in store" />
        </div>
      </section>

      <section aria-label="How it works" className="band">
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {STEPS.map((s) => (
            <div key={s.n} className="stack" style={{ gap: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--ink-accent)' }}>{s.n}</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>{s.title}</h2>
              <p className="muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <WantedList />

      <section aria-label="What we buy" className="container" style={{ paddingTop: 24, paddingBottom: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <div className="panel cut stack" style={{ padding: 26, gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>What we buy</h2>
          <ul className="ticks">{WE_BUY.map((t) => <li key={t}><Tick /><span>{t}</span></li>)}</ul>
        </div>
        <div className="panel cut stack" style={{ padding: 26, gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>What we don’t buy</h2>
          <ul className="ticks">{WE_DONT_BUY.map((t) => <li key={t}><Cross /><span>{t}</span></li>)}</ul>
        </div>
      </section>

      <section id="quote" className="band" style={{ borderBottom: 'none' }}>
        <div className="container row" style={{ paddingTop: 64, paddingBottom: 72, gap: 40, alignItems: 'flex-start' }}>
          <div className="stack" style={{ flex: '1 1 320px', minWidth: 0, gap: 12 }}>
            <p className="eyebrow">Big collection?</p>
            <h2 className="h-section">Request a quote</h2>
            <p className="muted" style={{ maxWidth: 400 }}>Tell us what you have and we’ll reply within [RESPONSE TIME] with a rough offer and a time to bring it in.</p>
          </div>
          <div className="panel cut" style={{ flex: '1 1 480px', minWidth: 0, padding: 28 }}>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
