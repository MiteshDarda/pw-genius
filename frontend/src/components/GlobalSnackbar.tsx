import React from "react";
import { useContext } from "react";
import Snackbar from "./Snackbar";
import { SnackbarContext } from "../context/SnackbarContext";

const GlobalSnackbar: React.FC = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    return null;
  }

  const { snackbar, hideSnackbar } = context;

  return (
    <Snackbar
      isOpen={snackbar.isOpen}
      message={snackbar.message}
      type={snackbar.type}
      onClose={hideSnackbar}
      duration={snackbar.duration}
    />
  );
};

export default GlobalSnackbar;
