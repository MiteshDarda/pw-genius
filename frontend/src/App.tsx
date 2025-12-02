import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import SuccessPage from "./pages/success-page";
import LandingPage from "./pages/landing-page";
import About from "./pages/about";
import NominationGuide from "./pages/nomination-guide";
import RewardsCommunity from "./pages/rewards-community";
import Eligibility from "./pages/eligibility";
import RegistrationForm from "./pages/registration-form";
import AdminPage from "./pages/admin";
import AdminUserDetail from "./pages/admin/user-detail";
import ProtectedRoute from "./components/ProtectedRoute";
import { SnackbarProvider } from "./context/SnackbarContext";
import GlobalSnackbar from "./components/GlobalSnackbar";
import Navbar from "./components/navbar";
import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { handleLogout } from "./utils/logout";

// Define navbar configuration interface
interface NavbarConfig {
  logoSrc: string;
  navItems: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const landingPageNavbarConfig = (auth: any) => {
  return {
    logoSrc: "/pw-logo-long.png",
    navItems: [
      { label: "About", href: "/about" },
      { label: "Nomination Guide", href: "/nomination-guide" },
      { label: "Rewards & Community", href: "/rewards-community" },
      { label: "Eligibility", href: "/eligibility" },
      { label: "FAQ", href: "/#faq" },
    ],
    secondaryAction: {
      label: "Login",
      onClick: () => {
        console.log("clicked");
        auth.signinRedirect();
      },
    },
  };
};

// Navbar configurations for different routes
const getNavbarConfig = (pathname: string, auth: any): NavbarConfig | null => {
  // Check if it's an admin route (starts with /admin)
  if (pathname.startsWith("/admin")) {
    return {
      logoSrc: "/pw-logo-long.png",
      navItems: [
        { label: "Dashboard", href: "/admin" },
        { label: "Nominations", href: "/admin" },
      ],
      secondaryAction: {
        label: "Logout",
        onClick: () => {
          handleLogout(auth);
        },
      },
    };
  }

  switch (pathname) {
    case "/":
      return landingPageNavbarConfig(auth);

    case "/about":
      return landingPageNavbarConfig(auth);

    case "/nomination-guide":
      return landingPageNavbarConfig(auth);

    case "/rewards-community":
      return landingPageNavbarConfig(auth);

    case "/eligibility":
      return landingPageNavbarConfig(auth);

    case "/register":
      return {
        logoSrc: "/pw-logo-long.png",
        navItems: [],
        secondaryAction: {
          label: "Logout",
          onClick: () => {
            // Handle logout for registration form
            handleLogout(auth);
          },
        },
      };

    default:
      return null; // No navbar for other routes like login, success
  }
};

function App() {
  const location = useLocation();
  const auth = useAuth();
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | null>(null);

  useEffect(() => {
    try {
      const config = getNavbarConfig(location.pathname, auth);
      setNavbarConfig(config);
    } catch (error) {
      console.error("Error getting navbar config:", error);
      setNavbarConfig(null);
    }
  }, [location.pathname, auth]);

  return (
    <SnackbarProvider>
      <div className="plus-jakarta-sans">
        {/* Centralized Navbar */}
        {navbarConfig && <Navbar {...navbarConfig} />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/nomination-guide" element={<NominationGuide />} />
          <Route path="/rewards-community" element={<RewardsCommunity />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <RegistrationForm />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/admin/:userId"
            element={
              <ProtectedRoute>
                <AdminUserDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
        <GlobalSnackbar />
      </div>
    </SnackbarProvider>
  );
}

export default App;
