import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const DataErrorState = ({ error, onRetry, isRetrying }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-power-red/5 border border-power-red/20 rounded-xl">
      <AlertCircle className="w-10 h-10 text-power-red mb-3" />
      <h3 className="text-lg font-semibold text-white">Connection Error</h3>
      <p className="text-sm text-zinc-400 text-center max-w-xs">{error?.message || "Failed to load data."}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="mt-4 px-4 py-2 bg-power-red text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-power-red/90 transition-colors"
        >
          <RefreshCw size={14} className={isRetrying ? "animate-spin" : ""} /> Try Again
        </button>
      )}
    </div>
  );
};

export default DataErrorState;