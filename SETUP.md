# Setup Guide for Library Management System

This guide will help you set up and run the Library Management System on your machine.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (running on localhost:27017) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional)

## Step 1: Install Backend Dependencies

Open a terminal in the project root directory and run:

```bash
npm install
```

## Step 2: Configure Environment Variables

Create a `.env` file in the project root (you can copy from config.env.example if it exists):

```env
PORT=8000
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/libraryProj

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

**Note:** For Gmail, you need to generate an app-specific password in your Google Account settings.

## Step 3: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod

# Or if installed locally
mongod
```

## Step 4: Create Default Admin Account

Run the admin creation script:

```bash
node createAdmin.js
```

This will create an admin account with:

- Email: `admin@library.com`
- Password: `admin123`
- Role: `admin`

**IMPORTANT:** Change this password immediately after first login!

## Step 5: Start the Backend Server

```bash
npm start
```

The backend will run on `http://localhost:8000`

## Step 6: Set Up Frontend

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Step 7: Start the Frontend Server

In the frontend directory, run:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Step 8: Access the Application

Open your browser and navigate to:

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000/api/v1`

## Application URLs

Once running, you can access:

### Public Pages:

- `/` or `/books` - Browse all books (public)
- `/login` - Login page
- `/register` - Registration page

### Role-based Dashboards:

- `/student` - Student dashboard (login required, student role)
- `/librarian` - Librarian dashboard (login required, librarian/admin role)
- `/admin` - Admin dashboard (login required, admin role only)

## Creating Users

### Method 1: Registration (Default creates Student)

1. Go to `/register`
2. Fill in name, email, and password
3. You'll receive an OTP via email
4. Enter the OTP to verify your account
5. Login with your credentials

### Method 2: Create Admin (via script)

```bash
node createAdmin.js
```

### Method 3: Create Librarian (via Admin Panel)

1. Login as admin
2. Go to Admin Dashboard
3. Click "Add Librarian"
4. Fill in librarian details

## Testing the Application

### Test Student Flow:

1. Register a new student account
2. Browse books at `/books`
3. Click on a book to view details
4. Request a book (button appears if available)
5. Leave a review after reading the book

### Test Librarian Flow:

1. Login as librarian (created by admin)
2. View all books in the catalog
3. Add new books
4. Go to Requests tab
5. Approve or reject student requests

### Test Admin Flow:

1. Login as admin
2. View all librarians
3. Add new librarians
4. View all users
5. Access all system features

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is installed and running
- Check that MongoDB is running on `localhost:27017`
- Verify the connection string in your `.env` file

### Port Already in Use

- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Issues

- Ensure backend CORS settings include the frontend URL
- Check that `credentials: true` is set in axios

### Email Not Sending

- Verify SMTP settings in `.env`
- For Gmail: Enable 2FA and generate app-specific password
- Check spam folder for verification emails

### Module Not Found Errors

- Run `npm install` in both root and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Production Build

### Build Frontend for Production:

```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

### Running in Production:

```bash
# Install PM2 globally
npm install -g pm2

# Start backend with PM2
pm2 start server.js

# Start frontend (serve the dist folder)
pm2 serve frontend/dist 3000 --name frontend
```

## Default Accounts

After running `createAdmin.js`:

- **Email:** admin@library.com
- **Password:** admin123
- **Role:** Admin

**Security:** Change default passwords immediately in production!

## API Documentation

All API endpoints are prefixed with `/api/v1`

### Authentication Endpoints:

- `POST /users/register` - Register user
- `POST /users/verifyOtp` - Verify OTP
- `POST /users/login` - Login
- `POST /users/logout` - Logout

### Book Endpoints:

- `GET /books/all` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books/admin/add` - Add book (librarian/admin)

### Request Endpoints:

- `POST /requests/create` - Create request (student)
- `GET /requests/all` - Get all requests (librarian/admin)
- `PATCH /requests/approve/:id` - Approve request
- `PATCH /requests/reject/:id` - Reject request

### Review Endpoints:

- `POST /reviews/create` - Create review
- `GET /reviews/book/:bookId` - Get book reviews

## Need Help?

If you encounter any issues:

1. Check that all prerequisites are installed
2. Verify environment variables are set correctly
3. Ensure MongoDB is running
4. Check console for error messages
5. Review the README.md for more information

## Next Steps

1. Change default admin password
2. Add more books to the catalog
3. Create librarian accounts
4. Test all features with different user roles
5. Configure email settings for notifications
6. Customize the UI to match your preferences

Good luck with your Library Management System! 📚
