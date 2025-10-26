import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar, FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { mockBooks, mockReviews, getBookReviews } from "../mockData";

function BookDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    // Load book from localStorage
    const savedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const foundBook =
      savedBooks.find((b) => b._id === id) ||
      mockBooks.find((b) => b._id === id);

    if (!foundBook) {
      toast.error("Book not found");
      navigate("/books");
      return;
    }

    setBook(foundBook);

    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const bookReviews = savedReviews.filter((r) => r.book === id);
    setReviews(bookReviews);

    setLoading(false);
  }, [id, navigate]);

  const handleRequestBook = () => {
    if (!user) {
      toast.error("Please login to request a book");
      navigate("/login");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can request books");
      return;
    }

    // Mock: Save request to localStorage
    const requests = JSON.parse(localStorage.getItem("requests") || "[]");
    requests.push({
      _id: `req${Date.now()}`,
      user: { id: user._id, name: user.name, email: user.email },
      book: { id: book._id, title: book.title },
      status: "pending",
      requestDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("requests", JSON.stringify(requests));

    toast.success("Book request submitted successfully! (mock mode)");
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      toast.error("Please select a rating between 1 and 5");
      return;
    }

    if (!reviewData.comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    // Mock: Save review to localStorage
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const newReview = {
      _id: `review${Date.now()}`,
      user: { id: user._id, name: user.name },
      book: id,
      rating: reviewData.rating,
      comment: reviewData.comment,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Update book average rating
    const bookReviews = reviews.filter((r) => r.book === id);
    const avgRating =
      bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length;

    const savedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = savedBooks.map((b) =>
      b._id === id
        ? {
            ...b,
            averageRating: avgRating.toFixed(1),
            totalRatings: bookReviews.length,
          }
        : b
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    toast.success("Review submitted successfully! (mock mode)");
    setShowReviewForm(false);
    setReviewData({ rating: 5, comment: "" });

    // Reload reviews
    setReviews(bookReviews);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/books")}
                className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded-lg"
              >
                <FaArrowLeft />
                <span>Back</span>
              </button>
              <Link to="/" className="text-2xl font-bold">
                📚 Library Management System
              </Link>
            </div>
            {user && (
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
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {book.title}
              </h1>
              <p className="text-2xl text-gray-600 mb-4">by {book.author}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-xl font-semibold">
                    {book.averageRating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-gray-600">
                    ({book.totalRatings || 0} ratings)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    book.availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.availability ? "Available" : "Unavailable"}
                </span>
                <span className="text-gray-600">Quantity: {book.quantity}</span>
              </div>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {book.description}
              </p>

              {user && user.role === "student" && book.availability && (
                <button
                  onClick={handleRequestBook}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <FaPlusCircle />
                  <span>Request This Book</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <FaPlusCircle />
                <span>Add Review</span>
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleSubmitReview}
              className="mb-8 p-6 bg-gray-50 rounded-lg"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      rating: parseInt(e.target.value),
                    })
                  }
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Write your review..."
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">
                      {review.user.name}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
