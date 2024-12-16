import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Admin from "./pages/Admin"
import ProtectedRoute from "./components/ProtectedRoute"

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<Admin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default AppRouter
