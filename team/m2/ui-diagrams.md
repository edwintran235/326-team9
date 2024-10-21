# UI Diagrams

## Login Page Screen

The **Login Page** is the landing page when initially loaded. Here, the users must log in or create an account in order to access the homepage and interact with our system. This page is simple with two inputs for username and password and our logo.

![Login Page Placeholder](...)

**Use Case**:

The user wants to track their job application process by using our service. In order to use our service, they must log in. The user sets a username and password the first time that they log in. After logging in, the user will land on the **User Applications Screen** where they can interact with our service. All of the user's interactions are saved under the user's profile, so that every time they log in their information is there.

## Profile Page Screen

The **Profile Page** is where users can enter their information. This information will be important in other features

![Profile Page Placeholder](...)

The profile page will include a picture of the user, a description/bio, their resume, contact information, and user settings. The user has the opportunity to edit any of this information after it is saved.

**Use Case**:

A user who just logged in wants to personalize their account. When they go to the profile page, they can edit their name, biography, contact information, user settings, and upload a resume. Say the user just got married and wants to change their name. The user can edit their profile, input a new name, and save their changes. The user's new name will show on their profile.

## User Applications Screen

The **User Application Screen** is the homepage that users will be directed to after logging in. It includes all of the users current applications, interviews, offers, and to-dos which will be organized into four columns. The job names that fall under each category will be listed, each with a link to the **Notes** page with more information on that job. There is a navigation bar at the top where users can be directed to the **Profile Page** or the **Login Page** after logging out. There are buttons for adding new applications which will be filled out in a pop-up.

![User Applications Placeholder](...)

On this screen, users can interact with their applications:

1. **Prioritize Applications**: The user has the ability to order the applications so that the user can view the most important ones first.
2. **Create New Applications**: The user can click the "+" button to add new applications.
3. **Change Status**: The user can drag and drop their applications into different stages (i.e. TO-DO -> Applied -> Interview -> Offer)
4. **Rejected Applications**: If a user is rejected at any point in the application process, they can drag and drop it over the trash can icon. This will store the failed application elsewhere.
5. **View More Info**: If a user wants more details on a job that they have applied for, they can click the application/job title and it will direct them to the **Application Information Screen** for that job.

This screen is the primary location for the user’s experience. It includes links to all other important pages. It acts as the main display for the Job Application Tracker as well as a directory for other useful features.

**Use Case**: 

A user who wants to track the progress of their Job/Interview processes would log into the application to see a list of the Jobs that they have applied for. When a user hears back from the company that they have reached the interview process, the user can tack this by dragging the application to the interview column. Anytime the user views this page, they will be reminded that they have an interview coming up.

## Application Information Screen

=========
Login/ Create Account Page:
These are 2 pages:
    Login Page:
        if credentials are entered incorreclty or do not exist, an error message will pop up, prompting user to create account or try again
    Create Account Page:
        here, users can type in an email and password, and verify their password by typing it twice







Profile Page:
    here, users can create their profile by inputting data such as:
        profile picture
        description
        resume
        cover letter outline



HomePage:
    Navbar:
        on the top of the page is a navbar which has these options:
            profile
            tips/resources
            alumni connect
            Create job application
    Main section:
        here, users can see all jobs they have applied to, as well as see any important updates like upcoming OA deadlines
        Users can filter their jobs by:
            applied
            interviewing
            offer
            rejected
        Users can drag and drop each job tile into different sections when their jobs get updates
    Delete button:
        Users can click this, then click all jobs to delete, so they can delete many at once
    

Job Page:
    here, users can view a job they have applied to
        View job:
            clicking a button on Navbar sends you here, where you can fill out information on:
            company name 
            when you applied
            status of the job
            resume used
            CV used
            important links to keep track of
            deadlines (if you have interviews or assessments to do)
            upcoming OA's
            company notes
            benefits
        You will be able to edit any of these on the page, and they will remain blank if nothing is filled out for it