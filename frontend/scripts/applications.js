import { Database } from "../components/indexedDB.js";
import { appQuery } from "./script.js";

// Initialize the database
const db = new Database("appDB");
await db.openDB();

// Log that the script is loaded
console.log("loading...");

// Get elements from the application info DOM
const appPosition = document.getElementById("pos");
const appLocation = document.getElementById("loc");
const appContacts = document.getElementById("contacts");
const appDescription = document.getElementById("description");
const appDateApplied = document.getElementById("dateApplied");
const appResume = document.getElementById("resume");
const appCoverLetter = document.getElementById("coverLetter");
const appInterviewDate = document.getElementById("interview-date");
const appInterviewType = document.getElementById("interview-format-1");
const appInterviewQs = document.getElementById("interview-questions-1");
const appCompany = document.getElementById("company-name");

// Fetch the application data from IndexedDB based on appQuery (e.g., company name or ID)
const curApp = await db.getAppByID(appQuery);

if (curApp) {
  console.log("Application data loaded:", curApp);
  // Populate form fields with application data
  appCompany.value = curApp.companyName || "Unknown Company";
  appPosition.value = curApp.position || "Position not specified";
  appLocation.value = curApp.location || "Add location...";
  appContacts.value = curApp.contacts || "Add contacts...";
  appDescription.value = curApp.description || "Add description...";
  appDateApplied.value = curApp.dateApplied || "";
  appResume.value = curApp.resume || "";
  appCoverLetter.value = curApp.coverLetter || "";
  appInterviewDate.value = curApp.interviewDate || "";
  appInterviewType.value = curApp.interviewType || "";
  appInterviewQs.value = curApp.interviewQuestions || "";
} else {
  console.log("No application data found for:", appQuery);
}

// Save updated data back to IndexedDB when user modifies the form
document.getElementById("save-button").addEventListener("click", async () => {
  const updatedApp = {
    id: curApp.id, // Ensure we update the existing record
    companyName: appCompany.value,
    position: appPosition.value,
    location: appLocation.value,
    contacts: appContacts.value,
    description: appDescription.value,
    dateApplied: appDateApplied.value,
    resume: appResume.value,
    coverLetter: appCoverLetter.value,
    interviewDate: appInterviewDate.value,
    interviewType: appInterviewType.value,
    interviewQuestions: appInterviewQs.value,
  };

  try {
    await db.updateApp(curApp.id, updatedApp);
    console.log("Application updated successfully in IndexedDB!");
  } catch (err) {
    console.error("Error updating application:", err);
  }
});

// Add event listeners for file uploads (resume and cover letter)
appResume.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      curApp.resume = reader.result;
      await db.updateApp(curApp.id, curApp);
      console.log("Resume updated in IndexedDB!");
    };
    reader.readAsDataURL(file);
  }
});

appCoverLetter.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      curApp.coverLetter = reader.result;
      await db.updateApp(curApp.id, curApp);
      console.log("Cover letter updated in IndexedDB!");
    };
    reader.readAsDataURL(file);
  }
});







// Search bar functionality (if needed)
const searchBarElement = document.getElementById("search-bar");
if (searchBarElement) {
  searchBarElement.addEventListener("keyup", async (event) => {
    const query = event.target.value.toLowerCase();
    const apps = await db.getApps();
    const filteredApps = apps.filter((app) =>
      app.companyName.toLowerCase().includes(query)
    );
    console.log("Filtered Applications:", filteredApps);
    // Update UI to display filtered results
  });
}
