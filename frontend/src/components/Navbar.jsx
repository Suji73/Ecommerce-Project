import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">VegShop</Link>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/products" className="nav-link">Products</Link>

          <Link to="/cart" className="nav-link cart-link">
            Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <Link to="/login" className="nav-link">Login</Link>
          
          <Link to="/order-history" className="nav-link">Orders</Link>

          {/* <Link to="/admin" className="nav-link">Admin</Link>
 */}



        </div>
      </div>
    </nav>
  );
};

export default Navbar;
