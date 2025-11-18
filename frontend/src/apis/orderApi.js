import axios from "axios";

// Create axios instance right here
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  if(!token) {
    console.error("No token found in localStotage");
    throw new Error("no token found")
  }
  const response = await API.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const placeOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

export const getUserOrders = async (userId) => {
  const response = await API.get(`/orders/${userId}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};