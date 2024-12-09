const express = require('express');
const cors = require('cors'); // Import the cors middleware

const sequelize = require('./config/database');
sequelize.sync()
    .then(() => console.log("Database is open."))
    .catch((err) => console.log("Could not open database: " + `${err.message}`));

const app = express();

// Allow requests from http://127.0.0.1:5500
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// Middleware for database comms in format of json objects
app.use(express.json());


// Import and use routes
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// Import Schemas
const { User, Application, Tip, Interview, Reminder } = require('./models/user');

// Post to the users table
app.post("/users", (req, res) => {
    User.create(req.body)
        .then(() => res.send("User entry added"))
        .catch(err => res.status(400).json({ error: err.message }));
});


// Post to the applications table
app.post("/applications", (req, res) => {
    Application.create(req.body)
    .then(() => res.send("application entry added"))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Post to the tips table
app.post("/tips", (req, res) => {
    Tip.create(req.body)
    .then(() => res.send("tip entry added"))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Post to the reminders table
app.post("/reminders", (req, res) => {
    Reminder.create(req.body)
    .then(() => res.send("reminder entry added"))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Post to the interviews table
app.post("/interviews", (req, res) => {
    Interview.create(req.body)
    .then(() => res.send("interview entry added"))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Run the app on port 3021
app.listen(3021, () => {
    console.log("The server has started!");
});