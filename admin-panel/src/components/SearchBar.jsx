import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="bg-white/5 rounded-xl shadow-sm border border-white/10 p-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          size={20}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-white/15 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-power-red/40"
        />
      </div>
    </div>
  );
};

export default SearchBar;
