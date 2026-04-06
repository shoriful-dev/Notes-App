import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UserContext from "./context/userContext";
import Landing from "./pages/Landing";
import AuthSuccess from "./pages/AuthSuccess";
import SSOCallback from "./pages/SSOCallback";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <p className="text-sm font-medium text-slate-500">Checking your session...</p>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/sso-callback" element={<SSOCallback />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <ThemeToggle />
        </Router>
    );
};


export default App;
