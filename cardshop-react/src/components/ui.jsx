import { socials } from '../data.js';
import { CheckCircle, ImageIcon, SocialIcon } from './Icons.jsx';

export function SocialLinks() {
  return (
    <ul className="socials">
      {socials.map((s) => (
        <li key={s.name}>
          <a href={s.url} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label={`[SHOP NAME] on ${s.name}`} title={s.name}>
            <SocialIcon name={s.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}

// A row of toggle buttons. With `multi`, `value` is an array and each option toggles.
export function ChipGroup({ options, value, onChange, multi = false, plain = false, label, labelledBy }) {
  const isOn = (o) => (multi ? value.includes(o) : value === o);
  const pick = (o) => {
    if (!multi) onChange(o);
    else onChange(isOn(o) ? value.filter((x) => x !== o) : [...value, o]);
  };
  return (
    <div role="group" aria-label={label} aria-labelledby={labelledBy} className="row" style={{ gap: 8 }}>
      {options.map((o) => (
        <button key={o} type="button" className={'chip' + (plain ? ' plain' : '')} aria-pressed={isOn(o)} onClick={() => pick(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function Field({ id, label, className = '', ...inputProps }) {
  return (
    <div className={'field ' + className}>
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} className="input" {...inputProps} />
    </div>
  );
}

export function ImagePlaceholder({ ratio = '63 / 88', iconSize = 34 }) {
  return (
    <div className="img-placeholder cutsm" role="img" aria-label="Image coming soon" style={{ aspectRatio: ratio }}>
      <ImageIcon size={iconSize} />
      <span>Image coming soon</span>
    </div>
  );
}

export function Success({ title, children, actionLabel, onAction }) {
  return (
    <div className="stack" style={{ gap: 12, alignItems: 'flex-start', padding: '24px 0' }}>
      <CheckCircle />
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{title}</h3>
      <p className="muted">{children}</p>
      <button type="button" className="link-btn" onClick={onAction}>{actionLabel}</button>
    </div>
  );
}
