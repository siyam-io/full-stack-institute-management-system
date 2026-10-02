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
      case "POST": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "PUT": return "bg-blue-50 text-blue-600 border border-blue-100";
      case "PATCH": return "bg-amber-50 text-amber-600 border border-amber-100";
      case "DELETE": return "bg-rose-50 text-rose-500 border border-rose-100";
      default: return "bg-gray-50 text-gray-500 border border-gray-100";
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
      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors duration-200">
        <td className="px-6 py-4 align-middle text-slate-500 text-xs font-medium">
          {formattedDate}
        </td>
        <td className="px-6 py-4 align-middle font-bold text-slate-800 text-[13px]">
          {log.action}
        </td>
        <td className="px-6 py-4 align-middle">
          <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md ${getMethodBadgeClass(log.method)}`}>
            {log.method}
          </span>
        </td>
        <td className="px-6 py-4 align-middle text-slate-600 font-mono text-[11px] truncate max-w-[200px]" title={log.endpoint}>
          {log.endpoint}
        </td>
        <td className="px-6 py-4 align-middle">
          {userObj ? (
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-700">{userObj.fullName}</span>
              <span className="text-[10px] text-slate-400 font-medium">{userObj.email}</span>
              <span className="text-[9px] bg-slate-100 text-slate-600 font-bold uppercase w-max px-1.5 py-0.2 rounded-md mt-0.5">
                {userObj.role?.name || "User"}
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 italic">System / Guest</span>
          )}
        </td>
        <td className="px-6 py-4 align-middle text-slate-600 text-xs font-medium">
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
            <span className="text-[10px] text-slate-300 italic font-medium pr-3">No Payload</span>
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
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-96 relative">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by action, endpoint, user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-teal-600/10 shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Method Filter:</label>
          <select
            value={method}
            onChange={(e) => { setMethod(e.target.value); setPage(1); }}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all cursor-pointer"
          >
            <option value="">All Methods</option>
            <option value="POST">POST (Create)</option>
            <option value="PUT">PUT (Update)</option>
            <option value="PATCH">PATCH (Status/Minor Update)</option>
            <option value="DELETE">DELETE (Remove)</option>
          </select>

          <button
            onClick={() => { setSearch(""); setMethod(""); setPage(1); fetchLogs(); }}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-slate-500 transition-colors"
            title="Reset Filters"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden">
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-xl text-teal-700">
                  <FileCode size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Request Payload Details</h2>
                  <p className="text-xs text-slate-400">Inspecting exact parameters submitted for this mutation</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPayload(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-slate-900 text-teal-400 font-mono text-xs select-all leading-relaxed whitespace-pre-wrap">
              {JSON.stringify(selectedPayload, null, 2)}
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end bg-slate-50">
              <button
                onClick={() => setSelectedPayload(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-colors shadow-lg shadow-slate-900/10"
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
