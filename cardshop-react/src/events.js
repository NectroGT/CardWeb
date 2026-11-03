// Shared by the home page's schedule and the admin Events tab.
export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Today as YYYY-MM-DD in the shop's local time (what <input type="date"> uses).
export function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export const isPast = (ev) => ev.repeat === 'once' && ev.date < todayISO();

// One-off events first, soonest first; then the weekly ones Monday to Sunday.
export function sortEvents(list) {
  const rank = (ev) => (ev.repeat === 'once' ? '0' + ev.date : '1' + WEEKDAYS.indexOf(ev.day));
  return [...list].sort((a, b) => rank(a).localeCompare(rank(b)) || (a.time || '').localeCompare(b.time || ''));
}

export function dayLabel(ev) {
  if (ev.repeat !== 'once') return ev.day;
  return new Date(ev.date + 'T00:00').toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
}

export function timeLabel(ev) {
  if (!ev.time) return '[TIME]';
  return new Date('2000-01-01T' + ev.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
