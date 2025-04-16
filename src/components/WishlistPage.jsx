import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer"; 
import Header from "./Header";
import ProductCard from "./ProductCard";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => {
    console.log("Redux State in WishlistPage:", state);
    return state.wishlist?.wishlistItems || [];
  });
  

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div>
      <Header wishlist={wishlistItems} />
      <main className="py-4 bg-light">
        <div className="container">
          <h2 className="mb-4">My Wishlist({wishlistItems.length})</h2>
          {wishlistItems.length === 0 ? (
            <p>No items in wishlist yet.</p>
          ) : (
            <div className="row g-3">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isInWishlist={true}
                  handleFavoriteClick={() =>
                    handleRemoveFromWishlist(product._id)
                  }
                  handleCardClick={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WishlistPage;
