# Complete Setup Instructions for Library Management System

## Prerequisites - Install MongoDB

### Option 1: MongoDB Community Server (Windows)

1. Download MongoDB Community Server:

   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows and download the installer

2. Install MongoDB:

   - Run the installer
   - Choose "Complete" installation
   - Select "Install MongoDB as a Service"
   - Click "Next" and then "Install"

3. Start MongoDB:
   - MongoDB will start automatically as a Windows service
   - Or manually start: Press Win+R → type `services.msc` → find "MongoDB" → Start

### Option 2: MongoDB Atlas (Cloud - No Installation Needed)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster (free tier available)
4. Get connection string
5. Update `server.js` and `seedData.js` with your connection string

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Start MongoDB

### If MongoDB is installed locally:

```bash
# MongoDB should already be running as a service
# To check, run:
sc query MongoDB

# To start manually if stopped:
net start MongoDB
```

### If using MongoDB Atlas:

- No need to start anything
- Just update connection strings in server.js and seedData.js

---

## Step 3: Seed the Database

Run the seed script to populate your database:

```bash
npm run seed
```

**Expected Output:**

```
MongoDB connected
Clearing existing data...
Existing data cleared
Creating users...
Created user: Alice Johnson (student)
Created user: Bob Smith (student)
Created user: Charlie Brown (student)
Created user: Diana Prince (student)
Created user: Emma Watson (student)
Created user: Frank Miller (librarian)
Created user: Grace Kelly (librarian)
Created admin: Rudraksh
Creating books...
Created book: The Great Gatsby
Created book: To Kill a Mockingbird
... (12 books total)
Creating reviews...
... (reviews with ratings)
Creating book requests...
... (requests)

=== Seeding Complete ===
Created 8 users (1 admin, 2 librarians, 5 students)
Created 12 books
Created reviews with ratings
Created book requests

All users have password: test1234
Admin login: khandelwalr207@gmail.com / test1234
```

---

## Step 4: Start the Backend Server

```bash
npm start
```

Backend will run on: `http://localhost:8000`

---

## Step 5: Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:3000`

---

## Login Credentials

### Admin:

- **Email:** khandelwalr207@gmail.com
- **Password:** test1234
- **Role:** Admin
- **Access:** http://localhost:3000/admin

### Librarians:

- **frank@example.com** / test1234
- **grace@example.com** / test1234
- **Access:** http://localhost:3000/librarian

### Students:

- **alice@example.com** / test1234
- **bob@example.com** / test1234
- **charlie@example.com** / test1234
- **diana@example.com** / test1234
- **emma@example.com** / test1234
- **Access:** http://localhost:3000/student

**All passwords are: test1234**

---

## Troubleshooting

### MongoDB Connection Error:

**Error:** `ECONNREFUSED 127.0.0.1:27017`

**Solutions:**

1. Install MongoDB Community Server (see Option 1 above)
2. Start MongoDB service: `net start MongoDB`
3. Or use MongoDB Atlas (cloud)

### Port Already in Use:

- Backend: Change port in `config.env` (PORT=8001)
- Frontend: Change port in `vite.config.js` (port: 3001)

### Cannot find module error:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Verify Database Data

To check if data was inserted correctly:

### Option 1: Using MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Navigate to `libraryProj` database

### Option 2: Using MongoDB Shell

```bash
mongosh
use libraryProj
db.users.count()
db.books.count()
db.reviews.count()
db.requests.count()
```

---

## Data That Will Be Inserted

### Users (8 total):

- 1 Admin: Rudraksh
- 2 Librarians: Frank Miller, Grace Kelly
- 5 Students: Alice, Bob, Charlie, Diana, Emma

### Books (12 total):

- The Great Gatsby
- To Kill a Mockingbird
- 1984
- Pride and Prejudice
- The Catcher in the Rye
- Lord of the Flies
- The Hobbit
- The Lord of the Rings
- Harry Potter and the Philosopher's Stone
- The Chronicles of Narnia
- Brave New World
- Animal Farm

### Reviews:

- Each book has 2-6 reviews
- Ratings range from 3-5 stars
- Random comments from students

### Requests:

- 5 book requests (mix of pending and approved)

---

## Quick Commands Summary

```bash
# Install MongoDB (if not installed)
# Download from: https://www.mongodb.com/try/download/community

# Install dependencies
npm install

# Seed database (run this first!)
npm run seed

# Start backend
npm start

# Start frontend (in new terminal)
cd frontend
npm install
npm run dev
```

---

## Next Steps

1. ✅ Install MongoDB
2. ✅ Run `npm run seed` to populate database
3. ✅ Start backend: `npm start`
4. ✅ Start frontend: `cd frontend && npm run dev`
5. ✅ Access: http://localhost:3000
6. ✅ Login: khandelwalr207@gmail.com / test1234

Enjoy your Library Management System! 📚
