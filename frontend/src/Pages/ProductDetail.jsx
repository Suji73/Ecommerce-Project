import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

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

  // ---------------- BUY NOW -----------------
  const handleBuyNow = () => {
    const buyNowItem = {
      name: product.name,
      qty: 1,
      image: product.image,
      price: product.price,
      product: product._id,
    };

    navigate("/place-order", { state: { buyNowItem } });
  };

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>

      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        className="product-detail-img"
      />

      <p className="price">Price: ₹{product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>

      {/* Buttons */}
      <div className="product-buttons">
        <button className="add-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button className="buy-now-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
