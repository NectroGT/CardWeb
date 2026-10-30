// Edit the shop's products, events and wanted list here.

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

export const events = [
  { day: 'Tuesday', name: 'Commander Night', detail: 'Casual Magic pods, all power levels welcome.' },
  { day: 'Wednesday', name: 'Pokémon League', detail: 'Learn-to-play and standard play for all ages.' },
  { day: 'Thursday', name: 'One Piece Locals', detail: 'Swiss rounds, prize support for top finishers.' },
  { day: 'Friday', name: 'Yu-Gi-Oh! Tournament', detail: 'Advanced format, store prizes and packs.' },
  { day: 'Saturday', name: 'Draft Weekend', detail: 'Booster draft for the latest set — pack included.' }
];

// game: 'Any game' shows the product under every game filter.
// ratio: image shape — '63 / 88' for a card, '1 / 1' for boxes and supplies.
export const products = [
  { id: 1, game: 'Pokémon', type: 'Singles', name: '[Card name]', detail: '[Set] · Near Mint', stock: '[QTY] in stock', ratio: '63 / 88' },
  { id: 2, game: 'Magic', type: 'Singles', name: '[Card name]', detail: '[Set] · Foil · Near Mint', stock: '[QTY] in stock', ratio: '63 / 88' },
  { id: 3, game: 'Yu-Gi-Oh!', type: 'Singles', name: '[Card name]', detail: '[Set] · Lightly Played', stock: '[QTY] in stock', ratio: '63 / 88' },
  { id: 4, game: 'One Piece', type: 'Singles', name: '[Card name]', detail: '[Set] · Alt art', stock: '[QTY] in stock', ratio: '63 / 88' },
  { id: 5, game: 'Pokémon', type: 'Sealed', name: '[Set] Booster Box', detail: '36 packs', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 6, game: 'Magic', type: 'Sealed', name: '[Set] Play Booster Box', detail: 'Sealed box', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 7, game: 'Lorcana', type: 'Sealed', name: '[Set] Booster Pack', detail: 'Single pack', stock: '[QTY] in stock', ratio: '1 / 1' },
  { id: 8, game: 'One Piece', type: 'Sealed', name: '[Set] Starter Deck', detail: 'Ready to play', stock: '[QTY] in stock', ratio: '1 / 1' },
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
  { status: 'Ready for pickup', color: '#B5EAD7' },
  { status: 'Pre-order', color: '#FFE3A3' },
  { status: 'Completed', color: '#DFE3E8' }
];
