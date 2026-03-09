import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/userContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute
