import React, { useState } from "react";
import { registerUser } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      console.log("Registration Response:", res); 
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message); 
      alert("Registration failed!");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
      <div className="form-container">
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      /><br />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      /><br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      /><br />
      <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterPage;