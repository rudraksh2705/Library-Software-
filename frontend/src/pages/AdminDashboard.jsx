import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaBook,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaUser,
  FaBars,
  FaTimes as FaTimesIcon,
} from "react-icons/fa";

function AdminDashboard({ user, setUser }) {
  const [librarians, setLibrarians] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("librarians");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddLibrarian, setShowAddLibrarian] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLibrarians();
    fetchAllUsers();
  }, []);

  const fetchLibrarians = async () => {
    try {
      const { data } = await axios.get("/users/admin/librarians");
      setLibrarians(data.data);
    } catch (error) {
      toast.error("Failed to fetch librarians");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/users/admin/all-users");
      setAllUsers(data.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleDeleteLibrarian = async (librarianId) => {
    if (!window.confirm("Are you sure you want to delete this librarian?")) {
      return;
    }

    try {
      // Note: You'll need to implement this endpoint in the backend
      toast.warning(
        "Delete librarian functionality needs to be implemented in backend"
      );
      fetchLibrarians();
    } catch (error) {
      toast.error("Failed to delete librarian");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout");
      setUser(null);
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
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
              <FaUser />
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
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
            fetchLibrarians();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/users/admin/add-librarian", formData);
      toast.success("Librarian added successfully");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add librarian");
    } finally {
      setLoading(false);
    }
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
