import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "./Header";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("Product ID:", id);

  const { data, loading, error } = useFetch(
    `https://backend-products-pearl.vercel.app/products/${id}`
  );
  console.log(data);

  return (
    <div className=" ">
      <Header />
      <main className="container py-2">
        {loading ? (
           <div className="text-center py-3">
    
           <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
             
             Loading
             <span className="spinner" style={{ marginLeft: "10px" }}></span>
           </h1>
          
         </div>
        ) : data ? (
          <>
         <div
         className="d-flex justify-content-center align-items-center"
         style={{ height: "80vh" }}
         >
  <div
    style={{
      maxWidth: "960px",
      display: "flex",
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
      height: "450px",
      
    }}
  >
    {/* Image Section */}
    <div
      style={{
        flex: "1", 
        height: "100%",
      }}
    >
      <img
        src={data.imageUrl}
        className="img-fluid-rounded"
        alt="someImage"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>

    {/* Content Section */}
    <div
      style={{
        flex: "2", 
        padding: "20px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <h5 className="fw-bold">{data.title}</h5>
      <div className="d-flex align-items-center mb-3">
      <span>{data.rating}</span>
      <span className="ms-2 text-warning">⭐</span>
      </div>
      <p>{data.description}</p>
      <h5>
        {data.currency}
        {data.price}
      </h5>
      <b>
        <hr />
      </b>
      <p>
        <b>Availability</b>: {data.availability}
      </p>
      <p>
        <b>Size</b>: {data.size.join(", ")}
      </p>
      <p>
        <b>Delivery Time</b>: {data.deliveryTime}
      </p>
      <div
        style={{
          display: "flex",
          gap: "10px", 
          marginTop: "10px", 
        }}
      >
        <button
          style={{
            flex: 1, 
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#293B4D", 
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
        <button
          style={{
            flex: 1, 
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "black", 
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add to Wishlist
        </button>
      </div>
      
    </div>
  </div>
</div>


          </>
        ) : (
          <p>No product found.</p>
        )}
      </main>

      <></>
    </div>
  );
};

export default ProductDetails;
