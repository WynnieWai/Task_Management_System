import axios from "axios";

export async function getProjectsWithTasks() {
  const res = await axios.get("http://localhost:5047/api/tasks/projects-with-tasks");
  return res.data;
}