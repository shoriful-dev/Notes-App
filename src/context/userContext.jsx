import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@clerk/react";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUser = useCallback(async () => {
        const token = localStorage.getItem("token");

        // If no manual token AND not signed in with Clerk, don't fetch
        if (!token && !isSignedIn) {
            setLoading(false);
            setUser(null);
            return;
        }

        try {
            const response = await axiosInstance.get("/auth/get-user");
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, [isSignedIn]);

    useEffect(() => {
        if (isLoaded) {
            checkUser();
        }
    }, [checkUser, isLoaded, isSignedIn]);

    const contextValue = useMemo(() => ({ 
        user, 
        setUser, 
        loading, 
        checkUser 
    }), [user, loading, checkUser]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export const getData = () => useContext(UserContext);

export default UserContext;