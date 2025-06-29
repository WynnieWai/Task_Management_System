import axios from "axios";

const BASE_URL = "http://localhost:5047/api/projects";
const USER_URL = "http://localhost:5047/api/User";

export async function getAllProjects() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function getAllUsers() {
  const res = await axios.get(USER_URL);
  return res.data;
}

export async function addProject(project) {
  const res = await axios.post(BASE_URL, project);
  return res.data;
}

export async function updateProject(projectId, project) {
  await axios.put(`${BASE_URL}/${projectId}`, project);
}

export async function deleteProject(projectId) {
  await axios.delete(`${BASE_URL}/${projectId}`);
}
