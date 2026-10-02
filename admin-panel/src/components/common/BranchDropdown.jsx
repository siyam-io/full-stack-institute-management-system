import React from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function BranchDropdown({ 
  isMaster, 
  branches = [], 
  value, 
  onChange, 
  showAllOption = true,
  wrapperClassName = "flex justify-end mb-6" 
}) {
  if (!isMaster) return null;

  return (
    <div className={wrapperClassName}>
      <div className="relative w-full md:w-64">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-zinc-200 outline-none focus:border-power-red/30 shadow-sm cursor-pointer hover:bg-white/5 transition-colors"
        >
          {showAllOption && <option value="all">🌐 All Campuses</option>}
          
          {branches.map(b => (
            <option key={b.id || b._id} value={b.id || b._id}>
              {b.branch_name || b.branchName}
            </option>
          ))}
        </select>
        <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-power-red pointer-events-none" />
        <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}