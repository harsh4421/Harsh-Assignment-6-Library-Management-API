# Library Management API — Harsh Kumar

**Student:** Harsh Kumar  
**Roll No.:** 150096725105  
**Assignment:** 6 — Library Management API

## Overview
A full-stack Library Management System built independently from the assignment requirements. The backend uses Node.js, Express and Firebase Firestore with JWT authentication, bcrypt password hashing, role-based authorization, validation, rate limiting, logging and Swagger documentation.

## Features
- Student and librarian authentication
- JWT-protected API routes
- Role-based access control
- Book catalogue CRUD
- Search and filtering
- Borrow and return workflow
- Automatic due dates and overdue status
- Student loan history
- Librarian transaction ledger
- Librarian user administration
- Firebase Firestore persistence
- Helmet, CORS and rate limiting
- Swagger API documentation
- Responsive browser frontend

## Tech Stack
- Node.js + Express
- Firebase Admin SDK + Cloud Firestore
- JWT + bcryptjs
- express-validator
- express-rate-limit + Helmet
- Swagger UI
- HTML/CSS/JavaScript frontend

## Project Structure
```text
Harsh_Kumar_150096725105/
├── Config/
├── controller/
├── middleware/
├── models/
├── routers/
├── utils/
├── docs/
├── src/
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## API Endpoints
### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

### Books
- `GET /api/books`
- `GET /api/books/search?q=keyword`
- `GET /api/books/:id`
- `POST /api/books` — librarian
- `PUT /api/books/:id` — librarian
- `DELETE /api/books/:id` — librarian
- `POST /api/books/:id/borrow` — student
- `POST /api/books/:id/return` — student

### Transactions
- `GET /api/transactions` — librarian
- `GET /api/transactions/my` — authenticated user

### Users
- `GET /api/users` — librarian
- `GET /api/users/:id` — librarian
- `PUT /api/users/:id/role` — librarian
- `DELETE /api/users/:id` — librarian

## Local Setup
1. Install Node.js 18+.
2. Create a Firebase project and enable Firestore.
3. Create a Firebase service account.
4. Copy `.env.example` to `.env`.
5. Set `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT`, and a strong `JWT_SECRET`.
6. Install dependencies:
```bash
npm install
```
7. Run:
```bash
npm run dev
```
8. Open `http://localhost:5001/app` for the frontend and `http://localhost:5001/api-docs` for Swagger.

## Security
Never commit `.env` or Firebase service-account JSON. Production secrets must be stored in the deployment platform's environment variables.

## Deployment
The backend can be deployed as a Render Web Service. Set the root directory to `Harsh_Kumar_150096725105`, build command `npm install`, start command `npm start`, and configure the Firebase/JWT environment variables in Render.

## Author
Harsh Kumar — BTech CSE
