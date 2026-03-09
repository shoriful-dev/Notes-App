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
    UserCircle,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const menuItems = [
    { id: 'all', label: 'All Notes', icon: LayoutDashboard },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'recent', label: 'Recent', icon: Clock },
];

const SidebarContent = ({ 
    user, 
    activeTab, 
    setActiveTab, 
    onEditProfile, 
    onLogout, 
    isCollapsed, 
    setIsCollapsed, 
    isOpenMobile, 
    onCloseMobile 
}) => (
    <motion.aside 
        initial={false}
        animate={{ 
            width: isOpenMobile ? '280px' : (isCollapsed ? '80px' : '280px'),
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`h-screen bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex flex-col z-50 transition-colors duration-300 ease-in-out ${
            isOpenMobile ? "relative" : "sticky top-0"
        }`}
    >
        {/* Header / Logo */}
        <div className={`p-6 flex items-center ${isCollapsed && !isOpenMobile ? 'justify-center' : 'justify-between'}`}>
            <AnimatePresence mode="wait">
                {(!isCollapsed || isOpenMobile) && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                    >
                        <Link to="/" className="flex items-center gap-3 group/logo">
                            <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 dark:shadow-none border border-slate-100 dark:border-slate-800 group-hover/logo:border-blue-200 dark:group-hover/logo:border-blue-800 transition-all duration-300 group-hover/logo:-rotate-6 overflow-hidden">
                                <img src="/logo.png" alt="NotesApp Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight font-outfit group-hover/logo:text-blue-600 dark:group-hover/logo:text-blue-400 transition-colors">
                                Notes<span className="text-blue-600 dark:text-blue-500">App</span>
                            </span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex items-center gap-2">
                {!isOpenMobile && (
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 shadow-sm hover:shadow-md dark:shadow-none hidden lg:block"
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                )}
                {isOpenMobile && (
                    <button 
                        onClick={onCloseMobile}
                        className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-red-500 transition-all lg:hidden"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {(!isCollapsed || isOpenMobile) && (
                <div className="px-3 mb-6">
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-300" />
                        <input 
                            type="text" 
                            placeholder="Quick search..." 
                            className="w-full h-11 pl-11 pr-4 bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-800 text-slate-900 dark:text-white transition-all duration-300 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                        />
                    </div>
                </div>
            )}

            <div className="space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (isOpenMobile) onCloseMobile();
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative ${
                            activeTab === item.id 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                            : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <item.icon size={20} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                        {(!isCollapsed || isOpenMobile) && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
                    </button>
                ))}
            </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-50 dark:border-slate-900 space-y-1.5">
            <button
                onClick={() => {
                    setActiveTab('settings');
                    if (isOpenMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === 'settings' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
                <Settings size={20} className={activeTab === 'settings' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />
                {(!isCollapsed || isOpenMobile) && <span className="font-medium text-sm">Settings</span>}
            </button>

            <div className={`mt-2 p-2.5 bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 ${isCollapsed && !isOpenMobile ? 'items-center' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none shrink-0 overflow-hidden group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                                {user?.username?.slice(0, 2).toUpperCase() || 'UN'}
                            </div>
                        )}
                    </div>
                    {(!isCollapsed || isOpenMobile) && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.username || 'Guest'}</p>
                            <button 
                                onClick={() => { onEditProfile?.(); if (isOpenMobile) onCloseMobile(); }}
                                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                    {(!isCollapsed || isOpenMobile) && (
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

const Sidebar = React.memo(({ user, onLogout, activeTab, setActiveTab, onEditProfile, isOpenMobile, onCloseMobile }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            {/* Desktop Sidebar (hidden on mobile) */}
            <div className="hidden lg:flex sticky top-0 h-screen z-40">
                <SidebarContent 
                    user={user} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    onEditProfile={onEditProfile} 
                    onLogout={onLogout} 
                    isCollapsed={isCollapsed} 
                    setIsCollapsed={setIsCollapsed} 
                    isOpenMobile={false} 
                />
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpenMobile && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onCloseMobile}
                            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            <SidebarContent 
                                user={user} 
                                activeTab={activeTab} 
                                setActiveTab={setActiveTab} 
                                onEditProfile={onEditProfile} 
                                onLogout={onLogout} 
                                isCollapsed={false} 
                                setIsCollapsed={()=>{}} 
                                isOpenMobile={true} 
                                onCloseMobile={onCloseMobile}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});

export default Sidebar;
