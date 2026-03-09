import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";
import UserContext from "../context/userContext";
import { BookOpen, UserPlus, Mail, User as UserIcon } from "lucide-react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username) {
            setError("Please enter your name");
            return;
        }

        if (!email) {
            setError("Please enter your email");
            return;
        }

        if (!password) {
            setError("Please enter your password");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await axiosInstance.post("/auth/register", {
                username: username,
                email: email,
                password: password,
            });

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user);
                toast.success("Account created successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setError("Something went wrong");
                toast.error("Internal Server Error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] p-4">
            <div className="max-w-md w-full">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-100 mb-4">
                        <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mt-2 font-medium">Join us to start managing your notes better</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-2">
                                <label className="input-label flex items-center gap-2">
                                    <UserIcon className="h-3 w-3" /> FULL NAME
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="input-label flex items-center gap-2">
                                    <Mail className="h-3 w-3" /> EMAIL ADDRESS
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="input-label flex items-center gap-2">
                                    PASSWORD
                                </label>
                                <PasswordInput
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl animate-shake">{error}</p>}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? "Creating account..." : (
                                    <>
                                        <UserPlus className="h-5 w-5" /> Sign Up
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
