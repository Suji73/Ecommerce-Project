import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    const containerStyle = {
        maxWidth: "600px",
        margin: "50px auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      };
    
      const headingStyle = {
        color: "#28a745",
        fontSize: "2rem",
        marginBottom: "1rem",
      };
    
      const paragraphStyle = {
        fontSize: "1.1rem",
        marginBottom: "2rem",
      };
    
      const linkStyle = {
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
      };
    
      const linkHoverStyle = {
        backgroundColor: "#218838",
      };
    

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Thank you for your order!</h2>
      <p style={paragraphStyle}> Your order has been placed successfully.</p>
      <Link to="/" style={linkStyle}>
        Return to Home
      </Link>
    </div>
  );
};

export default OrderConfirmation;