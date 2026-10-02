import React, { useState } from "react";
import useAuth from "../store/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/admin");        
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please check your credentials."
      );
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setIsSendingReset(true);
    const success = await forgotPassword(email);
    setIsSendingReset(false);
    if (success) {
      setIsForgotPassword(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0505] via-[#050506] to-black p-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-power-red/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-power-red/10 rounded-full blur-[100px]" />

      {/* Login Card */}
      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 border border-white/10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-power-red/10 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner border border-power-red/20">
            <ShieldCheck size={40} className="text-power-red" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
            {isForgotPassword ? "Reset Password" : "Welcome Back"}
          </h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
            {isForgotPassword ? "Retrieve account access" : "Secure Access Portal"}
          </p>
        </div>

        {isForgotPassword ? (
          /* Forgot Password Form */
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-power-red transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="admin@cib.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendingReset}
              className="w-full justify-center btn-primary mt-4"
            >
              {isSendingReset ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending Link...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send Reset Link
                </>
              )}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-[11px] font-black text-power-red uppercase tracking-wider hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="group">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-power-red transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="admin@cib.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-[10px] font-bold text-power-red hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-power-red transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full justify-center btn-primary mt-4"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        )}

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

export default LoginPage;