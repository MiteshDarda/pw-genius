import { clearUserData } from "./auth";

/**
 * Common logout utility that handles Cognito logout and local data cleanup
 * Uses manual Cognito logout redirect to ensure proper post-logout redirect URI
 * @param auth - Optional auth context (kept for backward compatibility)
 */
export const handleLogout = (_auth?: {
  signoutRedirect: (args?: {
    post_logout_redirect_uri?: string;
  }) => Promise<void>;
  removeUser: () => Promise<void>;
}) => {
  // Clear local user data first
  clearUserData();

  // Clear sessionStorage OIDC data if it exists
  try {
    const oidcUserKey = Object.keys(sessionStorage).find((key) =>
      key.startsWith("oidc.user:"),
    );
    if (oidcUserKey) {
      sessionStorage.removeItem(oidcUserKey);
    }
  } catch (error) {
    // Silent error handling
  }

  // Use manual logout redirect to ensure proper configuration
  // This ensures the logout_uri is correctly set and matches Cognito's allowed sign-out URLs
  signOutRedirect();
};

/**
 * Redirects to Cognito logout endpoint
 * This method constructs the proper Cognito logout URL with all required parameters
 */
export const signOutRedirect = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const logoutUri =
    import.meta.env.VITE_LOGOUT_URI || window.location.origin + "/";
  const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

  if (cognitoDomain && clientId && logoutUri) {
    // Construct the Cognito logout URL with proper parameters
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    window.location.href = logoutUrl;
  } else {
    // If env vars are missing, just clear data and redirect to home
    const homeUrl = window.location.origin + "/";
    window.location.href = homeUrl;
  }
};
