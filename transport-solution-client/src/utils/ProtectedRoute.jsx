import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
 
  const user = localStorage.getItem("user")

  if (!user) {
    return <Navigate to="/auth" replace />
  } else {
    return <Navigate to="/" replace />
  }

  return children;
}

export default ProtectedRoute