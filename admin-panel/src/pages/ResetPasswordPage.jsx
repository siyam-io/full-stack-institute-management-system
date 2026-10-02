import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import toast from "react-hot-toast";
import { Lock, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsResetting(true);
    const success = await resetPassword(token, password);
    setIsResetting(false);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0505] via-[#050506] to-black p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-power-red/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-power-red/10 rounded-full blur-[100px]" />

      {/* Card Container */}
      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 border border-white/10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-power-red/10 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner border border-power-red/20">
            <ShieldCheck size={40} className="text-power-red" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Set New Password</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
            Enter your new password below
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* New Password */}
          <div className="group">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-power-red transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-white/5 border-2 border-white/10 rounded-2xl font-bold text-zinc-100 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-power-red transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="group">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-power-red transition-colors" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-white/5 border-2 border-white/10 rounded-2xl font-bold text-zinc-100 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-power-red transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isResetting}
            className="w-full py-4 bg-power-red text-white text-[12px] font-black uppercase tracking-widest rounded-2xl hover:bg-power-red/90 disabled:opacity-70 transition-all shadow-xl shadow-power-red/25 flex justify-center items-center gap-2 mt-4"
          >
            {isResetting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Updating Password...
              </>
            ) : (
              <>
                <Lock size={18} />
                Update Password
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-zinc-500">
            Powered by <span className="text-power-red">CIB Tech</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
