import { createBrowserRouter } from "react-router-dom"
import Auth from "./pages/Auth"
import Admin from "./pages/Admin"

const router = createBrowserRouter([
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/admin",
    Component: Admin,
  },
])

export default router
