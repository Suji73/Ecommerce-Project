import { Link } from "react-router-dom";
import "./admin.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin</h2>

      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/add-product">Add Product</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
