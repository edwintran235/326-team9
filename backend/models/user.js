const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Tables to create
// const tableName1 = 'users';
// const tableName2 = 'applications';
// const tableName3 = 'application information';
// const tableName4 = 'tips';
// const tableName5 = 'reminders';
// const tableName6 = 'interviews';
// TODO: create the rest of the tables

// User Schema
class User extends Model {}
User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.STRING
    },
    // TODO: add resume, cover letter, and photo
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

// Application Information Schema
class Application extends Model {}
Application.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    // userId: {
    //     type: DataTypes.INTEGER, // Foreign key for the User
    //     allowNull: true
    // },
    companyName: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    contacts: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['interested', 'applied', 'interviewing'],
    },
    // previousStatus: {
    //     type: DataTypes.ENUM,
    //     values: ['interested', 'applied', 'interviewing'],
    //     allowNull: true
    // },
    dateApplied: {
        type: DataTypes.DATE
    },
    // dateDeleted: {
    //     type: DataTypes.DATE,
    //     allowNull: true
    // },
    // hasStar: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: true
    // },
    // TODO: Add resume, cover letter
}, {
    sequelize,
    modelName: 'Application',
    tableName: 'Applications',
});

// Tip Schema
class Tip extends Model {}
Tip.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER, // Foreign key for the User
    },
    author: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.STRING,
    },
    interviewStage: {
        type: DataTypes.ENUM,
        values: ['interested', 'applied', 'interviewing'],
    },
}, {
    sequelize,
    modelName: 'Tip',
    tableName: 'tips',
});

// Reminder Schema
class Reminder extends Model {}
Reminder.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Reminder',
    tableName: 'Reminders',
});

// Interview Schema
class Interview extends Model {}
Interview.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    applicationId: {
        type: DataTypes.INTEGER, // Foreign key for the Application
    },
    date: {
        type: DataTypes.DATE,
    },
    format: {
        type: DataTypes.ENUM,
        values: ['phone', 'onsite', 'technical exam'],
    },
    questions: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Interview',
    tableName: 'interviews',
});

// Exporting models
module.exports = {
    User,
    Application,
    Tip,
    Reminder,
    Interview
};