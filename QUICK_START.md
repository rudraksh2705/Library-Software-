# Quick Start Guide - Fix Connection Issues

## Complete Setup in 3 Steps

### Step 1: Install & Start MongoDB

**Option A: Local MongoDB**

```bash
# Download: https://www.mongodb.com/try/download/community
# Install MongoDB Community Server
# After installation, start:
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Replace line 8 in `server.js` with your connection string

---

### Step 2: Run These Commands

Open a terminal in the project directory and run:

```bash
# Install dependencies (if not done)
npm install

# Start backend (keep this running)
npm start
```

You should see:

```
✓ MongoDB Connected Successfully
✓ Server is running on port 8000
```

If you see MongoDB connection error, run:

```bash
# On Windows:
net start MongoDB

# If that doesn't work, install MongoDB first
```

---

### Step 3: Seed Database & Start Frontend

Open a NEW terminal:

```bash
# Seed the database with test data
npm run seed

# Then start frontend
cd frontend
npm install
npm run dev
```

You should see:

```
✓ Created 8 users
✓ Created 12 books
✓ Created reviews
✓ Created requests
✓ All users have password: test1234
```

---

## Login

Open browser: **http://localhost:3000**

Login as Admin:

- Email: **khandelwalr207@gmail.com**
- Password: **test1234**

---

## Troubleshooting

### Backend won't start?

- Make sure MongoDB is running: `net start MongoDB`
- Install MongoDB if needed

### Can't connect to backend?

- Check backend is running on port 8000
- Test: http://localhost:8000/api/test

### Login doesn't work?

- Run: `npm run seed`
- Use correct email: khandelwalr207@gmail.com
- Password: test1234

### CORS errors?

- Restart both backend and frontend
- Clear browser cache

---

## All Login Credentials

**Password for ALL users: test1234**

- **Admin:** khandelwalr207@gmail.com
- **Librarian 1:** frank@example.com
- **Librarian 2:** grace@example.com
- **Student 1:** alice@example.com
- **Student 2:** bob@example.com
- **Student 3:** charlie@example.com
- **Student 4:** diana@example.com
- **Student 5:** emma@example.com

---

## What's Running?

- **Backend:** http://localhost:8000
- **Frontend:** http://localhost:3000
- **MongoDB:** mongodb://127.0.0.1:27017

**Make sure all 3 are running!**
