import { BookOpen, LogOut, Search, User } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar'
import UserContext from '../context/userContext'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = ({ onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem("token");
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
                <div className='flex gap-2.5 items-center shrink-0'>
                    <Link to="/" className="flex gap-2.5 items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
                            <BookOpen className='h-6 w-6 text-white' />
                        </div>
                        <h1 className='font-bold text-xl tracking-tight text-slate-900'>
                            Notes<span className='text-blue-600'>App</span>
                        </h1>
                    </Link>
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
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-xl border-2 border-slate-100 hover:border-blue-400 p-0 overflow-hidden transition-all">
                                    <Avatar className="h-10 w-10 rounded-xl">
                                        <AvatarImage src={user.avatar} alt={user.username} />
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold uppercase rounded-xl">
                                            {user.username?.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none bg-white dark:bg-slate-900" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal p-2">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none text-slate-900">{user.username}</p>
                                        <p className="text-xs leading-none text-slate-500 truncate mt-1">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-50" />
                                <DropdownMenuItem 
                                    className="p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    <span>My Notes</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="p-2.5 rounded-xl cursor-pointer hover:bg-red-50 focus:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                                    onClick={onLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-3">
                            <Button 
                                variant="ghost" 
                                className="font-bold text-slate-600 hover:text-blue-600 rounded-xl"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            <Button 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-blue-200 dark:shadow-none"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
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

export default Navbar;
