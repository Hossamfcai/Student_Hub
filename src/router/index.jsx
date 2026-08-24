import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage/landingpage";
import DashboardLayout from "../pages/DashBoard/dashboardLayout";
import Home from "../pages/DashBoard/Home";
import Tasks from "../pages/DashBoard/Tasks";
import Notes from "../pages/DashBoard/Notes";
import Resources from "../pages/DashBoard/Resources";
import Profile from "../pages/DashBoard/Profile";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="/Dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="Home" replace />} />
        <Route path="Home" element={<Home />} />
        <Route path="Tasks" element={<Tasks />} />
        <Route path="Notes" element={<Notes />} />
        <Route path="Resources" element={<Resources />} />
        <Route path="Profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
