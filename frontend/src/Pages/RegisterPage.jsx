import React, { useState } from "react";
import { registerUser } from "../apis/userApi";
import { useNavigate, Link } from "react-router-dom";
import "./Form.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="page-center">
    <form onSubmit={handleSubmit} className="auth-wrapper" autoComplete="off">
  <div className="auth-card">
    <h2>Register</h2>

    <input
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      name="email"
      type="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      autoComplete="off"
      required
    />

    <input
      name="password"
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      autoComplete="new-password"
      required
    />

    <button type="submit" className="auth-btn">Register</button>

    <p className="auth-switch">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
</form>
</div>
  );
};

export default RegisterPage;
