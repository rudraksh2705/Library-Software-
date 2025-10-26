# How to Run the Library Management System

## Option 1: Standalone Frontend (Recommended - No Backend Needed!)

### Quick Start:

```bash
cd frontend
npm install
npm run dev
```

### Open Browser:

http://localhost:3000

### Login as Admin:

- Email: khandelwalr207@gmail.com
- Password: test1234

### Done! 🎉

**All data is stored in browser localStorage. No database or backend needed!**

---

## Option 2: Full Stack (Backend + Frontend)

If you want to use with MongoDB backend:

### Step 1: Install MongoDB

Download from: https://www.mongodb.com/try/download/community

### Step 2: Start Backend

```bash
npm start
```

### Step 3: Seed Database

```bash
npm run seed
```

### Step 4: Start Frontend

```bash
cd frontend
npm run dev
```

---

## Login Credentials

**All users have password: test1234**

- Admin: khandelwalr207@gmail.com
- Librarian: frank@example.com
- Librarian: grace@example.com
- Student: alice@example.com
- Student: bob@example.com
- Student: charlie@example.com
- Student: diana@example.com
- Student: emma@example.com

---

## Features Available

### As Admin:

- View all librarians
- View all users
- Add new librarians

### As Librarian:

- Add/Edit/Delete books
- View book requests
- Approve/Reject requests

### As Student:

- Browse books
- Search books
- Request books
- Write reviews

---

## No MongoDB? No Problem!

Use **Option 1** - It works completely standalone with fake data!

All features work exactly the same, just stored in browser localStorage instead of a database.

---

## Troubleshooting

### Port 3000 already in use?

```bash
# Change port in vite.config.js
port: 3001
```

### Nothing showing up?

- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

### Need help?

Check `STANDALONE_FRONTEND.md` or `MOCK_MODE_README.md`
