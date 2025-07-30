import React, { useEffect, useState } from "react";

export type SnackbarType = "success" | "pending" | "error";

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  isOpen,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#E8FFE4",
          borderColor: "#0FA650",
          textColor: "#0D141C",
          statusColor: "#0FA650",
        };
      case "pending":
        return {
          backgroundColor: "#FFE9D9",
          borderColor: "#DF6812",
          textColor: "#0D141C",
          statusColor: "#DF6812",
        };
      case "error":
        return {
          backgroundColor: "#FDD5D3",
          borderColor: "#DA0909",
          textColor: "#0D141C",
          statusColor: "#DA0909",
        };
      default:
        return {
          backgroundColor: "#E8FFE4",
          borderColor: "#0FA650",
          textColor: "#0D141C",
          statusColor: "#0FA650",
        };
    }
  };

  const getStatusText = () => {
    switch (type) {
      case "success":
        return "Approved";
      case "pending":
        return "Pending";
      case "error":
        return "Rejected";
      default:
        return "";
    }
  };

  const styles = getStyles();

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div
        className="rounded-lg p-4 shadow-lg border-l-4 min-w-[300px] max-w-[400px]"
        style={{
          backgroundColor: styles.backgroundColor,
          borderLeftColor: styles.borderColor,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-sm font-semibold"
                style={{ color: styles.textColor }}
              >
                Current Status
              </span>
            </div>
            <div
              className="text-lg font-bold mb-2"
              style={{ color: styles.statusColor }}
            >
              {getStatusText()}
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: styles.textColor }}
            >
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
            style={{ color: styles.textColor }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
