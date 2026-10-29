# [SHOP NAME] website

A static website for a trading card shop: home page, online shop with cart and checkout, a "We buy cards" page and an account page. It's plain HTML, CSS and JavaScript, so it runs on GitHub Pages with no build step.

## Files

- `index.html` – home page (featured singles, events, visit info, sign-up)
- `shop.html` – shop, cart and checkout
- `sell.html` – we buy cards, wanted list, quote request
- `account.html` – sign up, log in, my account
- `assets/runtime.js` – small script that powers buttons, filters and the cart
- `assets/app.css` – a few shared styles

## Publish on GitHub Pages

1. Create a free account at github.com and click **New repository**. Name it (for example `cardshop`), set it to **Public**, and create it.
2. On the new repository page, click **uploading an existing file**, drag in everything from this folder (including the `assets` folder), then click **Commit changes**.
3. Go to **Settings → Pages**. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
4. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/cardshop/`.

## Use your own domain

1. In **Settings → Pages → Custom domain**, enter your domain (for example `www.yourcardshop.com`) and save.
2. At your domain registrar, add a **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`.
3. Back in GitHub, tick **Enforce HTTPS** once it becomes available.

## Before going live

- Search all files for `[` to find placeholders like `[SHOP NAME]`, `[PRICE]`, `[HOURS]` and `[STREET ADDRESS]`, and replace them with your real details.
- Edit products, events and the wanted list in the `<script>` near the bottom of each page.
- The forms, cart, checkout and accounts are a working front end only. To receive orders, take payments and store accounts, connect a service such as Stripe (cards and PayNow), Shopify, or a form service like Formspree.
