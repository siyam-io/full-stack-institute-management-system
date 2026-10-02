import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { useAddSyllabusItems } from "../../hooks/useClasses";

const AddSyllabusModal = ({ batchId, onClose }) => {
  const { mutate, isPending } = useAddSyllabusItems(batchId);

  // Array state to hold multiple class objects
  const [rows, setRows] = useState([
    { class_number: "", topic: "", class_type: "Theory", content_details: "" }
  ]);

  const addRow = () => {
    setRows([...rows, { class_number: "", topic: "", class_type: "Theory", content_details: "" }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // We send the array to the backend
    // If your backend currently only accepts 1 object, we will update it in Step 2.
    mutate(rows, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-5xl bg-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-2xl font-black text-zinc-100">Add Bulk Syllabus</h2>
            <p className="text-sm text-zinc-500">Create multiple class topics for this batch.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Dynamic Form Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {rows.map((row, index) => (
            <div key={index} className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-power-red/30 transition-all">
              
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1">Code</label>
                <input 
                  required
                  placeholder="Class-01"
                  value={row.class_number}
                  onChange={(e) => handleChange(index, "class_number", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-power-red/40 text-sm"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1">Topic Name</label>
                <input 
                  required
                  placeholder="e.g. Knife Skills"
                  value={row.topic}
                  onChange={(e) => handleChange(index, "topic", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-power-red/40 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1">Type</label>
                <select 
                  value={row.class_type}
                  onChange={(e) => handleChange(index, "class_type", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-power-red/40 text-sm cursor-pointer"
                >
                  <option value="Theory">Theory</option>
                  <option value="Practical">Practical</option>
                  <option value="Exam">Exam</option>
                  <option value="Practice Session">Practice Session</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1">Recipes / Details (1 per line)</label>
                <textarea 
                  placeholder="Recipe 1&#10;Recipe 2"
                  rows={1}
                  value={row.content_details}
                  onChange={(e) => handleChange(index, "content_details", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-power-red/40 text-sm resize-none"
                />
              </div>

              {/* Delete Button */}
              <div className="md:col-span-1 flex items-end pb-1">
                <button 
                  type="button"
                  onClick={() => removeRow(index)}
                  className={`p-2 rounded-lg transition-colors ${rows.length > 1 ? 'text-red-400 hover:bg-red-50 hover:text-red-600' : 'text-gray-200 cursor-not-allowed'}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <button 
            type="button" 
            onClick={addRow}
            className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-zinc-500 hover:text-power-red hover:border-power-red/30 hover:bg-power-red/10 transition-all flex items-center justify-center gap-2 font-bold"
          >
            <Plus size={20} /> Add Another Class Row
          </button>
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-white/5 flex gap-4">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-3 px-6 bg-white/5 border border-white/10 text-zinc-500 font-bold rounded-2xl hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-[2] py-3 px-6 bg-[#EF233C] text-white font-bold rounded-2xl hover:bg-[#C8102E] shadow-lg shadow-power-red/20 transition-all disabled:opacity-50"
          >
            {isPending ? "Saving..." : `Save ${rows.length} Classes to Syllabus`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSyllabusModal;