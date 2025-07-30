import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SuccessPage from "./pages/success-page";
import LandingPage from "./pages/landing-page";
import About from "./pages/about";
import RegistrationForm from "./pages/registration-form";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { SnackbarProvider } from "./context/SnackbarContext";
import GlobalSnackbar from "./components/GlobalSnackbar";

function App() {
  return (
    <SnackbarProvider>
      <div className="plus-jakarta-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
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
        </Routes>
        <GlobalSnackbar />
      </div>
    </SnackbarProvider>
  );
}

export default App;
