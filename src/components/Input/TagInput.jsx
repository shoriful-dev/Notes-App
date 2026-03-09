import React, { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg uppercase tracking-wider group"
            >
              # {tag}
              <button
                className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm text-slate-900 dark:text-white bg-transparent border-2 border-slate-100 dark:border-slate-700 px-3 py-2 rounded-lg outline-none focus:border-blue-400 dark:focus:border-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all w-full max-w-[200px]"
          placeholder="Enter tag..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-100 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500 text-slate-400 dark:text-slate-500 hover:text-white transition-all group"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
