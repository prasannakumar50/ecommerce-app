import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer";

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items || []);  // Default to empty array if undefined


  const selectedCategories = searchParams.get("category")
    ? searchParams.get("category").split(",").map((cat) => cat.trim().toLowerCase())
    : [];

  const selectedRating = parseInt(searchParams.get("rating")) || 0;
  const selectedSort = searchParams.get("sort") || "";
  const maxPrice = parseInt(searchParams.get("price")) || 1500;

  const filterCategories = categoryName
    ? [categoryName.toLowerCase(), ...selectedCategories]
    : selectedCategories;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://backend-products-pearl.vercel.app/products`);
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
      const categories = Array.isArray(product.category)
        ? product.category.map((cat) => cat.trim().toLowerCase())
        : [String(product.category).trim().toLowerCase()];

      const matchesCategory =
        filterCategories.length === 0 ||
        categories.some((cat) => filterCategories.includes(cat));

      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesRating && matchesPrice;
    })
    .sort((a, b) => {
      if (selectedSort === "low-to-high") return a.price - b.price;
      if (selectedSort === "high-to-low") return b.price - a.price;
      return 0;
    });

  const updateSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    const lower = category.toLowerCase();
    let updatedCategories = selectedCategories.includes(lower)
      ? selectedCategories.filter((c) => c !== lower)
      : [...selectedCategories, lower];

    updateSearchParams("category", updatedCategories.join(","));
  };

  const handleRatingChange = (rating) => {
    updateSearchParams("rating", rating);
  };

  const handleSortChange = (sort) => {
    updateSearchParams("sort", sort);
  };

  const handlePriceChange = (e) => {
    updateSearchParams("price", e.target.value);
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setSearchParams({});
    navigate("/category");
  };


  const handleFavoriteClick = (product) => {
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };


  return (
    <main>
      <Header wishlist={wishlistItems} />
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Filters</h5>
                <a href="#" className="text-decoration-underline text-dark" onClick={clearFilters}>
                  Clear
                </a>
              </div>

              <div className="mb-4">
                <h6>Price</h6>
                <input
                  type="range"
                  className="form-range"
                  min="100"
                  max="1500"
                  onChange={handlePriceChange}
                />
                <div className="d-flex justify-content-between">
                  <span>₹100</span>
                  <span>₹500</span>
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
            <div className="row">
              {loading ? (
                <div className="text-center py-3">
                  <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                    Loading <span className="spinner" style={{ marginLeft: "10px" }}></span>
                  </h1>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) =><ProductCard
                key={product._id}
                product={product}
                isInWishlist={wishlistItems.some((item) => item._id === product._id)}

                
                handleCardClick={() => navigate(`/products/${product._id}`)}
                handleFavoriteClick={handleFavoriteClick}
              />)
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default CategoryPage;
