import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // To avoid hydration mismatch, default to null rendering until mounted
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-amber-400 shadow-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {resolvedTheme === 'dark' ? (
          <Sun className="w-6 h-6 animate-in spin-in-90 duration-500" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600 animate-in spin-in-90 duration-500" />
        )}
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
