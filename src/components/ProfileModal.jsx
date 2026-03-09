import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Camera, Check, Loader2 } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'sonner';

const ProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put('/auth/update-profile', {
        username,
        avatar
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        onUpdate(response.data.user);
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Buddy',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Loki',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-50 dark:border-slate-800/50">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-outfit transition-colors">Edit Profile</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">Customize your public identity</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Avatar Selection */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Camera size={14} className="text-blue-500 dark:text-blue-400" /> Choose Avatar
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {avatars.map((url) => (
                    <button
                      key={url}
                      onClick={() => setAvatar(url)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                        avatar === url 
                        ? 'border-blue-500 shadow-lg shadow-blue-100 dark:shadow-none ring-4 ring-blue-50 dark:ring-blue-900/30' 
                        : 'border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-700'
                      }`}
                    >
                      <img src={url} alt="Avatar" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      {avatar === url && (
                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                          <div className="bg-blue-500 text-white p-1 rounded-full shadow-lg">
                            <Check size={12} strokeWidth={4} />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Username Input */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} className="text-blue-500 dark:text-blue-400" /> Username
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl px-6 py-4 shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Save Changes
                      <Check size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
