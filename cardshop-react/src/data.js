// Edit the shop's products, events and wanted list here.

// Thin banner across the top of every page. Set to null to hide it.
export const promo = {
  text: 'New here? Get 10% off your first online order with code WELCOME10.',
  linkLabel: 'Shop now',
  link: '/shop'
};

// Countdown on the home page. date: when it goes on sale, with your time zone (+08:00 is Singapore).
// productId: the matching pre-order in `products` below. After the date it switches to "Out now".
export const nextRelease = {
  name: '[Upcoming set]',
  game: 'Pokémon',
  date: '2026-12-12T10:00:00+08:00',
  productId: 11
};

// Codes customers can type at checkout (capitals don't matter).
// Anyone can find these in the site's code, so only use codes you're happy to be public.
export const discountCodes = {
  WELCOME10: '10% off your first order'
};

// Used by the "Get directions" and "Call the shop" buttons. Phone: digits with country code, e.g. +6561234567.
export const shopContact = {
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=[STREET ADDRESS]',
  phone: '[PHONE]'
};

// Shop details for the home page's Visit section and for Google (search results, Maps).
// hours: each row is one line on the home page. days: the days it covers, for Google.
// opens / closes: 24-hour time, e.g. '11:00' and '21:30'.
export const shopDetails = {
  name: '[SHOP NAME]',
  street: '[STREET ADDRESS]',
  city: '[CITY]',
  postalCode: '[POSTAL CODE]',
  country: 'SG',
  email: '[EMAIL]',
  hours: [
    { label: 'Mon – Thu', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '[OPEN]', closes: '[CLOSE]' },
    { label: 'Friday', days: ['Friday'], opens: '[OPEN]', closes: '[CLOSE]' },
    { label: 'Saturday', days: ['Saturday'], opens: '[OPEN]', closes: '[CLOSE]' },
    { label: 'Sunday', days: ['Sunday'], opens: '[OPEN]', closes: '[CLOSE]' }
  ]
};

// Social media links, shown in the footer and the Visit section.
// Replace the [PLACEHOLDERS] with your real handles, and delete any line you don't use.
export const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/[HANDLE]' },
  { name: 'Facebook', url: 'https://www.facebook.com/[PAGE]' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@[HANDLE]' },
  { name: 'YouTube', url: 'https://www.youtube.com/@[CHANNEL]' },
  { name: 'Discord', url: 'https://discord.gg/[INVITE CODE]' },
  { name: 'WhatsApp', url: 'https://wa.me/[PHONE NUMBER, DIGITS ONLY]' },
  { name: 'Telegram', url: 'https://t.me/[USERNAME]' }
];

// The chat helper in the corner of every page. Each topic is a button in the chat, and also answers
// typed questions containing any of its keywords. link: optional button under the answer
// (a page like '/sell' or a full web address). Topics with id 'events', 'discount' or 'release'
// fill in their answer from the lists in this file, so leave their answer out.
export const chatTopics = [
  { id: 'hours', label: 'Opening hours', keywords: ['hour', 'open', 'close', 'closing', 'today', 'weekend', 'sunday', 'holiday'], answer: 'We’re open Mon – Thu [HOURS], Friday [HOURS], Saturday [HOURS] and Sunday [HOURS].', link: { label: 'See opening hours', to: '/#visit' } },
  { id: 'location', label: 'Where are you?', keywords: ['where', 'address', 'location', 'direction', 'find you', 'parking', 'mrt', 'bus', 'map'], answer: 'We’re at [STREET ADDRESS], [CITY, POSTAL CODE].', link: { label: 'Get directions', to: shopContact.mapsUrl } },
  { id: 'events', label: 'Events this week', keywords: ['event', 'tournament', 'league', 'play', 'draft', 'commander', 'locals', 'prerelease', 'book a seat', 'sign up', 'seat'] },
  { id: 'delivery', label: 'Delivery and pickup', keywords: ['deliver', 'shipping', 'ship', 'post', 'courier', 'pickup', 'pick up', 'collect', 'arrive'], answer: 'Delivery costs [DELIVERY FEE] and arrives in [DELIVERY TIME]. Or choose store pickup at checkout and we’ll message you when your order is ready to collect.', link: { label: 'Go to the shop', to: '/shop' } },
  { id: 'payment', label: 'Payment', keywords: ['pay', 'paynow', 'card payment', 'credit', 'debit', 'cash', 'visa', 'mastercard'], answer: 'Online you can pay with PayNow or a credit / debit card. For store pickup you can also pay in store.' },
  { id: 'sell', label: 'Sell my cards', keywords: ['sell my', 'sell cards', 'sell some', 'sell to you', 'want to sell', 'can i sell', 'buy my', 'trade', 'offer', 'value', 'worth', 'collection', 'bulk', 'graded', 'slab'], answer: 'We buy singles, graded slabs, sealed product and sorted bulk. Bring them in during buy hours [BUY HOURS] and we’ll price them in front of you, then pay cash, PayNow or store credit. For a big collection, send us a quote request first.', link: { label: 'Sell your cards', to: '/sell' } },
  { id: 'discount', label: 'Discount codes', keywords: ['discount', 'code', 'promo', 'coupon', 'voucher', 'sale', 'deal', 'offer code'] },
  { id: 'release', label: 'Pre-orders', keywords: ['pre-order', 'preorder', 'pre order', 'release', 'new set', 'upcoming', 'restock', 'coming soon'] },
  { id: 'order', label: 'My order', keywords: ['my order', 'order status', 'order number', 'track', 'where is my', 'refund', 'cancel', 'return'], answer: 'Your order number is shown after checkout. We’ll message you when it’s packed and ready. For changes, cancellations or anything else, message us with your order number.', link: { label: 'Message us on WhatsApp', to: socials.find((s) => s.name === 'WhatsApp')?.url } },
  { id: 'condition', label: 'Card condition', keywords: ['condition', 'near mint', 'nm', 'played', 'lp', 'damage', 'grade', 'grading', 'psa'], answer: 'Every single is checked in store and listed as Near Mint, Lightly Played and so on. Ask to see any card up close before you buy.' }
];

// What the chat helper says when it can't match a question.
export const chatFallback = 'Sorry, I don’t know that one yet. Try a topic below, or message the shop and a person will reply.';

export const featuredSingles = [
  { game: 'Pokémon', name: '[Card name]', detail: '[Set] · Holo rare', condition: 'Near Mint' },
  { game: 'Magic', name: '[Card name]', detail: '[Set] · Mythic', condition: 'Near Mint' },
  { game: 'Yu-Gi-Oh!', name: '[Card name]', detail: '[Set] · Secret rare', condition: 'Lightly Played' },
  { game: 'One Piece', name: '[Card name]', detail: '[Set] · Alt art', condition: 'Near Mint' },
  { game: 'Pokémon', name: '[Card name]', detail: '[Set] · Full art', condition: 'Graded [GRADE]' },
  { game: 'Magic', name: '[Card name]', detail: '[Set] · Foil', condition: 'Near Mint' },
  { game: 'Yu-Gi-Oh!', name: '[Card name]', detail: '[Set] · Ultra rare', condition: 'Near Mint' },
  { game: 'One Piece', name: '[Card name]', detail: '[Set] · Leader', condition: 'Lightly Played' }
];

// seats: places at the event. taken: how many are booked. Update `taken` as people sign up.
export const events = [
  { day: 'Tuesday', name: 'Commander Night', detail: 'Casual Magic pods, all power levels welcome.', seats: 24, taken: 15 },
  { day: 'Wednesday', name: 'Pokémon League', detail: 'Learn-to-play and standard play for all ages.', seats: 20, taken: 8 },
  { day: 'Thursday', name: 'One Piece Locals', detail: 'Swiss rounds, prize support for top finishers.', seats: 16, taken: 13 },
  { day: 'Friday', name: 'Yu-Gi-Oh! Tournament', detail: 'Advanced format, store prizes and packs.', seats: 32, taken: 32 },
  { day: 'Saturday', name: 'Draft Weekend', detail: 'Booster draft for the latest set — pack included.', seats: 16, taken: 10 }
];

// game: 'Any game' shows the product under every game filter.
// isNew: true shows it in "Just landed" on the home page, with a NEW tag.
// ratio: image shape — '63 / 88' for a card, '1 / 1' for boxes and supplies.
export const products = [
  { id: 1, game: 'Pokémon', type: 'Singles', name: '[Card name]', detail: '[Set] · Near Mint', stock: '[QTY] in stock', ratio: '63 / 88', isNew: true },
  { id: 2, game: 'Magic', type: 'Singles', name: '[Card name]', detail: '[Set] · Foil · Near Mint', stock: '[QTY] in stock', ratio: '63 / 88', isNew: true },
  { id: 3, game: 'Yu-Gi-Oh!', type: 'Singles', name: '[Card name]', detail: '[Set] · Lightly Played', stock: '[QTY] in stock', ratio: '63 / 88' },
  { id: 4, game: 'One Piece', type: 'Singles', name: '[Card name]', detail: '[Set] · Alt art', stock: '[QTY] in stock', ratio: '63 / 88' },
  { id: 5, game: 'Pokémon', type: 'Sealed', name: '[Set] Booster Box', detail: '36 packs', stock: '[QTY] in stock', ratio: '1 / 1', isNew: true },
  { id: 6, game: 'Magic', type: 'Sealed', name: '[Set] Play Booster Box', detail: 'Sealed box', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 7, game: 'Lorcana', type: 'Sealed', name: '[Set] Booster Pack', detail: 'Single pack', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 8, game: 'One Piece', type: 'Sealed', name: '[Set] Starter Deck', detail: 'Ready to play', stock: '[QTY] in stock', ratio: '1 / 1', isNew: true },
  { id: 9, game: 'Any game', type: 'Supplies', name: '[Brand] Sleeves (100)', detail: 'Standard size', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 10, game: 'Any game', type: 'Supplies', name: '[Brand] 9-Pocket Binder', detail: 'Side-loading', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 11, game: 'Pokémon', type: 'Pre-orders', name: '[Upcoming set] Booster Box', detail: 'Releases [DATE]', stock: 'Pre-order', ratio: '1 / 1' },
  { id: 12, game: 'Magic', type: 'Pre-orders', name: '[Upcoming set] Collector Box', detail: 'Releases [DATE]', stock: 'Pre-order', ratio: '1 / 1' }
];

export const wanted = [
  { game: 'Pokémon', name: '[Card name]', set: '[Set]' },
  { game: 'Pokémon', name: '[Card name]', set: '[Set]' },
  { game: 'Magic', name: '[Card name]', set: '[Set]' },
  { game: 'Magic', name: '[Card name]', set: '[Set]' },
  { game: 'Yu-Gi-Oh!', name: '[Card name]', set: '[Set]' },
  { game: 'One Piece', name: '[Card name]', set: '[Set]' },
  { game: 'One Piece', name: '[Card name]', set: '[Set]' }
];

export const sampleOrders = [
  { status: 'Ready for pickup', color: 'var(--green)' },
  { status: 'Pre-order', color: 'var(--amber)' },
  { status: 'Completed', color: '#DFE3E8' }
];

// Example orders so the admin page has something to show until real ones come in.
// Staff can remove them with "Clear sample orders" on the admin page.
export function makeSampleOrders() {
  const ago = (min) => new Date(Date.now() - min * 60000).toISOString();
  const item = (id, qty) => {
    const p = products.find((x) => x.id === id);
    return { id: p.id, name: p.name, game: p.game, type: p.type, detail: p.detail, qty };
  };
  const order = (id, min, fields) => ({ id, sample: true, placedAt: ago(min), status: 'to-pack', packed: [], address: '', ...fields });
  return [
    order('S1001', 12, { customer: { name: 'Alex Tan', phone: '+65 9123 4567', email: 'alex@example.com' }, fulfilment: 'Store pickup', payment: 'PayNow', paid: true, items: [item(1, 1), item(9, 2)] }),
    order('S1002', 40, { customer: { name: 'Priya Nair', phone: '+65 8234 5678', email: 'priya@example.com' }, fulfilment: 'Delivery', address: '12 Example Road, #05-12, 123456', payment: 'Credit / debit card', paid: true, items: [item(5, 1), item(10, 1), item(2, 1)] }),
    order('S1003', 95, { customer: { name: 'Marcus Lee', phone: '+65 9345 6789', email: 'marcus@example.com' }, fulfilment: 'Delivery', address: '88 Sample Avenue, 654321', payment: 'PayNow', paid: false, items: [item(8, 2)] }),
    order('S1004', 180, { customer: { name: 'Jamie Lim', phone: '+65 8456 7890', email: 'jamie@example.com' }, fulfilment: 'Store pickup', payment: 'Pay in store', paid: false, items: [item(11, 1), item(7, 6)], status: 'ready', packed: [11, 7] }),
    order('S1005', 1500, { customer: { name: 'Wei Ling Chua', phone: '+65 9567 8901', email: 'weiling@example.com' }, fulfilment: 'Store pickup', payment: 'PayNow', paid: true, items: [item(3, 1), item(4, 1)], status: 'done', packed: [3, 4] })
  ];
}
