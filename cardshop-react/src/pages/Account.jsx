import { useState } from 'react';
import { Link } from 'react-router';
import { sampleOrders } from '../data.js';
import { useTitle } from '../store.jsx';
import { Tick } from '../components/Icons.jsx';
import { Field } from '../components/ui.jsx';

const PERKS = ['Track orders and pre-orders', 'See your store credit balance', 'Earn loyalty points on every purchase', 'Save your address and payment details'];

function ModeTabs({ mode, setMode }) {
  return (
    <div role="group" aria-label="Sign up or log in" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', border: '1px solid var(--line)' }}>
      {['Sign up', 'Log in'].map((label) => {
        const on = mode === label;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={on}
            onClick={() => setMode(label)}
            className="btn"
            style={{ minHeight: 46, padding: 0, letterSpacing: '0.06em', background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--on-accent)' : 'var(--text2)' }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function SignedOut({ onLogin }) {
  const [mode, setMode] = useState('Sign up');
  const submit = (e) => { e.preventDefault(); onLogin(); };
  return (
    <section className="container row" style={{ paddingTop: 56, paddingBottom: 80, gap: 48, alignItems: 'flex-start' }}>
      <div className="stack" style={{ flex: '1 1 380px', minWidth: 0, gap: 16 }}>
        <p className="eyebrow">Your account</p>
        <h1 className="h-page">Join the shop</h1>
        <p className="muted" style={{ maxWidth: 440 }}>An account makes checkout faster and keeps everything in one place.</p>
        <ul className="ticks" style={{ paddingTop: 8, gap: 12 }}>
          {PERKS.map((p) => <li key={p}><Tick />{p}</li>)}
        </ul>
      </div>
      <div className="panel cut stack" style={{ flex: '1 1 420px', minWidth: 0, padding: 28, gap: 20 }}>
        <ModeTabs mode={mode} setMode={setMode} />
        {mode === 'Sign up' ? (
          <form className="stack" style={{ gap: 16 }} onSubmit={submit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
              <Field id="su-first" label="First name" type="text" autoComplete="given-name" />
              <Field id="su-last" label="Last name" type="text" autoComplete="family-name" />
            </div>
            <Field id="su-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            <Field id="su-phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" placeholder="+65 " />
            <Field id="su-pass" label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters" />
            <label className="check"><input type="checkbox" />Send me restock alerts and event news</label>
            <button type="submit" className="btn btn-primary btn-block cut">Create account</button>
            <p className="muted" style={{ fontSize: 12 }}>By creating an account you agree to our [TERMS] and [PRIVACY POLICY].</p>
          </form>
        ) : (
          <form className="stack" style={{ gap: 16 }} onSubmit={submit}>
            <Field id="li-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            <Field id="li-pass" label="Password" type="password" autoComplete="current-password" />
            <Link to="/account" style={{ alignSelf: 'flex-start', fontSize: 14, color: 'var(--ink-accent)' }}>Forgot password?</Link>
            <button type="submit" className="btn btn-primary btn-block cut">Log in</button>
          </form>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--muted2)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />or<span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <button type="button" onClick={onLogin} style={{ font: 'inherit', fontWeight: 600, minHeight: 46, background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--line2)', cursor: 'pointer' }}>Continue with Google</button>
      </div>
    </section>
  );
}

function Stat({ label, value, note }) {
  return (
    <div className="panel cut stack" style={{ padding: 20, gap: 6 }}>
      <span className="small-caps">{label}</span>
      <span style={{ fontSize: 26, fontWeight: 700 }}>{value}</span>
      <span className="muted" style={{ fontSize: 13 }}>{note}</span>
    </div>
  );
}

function Saved({ label, children }) {
  return (
    <div className="stack" style={{ gap: 4 }}>
      <span className="small-caps" style={{ letterSpacing: '0.1em' }}>{label}</span>
      <span>{children}</span>
    </div>
  );
}

function SignedIn({ onLogout }) {
  return (
    <section className="container stack" style={{ paddingTop: 48, paddingBottom: 80, gap: 28 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div className="stack" style={{ gap: 8 }}>
          <p className="eyebrow">My account</p>
          <h1 className="h-page" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Welcome back, [NAME]</h1>
        </div>
        <div className="row" style={{ gap: 12 }}>
          <Link to="/shop" className="btn btn-primary cut" style={{ minHeight: 44, padding: '0 20px' }}>Shop now</Link>
          <button type="button" className="btn btn-outline" style={{ minHeight: 44, padding: '0 20px' }} onClick={onLogout}>Log out</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <Stat label="Store credit" value="[AMOUNT]" note="Use it on anything in store or online" />
        <Stat label="Loyalty points" value="[POINTS]" note="[POINTS TO NEXT REWARD] to your next reward" />
        <Stat label="Pre-orders" value="[COUNT]" note="Next release: [DATE]" />
      </div>
      <div className="row" style={{ gap: 20, alignItems: 'flex-start' }}>
        <div className="panel cut stack" style={{ flex: '999 1 520px', minWidth: 0, padding: 24, gap: 14 }}>
          <h2 className="h-card">Recent orders</h2>
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 480 }}>
              <thead>
                <tr><th scope="col">Order</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col" className="num">Total</th></tr>
              </thead>
              <tbody>
                {sampleOrders.map((o, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>[ORDER #]</td>
                    <td className="muted">[DATE]</td>
                    <td><span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', color: 'var(--on-accent)', background: o.color }}>{o.status}</span></td>
                    <td className="num">[TOTAL]</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel cut stack" style={{ flex: '1 1 300px', minWidth: 0, padding: 24, gap: 16 }}>
          <h2 className="h-card">Saved details</h2>
          <Saved label="Delivery address">[ADDRESS]</Saved>
          <Saved label="Payment method">Card ending [LAST 4]</Saved>
          <Saved label="Updates by">WhatsApp</Saved>
          <button type="button" className="link-btn">Edit details</button>
        </div>
      </div>
    </section>
  );
}

export default function Account() {
  useTitle('Your account – [SHOP NAME]');
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <SignedIn onLogout={() => setLoggedIn(false)} /> : <SignedOut onLogin={() => setLoggedIn(true)} />;
}
