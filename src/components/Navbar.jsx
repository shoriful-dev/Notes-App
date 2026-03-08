import { BookOpen, LogOut, User as UserIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'
import SearchBar from './SearchBar/SearchBar'
import { getInitials } from '@/utils/helper'

const Navbar = ({ onSearchNote, handleClearSearch }) => {
    const {user, setUser} = getData()
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };
    
    return (
        <nav className='bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 py-3 px-6'>
            <div className='max-w-7xl mx-auto flex justify-between items-center gap-6'>
                {/* logo section  */}
                <div className='flex gap-2.5 items-center shrink-0 mb-3'>
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <BookOpen className='h-6 w-6 text-white' />
                    </div>
                    <h1 className='font-bold text-xl tracking-tight text-slate-900'>
                        Notes<span className='text-blue-600'>App</span>
                    </h1>
                </div>

                <div className="flex-1 max-w-xl hidden md:block">
                    <SearchBar
                        value={searchQuery}
                        onChange={({ target }) => {
                            setSearchQuery(target.value);
                        }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                </div>

                <div className='flex gap-5 items-center shrink-0'>
                    {
                        user ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden lg:block text-right">
                                    <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.username}</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Capture ideas</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none">
                                        <Avatar className="w-10 h-10 border-2 border-slate-100 hover:border-blue-400 transition-all cursor-pointer">
                                            <AvatarImage src={user?.avatar} />
                                            <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-sm">{getInitials(user?.username)}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2 shadow-2xl border-slate-100">
                                        <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-slate-50" />
                                        <DropdownMenuItem className="rounded-lg py-2.5 cursor-pointer focus:bg-slate-50">
                                            <UserIcon className="w-4 h-4 mr-3 text-slate-400"/>
                                            <span className="font-medium text-slate-700">Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-50" />
                                        <DropdownMenuItem onClick={onLogout} className="rounded-lg py-2.5 cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500">
                                            <LogOut className="w-4 h-4 mr-3"/>
                                            <span className="font-medium">Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Link to={'/login'} className="btn-primary py-2 px-6 rounded-xl">Login</Link>
                        )
                    }
                </div>
            </div>
            
            {/* Mobile Search - Single row visible on mobile only */}
            <div className="md:hidden mt-4 pb-1 group">
                 <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => {
                        setSearchQuery(target.value);
                    }}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            </div>
        </nav>
    )
}

export default Navbar
