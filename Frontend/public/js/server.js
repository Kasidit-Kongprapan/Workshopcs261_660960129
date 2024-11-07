const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const PORT = 8080;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // your MySQL username
    password: '',         // your MySQL password
    database: 'student_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint to add student data (via Postman or another client)
app.post('/api/students/add', (req, res) => {
    const { username, password, email, faculty, user_name, type } = req.body;

    const query = `INSERT INTO students (username, password, email, faculty, user_name, type) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [username, password, email, faculty, user_name, type], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error adding student' });
        }
        res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
    });
});

// Endpoint to handle login (fetch user data from the database)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM students WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Return user data if login is successful
        const user = results[0];
        return res.json({
            id: user.id,
            eng_name: user.user_name, // assuming "user_name" is the English name
            email: user.email,
            faculty: user.faculty,
            type: user.type,
            user_name: user.username
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
