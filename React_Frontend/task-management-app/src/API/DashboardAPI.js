// import axios from "axios";
// const DASHBOARD_URL = "http://localhost:5047/api/Dashboard/admin-stats";

// export async function fetchAdminStats() {
//   const res = await axios.get(DASHBOARD_URL);
//   return res.data;
// }

import axios from "axios";
const ADMIN_STATS_URL = "http://localhost:5047/api/Dashboard/admin-stats";
const CONTRIBUTOR_STATS_URL = "http://localhost:5047/api/Dashboard/contributor-stats";
const MANAGER_STATS_URL = "http://localhost:5047/api/Dashboard/manager-stats";

export async function fetchAdminStats() {
  const res = await axios.get(ADMIN_STATS_URL);
  return res.data;
}

export async function fetchContributorStats(username) {
  const res = await axios.get(`${CONTRIBUTOR_STATS_URL}/${encodeURIComponent(username)}`);
  return res.data;
}

export async function fetchManagerStats(username) {
  const res = await axios.get(`${MANAGER_STATS_URL}/${encodeURIComponent(username)}`);
  return res.data;
}