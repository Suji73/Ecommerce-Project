import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Product List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td><img src={`http://localhost:5000/uploads/${p.image}`} width="60" /></td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td><Link to={`/admin/edit-product/${p._id}`} className="edit-btn">Edit</Link></td>
                <td><button onClick={() => deleteProduct(p._id)} className="delete-btn">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
