import React, { useState } from "react";
import Header from "./Header";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(1500); // Price range state

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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((checkedItem) => checkedItem !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  // Step 1: Filter by category
  const categoryFilteredProducts =
    selectedCategories.length > 0
      ? data?.filter((product) =>
          product.category.some((category) =>
            selectedCategories.includes(category)
          )
        )
      : data;

  // Step 2: Filter by price (100 to slider value)
  const filteredProducts = categoryFilteredProducts?.filter(
    (product) => product.price >= 100 && product.price <= price
  );

  return (
    <div>
      <Header wishlist={wishlist} />
      <main className="py-4 bg-light">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <aside className="col-md-3">
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
                  <div className="form-check">
                    {["Men", "Women", "Kids", "Sneakers"].map((category) => (
                      <div key={category}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={category}
                        >
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
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`rating-${star}`}
                        name="rating"
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`rating-${star}`}
                      >
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
                    <h1
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                      }}
                    >
                      Loading
                      <span
                        className="spinner"
                        style={{ marginLeft: "10px" }}
                      ></span>
                    </h1>
                  </div>
                )}
                {error && <p>Error loading products.</p>}

                {filteredProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isInWishlist={wishlist.some(
                      (item) => item._id === product._id
                    )}
                    handleCardClick={handleCardClick}
                    handleFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
