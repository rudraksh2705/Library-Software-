# Frontend Mock Mode - No Backend Needed!

## ✅ What's Changed

The frontend now works **completely standalone** with **NO backend required**!

All data is stored in **localStorage** (browser storage).

---

## 🚀 How to Run (3 Simple Steps)

### Step 1: Navigate to Frontend

```bash
cd frontend
```

### Step 2: Install Dependencies (if not done)

```bash
npm install
```

### Step 3: Start Frontend

```bash
npm run dev
```

**That's it!** Open: **http://localhost:3000**

---

## 🔑 Login Credentials

**Admin Login:**

- Email: **khandelwalr207@gmail.com**
- Password: **test1234**

**Other Test Users (Password: test1234):**

- Librarian: **frank@example.com**
- Librarian: **grace@example.com**
- Student: **alice@example.com**
- Student: **bob@example.com**
- etc.

---

## 📚 What's Included

### Mock Data:

- ✅ **8 Users**: 1 admin, 2 librarians, 5 students
- ✅ **12 Books**: With descriptions, prices, quantities
- ✅ **Reviews**: Some books have sample reviews
- ✅ **Requests**: Sample book requests

### Working Features:

- ✅ **Login/Logout** - Works with all users
- ✅ **Browse Books** - See all books
- ✅ **View Book Details** - Click any book to see details
- ✅ **Write Reviews** - Leave reviews on books
- ✅ **Request Books** - Students can request books
- ✅ **Admin Dashboard** - View librarians and users
- ✅ **Librarian Dashboard** - Manage books and requests
- ✅ **Student Dashboard** - Browse and search books
- ✅ **Add Books** (as librarian) - Add new books to catalog
- ✅ **Approve/Reject Requests** (as librarian) - Manage student requests

---

## 💾 Data Storage

All data is stored in **browser localStorage**:

- `books` - All books in the library
- `reviews` - All book reviews
- `requests` - All book requests
- `users` - Registered users
- `currentUser` - Currently logged in user

**Data persists across page refreshes!**

---

## ✨ New User Registration

You can create new student accounts:

1. Go to: http://localhost:3000/register
2. Fill in the form
3. You'll be auto-logged in as a student
4. Your account is saved to localStorage

---

## 🎯 User Roles & Access

### **Admin (khandelwalr207@gmail.com)**

- View all librarians
- View all users
- Add new librarians
- Full system access

### **Librarian (frank@example.com or grace@example.com)**

- Browse all books
- Add new books
- Delete books
- Approve/Reject book requests
- View pending requests

### **Student (any registered user)**

- Browse all books
- Search books
- View book details
- Write reviews
- Submit book requests

---

## 🔄 How It Works

1. **No Backend Required** - Everything runs in the browser
2. **localStorage** - All data stored locally
3. **Mock Authentication** - Login checks against mock user data
4. **Real Functionality** - All features work as expected

---

## 🗑️ Clear Data

To reset to default mock data, open browser console (F12) and run:

```javascript
localStorage.clear();
location.reload();
```

---

## 🎨 Features

- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Role-based dashboards
- ✅ Search functionality
- ✅ Book ratings and reviews
- ✅ Request management
- ✅ Beautiful UI with Tailwind CSS
- ✅ Toast notifications

---

## 📝 Notes

- All changes are stored in localStorage
- Data persists across browser sessions
- No database needed
- No server needed
- Fully functional demo

---

## 🚀 Quick Start

```bash
# In frontend directory
npm run dev

# Open browser
http://localhost:3000

# Login
Email: khandelwalr207@gmail.com
Password: test1234
```

**Enjoy your standalone library management system!** 📚
