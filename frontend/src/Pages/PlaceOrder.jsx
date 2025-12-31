import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Placeorder.css";

const PlaceOrder = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Validation
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/");
      return;
    }

    if (!shipping.address || !shipping.city || !shipping.postalCode || !shipping.country) {
      alert("Please fill in all shipping address fields");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
    }));

    const orderData = {
      orderItems,
      shippingAddress: shipping,
      paymentMethod,
      totalPrice,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        clearCart();
        navigate("/order-confirmation");
      }
    } catch (err) {
      console.error("Order failed", err.response?.data || err.message);
      alert(err.response?.data?.message || "Order placement failed!");
    }
  };

  return (
    <div className="place-order-container">
      <h2>Place Your Order</h2>

      <div className="form-section">
        <h3>Shipping Address</h3>
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="postalCode" placeholder="Postal Code" onChange={handleChange} />
        <input name="country" placeholder="Country" onChange={handleChange} />
      </div>

      <div className="form-section">
        <h3>Payment Method</h3>
        <select onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
          <option>UPI Id</option>
        </select>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id}>
            {item.name} × {item.qty} = ₹{item.price * item.qty}
          </div>
        ))}
        <h4>Total: ₹{totalPrice}</h4>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default PlaceOrder;