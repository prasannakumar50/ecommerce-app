const initialState = {
  wishlistItems: [],
};

export const addToWishlist = (product) => ({
  type: "ADD_TO_WISHLIST",
  payload: product,
});

export const removeFromWishlist = (productId) => ({
  type: "REMOVE_FROM_WISHLIST",
  payload: productId,
});

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      console.log("Reducer - ADD_TO_WISHLIST:", action.payload);
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default wishlistReducer;
