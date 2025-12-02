// Login.js

import { useAuth } from "react-oidc-context";
import { handleLogout } from "../../utils/logout";

function Login() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button className="btn" onClick={() => handleLogout(auth)}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="btn" onClick={() => auth.signinRedirect()}>
        Sign in
      </button>
      <button className="btn" onClick={() => handleLogout(auth)}>
        Sign out
      </button>
    </div>
  );
}

export default Login;
