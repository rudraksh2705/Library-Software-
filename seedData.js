const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./Models/userModel");
const Book = require("./Models/bookModel");
const Review = require("./Models/reviewModel");
const Request = require("./Models/requestModel");

require("dotenv").config({ path: "./config.env" });

const commonPassword = "test1234";

const booksData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic American novel about the Jazz Age, love, and the American Dream.",
    price: 15.99,
    quantity: 10,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful tale of racial injustice and childhood innocence.",
    price: 12.5,
    quantity: 8,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about surveillance and government control.",
    price: 14.99,
    quantity: 15,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel about social class and relationships.",
    price: 11.99,
    quantity: 12,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A coming-of-age story about teenage rebellion and alienation.",
    price: 13.99,
    quantity: 9,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",
    description:
      "A story of boys stranded on an island and the descent into savagery.",
    price: 10.99,
    quantity: 7,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy adventure about a hobbit's journey.",
    price: 16.99,
    quantity: 14,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "An epic fantasy trilogy about Middle-earth.",
    price: 24.99,
    quantity: 10,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The first book in the Harry Potter series.",
    price: 12.99,
    quantity: 20,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    description: "A fantasy series about a magical land called Narnia.",
    price: 13.5,
    quantity: 11,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    description: "A dystopian novel about a futuristic society.",
    price: 14.99,
    quantity: 8,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    description:
      "A satirical allegory about a group of farm animals who rebel.",
    price: 10.99,
    quantity: 13,
    availability: true,
    averageRating: 0,
    totalRatings: 0,
  },
];

const usersData = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: commonPassword,
    role: "student",
    accountVerified: true,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    password: commonPassword,
    role: "student",
    accountVerified: true,
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    password: commonPassword,
    role: "student",
    accountVerified: true,
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    password: commonPassword,
    role: "student",
    accountVerified: true,
  },
  {
    name: "Emma Watson",
    email: "emma@example.com",
    password: commonPassword,
    role: "student",
    accountVerified: true,
  },
  {
    name: "Frank Miller",
    email: "frank@example.com",
    password: commonPassword,
    role: "librarian",
    accountVerified: true,
  },
  {
    name: "Grace Kelly",
    email: "grace@example.com",
    password: commonPassword,
    role: "librarian",
    accountVerified: true,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    // If using MongoDB Atlas (cloud), replace the connection string with:
    // await mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/libraryProj");

    await mongoose.connect("mongodb://127.0.0.1:27017/libraryProj", {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("MongoDB connected");

    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Book.deleteMany({});
    await Review.deleteMany({});
    await Request.deleteMany({});
    console.log("Existing data cleared");

    // Hash password
    const hashedPassword = await bcrypt.hash(commonPassword, 10);

    // Create users
    console.log("Creating users...");
    const users = [];
    for (const userData of usersData) {
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      users.push(user);
      console.log(`Created user: ${user.name} (${user.role})`);
    }

    // Create admin
    const admin = await User.create({
      name: "Rudraksh",
      email: "khandelwalr207@gmail.com",
      password: hashedPassword,
      role: "admin",
      accountVerified: true,
    });
    users.push(admin);
    console.log(`Created admin: ${admin.name}`);

    // Create books
    console.log("Creating books...");
    const books = [];
    for (const bookData of booksData) {
      const book = await Book.create(bookData);
      books.push(book);
      console.log(`Created book: ${book.title}`);
    }

    // Create reviews with ratings
    console.log("Creating reviews...");
    const studentUsers = users.filter((u) => u.role === "student");

    // Create reviews for each book
    const reviewTexts = [
      "Absolutely loved this book! Highly recommend it to everyone.",
      "A great read, couldn't put it down.",
      "Interesting story with well-developed characters.",
      "Not my favorite, but still a decent read.",
      "Amazing book! One of my all-time favorites.",
      "The plot was engaging and kept me hooked until the end.",
      "Beautiful writing style and compelling narrative.",
      "A bit slow at the beginning but gets better.",
      "Incredible world-building and character development.",
      "A classic that everyone should read at least once.",
    ];

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const reviewCount = Math.floor(Math.random() * 5) + 2; // 2-6 reviews per book
      const shuffledUsers = [...studentUsers].sort(() => Math.random() - 0.5);

      let totalRating = 0;

      for (let j = 0; j < reviewCount && j < shuffledUsers.length; j++) {
        const user = shuffledUsers[j];
        const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
        totalRating += rating;

        await Review.create({
          user: {
            id: user._id,
            name: user.name,
          },
          book: book._id,
          rating,
          comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        });
      }

      // Update book average rating
      if (reviewCount > 0) {
        book.averageRating = (totalRating / reviewCount).toFixed(1);
        book.totalRatings = reviewCount;
        await book.save();
      }

      console.log(
        `Created ${reviewCount} reviews for ${book.title} (Avg: ${book.averageRating})`
      );
    }

    // Create some pending requests
    console.log("Creating book requests...");
    for (let i = 0; i < 5; i++) {
      const student = studentUsers[i % studentUsers.length];
      const book = books[Math.floor(Math.random() * books.length)];

      await Request.create({
        user: {
          id: student._id,
          name: student.name,
          email: student.email,
        },
        book: {
          id: book._id,
          title: book.title,
        },
        status: Math.random() > 0.5 ? "pending" : "approved",
      });
      console.log(`Created request for ${book.title} by ${student.name}`);
    }

    console.log("\n=== Seeding Complete ===");
    console.log(
      `Created ${users.length} users (1 admin, ${
        users.filter((u) => u.role === "librarian").length
      } librarians, ${
        users.filter((u) => u.role === "student").length
      } students)`
    );
    console.log(`Created ${books.length} books`);
    console.log(`Created reviews with ratings`);
    console.log(`Created book requests`);
    console.log(`\nAll users have password: ${commonPassword}`);
    console.log(`Admin login: khandelwalr207@gmail.com / ${commonPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
