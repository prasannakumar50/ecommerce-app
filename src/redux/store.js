import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import loginRegisterReducer from './loginRegisterSlice';

// Root persist config
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [], 
};

// Persist config for each slice
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: [], // Don't persist cart items
};

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist: [], // Don't persist wishlist items
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'name', 'email', 'addresses', 'isGuest'], // only persist auth-related data
};

// Wrap reducers with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, loginRegisterReducer);

// Create root reducer
const rootReducer = {
  cart: persistedCartReducer,
  wishlist: persistedWishlistReducer,
  auth: persistedAuthReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializability warning
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

// Export a function to purge all persisted state
export const purgeStore = async () => {
  try {
    // Clear localStorage directly
    localStorage.removeItem('cartItems');
    localStorage.removeItem('wishlistItems');
    // Purge persisted state
    await persistor.purge();
    // Reset store to initial state
    store.dispatch({ type: 'RESET_STORE' });
  } catch (error) {
    console.error('Error purging store:', error);
  }
};

export { store, persistor };
