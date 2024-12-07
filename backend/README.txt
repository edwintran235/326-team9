## **File Structure:**
backend
    |____config
            |____database.js (contains database creation/configuration)
    |____db
            |____data.sqlite (contains the database, will appear after starting the application)
    |____models
            |____user.js (contains the tables and schemas in the database)
    |____routes
            |____user.js (contains the routes for each table)
    |____index.js    

## **Starting the Application:**
1. Move to the 'backend' directory
2. Install node modules
3. Run the start script

To do this run the following commands in order:
    cd backend
    npm install
    npm start

Console should print: 
    The server has started!
    ...
    ...
    ...
    Database is open.

## **About the Database:**
We are using SQLite with Sequelize.
When our application starts, the Database is viewable in the backend/db directory.
It may be useful to install the **VSCode SQLite Extension** to view the tables and schemas in the database.

**Tables:**
Users
Applications
Interviews
Reminders
Tips

Each has a unique id as its primary key.