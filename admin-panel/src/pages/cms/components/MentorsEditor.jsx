import React, { useEffect, useState, useMemo } from "react";
import { API } from "../../../api/axios";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import { Award, Plus, X, Upload, UserPlus, Search, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

const MentorsEditor = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [roles, setRoles] = useState([]);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [fullNameEn, setFullNameEn] = useState("");
  const [fullNameBn, setFullNameBn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("Expert Culinary Mentor");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [bioBn, setBioBn] = useState("");
  const [achievements, setAchievements] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Search & Preview State
  const [searchTerm, setSearchTerm] = useState("");
  const [previewLocale, setPreviewLocale] = useState("en");

  const fetchEmployees = () => {
    setLoading(true);
    API.get("/users/all?limit=100")
      .then((res) => {
        const list = res.data?.data?.users || res.data?.data || [];
        setEmployees(list);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        toast.error("Failed to load employee list");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployees();

    // Fetch branches and roles for the dropdowns
    API.get("/branches/all")
      .then((res) => {
        const list = res.data?.data || [];
        setBranches(list);
        if (list.length > 0) {
          setSelectedBranch(list[0].id || list[0]._id);
        }
      })
      .catch((err) => console.error("Error loading branches:", err));

    API.get("/roles")
      .then((res) => {
        setRoles(res.data?.data || []);
      })
      .catch((err) => console.error("Error loading roles:", err));
  }, []);

  const handleToggleMentor = async (employee) => {
    const newStatus = !employee.isMentor;
    try {
      await API.put(`/users/${employee.id}`, {
        is_mentor: newStatus
      });
      toast.success(
        newStatus 
          ? `${employee.fullName} is now shown on Mentors Page!` 
          : `${employee.fullName} removed from Mentors Page.`
      );
      // Local state update
      setEmployees(prev => 
        prev.map(emp => emp.id === employee.id ? { ...emp, isMentor: newStatus } : emp)
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateMentor = async (e) => {
    e.preventDefault();

    if (!fullNameEn.trim() || !email.trim() || !phone.trim() || !selectedBranch) {
      toast.error("Please fill in all required fields (Name, Email, Phone, Campus)");
      return;
    }

    setSubmitting(true);

    try {
      // Find the instructor or faculty role
      const instructorRole = roles.find(r => 
        r.name.toLowerCase() === "instructor" || 
        r.name.toLowerCase() === "faculty" ||
        r.name.toLowerCase() === "mentor"
      ) || roles[0];

      if (!instructorRole) {
        throw new Error("No roles found in system database. Please configure roles first.");
      }

      // Generate credentials
      const cleanUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") + "_mentor_" + Math.floor(100 + Math.random() * 900);
      const employeeId = "MENTOR-" + Math.floor(100000 + Math.random() * 900000);

      const fd = new FormData();
      fd.append("full_name", fullNameEn.trim());
      fd.append("full_name_bn", fullNameBn.trim());
      fd.append("employee_id", employeeId);
      fd.append("email", email.trim());
      fd.append("phone", phone.trim());
      fd.append("branch", selectedBranch);
      fd.append("department", "Culinary Faculty");
      fd.append("designation", designation.trim());
      fd.append("username", cleanUsername);
      fd.append("role", instructorRole.id || instructorRole._id || "");
      fd.append("password", "123456");
      fd.append("bio", bioEn.trim());
      fd.append("bio_bn", bioBn.trim());
      fd.append("achievements", achievements.trim());
      fd.append("is_mentor", "true");
      fd.append("status", "Active");
      if (photoFile) {
        fd.append("photo", photoFile);
      }

      await API.post("/users/create", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("External mentor added successfully!");
      setShowAddModal(false);
      
      // Reset Form
      setFullNameEn("");
      setFullNameBn("");
      setEmail("");
      setPhone("");
      setDesignation("Expert Culinary Mentor");
      setBioEn("");
      setBioBn("");
      setAchievements("");
      setPhotoFile(null);
      setPhotoPreview(null);
      
      fetchEmployees();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to create external mentor");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employees;
    const term = searchTerm.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.fullName?.toLowerCase().includes(term) ||
        (emp.fullNameBn || emp.full_name_bn)?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.designation?.toLowerCase().includes(term)
    );
  }, [employees, searchTerm]);

  const activeMentors = useMemo(() => {
    return employees.filter((emp) => emp.isMentor);
  }, [employees]);

  const parseEmployeeToMentor = (emp, locale) => {
    const isBn = locale === 'bn';
    const name = (isBn ? (emp.fullNameBn || emp.full_name_bn) : (emp.fullName || emp.full_name)) || emp.fullName || emp.full_name || "";
    
    const achievementsText = emp.achievements || "";
    let credentials = [];
    
    if (typeof achievementsText === "string" && achievementsText.trim()) {
      credentials = achievementsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    }
  
    // Extract bio (excluding bullet points)
    const bioText = (isBn ? (emp.bioBn || emp.bio_bn || emp.bio) : emp.bio) || "";
    const bio = bioText
      .split("\n")
      .filter((line) => !/^\s*[-*•]\s+/.test(line))
      .join("\n")
      .trim();
  
    let photo = emp.photoUrl || emp.photo_url || "";
    if (photo && !photo.startsWith("http")) {
      photo = `http://localhost:3043${photo}`;
    }
  
    return {
      id: emp.username || emp.id,
      name,
      title: emp.designation || (isBn ? "প্রশিক্ষক" : "Instructor"),
      photo,
      bio: bio || (isBn ? `${name} সিআইবি-তে একজন কালিনারি প্রফেশনাল।` : `${name} is a culinary professional at CIB.`),
      credentials: credentials.length > 0 ? credentials : (isBn ? ["সার্টিফাইড কালিনারি ট্রেইনার"] : ["Certified Culinary Trainer"]),
      cta: isBn ? "আবেদন করুন" : "Apply Now"
    };
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-zinc-100 uppercase tracking-tight">Expert Culinary Mentors Editor</h3>
          <p className="text-zinc-500 text-xs font-medium mt-1">
            Toggle who displays on the mentors page, or create independent external mentors.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-power-red border border-power-red/30 text-white inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-[#C8102E] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-power-red/20 cursor-pointer"
        >
          <UserPlus size={16} /> Add External Mentor
        </button>
      </div>

      {/* Grid Layout: Left Column = List, Right Column = Live Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
        {/* Left Column: Management */}
        <div className="space-y-4">
          {/* Search Controls */}
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                type="text"
                placeholder="Search employees by name, email, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-power-red/40 focus:border-power-red/30 transition-all"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-100 bg-white/5 border border-white/10 px-3 py-2 rounded-xl transition-all"
              >
                Clear
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="table-premium min-w-full">
              <thead>
                <tr>
                  <th>Employee Profile</th>
                  <th>Designation & Dept</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Show on Mentors Page</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-10 text-zinc-500 font-bold">
                      {searchTerm ? "No employees match your search." : "No employee records found."}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-white/5 transition-colors">
                      <td>
                        <div className="flex items-center gap-3">
                          {emp.photoUrl ? (
                            <img
                              src={emp.photoUrl.startsWith("http") ? emp.photoUrl : `http://localhost:3043${emp.photoUrl}`}
                              alt={emp.fullName}
                              className="w-10 h-10 object-cover rounded-xl border border-white/5 shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-bold text-zinc-500">
                              {emp.fullName?.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-zinc-100 text-sm flex items-center gap-1.5">
                              {emp.fullName}
                              {emp.isMentor && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-600 text-[9px] font-black rounded-md uppercase tracking-wider">
                                  <Award size={10} /> Mentor
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] font-medium text-zinc-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-xs font-bold text-zinc-200">{emp.designation || "N/A"}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{emp.department || "N/A"}</div>
                      </td>
                      <td className="text-center">
                        <span
                          className={`inline-block px-2.5 py-1 text-[10px] font-black rounded-xl uppercase tracking-wider ${
                            emp.status === "Active"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-white/5 text-zinc-500"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleToggleMentor(emp)}
                          className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                            emp.isMentor
                              ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                              : "bg-white/5 text-zinc-500 hover:bg-white/10"
                          }`}
                        >
                          {emp.isMentor ? "Active Mentor" : "Hide"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Live Website Preview */}
        <div className="bg-[#0b0b0d] rounded-3xl border border-slate-800 p-6 flex flex-col h-[750px] overflow-hidden sticky top-6 shadow-xl">
          {/* Preview Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 shrink-0">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Live Website Preview</h4>
              <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">Real-time public page display</p>
            </div>
            
            {/* Language Selector */}
            <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => setPreviewLocale("en")}
                className={`px-2 py-1 text-[10px] font-black uppercase rounded-md transition-all ${
                  previewLocale === "en" ? "bg-[#D4AF37] text-[#000A1A]" : "text-zinc-500 hover:text-slate-200"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setPreviewLocale("bn")}
                className={`px-2 py-1 text-[10px] font-black uppercase rounded-md transition-all ${
                  previewLocale === "bn" ? "bg-[#D4AF37] text-[#000A1A]" : "text-zinc-500 hover:text-slate-200"
                }`}
              >
                BN
              </button>
            </div>
          </div>

          {/* Cards List container */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
            {activeMentors.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 border border-dashed border-slate-800 rounded-2xl">
                <Award size={32} className="text-zinc-500 mb-2 opacity-50" />
                <p className="text-xs font-bold">No Active Mentors</p>
                <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px]">
                  Toggle "Show on Mentors Page" for employees to see them here.
                </p>
              </div>
            ) : (
              activeMentors.map((emp) => {
                const mentor = parseEmployeeToMentor(emp, previewLocale);
                return (
                  <div
                    key={emp.id}
                    className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col relative overflow-hidden transition-all duration-300"
                  >
                    {/* Background gold blur effect */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#D4AF37]/10 rounded-full blur-[20px]"></div>
                    
                    {/* Image */}
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      {mentor.photo ? (
                        <img
                          src={mentor.photo}
                          alt={mentor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center font-bold text-zinc-500 text-xl">
                          {mentor.name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Name & Title */}
                    <div className="text-center mb-4">
                      <h5 className="text-sm font-bold text-white tracking-tight">{mentor.name}</h5>
                      <p className="text-[#D4AF37] font-black text-[9px] uppercase tracking-widest mt-1">
                        {mentor.title}
                      </p>
                    </div>

                    {/* Bio */}
                    {mentor.bio && (
                      <p className="text-zinc-500 text-[11px] leading-relaxed text-center mb-4 italic">
                        "{mentor.bio}"
                      </p>
                    )}

                    {/* Credentials */}
                    {mentor.credentials && mentor.credentials.length > 0 && (
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-4">
                        <ul className="space-y-1.5">
                          {mentor.credentials.map((cred, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[10px] text-zinc-400 font-bold leading-tight">
                              <CheckCircle2 size={12} className="text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{cred}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <button
                      type="button"
                      className="w-full bg-[#EF233C] text-white py-2 rounded-lg font-bold tracking-widest text-[9px] uppercase hover:bg-red-700 transition-colors shadow-md shadow-red-900/20"
                    >
                      {mentor.cta}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Add External Mentor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/5 w-full max-w-2xl rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden relative flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-power-red/10 flex items-center justify-center text-power-red">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h3 className="font-black text-zinc-100 text-base uppercase tracking-tight">Add External Mentor</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Independent Mentor Registration</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-zinc-500 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateMentor} className="overflow-y-auto flex-1 p-8 space-y-6">
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-3xl border border-dashed border-white/10">
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-2xl border-2 border-white shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 shadow-md cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-power-red/30 transition-all shadow-sm group">
                    <Upload size={20} className="text-zinc-500 group-hover:text-power-red transition-colors" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase mt-2 group-hover:text-power-red">Upload Photo</span>
                    <input type="file" onChange={handlePhotoChange} accept="image/*" className="hidden" />
                  </label>
                )}
                <span className="text-[10px] text-zinc-500 font-semibold">Recommended aspect ratio: Square (1:1)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={fullNameEn}
                    onChange={(e) => setFullNameEn(e.target.value)}
                    placeholder="e.g. Executive Chef John Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Full Name (Bangla)</label>
                  <input
                    type="text"
                    value={fullNameBn}
                    onChange={(e) => setFullNameBn(e.target.value)}
                    placeholder="যেমনঃ শেফ জন ডো"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@culinaryacademy.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01700000000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Designation / Title *</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Senior Culinary Faculty"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Assigned Campus *</label>
                  <select
                    required
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    {branches.map((b) => (
                      <option key={b.id || b._id} value={b.id || b._id}>
                        {b.branchName || b.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Biography / Info (English)</label>
                <textarea
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  rows="3"
                  placeholder="Biography details of the guest mentor..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Biography / Info (Bangla)</label>
                <textarea
                  value={bioBn}
                  onChange={(e) => setBioBn(e.target.value)}
                  rows="3"
                  placeholder="বাংলায় প্রশিক্ষকের পরিচিতি..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">Accomplishments / Achievements (One item per line)</label>
                <textarea
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  rows="4"
                  placeholder="e.g. Certified Executive Chef&#10;Certified Trainer under BTEB / NSDA"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-power-red/40 focus:border-power-red/30 transition-all duration-200"
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3 bg-white/5 -mx-8 -mb-8 p-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-24 border border-white/10 text-zinc-500 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-power-red border border-power-red/30 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-power-red/20 flex items-center gap-2 cursor-pointer hover:bg-[#C8102E]"
                >
                  {submitting ? "Adding..." : "Add Mentor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorsEditor;
