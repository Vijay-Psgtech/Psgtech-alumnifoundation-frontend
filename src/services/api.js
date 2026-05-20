// frontend/src/services/api.js - COMPLETE & COMPREHENSIVE
// ✅ Includes ALL API exports needed by the entire app
// ✅ Auth, Events, Albums, Admin, Donations

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

const normalizeLoginPayload = (emailOrData, password) => {
  if (emailOrData && typeof emailOrData === "object") {
    return {
      email: String(emailOrData.email || "").trim().toLowerCase(),
      password: String(emailOrData.password || ""),
    };
  }

  return {
    email: String(emailOrData || "").trim().toLowerCase(),
    password: String(password || ""),
  };
};

// ── AUTH API ────────────────────────────────────────────────────────────────
// ✅ For AlumniRegistration, Login, Password Reset, Profile, etc.
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (emailOrData, password) =>
    api.post("/auth/login", normalizeLoginPayload(emailOrData, password)),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  verifyOTP: (email, otp) => api.post("/auth/verify-otp", { email, otp }),
  resetPassword: (email, newPassword, otp) => 
    api.post("/auth/reset-password", { email, newPassword, otp }),
  getProfile: () => api.get("/auth/profile"),
  changePassword: (oldPassword, newPassword) => 
    api.put("/auth/change-password", { oldPassword, newPassword }),
};

// ── ALUMNI API ──────────────────────────────────────────────────────────────
// ✅ For Alumni Directory, Profile Updates
export const alumniAPI = {
  getAll: () => api.get("/alumni"),
  getById: (id) => api.get(`/alumni/${id}`),
  updateProfile: (data) => api.put("/alumni/profile", data),
};

// ── EVENTS API ──────────────────────────────────────────────────────────────
// ✅ For Events Page, Calendar, Detail Page
export const eventsAPI = {
  getAll: () => api.get("/events"),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post("/events", data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// ── ALBUMS API ──────────────────────────────────────────────────────────────
// ✅ For Year Albums Page
export const albumsAPI = {
  getAll: () => api.get("/albums"),
  getByYear: (year) => api.get(`/albums/year/${year}`),
  create: (data) => api.post("/albums", data),
  update: (id, data) => api.put(`/albums/${id}`, data),
  delete: (id) => api.delete(`/albums/${id}`),
};

// ── ADMIN API ───────────────────────────────────────────────────────────────
// ✅ For Admin Dashboard
export const adminAPI = {
  // Dashboard stats
  getStats: () => api.get("/admin/dashboard/stats"),
  getAllAlumni: () => api.get("/admin/dashboard/alumni/all"),
  
  // Alumni approval & management
  getPendingAlumni: () => api.get("/admin/pending"),
  approveAlumni: (id) => api.put(`/admin/approve/${id}`),
  rejectAlumni: (id) => api.put(`/admin/reject/${id}`),
  makeAlumniAdmin: (id) => api.put(`/admin/make-admin/${id}`),
};

// ── DONATIONS API ──────────────────────────────────────────────────────────
// ✅ BOTH singular and plural for compatibility
// For DonatePage: use donationAPI
// For AdminDashboard: use donationsAPI
export const donationAPI = {
  getAll: () => api.get("/donations"),
  getMine: () => api.get("/donations/mine"),
  create: (data) => api.post("/donations", data),
};

export const donationsAPI = {
  getAll: () => api.get("/donations"),
  getMine: () => api.get("/donations/mine"),
  create: (data) => api.post("/donations", data),
};

// ── DEFAULT EXPORT ──────────────────────────────────────────────────────────
export default api;
