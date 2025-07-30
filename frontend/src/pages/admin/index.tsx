import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { clearUserData } from "../../utils/auth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAuth as useOIDCAuth } from "react-oidc-context";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Download,
  RefreshCw,
  LogOut,
} from "lucide-react";
import adminService from "../../services/adminService";
import type {
  Nomination as ApiNomination,
  NominationStats,
} from "../../services/adminService";

// Local nomination interface for sample data (will be replaced with API data)
interface LocalNomination {
  id: number;
  name: string;
  class: string;
  exam: string;
  status: "pending" | "approved" | "rejected";
}

// Sample nominations data (will be replaced with API data)
const sampleNominations: LocalNomination[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    class: "Class 10",
    exam: "National Science Olympiad",
    status: "pending",
  },
  {
    id: 2,
    name: "Priya Patel",
    class: "Class 9",
    exam: "National Mathematics Olympiad",
    status: "approved",
  },
  {
    id: 3,
    name: "Arjun Singh",
    class: "Class 11",
    exam: "National English Olympiad",
    status: "rejected",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    class: "Class 12",
    exam: "National Social Studies Olympiad",
    status: "pending",
  },
];

// Nominations interface header
const NominationsHeader: React.FC<{
  onBack?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onLogout?: () => void;
  dataLoading?: boolean;
  userName?: string;
}> = ({ onBack, onRefresh, onExport, onLogout, dataLoading, userName }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        {userName && (
          <p className="text-sm text-gray-600">Welcome, {userName}</p>
        )}
      </div>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        disabled={dataLoading}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`} />
        <span className="hidden sm:inline">Refresh</span>
      </button>

      <button
        onClick={onExport}
        disabled={dataLoading}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Export CSV</span>
      </button>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  </div>
);

// Search and filters component
const SearchAndFilters: React.FC<{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  classFilter: string;
  onClassFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  isLoading?: boolean;
}> = ({
  searchTerm,
  onSearchChange,
  classFilter,
  onClassFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  onSearch,
  onClear,
  isLoading,
}) => (
  <div className="mb-6 space-y-4">
    {/* Search Bar */}
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSearch()}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
      <button
        onClick={onClear}
        disabled={isLoading}
        className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear
      </button>
    </div>

    {/* Filters */}
    <div className="flex flex-wrap gap-4">
      <div className="relative">
        <select
          value={classFilter}
          onChange={(e) => onClassFilterChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Nomination Category</option>
          <option value="science">National Science Olympiad</option>
          <option value="mathematics">National Mathematics Olympiad</option>
          <option value="english">National English Olympiad</option>
          <option value="social">National Social Studies Olympiad</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
    </div>
  </div>
);

// Nomination card component
const NominationCard: React.FC<{
  nomination: ApiNomination | LocalNomination;
}> = ({ nomination }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return "✓";
      case "rejected":
        return "✗";
      case "pending":
      default:
        return "●";
    }
  };

  return (
    <div className="bg-white p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">
            {nomination.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {nomination.class} | Exam: {nomination.exam}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
            nomination.status,
          )}`}
        >
          <span>{getStatusIcon(nomination.status)}</span>
          <span className="capitalize">{nomination.status}</span>
        </div>
      </div>
    </div>
  );
};

// Nominations list component
const NominationsList: React.FC<{
  nominations: (ApiNomination | LocalNomination)[];
  searchTerm: string;
  classFilter: string;
  categoryFilter: string;
  statusFilter: string;
}> = ({
  nominations,
  searchTerm,
  classFilter,
  categoryFilter,
  statusFilter,
}) => {
  const filteredNominations = nominations.filter((nomination) => {
    const matchesSearch = nomination.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesClass = !classFilter || nomination.class.includes(classFilter);
    const matchesCategory =
      !categoryFilter || nomination.exam.toLowerCase().includes(categoryFilter);
    const matchesStatus = !statusFilter || nomination.status === statusFilter;

    return matchesSearch && matchesClass && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {filteredNominations.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p>No nominations found matching your criteria.</p>
        </div>
      ) : (
        filteredNominations.map((nomination) => (
          <NominationCard key={nomination.id} nomination={nomination} />
        ))
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  // API Data states
  const [nominations, setNominations] = useState<ApiNomination[]>([]);
  const [stats, setStats] = useState<NominationStats | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Component mount effect
  useEffect(() => {
    console.log("🔄 AdminDashboard component mounted");
  }, []);

  // Authentication check
  useEffect(() => {
    console.log("🔐 Admin page - checking authentication...");
    console.log("📊 Auth status:", {
      isAuthenticated: auth.isAuthenticated,
      isAdmin: auth.isAdmin,
      userGroups: auth.userGroups,
      user: auth.authUser,
    });

    if (auth.isAuthenticated === false) {
      console.log("❌ User not authenticated, redirecting to home");
      showSnackbar("Please log in to access the admin panel", "error");
      navigate("/");
      return;
    }

    if (auth.isAuthenticated && !auth.isAdmin) {
      console.log("❌ User not admin, redirecting to registration");
      showSnackbar("Access denied. Admin privileges required.", "error");
      navigate("/register");
      return;
    }

    if (auth.isAuthenticated && auth.isAdmin) {
      console.log("✅ Admin authenticated successfully");
      showSnackbar(
        `Welcome to Admin Panel, ${auth.authUser?.name || auth.authUser?.email}!`,
        "success",
      );
      setLoading(false);
    }
  }, [
    auth.isAuthenticated,
    auth.isAdmin,
    auth.authUser,
    navigate,
    showSnackbar,
  ]);

  // Fetch nominations data
  const fetchNominations = useCallback(
    async (resetPage = false, customPage?: number) => {
      try {
        setDataLoading(true);
        const currentPage = resetPage ? 1 : customPage || pagination.page;

        const response = await adminService.getAllNominations({
          search: searchTerm,
          class: classFilter,
          category: categoryFilter,
          status: statusFilter,
          page: currentPage,
          limit: pagination.limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        setNominations(response.nominations);
        setPagination(response.pagination);

        console.log("📊 Fetched nominations:", {
          count: response.nominations.length,
          total: response.pagination.total,
          page: response.pagination.page,
        });
      } catch (error) {
        console.error("Error fetching nominations:", error);
        showSnackbar("Failed to fetch nominations", "error");
      } finally {
        setDataLoading(false);
      }
    },
    [
      searchTerm,
      classFilter,
      categoryFilter,
      statusFilter,
      pagination.limit,
      showSnackbar,
    ],
  );

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await adminService.getNominationStats();
      setStats(statsData);
      console.log("📈 Fetched stats:", statsData);
    } catch (error) {
      console.error("Error fetching stats:", error);
      showSnackbar("Failed to fetch statistics", "error");
    }
  }, [showSnackbar]);

  // Handle export CSV
  const handleExportCSV = async () => {
    try {
      setDataLoading(true);
      showSnackbar("Exporting nominations...", "pending");

      const exportData = await adminService.exportNominationsCSV({
        search: searchTerm,
        class: classFilter,
        category: categoryFilter,
        status: statusFilter,
      });

      adminService.downloadCSV(exportData.data, exportData.filename);
      showSnackbar(
        `Exported ${exportData.count} nominations successfully!`,
        "success",
      );
    } catch (error) {
      console.error("Error exporting CSV:", error);
      showSnackbar("Failed to export nominations", "error");
    } finally {
      setDataLoading(false);
    }
  };

  // Handle refresh data
  const handleRefresh = () => {
    fetchNominations(true);
    fetchStats();
  };

  // Manual search function - only called on button click
  const handleSearch = () => {
    if (!loading && auth.isAuthenticated && auth.isAdmin) {
      fetchNominations(true); // Reset to first page when searching
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setClassFilter("");
    setCategoryFilter("");
    setStatusFilter("");
    setNominations([]);
    setStats(null);
  };

  // Logout function
  const oidcAuth = useOIDCAuth();
  const handleLogout = async () => {
    try {
      showSnackbar("Logging out...", "pending");
      clearUserData();
      await oidcAuth.signoutRedirect();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      showSnackbar("Logout failed", "error");
      navigate("/");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/");
  };

  // Show loading while checking authentication
  if (loading || auth.isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
            Verifying Admin Access
          </h2>
          <p className="text-gray-600 text-center">
            Please wait while we verify your admin privileges...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <NominationsHeader
          onBack={handleBack}
          onRefresh={handleRefresh}
          onExport={handleExportCSV}
          onLogout={handleLogout}
          dataLoading={dataLoading}
          userName={auth.authUser?.name || auth.authUser?.email}
        />

        {/* Stats Summary */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {stats.approved}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-red-600">
                {stats.rejected}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          classFilter={classFilter}
          onClassFilterChange={setClassFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onSearch={handleSearch}
          onClear={handleClearFilters}
          isLoading={dataLoading}
        />

        {/* Loading State */}
        {dataLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-gray-600">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading nominations...</span>
            </div>
          </div>
        )}

        {/* Nominations List */}
        <NominationsList
          nominations={nominations}
          searchTerm=""
          classFilter=""
          categoryFilter=""
          statusFilter=""
        />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newPage = pagination.page - 1;
                  fetchNominations(false, newPage);
                }}
                disabled={!pagination.hasPrev || dataLoading}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded">
                {pagination.page}
              </span>
              <button
                onClick={() => {
                  const newPage = pagination.page + 1;
                  fetchNominations(false, newPage);
                }}
                disabled={!pagination.hasNext || dataLoading}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
