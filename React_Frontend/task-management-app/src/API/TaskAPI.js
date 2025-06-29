import axios from "axios";
const API_URL = "http://localhost:5047/api/tasks";

export const getTasksByProject = (projectId) => axios.get(`${API_URL}/project/${projectId}`);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const uploadTaskFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};