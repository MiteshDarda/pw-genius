import React, { useEffect, useState } from "react";
import { isUserAdmin, isUserInGroup, getAllUserGroups } from "../utils/auth";

interface AdminCheckProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  showGroups?: boolean;
}

const AdminCheck: React.FC<AdminCheckProps> = ({
  children,
  fallback = <div>Access Denied: Admin privileges required</div>,
  showGroups = false,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is admin
        const adminStatus = isUserAdmin();
        setIsAdmin(adminStatus);

        // Get all user groups
        const groups = getAllUserGroups();
        setUserGroups(groups);
      } catch (err) {
        setError("Failed to check admin status");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        {fallback}
        {showGroups && userGroups.length > 0 && (
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
            Your groups: {userGroups.join(", ")}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {children}
      {showGroups && (
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
          Admin groups: {userGroups.join(", ")}
        </div>
      )}
    </div>
  );
};

// Hook for checking admin status
export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      try {
        const adminStatus = isUserAdmin();
        const groups = getAllUserGroups();

        setIsAdmin(adminStatus);
        setUserGroups(groups);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  return { isAdmin, userGroups, loading };
};

// Hook for checking specific group membership
export const useGroupMembership = (groupName: string) => {
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMembership = () => {
      try {
        const membership = isUserInGroup(groupName);
        setIsMember(membership);
      } catch (error) {
        setIsMember(false);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, [groupName]);

  return { isMember, loading };
};

export default AdminCheck;
