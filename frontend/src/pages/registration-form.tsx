import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  getUserData,
  isUserAdmin,
  isUserInGroup,
  getAllUserGroups,
  decodeJWTToken,
} from "../utils/auth";
import { useSnackbar } from "../hooks/useSnackbar";
import apiClient from "../utils/api";

// Available class options for the registration form
const classes = ["6", "7", "8", "9", "10", "11", "12"];

// Generate year options for the last 10 years (2024 to 2015)
const years = Array.from({ length: 10 }, (_, i) => `${2024 - i}`);

// Interface for the registration form data
interface RegistrationFormData {
  studentName: string;
  class: string;
  fatherName: string;
  motherName: string;
  examName: string;
  performance: string;
  year: string;
  reason: string;
  dream: string;
  remarks: string;
  file: File | null;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const userData = getUserData();

  // Form state management using useState hook
  // Initialize all form fields as empty strings or null
  const [form, setForm] = useState<RegistrationFormData>({
    studentName: "",
    class: "",
    fatherName: "",
    motherName: "",
    examName: "",
    performance: "",
    year: "",
    reason: "",
    dream: "",
    remarks: "",
    file: null,
  });

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Global Snackbar hook
  const { showSnackbar } = useSnackbar();

  // State for user registration status
  const [userRegistrationStatus, setUserRegistrationStatus] = useState<{
    hasRegistered: boolean;
    status?: string;
    data?: any;
    loading: boolean;
  }>({
    hasRegistered: false,
    loading: true,
  });

  // State for admin status
  const [isAdmin, setIsAdmin] = useState(false);

  /**
   * Check user groups and admin status using the new auth utilities
   */
  const checkAdminStatus = async () => {
    try {
      // Get user data from localStorage
      const userData = getUserData();

      // Check if user is admin (async)
      const isUserAdminStatus = await isUserAdmin();

      // Get all user groups (async)
      const allUserGroups = await getAllUserGroups();

      // Check specific group memberships (async)
      const isModerator = await isUserInGroup("moderator");
      const isEditor = await isUserInGroup("editor");
      const isUser = await isUserInGroup("user");

      // Check admin status and update state
      if (isUserAdminStatus) {
        setIsAdmin(true);
        showSnackbar(
          "Welcome Admin! Redirecting to admin dashboard...",
          "success",
        );

        // Redirect admin users to admin page after a short delay
        navigate("/admin");
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      // Silent error handling
    }
  };

  /**
   * Check user registration status
   */
  const checkUserRegistration = async () => {
    try {
      const response = await apiClient.get(
        `/api/register/check/${userData?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setUserRegistrationStatus({
        hasRegistered: response.data.hasRegistered,
        status: response.data.status,
        data: response.data.data,
        loading: false,
      });

      if (response.data.hasRegistered) {
        const statusType =
          response.data.status === "approved"
            ? "success"
            : response.data.status === "rejected"
              ? "error"
              : "pending";

        showSnackbar(
          `You have already registered. Current status: ${response.data.status}`,
          statusType,
        );
      }
    } catch (error) {
      // Silent error handling
      setUserRegistrationStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  /**
   * Handle input changes for text inputs, selects, and textareas
   * Updates the form state with the new value for the specified field
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle file upload changes
   * Updates the form state with the selected file
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files ? e.target.files[0] : null,
    }));
  };

  /**
   * Handle form submission
   * Creates FormData, sends it to the backend using axios, and handles the response
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("userId", userData?.userId || "");
      formData.append("studentName", form.studentName);
      formData.append("class", form.class);
      formData.append("fatherName", form.fatherName);
      formData.append("motherName", form.motherName);
      formData.append("examName", form.examName);
      formData.append("performance", form.performance);
      formData.append("year", form.year);
      formData.append("reason", form.reason);
      formData.append("dream", form.dream);
      formData.append("remarks", form.remarks);

      // Append file if selected
      if (form.file) {
        formData.append("file", form.file);
      }

      // Send registration data to backend using apiClient
      const response = await apiClient.post(`/api/register`, formData, {
        headers: {
          // Let axios set the correct Content-Type for FormData
          "Content-Type": "multipart/form-data",
        },
        // Add timeout to prevent hanging requests
        timeout: 30000, // 30 seconds
      });

      // Handle successful submission
      if (response.status === 200 || response.status === 201) {
        showSnackbar(
          "Registration submitted successfully! Your nomination has been received and is now under review.",
          "pending",
        );
        // TODO: Consider redirecting to a success page or clearing the form
        // navigate("/success");
      }
    } catch (error: any) {
      // Silent error handling

      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          const errorMessage =
            error.response.data?.message || "Registration failed";
          showSnackbar(`Error: ${errorMessage}`, "error");
        } else if (error.request) {
          // Request was made but no response received
          showSnackbar(
            "Network error. Please check your connection and try again.",
            "error",
          );
        } else {
          // Something else happened
          showSnackbar(
            "An unexpected error occurred. Please try again.",
            "error",
          );
        }
      } else {
        // Non-axios error
        showSnackbar("Error submitting registration", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Check user registration status and admin status on component mount
   */
  useEffect(() => {
    // Check admin status and user groups
    checkAdminStatus();

    // Check registration status if user data is available
    if (userData?.userId) {
      checkUserRegistration();
    }

    // Additional group checking
    const checkAllGroups = async () => {
      const allGroups = await getAllUserGroups();

      // Check for common group names
      const commonGroups = [
        "admin",
        "moderator",
        "editor",
        "user",
        "student",
        "teacher",
        "parent",
      ];

      for (const group of commonGroups) {
        await isUserInGroup(group);
      }
    };

    checkAllGroups();
  }, [userData?.userId]);

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
        <main className="max-w-5xl mx-auto pt-28 pb-12 px-4">
          {/* Page Header with Status */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-800">
                Nomination Profile
              </h1>
              {isAdmin && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  👑 Admin
                </div>
              )}
            </div>
            <p className="text-gray-600 mb-6">
              View your nomination details for the PW Excellence awards.
            </p>

            {/* Status Section */}
            {userRegistrationStatus.loading ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-700 font-medium">
                    Checking registration status...
                  </span>
                </div>
              </div>
            ) : userRegistrationStatus.hasRegistered ? (
              <div
                className="rounded-lg p-6 max-w-md border-l-4"
                style={{
                  backgroundColor:
                    userRegistrationStatus.status === "approved"
                      ? "#E8FFE4"
                      : userRegistrationStatus.status === "rejected"
                        ? "#FDD5D3"
                        : "#FFE9D9",
                  borderLeftColor:
                    userRegistrationStatus.status === "approved"
                      ? "#0FA650"
                      : userRegistrationStatus.status === "rejected"
                        ? "#DA0909"
                        : "#DF6812",
                }}
              >
                <div className="text-sm font-semibold text-gray-800 mb-1">
                  Current Status
                </div>
                <div
                  className="text-xl font-bold mb-2"
                  style={{
                    color:
                      userRegistrationStatus.status === "approved"
                        ? "#0FA650"
                        : userRegistrationStatus.status === "rejected"
                          ? "#DA0909"
                          : "#DF6812",
                  }}
                >
                  {userRegistrationStatus.status === "approved"
                    ? "Approved"
                    : userRegistrationStatus.status === "rejected"
                      ? "Rejected"
                      : "Pending"}
                </div>
                {userRegistrationStatus.status === "rejected" && (
                  <p className="text-sm text-gray-700 mt-2">
                    Thank you for your interest. After careful review, we won't
                    be moving forward with your profile at this time. We
                    appreciate your effort and encourage you to apply again in
                    the future.
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md">
                <div className="text-sm font-semibold text-gray-800 mb-1">
                  Current Status
                </div>
                <div className="text-xl font-bold text-gray-600">
                  Not Registered
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  You haven't submitted a nomination yet.
                </p>
              </div>
            )}
          </div>

          {/* Registration Form Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <form
              onSubmit={handleSubmit}
              className={`flex-1 bg-white rounded-xl shadow p-8 flex flex-col gap-4 ${
                userRegistrationStatus.hasRegistered
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <h1 className="text-2xl font-bold mb-4">Nomination Form</h1>

              {/* Student Name Field */}
              <label className="text-sm font-medium">
                Student Name
                <input
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* Class Selection Field */}
              <label className="text-sm font-medium">
                Class
                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                >
                  <option value="">Select your class</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              {/* Father's Name Field */}
              <label className="text-sm font-medium">
                Father's Name
                <input
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  placeholder="Enter your father's name"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* Mother's Name Field */}
              <label className="text-sm font-medium">
                Mother's Name
                <input
                  name="motherName"
                  value={form.motherName}
                  onChange={handleChange}
                  placeholder="Enter your mother's name"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* Exam Name Field */}
              <label className="text-sm font-medium">
                Exam Name for Nomination
                <input
                  name="examName"
                  value={form.examName}
                  onChange={handleChange}
                  placeholder="Enter the name of the exam"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* Performance/Rank Field */}
              <label className="text-sm font-medium">
                Performance/Rank in Exam
                <input
                  name="performance"
                  value={form.performance}
                  onChange={handleChange}
                  placeholder="Enter your performance or rank"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* Year Selection Field */}
              <label className="text-sm font-medium">
                Exam Qualification Year
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                >
                  <option value="">Select the year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>

              {/* Reason for Nomination Field */}
              <label className="text-sm font-medium">
                Why you want to Nominate yourself for PW
                <input
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="In one line, tell us why"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* Dream Profession Field */}
              <label className="text-sm font-medium">
                Dream Profession
                <input
                  name="dream"
                  value={form.dream}
                  onChange={handleChange}
                  placeholder="What do you aspire to be?"
                  className="mt-1 w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                  required
                />
              </label>

              {/* File Upload Field */}
              <label className="text-sm font-medium">
                Exam Report Card
                <span className="block text-xs text-gray-500 mb-1">
                  Please upload a ZIP file not exceeding 25 MB in size
                </span>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="w-full h-14 rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none"
                />
              </label>

              {/* Remarks Field */}
              <label className="text-sm font-medium">
                Any Remarks
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Any remarks"
                  className="mt-1 w-full rounded-[12px] p-[15px] bg-[#F0F2F5] border border-[#D4E3DE] text-[#637387] focus:outline-none min-h-[60px]"
                />
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 relative overflow-hidden ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-white rounded-lg px-4 py-3"
                    : "btn"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
                {isSubmitting && (
                  <div
                    className="absolute bottom-0 left-0 h-1 animate-pulse"
                    style={{ width: "100%" }}
                  ></div>
                )}
              </button>
            </form>

            {/* Instructions Section */}
            <aside className="w-full md:w-96 bg-yellow-50 border border-yellow-200 rounded-xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-2 text-yellow-700 font-semibold">
                <span className="text-xl">⚠️</span> Instructions
              </div>
              <ul className="text-xs text-gray-700 list-disc pl-5 space-y-2">
                <li>
                  PLEASE FILL UP THE BELOW PROVIDED FORM TO SUGGEST OLYMPIADS
                  EXAM FOR INCLUDING IN CHAMP ELIGIBILITY CRITERIA WHICH IS
                  CONDUCTING AT DISTRICT, STATE, NATIONAL & INTERNATIONAL LEVEL.
                </li>
                <li>
                  KINDLY FILL UP THE BELOW PROVIDED FORM IN SINGLE ENTRY ONLY
                  (IF YOU ARE SUGGESTING MORE THAN ONE EXAM YOU HAVE TO MAKE A
                  NEW ENTRY).
                </li>
                <li>
                  FILL UP ALL THE MANDATORY DETAILS PROPERLY & MENTION REMARKS
                  IF ANY
                </li>
                <li>
                  IF YOU ARE UPLOADING A DOCUMENT (SAMPLE CERTIFICATE) MAKE SURE
                  THE SIZE OF DOCUMENT SHOULD BE UPTO 1MB (JPG) ONLY
                </li>
                <li>
                  FOR ANY QUERY KINDLY CONTACT 0744-2750333 (10 AM TO 7 PM) OR
                  WRITE US AT : INFO@ALLENCHAMP.COM
                </li>
              </ul>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default RegistrationForm;
