import React, { useState, useEffect } from "react";
import { API } from "../../api/axios.js";
import PageHeader from "../../components/common/PageHeader.jsx";
import DataTable from "../../components/common/DataTable.jsx";
import ActionIconButton from "../../components/common/ActionIconButton.jsx";
import { Eye, FileCode, RefreshCw, Search, X } from "lucide-react";
import toast from "react-hot-toast";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayload, setSelectedPayload] = useState(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(`/audit-logs`, {
        params: {
          page,
          limit: 15,
          search,
          method,
        }
      });
      setLogs(data.data?.data || []);
      const pag = data.data?.meta?.pagination;
      if (pag) {
        setPagination({
          page: pag.page,
          totalPages: pag.totalPages,
          total: pag.total,
        });
      }
    } catch (error) {
      toast.error("Failed to load activity logs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, method]);

  // Handle Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const columns = [
    { label: "Date & Time", className: "w-[15%]" },
    { label: "Action", className: "w-[20%]" },
    { label: "Method", className: "w-[10%]" },
    { label: "Endpoint", className: "w-[20%]" },
    { label: "User", className: "w-[20%]" },
    { label: "IP Address", className: "w-[10%]" },
    { label: "Details", align: "right", className: "w-[5%]" },
  ];

  const getMethodBadgeClass = (m) => {
    switch (m) {
      case "POST": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "PUT": return "bg-power-red/10 text-power-red border border-power-red/30";
      case "PATCH": return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "DELETE": return "bg-power-red/10 text-power-red border border-power-red/20";
      default: return "bg-white/5 text-zinc-500 border border-white/10";
    }
  };

  const renderLogRow = (log) => {
    const formattedDate = new Date(log.createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const userObj = log.user;
    
    // Parse payload if it's a string
    let parsedPayload = log.payload;
    if (typeof parsedPayload === "string") {
      try {
        parsedPayload = JSON.parse(parsedPayload);
      } catch (e) {
        // use string
      }
    }

    return (
      <tr key={log.id} className="hover:bg-white/5 transition-colors duration-200 border-b border-white/5">
        <td className="px-6 py-4 align-middle text-zinc-500 text-xs font-medium">
          {formattedDate}
        </td>
        <td className="px-6 py-4 align-middle font-bold text-white text-[13px]">
          {log.action}
        </td>
        <td className="px-6 py-4 align-middle">
          <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md ${getMethodBadgeClass(log.method)}`}>
            {log.method}
          </span>
        </td>
        <td className="px-6 py-4 align-middle text-zinc-500 font-mono text-[11px] truncate max-w-[200px]" title={log.endpoint}>
          {log.endpoint}
        </td>
        <td className="px-6 py-4 align-middle">
          {userObj ? (
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-zinc-200">{userObj.fullName}</span>
              <span className="text-[10px] text-zinc-500 font-medium">{userObj.email}</span>
              <span className="text-[9px] bg-white/10 text-zinc-400 font-bold uppercase w-max px-1.5 py-0.2 rounded-md mt-0.5">
                {userObj.role?.name || "User"}
              </span>
            </div>
          ) : (
            <span className="text-xs text-zinc-500 italic">System / Guest</span>
          )}
        </td>
        <td className="px-6 py-4 align-middle text-zinc-500 text-xs font-medium">
          {log.ipAddress || "N/A"}
        </td>
        <td className="px-6 py-4 text-right align-middle">
          {parsedPayload ? (
            <ActionIconButton
              icon={Eye}
              onClick={() => setSelectedPayload(parsedPayload)}
              title="View Payload Payload"
            />
          ) : (
            <span className="text-[10px] text-zinc-500 italic font-medium pr-3">No Payload</span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen">
      <PageHeader
        title="Security Audit & Activity Logs"
        subtitle="Tracking administrative actions and system mutations"
      />

      {/* Filters & Search */}
      <div className="bg-white/5 rounded-3xl border border-white/10 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-96 relative">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search by action, endpoint, user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-zinc-100 rounded-2xl pl-11 pr-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/10 focus:border-power-red/50 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-power-red hover:bg-power-red/90 text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-power-red/20 shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Method Filter:</label>
          <select
            value={method}
            onChange={(e) => { setMethod(e.target.value); setPage(1); }}
            className="bg-white/5 border border-white/10 text-zinc-200 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-power-red/10 focus:border-power-red/50 transition-all cursor-pointer"
          >
            <option value="">All Methods</option>
            <option value="POST">POST (Create)</option>
            <option value="PUT">PUT (Update)</option>
            <option value="PATCH">PATCH (Status/Minor Update)</option>
            <option value="DELETE">DELETE (Remove)</option>
          </select>

          <button
            onClick={() => { setSearch(""); setMethod(""); setPage(1); fetchLogs(); }}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-zinc-500 transition-colors"
            title="Reset Filters"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={logs}
          renderRow={renderLogRow}
          isLoading={isLoading}
          pagination={pagination}
          page={page}
          onPageChange={setPage}
          emptyStateTitle="No activity logs found"
        />
      </div>

      {/* Payload Modal */}
      {selectedPayload && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#0B0B0D] w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-power-red/10 p-2 rounded-xl text-power-red">
                  <FileCode size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-white">Request Payload Details</h2>
                  <p className="text-xs text-zinc-500">Inspecting exact parameters submitted for this mutation</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPayload(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-black text-power-red/90 font-mono text-xs select-all leading-relaxed whitespace-pre-wrap">
              {JSON.stringify(selectedPayload, null, 2)}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 flex justify-end bg-white/5">
              <button
                onClick={() => setSelectedPayload(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-power-red hover:bg-power-red/90 transition-colors shadow-lg shadow-power-red/20"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;
