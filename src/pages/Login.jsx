import React, { useState, useContext } from "react";
import { useSignIn } from "@clerk/react/legacy";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import axiosInstance, { API_BASE_URL } from "../utils/axiosInstance";
import { toast } from "sonner";
import UserContext from "../context/userContext";
import { LogIn, Mail } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const { isLoaded, signIn } = useSignIn();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
            const response = await axiosInstance.post("/auth/login", {
                email: email,
                password: password,
            });

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user);
                toast.success("Welcome back!");
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

    const handleGoogleLogin = async () => {
        if (!isLoaded || !signIn) {
            toast.error("Still loading sign-in. Try again in a moment.");
            return;
        }
        const origin = window.location.origin;
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: `${origin}/sso-callback`,
                redirectUrlComplete: `${origin}/dashboard`,
            });
        } catch (err) {
            const msg =
                err?.errors?.[0]?.longMessage ||
                err?.errors?.[0]?.message ||
                err?.message ||
                "Google sign-in failed";
            console.error(err);
            toast.error(msg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none mb-4 border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <img src="/logo.png" alt="NotesApp Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">To keep connected with us please login</p>
                </div>

                {/* Card */}
                <div className="bg-background rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-border overflow-hidden transition-colors duration-300">
                    <div className="p-8">
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label className="input-label flex items-center gap-2">
                                    <Mail className="h-3 w-3" /> EMAIL ADDRESS
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl px-5 py-4 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
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

                            {error && <p className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-xl animate-shake">{error}</p>}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? "Signing in..." : (
                                    <>
                                        <LogIn className="h-5 w-5" /> Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-4 text-slate-400 dark:text-slate-500 font-bold tracking-widest transition-colors duration-300">OR CONTINUE WITH</span>
                            </div>
                        </div>

                        <button 
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={!isLoaded}
                            className="w-full bg-background hover:bg-slate-50 dark:hover:bg-slate-900 border border-border text-foreground rounded-2xl py-4 font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-60"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-border text-center transition-colors duration-300">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            Not registered yet?{" "}
                            <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
