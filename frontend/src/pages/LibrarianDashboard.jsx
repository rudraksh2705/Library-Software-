import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBook,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCheck,
  FaTimes,
  FaUser,
  FaBars,
  FaTimes as FaTimesIcon,
} from "react-icons/fa";
import { mockBooks, mockRequests } from "../mockData";

function LibrarianDashboard({ user, setUser }) {
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("books");
  const [showAddBook, setShowAddBook] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(mockBooks);
      localStorage.setItem("books", JSON.stringify(mockBooks));
    }

    // Load requests from localStorage
    const savedRequests = localStorage.getItem("requests");
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      setRequests(mockRequests);
      localStorage.setItem("requests", JSON.stringify(mockRequests));
    }

    setLoading(false);
  }, []);

  const handleApproveRequest = (requestId) => {
    const updatedRequests = requests.map((req) =>
      req._id === requestId ? { ...req, status: "approved" } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    toast.success("Request approved successfully!");
  };

  const handleRejectRequest = (requestId) => {
    const updatedRequests = requests.map((req) =>
      req._id === requestId ? { ...req, status: "rejected" } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    toast.success("Request rejected successfully!");
  };

  const handleDeleteBook = (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
    const updatedBooks = books.filter((book) => book._id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    toast.success("Book deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRequests = requests.filter((req) => req.status === "pending");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white transition-transform z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <FaBook className="text-2xl" />
              <h2 className="text-xl font-bold">Librarian</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <FaTimesIcon />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab("books");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "books" ? "bg-green-900" : "hover:bg-green-900"
              }`}
            >
              <FaBook />
              <span>Books</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("requests");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "requests" ? "bg-green-900" : "hover:bg-green-900"
              }`}
            >
              <FaUser />
              <span>
                Requests{" "}
                {pendingRequests.length > 0 && (
                  <span className="bg-red-500 px-2 py-1 rounded-full text-xs">
                    {pendingRequests.length}
                  </span>
                )}
              </span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-green-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <FaUser />
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-green-300">Librarian</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-green-900"
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
            Librarian Dashboard
          </h1>
          {activeTab === "books" && (
            <button
              onClick={() => setShowAddBook(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <FaPlus />
              <span>Add Book</span>
            </button>
          )}
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === "books" && (
            <>
              <div className="mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
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
            </>
          )}

          {activeTab === "requests" && (
            <div className="space-y-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No pending requests</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {request.book.title}
                        </h3>
                        <p className="text-gray-600">
                          Requested by: {request.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Email: {request.user.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date:{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveRequest(request._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                        >
                          <FaCheck />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                        >
                          <FaTimes />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddBook && (
        <AddBookModal
          onClose={() => setShowAddBook(false)}
          onSuccess={() => {
            // Reload books from localStorage
            const savedBooks = localStorage.getItem("books");
            if (savedBooks) {
              setBooks(JSON.parse(savedBooks));
            }
            setShowAddBook(false);
          }}
        />
      )}
    </div>
  );
}

// Add Book Modal Component
function AddBookModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock: Create new book
    const newBook = {
      _id: `book${Date.now()}`,
      title: formData.title,
      author: formData.author,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      availability: parseInt(formData.quantity) > 0,
      averageRating: 0,
      totalRatings: 0,
    };

    // Save to localStorage
    const savedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    savedBooks.push(newBook);
    localStorage.setItem("books", JSON.stringify(savedBooks));

    toast.success("Book added successfully (mock mode)");
    setTimeout(() => {
      onSuccess();
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LibrarianDashboard;
