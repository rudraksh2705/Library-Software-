import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBook,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaUser,
  FaBars,
  FaTimes as FaTimesIcon,
  FaChartBar,
  FaUsers,
  FaBookOpen,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  getAllLibrarians,
  getAllUsers,
  getBookStats,
  getUserStats,
  mockBooks,
  mockRequests,
  mockBorrowings,
} from "../mockData";

function AdminDashboard({ user, setUser }) {
  const [librarians, setLibrarians] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddLibrarian, setShowAddLibrarian] = useState(false);
  const [bookStats, setBookStats] = useState({});
  const [userStats, setUserStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load mock data
    setLibrarians(getAllLibrarians());
    setAllUsers(getAllUsers());
    setBookStats(getBookStats());
    setUserStats(getUserStats());
  }, []);

  const handleDeleteLibrarian = (librarianId) => {
    if (!window.confirm("Are you sure you want to delete this librarian?")) {
      return;
    }
    toast.warning("In mock mode, delete not implemented");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-purple-800 text-white transition-transform z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <FaBook className="text-2xl" />
              <h2 className="text-xl font-bold">Admin Panel</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <FaTimesIcon />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-purple-900"
                  : "hover:bg-purple-900"
              }`}
            >
              <FaChartBar />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("librarians")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "librarians"
                  ? "bg-purple-900"
                  : "hover:bg-purple-900"
              }`}
            >
              <FaUser />
              <span>Librarians</span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "users" ? "bg-purple-900" : "hover:bg-purple-900"
              }`}
            >
              <FaUsers />
              <span>All Users</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <FaUser />
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-purple-300">Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-900"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <FaBars className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === "dashboard"
              ? "Dashboard Overview"
              : activeTab === "librarians"
              ? "Manage Librarians"
              : activeTab === "users"
              ? "All Users"
              : "Admin Dashboard"}
          </h1>
          {activeTab === "librarians" && (
            <button
              onClick={() => setShowAddLibrarian(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <FaPlus />
              <span>Add Librarian</span>
            </button>
          )}
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaBookOpen className="text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Books
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {bookStats.totalBooks}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FaCheckCircle className="text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Available Books
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {bookStats.availableBooks}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                      <FaUsers className="text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userStats.totalUsers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                      <FaClock className="text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Pending Requests
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          mockRequests.filter((req) => req.status === "pending")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Books by Category */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Books by Category
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={
                          bookStats.categories?.map((category) => ({
                            name: category,
                            value: mockBooks.filter(
                              (book) => book.category === category
                            ).length,
                          })) || []
                        }
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bookStats.categories?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#8884d8",
                                "#82ca9d",
                                "#ffc658",
                                "#ff7300",
                                "#00ff00",
                              ][index % 5]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* User Distribution */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    User Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        {
                          name: "Students",
                          value: userStats.students,
                          color: "#3b82f6",
                        },
                        {
                          name: "Librarians",
                          value: userStats.librarians,
                          color: "#10b981",
                        },
                        {
                          name: "Admins",
                          value: userStats.admins,
                          color: "#8b5cf6",
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Request Status Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Book Request Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      {
                        name: "Pending",
                        value: mockRequests.filter(
                          (req) => req.status === "pending"
                        ).length,
                        color: "#f59e0b",
                      },
                      {
                        name: "Approved",
                        value: mockRequests.filter(
                          (req) => req.status === "approved"
                        ).length,
                        color: "#10b981",
                      },
                      {
                        name: "Rejected",
                        value: mockRequests.filter(
                          (req) => req.status === "rejected"
                        ).length,
                        color: "#ef4444",
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Book Requests
                  </h3>
                  <div className="space-y-3">
                    {mockRequests.slice(0, 5).map((request) => (
                      <div
                        key={request._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {request.book.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            by {request.user.name}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Top Rated Books
                  </h3>
                  <div className="space-y-3">
                    {mockBooks
                      .sort(
                        (a, b) =>
                          (b.averageRating || 0) - (a.averageRating || 0)
                      )
                      .slice(0, 5)
                      .map((book) => (
                        <div
                          key={book._id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {book.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              by {book.author}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-semibold">
                              {book.averageRating?.toFixed(1) || "0.0"}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* System Overview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  System Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {bookStats.totalQuantity}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Book Copies
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {
                        mockBorrowings.filter(
                          (borrow) => borrow.status === "borrowed"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      Books Currently Borrowed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {
                        mockBorrowings.filter(
                          (borrow) => borrow.status === "overdue"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">Overdue Books</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "librarians" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {librarians.map((lib) => (
                    <tr key={lib._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lib.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lib.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {lib.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteLibrarian(lib._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allUsers.map((usr) => (
                    <tr key={usr._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {usr.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {usr.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            usr.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : usr.role === "librarian"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {usr.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(usr.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Librarian Modal */}
      {showAddLibrarian && (
        <AddLibrarianModal
          onClose={() => setShowAddLibrarian(false)}
          onSuccess={() => {
            setShowAddLibrarian(false);
            setLibrarians(getAllLibrarians());
          }}
        />
      )}
    </div>
  );
}

// Add Librarian Modal Component
function AddLibrarianModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock: just show success message
    toast.success("Librarian added successfully (mock mode)");
    setTimeout(() => {
      onSuccess();
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add Librarian</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            minLength={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {loading ? "Adding..." : "Add Librarian"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
