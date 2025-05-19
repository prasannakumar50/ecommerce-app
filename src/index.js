import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';  // import PersistGate
import { store, persistor} from "./redux/store"

import './index.css';
import App from './App';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';
import WishlistPage from './components/WishlistPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Address from './components/Address';
import ShippingAddress from './components/ShippingAddress';
import OrderSummary from './components/OrderSummary';
import OrderSuccessfull from './components/OrderSuccessfull';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>  {/* add PersistGate here */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:categoryName?" element={<CategoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/address" element={<Address />} />
            <Route path="/shipping-address" element={<ShippingAddress />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/order-successful" element={<OrderSuccessfull />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
