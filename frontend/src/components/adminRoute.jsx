import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");

  // If no token -> redirect
  if (!token) {
    console.log("NO TOKEN → redirect");
    return <Navigate to="/" replace />;
  }

  // If no user → redirect
  if (!user) {
    console.log("NO USER → redirect");
    return <Navigate to="/" replace />;
  }

  const parsedUser = JSON.parse(user);

  console.log("ADMIN ROUTE CHECK:", parsedUser);

  // If not admin → deny access
  if (parsedUser.isAdmin !== true) {
    console.log("NOT ADMIN → redirect");
    return <Navigate to="/home" replace />;
  }

  // User IS admin → allow access
  return children;
};

export default AdminRoute;
