import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, BookOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '@/context/userContext'
import Google from "../assets/googleLogo.png"

const Login = () => {
    const {setUser} = getData()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData);
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/auth/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                localStorage.setItem("accessToken", res.data.accessToken)
                setUser(res.data.data) // In backend, user data is in 'data' field
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }

    }
    return (
    <div className='relative w-full min-h-screen bg-slate-50 overflow-hidden font-inter'>
      <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-100 mb-6">
              <BookOpen className='h-8 w-8 text-white' />
           </div>
           <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
             Login into your account
           </h2>
           <p className="mt-2 text-center text-sm text-slate-500">
             Start organizing your thoughts and ideas today
           </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className="bg-white py-8 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
            <Card className="w-full max-w-sm border-none shadow-none">
              <CardHeader className='space-y-1 px-0'>
                <CardTitle className='text-2xl text-center text-blue-600 font-bold'>Login</CardTitle>
                <CardDescription className='text-center'>
                    Enter your credentials to access your workspace
                </CardDescription>
              </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className='flex items-center justify-between'>
                                            <Label htmlFor="password">Password</Label>
                                            <Link className='text-sm' to={'/forgot-password'}>Forgot your password?</Link>
                                        </div>
                                        <div className='relative'>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={showPassword ? "text" : "password"}
                                                required
                                            />
                                            <Button
                                                variant='ghost'
                                                size="sm"
                                                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                {
                                                    showPassword ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />
                                                }

                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95">
                                    {
                                        isLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                Logging in..
                                            </>
                                        ) : "Login"
                                    }
                                </Button>
                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-100"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-slate-400">Or continue with</span>
                                    </div>
                                </div>
                                <Button onClick={()=>window.open("http://localhost:8000/auth/google", "_self")} className='w-full h-11 rounded-xl border-slate-200 hover:bg-slate-50 transition-all' variant='outline'>
                                    <img src={Google} alt="" className='w-5 mr-3'/>
                                    Login with Google
                                </Button>
                            </CardFooter>
                        </Card>
                        
                        <p className="text-center text-sm text-slate-500 mt-6">
                            Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
