// Mock data for standalone frontend

export const mockUsers = {
  admin: {
    _id: "admin1",
    name: "Rudraksh",
    email: "khandelwalr207@gmail.com",
    password: "test1234",
    role: "admin",
    accountVerified: true,
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
      "A classic American novel about the Jazz Age, love, and the American Dream.",
    price: 15.99,
    quantity: 10,
    availability: true,
    averageRating: 4.5,
    totalRatings: 8,
  },
  {
    _id: "book2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful tale of racial injustice and childhood innocence.",
    price: 12.5,
    quantity: 8,
    availability: true,
    averageRating: 4.8,
    totalRatings: 12,
  },
  {
    _id: "book3",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about surveillance and government control.",
    price: 14.99,
    quantity: 15,
    availability: true,
    averageRating: 4.6,
    totalRatings: 15,
  },
  {
    _id: "book4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel about social class and relationships.",
    price: 11.99,
    quantity: 12,
    availability: true,
    averageRating: 4.3,
    totalRatings: 10,
  },
  {
    _id: "book5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A coming-of-age story about teenage rebellion and alienation.",
    price: 13.99,
    quantity: 9,
    availability: true,
    averageRating: 4.2,
    totalRatings: 7,
  },
  {
    _id: "book6",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The first book in the Harry Potter series.",
    price: 12.99,
    quantity: 20,
    availability: true,
    averageRating: 4.9,
    totalRatings: 25,
  },
  {
    _id: "book7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy adventure about a hobbit's journey.",
    price: 16.99,
    quantity: 14,
    availability: true,
    averageRating: 4.7,
    totalRatings: 18,
  },
  {
    _id: "book8",
    title: "Animal Farm",
    author: "George Orwell",
    description:
      "A satirical allegory about a group of farm animals who rebel.",
    price: 10.99,
    quantity: 13,
    availability: true,
    averageRating: 4.4,
    totalRatings: 11,
  },
];

export const mockReviews = [
  {
    _id: "review1",
    user: { id: "stud1", name: "Alice Johnson" },
    book: "book1",
    rating: 5,
    comment: "Absolutely loved this book! Highly recommend it to everyone.",
    createdAt: "2024-01-15",
  },
  {
    _id: "review2",
    user: { id: "stud2", name: "Bob Smith" },
    book: "book1",
    rating: 4,
    comment: "A great read, couldn't put it down.",
    createdAt: "2024-01-16",
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
    requestDate: "2024-01-20",
    createdAt: "2024-01-20",
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
  return mockReviews.filter((review) => review.book === bookId);
};

// Get requests
export const getRequests = () => mockRequests;

// Add a request
export const addRequest = (user, book) => {
  const newRequest = {
    _id: `req${mockRequests.length + 1}`,
    user,
    book,
    status: "pending",
    requestDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  mockRequests.push(newRequest);
  return newRequest;
};
