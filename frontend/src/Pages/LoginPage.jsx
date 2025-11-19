import React, { useState } from "react";
import { loginUser } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      // Save TOKEN + USER in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      alert("Login Successful!");

      // If admin → navigate to Admin Dashboard
      if (res.user.isAdmin === true) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Invalid email or password!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>

      <p className="toggle-text">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default LoginPage;
