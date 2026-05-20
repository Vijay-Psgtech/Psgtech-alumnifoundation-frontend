// src/components/ProtectedRoute.jsx
// ✅ FIXED VERSION
// Protects routes that only APPROVED ALUMNI (non-admin) can access
// 
// Access Requirements:
//   ✓ user exists
//   ✓ user.isApproved === true
//   ✓ user.isAdmin !== true
//
// Redirects:
//   → /alumni/login if not logged in
//   → /alumni/register if not approved yet
//   → /alumni/dashboard if admin tries to access (they should use admin routes)

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  // ✅ Show loading spinner while auth context is initializing
  if (authLoading) {
    return (
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
          borderTop: "3px solid #667eea",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ✅ Check 1: User must be logged in
  if (!user) {
    console.log("❌ ProtectedRoute: User not logged in → redirecting to /alumni/login");
    return <Navigate to="/alumni/login" replace />;
  }

  // ✅ Check 2: If user is an admin, they shouldn't access alumni routes
  if (user.isAdmin === true) {
    console.log("❌ ProtectedRoute: User is admin → redirecting to /alumni/dashboard");
    return <Navigate to="/alumni/dashboard" replace />;
  }

  // ✅ Check 3: User must be approved by admin
  if (user.isApproved !== true) {
    console.log("❌ ProtectedRoute: User not approved yet → redirecting to /alumni/register");
    return <Navigate to="/alumni/register" replace />;
  }

  // ✅ All checks passed! User is approved alumni (non-admin)
  console.log("✅ ProtectedRoute: Access granted to approved alumni:", user.email);
  return children;
};

export default ProtectedRoute;

/**
 * DECISION TREE:
 * 
 *   Is user logged in?
 *   ├─ NO  → /alumni/login
 *   └─ YES → Is user an admin?
 *           ├─ YES → /alumni/dashboard (admin panel)
 *           └─ NO  → Is user approved?
 *                   ├─ NO  → /alumni/register (pending approval)
 *                   └─ YES → ✅ ALLOW ACCESS (approved alumni)
 */