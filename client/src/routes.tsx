import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Technology from "./pages/Technology";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/technology",
    element: <Technology />,
  },
]);

export default router;
