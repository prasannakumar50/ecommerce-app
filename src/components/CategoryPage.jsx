import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Header from "./Header";

function CategoryPage() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  
  const selectedCategories = searchParams.get("category")
    ? searchParams.get("category").split(",").map((cat) => cat.trim().toLowerCase())
    : [];

  // Combine both path and query params for filtering
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

  // Updated filtering logic to handle non-string categories safely
  const filteredProducts = products.filter((product) => {
    const categories = Array.isArray(product.category)
      ? product.category.map((cat) => cat.trim().toLowerCase())
      : [String(product.category).trim().toLowerCase()];
  
    return (
      filterCategories.length === 0 ||
      categories.some((cat) => filterCategories.includes(cat))
    );
  });
  

  const handleCategoryChange = (category) => {
    const lower = category.toLowerCase();
    let updatedCategories = selectedCategories.includes(lower)
      ? selectedCategories.filter((c) => c !== lower)
      : [...selectedCategories, lower];

    if (updatedCategories.length > 0) {
      setSearchParams({ category: updatedCategories.join(",") });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setSearchParams({});
    navigate("/category");
  };


  console.log("Selected categories from URL:", selectedCategories);
  console.log("Filter categories:", filterCategories);

  return (
    <main>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Filters</h5>
                <h5 className="mb-0">
                  <a href="#" className="text-decoration-underline text-dark" onClick={clearFilters}>
                    Clear
                  </a>
                </h5>
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
            </div>
          </aside>

          <section className="col-md-9">
            <div className="row">
              {loading ? (
                <h1 className="text-center">Loading...</h1>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
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
