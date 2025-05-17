import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';        

import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer";
import { addToCart } from "../redux/cartReducer";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedSort, setSelectedSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://backend-products-pearl.vercel.app/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.toLowerCase());

      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;

      const matchesPrice = product.price <= maxPrice;

      const matchesSearch =
        search.trim() === "" ||
        product.name.toLowerCase().includes(search.trim().toLowerCase());

      return matchesCategory && matchesRating && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (selectedSort === "low-to-high") return a.price - b.price;
      if (selectedSort === "high-to-low") return b.price - a.price;
      return 0;
    });

  const handleCategoryChange = (category) => {
    const lower = category.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  const handlePriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRating(0);
    setSelectedSort("");
    setMaxPrice(1500);
    setSearch("");
  };

  const handleFavoriteClick = (product) => {
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.warning("Product removed from wishlist", {
        style: { backgroundColor: "#000", color: "#fff", borderRadius: "8px" },
      });
    } else {
      dispatch(addToWishlist(product));
      toast.success("Product added to wishlist", {
        style: { backgroundColor: "#000", color: "#fff", borderRadius: "8px" },
      });
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart", {
      style: { backgroundColor: "#000", color: "#fff", borderRadius: "8px" },
    });
  };

  return (
    <div>
      <Header wishlist={wishlistItems} />

      <main className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Filters</h5>
                <button onClick={clearFilters} className="btn btn-sm btn-outline-dark">
                  Clear
                </button>
              </div>


              <div className="mb-4">
                <h6>Price</h6>
                <input
                  type="range"
                  className="form-range"
                  min="100"
                  max="1500"
                  value={maxPrice}
                  onChange={handlePriceChange}
                />
                <div className="d-flex justify-content-between">
                  <span>₹100</span>
                  <span>₹{maxPrice}</span>
                  <span>₹1500</span>
                </div>
              </div>

              <div className="mb-4">
                <h6>Category</h6>
                {["Men", "Women", "Kids", "Sneakers"].map((cat) => (
                  <div key={cat} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={cat}
                      checked={selectedCategories.includes(cat.toLowerCase())}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <label className="form-check-label" htmlFor={cat}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h6>Rating</h6>
                {[4, 3, 2, 1].map((star) => (
                  <div className="form-check" key={star}>
                    <input
                      className="form-check-input"
                      type="radio"
                      id={`rating-${star}`}
                      name="rating"
                      checked={selectedRating === star}
                      onChange={() => handleRatingChange(star)}
                    />
                    <label className="form-check-label" htmlFor={`rating-${star}`}>
                      {star} Stars & above
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h6>Sort by</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="low-to-high"
                    name="sort"
                    checked={selectedSort === "low-to-high"}
                    onChange={() => handleSortChange("low-to-high")}
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
                    checked={selectedSort === "high-to-low"}
                    onChange={() => handleSortChange("high-to-low")}
                  />
                  <label className="form-check-label" htmlFor="high-to-low">
                    Price - High to Low
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <section className="col-md-9">
            {loading ? (
              <div className="text-center py-5">
                <h2>Loading...</h2>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="row">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isInWishlist={wishlistItems.some((item) => item._id === product._id)}
                    handleCardClick={() => navigate(`/products/${product._id}`)}
                    handleFavoriteClick={() => handleFavoriteClick(product)}
                    handleAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </section>
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{ backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}
        bodyStyle={{ color: "#fff" }}
      />
    </div>
  );
};

export default Products;
