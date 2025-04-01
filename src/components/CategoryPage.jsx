import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import ProductCard from "./ProductCard";

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected categories from query parameters
  const selectedCategories = searchParams.get("categories")?.split(",") || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend-products-pearl.vercel.app/products"
        );
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

  // Handle category selection
  const handleCategoryChange = (category) => {
    let newCategories = [...selectedCategories];

    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category);
    } else {
      newCategories.push(category);
    }

    setSearchParams(newCategories.length ? { categories: newCategories.join(",") } : {});
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Filter products based on selected categories
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) => selectedCategories.includes(product.category))
      : products;

  return (
    <main>
      <Header />
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
<aside className="col-md-3">
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Filters</h5>
                  <h5 className="mb-0">
                    <a href="#" className="text-decoration-underline text-dark"  >
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
                    max="500"
                  />
                  <p>₹100 - ₹500</p>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                <h6>Category</h6>
                {["Men", "Women", "Kids", "Sneakers"].map((cat) => (
                  <div key={cat} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <label className="form-check-label" htmlFor={cat}>
                      {cat}
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

          {/* Product Grid */}
          <section className="col-md-9">
            <div className="row">
              {loading ? (
                <h1 className="text-center">Loading...</h1>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
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
