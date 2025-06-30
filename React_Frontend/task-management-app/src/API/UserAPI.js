import axios from "axios";

const API_URL = "http://localhost:5047/api/User"; // Change port if needed

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const editUser = async (userId, updatedUser) => {
  const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/${userId}`);
};

export const lockUser = async (userId) => {
  await axios.put(`${API_URL}/lock/${userId}`);
};

export const unlockUser = async (userId) => {
  await axios.put(`${API_URL}/unlock/${userId}`);
};