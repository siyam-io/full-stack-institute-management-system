import React from "react";

const InputGroup = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  value,
  onChange,
  error,
}) => {
  const isError = !!error;
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block mb-1.5 text-sm font-medium text-zinc-200"
      >
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        aria-invalid={isError ? "true" : "false"}
        className={`w-full px-4 py-3 bg-white/5 border rounded-2xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-200 ${
          isError
            ? "border-red-500/70 bg-red-500/10 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-white/10 focus:bg-white/10 focus:border-power-red/60 focus:ring-4 focus:ring-power-red/10 hover:bg-white/10"
        }`}
      />
      {isError && (
        <div className="flex items-center mt-1.5 text-sm text-red-600 font-medium animate-pulse">
          <svg
            className="w-4 h-4 mr-1.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default InputGroup;
