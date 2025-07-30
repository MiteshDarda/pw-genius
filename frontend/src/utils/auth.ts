// Auth utility functions for AWS Cognito integration using AWS Amplify

import { Amplify } from "aws-amplify";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

// User data interface
export interface UserData {
  userId: string;
  email: string;
  name: string;
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_at: number;
  groups?: string[]; // Add groups to user data
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

// AWS Amplify Auth user interface
export interface AmplifyUser {
  signInUserSession: {
    accessToken: {
      payload: JWTPayload;
    };
    idToken: {
      payload: JWTPayload;
    };
  };
  username: string;
  attributes?: {
    email?: string;
    name?: string;
  };
}

// Store user data in localStorage
export const storeUserData = (userData: UserData): void => {
  try {
    localStorage.setItem("cognitoUser", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

// Get user data from localStorage
export const getUserData = (): UserData | null => {
  try {
    const userData = localStorage.getItem("cognitoUser");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  try {
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = getUserData();
    return authStatus === "true" && userData !== null;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

// Clear all user data from localStorage
export const clearUserData = (): void => {
  try {
    localStorage.removeItem("cognitoUser");
    localStorage.removeItem("isAuthenticated");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

// Decode JWT token safely
export const decodeJWTToken = (token: string): JWTPayload | null => {
  try {
    if (!token || typeof token !== "string") {
      console.warn("Invalid token provided for decoding");
      return null;
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      console.warn("Invalid JWT token format");
      return null;
    }

    // Decode the payload part (second part)
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

// Get user groups from AWS Cognito using Amplify Auth
export const getUserGroups = async (): Promise<string[]> => {
  try {
    const session = await fetchAuthSession();
    const groups = session.tokens?.accessToken?.payload["cognito:groups"];
    return Array.isArray(groups) ? (groups as string[]) : [];
  } catch (error) {
    console.error("Error getting user groups from Cognito:", error);
    return [];
  }
};

// Get user groups synchronously (fallback method)
export const getUserGroupsSync = (token?: string): string[] => {
  try {
    // If no token provided, try to get from stored user data
    if (!token) {
      const userData = getUserData();
      token = userData?.access_token;
    }

    if (!token) {
      console.warn("No token available to extract groups");
      return [];
    }

    const decoded = decodeJWTToken(token);
    if (!decoded) {
      return [];
    }

    const groups = decoded["cognito:groups"];
    return Array.isArray(groups) ? groups : [];
  } catch (error) {
    console.error("Error getting user groups:", error);
    return [];
  }
};

// Check if user belongs to admin group (async)
export const isUserAdmin = async (): Promise<boolean> => {
  try {
    const groups = await getUserGroups();
    return groups.includes("admin");
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Check if user belongs to admin group (sync fallback)
export const isUserAdminSync = (token?: string): boolean => {
  try {
    const groups = getUserGroupsSync(token);
    return groups.includes("admin");
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Check if user belongs to a specific group (async)
export const isUserInGroup = async (groupName: string): Promise<boolean> => {
  try {
    if (!groupName || typeof groupName !== "string") {
      console.warn("Invalid group name provided");
      return false;
    }

    const groups = await getUserGroups();
    return groups.includes(groupName);
  } catch (error) {
    console.error("Error checking group membership:", error);
    return false;
  }
};

// Check if user belongs to a specific group (sync fallback)
export const isUserInGroupSync = (
  groupName: string,
  token?: string,
): boolean => {
  try {
    if (!groupName || typeof groupName !== "string") {
      console.warn("Invalid group name provided");
      return false;
    }

    const groups = getUserGroupsSync(token);
    return groups.includes(groupName);
  } catch (error) {
    console.error("Error checking group membership:", error);
    return false;
  }
};

// Get all user groups as a string array (async)
export const getAllUserGroups = async (): Promise<string[]> => {
  return await getUserGroups();
};

// Get all user groups as a string array (sync fallback)
export const getAllUserGroupsSync = (token?: string): string[] => {
  return getUserGroupsSync(token);
};

// Validate user session with Cognito
export const validateUserSession = async (): Promise<boolean> => {
  try {
    const userData = getUserData();
    if (!userData || !userData.access_token) {
      return false;
    }

    // Here you would typically validate the token with Cognito
    // For now, we'll do a basic check
    const tokenExpiry = userData.expires_at;
    if (tokenExpiry && new Date().getTime() > tokenExpiry) {
      clearUserData();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating user session:", error);
    return false;
  }
};

// Extract user info from Cognito tokens
export const extractUserInfo = (user: any): UserData | null => {
  if (!user) return null;

  // Extract groups from the user object if available
  let groups: string[] = [];
  if (user.access_token) {
    groups = getUserGroupsSync(user.access_token);
  }

  return {
    userId: user.sub || user.user_id,
    email: user.email || user.profile?.email,
    name: user.name || user.profile?.name,
    access_token: user.access_token,
    id_token: user.id_token,
    refresh_token: user.refresh_token,
    expires_at: user.expires_at,
    groups, // Include groups in user data
    // Add any other user info you need
  };
};
