import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute";

// Mock authentication (no backend needed)
import { mockBooks, mockReviews, mockRequests } from "./mockData";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mock data in localStorage if not present
    if (!localStorage.getItem("books")) {
      localStorage.setItem("books", JSON.stringify(mockBooks));
    }

    if (!localStorage.getItem("reviews")) {
      localStorage.setItem("reviews", JSON.stringify(mockReviews));
    }

    if (!localStorage.getItem("requests")) {
      localStorage.setItem("requests", JSON.stringify(mockRequests));
    }

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute user={user}>
              <StudentDashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/librarian"
          element={
            <ProtectedRoute user={user} allowedRoles={["librarian", "admin"]}>
              <LibrarianDashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <AdminDashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route path="/books" element={<Books user={user} />} />

        <Route path="/books/:id" element={<BookDetails user={user} />} />

        <Route path="/" element={<Navigate to="/books" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
