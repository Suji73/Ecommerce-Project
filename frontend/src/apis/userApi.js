import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  return response.data; // contains token + user + isAdmin
};

// Get all users
export const getAllUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};
