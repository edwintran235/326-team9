# -------------------------------------------
# Project: Job Application Tracking System
# -------------------------------------------

# File Structure:
# backend/
#     |____config/
#             |____database.js  # Contains database creation/configuration
#     |____db/
#             |____data.sqlite  # SQLite database file (generated after starting the application)
#     |____models/
#             |____user.js  # Contains the tables and schemas in the database
#     |____routes/
#             |____analytics.js  # Contains analytics endpoints
#             |____user.js  # Contains the routes for user-related functionality
#     |____index.js  # Main application entry point
# frontend/
#     |____pages/
#             |____*.html  # Frontend HTML files for pages like login, homepage, etc.
#     |____styles/
#             |____*.css  # Frontend CSS files for styling
#     |____scripts/
#             |____*.js  # Frontend JavaScript files for logic and interactivity

# -------------------------------------------
# Starting the Application:
# -------------------------------------------

# 1. Navigate to the 'backend' directory:
#    cd backend
# 
# 2. Install dependencies:
#    npm install
# 
# 3. Run the application:
#    npm start
# 
# Console Output:
# The server has started!
# Database is open.

# -------------------------------------------
# About the Database:
# -------------------------------------------

# The project uses SQLite with Sequelize ORM.
# - SQLite database is located at backend/db/data.sqlite.
# - Use VSCode SQLite Extension or other tools to view the database.
# 
# Tables:
# - Users
# - Applications
# - Interviews
# - Reminders
# - Tips
# 
# Each table has a unique ID as its primary key.

# -------------------------------------------
# Backend Features:
# -------------------------------------------

# 1. **User Authentication:**
# - Secure password storage using bcrypt for hashing.
# - JWT-based session management for authentication.
# - Middleware to validate user sessions for protected routes.
# - Endpoints:
#   - POST /auth/register: Register a new user.
#   - POST /auth/login: Log in an existing user.
#   - POST /auth/logout: Log out the user.

# 2. **CRUD Operations:**
# - Create, read, update, and delete records for all tables.
# - Endpoints for tables:
#   - Users: POST /users
#   - Applications: POST /applications
#   - Tips: POST /tips
#   - Reminders: POST /reminders
#   - Interviews: POST /interviews

# 3. **Analytics:**
# - Analyze job applications for actionable insights.
# - Features:
#   - Total applications submitted, grouped by status.
#   - Average time to move between application stages.
#   - Most common application statuses across all users.
# - Endpoints:
#   - GET /analytics/total-by-status
#   - GET /analytics/avg-transition-time
#   - GET /analytics/common-statuses

# 4. **Relationships:**
# - Users -> Applications (One-to-Many)
# - Applications -> Interviews (One-to-Many)
# - Users -> Tips (One-to-Many)
# - Users -> Reminders (One-to-Many)

# -------------------------------------------
# Frontend Features:
# -------------------------------------------

# 1. **Login and Signup Pages:**
# - Allows users to register and log in securely.
# - Integrated with backend for session handling.

# 2. **Application Tracker:**
# - Displays job applications grouped by their status.
# - Features:
#   - Add, edit, or delete job applications.
#   - Drag-and-drop applications between statuses.

# 3. **Reminders Sidebar:**
# - Add reminders for upcoming dates related to applications.
# - Displays reminders with descriptions and dates.

# 4. **Interview Tips:**
# - Provides interview tips categorized by stages.

# -------------------------------------------
# Example API Calls (Postman or cURL):
# -------------------------------------------

# 1. Register a User:
# Endpoint: POST http://localhost:3021/auth/register
# Body:
# {
#     "email": "user@example.com",
#     "password": "securePassword",
#     "firstName": "John",
#     "lastName": "Doe"
# }

# 2. Log In:
# Endpoint: POST http://localhost:3021/auth/login
# Body:
# {
#     "email": "user@example.com",
#     "password": "securePassword"
# }

# 3. Add a Job Application:
# Endpoint: POST http://localhost:3021/applications
# Body:
# {
#     "userId": 1,
#     "companyName": "Google",
#     "position": "Software Engineer",
#     "status": "applied",
#     "dateApplied": "2024-12-01"
# }

# 4. Get Total Applications by Status:
# Endpoint: GET http://localhost:3021/analytics/total-by-status
# Response:
# [
#     { "status": "applied", "count": 10 },
#     { "status": "interested", "count": 5 },
#     { "status": "interviewing", "count": 2 }
# ]

# -------------------------------------------
# Notes:
# -------------------------------------------

# - Ensure the backend is running on port 3021.
# - Use tools like Postman or cURL to interact with the API.
# - Populate the database with sample data to test analytics endpoints.


Each has a unique id as its primary key.
