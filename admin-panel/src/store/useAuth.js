import { create } from "zustand";
import { API } from "../api/axios";
import toast from "react-hot-toast";
import { registerLogout } from "../api/error";

// Register the logout function with the centralized error handler
// so 401 responses can trigger logout automatically.
registerLogout(() => {
  const { logout } = useAuth.getState();
  return logout();
});

const useAuth = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  onlineUsers: [],

  setAuthUser: (user) => set({ authUser: user }),

  hasPermission: (permission) => {
    const { authUser } = get();
    if (!authUser || !authUser.role) return false;

    const roleName = typeof authUser.role === 'string' ? authUser.role : authUser.role.name;
    const permissions = authUser.role.permissions || [];

    if (roleName?.toLowerCase() === "superadmin" || permissions.includes("all_access")) {
      return true;
    }

    return permissions.includes(permission);
  },

  isMaster: () => {
    const { authUser } = get();
    const roleName = typeof authUser?.role === 'string' ? authUser.role : authUser?.role?.name;
    return roleName?.toLowerCase() === "superadmin";
  },

  checkAuth: async () => {
    try {
      const res = await API.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401 || status === 403 || error?.response) {
        set({ authUser: null });
      } else {
        console.warn("Network error during checkAuth. Retaining session:", error.message);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await API.post("/auth/register", data);
      set({ authUser: res.data.data || res.data.user });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await API.post("/auth/login", data);
      set({ authUser: res.data.data || res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await API.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await API.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Password reset link sent to your email.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link.");
      return false;
    }
  },

  resetPassword: async (token, password) => {
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
      return false;
    }
  },
}));

export default useAuth;