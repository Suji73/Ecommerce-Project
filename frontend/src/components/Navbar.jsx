import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();

  // Total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo">
          VegShop
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>

        <Link to="/order-history" className="nav-link">
          Orders
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
