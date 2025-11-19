import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Read ?category= from URL
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");

        // ⭐ Filter based on category
        const filtered = category
  ? data.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().trim() === category.toLowerCase().trim()
    )
  : data;

setProducts(filtered);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  if (products.length === 0)
    return <p style={{ textAlign: "center" }}>No products found.</p>;

  return (
    <div className="product-grid">
      {/* Show category title */}
      {category && (
        <h2 style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
          Showing: {category}
        </h2>
      )}

      {products.map((product) => (
        <div key={product._id} className="product-card">
          <div
            className="product-img"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
            />
          </div>

          <h3>{product.name}</h3>
          <p className="price">₹{product.price}</p>

          <div className="card-buttons">
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button
              className="buy"
              onClick={() => {
                addToCart(product);
                navigate("/place-order");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
