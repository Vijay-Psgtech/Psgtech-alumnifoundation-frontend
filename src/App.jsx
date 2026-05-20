import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import AuthEventHandler from "./components/AuthEventHandler";
import Layout from "./components/Layout";
import ScrolltoTop from "./components/ScrolltoTop";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// ── PUBLIC PAGES ────────────────────────────────────────────────
import HomePage from "./components/HomePage";
import About from "./pages/AboutPage";
import Objectives from "./pages/Objectives";
import Engagement from "./pages/Engagementpage";
import Initiatives from "./pages/Initiativespage";
import Gallery from "./pages/Gallerypage";
import OfficeBearersPage from "./pages/OfficeBearersPage";
import Patrons from "./pages/PatronsPage";
import CouncilPage from "./pages/Councilpage";
import Contact from "./pages/ContactUsPage";
import DonatePage from "./pages/DonatePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventsCalendarPage from "./pages/EventsCalendarPage";
import YearAlbumsPage from "./pages/YearAlbumsPage";

// ── ALUMNI PAGES ────────────────────────────────────────────────
import AlumniRegistration from "./pages/alumni/AlumniRegistration";
import AlumniLogin from "./pages/alumni/AlumniLogin";
import ForgotPassword from "./pages/alumni/ForgotPassword";
import AlumniProfile from "./pages/alumni/AlumniProfile";
import AlumniDirectory from "./pages/alumni/AlumniDirectory";
import AlumniMap from "./pages/alumni/AlumniMap";
import MyDonationHistory from "./pages/alumni/MyDonationHistory";

// ── ADMIN PAGES ────────────────────────────────────────────────
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// ═══════════════════════════════════════════════════════════════
// ✅ PublicOnlyRoute — Prevents logged-in users from accessing auth pages
// ═══════════════════════════════════════════════════════════════
const PublicOnlyRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  
  if (authLoading) return <AppLoader />;
  
  if (!user) {
    return children;
  }
  
  if (user.isAdmin && user.isApproved) {
    return <Navigate to="/alumni/dashboard" replace />;
  }
  
  if (user.isApproved && !user.isAdmin) {
    return <Navigate to="/alumni/profile" replace />;
  }
  
  return children;
};

// ═══════════════════════════════════════════════════════════════
// ✅ AdminPublicOnlyRoute — Only for admin login page
// ═══════════════════════════════════════════════════════════════
const AdminPublicOnlyRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  
  if (authLoading) return <AppLoader />;
  
  if (user?.isAdmin && user?.isApproved) {
    return <Navigate to="/alumni/dashboard" replace />;
  }
  
  return children;
};

// ═══════════════════════════════════════════════════════════════
// ✅ Loading Spinner
// ═══════════════════════════════════════════════════════════════
const AppLoader = () => (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    background: "#f8f5ee",
    fontFamily: "Outfit, sans-serif",
  }}>
    <div style={{
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: "3px solid #e2e8f0",
      borderTop: "3px solid #c9a84c",
      animation: "spin 0.8s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// ✅ Inner App Routes (has access to useAuth)
// ═══════════════════════════════════════════════════════════════
function AppRoutes() {
  const { authLoading } = useAuth();
  
  if (authLoading) return <AppLoader />;

  return (
    <>
      <AuthEventHandler />
      <ScrolltoTop />
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* PUBLIC PAGES — No authentication required */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="objectives" element={<Objectives />} />
          <Route path="engagement" element={<Engagement />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="patrons" element={<Patrons />} />
          <Route path="council" element={<CouncilPage />} />
          <Route path="officebearers" element={<OfficeBearersPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="donate" element={<DonatePage />} />
          
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* EVENTS ROUTES */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <Route path="events" element={<EventsPage />} />
          <Route path="events/calendar" element={<EventsCalendarPage />} />
          <Route path="events/albums" element={<YearAlbumsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ALUMNI AUTH ROUTES — PublicOnly (login/register/forgot-pwd) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <Route 
            path="alumni/login" 
            element={
              <PublicOnlyRoute>
                <AlumniLogin />
              </PublicOnlyRoute>
            } 
          />
          
          <Route 
            path="alumni/register" 
            element={
              <PublicOnlyRoute>
                <AlumniRegistration />
              </PublicOnlyRoute>
            } 
          />
          
          <Route path="alumni/forgot-password" element={<ForgotPassword />} />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ALUMNI PROTECTED ROUTES — Requires isApproved=true & isAdmin=false */}
          {/* ══════════════════════════════════════════════════════════════ */}
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

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ADMIN ROUTES — Requires isAdmin=true & isApproved=true */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <Route 
            path="admin" 
            element={
              <AdminPublicOnlyRoute>
                <AdminLogin />
              </AdminPublicOnlyRoute>
            } 
          />
          
          <Route 
            path="alumni/dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* 404 — Catch-all route */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// ✅ Main App Component
// ═══════════════════════════════════════════════════════════════
export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </DataProvider>
  );
}