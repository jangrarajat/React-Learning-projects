import { Navigate } from "react-router-dom";

// 1. Dashboard ko protect karne ke liye
export const ProtectedRoute = ({ children }) => {
  const transportUser = JSON.parse(localStorage.getItem("transportUser"));
  if (!transportUser) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// 2. Auth page ko protect karne ke liye (Logged in user wapas login na dekh sake)
export const PublicRoute = ({ children }) => {
  const transportUser = JSON.parse(localStorage.getItem("transportUser"));
  if (transportUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};