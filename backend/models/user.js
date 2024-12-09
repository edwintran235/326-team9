const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// User Schema
class User extends Model {}
User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.STRING,
    },
    resumePath: {
        type: DataTypes.STRING,
    },
    coverLetterPath: {
        type: DataTypes.STRING,
    },
    resumePath: {
        type: DataTypes.STRING,
    },
    coverLetterPath: {
        type: DataTypes.STRING,
    },
    // TODO: add resume, cover letter, and photo
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Application Schema
class Application extends Model {}
Application.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.ENUM('interested', 'applied', 'interviewing', 'offer'),
        allowNull: false,
    },
    previousStatus: {
        type: DataTypes.ENUM('interested', 'applied', 'interviewing', 'offer'),
    },
    dateApplied: {
        type: DataTypes.DATE,
    },
    dateDeleted: {
        type: DataTypes.DATE,
    },
    hasStar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
    timestamps: true, // Adds createdAt and updatedAt
});

// Tip Schema
class Tip extends Model {}
Tip.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    author: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.STRING,
    },
    interviewStage: {
        type: DataTypes.ENUM('interested', 'applied', 'interviewing'),
    },
}, {
    sequelize,
    modelName: 'Tip',
    tableName: 'tips',
    timestamps: true,
});

// Reminder Schema
class Reminder extends Model {}
Reminder.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Reminder',
    tableName: 'reminders',
    timestamps: true,
});

// Interview Schema
class Interview extends Model {}
Interview.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Application,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    format: {
        type: DataTypes.ENUM('phone', 'onsite', 'technical exam'),
    },
    questions: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Interview',
    tableName: 'interviews',
    timestamps: true,
});

// Establish relationships between tables
User.hasMany(Application, { foreignKey: 'userId', onDelete: 'CASCADE' });
Application.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Tip, { foreignKey: 'userId', onDelete: 'CASCADE' });
Tip.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Reminder, { foreignKey: 'userId', onDelete: 'CASCADE' });
Reminder.belongsTo(User, { foreignKey: 'userId' });

Application.hasMany(Interview, { foreignKey: 'applicationId', onDelete: 'CASCADE' });
Interview.belongsTo(Application, { foreignKey: 'applicationId' });

module.exports = {
    User,
    Application,
    Tip,
    Reminder,
    Interview,
};
