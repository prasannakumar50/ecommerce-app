

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
      <div className="card h-100 w-100">
        <div className="image-container position-relative">
          <img
            src={product.imageUrl}
            className="card-img-top"
            alt={product.title}
            style={{ height: "260px", objectFit: "cover" }}
          />
          <div
            className="favorite-icon position-absolute"
            style={{
              top: "10px",
              right: "10px",
              fontSize: "1.5rem",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(product);
            }}
          >
            {isInWishlist ? (
              <MdFavorite style={{ fontSize: "1.5rem", color: "black" }} />
            ) : (
              <MdFavoriteBorder style={{ fontSize: "1.5rem", color: "gray" }} />
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
