const initialState = {
    cartItems: [],
  };

  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload], 
        };
      default:
        return state;
    }
  };


  export const addToCart = (product) => ({
    type: "ADD_TO_CART",
    payload: product,
  });
  
  export default cartReducer;
  