# Application Features

## Job Application Tracker Section (M3)
This feature will display an overview of each application submitted by the user, including key details such as company name and position. For each application, users can select their current status, such as "Applied," "Interviewing," "Offer," or "Rejected." Users will have the ability to update the status of each application. This functionality will give users a quick view of their progress, allowing them not to have to sort through various websites and emails.

**Assigned to:** Edwin Tran

**Points:** 4

## Dragging Applications (M3)
When the user wants to update the status of their application, they are able to drag each application into a different section.

**Assigned to:** Edwin Tran

**Points:** 3

## Navigation Bar (M3)
Bar and icons to navigate between different pages of the website.

**Assigned to:** Edwin Tran

**Points:** 2

## Upcoming Dates (M3)
When the user has any upcoming due dates for interviews or online assessments, they will be able to add them here to keep track.

**Assigned to:** Edwin Tran

**Points:** 1

## User Dashboard Data Aggregation (M4)
Creates a single dashboard API that groups multiple types of user-specific data into a single response. This will include a greeting based on the time of day, user-specific announcements/reminders, and recent activity. This is just as a welcome for the user. It will show up the first time the user logs in for the day. There will be an option to not show it for the rest of the day that the user can click.

**Assigned to:** Edwin Tran

**Points:** 5

## Application Sorting (M4)
A way to sort the applications in different ways, such as day applied, user priority, and alphabetical.

**Assigned to:** Edwin Tran

**Points:** 3

## Drag and Drop Status Update (M4)
When the user grabs an application and drags it to a new category, it will update the status of the application

**Assigned to:** Edwin Tran

**Points:** 2

## Trash Functionality (Front End - M3)
When a user wants to remove an application from the page, they will be able to drag it to a trash can icon, which will remove it. Implemented with indexdbb.

**Assigned to:** Sofia Simonoff

**Points:** 3

## Trash Functionality (Back End - M4)
This feature will allow users to delete job applications by dragging them to the trash button. Instead of permanently deleting the application, it will be flagged as deleted in the database. This approach keeps the data safe for a period in case users need to recover it.

**Assigned to:** Sofia Simonoff

**Points:** 6

## Restore from Trash (Back End - M4)
This feature allows users to recover deleted job applications from the trash. They can view deleted applications through their profile page. By restoring an application, it will reappear in the main list as an active application.

**Assigned to:** Sofia Simonoff

**Points:** 2

## Interview Notes and Questions (Front End - M3)
For each application, users can record details about interview dates, the format (over the phone, technical exams, on-site interviews), and what questions they were asked during the interview process. This feature would allow users to review past interview questions to prepare for future interviews and improve their performance.

**Assigned to:** Sofia Simonoff

**Points:** 3

## Interview Notes Storage and Retrieval (Back End - M4)
Users can add, edit, and view notes for each job application. Notes will be stored in the database alongside the application details for easy retrieval. The back-end will support front-end forms and views by providing routes to create, update, and fetch notes.

**Assigned to:** Sofia Simonoff

**Points:** 4

## Resources and Tips Footer Section (Front End - M3)
At the bottom of the application tracker, there is a section for resources and tips that will be populated with information from the repository.

**Assigned to:** Sofia Simonoff

**Points:** 2


## Application Search Bar
A search bar will be added to the navigation bar. When a user wants to search through their current applications, a list of applications will appear based on the user’s query.

**Assigned to:** Macy Graves

**Points:** 1

## Application Information Form
When a user tracks a new application, the user is prompted to enter information about the company, position, etc. This information will be stored in the database and retrieved when the user double clicks on the application name on the homepage. The information will be displayed on the application information page.

**Assigned to:** Macy Graves, Krish Sharma

**Points:** 5

## Resume/Cover Letter File Upload
On the Application Information Page, a user can upload the specific resume and cover letter that they used for the application. The resume and cover letter will be stored and accessible on the application page for that specific application.

**Assigned to:** Macy Graves, Mohammad Kiyani, Krish Sharma

**Points:** 3

## Linked Resume and Cover Letter Upload to IndexedDB
The resume and cover letter upload functionality was linked to the IndexedDB, allowing these files to be stored and retrieved persistently across sessions.

**Assigned to:** Mohammad Kiyani, Krish Sharma

**Points:** 1 (for each, total: 2)

## Deadline Reminders and Notifications
Users can set reminders for application deadlines, interviews, and follow-ups. These reminders would be displayed in-app and would help keep users organized and make sure they do not miss important deadlines.

**Assigned to:** Lauren Shea

**Points:** 3

## Priority Applications
This feature helps users mark and focus on their most desired job applications. Users can "star" or "flag" certain applications, moving them to a priority position or list. This will help them focus their time and energy on the most important applications.

**Assigned to:** Shubham Inavolu

**Points:** 3

## Job Search and Interviewing Tips Repository
A section that offers tips about the job search and interview process, tailored to each stage of the application. For example, users in the "Interviewing" stage, could reference behavioral interview tips, while someone in the "Applied" stage could reference tips discussing how to follow up. This would help users at each stage of the process.

**Assigned to:** Shubham Inavolu

**Points:** 3

## Input Name
Users can upload their name and have it persist. Because there is currently no login authorization, this is implemented directly on the profile page and will move to the login page later.

**Assigned to:** Mohammad Kiyani, Krish Sharma

**Points:** 1

## Linked Name Input to IndexedDB
The name input functionality was linked to IndexedDB for persistence, allowing the name to remain across sessions.

**Assigned to:** Mohammad Kiyani, Krish Sharma

**Points:** 1

## Profile Pic Upload Button
A button that allows users to upload their pic to their profile, so that their page is customizable. Clicking the button will boot up the user's files so they can select what to upload.

**Assigned to:** Mohammad Kiyani, Krish Sharma

**Points:** 3

## Linked Profile Pic to IndexedDB
The profile picture upload feature was linked to the IndexedDB, enabling the uploaded picture to be saved and persist across sessions.

**Assigned to:** Krish Sharma

**Points:** 1

## Resume Upload Button
A link that allows users to upload their resume to their profile, so that they can view it as a PDF. Clicking the button will boot up the user's files so they can select what to upload.

**Assigned to:** Mohammad Kiyani, Krish Sharma

**Points:** 3

## Cover Letter Upload Button
A link that allows users to upload their cover letter to their profile, so that they can view it as a PDF. Clicking the button will boot up the user's files so they can select what to upload.

**Assigned to:** Mohammad Kiyani, Krish Sharma

**Points:** 3

## Description/Bio Box
A form input section so users can place their typed ‘elevator pitch’ into an accessible region in their profile page, or other important information. Data persists across devices/reloads.

**Assigned to:** Mohammad Kiyani

**Points:** 1

## Recent Activity Section
Displays current status of user applications so they can see at a glance an overview of the number of apps, rejections, etc. Currently just a base implementation, as we will gather data for it on the next milestone.

**Assigned to:** Mohammad Kiyani

**Points:** 1

## Profile Page Navigation
Navigation menu on the profile page in line with the rest of the application which links you to the other pages, viewable on the top of the screen. There is a section for user login as well, but that will be implemented in the next milestone.

**Assigned to:** Mohammad Kiyani

**Points:** 1

## Resume/Cover letter File uploads
On the profile page, users can upload a resume or cover letter as a way to store it, so we need to connect this with the backend to ensure the data persists, allowing users to upload a resume/cover letter and retrieve them. 
**Point Value:** 6
**Size Category:** Large
**Assigned to:** Mohammad Kiyani


## Name Input on profile page
On the profile page, users can input their name so that it will associate those login credentials with your name, allowing your name to appear every time you open the homepage creating a more personal experience. This involves storing the name inputted and then retrieving it every time the homepage is opened for display
**Point Value:** 2
**Size Category:** Medium
**Assigned to:** Mohammad Kiyani

## Description/ BIO box storage
On the profile page, users can input a description of themselves as a good template incase the question gets asked in an application so users can just copy/paste their already made description, so this needs to be persisted by storing the input into the backend and then retrieved when users load the profilepage
**Point Value:** 2
**Size Category:** Medium
**Assigned to:** Mohammad Kiyani



## Login/Create Account Page
Users can login or create an account. Login allows users to enter an email and password, and if it is correct, they get sent to the homepage; otherwise, it prompts an error message. On the create account page, users can enter an email and a password twice to make an account on the web page.

**Assigned to:** Krish Sharma

**Points:** 5

## 'Add Job' Button
There will be an ‘Add’ button displayed on the home page where users can click the button and add in a new job they are applying for. Clicking the button will prompt users to input information for a new job that will be accessible in the ‘Application Information’ page.

**Assigned to:** Lauren Shea

**Points:** 3

## Add New Application to Database
When users press the 'Add' button, they will fill out information about the job. The information will be saved in the IndexedDB database for applications so they can be accessed later.

**Assigned to:** Lauren Shea, Krish Sharma

**Points:** 4

## Edit Application in Database
Users can edit an existing application's information in the IndexedDB database, such as updating the company name, position, or status. This feature ensures the application details remain accurate and up-to-date.

**Assigned to:** Krish Sharma

**Points:** 4

## Deadline Reminders and Notifications
When a user clicks on the 'new reminder' button, they will be prompted to enter information about what they would like to be reminded on and when the date is. This will be a pop-up modal feature.

**Assigned to:** Lauren Shea

**Points:** 3

## CSS Styling for Profile Page
Updated the CSS for the profile page to align with the overall website design, ensuring consistency in navigation bar, layout, and color scheme.

**Assigned to:** Krish Sharma, Mohammad Kiyani

**Points:** 2

