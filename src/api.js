import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000"
});

// Fetch paginated courses
export async function getCourses(page = 1, limit = 12) {
  const res = await api.get(`/api/courses?page=${page}&limit=${limit}`);
  return res.data; // { items, total, page, limit, totalPages }
}

export default api;
