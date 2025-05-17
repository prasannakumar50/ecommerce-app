// Initialize from localStorage
const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

// Action Creators
export const addToWishlist = (product) => ({
  type: "ADD_TO_WISHLIST",
  payload: product,
});

export const removeFromWishlist = (productId) => ({
  type: "REMOVE_FROM_WISHLIST",
  payload: productId,
});

// Reducer
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const updatedWishlist = [...state.wishlistItems, action.payload];
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      return {
        ...state,
        wishlistItems: updatedWishlist,
      };
    }

    case "REMOVE_FROM_WISHLIST": {
      const updatedWishlist = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      return {
        ...state,
        wishlistItems: updatedWishlist,
      };
    }

    default:
      return state;
  }
};

export default wishlistReducer;
