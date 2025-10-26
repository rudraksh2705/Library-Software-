# Library Management System

A comprehensive library management software with three user roles: Admin, Librarian, and Student.

## Features

### For Students:

- Browse and search for books
- Request books from the library
- View book details and reviews
- Submit and rate book reviews
- Track book availability and ratings

### For Librarians:

- Add, update, and delete books from the catalog
- Manage book requests (approve/reject)
- View and manage all books
- Monitor book availability

### For Admins:

- Add new librarians to the system
- View all users and librarians
- Complete system management
- Access all features

## Tech Stack

### Backend:

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email notifications
- Bcrypt for password hashing

### Frontend:

- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Icons for icons
- React Toastify for notifications

## Setup Instructions

### Prerequisites:

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Backend Setup:

1. Navigate to the project root:

```bash
cd "c:\Users\nirma\Desktop\Library Software\Library-Software-"
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=8000
JWT_SECRET=your-secret-key-here
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/libraryProj

# Email Configuration (for verification and password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

4. Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:8000`

### Frontend Setup:

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
Library-Software-/
├── Models/
│   ├── bookModel.js         # Book schema
│   ├── borrowModel.js       # Borrow transaction schema
│   ├── requestModel.js      # Book request schema
│   ├── reviewModel.js       # Book review schema
│   └── userModel.js         # User schema
├── Controllers/
│   ├── authController.js    # Authentication & authorization
│   ├── bookController.js    # Book management
│   ├── borrowController.js  # Borrow transactions
│   ├── requestController.js # Book requests
│   └── reviewController.js  # Book reviews
├── Routes/
│   ├── bookRoutes.js        # Book routes
│   ├── borrowRoutes.js     # Borrow routes
│   ├── requestRoutes.js     # Request routes
│   ├── reviewRoutes.js      # Review routes
│   └── userRoutes.js        # User routes
├── Utils/
│   ├── appError.js          # Error handling
│   ├── catchAsync.js        # Async error wrapper
│   ├── email.js             # Email service
│   └── fineCalculator.js    # Fine calculation
├── frontend/
│   ├── src/
│   │   ├── pages/           # React pages
│   │   ├── components/      # React components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── public/              # Static assets
├── app.js                    # Express app setup
├── server.js                 # Server entry point
└── package.json              # Dependencies
```

## API Endpoints

### Authentication:

- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/verifyOtp` - Verify OTP
- `POST /api/v1/users/login` - Login
- `POST /api/v1/users/logout` - Logout
- `GET /api/v1/users/me` - Get current user

### Books:

- `GET /api/v1/books/all` - Get all books
- `GET /api/v1/books/:id` - Get book by ID
- `POST /api/v1/books/admin/add` - Add book (librarian/admin)
- `PATCH /api/v1/books/admin/update/:id` - Update book (librarian/admin)
- `DELETE /api/v1/books/admin/delete/:id` - Delete book (librarian/admin)

### Requests:

- `POST /api/v1/requests/create` - Create book request (student)
- `GET /api/v1/requests/all` - Get all requests (librarian/admin)
- `GET /api/v1/requests/my-requests` - Get my requests (student)
- `PATCH /api/v1/requests/approve/:requestId` - Approve request (librarian/admin)
- `PATCH /api/v1/requests/reject/:requestId` - Reject request (librarian/admin)
- `DELETE /api/v1/requests/cancel/:requestId` - Cancel request (student)

### Reviews:

- `POST /api/v1/reviews/create` - Create review
- `GET /api/v1/reviews/book/:bookId` - Get book reviews
- `GET /api/v1/reviews/my-reviews` - Get my reviews
- `PATCH /api/v1/reviews/update/:reviewId` - Update review
- `DELETE /api/v1/reviews/delete/:reviewId` - Delete review

### Users (Admin):

- `POST /api/v1/users/admin/add-librarian` - Add librarian
- `GET /api/v1/users/admin/librarians` - Get all librarians
- `GET /api/v1/users/admin/all-users` - Get all users

## Usage

1. **Initial Admin Setup:**

   - You'll need to manually create an admin user in MongoDB or via the registration flow.
   - After registration, you can log in as admin and add librarians.

2. **Student Registration:**

   - Students can register via the registration page.
   - They'll receive an OTP via email for verification.
   - After verification, they can log in and access the student dashboard.

3. **Librarian Management:**

   - Admin can add librarians from the admin dashboard.
   - Librarians can manage books and process student requests.

4. **Book Requests:**

   - Students can browse books and request them.
   - Librarians approve or reject requests.
   - Once approved, students can visit the library to borrow the book.

5. **Reviews:**
   - Students can review books they've read.
   - Reviews include ratings (1-5 stars) and comments.
   - Average ratings are automatically calculated.

## Default Credentials

The system starts with no users. You need to:

1. Register the first user (this will be a student by default)
2. You can modify the database to change a user's role to "admin" or "librarian"

To create an admin in MongoDB:

```javascript
use libraryProj
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin", accountVerified: true } }
)
```

## Notes

- Make sure MongoDB is running before starting the backend
- Email configuration is required for user verification
- JWT tokens expire after 1 hour
- Passwords must be 8-16 characters long
- Fine calculation: ₹0.10 per hour for late returns

## License

ISC

## Author

Library Management System
