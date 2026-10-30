# [SHOP NAME] website (React)

The trading card shop site — home, shop with cart and checkout, "We buy cards" and account pages — built with React and Vite.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```
cd cardshop-react
npm install
npm run dev
```

Then open http://localhost:5173. Edits to files in `src/` show up in the browser straight away.

## Files

- `src/data.js` – products, featured singles, events, the wanted list and your social media links. **Edit your stock and handles here.**
- `src/pages/` – one file per page: `Home.jsx`, `Shop.jsx`, `Sell.jsx`, `Account.jsx`
- `src/components/Layout.jsx` – header and footer shared by every page
- `src/components/ui.jsx` – small shared pieces (filter chips, form fields, image placeholder)
- `src/components/Icons.jsx` – the SVG icons
- `src/store.jsx` – the cart and light/dark theme, saved in the browser so they survive page changes and reloads
- `src/styles.css` – colours, theme and shared styles

## Publish on GitHub Pages

The repository includes a workflow (`.github/workflows/deploy.yml`) that builds and publishes the site whenever you push to `main`.

1. Push the repository to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push a change (or run the workflow from the **Actions** tab). The site goes live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

For a custom domain, set `BASE_PATH: /` in the workflow, then add the domain under **Settings → Pages → Custom domain**.

To build by hand instead: `npm run build` writes the finished site to `dist/`.

## Before going live

- Search `src/` for `[` to find placeholders like `[SHOP NAME]`, `[PRICE]`, `[HOURS]` and `[STREET ADDRESS]`, and replace them with your real details. The page titles are set in each page file and in `index.html`.
- The forms, cart, checkout and accounts are a working front end only. To receive orders, take payments and store accounts, connect a service such as Stripe (cards and PayNow), Shopify, or a form service like Formspree.
