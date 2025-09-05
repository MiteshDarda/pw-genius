import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../utils/auth";
import LogoutButton from "../../components/LogoutButton";

interface UserNomination {
  id: string;
  userId: string;
  studentName: string;
  class: string;
  exam: string;
  status: string;
  year: string;
  performance: string;
  reason: string;
  dream: string;
  remarks?: string;
  fileUploaded: boolean;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  fileMimeType?: string;
  fatherName: string;
  motherName: string;
  createdAt: string;
  updatedAt: string;
}

function AdminUserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const isAdmin = isUserAdmin();

  const [nomination, setNomination] = useState<UserNomination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/admin");
      return;
    }

    fetchUserNomination();
  }, [userId, navigate]);

  const fetchUserNomination = async () => {
    try {
      setLoading(true);
      setError(null);

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(
        `${backendUrl}/api/register/admin/user/${userId}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          navigate("/admin");
          return;
        }
        throw new Error("Failed to fetch user nomination");
      }

      const data: UserNomination = await response.json();
      setNomination(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    newStatus: "approved" | "rejected",
    remarks?: string,
  ) => {
    if (!nomination) return;

    try {
      setUpdating(true);
      setError(null);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${backendUrl}/api/register/admin/nominations/${nomination.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            remarks: remarks || "",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update nomination status");
      }

      // Refresh the nomination data
      await fetchUserNomination();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const downloadFile = async () => {
    if (!nomination?.fileUploaded) return;

    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(
        `${backendUrl}/api/register/admin/nominations/${nomination.id}/download`,
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nomination.fileName || "nomination-file";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Failed to download file");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return "✓";
      case "rejected":
        return "✕";
      case "pending":
        return "●";
      default:
        return "●";
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/admin")}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-900">
                  User Details
                </h1>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm text-gray-600">
              Loading user details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/admin")}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-900">
                  User Details
                </h1>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Error loading user details
            </h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!nomination) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/admin")}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-900">
                  User Details
                </h1>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              User not found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Redirecting to admin panel...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isStatusFinal =
    nomination.status === "approved" || nomination.status === "rejected";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/admin")}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900">User Details</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {nomination.studentName}
              </h2>
              <p className="text-gray-600">
                {nomination.class} | {nomination.exam} | {nomination.year}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(nomination.status)}`}
            >
              <span className="mr-1">{getStatusIcon(nomination.status)}</span>
              {nomination.status.charAt(0).toUpperCase() +
                nomination.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {!isStatusFinal && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleStatusUpdate("approved")}
                disabled={updating}
                className="btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Approve"}
              </button>
              <button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={updating}
                className="btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Reject"}
              </button>
            </div>
            {isStatusFinal && (
              <p className="text-sm text-gray-600 mt-2">
                Status has been finalized and cannot be changed.
              </p>
            )}
          </div>
        )}

        {/* Nomination Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nomination Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Student Information
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {nomination.studentName}
                </p>
                <p>
                  <span className="font-medium">Class:</span> {nomination.class}
                </p>
                <p>
                  <span className="font-medium">Father's Name:</span>{" "}
                  {nomination.fatherName}
                </p>
                <p>
                  <span className="font-medium">Mother's Name:</span>{" "}
                  {nomination.motherName}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Exam Information
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Exam:</span> {nomination.exam}
                </p>
                <p>
                  <span className="font-medium">Year:</span> {nomination.year}
                </p>
                <p>
                  <span className="font-medium">Performance:</span>{" "}
                  {nomination.performance}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reason and Dream */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nomination Details
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Reason for Nomination
              </h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">
                {nomination.reason}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Student's Dream
              </h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">
                {nomination.dream}
              </p>
            </div>
            {nomination.remarks && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Admin Remarks
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {nomination.remarks}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* File Information */}
        {nomination.fileUploaded && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded File
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">File:</span>{" "}
                  {nomination.fileName}
                </p>
                {nomination.fileSize && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Size:</span>{" "}
                    {(nomination.fileSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
              <button onClick={downloadFile} className="btn">
                Download File
              </button>
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Timestamps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(nomination.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(nomination.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetail;
