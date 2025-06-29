import axios from "axios";
const DASHBOARD_URL = "http://localhost:5047/api/Dashboard/admin-stats";

export async function fetchAdminStats() {
  const res = await axios.get(DASHBOARD_URL);
  return res.data;
}