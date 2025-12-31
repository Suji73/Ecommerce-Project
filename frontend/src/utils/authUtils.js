import axios from "axios";

// Refresh token if expired
export const refreshTokenIfNeeded = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Try to verify token by making a test request
    const response = await axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // If successful, token is valid
    return true;
  } catch (error) {
    // If token is expired, try to refresh
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post("http://localhost:5000/api/users/refresh", {
          token
        });
        
        // Save new token
        localStorage.setItem("token", refreshResponse.data.token);
        console.log("Token refreshed successfully");
        return true;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear invalid token and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
        return false;
      }
    }
    return false;
  }
};

// Get auth headers with token refresh
export const getAuthHeaders = async () => {
  await refreshTokenIfNeeded();
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
