# React Learning App - Server & Client Setup Guide

## Project Structure

```
React/
├── server.js                          # Express server
├── package.json                       # Root package.json
└── my-react-app/
    ├── package.json                   # React app package.json
    ├── src/
    │   ├── services/
    │   │   └── apiService.js         # API service for backend calls
    │   ├── pages/
    │   │   ├── Login.jsx             # Connected to API
    │   │   └── ...
    │   └── App.jsx
    └── ...
```

## Installation & Setup

### 1. Install Dependencies

#### Backend (Express Server)
```bash
cd e:\React
npm install express cors body-parser
```

#### Frontend (React App)
```bash
cd my-react-app
npm install
```

### 2. Start the Server

Open PowerShell/Terminal in `e:\React` directory:

```bash
node server.js
```

You should see:
```
========================================
🚀 Server is running on port 5000
📍 API Base URL: http://localhost:5000/api

Available endpoints:
  GET    /api/health              - Server health check
  GET    /api/students            - Get all students
  GET    /api/students/:id        - Get single student
  POST   /api/students            - Create new student
  PUT    /api/students/:id        - Update student
  DELETE /api/students/:id        - Delete student
  POST   /api/login               - User login
  POST   /api/register            - User registration
  GET    /api/stats               - Get dashboard stats

Test login credentials:
  Email: admin@test.com
  Password: password123
========================================
```

### 3. Start the React App

In another terminal, run:
```bash
cd my-react-app
npm start
```

The app will open at `http://localhost:3003` or similar.

## API Endpoints

### Students API
- **GET** `/api/students` - Get all students
- **GET** `/api/students/:id` - Get single student by ID
- **POST** `/api/students` - Create new student
  ```json
  {
    "name": "John Doe",
    "email": "john@email.com",
    "grade": "A"
  }
  ```
- **PUT** `/api/students/:id` - Update student
- **DELETE** `/api/students/:id` - Delete student

### Authentication API
- **POST** `/api/login` - Login user
  ```json
  {
    "email": "admin@test.com",
    "password": "password123"
  }
  ```
- **POST** `/api/register` - Register new user
  ```json
  {
    "email": "user@email.com",
    "password": "securepass123",
    "name": "John Doe"
  }
  ```

### Other Endpoints
- **GET** `/api/health` - Server health check
- **GET** `/api/stats` - Dashboard statistics

## Test Login Credentials

**Email:** `admin@test.com`  
**Password:** `password123`

## API Service Usage in React

The `apiService.js` file provides helper functions to call the backend:

```javascript
import { authAPI, studentAPI } from '../services/apiService';

// Login
await authAPI.login('admin@test.com', 'password123');

// Get all students
await studentAPI.getAll();

// Create student
await studentAPI.create({
  name: 'John',
  email: 'john@email.com',
  grade: 'A'
});

// Update student
await studentAPI.update(1, {
  name: 'Jane',
  grade: 'A+'
});

// Delete student
await studentAPI.delete(1);
```

## Features

✅ **Server-Side Features:**
- Express.js REST API
- Student management (CRUD)
- User authentication (login/register)
- CORS enabled for React frontend
- Error handling middleware
- Health check endpoint

✅ **Client-Side Features:**
- API service layer for clean code
- Login form connected to API
- Form validation
- Loading states
- Error handling
- Demo credentials in UI
- Secure token storage

## Troubleshooting

### Port Already in Use
If port 5000 is already in use:
```bash
node server.js --port 5001
```

### CORS Errors
Make sure the server is running before starting the React app.

### Connection Refused
- Verify server is running: `http://localhost:5000/api/health`
- Check API_BASE_URL in `apiService.js`

## Next Steps

1. ✅ Start the server
2. ✅ Start the React app
3. ✅ Test login with demo credentials
4. ✅ Explore API endpoints
5. ✅ Connect more components to the API

## Additional Notes

- All API responses follow a standard format with `success`, `message`, and `data` fields
- User tokens are stored in `localStorage` after login
- The server runs in-memory (data resets on restart)
- For production, use a real database (MongoDB, PostgreSQL, etc.)
