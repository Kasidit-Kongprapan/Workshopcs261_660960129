const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Database connection configuration
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'localhost', // or your server IP
    database: 'myDB',
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: true // for local development with self-signed certs
    }
};

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to the database
        await sql.connect(config);

        // Query the students table for the user with matching username and password
        const result = await sql.query`SELECT * FROM dbo.students WHERE user_name = ${username} AND password = ${password}`;

        if (result.recordset.length > 0) {
            // If a matching user is found, return their data
            const user = result.recordset[0];
            res.json({
                eng_name: user.eng_name,
                email: user.email,
                faculty: user.faculty,
                user_name: user.user_name,
                message: "Login successful"
            });
        } else {
            // If no matching user is found, return an error message
            res.status(400).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
