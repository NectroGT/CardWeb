import { useState } from 'react';
import { Link } from 'react-router';
import { useStore } from '../store.jsx';
import { WEEKDAYS, dayLabel, isPast, sortEvents, timeLabel, todayISO } from '../events.js';
import { ChipGroup, Field } from '../components/ui.jsx';

const REPEAT = { 'Every week': 'weekly', 'One-off date': 'once' };
const BLANK = { name: '', detail: '', repeat: 'weekly', day: 'Saturday', date: '', time: '', fee: '', seats: '' };

function EventForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(() => (initial ? { ...BLANK, ...initial, day: initial.day || BLANK.day, seats: initial.seats ? String(initial.seats) : '' } : BLANK));
  const set = (key) => (e) => setF({ ...f, [key]: e.target.value });
  const once = f.repeat === 'once';

  const submit = (e) => {
    e.preventDefault();
    onSave({
      name: f.name.trim(),
      detail: f.detail.trim(),
      repeat: f.repeat,
      day: once ? '' : f.day,
      date: once ? f.date : '',
      time: f.time,
      fee: f.fee.trim(),
      seats: f.seats ? Number(f.seats) : null
    });
  };

  return (
    <form className="stack" style={{ gap: 16 }} onSubmit={submit}>
      <h2 className="h-card">{initial ? 'Edit event' : 'Create event'}</h2>
      <Field id="ev-name" label="Event name" type="text" placeholder="e.g. Pokémon Prerelease" value={f.name} onChange={set('name')} required />
      <div className="field">
        <span id="ev-repeat" className="label">When</span>
        <ChipGroup
          labelledBy="ev-repeat"
          plain
          options={Object.keys(REPEAT)}
          value={once ? 'One-off date' : 'Every week'}
          onChange={(label) => setF({ ...f, repeat: REPEAT[label] })}
        />
      </div>
      <div className="grid-fields">
        {once ? (
          <Field id="ev-date" label="Date" type="date" min={todayISO()} value={f.date} onChange={set('date')} required />
        ) : (
          <div className="field">
            <label htmlFor="ev-day" className="label">Day</label>
            <select id="ev-day" className="input" value={f.day} onChange={set('day')}>
              {WEEKDAYS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        )}
        <Field id="ev-time" label="Start time" type="time" value={f.time} onChange={set('time')} required />
        <Field id="ev-fee" label="Entry fee" type="text" placeholder="e.g. $5 or Free" value={f.fee} onChange={set('fee')} />
        <Field id="ev-seats" label="Seats (blank for no limit)" type="number" inputMode="numeric" min={Math.max(1, initial?.taken || 0)} placeholder="e.g. 16" value={f.seats} onChange={set('seats')} />
      </div>
      <div className="field">
        <label htmlFor="ev-detail" className="label">Description</label>
        <textarea id="ev-detail" className="input" rows={3} placeholder="Format, prizes, who it’s for…" value={f.detail} onChange={set('detail')} required />
      </div>
      <div className="row" style={{ gap: 12, alignItems: 'center' }}>
        <button type="submit" className="btn btn-primary">{initial ? 'Save changes' : 'Create event'}</button>
        {onCancel && <button type="button" className="link-btn" style={{ alignSelf: 'auto' }} onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function EventRow({ ev, onEdit }) {
  const { updateEvent, deleteEvent } = useStore();
  const [confirming, setConfirming] = useState(false);
  const setTaken = (n) => updateEvent(ev.id, { taken: Math.max(0, ev.seats ? Math.min(ev.seats, n) : n) });

  return (
    <li className="panel cut stack" style={{ padding: '16px 18px', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontWeight: 700, minWidth: 0 }}>{ev.name}</span>
        <span className="muted" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{dayLabel(ev)} · {timeLabel(ev)}</span>
      </div>
      <span className="row" style={{ gap: 6 }}>
        <span className="badge">{ev.repeat === 'once' ? 'One-off' : 'Weekly'}</span>
        {isPast(ev) && <span className="badge">Finished, hidden from site</span>}
        {ev.fee && <span className="badge">Entry {ev.fee}</span>}
      </span>
      {ev.seats > 0 && (
        <div className="row" style={{ gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14 }}>Booked <strong>{ev.taken}</strong> of {ev.seats}</span>
          <div className="stepper" role="group" aria-label={`Seats booked for ${ev.name}`}>
            <button type="button" aria-label="One fewer booked" disabled={ev.taken <= 0} onClick={() => setTaken(ev.taken - 1)}>−</button>
            <button type="button" aria-label="One more booked" disabled={ev.taken >= ev.seats} onClick={() => setTaken(ev.taken + 1)}>+</button>
          </div>
        </div>
      )}
      <div className="row" style={{ gap: 16, alignItems: 'center' }}>
        <button type="button" className="link-btn" style={{ padding: 0, alignSelf: 'auto' }} onClick={onEdit}>Edit</button>
        {confirming ? (
          <span className="row" style={{ gap: 12, alignItems: 'center', fontSize: 14 }}>
            Delete this event?
            <button type="button" className="link-btn" style={{ padding: 0, alignSelf: 'auto', color: 'var(--ink-rose)' }} onClick={() => deleteEvent(ev.id)}>Yes, delete</button>
            <button type="button" className="link-btn" style={{ padding: 0, alignSelf: 'auto', color: 'var(--muted)' }} onClick={() => setConfirming(false)}>No</button>
          </span>
        ) : (
          <button type="button" className="link-btn" style={{ padding: 0, alignSelf: 'auto', color: 'var(--ink-rose)' }} onClick={() => setConfirming(true)}>Delete</button>
        )}
      </div>
    </li>
  );
}

export default function AdminEvents() {
  const { events, addEvent, updateEvent, resetEvents } = useStore();
  const [editingId, setEditingId] = useState(null);
  const [saved, setSaved] = useState('');
  const [formKey, setFormKey] = useState(0); // bumped after saving so the form starts empty again
  const editing = events.find((ev) => ev.id === editingId);
  const list = sortEvents(events);

  const save = (data) => {
    if (editing) {
      updateEvent(editing.id, { ...data, taken: data.seats ? Math.min(editing.taken || 0, data.seats) : editing.taken || 0 });
      setSaved(`Saved changes to “${data.name}”.`);
    } else {
      addEvent(data);
      setSaved(`“${data.name}” is now on the home page.`);
    }
    setEditingId(null);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="row" style={{ gap: 24, alignItems: 'flex-start' }}>
      <div className="stack" style={{ flex: '999 1 480px', minWidth: 0, gap: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span className="small-caps">{events.length} {events.length === 1 ? 'event' : 'events'}</span>
          <span className="row" style={{ gap: 16 }}>
            <Link to="/#events" style={{ fontSize: 14, color: 'var(--ink-accent)' }}>View on home page</Link>
            <button type="button" className="link-btn" style={{ padding: 0, alignSelf: 'auto', fontSize: 14 }} onClick={() => { resetEvents(); setEditingId(null); setSaved(''); }}>Reset to starting events</button>
          </span>
        </div>
        {list.length > 0 ? (
          <ul className="stack" style={{ margin: 0, padding: 0, listStyle: 'none', gap: 10 }}>
            {list.map((ev) => <EventRow key={ev.id} ev={ev} onEdit={() => { setEditingId(ev.id); setSaved(''); }} />)}
          </ul>
        ) : (
          <p className="muted" style={{ padding: 24, border: '1px dashed var(--line2)', borderRadius: 'var(--radius-btn)' }}>No events yet. Create one to show it on the home page.</p>
        )}
      </div>
      <aside aria-label={editing ? 'Edit event' : 'Create event'} className="panel cut side-panel detail-panel stack" style={{ flex: '1 1 380px', minWidth: 0, padding: 22, gap: 16 }}>
        {saved && <p className="admin-saved" role="status">{saved}</p>}
        <EventForm key={editingId || 'new-' + formKey} initial={editing} onSave={save} onCancel={editing ? () => setEditingId(null) : null} />
      </aside>
    </div>
  );
}
