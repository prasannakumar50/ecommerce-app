import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main className="bg-light py-4">
        <div className="container py-3">
          <div className="row gx-3 gy-3">
            <div className="col-md-3">
              <div className="position-relative">
                <img
                  src="https://cdn.shopaccino.com/qarot/products/dsc1005-12759704844383_m.jpg?v=513"
                  alt="image1"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 bg-dark bg-opacity-50 text-white fw-bold fs-6 py-2 text-center"
                  style={{
                    width: "100%",
                  }}
                >
                  MEN
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="position-relative">
                <img
                  src="https://mediahub.debenhams.com/bgg09445_black_xl_1?qlt=80&w=213&h=319.5&dpr=2&fit=ctn"
                  alt="image2"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 bg-dark bg-opacity-50 text-white fw-bold fs-6 py-2 text-center"
                  style={{
                    width: "100%",
                  }}
                >
                  WOMEN
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="position-relative">
                <img
                  src="https://angelandrocket.in/cdn/shop/files/AR7031_4.jpg?v=1725007955&width=400"
                  alt="image3"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 bg-dark bg-opacity-50 text-white fw-bold fs-6 py-2 text-center"
                  style={{
                    width: "100%",
                  }}
                >
                  KIDS
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1715693754047-4c0b56576495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                  alt="image4"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 bg-dark bg-opacity-50 text-white fw-bold fs-6 py-2 text-center"
                  style={{
                    width: "100%",
                  }}
                >
                  SNEAKERS
                </div>
              </div>
            </div>
          </div>

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
            <div className="col-md-6 d-flex align-items-stretch">
              <div className="card h-100">
                <img
                  src="https://cdn.shopaccino.com/qarot/articles/july1-542525_s.jpg?v=523"
                  className="card-img-top"
                  alt="someImage"
                  style={{
                    objectFit: "cover",
                    height: "300px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Stylish – Wearing Shirts</h5>
                  <p className="card-text">
                    when it comes to the style of dressing, there are a variety
                    of outfits men can wear which allow them to express their
                    style as well as dress for the occasion.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-stretch">
              <div className="card h-100">
                <img
                  src="https://cdn.shopaccino.com/qarot/articles/qarot-21-3-160956l-283101_l.jpg?v=523"
                  class="card-img-top"
                  alt="someImage"
                  style={{
                    objectFit: "cover",
                    height: "300px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Stay Classy in a Classic Tuxedo
                  </h5>
                  <p className="card-text">
                    A Tuxedo is a ready to wear men’s suit which suits perfectly
                    any men out there. It’s the most stylish blazer...
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
