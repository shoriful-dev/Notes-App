import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded-xl p-5 bg-white card-shadow card-hover group relative">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h6 className="text-[15px] font-semibold text-slate-900 leading-tight mb-1">{title}</h6>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>

        <button 
          onClick={onPinNote}
          className={`p-2 rounded-full transition-colors ${isPinned ? "text-blue-600 bg-blue-50" : "text-slate-300 hover:bg-slate-50 hover:text-slate-400"}`}
        >
          <MdOutlinePushPin className="text-xl" />
        </button>
      </div>

      <p className="text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
        {content}
      </p>

      <div className="flex items-center justify-between mt-4 border-t pt-4 border-slate-50">
        <div className="flex flex-wrap gap-2">
          {tags.map((item, index) => (
            <span key={index} className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
            title="Edit"
          >
            <MdCreate className="text-lg" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
            title="Delete"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
