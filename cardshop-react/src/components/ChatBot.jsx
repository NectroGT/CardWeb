import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useStore } from '../store.jsx';
import { chatFallback, chatTopics, discountCodes, nextRelease, socials } from '../data.js';
import { dayLabel, isPast, sortEvents, timeLabel } from '../events.js';
import { ChatIcon, CloseIcon } from './Icons.jsx';

const GREETING = 'Hi! I’m the [SHOP NAME] helper. Ask me about opening hours, events, delivery or selling your cards.';
const whatsapp = socials.find((s) => s.name === 'WhatsApp')?.url;

// Answers that are built from the shop's current lists instead of a fixed sentence.
function liveAnswer(id, events) {
  if (id === 'events') {
    const list = sortEvents(events.filter((ev) => !isPast(ev)));
    if (!list.length) return { text: 'There are no events on the schedule right now. Follow us on social media to hear about the next one.' };
    const lines = list.map((ev) => {
      const left = ev.seats > 0 ? (ev.taken >= ev.seats ? ' (fully booked)' : ` (${ev.seats - ev.taken} seats left)`) : '';
      return `${dayLabel(ev)}, ${timeLabel(ev)}: ${ev.name}${left}`;
    });
    return { text: 'Here’s what’s on:', lines, link: { label: 'See all events', to: '/#events' } };
  }
  if (id === 'discount') {
    const codes = Object.entries(discountCodes);
    if (!codes.length) return { text: 'There are no discount codes running right now.' };
    return { text: 'Type a code at checkout:', lines: codes.map(([code, what]) => `${code}: ${what}`), link: { label: 'Go to the shop', to: '/shop' } };
  }
  if (id === 'release') {
    const date = new Date(nextRelease.date);
    const out = date <= new Date();
    const when = date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
    return {
      text: out
        ? `${nextRelease.game} ${nextRelease.name} is out now.`
        : `${nextRelease.game} ${nextRelease.name} comes out on ${when}. You can pre-order it now and pick it up or have it delivered on release day.`,
      link: { label: out ? 'Shop now' : 'Pre-order', to: '/shop' }
    };
  }
  return null;
}

function answerFor(topic, events) {
  return liveAnswer(topic.id, events) || { text: topic.answer, link: topic.link };
}

// Picks the topic whose keywords best match the question. Longer keyword matches count for more,
// so "lightly played" goes to card condition rather than events ("play").
function match(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const t of chatTopics) {
    const score = t.keywords.reduce((sum, k) => (new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(q) ? sum + k.length : sum), 0);
    if (score > bestScore) { best = t; bestScore = score; }
  }
  return best;
}

function reply(question, events) {
  const q = question.trim().toLowerCase();
  if (/^(hi|hey|hello|yo|good (morning|afternoon|evening))\b/.test(q) && q.split(/\s+/).length <= 3) return { text: 'Hi! What can I help you with?' };
  if (/\b(thanks|thank you|thx|cheers)\b/.test(q)) return { text: 'You’re welcome! Anything else?' };
  const topic = match(q);
  if (topic) return answerFor(topic, events);
  return { text: chatFallback, link: whatsapp && { label: 'Message us on WhatsApp', to: whatsapp } };
}

function AnswerLink({ link, onNavigate }) {
  if (!link?.to) return null;
  if (/^https?:/.test(link.to)) {
    return <a className="chat-link" href={link.to} target="_blank" rel="noopener noreferrer">{link.label}</a>;
  }
  return <Link className="chat-link" to={link.to} onClick={onNavigate}>{link.label}</Link>;
}

export default function ChatBot() {
  const { events } = useStore();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }]);
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const close = () => {
    setOpen(false);
    fabRef.current?.focus();
  };

  const ask = (question, topic) => {
    const answer = topic ? answerFor(topic, events) : reply(question, events);
    setMessages((m) => [...m, { from: 'you', text: question }, { from: 'bot', ...answer }]);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    ask(draft.trim());
    setDraft('');
  };

  // On phones the chat covers the page, so get out of the way after following a link.
  const onNavigate = () => {
    if (window.matchMedia('(max-width: 600px)').matches) setOpen(false);
  };

  return (
    <div className="chat no-print">
      {open && (
        <section className="chat-panel" role="dialog" aria-label="Chat with [SHOP NAME]" onKeyDown={(e) => e.key === 'Escape' && close()}>
          <header className="chat-head">
            <span className="stack" style={{ gap: 2 }}>
              <span style={{ fontWeight: 700 }}>Ask [SHOP NAME]</span>
              <span className="muted" style={{ fontSize: 12 }}>Instant answers to common questions</span>
            </span>
            <button type="button" className="icon-btn" aria-label="Close chat" onClick={close}><CloseIcon /></button>
          </header>
          <ol className="chat-log" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <li key={i} className={'chat-msg ' + (m.from === 'you' ? 'chat-you' : 'chat-bot')}>
                <span className="visually-hidden">{m.from === 'you' ? 'You: ' : 'Shop helper: '}</span>
                <p>{m.text}</p>
                {m.lines && <ul>{m.lines.map((l) => <li key={l}>{l}</li>)}</ul>}
                <AnswerLink link={m.link} onNavigate={onNavigate} />
              </li>
            ))}
          </ol>
          <div className="chat-topics" role="group" aria-label="Common questions">
            {chatTopics.map((t) => (
              <button key={t.id} type="button" className="chip plain" onClick={() => ask(t.label, t)}>{t.label}</button>
            ))}
          </div>
          <form className="chat-form" onSubmit={submit}>
            <label htmlFor="chat-input" className="visually-hidden">Your question</label>
            <input id="chat-input" ref={inputRef} className="input" type="text" autoComplete="off" placeholder="Type a question…" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>Send</button>
          </form>
        </section>
      )}
      <button
        ref={fabRef}
        type="button"
        className="chat-fab"
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        <span className="chat-fab-label">{open ? 'Close' : 'Ask us'}</span>
      </button>
    </div>
  );
}
