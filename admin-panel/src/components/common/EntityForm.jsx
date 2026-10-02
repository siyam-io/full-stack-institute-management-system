import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { Loader2, Layout, Code } from "lucide-react";
import InputGroup from "../fields/InputGroup.jsx";
import SelectGroup from "../fields/SelectGroup.jsx";
import { apiURL } from "../../../Constant.js";
import Swal from "sweetalert2";

const BASE_URL = apiURL.image_url;

const EntityForm = ({ 
  title, subtitle, config, onSubmit, isLoading, initialData = {}, 
  buttonText = "Submit", mode = "add", onCancel, buttonColor
}) => {
  const [formData, setFormData] = useState(() => {
    const initialFields = {};
    config.forEach(field => {
      if (field.type === "checkbox-group") {
        initialFields[field.name] = initialData[field.name] || [];
      } else if (field.name) {
        initialFields[field.name] = initialData[field.name] || "";
      }
    });
    return { ...initialData, ...initialFields };
  });

  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isCompressing, setIsCompressing] = useState(false);

  // Dual Edit Modes: "visual" or "json"
  const [editMode, setEditMode] = useState("visual");
  const [rawJsonText, setRawJsonText] = useState("");

  const handleCopyCurrentJson = () => {
    const exportData = { ...formData };
    delete exportData.photo; // prevent copying file object reference
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: "Current JSON data copied to clipboard.",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const handleCopyTemplateJson = () => {
    const template = {};
    config.forEach(field => {
      if (field.name && !field.divider) {
        if (field.type === "checkbox-group") {
          template[field.name] = ["Value 1", "Value 2"];
        } else if (field.type === "checkbox") {
          template[field.name] = true;
        } else {
          template[field.name] = `[Enter ${field.label || field.name}]`;
        }
      }
    });
    navigator.clipboard.writeText(JSON.stringify(template, null, 2));
    Swal.fire({
      icon: "success",
      title: "Template Copied!",
      text: "AI JSON Template copied to clipboard.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleToggleMode = (selectedMode) => {
    if (selectedMode === "json") {
      const exportData = { ...formData };
      delete exportData.photo;
      setRawJsonText(JSON.stringify(exportData, null, 2));
    } else {
      try {
        const parsed = JSON.parse(rawJsonText);
        if (parsed && typeof parsed === "object") {
          setFormData((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        Swal.fire("JSON Parse Error", "The JSON is invalid and cannot be mapped to Visual mode.", "error");
        return;
      }
    }
    setEditMode(selectedMode);
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
      
      if (initialData.photo_url && typeof initialData.photo_url === "string" && initialData.photo_url.trim() !== "") {
        setPreviewUrl(initialData.photo_url.startsWith("http") ? initialData.photo_url : `${BASE_URL}${initialData.photo_url}`);
      }
    }
  }, [initialData]);

  useEffect(() => {
    if (!photo) return;
    const objectUrl = URL.createObjectURL(photo);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    
    if (e.target.dataset.group === "checkbox-group") {
      setFormData((prev) => {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
        if (checked) {
          return { ...prev, [name]: [...currentArray, value] };
        } else {
          return { ...prev, [name]: currentArray.filter(item => item !== value) };
        }
      });
      return;
    }

    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (formErrors.photo) setFormErrors((prev) => ({ ...prev, photo: undefined }));

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      setIsCompressing(true);
      const compressedFile = await imageCompression(file, options);
      setPhoto(compressedFile);
    } catch (error) {
      console.error("Compression failed:", error);
      setPhoto(file); // Fallback to raw upload if compression fails
    } finally {
      setIsCompressing(false);
    }
  };

  const validateForm = (dataToValidate) => {
    const errors = {};
    config.forEach((field) => {
      if (field.divider) return;
      const value = dataToValidate[field.name];
      
      if (field.required && (value === undefined || value === null || (typeof value === "string" && value.trim() === "") || (Array.isArray(value) && value.length === 0))) {
        errors[field.name] = `${field.label || field.name} is required`;
      }
      
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field.name] = "Invalid email format";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalData = { ...formData };
    if (editMode === "json") {
      try {
        const parsed = JSON.parse(rawJsonText);
        if (parsed && typeof parsed === "object") {
          finalData = parsed;
        } else {
          return Swal.fire("Error", "JSON must be an object", "error");
        }
      } catch (err) {
        return Swal.fire("Error", "Invalid JSON format. Please fix prior to saving.", "error");
      }
    }

    if (!validateForm(finalData)) return;

    const data = new FormData();
    Object.entries(finalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) value.forEach(v => data.append(`${key}[]`, v));
        else data.append(key, typeof value === "string" ? value.trim() : value);
      }
    });
    if (photo) data.append("photo", photo);
    
    onSubmit(data, finalData);
  };

  const standardFields = config.filter(f => !["file", "checkbox"].includes(f.type));
  const fileField = config.find(f => f.type === "file");
  const singleCheckboxFields = config.filter(f => f.type === "checkbox");

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm p-8 relative overflow-hidden border border-slate-100/60">
      {(isLoading || isCompressing) && (
        <div className="absolute inset-0 bg-white/60 z-50 flex items-center justify-center backdrop-blur-[2px]">
          <Loader2 className="animate-spin text-teal-600" size={40} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-slate-100/60">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Edit Mode Toggle Switch */}
          <div className="flex items-center bg-gray-100 p-1.5 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => handleToggleMode("visual")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all ${
                editMode === "visual"
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-800"
              }`}
            >
              <Layout size={14} /> Visual Mode
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode("json")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all ${
                editMode === "json"
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-800"
              }`}
            >
              <Code size={14} /> Raw JSON Mode
            </button>
          </div>
          <button onClick={onCancel} type="button" className="btn-secondary py-2 px-3 text-xs">
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {editMode === "visual" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standardFields.map((field, idx) => {
                const uniqueKey = field.name || `field-${idx}`;

                if (field.divider) {
                  return (
                    <div key={uniqueKey} className="col-span-full pt-4 mt-2 border-t border-slate-100/60">
                      {field.title && <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{field.title}</h2>}
                    </div>
                  );
                }
                
                if (field.type === "custom") {
                  return (
                    <div key={uniqueKey} className={field.fullWidth ? "col-span-full" : ""}>
                      {field.render({
                        value: formData[field.name],
                        onChange: (val) => {
                          setFormData(prev => ({ ...prev, [field.name]: val }));
                          if (field.onChange) field.onChange(val); 
                        }
                      })}
                    </div>
                  );
                }

                if (field.type === "checkbox-group") {
                  const currentValues = Array.isArray(formData[field.name]) ? formData[field.name] : [];
                  return (
                    <div key={uniqueKey} className="col-span-full">
                      <label className="block mb-4 text-[13px] font-bold text-gray-800 tracking-wide ml-1">
                        {field.label}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-6 ml-1">
                        {field.options.map((opt) => (
                          <label key={opt.value} className="flex items-center space-x-2.5 cursor-pointer group">
                            <input
                              type="checkbox"
                              name={field.name}
                              value={opt.value}
                              data-group="checkbox-group"
                              checked={currentValues.includes(opt.value)}
                              onChange={(e) => {
                                handleChange(e);
                                if (field.onChange) field.onChange(e); 
                              }}
                              className="w-[18px] h-[18px] text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500 accent-teal-600 cursor-pointer transition-all"
                            />
                            <span className="text-[14px] text-gray-700 font-medium select-none group-hover:text-gray-900 transition-colors">
                              {opt.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {formErrors[field.name] && <p className="text-[10px] font-bold text-red-500 mt-3 ml-1 uppercase">{formErrors[field.name]}</p>}
                    </div>
                  );
                }

                if (field.type === "select") {
                  return (
                    <div key={uniqueKey} className={field.fullWidth ? "col-span-full" : ""}>
                      <SelectGroup
                        label={field.label}
                        name={field.name}
                        value={formData[field.name] || ""}
                        options={field.options || []}
                        defaultOption={field.defaultOption}
                        required={field.required}
                        disabled={field.disabled}
                        onChange={(e) => {
                          handleChange(e);
                          if (field.onChange) field.onChange(e);
                        }}
                        error={formErrors[field.name]}
                      />
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={uniqueKey} className={`flex flex-col ${field.fullWidth ? 'col-span-full' : ''}`}>
                      <label className="block mb-1.5 text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">{field.label}</label>
                      <textarea 
                        name={field.name} 
                        value={formData[field.name] || ""} 
                        onChange={(e) => {
                          handleChange(e);
                          if (field.onChange) field.onChange(e); 
                        }} 
                        rows={field.rows || "3"} 
                        placeholder={field.placeholder} 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all duration-200" 
                      />
                      {formErrors[field.name] && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">{formErrors[field.name]}</p>}
                    </div>
                  );
                }

                return (
                  <div key={uniqueKey} className={field.fullWidth ? "col-span-full" : ""}>
                    <InputGroup 
                      label={field.label} 
                      name={field.name} 
                      type={field.type || "text"} 
                      value={formData[field.name] || ""} 
                      onChange={(e) => {
                        handleChange(e);
                        if (field.onChange) field.onChange(e); 
                      }} 
                      placeholder={field.placeholder} 
                      required={field.required} 
                      error={formErrors[field.name]} 
                      {...field.props} 
                    />
                  </div>
                );
              })}
            </div>

            {fileField && (
              <div className="pt-6 border-t border-slate-100/60">
                <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-4 ml-1">{fileField.label}</h2>
                <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded-3xl border border-slate-100/60">
                  <div className="shrink-0">
                    {previewUrl ? <img src={previewUrl} alt="Preview" className="h-20 w-20 object-cover rounded-2xl shadow-md border-2 border-white" /> : <div className="h-20 w-20 rounded-2xl bg-white border border-gray-200 border-dashed flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase">No Image</div>}
                  </div>
                  <label className="block flex-1">
                    <input type="file" onChange={handleUploadPhoto} accept="image/*" className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer transition-all" />
                    {formErrors.photo && <p className="text-[10px] font-bold text-red-500 mt-2 uppercase">{formErrors.photo}</p>}
                  </label>
                </div>
              </div>
            )}

            {singleCheckboxFields.length > 0 && (
              <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-100/60">
                {singleCheckboxFields.map((field) => (
                  <label key={field.name} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name={field.name} 
                      checked={formData[field.name] || false} 
                      onChange={(e) => {
                        handleChange(e);
                        if (field.onChange) field.onChange(e); 
                      }} 
                      className="w-[18px] h-[18px] text-teal-600 rounded-lg border-gray-300 focus:ring-teal-500 accent-teal-600 transition-all cursor-pointer" 
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{field.label}</span>
                  </label>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-6 rounded-[2rem] space-y-4 border border-slate-100/60">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800 text-sm">Raw Form JSON Configuration</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyTemplateJson}
                  className="text-[10px] text-blue-600 hover:text-blue-800 font-black tracking-wider uppercase border border-blue-100 bg-blue-50 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  Copy AI Template
                </button>
                <button
                  type="button"
                  onClick={handleCopyCurrentJson}
                  className="text-[10px] text-teal-600 hover:text-teal-800 font-black tracking-wider uppercase border border-teal-100/50 bg-teal-50/50 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  Copy Current JSON
                </button>
              </div>
            </div>
            <p className="text-[10px] text-gray-500">Advanced: Paste form values directly in JSON format. Match configuration keys to populate input fields.</p>
            <textarea
              value={rawJsonText}
              onChange={(e) => setRawJsonText(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl font-mono text-xs focus:outline-none bg-slate-900 text-slate-100"
              rows={20}
            />
          </div>
        )}

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isLoading || isCompressing} 
            className="w-full justify-center btn-primary"
          >
            {isCompressing ? "Optimizing..." : isLoading ? "Processing..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntityForm;