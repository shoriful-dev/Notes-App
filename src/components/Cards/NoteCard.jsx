import React from "react";
import { getOrdinalDate } from "../../utils/helper";
import { Pin, Trash2, Edit3, Clock } from "lucide-react";
import { motion } from 'framer-motion';

// ── colour → left border strip ───────────────────────────────────────────────
const COLOR_BORDER = {
  default: "border-l-slate-200",
  red:     "border-l-red-400",
  orange:  "border-l-orange-400",
  yellow:  "border-l-yellow-400",
  green:   "border-l-green-400",
  blue:    "border-l-blue-400",
  purple:  "border-l-purple-400",
};

const COLOR_DOT = {
  default: "bg-slate-300",
  red:     "bg-red-400",
  orange:  "bg-orange-400",
  yellow:  "bg-yellow-400",
  green:   "bg-green-400",
  blue:    "bg-blue-400",
  purple:  "bg-purple-400",
};

// ── priority badge ────────────────────────────────────────────────────────────
const PRIORITY_BADGE = {
  low:    { label: "Low",    cls: "bg-slate-100 text-slate-500 border-slate-200" },
  medium: { label: "Medium", cls: "bg-amber-50  text-amber-700  border-amber-200" },
  high:   { label: "High",   cls: "bg-red-50    text-red-600    border-red-200"  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const NoteCard = React.memo(({
  title,
  date,
  content,
  tags,
  isPinned,
  searchQuery,
  viewMode = "grid",
  onEdit,
  onDelete,
  onPinNote,
  onTagClick,
}) => {
  const isList = viewMode === "list";

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 dark:bg-amber-500/30 text-slate-900 dark:text-amber-100 rounded-px px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <motion.div
      whileHover={{ y: isList ? 0 : -6, x: isList ? 4 : 0, scale: isList ? 1 : 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl transition-all duration-300 group flex relative overflow-hidden shadow-sm dark:shadow-none hover:shadow-2xl hover:shadow-blue-200/40 dark:hover:shadow-none ${
        isList ? "flex-row items-center p-4 gap-6" : "flex-col p-6 h-full"
      }`}
    >
      <div className={`absolute top-0 left-0 transition-all duration-500 bg-blue-600/10 dark:bg-blue-500/10 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 ${
        isList ? "w-1 h-full" : "w-full h-1"
      }`}></div>

      <div className={`flex flex-col ${isList ? "flex-1 min-w-0" : "flex-1"}`}>
        <div className={`flex items-start justify-between ${isList ? "mb-1" : "mb-5"}`}>
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-2.5 min-h-[20px] ${isList ? "mb-0.5" : "mb-2"}`}>
              {isPinned && (
                <div className="bg-amber-50 dark:bg-amber-900/30 p-1 rounded-lg border border-amber-100/50 dark:border-amber-700/30 shadow-sm shadow-amber-100 dark:shadow-none shrink-0">
                  <Pin size={10} className="text-amber-500 dark:text-amber-400 fill-amber-400 dark:fill-amber-300" />
                </div>
              )}
              <span className="text-[10px] sm:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                <Clock size={10} strokeWidth={3} />
                {getOrdinalDate(date)}
              </span>
            </div>
            <h6 className={`${isList ? "text-base" : "text-lg"} font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 font-outfit`}>
              {highlightText(title, searchQuery)}
            </h6>
          </div>
          
          {!isList && (
            <button 
              onClick={onPinNote}
              className={`p-3 rounded-xl transition-all duration-300 active:scale-90 ${isPinned ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm shadow-blue-50 dark:shadow-none' : 'text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 hover:border-blue-100 dark:hover:border-blue-800 border border-transparent'}`}
            >
              <Pin size={20} className={isPinned ? 'fill-blue-600 dark:fill-blue-400' : ''} />
            </button>
          )}
        </div>

        <p className={`text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 ${isList ? "text-xs" : "text-[13px] mb-8"}`}>
          {highlightText(content, searchQuery)}
        </p>

        {!isList && (
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50/80 dark:border-slate-800">
            <div className="flex flex-wrap gap-2 max-w-[70%]">
              {tags?.map((item) => (
                <button 
                  key={item} 
                  onClick={() => onTagClick?.(item)}
                  className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/30 px-2.5 py-1 rounded-lg border border-blue-100/40 dark:border-blue-800/50 uppercase tracking-tighter hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all active:scale-95"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={onEdit}
                className="p-3 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-100 dark:border-blue-800 border border-transparent rounded-xl transition-all active:scale-95 bg-white dark:bg-slate-800 shadow-sm dark:shadow-none"
                title="Edit"
              >
                <Edit3 size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={onDelete}
                className="p-3 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-100 dark:hover:border-red-800 border border-transparent rounded-xl transition-all active:scale-95 bg-white dark:bg-slate-800 shadow-sm dark:shadow-none"
                title="Delete"
              >
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isList && (
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-wrap gap-1 items-center justify-end max-w-[120px]">
            {tags?.slice(0, 2).map((item) => (
              <span key={item} className="text-[9px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-100/30 dark:border-blue-800/50 uppercase">
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onPinNote}
              className={`p-2 rounded-xl transition-all ${isPinned ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400'}`}
            >
              <Pin size={16} className={isPinned ? 'fill-blue-600 dark:fill-blue-400' : ''} />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-slate-300 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
});

export default NoteCard;
