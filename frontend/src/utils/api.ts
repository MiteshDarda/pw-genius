import axios from "axios";

// Create axios instance with default configuration for ngrok
const apiClient = axios.create({
  headers: {
    "ngrok-skip-browser-warning": "any",
    Accept: "application/json",
  },
});

// Add request interceptor to add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("cognitoUser") || "{}");

    if (userData?.access_token) {
      config.headers.Authorization = `Bearer ${userData.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("cognitoUser");
      localStorage.removeItem("oidcUserData");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
