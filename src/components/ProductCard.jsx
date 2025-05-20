import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const ProductCard = ({ product, isInWishlist, handleCardClick, handleFavoriteClick, handleAddToCart }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="col-md-3"
      key={product._id}
      onClick={() => handleCardClick(product._id)}
      style={{ cursor: "pointer" }}
    >
      {/* Make sure card is position-relative so favorite-icon can be positioned over it */}
      <div className="card h-100 w-100 position-relative hover-shadow">
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
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "1.8rem",
              cursor: "pointer",
              zIndex: 10,
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "6px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(product);
            }}
          >
            {isInWishlist ? (
              <MdFavorite style={{ color: "black" }} />
            ) : (
              <MdFavoriteBorder style={{ color: "gray" }} />
            )}
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="product-title text-lg mb-2">{product.title}</h5>
          <p className="price-text text-xl mb-3">₹{product.price}</p>
          <button
            className="btn btn-dark mt-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
