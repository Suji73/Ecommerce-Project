import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Fresh Vegetables Delivered to You</h1>
        <p>Buy the highest quality vegetables at the best price.</p>

        <a href="/products" className="hero-btn">Shop Now</a>
      </div>
    </div>
  );
};

export default HomePage;
