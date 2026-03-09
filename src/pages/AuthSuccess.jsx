import { getData } from '../context/userContext'
import axiosInstance from '../utils/axiosInstance'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthSuccess = () => {
    const { setUser } = getData()
    const navigate = useNavigate()
    
    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            const accessToken = params.get("token")

            if (accessToken) {
                localStorage.setItem("token", accessToken)
                try {
                    const res = await axiosInstance.get("/auth/me")
                    if (res.data.success) {
                        setUser(res.data.user)
                        navigate("/dashboard")
                    } else {
                        navigate("/login")
                    }
                } catch (error) {
                    console.error("Error fetching user:", error)
                    navigate("/login")
                }
            } else {
                navigate("/login")
            }
        }
        handleAuth()
    }, [navigate, setUser])

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Logging in...</h2>
                <p className="text-slate-500 font-medium animate-pulse">Please wait while we set up your session</p>
            </div>
        </div>
    )
}

export default AuthSuccess
