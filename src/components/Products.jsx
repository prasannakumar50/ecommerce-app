import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';        

import Header from "./Header";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, } from "../redux/wishlistReducer";
import { addToCart } from "../redux/cartReducer"; 


const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(1500);

  const { data, loading, error } = useFetch(
    "https://backend-products-pearl.vercel.app/products"
  );

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleFavoriteClick = (product) => {
    const alreadyInWishlist = wishlistItems.some(
      (item) => item._id === product._id
    );

    if (alreadyInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.warning(` Product removed from wishlist`,{
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      }); 
    } else {
      dispatch(addToWishlist(product));
      toast.success(` Product added to wishlist`, {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      }); 
    }
  };


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`Product added to cart`, {
      style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
    });
  };

  useEffect(() => {
    console.log("Updated wishlistItems:", wishlistItems);
  }, [wishlistItems]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  const categoryFilteredProducts =
    selectedCategories.length > 0
      ? data?.filter((product) =>
          product.category.some((cat) =>
            selectedCategories.includes(cat)
          )
        )
      : data;

  const filteredProducts = categoryFilteredProducts?.filter(
    (product) => product.price >= 100 && product.price <= price
  );

  return (
    <div>
      <Header wishlist={wishlistItems} />

      <main className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <aside className="col-md-3">
              {/* Filters Section */}
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Filters</h5>
                  <h5 className="mb-0">
                    <a
                      href="#"
                      className="text-decoration-underline text-dark"
                      onClick={() => setSelectedCategories([])}
                    >
                      Clear
                    </a>
                  </h5>
                </div>

                {/* Price Filter */}
                <div className="mb-4">
                  <h6>Price</h6>
                  <input
                    type="range"
                    className="form-range"
                    min="100"
                    max="1500"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <div className="d-flex justify-content-between">
                    <span>₹100</span>
                    <span>₹500</span>
                    <span>₹1500</span>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <h6>Category</h6>
                  {["Men", "Women", "Kids", "Sneakers"].map((category) => (
                    <div className="form-check" key={category}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label className="form-check-label" htmlFor={category}>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Rating Filter */}
                <div className="mb-4">
                  <h6>Rating</h6>
                  {[4, 3, 2, 1].map((star) => (
                    <div className="form-check" key={star}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`rating-${star}`}
                        name="rating"
                      />
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
                    <input
                      className="form-check-input"
                      type="radio"
                      id="low-to-high"
                      name="sort"
                    />
                    <label className="form-check-label" htmlFor="low-to-high">
                      Price - Low to High
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="high-to-low"
                      name="sort"
                    />
                    <label className="form-check-label" htmlFor="high-to-low">
                      Price - High to Low
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Section */}
            <section className="col-md-9">
              <div className="row g-3">
                {loading && (
                  <div className="text-center py-3">
                    <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                      Loading
                      <span className="spinner" style={{ marginLeft: "10px" }}></span>
                    </h1>
                  </div>
                )}

                {error && <p>Error loading products.</p>}

                {filteredProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isInWishlist={wishlistItems.some(
                      (item) => item._id === product._id
                    )}
                    handleCardClick={handleCardClick}
                    handleFavoriteClick={handleFavoriteClick}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <ToastContainer
  position="top-right"
  autoClose={2000}
  toastStyle={{ backgroundColor: '#000', color: '#fff', borderRadius: '8px' }}
  bodyStyle={{ color: '#fff' }}
/> 
    </div>
  );
};

export default Products;
