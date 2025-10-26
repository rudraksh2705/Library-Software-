# Inserting Data to MongoDB

## Method 1: Using Node.js Seed Script (Recommended)

Run the seed script to insert all data:

```bash
npm run seed
```

This will insert:

- Users (1 admin, 2 librarians, 5 students)
- Books (12 books)
- Reviews (with ratings)
- Requests (pending and approved)

**All users password: test1234**
**Admin email: khandelwalr207@gmail.com**

---

## Method 2: Direct MongoDB Commands

If you prefer to insert data manually using MongoDB shell commands:

### Start MongoDB:

```bash
# Windows - if installed as service:
net start MongoDB

# Or start manually:
mongod
```

### Connect to MongoDB:

```bash
mongosh
```

### Use the database:

```javascript
use libraryProj
```

### Insert Users:

```javascript
db.users.insertMany([
  {
    name: "Rudraksh",
    email: "khandelwalr207@gmail.com",
    password: "$2a$10$K9wN8hQZhP9H8sX3xKxGhuV5OZH5jJ8H7K1oJ3Z9Y1xZ2H3K4L5M6",
    role: "admin",
    accountVerified: true,
    borrowedBooks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "$2a$10$K9wN8hQZhP9H8sX3xKxGhuV5OZH5jJ8H7K1oJ3Z9Y1xZ2H3K4L5M6",
    role: "student",
    accountVerified: true,
    borrowedBooks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    password: "$2a$10$K9wN8hQZhP9H8sX3xKxGhuV5OZH5jJ8H7K1oJ3Z9Y1xZ2H3K4L5M6",
    role: "student",
    accountVerified: true,
    borrowedBooks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Frank Miller",
    email: "frank@example.com",
    password: "$2a$10$K9wN8hQZhP9H8sX3xKxGhuV5OZH5jJ8H7K1oJ3Z9Y1xZ2H3K4L5M6",
    role: "librarian",
    accountVerified: true,
    borrowedBooks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Grace Kelly",
    email: "grace@example.com",
    password: "$2a$10$K9wN8hQZhP9H8sX3xKxGhuV5OZH5jJ8H7K1oJ3Z9Y1xZ2H3K4L5M6",
    role: "librarian",
    accountVerified: true,
    borrowedBooks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
```

### Insert Books:

```javascript
db.books.insertMany([
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic American novel about the Jazz Age, love, and the American Dream.",
    price: 15.99,
    quantity: 10,
    availability: true,
    averageRating: 4.5,
    totalRatings: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful tale of racial injustice and childhood innocence.",
    price: 12.5,
    quantity: 8,
    availability: true,
    averageRating: 4.8,
    totalRatings: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about surveillance and government control.",
    price: 14.99,
    quantity: 15,
    availability: true,
    averageRating: 4.6,
    totalRatings: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // ... add more books
]);
```

### Get User IDs for Reviews:

```javascript
var userIds = db.users.find({}, { _id: 1 }).toArray();
var bookIds = db.books.find({}, { _id: 1 }).toArray();
```

### Insert Reviews:

```javascript
db.reviews.insertMany([
  {
    user: {
      id: ObjectId("..."), // Replace with actual user ID
      name: "Alice Johnson",
    },
    book: ObjectId("..."), // Replace with actual book ID
    rating: 5,
    comment: "Absolutely loved this book! Highly recommend it to everyone.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: {
      id: ObjectId("..."),
      name: "Bob Smith",
    },
    book: ObjectId("..."),
    rating: 4,
    comment: "A great read, couldn't put it down.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // ... add more reviews
]);
```

### Insert Requests:

```javascript
db.requests.insertMany([
  {
    user: {
      id: ObjectId("..."), // Replace with student ID
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    book: {
      id: ObjectId("..."), // Replace with book ID
      title: "The Great Gatsby",
    },
    status: "pending",
    requestDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: {
      id: ObjectId("..."),
      name: "Bob Smith",
      email: "bob@example.com",
    },
    book: {
      id: ObjectId("..."),
      title: "1984",
    },
    status: "approved",
    requestDate: new Date(),
    approvedDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
```

---

## Method 3: Import JSON Files

You can also create JSON files and import them using `mongoimport`:

### Create books.json:

```json
[
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel about the Jazz Age, love, and the American Dream.",
    "price": 15.99,
    "quantity": 10,
    "availability": true,
    "averageRating": 4.5,
    "totalRatings": 4
  }
]
```

### Import:

```bash
mongoimport --db libraryProj --collection books --file books.json --jsonArray
```

---

## Quick Setup Instructions:

1. **Make sure MongoDB is running:**

   - Download MongoDB Community Server
   - Start the MongoDB service

2. **Run the seed script:**

   ```bash
   npm run seed
   ```

3. **Or start the application:**

   ```bash
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

---

## Verify Data:

Connect to MongoDB and check the data:

```javascript
use libraryProj

db.users.find().pretty()
db.books.find().pretty()
db.reviews.find().pretty()
db.requests.find().pretty()
```

---

## Notes:

- The password hash in the examples is for `test1234`
- Replace ObjectId("...") with actual IDs from your database
- All users have the same password: `test1234`
- Admin email: `khandelwalr207@gmail.com`
