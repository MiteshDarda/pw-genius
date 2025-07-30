import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import {
  storeUserData,
  storeOIDCUserData,
  convertOIDCToUserData,
  isUserAdmin,
} from "../../utils/auth";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    // Extract OIDC user data from sessionStorage
    const oidcUserKey =
      "oidc.user:https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_A9CrqpyEH:22ui8epm25gr3r2loks4tdq6n6";
    const oidcUserData = sessionStorage.getItem(oidcUserKey);

    if (oidcUserData) {
      try {
        const parsedOidcData = JSON.parse(oidcUserData);

        // Save OIDC user data to localStorage
        storeOIDCUserData(parsedOidcData);

        // Convert to our UserData format and store
        const userData = convertOIDCToUserData(parsedOidcData);
        storeUserData(userData);

        // Check if user is admin and redirect accordingly
        const adminStatus = isUserAdmin();
        console.log(
          "User authentication successful. Admin status:",
          adminStatus,
        );

        // Redirect based on admin status
        setTimeout(() => {
          if (adminStatus) {
            navigate("/admin");
          } else {
            navigate("/register");
          }
        }, 2000);
      } catch (error) {
        console.error("Error processing OIDC user data:", error);
        // Fallback redirect
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      }
    } else {
      // Check if we have an authenticated user from react-oidc-context
      if (auth.isAuthenticated && auth.user) {
        // Extract user info from the authenticated user
        const userInfo = {
          userId: auth.user.profile.sub || `user_${Date.now()}`,
          email: auth.user.profile.email || "user@example.com",
          name:
            auth.user.profile.name ||
            auth.user.profile.preferred_username ||
            "User Name",
          access_token: auth.user.access_token || "",
          id_token: auth.user.id_token || "",
          refresh_token: auth.user.refresh_token || "",
          expires_at: auth.user.expires_at || Date.now() + 60 * 60 * 1000, // 1 hour from now
        };

        // Store user data in localStorage
        storeUserData(userInfo);

        // Check if user is admin and redirect accordingly
        const adminStatus = isUserAdmin();
        console.log(
          "User authentication successful. Admin status:",
          adminStatus,
        );

        // Redirect based on admin status
        setTimeout(() => {
          if (adminStatus) {
            navigate("/admin");
          } else {
            navigate("/register");
          }
        }, 2000);
      } else {
        // Fallback: create basic user info from URL parameters
        if (code && state) {
          const userInfo = {
            userId: `user_${Date.now()}`,
            email: "user@example.com",
            name: "User Name",
            access_token: code,
            id_token: state,
            refresh_token: "",
            expires_at: Date.now() + 60 * 60 * 1000, // 1 hour from now
          };

          storeUserData(userInfo);
          console.log("Fallback user data stored");

          // Redirect to registration for fallback users
          setTimeout(() => {
            navigate("/register");
          }, 2000);
        }
      }
    }
  }, [location.search, navigate, auth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Authentication Successful!
        </h2>
        <p className="mt-2 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default SuccessPage;
