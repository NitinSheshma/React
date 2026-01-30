const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Sample data
const students = [
  { id: 1, name: 'Tommy', RollNumber: 1, email: 'tommy@email.com', grade: 'A' },
  { id: 2, name: 'Pluto', RollNumber: 2, email: 'pluto@email.com', grade: 'B+' },
  { id: 3, name: 'Sundae', RollNumber: 3, email: 'sundae@email.com', grade: 'A-' },
];

const users = [];

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Get all students
app.get('/api/students', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Students retrieved successfully',
      data: students,
      count: students.length,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving students',
      error: error.message
    });
  }
});

// Get single student by ID
app.get('/api/students/:id', (req, res) => {
  try {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    res.json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving student',
      error: error.message
    });
  }
});

// Create new student
app.post('/api/students', (req, res) => {
  try {
    const { name, email, grade } = req.body;

    if (!name || !email || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and grade are required'
      });
    }

    const newStudent = {
      id: Math.max(...students.map(s => s.id), 0) + 1,
      name,
      RollNumber: Math.max(...students.map(s => s.RollNumber), 0) + 1,
      email,
      grade
    };

    students.push(newStudent);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// Update student
app.put('/api/students/:id', (req, res) => {
  try {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { name, email, grade } = req.body;
    
    if (name) students[studentIndex].name = name;
    if (email) students[studentIndex].email = email;
    if (grade) students[studentIndex].grade = grade;

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: students[studentIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  try {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (email === 'admin@test.com' && password === 'password123') {
      const user = {
        id: 1,
        email: email,
        name: 'Admin User',
        token: 'jwt_token_' + Date.now()
      };

      res.json({
        success: true,
        message: 'Login successful',
        data: user
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    const newUser = {
      id: users.length + 1,
      email,
      name,
      token: 'jwt_token_' + Date.now(),
      createdAt: new Date()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message
    });
  }
});

// Get dashboard stats
app.get('/api/stats', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Stats retrieved successfully',
      data: {
        totalStudents: students.length,
        totalUsers: users.length,
        classes: 3,
        enrollmentRate: '100%',
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving stats',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`\n Available endpoints:`);
  console.log(`  GET    /api/health              - Server health check`);
  console.log(`  GET    /api/students            - Get all students`);
  console.log(`  GET    /api/students/:id        - Get single student`);
  console.log(`  POST   /api/students            - Create new student`);
  console.log(`  PUT    /api/students/:id        - Update student`);
  console.log(`  DELETE /api/students/:id        - Delete student`);
  console.log(`  POST   /api/login               - User login`);
  console.log(`  POST   /api/register            - User registration`);
  console.log(`  GET    /api/stats               - Get dashboard stats`);
  console.log(`\n Test login credentials:`);
  console.log(`  Email: admin@test.com`);
  console.log(`  Password: password123`);
  console.log(`========================================\n`);
});

module.exports = app;
