import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="bg-light">
        <div className="container py-3">
          <div className="row gx-0">
            <div
              className="col-md-3 d-flex mb-3 py-2 position-relative"
              style={{
                margin: "0",
                padding: "0",
                overflow: "hidden",
              }}
            >
              <img
                src="https://cdn.shopaccino.com/qarot/products/dsc1005-12759704844383_m.jpg?v=513"
                alt="image2"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                className="img-fluid"
              />
              <div
                className="position-absolute bottom-0 start-0 text-center bg-dark bg-opacity-50 text-white py-2"
                style={{
                  bottom: "0",
                  width: "100%",
                  margin: 0,
                  padding: "10px 0",
                  boxSizing: "border-box",
                  transform: "translateY(-7px)",
                }}
              >
                MEN
              </div>
            </div>

            <div className="col-md-3 d-flex mb-3 py-2">
              <img
                src="https://mediahub.debenhams.com/bgg09445_black_xl_1?qlt=80&w=213&h=319.5&dpr=2&fit=ctn"
                alt="image2"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                className="img-fluid"
              />
              
              
            </div>

            <div className="col-md-3 d-flex mb-3 py-2">
              <img
                src="https://angelandrocket.in/cdn/shop/files/AR7031_4.jpg?v=1725007955&width=400"
                alt="image2"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                className="img-fluid"
              />
            </div>

            <div className="col-md-3 d-flex mb-3 py-2">
              <img
                src="https://images.unsplash.com/photo-1715693754047-4c0b56576495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                alt="image2"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="py-4">
            <img
              src="https://cdn.shopaccino.com/qarot/articles/blog-610669_l.jpg?v=513"
              alt="imageS"
              className="img-fluid"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
