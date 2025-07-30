import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isUserAdmin,
  getUserEmail,
  getUserName,
  clearUserData,
} from "../../utils/auth";

// Mock data for nominations
const mockNominations = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    class: "Class 10",
    exam: "National Science Olympiad",
    status: "Pending",
    statusColor: "orange",
    statusIcon: "●",
  },
  {
    id: 2,
    studentName: "Priya Verma",
    class: "Class 12",
    exam: "National Mathematics Olympiad",
    status: "Approved",
    statusColor: "green",
    statusIcon: "✓",
  },
  {
    id: 3,
    studentName: "Rohan Kapoor",
    class: "Class 11",
    exam: "National English Olympiad",
    status: "Rejected",
    statusColor: "red",
    statusIcon: "✕",
  },
  {
    id: 4,
    studentName: "Anika Patel",
    class: "Class 9",
    exam: "National Social Studies Olympiad",
    status: "Pending",
    statusColor: "orange",
    statusIcon: "●",
  },
  {
    id: 5,
    studentName: "Vikram Singh",
    class: "Class 10",
    exam: "National Science Olympiad",
    status: "Approved",
    statusColor: "green",
    statusIcon: "✓",
  },
  {
    id: 6,
    studentName: "Divya Joshi",
    class: "Class 12",
    exam: "National Mathematics Olympiad",
    status: "Rejected",
    statusColor: "red",
    statusIcon: "✕",
  },
  {
    id: 7,
    studentName: "Arjun Mehta",
    class: "Class 11",
    exam: "National English Olympiad",
    status: "Pending",
    statusColor: "orange",
    statusIcon: "●",
  },
  {
    id: 8,
    studentName: "Ishita Reddy",
    class: "Class 9",
    exam: "National Social Studies Olympiad",
    status: "Approved",
    statusColor: "green",
    statusIcon: "✓",
  },
];

function AdminPage() {
  const navigate = useNavigate();
  const isAdmin = isUserAdmin();
  const userEmail = getUserEmail();
  const userName = getUserName();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNominations, setFilteredNominations] =
    useState(mockNominations);

  const signOutRedirect = () => {
    const clientId = "22ui8epm25gr3r2loks4tdq6n6";
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain =
      "https://ap-south-1a9crqpyeh.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const handleLogout = () => {
    clearUserData();
    signOutRedirect();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredNominations(mockNominations);
    } else {
      const filtered = mockNominations.filter((nomination) =>
        nomination.studentName.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredNominations(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIconColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "Pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Nominations</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by student name"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center">
            Class
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center">
            Nomination Category
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Status
          </button>
        </div>

        {/* Nominations List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {filteredNominations.map((nomination) => (
              <div
                key={nomination.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {nomination.studentName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {nomination.class} | Exam: {nomination.exam}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(nomination.status)}`}
                    >
                      <span
                        className={`mr-1 ${getStatusIconColor(nomination.status)}`}
                      >
                        {nomination.statusIcon}
                      </span>
                      {nomination.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredNominations.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No nominations found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? `No nominations match "${searchTerm}"`
                : "No nominations available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
