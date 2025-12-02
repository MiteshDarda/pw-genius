import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, validateUserSession } from "../utils/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        if (!isAuthenticated()) {
          navigate("/");
          return;
        }

        // Validate session with Cognito
        const isValidSession = await validateUserSession();
        if (!isValidSession) {
          navigate("/");
          return;
        }

        setIsValid(true);
      } catch (error) {
        navigate("/");
      } finally {
        setIsValidating(false);
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Validation check complete
  }, [isValid]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating authentication...</p>
        </div>
      </div>
    );
  }

  return isValid ? children : <>No</>;
};

export default ProtectedRoute;
