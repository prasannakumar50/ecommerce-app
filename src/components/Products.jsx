import React, { useState } from "react";
import Header from "./Header";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToCart } from "../redux/cartReducer";

const Products = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { data, loading, error } = useFetch(
    "https://backend-products-pearl.vercel.app/products"
  );

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleFavoriteClick = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item._id === product._id)) {
        return prevWishlist.filter((item) => item._id !== product._id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  return (
    <div>
      <Header wishlist={wishlist} />
      <main className="container py-4 bg-light">
        <div className="row">
          {/* Filters Sidebar */}
          <aside className="col-md-3">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Filters</h5>
                <h5 className="mb-0">
                  <a href="#" className="text-decoration-underline text-dark">
                    Clear
                  </a>
                </h5>
              </div>

              {/* Price Filter */}
              <div className="mb-4">
                <h6>Price</h6>
                <input type="range" className="form-range" min="100" max="500" />
                <p>₹100 - ₹500</p>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <h6>Category</h6>
                <div className="form-check">
                  {["Men Clothing", "Women", "Kids", "Sneakers"].map((category) => (
                    <div key={category}>
                      <input className="form-check-input" type="checkbox" id={category} />
                      <label className="form-check-label" htmlFor={category}>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <h6>Rating</h6>
                {[4, 3, 2, 1].map((star) => (
                  <div className="form-check" key={star}>
                    <input className="form-check-input" type="radio" id={`rating-${star}`} name="rating" />
                    <label className="form-check-label" htmlFor={`rating-${star}`}>
                      {star} Stars & above
                    </label>
                  </div>
                ))}
              </div>

              {/* Sort Filter */}
              <div className="mb-4">
                <h6>Sort by</h6>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="low-to-high" name="sort" />
                  <label className="form-check-label" htmlFor="low-to-high">Price - Low to High</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="high-to-low" name="sort" />
                  <label className="form-check-label" htmlFor="high-to-low">Price - High to Low</label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <section className="col-md-9">
            <div className="row g-3">
              {loading && (
                <div className="text-center py-3">
                  <h1 className="d-flex align-items-center justify-content-center" style={{ fontSize: "3rem" }}>
                    Loading
                    <span className="spinner" style={{ marginLeft: "10px" }}></span>
                  </h1>
                  {error && <p>Error loading products.</p>}
                </div>
              )}

              {data?.map((product) => {
                const isInWishlist = wishlist.some((item) => item._id === product._id);

                return (
                  <div
                    className="col-md-3"
                    key={product._id}
                    onClick={() => handleCardClick(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card h-100 w-100">
                      <div className="image-container position-relative">
                        <img
                          src={product.imageUrl}
                          className="card-img-top"
                          alt={product.title}
                          style={{ height: "260px", objectFit: "cover" }}
                        />
                        <div
                          className="favorite-icon position-absolute"
                          style={{
                            top: "10px",
                            right: "10px",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            zIndex: 1,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteClick(product);
                          }}
                        >
                          {isInWishlist ? (
                            <MdFavorite style={{ fontSize: "1.5rem", color: "black" }} />
                          ) : (
                            <MdFavoriteBorder style={{ fontSize: "1.5rem", color: "gray" }} />
                          )}
                        </div>
                      </div>

                      <div className="card-body d-flex flex-column justify-content-between">
                        <h6 className="card-title text-secondary">{product.title}</h6>
                        <p>
                          <b>
                            {product.currency} {product.price}
                          </b>
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(product));
                          }}
                          className="btn btn-primary mt-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Products;
