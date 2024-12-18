### 10/21/2024

- **Organized and formatted the problem statement and solution**
  - Reformatted the `problem.md` file into a clear, readable structure using markdown.
  - Ensured the document is easy to navigate and well-suited for GitHub presentation.
  - **Link:** [Commit 975515d9f21d0857c8776ed59a65bcac8942a3fd](https://github.com/edwintran235/326-team9/commit/975515d9f21d0857c8776ed59a65bcac8942a3fd)

- **Streamlined the `users.md` page**
  - Improved readability and ensured user needs and insights are clearly outlined.
  - **Link:** [Commit 66842cd58bec32d6af03e969f3605358cb9e7909](https://github.com/edwintran235/326-team9/commit/66842cd58bec32d6af03e969f3605358cb9e7909)

- **Revised the `README.md` file**
  - Updated with detailed setup and usage instructions.
  - Ensured team members understand how to set up the project and contribute effectively.
  - **Link:** [Commit ec27109f469c3bee5ac409e4d2cb51f4743ab959](https://github.com/edwintran235/326-team9/commit/ec27109f469c3bee5ac409e4d2cb51f4743ab959)

---

### 11/5/2024

- **Integrated SQLite in Profile Page**
  - Replaced local storage mechanisms with SQLite database for storing user name and description.
  - Ensured persistent storage of user data in the SQLite database across sessions.
  - **Code Updated:** Profile Page (`profilepage.js`).


- **Refined Resume and Cover Letter Upload**
  - Implemented file upload functionality, storing resume and cover letter in SQLite.
  - Added logic to download files directly from the SQLite database.
  - **Code Updated:** Profile Page (`profilepage.js`).


- **Aligned Navbar and CSS Styling**
  - Refined the navbar design across all pages for consistent navigation.
  - Applied responsive styles to ensure compatibility across devices.
  - **Code Updated:** CSS and HTML for all major pages.
  

---

### 11/17/2024

- **Connected Drag-and-Drop with SQLite**
  - Updated drag-and-drop logic so application status changes are persisted in the SQLite database.
  - Ensured deleted applications are removed from both the DOM and the SQLite database.
  - **Code Updated:** Homepage Drag-and-Drop Feature (`script.js`).


- **Enhanced Application Info Page**
  - Linked application details dynamically from the SQLite database to populate fields.
  - Added event listeners for editing and saving changes directly to the database.
  - **Code Updated:** Application Info Page (`application.js`).


- **Added Reminder Modal Integration**
  - Implemented a modal for reminders, storing reminder data in SQLite.
  - Refined the UI for a better user experience.
  - **Code Updated:** Homepage Reminders (`script.js`).


---

### 12/9/2024

- **Implemented User Authentication with JWT and Bcrypt**
  - Added secure login and signup functionality using `bcrypt` for password hashing.
  - Created middleware to protect private routes using `jsonwebtoken` for user session validation.
  - Implemented secure login/logout endpoints for session management, backed by SQLite user data.
  - **Code Updated:** Backend Login Logic (`index.js`, `routes/auth.js`).


- **Developed Analytics API**
  - Implemented endpoints for:
    - Fetching total applications by status.
    - Calculating average time to transition between application stages.
    - Providing insights into the most common application statuses.
  - Integrated Sequelize queries against the SQLite database for aggregation and analysis.
  - **Code Updated:** Analytics Routes (`routes/analytics.js`).


- **Enhanced Backend and Database Models**
  - Updated Sequelize models (on top of SQLite) to support features like:
    - Application tracking with `status` and `lastUpdated` fields.
    - User authentication fields (`email`, `password`).
    - Defined relationships between `users`, `applications`, and other models.
  - Refactored backend structure to separate concerns (models, routes, and config).
  - **Code Updated:** Models (`models/user.js`), Database Config (`config/database.js`).

