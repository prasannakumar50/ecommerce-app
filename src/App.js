import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/App.css"; 
import "./styles/typography.css"; 

import Header from "./components/Header";
import Footer from "./components/Footer";
import { setTokenFromStorage } from "./redux/loginRegisterSlice";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => {
    return state.wishlist?.wishlistItems || [];
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setTokenFromStorage(storedToken));
    }
  }, [dispatch]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend-products-pearl.vercel.app/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  // Update selectedCategories state based on URL parameters
  useEffect(() => {
    
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      const categoriesFromURL = category.split(",").map((cat) => cat.trim());
      setSelectedCategories(categoriesFromURL);
    } else {
      setSelectedCategories([]);
    }
  }, [location.search]);

  // Toggle a category and update the URL accordingly.
  const handleCategoryClick = (categoryName) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryName)
        ? prevCategories.filter((c) => c !== categoryName)
        : [...prevCategories, categoryName];

      navigate(`/products?category=${newCategories.join(",")}`);
      return newCategories;
    });
  };

  // Filter products based on selectedCategories
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) => {
          return selectedCategories.includes(product.category);
        })
      : products;


  return (
    <div>
      <Header wishlist={wishlistItems} />
      <main className="bg-light py-4">
        <div className="container py-3">
          {/* Category Cards */}
          <div className="row gx-3 gy-3">
            {[
              {
                name: "Men",
                image:
                  "https://cdn.shopaccino.com/qarot/products/dsc1005-12759704844383_m.jpg?v=513",
              },
              {
                name: "Women",
                image:
                  "https://mediahub.debenhams.com/bgg09445_black_xl_1?qlt=80&w=213&h=319.5&dpr=2&fit=ctn",
              },
              {
                name: "Kids",
                image:
                  "https://angelandrocket.in/cdn/shop/files/AR7031_4.jpg?v=1725007955&width=400",
              },
              {
                name: "Sneakers",
                image:
                  "https://images.unsplash.com/photo-1715693754047-4c0b56576495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
              },
            ].map((category, index) => (
              <div key={index} className="col-6 col-md-3">
                <Link
                  to={`/category?category=${category.name}`}
                  className="text-decoration-none"
                >
                  <div className="category-card hover-shadow">
                    <img src={category.image} alt={category.name} />
                    <div className="category-overlay">
                      {category.name.toUpperCase()}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Carousel and Cards sections */}
          <div className="py-4">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleSlidesOnly"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleSlidesOnly"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleSlidesOnly"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleSlidesOnly"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleSlidesOnly"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleSlidesOnly"
                  data-bs-slide-to="5"
                  aria-label="Slide 6"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://cdn.shopaccino.com/qarot/slideshows/fest4-17692051353140_l.jpg?v=523"
                    className="d-block w-100"
                    alt="Festive Product 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://cdn.shopaccino.com/qarot/slideshows/fest3-17735653571598_l.jpg?v=523"
                    className="d-block w-100"
                    alt="Festive Product 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://cdn.shopaccino.com/qarot/articles/blog-610669_l.jpg?v=523"
                    className="d-block w-100"
                    alt="Blog Feature"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/24FW_Knit/Women/KV-women-pc02.jpg"
                    className="d-block w-100"
                    alt="Women's Knit Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/24FW_Knit/Women/Fix/LineupBanner-women-Cashmere-05-pc.jpg"
                    className="d-block w-100"
                    alt="Women's Cashmere Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://im.uniqlo.com/global-cms/spa/resf246a0a1f3f6c3844ad9ebcdd1c88400fr.jpg"
                    className="d-block w-100"
                    alt="UNIQLO Collection"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-12 col-md-6 d-flex align-items-stretch mb-3 mb-md-0">
              <div className="card h-100 blog-card hover-shadow">
                <img
                  src="https://cdn.shopaccino.com/qarot/articles/july1-542525_s.jpg?v=523"
                  className="card-img-top"
                  alt="someImage"
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Stylish – Wearing Shirts</h5>
                  <p className="card-text">
                    When it comes to style, there are a variety of outfits that
                    allow men to express themselves and dress appropriately for
                    any occasion.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-stretch">
              <div className="card h-100 blog-card hover-shadow">
                <img
                  src="https://cdn.shopaccino.com/qarot/articles/qarot-21-3-160956l-283101_l.jpg?v=523"
                  className="card-img-top"
                  alt="someImage"
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Stay Classy in a Classic Tuxedo
                  </h5>
                  <p className="card-text">
                    A tuxedo is a ready-to-wear suit that exudes style and
                    elegance for any special occasion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
