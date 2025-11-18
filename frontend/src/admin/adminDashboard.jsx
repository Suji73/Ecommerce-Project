import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin! Use the menu to manage products.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
