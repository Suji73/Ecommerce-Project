import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./components/Cart";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PlaceOrder from "./Pages/PlaceOrder";
import EditProduct from "./Pages/EditProduct";
import ProductList from "./components/ProductList";
import AddProduct from "./Pages/AddProduct";
import Footer from "./components/Footer";
import OrderConfirmation from "./Pages/OrderConfirmation";
import OrderHistory from "./Pages/OrderHistory";

import { CartProvider } from "./context/CartContext";
import "./app.css";

// Admin Imports
import AdminAddProduct from "./admin/adminAddProduct";
import AdminDashboard from "./admin/adminDashboard";
import AdminEditProduct from "./admin/adminEditProduct";
import AdminProducts from "./admin/adminProducts";
import AdminRoute from "./components/adminRoute";

// User Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* ---------- AUTH FIRST ---------- */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ---------- PROTECTED USER ROUTES ---------- */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/place-order"
              element={
                <ProtectedRoute>
                  <PlaceOrder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order-history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />

            {/* ---------- ADMIN ROUTES ---------- */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/add-product"
              element={
                <AdminRoute>
                  <AdminAddProduct />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/edit-product/:id"
              element={
                <AdminRoute>
                  <AdminEditProduct />
                </AdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
