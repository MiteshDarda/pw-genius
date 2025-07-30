import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext";
import type { SnackbarType } from "../components/Snackbar";

/**
 * Custom hook for using the global Snackbar system
 *
 * @example
 * ```tsx
 * const { showSnackbar } = useSnackbar();
 *
 * // Show success message
 * showSnackbar('Operation completed successfully!', 'success');
 *
 * // Show error message
 * showSnackbar('Something went wrong!', 'error');
 *
 * // Show pending message
 * showSnackbar('Processing your request...', 'pending');
 * ```
 */
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  const { showSnackbar, hideSnackbar } = context;

  return {
    showSnackbar: (
      message: string,
      type: SnackbarType = "success",
      duration?: number,
    ) => {
      showSnackbar(message, type, duration);
    },
    hideSnackbar,
  };
};
