import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUtils";
import "./ProductCard.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        className="card-img"
        onError={(e) => {
          e.target.src = '/placeholder.svg';
        }}
      />

      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>
      <p className="description">{product.description}</p>

      <div className="button-group">
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <Link to={`/product/${product._id}`} className="link-btn">View</Link>

        <button className="edit-btn" onClick={() => onEdit(product._id)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(product._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
