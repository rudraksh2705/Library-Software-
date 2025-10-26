# Fix Frontend & Backend Connection Issues

## The Problem

- Backend shows: "MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017"
- Frontend can't fetch data from backend
- Login doesn't work

## Root Cause

**MongoDB is not installed or not running on your system.**

---

## Solution (Choose One)

### Option 1: Install MongoDB Locally (Recommended for Testing)

1. **Download & Install MongoDB:**

   - Go to: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Install it
   - Choose "Complete" installation
   - **IMPORTANT:** Check "Install MongoDB as a Service"

2. **Start MongoDB:**

   ```powershell
   net start MongoDB
   ```

3. **Verify MongoDB is running:**

   ```powershell
   mongosh --version
   ```

   You should see version info. If you see "not recognized", restart your terminal.

4. **Now run the seed script:**

   ```powershell
   npm run seed
   ```

5. **Start backend:**

   ```powershell
   npm start
   ```

   You should see:

   ```
   ✓ MongoDB Connected Successfully
   ✓ Server is running on port 8000
   ```

6. **In a new terminal, start frontend:**

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

7. **Login:**
   - Open: http://localhost:3000
   - Email: khandelwalr207@gmail.com
   - Password: test1234

---

### Option 2: Use MongoDB Atlas (Cloud - No Installation Needed)

1. **Create MongoDB Atlas Account:**

   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with email

2. **Create a Free Cluster:**

   - Click "Build a Database"
   - Select "M0 Free" (Free tier)
   - Choose a cloud provider & region
   - Click "Create"

3. **Create Database User:**

   - Go to Database Access
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin`
   - Password: Generate secure password or choose your own
   - Click "Add User"

4. **Whitelist IP Address:**

   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your IP)
   - Click "Confirm"

5. **Get Connection String:**

   - Go to Database
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Example: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update server.js and seedData.js:**

   **In server.js (line 8):**

   ```javascript
   mongoose.connect("YOUR_ATLAS_CONNECTION_STRING", {
     serverSelectionTimeoutMS: 5000,
   });
   ```

   **In seedData.js (line 197):**

   ```javascript
   await mongoose.connect("YOUR_ATLAS_CONNECTION_STRING", {
     serverSelectionTimeoutMS: 5000,
   });
   ```

   Replace `YOUR_ATLAS_CONNECTION_STRING` with the string from step 5, and replace `<password>` with your database user password.

7. **Run seed script:**

   ```powershell
   npm run seed
   ```

8. **Start backend:**

   ```powershell
   npm start
   ```

9. **Start frontend:**

   ```powershell
   cd frontend
   npm run dev
   ```

10. **Login:**
    - Open: http://localhost:3000
    - Email: khandelwalr207@gmail.com
    - Password: test1234

---

## Quick Checklist

Before running the app, verify:

- [ ] MongoDB is installed AND running (Option 1)
- [ ] OR MongoDB Atlas connection string is configured (Option 2)
- [ ] Ran `npm run seed` successfully
- [ ] Backend shows "✓ MongoDB Connected Successfully"
- [ ] Frontend is running on http://localhost:3000
- [ ] Backend is running on http://localhost:8000

---

## Test Commands

### Test Backend:

```powershell
# Check if backend is running
curl http://localhost:8000/api/test
```

Should return:

```json
{
  "message": "Backend is working!",
  "status": "success"
}
```

### Test MongoDB Connection:

```powershell
mongosh
use libraryProj
show collections
```

---

## Common Errors & Fixes

| Error                          | Solution                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB not running. Run `net start MongoDB` or use MongoDB Atlas |
| `Module not found`             | Run `npm install` in both root and frontend directory             |
| `Port 8000 already in use`     | Change port in config.env to 8001                                 |
| `CORS error`                   | Already fixed with `origin: true` in app.js                       |
| `Login fails`                  | Run `npm run seed` to create users                                |

---

## Default Credentials

**All users password: test1234**

- **Admin:** khandelwalr207@gmail.com
- **Librarian 1:** frank@example.com
- **Librarian 2:** grace@example.com
- **Student 1:** alice@example.com
- **Student 2:** bob@example.com
- **Student 3:** charlie@example.com
- **Student 4:** diana@example.com
- **Student 5:** emma@example.com

---

## Summary

**The issue is simple:** MongoDB needs to be running for the backend to connect.

**Fix:**

1. Install MongoDB locally OR set up MongoDB Atlas
2. Run `npm run seed` to populate database
3. Run `npm start` to start backend
4. Run `cd frontend && npm run dev` to start frontend
5. Open http://localhost:3000 and login

---

## Need Help?

1. Check backend terminal for error messages
2. Check browser console (F12) for errors
3. Verify MongoDB is running: `sc query MongoDB`
4. Check if ports 8000 and 3000 are available
