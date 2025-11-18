import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product._id} className="product-card">

          <Link to={`/product/${product._id}`}>
            <div className="img-wrap">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
              />
            </div>
            <h3>{product.name}</h3>
          </Link>

          <p className="price">₹{product.price}</p>

          <button className="add-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          <button
            className="buy-btn"
            onClick={() =>
              (window.location.href = `/place-order?product=${product._id}`)
            }
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
