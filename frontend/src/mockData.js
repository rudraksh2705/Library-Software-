// Mock data for standalone frontend

export const mockUsers = {
  admin: {
    _id: "admin1",
    name: "Rudraksh Khandelwal",
    email: "khandelwalr207@gmail.com",
    password: "test1234",
    role: "admin",
    accountVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  librarian1: {
    _id: "lib1",
    name: "Frank Miller",
    email: "frank@example.com",
    password: "test1234",
    role: "librarian",
    accountVerified: true,
  },
  librarian2: {
    _id: "lib2",
    name: "Grace Kelly",
    email: "grace@example.com",
    password: "test1234",
    role: "librarian",
    accountVerified: true,
  },
  students: [
    {
      _id: "stud1",
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "test1234",
      role: "student",
      accountVerified: true,
    },
    {
      _id: "stud2",
      name: "Bob Smith",
      email: "bob@example.com",
      password: "test1234",
      role: "student",
      accountVerified: true,
    },
  ],
};

export const mockBooks = [
  {
    _id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic American novel about the Jazz Age, love, and the American Dream. Set in the summer of 1922, the story follows the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    price: 15.99,
    quantity: 10,
    availability: true,
    averageRating: 4.5,
    totalRatings: 8,
    category: "Fiction",
    isbn: "978-0-7432-7356-5",
    publishedYear: 1925,
  },
  {
    _id: "book2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful tale of racial injustice and childhood innocence. Through the eyes of Scout Finch, we witness her father's courageous defense of a black man falsely accused of rape.",
    price: 12.5,
    quantity: 8,
    availability: true,
    averageRating: 4.8,
    totalRatings: 12,
    category: "Fiction",
    isbn: "978-0-06-112008-4",
    publishedYear: 1960,
  },
  {
    _id: "book3",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about surveillance and government control. Winston Smith lives in a world where Big Brother watches everything and independent thought is a crime.",
    price: 14.99,
    quantity: 15,
    availability: true,
    averageRating: 4.6,
    totalRatings: 15,
    category: "Fiction",
    isbn: "978-0-452-28423-4",
    publishedYear: 1949,
  },
  {
    _id: "book4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel about social class and relationships. Elizabeth Bennet navigates the complexities of love, marriage, and social expectations in Regency England.",
    price: 11.99,
    quantity: 12,
    availability: true,
    averageRating: 4.3,
    totalRatings: 10,
    category: "Romance",
    isbn: "978-0-14-143951-8",
    publishedYear: 1813,
  },
  {
    _id: "book5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A coming-of-age story about teenage rebellion and alienation. Holden Caulfield's journey through New York City reveals the struggles of adolescence and the search for meaning.",
    price: 13.99,
    quantity: 9,
    availability: true,
    averageRating: 4.2,
    totalRatings: 7,
    category: "Fiction",
    isbn: "978-0-316-76948-0",
    publishedYear: 1951,
  },
  {
    _id: "book6",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The first book in the Harry Potter series. Follow Harry as he discovers he's a wizard and begins his magical education at Hogwarts School of Witchcraft and Wizardry.",
    price: 12.99,
    quantity: 20,
    availability: true,
    averageRating: 4.9,
    totalRatings: 25,
    category: "Fantasy",
    isbn: "978-0-7475-3269-9",
    publishedYear: 1997,
  },
  {
    _id: "book7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy adventure about a hobbit's journey. Bilbo Baggins joins a group of dwarves on an epic quest to reclaim their homeland from the dragon Smaug.",
    price: 16.99,
    quantity: 14,
    availability: true,
    averageRating: 4.7,
    totalRatings: 18,
    category: "Fantasy",
    isbn: "978-0-547-92822-7",
    publishedYear: 1937,
  },
  {
    _id: "book8",
    title: "Animal Farm",
    author: "George Orwell",
    description:
      "A satirical allegory about a group of farm animals who rebel against their human farmer, hoping to create a society where animals can be equal, free, and happy.",
    price: 10.99,
    quantity: 13,
    availability: true,
    averageRating: 4.4,
    totalRatings: 11,
    category: "Fiction",
    isbn: "978-0-452-28424-1",
    publishedYear: 1945,
  },
  {
    _id: "book9",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "An epic fantasy trilogy about the quest to destroy the One Ring and defeat the Dark Lord Sauron. A masterpiece of world-building and adventure.",
    price: 24.99,
    quantity: 6,
    availability: true,
    averageRating: 4.8,
    totalRatings: 30,
    category: "Fantasy",
    isbn: "978-0-547-92822-7",
    publishedYear: 1954,
  },
  {
    _id: "book10",
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    description: "A series of fantasy novels about children who discover the magical world of Narnia, where they have adventures and learn important life lessons.",
    price: 18.99,
    quantity: 11,
    availability: true,
    averageRating: 4.6,
    totalRatings: 22,
    category: "Fantasy",
    isbn: "978-0-06-440537-9",
    publishedYear: 1950,
  },
  {
    _id: "book11",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical novel about a young Andalusian shepherd who travels from Spain to Egypt in search of treasure and discovers the importance of following one's dreams.",
    price: 13.99,
    quantity: 7,
    availability: false,
    averageRating: 4.1,
    totalRatings: 9,
    category: "Philosophy",
    isbn: "978-0-06-112008-4",
    publishedYear: 1988,
  },
  {
    _id: "book12",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description: "A mystery thriller that follows symbologist Robert Langdon as he investigates a murder in the Louvre Museum and uncovers a conspiracy involving the Catholic Church.",
    price: 15.99,
    quantity: 5,
    availability: true,
    averageRating: 3.9,
    totalRatings: 16,
    category: "Mystery",
    isbn: "978-0-307-26595-4",
    publishedYear: 2003,
  },
];

export const mockReviews = [
  {
    _id: "review1",
    user: { id: "stud1", name: "Alice Johnson" },
    book: "book1",
    rating: 5,
    comment: "Absolutely loved this book! The writing is beautiful and the story is timeless. Highly recommend it to everyone.",
    createdAt: "2024-01-15T10:30:00.000Z",
  },
  {
    _id: "review2",
    user: { id: "stud2", name: "Bob Smith" },
    book: "book1",
    rating: 4,
    comment: "A great read, couldn't put it down. The characters are well-developed and the plot is engaging.",
    createdAt: "2024-01-16T14:20:00.000Z",
  },
  {
    _id: "review3",
    user: { id: "stud1", name: "Alice Johnson" },
    book: "book2",
    rating: 5,
    comment: "This book changed my perspective on many things. Harper Lee's writing is powerful and moving.",
    createdAt: "2024-01-18T09:15:00.000Z",
  },
  {
    _id: "review4",
    user: { id: "stud2", name: "Bob Smith" },
    book: "book3",
    rating: 5,
    comment: "Scary how relevant this book still is today. Orwell was truly ahead of his time.",
    createdAt: "2024-01-20T16:45:00.000Z",
  },
  {
    _id: "review5",
    user: { id: "stud1", name: "Alice Johnson" },
    book: "book6",
    rating: 5,
    comment: "The magic of Harry Potter never gets old. Perfect for readers of all ages!",
    createdAt: "2024-01-22T11:30:00.000Z",
  },
  {
    _id: "review6",
    user: { id: "stud2", name: "Bob Smith" },
    book: "book7",
    rating: 4,
    comment: "Tolkien's world-building is incredible. A must-read for fantasy lovers.",
    createdAt: "2024-01-25T13:20:00.000Z",
  },
];

export const mockRequests = [
  {
    _id: "req1",
    user: {
      id: "stud1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    book: {
      id: "book1",
      title: "The Great Gatsby",
    },
    status: "pending",
    requestDate: "2024-01-20T10:00:00.000Z",
    createdAt: "2024-01-20T10:00:00.000Z",
  },
  {
    _id: "req2",
    user: {
      id: "stud2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    book: {
      id: "book3",
      title: "1984",
    },
    status: "approved",
    requestDate: "2024-01-18T14:30:00.000Z",
    createdAt: "2024-01-18T14:30:00.000Z",
    approvedAt: "2024-01-19T09:00:00.000Z",
  },
  {
    _id: "req3",
    user: {
      id: "stud1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    book: {
      id: "book6",
      title: "Harry Potter and the Philosopher's Stone",
    },
    status: "pending",
    requestDate: "2024-01-25T11:15:00.000Z",
    createdAt: "2024-01-25T11:15:00.000Z",
  },
  {
    _id: "req4",
    user: {
      id: "stud2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    book: {
      id: "book11",
      title: "The Alchemist",
    },
    status: "rejected",
    requestDate: "2024-01-22T16:45:00.000Z",
    createdAt: "2024-01-22T16:45:00.000Z",
    rejectedAt: "2024-01-23T10:30:00.000Z",
    rejectionReason: "Book is currently unavailable",
  },
];

// Mock borrowings/loans data
export const mockBorrowings = [
  {
    _id: "borrow1",
    user: { id: "stud1", name: "Alice Johnson", email: "alice@example.com" },
    book: { id: "book2", title: "To Kill a Mockingbird", author: "Harper Lee" },
    borrowDate: "2024-01-15T10:00:00.000Z",
    dueDate: "2024-02-15T10:00:00.000Z",
    returnDate: null,
    status: "borrowed",
    fine: 0,
  },
  {
    _id: "borrow2",
    user: { id: "stud2", name: "Bob Smith", email: "bob@example.com" },
    book: { id: "book4", title: "Pride and Prejudice", author: "Jane Austen" },
    borrowDate: "2024-01-10T14:30:00.000Z",
    dueDate: "2024-02-10T14:30:00.000Z",
    returnDate: "2024-02-08T16:00:00.000Z",
    status: "returned",
    fine: 0,
  },
  {
    _id: "borrow3",
    user: { id: "stud1", name: "Alice Johnson", email: "alice@example.com" },
    book: { id: "book8", title: "Animal Farm", author: "George Orwell" },
    borrowDate: "2024-01-05T09:15:00.000Z",
    dueDate: "2024-02-05T09:15:00.000Z",
    returnDate: null,
    status: "overdue",
    fine: 5.50,
  },
];

// Mock notifications data
export const mockNotifications = [
  {
    _id: "notif1",
    user: "stud1",
    title: "Book Request Approved",
    message: "Your request for 'The Great Gatsby' has been approved!",
    type: "success",
    read: false,
    createdAt: "2024-01-20T10:30:00.000Z",
  },
  {
    _id: "notif2",
    user: "stud2",
    title: "Book Due Soon",
    message: "Your book 'Pride and Prejudice' is due in 3 days.",
    type: "warning",
    read: false,
    createdAt: "2024-01-22T14:00:00.000Z",
  },
  {
    _id: "notif3",
    user: "stud1",
    title: "Overdue Book",
    message: "Your book 'Animal Farm' is overdue. Please return it soon.",
    type: "error",
    read: true,
    createdAt: "2024-01-25T09:00:00.000Z",
  },
];

// Get all librarians for admin
export const getAllLibrarians = () => [
  mockUsers.librarian1,
  mockUsers.librarian2,
];

// Get all users for admin
export const getAllUsers = () => [
  mockUsers.admin,
  ...getAllLibrarians(),
  ...mockUsers.students,
];

// Find user by email
export const findUserByEmail = (email) => {
  // First check localStorage for registered users
  const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const localUser = savedUsers.find((user) => user.email === email);
  if (localUser) return localUser;

  // Then check mock users
  const allUsers = [
    mockUsers.admin,
    ...getAllLibrarians(),
    ...mockUsers.students,
  ];
  return allUsers.find((user) => user.email === email);
};

// Get reviews for a book
export const getBookReviews = (bookId) => {
  const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  const mockReviewsData = savedReviews.length > 0 ? savedReviews : mockReviews;
  return mockReviewsData.filter((review) => review.book === bookId);
};

// Get requests
export const getRequests = () => {
  const savedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
  return savedRequests.length > 0 ? savedRequests : mockRequests;
};

// Add a request
export const addRequest = (user, book) => {
  const newRequest = {
    _id: `req${Date.now()}`,
    user,
    book,
    status: "pending",
    requestDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  
  // Update localStorage
  const requests = JSON.parse(localStorage.getItem("requests") || "[]");
  requests.push(newRequest);
  localStorage.setItem("requests", JSON.stringify(requests));
  
  return newRequest;
};

// Get borrowings for a user
export const getUserBorrowings = (userId) => {
  const savedBorrowings = JSON.parse(localStorage.getItem("borrowings") || "[]");
  const mockBorrowingsData = savedBorrowings.length > 0 ? savedBorrowings : mockBorrowings;
  return mockBorrowingsData.filter((borrowing) => borrowing.user.id === userId);
};

// Get notifications for a user
export const getUserNotifications = (userId) => {
  const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
  const mockNotificationsData = savedNotifications.length > 0 ? savedNotifications : mockNotifications;
  return mockNotificationsData.filter((notif) => notif.user === userId);
};

// Add a notification
export const addNotification = (userId, title, message, type = "info") => {
  const newNotification = {
    _id: `notif${Date.now()}`,
    user: userId,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
  };
  
  const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
  notifications.push(newNotification);
  localStorage.setItem("notifications", JSON.stringify(notifications));
  
  return newNotification;
};

// Get book statistics
export const getBookStats = () => {
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  const mockBooksData = books.length > 0 ? books : mockBooks;
  
  return {
    totalBooks: mockBooksData.length,
    availableBooks: mockBooksData.filter(book => book.availability).length,
    unavailableBooks: mockBooksData.filter(book => !book.availability).length,
    totalQuantity: mockBooksData.reduce((sum, book) => sum + book.quantity, 0),
    categories: [...new Set(mockBooksData.map(book => book.category))],
  };
};

// Get user statistics
export const getUserStats = () => {
  const allUsers = getAllUsers();
  const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const totalUsers = allUsers.length + savedUsers.length;
  
  return {
    totalUsers,
    students: allUsers.filter(user => user.role === "student").length + savedUsers.length,
    librarians: allUsers.filter(user => user.role === "librarian").length,
    admins: allUsers.filter(user => user.role === "admin").length,
  };
};
