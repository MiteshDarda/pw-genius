import React from "react";
import {
  isUserAdmin,
  isUserInGroup,
  getAllUserGroups,
  decodeJWTToken,
} from "../utils/auth";
import AdminCheck, { useAdminStatus, useGroupMembership } from "./AdminCheck";

const AdminExample: React.FC = () => {
  // Example 1: Direct function calls
  const handleDirectCheck = () => {
    try {
      const isAdmin = isUserAdmin();
      const groups = getAllUserGroups();
      const isModerator = isUserInGroup("moderator");

      alert(
        `Admin: ${isAdmin}\nGroups: ${groups.join(", ")}\nModerator: ${isModerator}`,
      );
    } catch (error) {
      alert("Error checking permissions");
    }
  };

  // Example 2: Using hooks
  const { isAdmin, userGroups, loading } = useAdminStatus();
  const { isMember: isModerator, loading: moderatorLoading } =
    useGroupMembership("moderator");

  // Example 3: Token decoding
  const handleTokenAnalysis = () => {
    try {
      const userData = localStorage.getItem("cognitoUser");
      if (userData) {
        const parsed = JSON.parse(userData);
        decodeJWTToken(parsed.access_token);
        // Token decoded successfully
      }
    } catch (error) {
      // Silent error handling
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Admin Checking Examples</h2>

      {/* Example 1: Direct function calls */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>1. Direct Function Calls</h3>
        <button
          className="btn"
          onClick={handleDirectCheck}
          style={{ marginBottom: "10px" }}
        >
          Check Admin Status
        </button>
        <button
          className="btn"
          onClick={handleTokenAnalysis}
          style={{ marginLeft: "10px" }}
        >
          Analyze Token
        </button>
      </div>

      {/* Example 2: Using hooks */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>2. Using Hooks</h3>
        {loading ? (
          <p>Loading admin status...</p>
        ) : (
          <div>
            <p>
              <strong>Admin Status:</strong>{" "}
              {isAdmin ? "✅ Admin" : "❌ Not Admin"}
            </p>
            <p>
              <strong>User Groups:</strong>{" "}
              {userGroups.length > 0 ? userGroups.join(", ") : "No groups"}
            </p>
            {moderatorLoading ? (
              <p>Loading moderator status...</p>
            ) : (
              <p>
                <strong>Moderator Status:</strong>{" "}
                {isModerator ? "✅ Moderator" : "❌ Not Moderator"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Example 3: Using AdminCheck component */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>3. Using AdminCheck Component</h3>

        <AdminCheck showGroups={true}>
          <div
            style={{
              padding: "10px",
              backgroundColor: "#e8f5e8",
              borderRadius: "5px",
            }}
          >
            <h4>🎉 Admin Content</h4>
            <p>This content is only visible to admin users.</p>
            <button
              className="btn"
              onClick={() => alert("Admin action performed!")}
            >
              Admin Action
            </button>
          </div>
        </AdminCheck>

        <AdminCheck
          fallback={
            <div
              style={{
                padding: "10px",
                backgroundColor: "#ffe8e8",
                borderRadius: "5px",
              }}
            >
              <h4>🚫 Access Denied</h4>
              <p>You need admin privileges to view this content.</p>
            </div>
          }
          showGroups={true}
        >
          <div>This content is only for admins</div>
        </AdminCheck>
      </div>

      {/* Example 4: Conditional rendering based on groups */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>4. Conditional Rendering</h3>

        {!loading && (
          <div>
            {isAdmin && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#fff3cd",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <h4>👑 Admin Panel</h4>
                <p>Welcome to the admin panel!</p>
                <button
                  className="btn"
                  onClick={() => alert("Admin panel action")}
                >
                  Manage Users
                </button>
              </div>
            )}

            {userGroups.includes("moderator") && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#d1ecf1",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <h4>🛡️ Moderator Panel</h4>
                <p>Welcome to the moderator panel!</p>
                <button
                  className="btn"
                  onClick={() => alert("Moderator action")}
                >
                  Review Content
                </button>
              </div>
            )}

            {userGroups.length === 0 && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f8d7da",
                  borderRadius: "5px",
                }}
              >
                <h4>👤 Regular User</h4>
                <p>You are a regular user with no special privileges.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Example 5: Error handling demonstration */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>5. Error Handling</h3>
        <p>All functions include comprehensive error handling:</p>
        <ul>
          <li>✅ Invalid token handling</li>
          <li>✅ Missing token handling</li>
          <li>✅ Malformed JWT handling</li>
          <li>✅ Network error handling</li>
          <li>✅ Type safety checks</li>
        </ul>
      </div>

      {/* Debug information */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
        }}
      >
        <h3>🔍 Debug Information</h3>
        <p>
          <strong>Current User Groups:</strong>{" "}
          {userGroups.join(", ") || "None"}
        </p>
        <p>
          <strong>Is Admin:</strong> {isAdmin ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Moderator:</strong> {isModerator ? "Yes" : "No"}
        </p>
        <p>
          <strong>Total Groups:</strong> {userGroups.length}
        </p>
      </div>
    </div>
  );
};

export default AdminExample;
