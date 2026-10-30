import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH is the folder the site is served from, e.g. "/cardshop/" on
// https://YOUR-USERNAME.github.io/cardshop/. Leave it unset for a custom domain.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/'
});
