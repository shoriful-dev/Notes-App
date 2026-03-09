import React, { useState } from "react";
import TagInput from "./Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

// ── colour config ─────────────────────────────────────────────────────────────
const COLORS = [
  { key: "default", label: "None",   dot: "bg-slate-200",  ring: "ring-slate-300" },
  { key: "red",     label: "Red",    dot: "bg-red-400",    ring: "ring-red-400"   },
  { key: "orange",  label: "Orange", dot: "bg-orange-400", ring: "ring-orange-400"},
  { key: "yellow",  label: "Yellow", dot: "bg-yellow-400", ring: "ring-yellow-400"},
  { key: "green",   label: "Green",  dot: "bg-green-400",  ring: "ring-green-400" },
  { key: "blue",    label: "Blue",   dot: "bg-blue-400",   ring: "ring-blue-400"  },
  { key: "purple",  label: "Purple", dot: "bg-purple-400", ring: "ring-purple-400"},
];

const PRIORITIES = [
  { key: "low",    label: "Low",    badge: "bg-slate-100 text-slate-600 border-slate-200"  },
  { key: "medium", label: "Medium", badge: "bg-amber-50  text-amber-700  border-amber-200" },
  { key: "high",   label: "High",   badge: "bg-red-50    text-red-700    border-red-200"   },
];

// ── Component ─────────────────────────────────────────────────────────────────
const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title,    setTitle]    = useState(noteData?.title    || "");
  const [content,  setContent]  = useState(noteData?.content  || "");
  const [tags,     setTags]     = useState(noteData?.tags     || []);
  const [color,    setColor]    = useState(noteData?.color    || "default");
  const [priority, setPriority] = useState(noteData?.priority || "medium");
  const [error,    setError]    = useState(null);

  const payload = { title, content, tags, color, priority };

  const addNewNote = async () => {
    try {
      const r = await axiosInstance.post("/note/add", payload);
      if (r.data?.note) { getAllNotes(); onClose(); }
    } catch (e) {
      if (e.response?.data?.message) setError(e.response.data.message);
    }
  };

  const editNote = async () => {
    try {
      const r = await axiosInstance.put("/note/edit/" + noteData._id, payload);
      if (r.data?.note) { getAllNotes(); onClose(); }
    } catch (e) {
      if (e.response?.data?.message) setError(e.response.data.message);
    }
  };

  const handleSubmit = () => {
    if (!title)   { setError("Please enter a title");   return; }
    if (!content) { setError("Please enter the content"); return; }
    setError("");
    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="relative">

      {/* ── TITLE ── */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="input-label tracking-widest">NOTE TITLE</label>
        <input
          type="text"
          className="text-3xl font-black text-slate-900 dark:text-white outline-none bg-slate-50/50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-blue-200 dark:focus:border-blue-800 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300 font-outfit"
          placeholder="What's on your mind?"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="input-label tracking-widest">DESCRIPTION</label>
        <textarea
          className="text-[15px] font-medium text-slate-600 dark:text-slate-300 outline-none bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-blue-200 dark:focus:border-blue-800 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300 resize-none leading-relaxed min-h-[180px]"
          placeholder="Start writing..."
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* ── PRIORITY + COLOR side by side ── */}
      <div className="grid grid-cols-2 gap-4 mb-5">

        {/* Priority */}
        <div>
          <label className="input-label mb-2 block tracking-widest">PRIORITY</label>
          <div className="flex gap-2 p-1 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            {PRIORITIES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPriority(p.key)}
                className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all duration-300 ${
                  priority === p.key
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-600 scale-105"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="input-label mb-2 block tracking-widest">TAG COLOR</label>
          <div className="flex gap-2.5 flex-wrap items-center pt-1">
            {COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                title={c.label}
                onClick={() => setColor(c.key)}
                className={`w-5 h-5 rounded-full ${c.dot} transition-all duration-300 relative ${
                  color === c.key
                    ? `ring-4 ring-offset-0 ring-blue-100 dark:ring-blue-900/50 scale-125 z-10 shadow-sm dark:shadow-none`
                    : "hover:scale-125 opacity-70 hover:opacity-100"
                }`}
              >
                {color === c.key && <div className="absolute inset-0 border border-white/20 rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAGS ── */}
      <div className="mb-5">
        <label className="input-label mb-2 block">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* ── ERROR ── */}
      {error && (
        <p className="text-red-500 text-xs font-semibold mb-4">⚠ {error}</p>
      )}

      {/* ── SUBMIT ── */}
      <button
        className="btn-primary w-full py-3 text-base rounded-xl"
        onClick={handleSubmit}
      >
        {type === "edit" ? "Save Changes" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
