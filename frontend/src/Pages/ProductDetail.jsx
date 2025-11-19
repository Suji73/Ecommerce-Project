import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>

      <img
        className="detail-image"
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
      />

      <p className="detail-price">Price: ₹{product.price}</p>
      <p className="detail-description">{product.description}</p>
      <p className="detail-category">Category: {product.category}</p>

      <div className="detail-buttons">
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button
          className="buy-btn"
          onClick={() => {
            addToCart(product);
            navigate("/place-order");
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
