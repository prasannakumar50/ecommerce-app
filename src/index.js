import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./redux/cartReducer";
import './index.css';
import App from './App';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';
import { WishlistProvider } from './context/WishlistContext'; // Make sure this path is correct
import WishlistPage from './components/WishlistPage';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:categoryName?" element={<CategoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </Provider>
  </React.StrictMode>
);
