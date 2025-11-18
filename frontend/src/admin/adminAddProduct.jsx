import { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("image", image);

    const token = localStorage.getItem("authToken");

    await axios.post("http://localhost:5000/api/products", fd, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Product Added!");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Add Product</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} required />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
