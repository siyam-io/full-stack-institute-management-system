import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Search, MapPin, ChevronRight } from "lucide-react";
import { useBranches } from "../../hooks/useBranches";
import LogoLoader from "../../components/LogoLoader";
import useAuth from "../../store/useAuth";
import { PERMISSIONS } from "../../config/permissionConfig";

export default function ManageBranches() {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: branches = [], isLoading, isError } = useBranches();

  const filteredBranches = branches.filter((b) => {
    const name = b.branchName || b.branch_name || "";
    const code = b.branchCode || b.branch_code || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           code.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const canViewAnalytics = hasPermission(PERMISSIONS.VIEW_BRANCH_DASHBOARD) || hasPermission(PERMISSIONS.VIEW_ADMIN_DASHBOARD);

  if (isLoading) return <LogoLoader />;
  if (isError) return <div className="text-center text-rose-500 p-8 font-bold">Failed to load campuses. Please retry.</div>;

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Campus Operations</h1>
            <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-1">Select a campus to oversee its ecosystem.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Find a branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:ring-2 focus:ring-power-red/40 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBranches.length === 0 ? (
             <div className="col-span-full py-20 text-center font-black text-zinc-400 uppercase tracking-widest">No matching campuses found</div>
          ) : (
            filteredBranches.map((branch) => {
              const id = branch.id || branch._id;
              const isActive = branch.isActive !== undefined ? branch.isActive : branch.is_active;
              const name = branch.branchName || branch.branch_name || "";
              const code = branch.branchCode || branch.branch_code || "";

              return (
                <div 
                  key={id}
                  onClick={() => navigate(`/admin/branches/${id}`)}
                  className="group bg-white/5 rounded-[2.5rem] p-8 border border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 left-0 w-full h-2 ${isActive ? 'bg-power-red' : 'bg-rose-500'}`}></div>

                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-xl border-2 ${isActive ? 'bg-power-red/10 text-power-red border-power-red/30' : 'bg-white/5 text-zinc-500 border-white/10'}`}>
                      {code}
                    </div>
                    <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] ${isActive ? 'bg-power-red/10 text-power-red' : 'bg-rose-50 text-rose-700'}`}>
                      {isActive ? "Operational" : "Suspended"}
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-zinc-100 mb-2 group-hover:text-power-red transition-colors tracking-tight uppercase">
                    {name}
                  </h2>
                  
                  <p className="text-sm text-zinc-500 font-medium flex items-start gap-2 mb-8 h-12 line-clamp-2">
                    <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-400" />
                    {branch.address}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-xs font-black text-power-red uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
                      {canViewAnalytics ? "Explore Analytics" : "View Details"} <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}