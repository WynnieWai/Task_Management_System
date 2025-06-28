import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, roles, children }) {
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
}