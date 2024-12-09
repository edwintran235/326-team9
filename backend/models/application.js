// backend/models/application.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING, // e.g., 'Applied', 'Interviewing', etc.
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateApplied: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    lastUpdated: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = Application;
