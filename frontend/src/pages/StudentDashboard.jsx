import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaBook,
  FaSignOutAlt,
  FaSearch,
  FaUser,
  FaEye,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function StudentDashboard({ user, setUser }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/books/all");
      setBooks(data.data);
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
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

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white transition-transform z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <FaBook className="text-2xl" />
              <h2 className="text-xl font-bold">Library System</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-2">
            <Link
              to="/student"
              className="flex items-center space-x-3 p-3 rounded-lg bg-blue-900"
            >
              <FaBook />
              <span>All Books</span>
            </Link>
            <button
              onClick={() => navigate("/books")}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-900"
            >
              <FaSearch />
              <span>Browse Books</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FaUser />
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-blue-300">Student</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-900"
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
            Student Dashboard
          </h1>
          <div className="w-10"></div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {book.description?.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        book.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.availability ? "Available" : "Unavailable"}
                    </span>
                    <span className="text-sm text-gray-600">
                      Qty: {book.quantity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">
                        {book.averageRating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                    <Link
                      to={`/books/${book._id}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <span>View Details</span>
                      <FaEye />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredBooks.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">No books found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
