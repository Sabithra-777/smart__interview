const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, method = "GET", body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data.message || "API error";
    throw new Error(message);
  }
  return data;
}

export const authService = {
  register: async (userData) => {
    return request("/api/auth/register", "POST", userData);
  },
  login: async (userData) => {
    return request("/api/auth/login", "POST", userData);
  },
};

export const testService = {
  getQuestions: async (category, token = localStorage.getItem("token")) => {
    const data = await request(
      `/api/questions/${encodeURIComponent(category)}`,
      "GET",
      null,
      token,
    );
    return data;
  },
  submitTest: async (testData, token = localStorage.getItem("token")) => {
    const data = await request("/api/results/submit", "POST", testData, token);
    return data;
  },
  getResults: async (token = localStorage.getItem("token")) => {
    const data = await request("/api/results", "GET", null, token);
    return data;
  },
  getAnalytics: async (token = localStorage.getItem("token")) => {
    const data = await request("/api/results/analytics", "GET", null, token);
    return data;
  },
};

export const adminService = {
  addQuestion: async (questionData, token) => {
    return request("/api/admin/questions", "POST", questionData, token);
  },
  getAllQuestions: async (token) => {
    return request("/api/admin/questions", "GET", null, token);
  },
  editQuestion: async (id, questionData, token) => {
    return request(`/api/admin/questions/${id}`, "PUT", questionData, token);
  },
  deleteQuestion: async (id, token) => {
    return request(`/api/admin/questions/${id}`, "DELETE", null, token);
  },
  getAllResults: async (token) => {
    return request("/api/admin/results", "GET", null, token);
  },
};
