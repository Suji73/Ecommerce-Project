import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orderhistory.css"; // style this how you want

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div className="order-history">
      <h2>Your Order History</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <p><strong>Status:</strong> {order.isDelivered ? "Delivered" : "Pending"}</p>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.product}>
                {item.name} × {item.qty} - ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;