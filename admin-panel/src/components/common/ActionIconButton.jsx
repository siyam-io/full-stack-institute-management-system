import React from "react";
import { Loader2 } from "lucide-react";

const ActionIconButton = ({ 
  icon: Icon, 
  onClick, 
  title, 
  variant = "primary", 
  disabled = false, 
  loading = false,
  className = ""
}) => {
  const baseClasses = "p-2 rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    primary: "hover:bg-prestige-gold/10 text-prestige-gold",
    success: "hover:bg-emerald-50 text-emerald-600",
    danger: "hover:bg-power-red/10 text-power-red",
    warning: "hover:bg-amber-50 text-amber-600",
    purple: "hover:bg-indigo-50 text-indigo-600",
    neutral: "hover:bg-slate-100 text-slate-600",
    activeToggle: "hover:bg-green-50 text-green-600", 
    inactiveToggle: "bg-slate-100 text-slate-500 hover:bg-green-50"
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); 
        if (!disabled && !loading && onClick) onClick(e);
      }}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      title={title}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Icon size={20} />
      )}
    </button>
  );
};

export default ActionIconButton;