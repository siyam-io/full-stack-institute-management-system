import React, { useState, useEffect } from "react";
import { Building2, MapPin, ArrowLeft } from "lucide-react";
import { useBranches } from "../../hooks/useBranches";
import useAuth from "../../store/useAuth";
import Loader from "../Loader"; 

export default function BranchGatekeeper({ children, pageTitle = "Select Campus" }) {
  const { authUser } = useAuth();
  const isSuperAdmin = authUser?.role === "superadmin";

  const [selectedBranch, setSelectedBranch] = useState(null);

  // 1. Auto-route Branch Admins / Staff directly to their own branch
  useEffect(() => {
    if (authUser && !isSuperAdmin && !selectedBranch) {
      const branchId = typeof authUser.branch === 'object' ? authUser.branch._id : authUser.branch;
      setSelectedBranch({ _id: branchId, branch_name: "My Campus" });
    }
  }, [authUser, isSuperAdmin, selectedBranch]);

  const { data: response, isLoading } = useBranches();
  const branches = response?.data || [];

  if (!authUser) return <Loader />;

  // 2. THE GATE: If Superadmin hasn't picked a branch yet, show the grid
  if (isSuperAdmin && !selectedBranch) {
    if (isLoading) return <div className="h-full flex items-center justify-center min-h-[400px]"><Loader /></div>;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-4 md:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-zinc-100 tracking-tight">{pageTitle}</h1>
          <p className="text-sm font-bold text-zinc-500 mt-1 uppercase tracking-widest">
            Choose a branch to view and manage its data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <button
              key={branch._id}
              onClick={() => setSelectedBranch(branch)}
              className="group bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-power-red/30 hover:-translate-y-1 transition-all text-left flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-power-red/10 group-hover:bg-power-red flex items-center justify-center mb-6 transition-colors">
                <Building2 size={24} className="text-power-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-zinc-100 mb-1">{branch.branch_name}</h3>
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <MapPin size={12} />
                {branch.branch_code || "Main"}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 3. THE PAGE: Render the actual page and pass the specific branchId down
  if (selectedBranch) {
    return (
      <div className="animate-in fade-in duration-300">
        {/* Only show the 'Back' button to Superadmins */}
        {isSuperAdmin && (
          <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-4">
            <button
              onClick={() => setSelectedBranch(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-power-red uppercase tracking-widest transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Back to Campuses
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-power-red/10 border border-power-red/30 rounded-lg mb-2">
              <Building2 size={12} className="text-power-red" />
              <span className="text-[10px] font-black uppercase tracking-widest text-power-red">
                Viewing: {selectedBranch.branch_name}
              </span>
            </div>
          </div>
        )}
        
        {/* Render the actual component (e.g., AllEmployees), passing the selected branch */}
        {children({ branchId: selectedBranch._id })}
      </div>
    );
  }

  return null;
}