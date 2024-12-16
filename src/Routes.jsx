import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Admin from "./pages/Admin"
import ProtectedRoute from "./components/ProtectedRoute"

const AppRouter = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route index path="/" element={<Admin />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}

export default AppRouter
