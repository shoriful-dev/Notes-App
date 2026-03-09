import React, { useState, useEffect, useMemo, useContext, useCallback, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/Cards/NoteCard";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import UserContext from "../context/userContext";
import {
  FileText, Plus, Pin, BookOpen,
  Sparkles, LayoutGrid, List, Clock,
  TrendingUp, Tag, Search, Filter,
  ArrowRight, MousePointer2, User, Menu
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../components/Sidebar";
import SkeletonLoader from "../components/SkeletonLoader";

const AddEditNotes = lazy(() => import("../components/AddEditNotes"));
const ProfileModal = lazy(() => import("../components/ProfileModal"));

// ── Tiny helper ──────────────────────────────────────────────────────────────
const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  return "Good evening";
};

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false, type: "add", data: null,
  });
  const { user, loading: userLoading, setUser } = useContext(UserContext);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTag, setSelectedTag] = useState(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allTags, setAllTags] = useState([]);
  const [stats, setStats] = useState({ total: 0, pinned: 0, recent: 0 });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const navigate = useNavigate();

  const filteredNotes = allNotes;

  const onProfileUpdate = useCallback((updatedUser) => {
    setUser(updatedUser);
  }, [setUser]);

  const handleEdit = useCallback((n) => {
    setOpenAddEditModal({ isShown: true, data: n, type: "edit" });
  }, []);

  const getStats = useCallback(async () => {
    try {
      const r = await axiosInstance.get("/note/stats");
      if (r.data?.stats) setStats(r.data.stats);
    } catch {}
  }, []);

  const getAllTags = useCallback(async () => {
    try {
      const r = await axiosInstance.get("/note/tags");
      if (r.data?.tags) setAllTags(r.data.tags);
    } catch {}
  }, []);

  const getAllNotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        topic: selectedTag || undefined,
        isPinned: activeTab === 'favorites' ? true : undefined,
        recent: activeTab === 'recent' ? true : undefined,
        searchQuery: searchQuery || undefined
      };
      const r = await axiosInstance.get("/note/all", { params });
      if (r.data?.notes) {
        setAllNotes(r.data.notes);
        setTotalPages(r.data.totalPages || 1);
      }
    } catch (e) {
      if (e.response?.status === 401) { localStorage.clear(); navigate("/login"); }
    } finally {
      setLoading(false);
    }
  }, [page, selectedTag, activeTab, searchQuery, navigate]);

  const fetchAuxiliaryData = useCallback(() => {
    getStats();
    getAllTags();
  }, [getStats, getAllTags]);

  const refreshGlobalData = useCallback(() => {
    getAllNotes();
    fetchAuxiliaryData();
  }, [getAllNotes, fetchAuxiliaryData]);

  const deleteNote = useCallback(async (data) => {
    try {
      const r = await axiosInstance.delete("/note/delete/" + data._id);
      if (r.data && !r.data.error) refreshGlobalData();
    } catch { }
  }, [refreshGlobalData]);

  const updateIsPinned = useCallback(async (noteData) => {
    try {
      const r = await axiosInstance.put("/note/update-pinned/" + noteData._id, {
        isPinned: !noteData.isPinned,
      });
      if (r.data?.note) refreshGlobalData();
    } catch { }
  }, [refreshGlobalData]);

  const onLogout = useCallback(() => { 
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetchAuxiliaryData();
  }, [fetchAuxiliaryData]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, selectedTag, searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllNotes();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [getAllNotes]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
      <Sidebar 
          user={user} 
          onLogout={onLogout} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onEditProfile={useCallback(() => setIsProfileModalOpen(true), [])}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={useCallback(() => setIsSidebarOpenMobile(false), [])}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top toolbar */}
        <header className="h-20 lg:h-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-3 lg:gap-0">
            <button 
              onClick={() => setIsSidebarOpenMobile(true)}
              className="p-2 lg:hidden rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-800"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-2xl font-black text-slate-800 dark:text-white transition-colors truncate max-w-[150px] lg:max-w-none">
                {getGreeting()}, <span className="text-blue-600 dark:text-blue-400">{user?.username?.split(' ')[0] || 'there'}!</span>
              </h1>
              <div className="hidden sm:flex items-center gap-2 mt-1">
                <Sparkles size={14} className="text-amber-500" />
                <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 font-bold tracking-tight uppercase transition-colors duration-300">Ready to capture your next big idea?</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div 
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
              className="relative group hidden lg:block"
            >
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isSearchHovered ? 'text-blue-600' : 'text-slate-400'}`} />
              <input 
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-11 pr-4 w-64 xl:w-72 bg-slate-50 dark:bg-slate-800 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-700 transition-all duration-300 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white font-medium font-inter"
              />
            </div>

            <button 
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 lg:p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 hidden sm:flex items-center gap-2"
              title={viewMode === 'grid' ? 'Switch to List' : 'Switch to Grid'}
            >
              {viewMode === 'grid' ? <List size={18} /> : <LayoutGrid size={18} />}
            </button>

            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm dark:shadow-none active:scale-95"
            >
              <User size={18} /> Edit Profile
            </button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
              className="px-4 lg:px-6 py-2.5 lg:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl shadow-blue-200/50 dark:shadow-none flex items-center gap-2 text-xs lg:text-sm font-black tracking-tight transition-all active:ring-4 active:ring-blue-100"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">New Note</span>
            </motion.button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {[
            { label: 'Total Notes', count: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Favorites', count: stats.pinned, icon: Pin, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Last 24h', count: stats.recent, icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 sm:gap-4 premium-shadow dark:shadow-none transition-colors duration-300 ${idx === 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className={`w-12 h-12 ${s.bg} dark:bg-opacity-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <p className="text-lg lg:text-xl font-black text-slate-900 dark:text-white font-outfit">{s.count}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag Pill Bar */}
        <div className="px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
            <button
              onClick={() => { setSelectedTag(null); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                !selectedTag 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/40'
              }`}
            >
              All Topics
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => { setSelectedTag(tag); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  selectedTag === tag 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/40'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonLoader viewMode={viewMode} />
              </motion.div>
            ) : filteredNotes.length > 0 ? (
              <motion.div 
                key="content"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
                  : "flex flex-col gap-4"
                }
              >
                {filteredNotes.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <NoteCard
                      title={item.title}
                      date={item.createdAt}
                      content={item.content}
                      tags={item.tags}
                      isPinned={item.isPinned}
                      searchQuery={searchQuery}
                      viewMode={viewMode}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => deleteNote(item)}
                      onPinNote={() => updateIsPinned(item)}
                      onTagClick={(tag) => setSelectedTag(tag === selectedTag ? null : tag)}
                    />
                  </motion.div>
                ))}
                
                {/* Pagination UI */}
                <div className="flex justify-center items-center gap-4 mt-8 mb-4 w-full col-span-full">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm font-medium flex-shrink-0"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">Page {page} of {totalPages} ({stats.total} total notes)</span>
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm font-medium flex-shrink-0"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center"
              >
                <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
                  <FileText size={40} className="text-blue-600 dark:text-blue-400 relative z-10" />
                  <div className="absolute -right-2 -top-2 w-8 h-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg flex items-center justify-center border border-transparent dark:border-slate-800">
                    <Sparkles size={16} className="text-amber-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">Your workspace is quiet</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed text-sm transition-colors">
                  Start by creating your first note. Ideas are meant to be captured and organized.
                </p>
                <button
                  onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
                  className="group px-8 py-4 bg-slate-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-slate-200 dark:shadow-none border border-transparent dark:border-slate-700"
                >
                  Create My First Note
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── MODALS ── */}
      <Suspense fallback={null}>
        {openAddEditModal.isShown && (
          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            style={{ overlay: { backgroundColor: "rgba(0,0,0,0.45)", zIndex: 100, backdropFilter: "blur(4px)" } }}
            contentLabel=""
            className="max-w-xl w-[90%] max-h-[87vh] bg-white dark:bg-slate-900 rounded-3xl mx-auto mt-16 p-10 overflow-hidden outline-none shadow-2xl relative border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
              getAllNotes={refreshGlobalData}
              showToastMsg={() => { }}
            />
          </Modal>
        )}
        {isProfileModalOpen && (
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            user={user}
            onUpdate={onProfileUpdate}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Home;
