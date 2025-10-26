# Library Management System - Standalone Frontend

This is a completely independent frontend version of the Library Management System that runs without any backend dependencies. All data is stored locally in the browser using localStorage and mock data.

## 🚀 Quick Start

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 👤 Admin Login Credentials

**Email:** `khandelwalr207@gmail.com`  
**Password:** `test1234`

## 🎯 Features

### For Students
- ✅ Browse and search books
- ✅ View detailed book information
- ✅ Request books for borrowing
- ✅ Submit reviews and ratings
- ✅ View personal borrowing history
- ✅ Receive notifications

### For Librarians
- ✅ Manage book inventory
- ✅ Add new books to the system
- ✅ Delete books
- ✅ Approve/reject book requests
- ✅ View all pending requests
- ✅ Search and filter books

### For Admins
- ✅ View all system users
- ✅ Manage librarian accounts
- ✅ Add new librarians
- ✅ View system statistics
- ✅ Access comprehensive user data

## 📚 Mock Data Included

The system comes pre-loaded with:

- **12 Books** across multiple categories (Fiction, Fantasy, Romance, Philosophy, Mystery)
- **5 Users** (1 Admin, 2 Librarians, 2 Students)
- **6 Reviews** from existing users
- **4 Book Requests** in various states
- **3 Borrowing Records** showing different scenarios
- **3 Notifications** for different user types

## 🔧 Technical Details

### Data Storage
- All data is stored in browser `localStorage`
- Data persists between browser sessions
- Users can register new accounts
- Books can be added/modified by librarians
- Reviews and requests are saved locally

### Mock Data Structure
- **Users:** Admin, librarians, and students with different roles
- **Books:** Comprehensive book catalog with ratings and availability
- **Reviews:** User-generated reviews and ratings
- **Requests:** Book borrowing requests in various states
- **Borrowings:** Active and historical borrowing records
- **Notifications:** System notifications for users

### No Backend Required
- No API calls or server dependencies
- No database setup required
- No authentication server needed
- Runs entirely in the browser

## 🎨 User Interface

The application features a modern, responsive design with:

- **Clean, intuitive navigation**
- **Role-based dashboards** (Student, Librarian, Admin)
- **Responsive design** that works on all devices
- **Toast notifications** for user feedback
- **Search and filtering** capabilities
- **Modal dialogs** for forms and confirmations

## 🧪 Testing Different Roles

### Admin Testing
1. Login with: `khandelwalr207@gmail.com` / `test1234`
2. Access admin panel to manage users and librarians
3. View system statistics

### Librarian Testing
1. Login with: `frank@example.com` / `test1234`
2. Manage book inventory
3. Process book requests

### Student Testing
1. Login with: `alice@example.com` / `test1234`
2. Browse books and submit requests
3. Write reviews and ratings

### New User Registration
1. Click "Register" on the login page
2. Create a new student account
3. Test all student features

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Books.jsx
│   │   ├── LibrarianDashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── StudentDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── mockData.js          # All mock data and helper functions
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🛠️ Built With

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **React Icons** - Icon library
- **React Toastify** - Notification system
- **Vite** - Build tool and dev server

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔄 Data Persistence

The application uses browser localStorage to persist data:

- **Books:** Stored in `localStorage.books`
- **Users:** Stored in `localStorage.users`
- **Reviews:** Stored in `localStorage.reviews`
- **Requests:** Stored in `localStorage.requests`
- **Borrowings:** Stored in `localStorage.borrowings`
- **Notifications:** Stored in `localStorage.notifications`
- **Current User:** Stored in `localStorage.currentUser`

## 🎯 Perfect For

- **Demonstrations** - Show the system without backend setup
- **Testing** - Test UI/UX without server dependencies
- **Prototyping** - Rapid prototyping and development
- **Learning** - Understand the system architecture
- **Portfolio** - Showcase the frontend capabilities

## 📋 Complete Mock Data Documentation

See `files.md` in the project root for detailed documentation of all mock data, including:
- Complete user list with credentials
- Full book catalog with descriptions
- Sample reviews and ratings
- Request and borrowing history
- System statistics

---

**Note:** This is a standalone frontend version designed for demonstration and testing purposes. All data is stored locally and will be lost if the browser's localStorage is cleared.
