import axios from "axios";

// Create axios instance right here
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};