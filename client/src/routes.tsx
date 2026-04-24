import { createBrowserRouter, Navigate } from "react-router-dom";
import Technology from "./pages/Technology";
import Developer from "./pages/Developer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/developer" replace />,
  },
  {
    path: "/developer",
    element: <Developer />,
  },
  {
    path: "/technology",
    element: <Technology />,
  },
]);

export default router;
