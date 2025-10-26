import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch, FaEye, FaStar } from "react-icons/fa";
import { mockBooks } from "../mockData";

function Books({ user }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(mockBooks);
      localStorage.setItem("books", JSON.stringify(mockBooks));
    }
    setLoading(false);
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              📚 Library Management System
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span>Welcome, {user.name}</span>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800"
                  >
                    Admin Panel
                  </Link>
                )}
                {user.role === "librarian" && (
                  <Link
                    to="/librarian"
                    className="px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800"
                  >
                    Librarian Panel
                  </Link>
                )}
                {user.role === "student" && (
                  <Link
                    to="/student"
                    className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-900"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 border rounded-lg hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-800 rounded-lg hover:bg-gray-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Browse Books</h1>

        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by title or author..."
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
                    <FaStar className="text-yellow-500" />
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
  );
}

export default Books;
