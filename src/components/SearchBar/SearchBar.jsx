import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full max-w-md flex items-center px-4 bg-slate-100/50 rounded-xl border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all group">
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-[13px] bg-transparent py-3 pl-3 outline-none text-slate-700 placeholder:text-slate-400"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-400 cursor-pointer hover:text-red-500 transition-colors ml-2"
          onClick={onClearSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;
