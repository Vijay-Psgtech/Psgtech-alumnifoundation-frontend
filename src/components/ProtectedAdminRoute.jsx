// src/components/ProtectedAdminRoute.jsx
// ✅ FIXED VERSION
// Protects routes that ONLY APPROVED ADMINS can access
// 
// Access Requirements:
//   ✓ user exists
//   ✓ user.isAdmin === true
//   ✓ user.isApproved === true
//
// Redirects:
//   → /admin if not logged in
//   → /alumni/profile if regular alumni tries to access (they should use alumni routes)
//   → /admin if admin is not approved yet

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
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
    console.log("❌ ProtectedAdminRoute: User not logged in → redirecting to /admin");
    return <Navigate to="/admin" replace />;
  }

  // ✅ Check 2: User must be an admin
  if (user.isAdmin !== true) {
    console.log("❌ ProtectedAdminRoute: User is not admin → redirecting to /alumni/profile");
    return <Navigate to="/alumni/profile" replace />;
  }

  // ✅ Check 3: Admin must be approved
  if (user.isApproved !== true) {
    console.log("❌ ProtectedAdminRoute: Admin not approved yet → redirecting to /admin");
    return <Navigate to="/admin" replace />;
  }

  // ✅ All checks passed! User is approved admin
  console.log("✅ ProtectedAdminRoute: Access granted to approved admin:", user.email);
  return children;
};

export default ProtectedAdminRoute;

/**
 * DECISION TREE:
 * 
 *   Is user logged in?
 *   ├─ NO  → /admin (go to admin login)
 *   └─ YES → Is user an admin?
 *           ├─ NO  → /alumni/profile (redirect to regular alumni area)
 *           └─ YES → Is admin approved?
 *                   ├─ NO  → /admin (pending approval)
 *                   └─ YES → ✅ ALLOW ACCESS (approved admin)
 */