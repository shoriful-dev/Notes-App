import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    Star, 
    Clock, 
    Settings, 
    ChevronLeft, 
    ChevronRight,
    BookOpen,
    Search,
    Plus,
    LogOut,
    UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = ({ user, onLogout, activeTab, setActiveTab }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { id: 'all', label: 'All Notes', icon: LayoutDashboard },
        { id: 'favorites', label: 'Favorites', icon: Star },
        { id: 'recent', label: 'Recent', icon: Clock },
    ];

    return (
        <motion.aside 
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '280px' }}
            className="h-screen bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex flex-col sticky top-0 z-40 transition-all duration-300 ease-in-out"
        >
            {/* Header / Logo */}
            <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                        >
                            <Link to="/" className="flex items-center gap-3 group/logo">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 dark:shadow-none group-hover/logo:shadow-blue-200 dark:group-hover/logo:shadow-none transition-all duration-300 group-hover/logo:-rotate-6">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight font-outfit group-hover/logo:text-blue-600 dark:group-hover/logo:text-blue-400 transition-colors">
                                    Notes<span className="text-blue-600 dark:text-blue-500">App</span>
                                </span>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 shadow-sm hover:shadow-md dark:shadow-none"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Main Menu */}
            <div className="flex-1 px-4 py-4 space-y-1.5">
                {!isCollapsed && (
                    <div className="px-3 mb-6">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-300" />
                            <input 
                                type="text" 
                                placeholder="Quick search..." 
                                className="w-full h-11 pl-11 pr-4 bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-800 text-slate-900 dark:text-white transition-all duration-300 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-tighter opacity-0 group-focus-within:opacity-100 transition-opacity">⌘K</div>
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative ${
                                activeTab === item.id 
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <item.icon size={20} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                            {!isCollapsed && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
                            {activeTab === item.id && !isCollapsed && (
                                <motion.div layoutId="active" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                            )}
                            {isCollapsed && activeTab === item.id && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-50 space-y-1.5">
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        activeTab === 'settings' 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                    <Settings size={20} className={activeTab === 'settings' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />
                    {!isCollapsed && <span className="font-medium text-sm">Settings</span>}
                </button>

                <div className={`mt-2 p-2.5 bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 ${isCollapsed ? 'items-center' : ''}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none shrink-0 overflow-hidden group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                                    {user?.fullName?.slice(0, 2).toUpperCase() || 'UN'}
                                </div>
                            )}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.username || 'Guest'}</p>
                    <button 
                        onClick={() => onEditProfile?.()}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>
                        )}
                        {!isCollapsed && (
                            <button 
                                onClick={onLogout}
                                className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30 hover:shadow-sm dark:hover:shadow-none active:scale-95 group"
                                title="Log out"
                            >
                                <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
