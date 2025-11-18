import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, incrementQty, decrementQty, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty 😢</h2>
        <button onClick={() => navigate("/")} className="shop-btn">
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      <ul className="cart-items">
        {cartItems.map((item) => (
          <li className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="cart-item-qty">
                <button onClick={() => decrementQty(item._id)} disabled={item.qty === 1}>
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => incrementQty(item._id)}>+</button>
              </div>
              <p>Subtotal: ₹{item.price * item.qty}</p>
              <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Total: ₹{total}</h3>
        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>
        <button onClick={() => navigate("/place-order")} className="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
