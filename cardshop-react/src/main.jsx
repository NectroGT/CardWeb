import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { StoreProvider } from './store.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Sell from './pages/Sell.jsx';
import Account from './pages/Account.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="sell" element={<Sell />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
