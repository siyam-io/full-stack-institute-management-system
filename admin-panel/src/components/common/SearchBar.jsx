// src/components/common/SearchBar.jsx
import React from 'react';
import { Search, Loader2 } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  isLoading = false,
  showButton = true,
  className = ""
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
        size={20}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={isLoading}
        className={`w-full pl-10 py-3 bg-white/5 border border-white/10 text-zinc-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-power-red/40 focus:border-transparent transition-all placeholder:text-zinc-500 ${
          showButton ? 'pr-28' : 'pr-4'
        }`}
      />
      {showButton && (
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-power-red text-white rounded-md hover:bg-power-red/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium transition-colors"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Search'}
        </button>
      )}
    </form>
  );
};

export default SearchBar;