import { useState } from 'react';
import { Link } from 'react-router';
import { events, featuredSingles } from '../data.js';
import { useTitle } from '../store.jsx';
import { SealedIcon, SinglesIcon, SuppliesIcon, Tick } from '../components/Icons.jsx';
import { ChipGroup, ImagePlaceholder, SocialLinks, Success } from '../components/ui.jsx';

const GAMES_WE_CARRY = ['Pokémon', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'One Piece', 'Lorcana', 'Sports cards'];

const CATEGORIES = [
  { icon: <SinglesIcon />, title: 'Singles', text: 'Staples, chase cards and that one piece your deck is missing — sorted by game and set.' },
  { icon: <SealedIcon />, title: 'Sealed product', text: 'Booster boxes, packs, starter decks and collector sets, with pre-orders open for upcoming releases.' },
  { icon: <SuppliesIcon />, title: 'Supplies', text: 'Sleeves, binders, deck boxes, playmats and top-loaders to keep your collection mint.' }
];

const HOURS = ['Mon – Thu', 'Friday', 'Saturday', 'Sunday'];

const CONTACT = {
  WhatsApp: { label: 'WhatsApp number', hint: '+65 ' },
  Telegram: { label: 'Telegram username or phone', hint: '@username' },
  Email: { label: 'Email address', hint: 'you@example.com' }
};

function Hero() {
  return (
    <section id="top" className="container" style={{ paddingTop: 48, paddingBottom: 56 }}>
      <div className="stack" style={{ gap: 20, maxWidth: 760 }}>
        <p className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 8, height: 8, background: 'var(--accent)' }} aria-hidden="true" />
          System online · Singles · Sealed · Tournaments
        </p>
        <h1 className="h-hero">Pull it.<br />Trade it.<br /><span style={{ color: 'var(--ink-accent)' }}>Play it here.</span></h1>
        <p className="muted" style={{ maxWidth: 540, fontSize: 16 }}>
          Your local hub for Pokémon, Magic: The Gathering, Yu-Gi-Oh!, One Piece and more. Thousands of singles, fresh sealed product, and a full table every game night.
        </p>
        <div className="row" style={{ gap: 14 }}>
          <Link to="/#shop" className="btn btn-primary cut">Browse the cases</Link>
          <Link to="/#events" className="btn btn-outline-rose">This week’s events</Link>
        </div>
        <div className="row muted" style={{ gap: 12, paddingTop: 8, fontSize: 13 }}>
          <span className="tag">STATUS · OPEN [HOURS]</span>
          <span className="tag">LOC · [STREET ADDRESS]</span>
        </div>
      </div>
    </section>
  );
}

function FeaturedSingles() {
  const [game, setGame] = useState('All');
  const cards = featuredSingles.filter((c) => game === 'All' || c.game === game);
  return (
    <section id="shop" className="container stack" style={{ paddingTop: 72, paddingBottom: 40, gap: 28 }}>
      <div className="row" style={{ alignItems: 'end', justifyContent: 'space-between', gap: 24 }}>
        <div className="stack" style={{ gap: 12, maxWidth: 620 }}>
          <p className="eyebrow">01 // In the case this week</p>
          <h2 className="h-section">Featured singles</h2>
          <p className="muted">A rotating pick from our showcase. Every card is graded for condition in store — ask to see anything up close.</p>
        </div>
        <ChipGroup label="Filter by game" options={['All', 'Pokémon', 'Magic', 'Yu-Gi-Oh!', 'One Piece']} value={game} onChange={setGame} />
      </div>
      <div className="product-grid">
        {cards.map((card, i) => (
          <article key={i} className="panel cut stack" style={{ padding: 14, gap: 14 }}>
            <ImagePlaceholder />
            <div className="stack" style={{ gap: 4 }}>
              <span className="small-caps" style={{ fontSize: 11 }}>{card.game}</span>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{card.name}</h3>
              <span className="muted" style={{ fontSize: 14 }}>{card.detail}</span>
            </div>
            <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontWeight: 500, fontSize: 17, color: 'var(--ink-accent)' }}>[PRICE]</span>
              <span style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-rose)', border: '1px solid var(--rose)', padding: '4px 8px' }}>{card.condition}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section aria-label="Shop categories" className="container" style={{ paddingTop: 16, paddingBottom: 72 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
        {CATEGORIES.map((c) => (
          <Link key={c.title} to="/shop" className="panel cut stack" style={{ padding: 24, gap: 14, textDecoration: 'none' }}>
            {c.icon}
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, textTransform: 'uppercase' }}>{c.title}</h3>
            <p className="muted">{c.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="band">
      <div className="container stack" style={{ paddingTop: 72, paddingBottom: 72, gap: 28 }}>
        <div className="stack" style={{ gap: 12, maxWidth: 640 }}>
          <p className="eyebrow rose">02 // Game nights &amp; tournaments</p>
          <h2 className="h-section">Weekly schedule</h2>
          <p className="muted">New players welcome at every event. Loaner decks available — just ask at the counter.</p>
        </div>
        <div className="stack" style={{ gap: 12 }}>
          {events.map((ev) => (
            <div key={ev.day + ev.name} className="panel cut row" style={{ alignItems: 'center', gap: '12px 32px', padding: '16px 22px' }}>
              <div className="stack" style={{ flex: '0 0 120px' }}>
                <span style={{ fontWeight: 700, fontSize: 19, textTransform: 'uppercase', color: 'var(--ink-accent)' }}>{ev.day}</span>
                <span style={{ fontSize: 13, color: 'var(--muted2)' }}>[TIME]</span>
              </div>
              <div className="stack" style={{ flex: '1 1 300px', minWidth: 0, gap: 2 }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>{ev.name}</span>
                <span className="muted">{ev.detail}</span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text2)', border: '1px solid var(--line)', padding: '8px 12px' }}>ENTRY [FEE]</span>
              <Link to="/#visit" className="btn btn-rose cutsm">Reserve a seat</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container row" style={{ paddingTop: 72, paddingBottom: 72, gap: 48 }}>
        <div className="stack" style={{ flex: '1 1 380px', minWidth: 0, gap: 20 }}>
          <div className="stack" style={{ gap: 12 }}>
            <p className="eyebrow">04 // Visit the shop</p>
            <h2 className="h-section">Come say hi</h2>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <span className="small-caps">Address</span>
            <span style={{ color: 'var(--text2)' }}>[STREET ADDRESS]<br />[CITY, POSTAL CODE]</span>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <span className="small-caps">Contact</span>
            <span style={{ color: 'var(--text2)' }}>[PHONE] · [EMAIL]</span>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <span className="small-caps">Follow us</span>
            <SocialLinks />
          </div>
          <div className="row" style={{ gap: 14 }}>
            <a href="#visit" className="btn btn-primary cut">Get directions</a>
            <a href="#visit" className="btn btn-outline" style={{ borderColor: 'var(--line)' }}>Call the shop</a>
          </div>
        </div>
        <div className="stack" style={{ flex: '1 1 380px', minWidth: 0, gap: 20 }}>
          <div className="panel cut" style={{ padding: '22px 26px' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Opening hours</h3>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', rowGap: 10, fontSize: 16 }}>
              {HOURS.map((day) => [
                <dt key={day} className="muted">{day}</dt>,
                <dd key={day + '-h'} style={{ margin: 0, textAlign: 'right' }}>[HOURS]</dd>
              ])}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function JoinList() {
  const [joined, setJoined] = useState(false);
  const [channel, setChannel] = useState('WhatsApp');
  const [picks, setPicks] = useState([]);
  const contact = CONTACT[channel];

  return (
    <section id="join" className="band" style={{ borderBottom: 'none' }}>
      <div className="container row" style={{ paddingTop: 72, paddingBottom: 72, gap: 40, alignItems: 'flex-start' }}>
        <div className="stack" style={{ flex: '1 1 360px', minWidth: 0, gap: 14 }}>
          <p className="eyebrow">05 // Stay in the loop</p>
          <h2 className="h-section">Join the list</h2>
          <p className="muted" style={{ maxWidth: 440 }}>Be first to hear about restocks, pre-orders and tournament sign-ups. One message a week, tops — unsubscribe any time.</p>
          <ul className="ticks" style={{ paddingTop: 6 }}>
            <li><Tick />New set and restock alerts</li>
            <li><Tick />Early access to pre-orders</li>
            <li><Tick />Weekly event reminders</li>
          </ul>
        </div>
        <div className="panel cut" style={{ flex: '1 1 440px', minWidth: 0, padding: 28 }}>
          {joined ? (
            <Success title="You’re on the list!" actionLabel="Sign up someone else" onAction={() => { setJoined(false); setPicks([]); }}>
              We’ll send updates by {channel}. See you at the shop.
            </Success>
          ) : (
            <form className="stack" style={{ gap: 18 }} onSubmit={(e) => { e.preventDefault(); setJoined(true); }}>
              <div className="field">
                <label htmlFor="join-name" className="label">Name</label>
                <input id="join-name" className="input" type="text" autoComplete="name" placeholder="Your name" />
              </div>
              <div className="stack" style={{ gap: 8 }}>
                <span id="join-channel" className="label">Send me updates on</span>
                <ChipGroup labelledBy="join-channel" plain options={Object.keys(CONTACT)} value={channel} onChange={setChannel} />
              </div>
              <div className="field">
                <label htmlFor="join-contact" className="label">{contact.label}</label>
                <input id="join-contact" className="input" type="text" placeholder={contact.hint} />
              </div>
              <div className="stack" style={{ gap: 8 }}>
                <span id="join-games" className="label">Games I play</span>
                <ChipGroup labelledBy="join-games" plain multi options={['Pokémon', 'Magic', 'Yu-Gi-Oh!', 'One Piece', 'Lorcana', 'Sports']} value={picks} onChange={setPicks} />
              </div>
              <label className="check"><input type="checkbox" />I agree to receive updates from [SHOP NAME] and can opt out any time.</label>
              <button type="submit" className="btn btn-primary btn-block cut">Sign me up</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle('[SHOP NAME] – Trading card shop');
  return (
    <>
      <Hero />
      <section aria-label="Games we carry" className="band">
        <div className="container row" style={{ padding: 24, justifyContent: 'space-between', alignItems: 'center', gap: '16px 32px', fontWeight: 600, fontSize: 16, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)' }}>
          <span style={{ fontWeight: 400, fontSize: 12, letterSpacing: '0.16em', color: 'var(--ink-rose)' }}>// We carry</span>
          {GAMES_WE_CARRY.map((g) => <span key={g}>{g}</span>)}
        </div>
      </section>
      <FeaturedSingles />
      <Categories />
      <Events />
      <Visit />
      <JoinList />
    </>
  );
}
