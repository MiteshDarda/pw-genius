// Auth utility functions for AWS Cognito OIDC integration

// OIDC User data interface
export interface OIDCUserData {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  profile: {
    sub: string;
    email: string;
    name?: string;
    preferred_username?: string;
    [key: string]: any;
  };
  scope: string;
  state: string;
}

// User data interface for our app
export interface UserData {
  userId: string;
  email: string;
  name: string;
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_at: number;
  groups?: string[];
}

// JWT Token payload interface
export interface JWTPayload {
  sub: string;
  email: string;
  name?: string;
  "cognito:groups"?: string[];
  exp?: number;
  iss?: string;
  aud?: string;
  [key: string]: any;
}

// Get OIDC user data from localStorage
export const getOIDCUserData = (): OIDCUserData | null => {
  try {
    const oidcData = localStorage.getItem("oidcUserData");
    return oidcData ? JSON.parse(oidcData) : null;
  } catch (error) {
    return null;
  }
};

// Store OIDC user data in localStorage
export const storeOIDCUserData = (oidcData: OIDCUserData): void => {
  try {
    localStorage.setItem("oidcUserData", JSON.stringify(oidcData));
  } catch (error) {
    // Silent error handling
  }
};

// Check if token is expired
export const isTokenExpired = (expiresAt: number): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return expiresAt <= now;
};

// Refresh token if needed
export const refreshTokenIfNeeded = async (): Promise<boolean> => {
  try {
    const oidcData = getOIDCUserData();
    if (!oidcData || !oidcData.refresh_token) {
      return false;
    }

    // Check if token is expired or will expire in the next 5 minutes
    const now = Math.floor(Date.now() / 1000);
    const fiveMinutesFromNow = now + 300;

    if (oidcData.expires_at <= fiveMinutesFromNow) {
      // Token is expired or will expire soon, need to refresh
      // For now, we'll just return false since we need to implement the actual refresh logic
      // You can implement the refresh logic here using your OIDC provider
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

// Convert OIDC user data to our UserData format
export const convertOIDCToUserData = (oidcData: OIDCUserData): UserData => {
  const groups = getUserGroupsSync(oidcData.access_token);

  return {
    userId: oidcData.profile.sub,
    email: oidcData.profile.email,
    name:
      oidcData.profile.name || oidcData.profile.preferred_username || "User",
    access_token: oidcData.access_token,
    id_token: oidcData.id_token,
    refresh_token: oidcData.refresh_token,
    expires_at: oidcData.expires_at * 1000, // Convert to milliseconds
    groups,
  };
};

// Store user data in localStorage (legacy function for compatibility)
export const storeUserData = (userData: UserData): void => {
  try {
    localStorage.setItem("cognitoUser", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  } catch (error) {
    // Silent error handling
  }
};

// Get user data from localStorage (legacy function for compatibility)
export const getUserData = (): UserData | null => {
  try {
    // First try to get from OIDC data
    const oidcData = getOIDCUserData();
    if (oidcData) {
      return convertOIDCToUserData(oidcData);
    }

    // Fallback to legacy storage
    const userData = localStorage.getItem("cognitoUser");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  try {
    const oidcData = getOIDCUserData();
    if (oidcData) {
      // Check if token is expired
      return !isTokenExpired(oidcData.expires_at);
    }

    // Fallback to legacy check
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = getUserData();
    return authStatus === "true" && userData !== null;
  } catch (error) {
    return false;
  }
};

// Clear all user data from localStorage
export const clearUserData = (): void => {
  try {
    localStorage.removeItem("oidcUserData");
    localStorage.removeItem("cognitoUser");
    localStorage.removeItem("isAuthenticated");
  } catch (error) {
    // Silent error handling
  }
};

// Decode JWT token safely
export const decodeJWTToken = (token: string): JWTPayload | null => {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return null;
    }

    // Decode the payload part (second part)
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

// Get user groups from JWT token
export const getUserGroupsSync = (token?: string): string[] => {
  try {
    // If no token provided, try to get from OIDC data
    if (!token) {
      const oidcData = getOIDCUserData();
      token = oidcData?.access_token;
    }

    if (!token) {
      return [];
    }

    const decoded = decodeJWTToken(token);
    if (!decoded) {
      return [];
    }

    const groups = decoded["cognito:groups"];
    return Array.isArray(groups) ? groups : [];
  } catch (error) {
    return [];
  }
};

// Check if user belongs to admin group
export const isUserAdmin = (): boolean => {
  try {
    const groups = getUserGroupsSync();
    return groups.includes("admin");
  } catch (error) {
    return false;
  }
};

// Check if user belongs to a specific group
export const isUserInGroup = (groupName: string): boolean => {
  try {
    if (!groupName || typeof groupName !== "string") {
      return false;
    }

    const groups = getUserGroupsSync();
    return groups.includes(groupName);
  } catch (error) {
    return false;
  }
};

// Get all user groups
export const getAllUserGroups = (): string[] => {
  return getUserGroupsSync();
};

// Get current user information
export const getCurrentUser = (): UserData | null => {
  return getUserData();
};

// Get user email
export const getUserEmail = (): string | null => {
  const userData = getUserData();
  return userData?.email || null;
};

// Get user name
export const getUserName = (): string | null => {
  const userData = getUserData();
  return userData?.name || null;
};

// Get user ID
export const getUserId = (): string | null => {
  const userData = getUserData();
  return userData?.userId || null;
};

// Validate user session
export const validateUserSession = (): boolean => {
  return isAuthenticated();
};

// Extract user info from any user object (legacy function)
export const extractUserInfo = (user: any): UserData | null => {
  if (!user) return null;

  // If it's already in our format, return it
  if (user.userId && user.email) {
    return user;
  }

  // If it's OIDC format, convert it
  if (user.profile && user.access_token) {
    return convertOIDCToUserData(user);
  }

  // Extract groups from the user object if available
  let groups: string[] = [];
  if (user.access_token) {
    groups = getUserGroupsSync(user.access_token);
  }

  return {
    userId: user.sub || user.user_id || `user_${Date.now()}`,
    email: user.email || user.profile?.email || "user@example.com",
    name: user.name || user.profile?.name || "User",
    access_token: user.access_token || "",
    id_token: user.id_token || "",
    refresh_token: user.refresh_token || "",
    expires_at: user.expires_at || Date.now() + 60 * 60 * 1000,
    groups,
  };
};
