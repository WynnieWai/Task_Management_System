import axios from "axios";
const BASE_URL = "http://localhost:5047/api/comments";

export const getCommentsByTaskId = (taskId) =>
  axios.get(`${BASE_URL}?taskId=${taskId}`);

export const addComment = (comment) =>
  axios.post(BASE_URL, comment);
