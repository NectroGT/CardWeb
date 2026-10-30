const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M17 2l13 7.5v15L17 32 4 24.5v-15z" stroke="var(--accent)" strokeWidth="2" />
      <path d="M17 9l7 4v8l-7 4-7-4v-8z" fill="var(--rose)" />
    </svg>
  );
}

export function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <path d="M3 4h2l2.4 11h11.2L21 7H6.2" /><circle cx="9" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ImageIcon({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" {...line}>
      <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-9 9" />
    </svg>
  );
}

export function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" {...line} stroke="var(--icon)">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" {...line} stroke="var(--ink-rose)">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CheckCircle({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...line} stroke="var(--icon)">
      <circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.8" {...line}>
      <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

// Social media icons, drawn in the same outline style as the rest of the site.
const SOCIAL_PATHS = {
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  Facebook: <path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.6L17 11h-3V9a1 1 0 0 1 1-1z" />,
  TikTok: <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5M14 3.5c.6 2.6 2.6 4.5 5.5 4.8" />,
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor" />
    </>
  ),
  Discord: (
    <>
      <path d="M8.5 6c-1.6.3-3 .9-4.3 1.7C2.6 10.6 2 13.5 2.3 16.4c1.5 1.1 3 1.8 4.7 2.3l1.1-1.9M15.5 6c1.6.3 3 .9 4.3 1.7 1.6 2.9 2.2 5.8 1.9 8.7-1.5 1.1-3 1.8-4.7 2.3l-1.1-1.9M7 16c3.3 1.5 6.7 1.5 10 0M7.6 7.6c2.9-1 5.9-1 8.8 0" />
      <circle cx="9" cy="12.3" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.3" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  WhatsApp: (
    <>
      <path d="M4 20l1.2-3.9A8.5 8.5 0 1 1 8 18.8z" />
      <path d="M9.2 8.6c-.4 2.9 2.9 6.6 6.2 6.2l.6-1.6-1.8-.9-1 .8c-1.2-.5-2.1-1.4-2.6-2.6l.8-1-.9-1.8z" />
    </>
  ),
  Telegram: <path d="M21 4L2.8 11.1l6.4 2.3M21 4l-3.2 16-8.6-6.6M21 4L9.2 13.4V19l3.1-3.3" />
};

export function SocialIcon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.7" {...line}>
      {SOCIAL_PATHS[name]}
    </svg>
  );
}

const cat = { fill: 'none', stroke: 'var(--icon)', strokeWidth: 1.6, strokeLinecap: 'square', 'aria-hidden': true };

export function SinglesIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" {...cat}><rect x="5" y="3" width="12" height="17" /><path d="M9 7h4M9 11h4" /></svg>;
}

export function SealedIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" {...cat}><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></svg>;
}

export function SuppliesIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" {...cat}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></svg>;
}
