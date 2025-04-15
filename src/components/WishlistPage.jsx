// Wishlist.jsx
import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "./ProductCard";
import Header from "./Header";

const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
      <Header />
      <main className="py-4 bg-light">
        <div className="container">
          <h2 className="mb-4">My Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>No items in wishlist yet.</p>
          ) : (
            <div className="row g-3">
              {wishlist.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isInWishlist={true}
                  handleFavoriteClick={() => {}}
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
