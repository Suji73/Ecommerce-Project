import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check admin
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isAdmin) {
    navigate("/");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Product Management</h2>

      <Link to="/add-product">
        <button style={btnStyle}>Add New Product</button>
      </Link>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt=""
                  style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                />
              </td>

              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>

              <td>
                <Link to={`/edit-product/${product._id}`}>
                  <button style={editBtn}>Edit</button>
                </Link>
                <button
                  style={deleteBtn}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const btnStyle = {
  padding: "10px 15px",
  background: "green",
  color: "white",
  border: "none",
  marginBottom: "15px",
  borderRadius: "5px",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const editBtn = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "5px 10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default AdminProducts;
