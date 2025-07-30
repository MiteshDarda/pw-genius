import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_A9CrqpyEH",
  client_id: "22ui8epm25gr3r2loks4tdq6n6",
  redirect_uri: "http://localhost:5173/success",
  response_type: "code",
  scope: "phone openid email",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
