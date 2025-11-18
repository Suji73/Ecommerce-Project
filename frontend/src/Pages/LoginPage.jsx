import React, { useState } from "react";
import { loginUser } from "../apis/userApi";
import { useNavigate, Link } from "react-router-dom";
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

    console.log("LOGIN RESPONSE:", res);  // ⭐ IMPORTANT

    localStorage.setItem("authToken", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    if (res.user && res.user.isAdmin === true) {
      navigate("/admin");
    } else {
      navigate("/home");
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    alert("Login failed!");
  }
};

  return (
    <div className="page-center">
    <form onSubmit={handleSubmit} className="auth-wrapper" autoComplete="off">
  <div className="auth-card">
    <h2>Login</h2>

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

    <button type="submit" className="auth-btn">Login</button>

    <p className="auth-switch">
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </div>
</form>
</div>
  );
};


export default LoginPage;
