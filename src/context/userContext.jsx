import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
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
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, checkUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export const getData = () => useContext(UserContext);

export default UserContext;