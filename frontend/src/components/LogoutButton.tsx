import React from "react";
import { handleLogout } from "../utils/logout";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "",
  children = "Logout",
  variant = "danger",
  size = "md",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-700 text-white";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      default:
        return "bg-red-600 hover:bg-red-700 text-white";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-6 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`${getVariantClasses()} ${getSizeClasses()} rounded-lg font-semibold transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
