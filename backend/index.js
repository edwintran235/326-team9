const express = require('express');
const sequelize = require('./config/database');
const { User } = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'your_secret_key'; // Use a secure secret key

// Sync the database
sequelize.sync()
    .then(() => console.log('Database is open.'))
    .catch((err) => console.log('Could not open database: ' + `${err.message}`));

// Middleware for handling JSON requests
app.use(express.json());

// Middleware to validate JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

// Route: User Registration
app.post('/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).send('User already exists');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Route: User Login
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).send('User not found');

        // Compare the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid credentials');

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Route: Logout (Client-side can delete the token)
app.post('/auth/logout', (req, res) => {
    res.status(200).send('User logged out');
});

// Protected Route Example
app.get('/protected', authenticateToken, (req, res) => {
    res.send(`Welcome, ${req.user.email}!`);
});

// Start the server
app.listen(3021, () => {
    console.log('The server has started!');
});
