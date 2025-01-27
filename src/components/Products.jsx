import React from "react";
import Header from "./Header";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const navigate = useNavigate(); 

  const { data, loading, error } = useFetch(
    "https://backend-products-pearl.vercel.app/products"
  );
  console.log(data);

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`); // Redirect to the product details page
  };


  return (
    <div>
      <Header />
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
                <div className="form-check">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="men-clothing"
                    />
                    <label className="form-check-label" htmlFor="men-clothing">
                      Men Clothing
                    </label>
                  </div>

                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="women-clothing"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="women-clothing"
                    >
                      Women
                    </label>
                  </div>

                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="kids-clothing"
                    />
                    <label className="form-check-label" htmlFor="kids-clothing">
                      Kids
                    </label>
                  </div>

                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sneakers"
                    />
                    <label className="form-check-label" htmlFor="sneakers">
                      Sneakers
                    </label>
                  </div>
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
              {loading && <p>Loading...</p>}
              {error && <p>Error loading products.</p>}
              {data?.map((product) => (
          
                <div
                  className="col-md-3"
                  key={product.id}
                  onClick={() => handleCardClick(product._id)} // Handle card click
                  style={{ cursor: "pointer" }} // Add pointer cursor
                >
                  <div className="card h-100 w-100">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: "260px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h6 className="card-title text-secondary">
                        {product.title}
                      </h6>
                      <p>
                        <b>
                          {product.currency} {product.price}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                
              ))}
              
            </div>
          </section>



        </div>
      </main>
    </div>
  );
};

export default Products;
