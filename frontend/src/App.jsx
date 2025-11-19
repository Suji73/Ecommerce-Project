import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import ProductDetail from './Pages/ProductDetail';
import Cart from './components/Cart';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PlaceOrder from "./Pages/PlaceOrder";
import EditProduct from "./Pages/EditProduct";
import ProductList from './components/ProductList';
import AddProduct from "./Pages/AddProduct";
import Footer from './components/Footer';
import OrderConfirmation from './Pages/OrderConfirmation';
import OrderHistory from "./Pages/OrderHistory";
import { CartProvider } from './context/CartContext';

import "./app.css";

// ADMIN
import AdminAddProduct from './admin/adminAddProduct';
import AdminEditProduct from './admin/adminEditProduct';
import AdminProducts from './admin/adminProducts';
import AdminDashboard from './admin/adminDashboard';
import AdminRoute from './components/adminRoute';

function App() {
  return (
    <CartProvider>
      <div className='app-container'>
        <Navbar />

        <main className='main-content'>
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-history" element={<OrderHistory />} />

            {/* ADMIN ROUTES */}
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
