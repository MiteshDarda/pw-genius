import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storeUserData, extractUserInfo } from "../../utils/auth";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    console.log("Code:", code);
    console.log("State:", state);

    // Extract user info from URL parameters or tokens
    // This is a simplified example - you'll need to adapt based on your Cognito setup
    const userInfo = {
      userId: "user_" + Date.now(), // Replace with actual user ID from Cognito
      email: "user@example.com", // Replace with actual email from Cognito
      name: "User Name", // Replace with actual name from Cognito
      access_token: code, // This should be the actual access token
      id_token: state, // This should be the actual ID token
      refresh_token: "", // Add refresh token if available
      expires_at: Date.now() + (60 * 60 * 1000), // 1 hour from now
    };

    // Store user data in localStorage
    storeUserData(userInfo);

    // Redirect to register page
    setTimeout(() => {
      navigate('/register');
    }, 1000);

  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Authentication Successful!</h2>
        <p className="mt-2 text-gray-600">Redirecting to registration form...</p>
      </div>
    </div>
  );
}

export default SuccessPage;
