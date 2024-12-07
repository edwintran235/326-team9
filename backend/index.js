// Find the express.js module
const express = require('express');

// import sequelize ORM from database.js
const sequelize = require('./config/database');
sequelize.sync()
    .then(() => console.log("Database is open."))
    .catch((err) => console.log("Could not open database: " + `${err.message}`));

// Create an express app
const app = express();

// Middleware for database comms in format of json objects
app.use(express.json());

// Import Schemas
const { User, Application, Tip, Interview, Reminder } = require('./models/user');

// Post to the users table
app.post("users", (res) => {
    User.create(res.body).then(() => {
        res.send("user entry added");
    });
});

// Post to the applications table
app.post("applications", (res) => {
    Application.create(res.body).then(() => {
        res.send("application entry added");
    });
});

// Post to the tips table
app.post("tips", (res) => {
    Tip.create(res.body).then(() => {
        res.send("tip entry added");
    });
});

// Post to the reminders table
app.post("reminders", (res) => {
    Reminder.create(res.body).then(() => {
        res.send("reminder entry added");
    });
});

// Post to the interviews table
app.post("interviews", (res) => {
    Interview.create(res.body).then(() => {
        res.send("interview entry added");
    });
});

// Run the app on port 3021
app.listen(3021, () => {
    console.log("The server has started!");
});