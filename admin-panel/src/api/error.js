/**
 * Centralized API Error Handler
 *
 * Normalizes Axios errors into user-facing actions:
 *   401 → logout + redirect to login
 *   403 → permission denied toast
 *   400/422 → form validation (returns message for in-form display)
 *   500 → server error toast
 *
 * Usage in hooks:
 *   import { handleError, getErrorMessage } from "../api/error";
 *   onError: (error) => handleError(error, "Failed to save");
 *
 * Usage as Axios interceptor (for global 401):
 *   API.interceptors.response.use(null, (error) => { ... });
 */

import toast from "react-hot-toast";

// ---- Helpers ----

/** Extract a human-readable message from any Axios error */
export const getErrorMessage = (error, fallback = "Something went wrong") => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    // Network errors, timeouts, etc.
    if (error.message === "Network Error") return "Network error. Check your connection.";
    if (error.code === "ECONNABORTED") return "Request timed out. Please try again.";
    return error.message;
  }
  return fallback;
};

/** Extract error code from response (e.g., "DUPLICATE_FIELD") */
export const getErrorCode = (error) => {
  return error?.response?.data?.code || null;
};

/** Extract field-level validation errors (e.g., Zod issues) */
export const getFieldErrors = (error) => {
  return error?.response?.data?.details?.fields || error?.response?.data?.errors || null;
};

// ---- Global Handler ----

/**
 * Handle an API error with appropriate user action.
 * Call this from mutation onError callbacks.
 *
 * @param {Error} error - Axios error object
 * @param {string} fallback - Fallback message if none in response
 * @param {object} options
 * @param {function} options.onLogout - Override logout behavior
 * @param {boolean} options.silent401 - Don't show toast for 401 (caller handles it)
 */
export const handleError = (error, fallback = "Something went wrong", options = {}) => {
  const status = error?.response?.status;

  if (status === 401) {
    if (!options.silent401) {
      toast.error("Session expired. Please log in again.");
    }
    // Trigger logout via the auth store
    doLogout();
    return;
  }

  if (status === 403) {
    toast.error("Access denied. You don't have permission for this action.");
    return;
  }

  if (status === 404) {
    toast.error(getErrorMessage(error, "Resource not found."));
    return;
  }

  if (status === 409) {
    toast.error(getErrorMessage(error, "Conflict — this record may already exist."));
    return;
  }

  if (status === 422 || status === 400) {
    // Validation errors — show the message from the server
    toast.error(getErrorMessage(error, "Invalid input. Please check your data."));
    return;
  }

  if (status && status >= 500) {
    toast.error(getErrorMessage(error, "Server error. Please try again later."));
    return;
  }

  // Network or unexpected errors
  toast.error(getErrorMessage(error, fallback));
};

// ---- Logout Integration ----

/**
 * Logout function — set by the auth store on init.
 * Avoids circular import between error.js and useAuth.js.
 */
let _logoutFn = null;

/** Register the logout function from the auth store */
export const registerLogout = (logoutFn) => {
  _logoutFn = logoutFn;
};

/** Perform logout (called on 401) */
const doLogout = () => {
  if (_logoutFn) {
    _logoutFn();
  } else {
    // Fallback: clear cookies and redirect
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  }
};

// ---- Axios Interceptor ----

/**
 * Install the global response interceptor on an Axios instance.
 * Handles 401 silently (triggers logout) so individual hooks don't need to.
 * For other errors, hooks should still use handleError() in onError.
 */
export const installErrorInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        const url = error.config?.url || "";
        const isAuthRequest = url.includes("/auth/logout") || url.includes("/auth/login") || url.includes("/auth/check");
        if (!isAuthRequest) {
          doLogout();
        }
      }
      return Promise.reject(error);
    }
  );
};
