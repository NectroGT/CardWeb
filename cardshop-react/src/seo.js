// What search engines and link previews show for each page. Used in the browser and by the build,
// which writes a copy of the page for each address so Google can read it (see vite.config.js).
import { shopContact, shopDetails, socials } from './data.js';

export const pageMeta = {
  '/': {
    title: '[SHOP NAME] – Trading card shop',
    description: 'Trading cards, singles, sealed product and weekly tournaments for Pokémon, Magic, Yu-Gi-Oh!, One Piece and more. Shop online, pick up in store.'
  },
  '/shop': {
    title: 'Shop online – [SHOP NAME]',
    description: 'Buy Pokémon, Magic, Yu-Gi-Oh!, One Piece and Lorcana singles, sealed booster boxes, pre-orders and supplies. Pick up in store or get it delivered.'
  },
  '/sell': {
    title: 'Sell your cards – [SHOP NAME]',
    description: 'Sell or trade your Pokémon, Magic, Yu-Gi-Oh! and One Piece cards, graded slabs and sealed product. Fair offers at market prices, paid on the spot.'
  },
  // Nothing here for search results, so search engines are asked to skip it.
  '/account': {
    title: 'Your account – [SHOP NAME]',
    description: 'Sign in to see your orders, pre-orders and store credit.',
    noindex: true
  }
};

// Leaves out anything still showing a [PLACEHOLDER], so Google never gets made-up details.
const real = (v) => typeof v === 'string' && v.trim() !== '' && !v.includes('[');

// The shop's details in the format Google uses for business listings (schema.org).
export function storeData(siteUrl) {
  const d = shopDetails;
  const address = {
    '@type': 'PostalAddress',
    ...(real(d.street) && { streetAddress: d.street }),
    ...(real(d.city) && { addressLocality: d.city }),
    ...(real(d.postalCode) && { postalCode: d.postalCode }),
    addressCountry: d.country
  };
  const hours = d.hours
    .filter((h) => real(h.opens) && real(h.closes))
    .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }));
  const links = socials.map((s) => s.url).filter(real);
  return {
    '@context': 'https://schema.org',
    '@type': 'HobbyShop',
    name: d.name,
    description: pageMeta['/'].description,
    url: siteUrl + '/',
    image: siteUrl + '/og-image.png',
    logo: siteUrl + '/icon-512.png',
    address,
    ...(real(shopContact.phone) && { telephone: shopContact.phone }),
    ...(real(d.email) && { email: d.email }),
    ...(real(shopContact.mapsUrl) && { hasMap: shopContact.mapsUrl }),
    ...(hours.length && { openingHoursSpecification: hours }),
    ...(links.length && { sameAs: links })
  };
}

// Which details are still placeholders, so the build can remind you.
export function missingDetails() {
  const d = shopDetails;
  const missing = [];
  if (!real(d.name)) missing.push('shop name');
  if (!real(d.street) || !real(d.city) || !real(d.postalCode)) missing.push('address');
  if (!real(shopContact.phone)) missing.push('phone');
  if (d.hours.some((h) => !real(h.opens) || !real(h.closes))) missing.push('opening hours');
  if (!socials.some((s) => real(s.url))) missing.push('social links');
  return missing;
}
