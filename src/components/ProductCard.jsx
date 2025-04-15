import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const ProductCard = ({ product, isInWishlist, handleCardClick, handleFavoriteClick }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="col-md-3"
      key={product._id}
      onClick={() => handleCardClick(product._id)}
      style={{ cursor: "pointer" }}
    >
      {/* Make sure card is position-relative so favorite-icon can be positioned over it */}
      <div className="card h-100 w-100 position-relative">
        <div className="image-container">
          <img
            src={product.imageUrl}
            className="card-img-top"
            alt={product.title}
            style={{ height: "260px", objectFit: "cover" }}
          />
          <div
            className="favorite-icon"
            style={{
              position: "absolute", // moved here for consistency
              top: "10px",
              right: "10px",
              fontSize: "1.8rem",
              cursor: "pointer",
              zIndex: 10, // bumped up for guaranteed visibility
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "6px",
              
            }}
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              handleFavoriteClick(product); // trigger favorite logic
            }}
          >
            {isInWishlist ? (
              <MdFavorite style={{ color: "black" }} />
            ) : (
              <MdFavoriteBorder style={{ color: "gray" }} />
            )}
          </div>
        </div>

        <div className="card-body d-flex flex-column justify-content-between">
          <h6 className="card-title text-secondary">{product.title}</h6>
          <p>
            <b>
              {product.currency} {product.price}
            </b>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
            className="btn btn-dark mt-2"
          >
            <b>Add to Cart</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
