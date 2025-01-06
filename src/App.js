import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="bg-light">
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
            <img
              src="https://cdn.shopaccino.com/qarot/articles/blog-610669_l.jpg?v=513"
              alt="imageS"
              className="img-fluid w-100"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
