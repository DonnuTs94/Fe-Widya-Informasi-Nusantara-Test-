import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const userIsExist = localStorage.getItem("auth_token")

  if (!userIsExist) {
    return <Navigate to="/auth" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
