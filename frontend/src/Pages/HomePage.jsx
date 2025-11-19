import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Fresh Vegetables Delivered to You</h1>
          <p>100% organic and hand-picked daily from trusted farmers.</p>
          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>

        <div className="hero-img">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/044/771/696/small/a-basket-brimming-with-vegetables-free-png.png" alt="Vegetables" />
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">

          <Link to="/products?category=Leaf" className="category-card">
            Leafy Greens
          </Link>

          <Link to="/products?category=Roots" className="category-card">
            Root Vegetables
          </Link>

          <Link to="/products?category=Vegetable" className="category-card">
            Seasonal Veggies
          </Link>

          <Link to="/products?category=Fruits" className="category-card">
            Organic Specials
          </Link>

        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <p>Top-selling vegetables this week</p>
        <Link to="/products">
          <button className="view-btn">View All Products</button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
