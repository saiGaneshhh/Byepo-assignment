import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import CheckFeature from "../pages/CheckFeature";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Home */}
            <Route path="/" element={<CheckFeature />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Admin Signup */}
            <Route path="/signup" element={<Signup />} />

            {/* Super Admin */}
            <Route
                path="/super-admin/dashboard"
                element={<SuperAdminDashboard />}
            />

            {/* Organization Admin */}
            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />

        </Routes>
    );
};

export default AppRoutes;