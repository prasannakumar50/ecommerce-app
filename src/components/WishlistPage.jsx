import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer"; 
import { addToCart } from "../redux/cartReducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import ProductCard from "./ProductCard";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const wishlistItems = useSelector((state) => {
    console.log("Redux State in WishlistPage:", state);
    return state.wishlist?.wishlistItems || [];
  });

  // Filter wishlist items based on search term
  const filteredWishlistItems = wishlistItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.warning(`Product removed from wishlist`, {
      style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
    });
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`Product added to Cart`, {
      style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
    });
  };

  return (
    <div>
      <Header wishlist={wishlistItems} search={search} setSearch={setSearch} />
      <div className="container py-4">
        <h2 className="text-center mb-4">My Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-center">Your wishlist is empty.</p>
        ) : filteredWishlistItems.length === 0 ? (
          <p className="text-center">No items match your search.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {filteredWishlistItems.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onAddToCart={() => handleAddToCart(item)}
                onAddToWishlist={() => handleAddToWishlist(item)}
                onRemoveFromWishlist={() => handleRemoveFromWishlist(item._id)}
                isInWishlist={true}
                handleCardClick={(id) => navigate(`/products/${id}`)}
                handleFavoriteClick={() => handleRemoveFromWishlist(item._id)}
                handleAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "8px",
        }}
        bodyStyle={{ color: "#fff" }}
      />
    </div>
  );
};

export default WishlistPage;
