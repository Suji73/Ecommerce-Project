import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const token = localStorage.getItem("token");

  // Load existing product
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setForm({
        name: res.data.name,
        price: res.data.price,
        description: res.data.description,
        category: res.data.category,
      });
      setOldImage(res.data.image);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("category", form.category);

    if (image) fd.append("image", image);

    await axios.put(`http://localhost:5000/api/products/${id}`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Product Updated Successfully!");
    navigate("/admin/products");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Edit Product</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
          />

          <input
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <label>Current Image:</label>
          <img
            src={`http://localhost:5000/uploads/${oldImage}`}
            alt="product"
            width="120"
            style={{ borderRadius: "8px" }}
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;
