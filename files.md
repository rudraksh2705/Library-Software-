# Library Management System - Mock Data Documentation

This document contains all the mock data used in the standalone frontend version of the Library Management System.

## Admin User Credentials

**Email:** khandelwalr207@gmail.com  
**Password:** test1234  
**Role:** Admin  
**Name:** Rudraksh Khandelwal

## Mock Users

### Admin
- **ID:** admin1
- **Name:** Rudraksh Khandelwal
- **Email:** khandelwalr207@gmail.com
- **Password:** test1234
- **Role:** admin
- **Status:** Verified

### Librarians
1. **Frank Miller**
   - Email: frank@example.com
   - Password: test1234
   - Role: librarian

2. **Grace Kelly**
   - Email: grace@example.com
   - Password: test1234
   - Role: librarian

### Students
1. **Alice Johnson**
   - Email: alice@example.com
   - Password: test1234
   - Role: student

2. **Bob Smith**
   - Email: bob@example.com
   - Password: test1234
   - Role: student

## Mock Books (12 Books)

### Fiction
1. **The Great Gatsby** by F. Scott Fitzgerald
   - Price: $15.99
   - Quantity: 10
   - Rating: 4.5/5 (8 reviews)
   - ISBN: 978-0-7432-7356-5
   - Published: 1925

2. **To Kill a Mockingbird** by Harper Lee
   - Price: $12.50
   - Quantity: 8
   - Rating: 4.8/5 (12 reviews)
   - ISBN: 978-0-06-112008-4
   - Published: 1960

3. **1984** by George Orwell
   - Price: $14.99
   - Quantity: 15
   - Rating: 4.6/5 (15 reviews)
   - ISBN: 978-0-452-28423-4
   - Published: 1949

4. **The Catcher in the Rye** by J.D. Salinger
   - Price: $13.99
   - Quantity: 9
   - Rating: 4.2/5 (7 reviews)
   - ISBN: 978-0-316-76948-0
   - Published: 1951

5. **Animal Farm** by George Orwell
   - Price: $10.99
   - Quantity: 13
   - Rating: 4.4/5 (11 reviews)
   - ISBN: 978-0-452-28424-1
   - Published: 1945

6. **The Da Vinci Code** by Dan Brown
   - Price: $15.99
   - Quantity: 5
   - Rating: 3.9/5 (16 reviews)
   - ISBN: 978-0-307-26595-4
   - Published: 2003

### Romance
7. **Pride and Prejudice** by Jane Austen
   - Price: $11.99
   - Quantity: 12
   - Rating: 4.3/5 (10 reviews)
   - ISBN: 978-0-14-143951-8
   - Published: 1813

### Fantasy
8. **Harry Potter and the Philosopher's Stone** by J.K. Rowling
   - Price: $12.99
   - Quantity: 20
   - Rating: 4.9/5 (25 reviews)
   - ISBN: 978-0-7475-3269-9
   - Published: 1997

9. **The Hobbit** by J.R.R. Tolkien
   - Price: $16.99
   - Quantity: 14
   - Rating: 4.7/5 (18 reviews)
   - ISBN: 978-0-547-92822-7
   - Published: 1937

10. **The Lord of the Rings** by J.R.R. Tolkien
    - Price: $24.99
    - Quantity: 6
    - Rating: 4.8/5 (30 reviews)
    - ISBN: 978-0-547-92822-7
    - Published: 1954

11. **The Chronicles of Narnia** by C.S. Lewis
    - Price: $18.99
    - Quantity: 11
    - Rating: 4.6/5 (22 reviews)
    - ISBN: 978-0-06-440537-9
    - Published: 1950

### Philosophy
12. **The Alchemist** by Paulo Coelho
    - Price: $13.99
    - Quantity: 7
    - Rating: 4.1/5 (9 reviews)
    - ISBN: 978-0-06-112008-4
    - Published: 1988
    - **Status:** Unavailable

## Mock Reviews (6 Reviews)

1. **The Great Gatsby** - Alice Johnson (5 stars)
   - "Absolutely loved this book! The writing is beautiful and the story is timeless. Highly recommend it to everyone."

2. **The Great Gatsby** - Bob Smith (4 stars)
   - "A great read, couldn't put it down. The characters are well-developed and the plot is engaging."

3. **To Kill a Mockingbird** - Alice Johnson (5 stars)
   - "This book changed my perspective on many things. Harper Lee's writing is powerful and moving."

4. **1984** - Bob Smith (5 stars)
   - "Scary how relevant this book still is today. Orwell was truly ahead of his time."

5. **Harry Potter and the Philosopher's Stone** - Alice Johnson (5 stars)
   - "The magic of Harry Potter never gets old. Perfect for readers of all ages!"

6. **The Hobbit** - Bob Smith (4 stars)
   - "Tolkien's world-building is incredible. A must-read for fantasy lovers."

## Mock Book Requests (4 Requests)

1. **Alice Johnson** - The Great Gatsby
   - Status: Pending
   - Date: January 20, 2024

2. **Bob Smith** - 1984
   - Status: Approved
   - Date: January 18, 2024
   - Approved: January 19, 2024

3. **Alice Johnson** - Harry Potter and the Philosopher's Stone
   - Status: Pending
   - Date: January 25, 2024

4. **Bob Smith** - The Alchemist
   - Status: Rejected
   - Date: January 22, 2024
   - Rejected: January 23, 2024
   - Reason: Book is currently unavailable

## Mock Borrowings (3 Borrowings)

1. **Alice Johnson** - To Kill a Mockingbird
   - Borrowed: January 15, 2024
   - Due: February 15, 2024
   - Status: Borrowed
   - Fine: $0

2. **Bob Smith** - Pride and Prejudice
   - Borrowed: January 10, 2024
   - Due: February 10, 2024
   - Returned: February 8, 2024
   - Status: Returned
   - Fine: $0

3. **Alice Johnson** - Animal Farm
   - Borrowed: January 5, 2024
   - Due: February 5, 2024
   - Status: Overdue
   - Fine: $5.50

## Mock Notifications (3 Notifications)

1. **Alice Johnson** - Book Request Approved
   - "Your request for 'The Great Gatsby' has been approved!"
   - Type: Success
   - Read: No

2. **Bob Smith** - Book Due Soon
   - "Your book 'Pride and Prejudice' is due in 3 days."
   - Type: Warning
   - Read: No

3. **Alice Johnson** - Overdue Book
   - "Your book 'Animal Farm' is overdue. Please return it soon."
   - Type: Error
   - Read: Yes

## System Statistics

### Book Statistics
- Total Books: 12
- Available Books: 11
- Unavailable Books: 1
- Total Quantity: 130
- Categories: Fiction, Romance, Fantasy, Philosophy, Mystery

### User Statistics
- Total Users: 5
- Students: 2
- Librarians: 2
- Admins: 1

## Features Available in Mock Mode

### Student Features
- Browse all books
- Search books by title/author
- View book details
- Request books
- Submit reviews and ratings
- View personal borrowing history
- Receive notifications

### Librarian Features
- View all books
- Add new books
- Delete books
- Manage book requests (approve/reject)
- View pending requests
- Search books

### Admin Features
- View all users
- Manage librarians
- Add new librarians
- View system statistics
- Access all user data

## Data Persistence

All mock data is stored in browser localStorage, which means:
- Data persists between browser sessions
- Users can register new accounts
- Books can be added/modified
- Reviews and requests are saved
- Changes are maintained until localStorage is cleared

## Testing Credentials

Use these credentials to test different user roles:

**Admin:**
- Email: khandelwalr207@gmail.com
- Password: test1234

**Librarian:**
- Email: frank@example.com
- Password: test1234

**Student:**
- Email: alice@example.com
- Password: test1234

You can also register new student accounts through the registration page.
