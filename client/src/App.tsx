import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import Technology from "./pages/Technology";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
