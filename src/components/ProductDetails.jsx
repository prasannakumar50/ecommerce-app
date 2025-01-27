import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "./Header";

const ProductDetails = ()=>{
    const { id } = useParams();
    console.log("Product ID:", id);

    const {data, loading, error} = useFetch(`https://backend-products-pearl.vercel.app/products/${id}`)
    console.log(data);

    return(
        <div className=" ">
            <Header />
            <main className="container py-2 bg-light">
            {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <>
           
           <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}> {/* Decreased height to 80% of the viewport */}
  <div style={{ maxWidth: '540px', display: 'flex', borderRadius: '10px', overflow: 'hidden', height: '450px' }}> {/* Decreased height to 450px */}
    <div style={{ width: '60%', height: '100%' }}> {/* Image container width set to 60% */}
      <img src={data.imageUrl} className="img-fluid" alt="someImage" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ width: '40%', padding: '20px', backgroundColor: 'white', height: '100%' }}> {/* Increased width of text section */}
      <h5 className="fw-bold">{data.title}</h5>
      <p className="">
       {data.description}
      </p>
      <h5>{data.currency}{data.price}</h5>
       <b><hr/></b>
       <p><b>Availability</b> :  {data.availability}</p>
       <p><b>Size</b> :  {data.size.join(", ")}</p>
       <p><b>Delivery Time</b> :  {data.deliveryTime}</p>
      <p>
        <small className="text-body-secondary">Last updated 3 mins ago</small>
      </p>
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
    )
}


export default ProductDetails;