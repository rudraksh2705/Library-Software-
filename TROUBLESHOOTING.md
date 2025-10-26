# Troubleshooting Guide - Connection & Login Issues

## Problem 1: Frontend Can't Connect to Backend

### Symptoms:

- "Network Error" in browser console
- Cannot fetch data from backend
- Login button doesn't work

### Solutions:

#### Step 1: Check if Backend is Running

```bash
# In the project root directory
npm start
```

You should see:

```
✓ MongoDB Connected Successfully
✓ Server is running on port 8000
✓ API: http://localhost:8000/api/v1
```

#### Step 2: Test Backend Connection

Open browser and go to: http://localhost:8000/api/test

You should see:

```json
{
  "message": "Backend is working!",
  "status": "success"
}
```

#### Step 3: Check Frontend Configuration

Make sure frontend is running on port 3000 (the vite.config.js proxy expects this).

#### Step 4: Check Browser Console

Open browser DevTools (F12) → Console tab
Look for errors like:

- `CORS policy blocked`
- `Network request failed`
- `connection refused`

---

## Problem 2: Admin Login Not Working

### Symptoms:

- Can't login with admin credentials
- "Invalid email or password" error
- Login button does nothing

### Solutions:

#### Step 1: Seed the Database

First, make sure MongoDB is running, then:

```bash
npm run seed
```

This creates:

- Admin: khandelwalr207@gmail.com / test1234
- All other users with password: test1234

#### Step 2: Verify Database Has Data

Connect to MongoDB and check:

```javascript
mongosh
use libraryProj
db.users.find({ role: "admin" })
```

You should see admin user with email: khandelwalr207@gmail.com

#### Step 3: Try Login

- Email: khandelwalr207@gmail.com
- Password: test1234

---

## Problem 3: MongoDB Connection Error

### Error Message:

```
ECONNREFUSED 127.0.0.1:27017
MongoDB Connection Error
```

### Solutions:

#### Option 1: Install MongoDB (Local)

1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start the service:
   ```bash
   net start MongoDB
   ```

#### Option 2: Use MongoDB Atlas (Cloud - No Installation)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster
4. Get connection string
5. Update `server.js` line 8:
   ```javascript
   mongoose.connect("your-atlas-connection-string");
   ```

---

## Problem 4: CORS Errors

### Error Message:

```
Access to XMLHttpRequest blocked by CORS policy
```

### Solution:

The CORS is already configured in `app.js`. If you still get errors:

1. Check that backend is running on port 8000
2. Check that frontend is running on port 3000
3. Clear browser cache and cookies
4. Try hard refresh (Ctrl + Shift + R)

---

## Problem 5: "Cannot GET /" or Routes Not Working

### Symptoms:

- Page shows "Cannot GET /"
- Routes return 404

### Solution:

1. Make sure you're accessing the correct URL
2. Backend should be: http://localhost:8000
3. Frontend should be: http://localhost:3000
4. Use frontend URL for the app, not backend URL

---

## Complete Setup Checklist

### ✓ Step 1: Install MongoDB

```bash
# Download from: https://www.mongodb.com/try/download/community
# After installation, start it:
net start MongoDB
```

### ✓ Step 2: Seed Database

```bash
npm run seed
```

### ✓ Step 3: Start Backend

```bash
npm start
```

Expected output:

```
✓ MongoDB Connected Successfully
✓ Server is running on port 8000
✓ API: http://localhost:8000/api/v1
```

### ✓ Step 4: Start Frontend (New Terminal)

```bash
cd frontend
npm install  # if not done already
npm run dev
```

Expected output:

```
  VITE ready in XXX ms
  ➜  Local:   http://localhost:3000/
```

### ✓ Step 5: Login

Open: http://localhost:3000/login

- Email: khandelwalr207@gmail.com
- Password: test1234

---

## Debug Commands

### Check if Backend is Running:

```bash
curl http://localhost:8000/api/test
```

### Check if Frontend is Running:

```bash
# Should be accessible at http://localhost:3000
```

### Check MongoDB Connection:

```bash
mongosh
use libraryProj
show collections
db.users.count()
```

### Check Database Has Data:

```bash
mongosh
use libraryProj
db.users.find().pretty()
db.books.find().pretty()
```

---

## Common Issues & Quick Fixes

| Issue               | Quick Fix                         |
| ------------------- | --------------------------------- |
| Backend won't start | Check MongoDB is running          |
| Login doesn't work  | Run `npm run seed`                |
| CORS errors         | Restart both frontend and backend |
| Port already in use | Change port in config.env         |
| Module not found    | Run `npm install`                 |

---

## Need More Help?

1. Check browser console for errors (F12)
2. Check backend terminal for errors
3. Make sure MongoDB is running
4. Verify all dependencies are installed
5. Try restarting everything

---

## Test Credentials

All test accounts use password: **test1234**

- Admin: khandelwalr207@gmail.com
- Librarian: frank@example.com
- Librarian: grace@example.com
- Student: alice@example.com
- Student: bob@example.com
- Student: charlie@example.com
- Student: diana@example.com
- Student: emma@example.com
