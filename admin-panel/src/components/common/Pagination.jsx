import React from "react";

const Pagination = ({
  currentLength = 0,
  total = 0,
  page = 1,
  totalPages = 1,
  onPageChange,
  searchTerm = "",
  itemName = "records"
}) => {
  // Hide pagination entirely if there is no data
  if (!total || total === 0) return null;

  return (
    <div className="pagination-container">
      
      {/* Left Side: Info & Search Context */}
      <div className="text-sm text-gray-600 mb-4 sm:mb-0 text-center sm:text-left">
        Showing <span className="font-bold text-gray-900">{currentLength}</span> of <span className="font-bold text-gray-900">{total}</span> {itemName}
        {searchTerm && (
          <span className="ml-2 text-prestige-gold bg-prestige-gold/10 px-2 py-0.5 rounded-md border border-prestige-gold/20">
            Search: "{searchTerm}"
          </span>
        )}
      </div>
 
      {/* Right Side: Page Controls */}
      <div className="flex items-center space-x-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="pagination-btn"
        >
          Prev
        </button>
        
        <div className="flex items-center space-x-1">
          {Array.from(
            { length: Math.min(5, totalPages) },
            (_, i) => {
              // Smart numbering logic: Keeps the current page centered when possible
              let pageNum =
                page <= 3
                  ? i + 1
                  : page >= totalPages - 2
                  ? totalPages - 4 + i
                  : page - 2 + i;
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`min-w-[32px] h-8 flex items-center justify-center text-sm font-bold rounded-lg transition ${
                      page === pageNum
                        ? "pagination-active"
                        : "pagination-btn"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            }
          )}
        </div>
 
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(page + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;