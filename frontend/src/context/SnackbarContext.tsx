import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { SnackbarType } from "../components/Snackbar";

interface SnackbarState {
  isOpen: boolean;
  message: string;
  type: SnackbarType;
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type: SnackbarType,
    duration?: number,
  ) => void;
  hideSnackbar: () => void;
  snackbar: SnackbarState;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isOpen: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const showSnackbar = (
    message: string,
    type: SnackbarType,
    duration?: number,
  ) => {
    setSnackbar({
      isOpen: true,
      message,
      type,
      duration: duration || 5000,
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, snackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
