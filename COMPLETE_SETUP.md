# Complete Setup Guide - Works on Any Device

## Current Issues Fixed:

✅ CORS configured to allow all origins
✅ Backend configured with better error handling  
✅ Test route added to verify backend
✅ Vite proxy configured properly
✅ Environment variables set up

---

## Step-by-Step Setup (Works on ANY Device)

### Step 1: Install MongoDB (Required)

**Option A: Local MongoDB (Recommended)**

```powershell
# Download from: https://www.mongodb.com/try/download/community
# Install MongoDB Community Server
# During installation, check "Install MongoDB as a Service"
# Then:
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud - Easier)**

- Go to: https://www.mongodb.com/cloud/atlas
- Sign up (free)
- Create free cluster
- Copy connection string
- Update `server.js` and `seedData.js` with your connection string

---

### Step 2: Install Node Dependencies

```powershell
# In the project root
npm install

# In frontend directory
cd frontend
npm install
cd ..
```

---

### Step 3: Seed the Database

```powershell
npm run seed
```

Expected output:

```
✓ MongoDB Connected Successfully
Clearing existing data...
Creating users...
Created admin: Rudraksh
... (all users created)
Creating books...
... (12 books created)
Creating reviews...
... (reviews created)
✓ Seeding Complete
All users have password: test1234
Admin login: khandelwalr207@gmail.com / test1234
```

---

### Step 4: Start Backend Server

```powershell
npm start
```

Expected output:

```
✓ MongoDB Connected Successfully
✓ Server is running on port 8000
✓ API: http://localhost:8000/api/v1
```

**If you see MongoDB error**, MongoDB is not running. Install it first (Step 1).

---

### Step 5: Start Frontend (New Terminal)

```powershell
cd frontend
npm run dev
```

Expected output:

```
  VITE ready in XXX ms
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

---

### Step 6: Access the Application

Open browser: **http://localhost:3000**

---

### Step 7: Login as Admin

- Email: **khandelwalr207@gmail.com**
- Password: **test1234**

You'll be redirected to: http://localhost:3000/admin

---

## Verify Everything Works

### Test Backend:

```powershell
# Open in browser or terminal:
curl http://localhost:8000/api/test

# Should return:
# {"message":"Backend is working!","status":"success"}
```

### Test Frontend:

- Open: http://localhost:3000
- Should show the book listing page

### Test Login:

1. Go to: http://localhost:3000/login
2. Enter: khandelwalr207@gmail.com / test1234
3. Should redirect to admin dashboard

---

## Login Credentials

**All passwords are: test1234**

### Admin:

- khandelwalr207@gmail.com

### Librarians:

- frank@example.com
- grace@example.com

### Students:

- alice@example.com
- bob@example.com
- charlie@example.com
- diana@example.com
- emma@example.com

---

## Features Available

### As Admin:

- View all librarians
- View all users
- Add new librarians
- Full system access

### As Librarian:

- Add/Edit/Delete books
- Approve/Reject book requests
- View all requests
- Manage inventory

### As Student:

- Browse all books
- Request books
- Write reviews
- View book ratings

---

## Troubleshooting

### "MongoDB Connection Error"

**Fix:** Install MongoDB or use MongoDB Atlas

### "Cannot connect to backend"

**Fix:**

1. Check backend is running: `curl http://localhost:8000/api/test`
2. Check frontend is running: http://localhost:3000
3. Clear browser cache (Ctrl+Shift+Delete)

### "Login doesn't work"

**Fix:**

1. Run `npm run seed` to create users
2. Use correct email: khandelwalr207@gmail.com
3. Use correct password: test1234

### "CORS Error"

**Fix:** Already fixed! Just restart backend and frontend

### "Port already in use"

**Fix:**

- Change backend port in `config.env` (PORT=8001)
- Change frontend port in `vite.config.js` (port: 3001)
- Update all references

---

## Running on Different Devices

### On the Same Device:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### On Network:

- Frontend: http://your-ip:3000
- Backend: http://your-ip:8000

### On Mobile (Same Network):

- Frontend: http://your-computer-ip:3000
- Use ifconfig/ipconfig to find your IP

---

## File Changes Made

1. **app.js** - CORS set to allow all origins
2. **server.js** - Better error handling for MongoDB
3. **vite.config.js** - Proxy configured for API calls
4. **config.env** - Environment variables set up
5. **Added test route** - `/api/test` to verify backend

---

## Next Steps

1. ✓ Follow Step 1-7 above
2. ✓ Login with admin credentials
3. ✓ Test adding a librarian
4. ✓ Test adding a book (as librarian)
5. ✓ Test requesting a book (as student)
6. ✓ Test writing a review

---

## Support

If still having issues:

1. Check MongoDB is running: `sc query MongoDB`
2. Check backend terminal for errors
3. Check browser console (F12) for errors
4. Verify ports 3000 and 8000 are not blocked

Good luck! 🚀
