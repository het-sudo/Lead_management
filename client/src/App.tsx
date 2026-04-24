import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import Technology from "./pages/Technology";
import Developer from "./pages/Developer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Developer />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/developer" element={<Developer />} />
      </Route>
    </Routes>
  );
}
