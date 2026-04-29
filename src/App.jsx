// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import ScrolltoTop from "./components/ScrolltoTop";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// ═══════════════════════════════════════════════════════════════════════
// PUBLIC PAGES
// ═══════════════════════════════════════════════════════════════════════
const HomePage = lazy(() => import("./components/Homepage"));
const About = lazy(() => import("./pages/AboutPage"));
const Objectives = lazy(() => import("./pages/Objectives"));
const OfficeBearersPage = lazy(() => import("./pages/OfficeBearersPage"));
const Patrons = lazy(() => import("./pages/PatronsPage"));
const Contact = lazy(() => import("./pages/ContactUsPage"));
const DonatePage = lazy(() => import("./pages/DonatePage"));

// ═══════════════════════════════════════════════════════════════════════
// EVENT PAGES
// ═══════════════════════════════════════════════════════════════════════
const EventsPage = lazy(() => import("./pages/EventsPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"));
const EventsCalendarPage = lazy(() => import("./pages/EventsCalendarPage"));
const YearAlbumsPage = lazy(() => import("./pages/YearAlbumsPage"));

// ═══════════════════════════════════════════════════════════════════════
// ALUMNI PAGES - All components
// ═══════════════════════════════════════════════════════════════════════
const AlumniRegistration = lazy(
  () => import("./pages/alumni/AlumniRegistration"),
);
const AlumniLogin = lazy(() => import("./pages/alumni/AlumniLogin"));
const ForgotPassword = lazy(() => import("./pages/alumni/ForgotPassword"));
const AlumniProfile = lazy(() => import("./pages/alumni/AlumniProfile"));
const AlumniDirectory = lazy(() => import("./pages/alumni/AlumniDirectory"));
const AlumniMap = lazy(() => import("./pages/alumni/AlumniMap"));
const MyDonationHistory = lazy(
  () => import("./pages/alumni/MyDonationHistory"),
);

// ═══════════════════════════════════════════════════════════════════════
// ADMIN PAGES
// ═══════════════════════════════════════════════════════════════════════
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AlumniUsers = lazy(() => import("./pages/admin/AlumniUsersList"));
const AdminNewsLetter = lazy(() => import("./pages/admin/AdminNewsLetter"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"));

// ── Redirects logged-in ALUMNI away from login/register ──────────
const PublicOnlyRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  if (authLoading) return <AppLoader />;
  if (!user) return children;
  if (user.role === "admin" || user.role === "superadmin")
    return <Navigate to="/admin/dashboard" replace />;
  if (user.isApproved) return <Navigate to="/alumni/dashboard" replace />;
  return children; // pending alumni can still see registration page
};

// ── Redirects logged-in ADMIN away from admin login ──────────────
const AdminPublicOnlyRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  if (authLoading) return <AppLoader />;
  if (
    (user?.role === "admin" || user?.role === "superadmin") &&
    user?.isApproved
  )
    return <Navigate to="/admin/dashboard" replace />;
  return children;
};

// ── Full-screen spinner while AuthContext verifies the token ──────
const AppLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      background: "#f8f5ee",
      fontFamily: "Outfit, sans-serif",
    }}
  >
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "3px solid #e2e8f0",
        borderTop: "3px solid #c9a84c",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrolltoTop />
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* PUBLIC */}
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="objectives" element={<Objectives />} />
            <Route path="patrons" element={<Patrons />} />
            <Route path="officebearers" element={<OfficeBearersPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="/events/calendar" element={<EventsCalendarPage />} />
            <Route path="/events/albums" element={<YearAlbumsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="donate" element={<DonatePage />} />

            {/* ALUMNI AUTH */}
            <Route
              path="alumni/register"
              element={
                <PublicOnlyRoute>
                  <AlumniRegistration />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="alumni/login"
              element={
                <PublicOnlyRoute>
                  <AlumniLogin />
                </PublicOnlyRoute>
              }
            />
            <Route path="alumni/forgot-password" element={<ForgotPassword />} />

            {/* ALUMNI PROTECTED */}
            <Route
              path="alumni/profile"
              element={
                <ProtectedRoute>
                  <AlumniProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/directory"
              element={
                <ProtectedRoute>
                  <AlumniDirectory />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/map"
              element={
                <ProtectedRoute>
                  <AlumniMap />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/donations"
              element={
                <ProtectedRoute>
                  <MyDonationHistory />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="admin"
              element={
                <AdminPublicOnlyRoute>
                  <AdminLogin />
                </AdminPublicOnlyRoute>
              }
            />
            <Route
              path="admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            <Route
                path="admin/events"
                element={
                  <ProtectedAdminRoute>
                    <AdminEvents />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="admin/newsletters"
                element={
                  <ProtectedAdminRoute>
                    <AdminNewsLetter />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="admin/users"
                element={
                  <ProtectedAdminRoute>
                    <AlumniUsers />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="admin/reports"
                element={
                  <ProtectedAdminRoute>
                    <AdminReports />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="admin/notifications"
                element={
                  <ProtectedAdminRoute>
                    <AdminNotifications />
                  </ProtectedAdminRoute>
                }
              />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
