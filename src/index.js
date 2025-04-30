import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./redux/cartReducer";
import wishlistReducer from './redux/wishlistReducer';
import './index.css';
import App from './App';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';
import WishlistPage from './components/WishlistPage';
import Login from './components/Login';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:categoryName?" element={<CategoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      
    </Provider>
  </React.StrictMode>
);
