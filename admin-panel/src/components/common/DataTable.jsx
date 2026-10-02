import React from "react";
import Loader from "../Loader.jsx";
import { FolderOpen } from "lucide-react";
import Pagination from "./Pagination.jsx";

const DataTable = ({
  columns,
  data,
  renderRow,
  isLoading,
  emptyStateIcon: EmptyIcon = FolderOpen,
  emptyStateTitle = "No records found",
  emptyStateSubtitle = "There are currently no records to display.",
  pagination,
  page,
  onPageChange,
  searchTerm
}) => {
  if (isLoading && (!data || data.length === 0)) {
    return (
      <div className="noir-card h-96 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="noir-card flex flex-col relative overflow-hidden p-2">
      {isLoading && data?.length > 0 && (
        <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-sm rounded-3xl">
          <Loader />
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="table-premium">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`
                    ${col.align === "right" ? "text-right" : ""} 
                    ${col.className || ""} 
                  `}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data?.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                      <EmptyIcon size={28} className="text-zinc-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{emptyStateTitle}</h3>
                    <p className="text-zinc-500 mt-1 max-w-sm mx-auto text-sm">{emptyStateSubtitle}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2">
        <Pagination
          currentLength={data?.length || 0}
          total={pagination?.total || 0}
          page={page}
          totalPages={pagination?.totalPages || 1}
          onPageChange={onPageChange}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default DataTable;