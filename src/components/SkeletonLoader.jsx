import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ viewMode = "grid" }) => {
    const isList = viewMode === "list";
    
    return (
        <div className={isList ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`bg-white border border-slate-100 rounded-3xl relative overflow-hidden ${
                    isList ? "flex flex-row items-center p-4 gap-6 h-20" : "p-6 h-[220px] flex flex-col gap-4"
                }`}>
                    <div className={`${isList ? "w-1 h-full" : "w-full h-1"} bg-slate-50 absolute top-0 left-0`} />
                    
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="h-6 w-2/3 bg-slate-100 rounded-lg animate-pulse" />
                            {!isList && <div className="h-9 w-9 bg-slate-100 rounded-xl animate-pulse" />}
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-slate-50 rounded-md animate-pulse" />
                            <div className="h-3 w-5/6 bg-slate-50 rounded-md animate-pulse" />
                        </div>
                        {!isList && (
                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50/50">
                                <div className="flex gap-2">
                                    <div className="h-5 w-12 bg-blue-50/50 rounded-lg animate-pulse" />
                                    <div className="h-5 w-12 bg-blue-50/50 rounded-lg animate-pulse" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-slate-50 rounded-lg animate-pulse" />
                                    <div className="h-8 w-8 bg-slate-50 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        )}
                    </div>

                    {isList && (
                        <div className="flex items-center gap-4">
                            <div className="h-5 w-16 bg-blue-50/50 rounded-md animate-pulse" />
                            <div className="flex gap-1">
                                <div className="h-8 w-8 bg-slate-50 rounded-lg animate-pulse" />
                                <div className="h-8 w-8 bg-slate-50 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    )}

                    <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
