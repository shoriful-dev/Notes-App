import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    BookOpen, ArrowRight, CheckCircle2, Zap, Shield, Search,
    Tag, Lock, Star, PenLine, List, Lightbulb, ChevronDown,
    Github, Twitter, Mail, LayoutDashboard, Menu, X
} from 'lucide-react';
import UserContext from '../context/userContext';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);
    const [openFaq, setOpenFaq] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#how-it-works", label: "How it Works" },
        { href: "#testimonials", label: "Reviews" },
        { href: "#faq", label: "FAQ" },
    ];

    const features = [
        {
            icon: <PenLine className="w-6 h-6" />,
            title: "Rich Note Editor",
            description: "Write with clarity using our distraction-free editor. Supports rich text, lists, and everything you need to capture ideas fast.",
            color: "bg-blue-50 text-blue-600",
        },
        {
            icon: <Tag className="w-6 h-6" />,
            title: "Smart Tagging System",
            description: "Organize notes with custom tags. Find any note in seconds with our intelligent tag-based filtering.",
            color: "bg-violet-50 text-violet-600",
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: "Instant Search",
            description: "Our lightning-fast search scans titles and content in real-time so you always find exactly what you're looking for.",
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Pin Important Notes",
            description: "Pin your most critical notes to the top with one click. Your priorities always stay front and center.",
            color: "bg-amber-50 text-amber-600",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure & Private",
            description: "Your notes are tied to your account with JWT authentication. Only you can access your workspace.",
            color: "bg-red-50 text-red-600",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Blazing Fast",
            description: "Built on a modern React + Node.js stack, the app is optimized for performance — zero lag from click to content.",
            color: "bg-sky-50 text-sky-600",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Create Your Account",
            description: "Sign up in seconds — just your name, email, and a password. Or sign in instantly with your Google account.",
            icon: <Mail className="w-5 h-5 text-blue-600" />,
        },
        {
            number: "02",
            title: "Write Your First Note",
            description: "Hit the blue button, give your note a title, write your thoughts, and add tags for easy organization later.",
            icon: <PenLine className="w-5 h-5 text-blue-600" />,
        },
        {
            number: "03",
            title: "Organize & Pin",
            description: "Pin your most important notes so they always appear first. Tag everything so searching is always instant.",
            icon: <List className="w-5 h-5 text-blue-600" />,
        },
        {
            number: "04",
            title: "Find Anything, Instantly",
            description: "Use the search bar to find notes by title or content. Your knowledge base is always one search away.",
            icon: <Search className="w-5 h-5 text-blue-600" />,
        },
    ];

    const testimonials = [
        {
            name: "Aarav M.",
            role: "Software Engineer",
            avatar: "AM",
            quote: "I use NotesApp every day for meeting notes, project ideas, and random thoughts. The pinning feature alone saves me 20 minutes a day.",
            color: "bg-blue-600",
        },
        {
            name: "Priya K.",
            role: "Product Designer",
            avatar: "PK",
            quote: "The UI is so clean and focused. No clutter, no distractions. Just me and my ideas. This is what a notes app should feel like.",
            color: "bg-violet-600",
        },
        {
            name: "James O.",
            role: "Freelance Writer",
            avatar: "JO",
            quote: "The tag system changed my workflow completely. I can organize hundreds of notes and find the right one in under 3 seconds.",
            color: "bg-emerald-600",
        },
    ];

    const faqs = [
        {
            q: "Is NotesApp free to use?",
            a: "Yes — completely free. Sign up and get full access to all features with no credit card required.",
        },
        {
            q: "Is my data private and secure?",
            a: "Absolutely. Your notes are secured with JWT-based authentication. Each user can only access their own notes.",
        },
        {
            q: "Can I sign in with Google?",
            a: "Yes! We support Google OAuth for a one-click sign-in experience. No separate password needed.",
        },
        {
            q: "How many notes can I create?",
            a: "There are no limits. Create as many notes as you need — the app is built to scale with you.",
        },
        {
            q: "Can I search inside my notes?",
            a: "Yes. The search bar checks both the title and content of your notes in real-time as you type.",
        },
    ];

    return (
        <div className="min-h-screen bg-background font-inter text-foreground overflow-x-hidden transition-colors duration-300">
            {/* === NAV === */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-foreground">Notes<span className="text-blue-600">App</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3">
                            {!user ? (
                                <>
                                    <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3">Log in</Link>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 dark:shadow-none transition-all active:scale-95"
                                    >
                                        Get Started Free
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </button>
                            )}
                        </div>
                        
                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-background border-b border-border overflow-hidden"
                        >
                            <div className="px-6 py-8 flex flex-col gap-6">
                                {navLinks.map(link => (
                                    <a 
                                        key={link.href} 
                                        href={link.href} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <hr className="border-border" />
                                {!user ? (
                                    <div className="flex flex-col gap-4">
                                        <Link 
                                            to="/login" 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-lg font-bold text-slate-600 dark:text-slate-400"
                                        >
                                            Log in
                                        </Link>
                                        <button
                                            onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}
                                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg"
                                        >
                                            Get Started Free
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <LayoutDashboard size={20} />
                                        Dashboard
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main>
                {/* === HERO === */}
                <section className="pt-36 pb-28 px-6 relative overflow-hidden">
                    {/* Background blobs */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-70"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-violet-100/60 dark:bg-violet-900/10 rounded-full blur-3xl -z-10"></div>

                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            The Modern Way to Take Notes
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-extrabold text-foreground tracking-tight leading-[1.1] mb-6 px-4">
                            Your ideas deserve a{' '}
                            <span className="relative inline-block">
                                <span className="text-blue-600 dark:text-blue-500">better home.</span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path d="M2 9C60 3 150 1 298 9" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
                                </svg>
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            NotesApp is a clean, fast, and secure workspace for capturing your thoughts, managing your tasks, and organizing your knowledge — all in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            {!user ? (
                                <>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="group h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        Start for Free
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <Link
                                        to="/login"
                                        className="h-14 px-8 font-bold text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500 bg-background"
                                    >
                                        Log in to my workspace
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="group h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
                                >
                                    Go to Dashboard
                                    <LayoutDashboard className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>

                        {/* Social proof bar */}
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {['bg-blue-500','bg-violet-500','bg-emerald-500','bg-amber-500'].map((c,i) => (
                                        <div key={i} className={`w-7 h-7 rounded-full ${c} ring-2 ring-white dark:ring-slate-900`}></div>
                                    ))}
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">10,000+</span> happy writers
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-500">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                                <span className="font-semibold text-slate-700 dark:text-slate-300 ml-1">4.9/5</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                No credit card required
                            </div>
                        </div>
                    </div>
                </section>

                {/* === PRODUCT MOCKUP / SCREENSHOT === */}
                <section className="px-6 py-4 pb-28">
                    <div className="max-w-6xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[2.5rem] blur-xl opacity-10 group-hover:opacity-20 transition duration-700"></div>
                            <div className="relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden transition-colors duration-300">
                                {/* mock browser bar */}
                                <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-5 py-3.5 flex items-center gap-3 transition-colors duration-300">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="flex-1 max-w-sm mx-auto bg-slate-100 dark:bg-slate-900 rounded-lg px-3 py-1 text-xs text-slate-400 font-mono text-center">
                                        notesapp.io/dashboard
                                    </div>
                                </div>
                                {/* mock app content */}
                                <div className="p-6 md:p-8 bg-[#f8fafc] dark:bg-slate-950 min-h-[380px] transition-colors duration-300">
                                    {/* mock navbar */}
                                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-3 flex items-center justify-between mb-6 shadow-sm transition-colors duration-300">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                                                <BookOpen className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-bold text-sm text-foreground">Notes<span className="text-blue-600">App</span></span>
                                        </div>
                                        <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-400 items-center gap-2 w-48">
                                            <Search className="w-3.5 h-3.5" /> Search notes...
                                        </div>
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
                                    </div>

                                    {/* mock notes grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            { title: "📌 Q1 Project Roadmap", content: "Key milestones for the Q1 launch. Define user stories and set up sprint cycles...", tags: ["work","planning"], pinned: true },
                                            { title: "💡 App Idea — AI Journaling", content: "An app that uses AI to summarize your daily journal entries and provide emotional insights...", tags: ["ideas","ai"], pinned: false },
                                            { title: "📚 Books to Read in 2026", content: "Atomic Habits, Deep Work, The Lean Startup, Zero to One, The Pragmatic Programmer...", tags: ["books","personal"], pinned: false },
                                        ].map((note, i) => (
                                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group/card">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">{note.title}</h4>
                                                    {note.pinned && <div className="text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0 ml-2">📌</div>}
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">{note.content}</p>
                                                <div className="flex gap-1.5 flex-wrap">
                                                    {note.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded uppercase">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === WHY NOTESAPP === */}
                <section className="py-8 px-6 bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-700 dark:divide-slate-800">
                            {[
                                { value: "10K+", label: "Active Users" },
                                { value: "1M+", label: "Notes Created" },
                                { value: "99.9%", label: "Uptime" },
                                { value: "4.9★", label: "Average Rating" },
                            ].map(stat => (
                                <div key={stat.label} className="text-center py-8 px-4">
                                    <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === FEATURES === */}
                <section id="features" className="py-28 px-6 bg-background transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                                <Lightbulb className="w-3.5 h-3.5" /> Core Features
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                                Everything you need. <br />Nothing you don't.
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                                NotesApp is intentionally focused. Every feature is designed to help you think clearly, organize effortlessly, and find anything instantly.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {features.map((f, i) => (
                                <div key={i} className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-none transition-all duration-300 bg-background">
                                    <div className={`w-12 h-12 rounded-2xl ${f.color} dark:bg-slate-800 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {f.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{f.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === HOW IT WORKS === */}
                <section id="how-it-works" className="py-28 px-6 bg-slate-50 dark:bg-slate-950/50 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                                    <List className="w-3.5 h-3.5" /> How It Works
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                                    Up and running in <br />under <span className="text-blue-600">60 seconds.</span>
                                </h2>
                                <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                                    No tutorials. No complex setup. Just sign up, open a note, and start writing. It's designed to get out of your way.
                                </p>
                                <div className="space-y-6">
                                    {steps.map((step, i) => (
                                        <div key={i} className="flex gap-5 group">
                                            <div className="shrink-0 w-12 h-12 bg-background dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:shadow-blue-100 dark:group-hover:shadow-none transition-all">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-0.5">{step.number}</div>
                                                <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => navigate(user ? '/dashboard' : '/signup')}
                                    className="mt-10 group h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none"
                                >
                                    {user ? "Go to Dashboard" : "Try It Now"}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Right: visual */}
                            <div className="relative hidden lg:block">
                                <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-3xl"></div>
                                <div className="relative bg-background dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-2xl space-y-4 transition-colors duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-foreground">My Notes</span>
                                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-lg">+</span>
                                        </div>
                                    </div>
                                    {[
                                        { title: "📌 Project Kickoff Notes", tags: ["work"], pinned: true, time: "Today" },
                                        { title: "💡 Startup Idea — EdTech", tags: ["ideas"], time: "Yesterday" },
                                        { title: "📚 Book Summary: Deep Work", tags: ["books","learning"], time: "2 days ago" },
                                        { title: "🛒 Grocery List", tags: ["personal"], time: "3 days ago" },
                                    ].map((n, i) => (
                                        <div key={i} className="bg-slate-50 dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 cursor-pointer rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-800 transition-all group/note">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/note:text-blue-700 dark:group-hover/note:text-blue-400 transition-colors">{n.title}</span>
                                                {n.pinned && <span className="text-blue-500 text-xs font-bold">📌</span>}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                 <div className="flex gap-1">
                                                    {n.tags.map(t => <span key={t} className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{t}</span>)}
                                                </div>
                                                <span className="text-[10px] text-slate-400 dark:text-slate-500">{n.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === TESTIMONIALS === */}
                <section id="testimonials" className="py-28 px-6 bg-background transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                                <Star className="w-3.5 h-3.5" /> Loved by Users
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                                Real people. Real results.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((t, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 flex flex-col gap-6 transition-colors duration-300">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px] flex-1">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm ring-2 ring-white dark:ring-slate-800`}>{t.avatar}</div>
                                        <div>
                                            <div className="font-bold text-foreground text-sm">{t.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === FAQ === */}
                <section id="faq" className="py-28 px-6 bg-slate-50 dark:bg-slate-950/50 transition-colors duration-300">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-500 dark:text-slate-400">Everything you need to know before you start.</p>
                        </div>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-background dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors duration-300">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <span className="font-semibold text-foreground">{faq.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === FINAL CTA === */}
                <section className="py-28 px-6 bg-background transition-colors duration-300">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-blue-200 dark:shadow-none">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                                    Start capturing your best ideas today.
                                </h2>
                                <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto">
                                    Join 10,000+ writers, thinkers, and creators who use NotesApp to stay organized and productive.
                                </p>
                                <button
                                    onClick={() => navigate(user ? '/dashboard' : '/signup')}
                                    className="group h-14 px-10 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-95 hover:bg-blue-50 dark:hover:bg-blue-900/10 dark:text-blue-400 flex items-center gap-2 mx-auto dark:shadow-none"
                                >
                                    {user ? "Back to Workspace" : "Create Free Account"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-blue-200 text-sm mt-5">No credit card • Always free • Sign up in 30 seconds</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* === FOOTER === */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-16 px-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-lg text-white">Notes<span className="text-blue-400">App</span></span>
                            </div>
                            <p className="text-sm leading-relaxed">The clean, focused workspace for anyone who wants to think better and stay organized.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-20 gap-y-2 text-sm">
                            <div className="flex flex-col gap-3">
                                <span className="text-white font-semibold mb-1 uppercase tracking-wider text-xs">Product</span>
                                <a href="#features" className="hover:text-white transition-colors">Features</a>
                                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-white font-semibold mb-1 uppercase tracking-wider text-xs">Account</span>
                                <Link to="/login" className="hover:text-white transition-colors">Log In</Link>
                                <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-9 h-9 bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 dark:border-slate-900 pt-8 text-sm text-center">
                        &copy; 2026 NotesApp Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
