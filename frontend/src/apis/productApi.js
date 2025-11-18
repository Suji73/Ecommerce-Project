import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // only if you need cookies
});

// Add new product
export const addClientProduct = async (formData) => {
  const response = await API.post("/client/product-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Get all products
export const getAllProducts = async () => {
  const response = await API.get("/"); // ✅ correct
  return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await API.get(`/${id}`); // ✅ correct
  return response.data;
};

// Update product by ID
export const updateProduct = async (id, data) => {
  const response = await API.put(`/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete product by ID
export const deleteProduct = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};
