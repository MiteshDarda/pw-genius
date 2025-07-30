import { clearUserData } from "./auth";

/**
 * Common logout utility that handles Cognito logout and local data cleanup
 */
export const handleLogout = () => {
  // Clear local user data first
  clearUserData();

  // Then redirect to Cognito logout
  signOutRedirect();
};

/**
 * Redirects to Cognito logout endpoint
 */
export const signOutRedirect = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const logoutUri = import.meta.env.VITE_LOGOUT_URI || "http://localhost:5173/";
  const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};
