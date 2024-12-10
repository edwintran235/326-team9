// // Initialize the IndexedDB
// const db = new Database("appDB");
// await db.openDB();

// // Name Form Handling
// const nameButton = document.getElementById("namesubmit");
// const nameInput = document.getElementById("nameInput");
// const nameForm = document.getElementById("nameForm");
// const displayName = document.getElementById("displayName");

// // Description Form Handling
// const descriptionForm = document.getElementById("descriptionForm");
// const paragraphInput = document.getElementById("paragraphInput");

// // Function to handle name submission and save it in IndexedDB
// async function handleNameChange(event) {
//   event.preventDefault();
//   const enteredName = nameInput.value;

//   // Save name in IndexedDB
//   await db.updateApp("profileName", { id: "profileName", name: enteredName });
//   displayUserName(); // Update the display immediately
// }

// // Function to load and display the user's name from IndexedDB
// async function displayUserName() {
//   const storedNameEntry = await db.getAppByID("profileName");
//   if (storedNameEntry && storedNameEntry.name) {
//     displayName.textContent = storedNameEntry.name;
//   }
// }

// // Function to handle description submission and save it in IndexedDB
// async function handleDescriptionChange(event) {
//   event.preventDefault();
//   const enteredDescription = paragraphInput.value;

//   // Save description in IndexedDB
//   await db.updateApp("profileDescription", {
//     id: "profileDescription",
//     description: enteredDescription,
//   });
//   displayUserDescription(); // Update the display immediately
// }

// // Function to load and display the user's description from IndexedDB
// async function displayUserDescription() {
//   const storedDescriptionEntry = await db.getAppByID("profileDescription");
//   if (storedDescriptionEntry && storedDescriptionEntry.description) {
//     paragraphInput.value = storedDescriptionEntry.description;
//   }
// }

// // Event listeners for form submissions
// nameForm.addEventListener("submit", handleNameChange);
// descriptionForm.addEventListener("submit", handleDescriptionChange);

// // Load stored name and description when the page loads
// window.onload = async () => {
//   await displayUserName();
//   await displayUserDescription();
// };

// // Resume and Cover Letter Upload Handling
// document
//   .getElementById("documentsForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const resumeInput = document.getElementById("resumeInput");
//     const coverLetterInput = document.getElementById("coverLetterInput");

//     const resumeFile = resumeInput.files[0];
//     const coverLetterFile = coverLetterInput.files[0];

//     if (resumeFile) {
//       const reader = new FileReader();
//       reader.readAsDataURL(resumeFile);
//       reader.onload = async function (event) {
//         const base64Resume = event.target.result;

//         // Save resume in IndexedDB
//         await db.updateApp("resume", { id: "resume", data: base64Resume });
//         document.getElementById("uploadStatus").textContent =
//           "Resume uploaded and saved to IndexedDB!";
//       };
//       reader.onerror = function () {
//         document.getElementById("uploadStatus").textContent =
//           "Error reading the resume file.";
//       };
//     } else {
//       document.getElementById("uploadStatus").textContent =
//         "No resume file selected.";
//     }

//     if (coverLetterFile) {
//       const reader = new FileReader();
//       reader.readAsDataURL(coverLetterFile);
//       reader.onload = async function (event) {
//         const base64CoverLetter = event.target.result;

//         // Save cover letter in IndexedDB
//         await db.updateApp("coverLetter", {
//           id: "coverLetter",
//           data: base64CoverLetter,
//         });
//         document.getElementById("uploadStatus").textContent +=
//           " Cover Letter uploaded and saved to IndexedDB!";
//       };
//       reader.onerror = function () {
//         document.getElementById("uploadStatus").textContent +=
//           " Error reading the cover letter file.";
//       };
//     } else {
//       document.getElementById("uploadStatus").textContent +=
//         " No cover letter file selected.";
//     }
//   });

// // Button to view the stored resume
// document.getElementById("viewResume").addEventListener("click", async function () {
//   const storedResume = await db.getAppByID("resume");

//   if (storedResume && storedResume.data) {
//     const link = document.createElement("a");
//     link.href = storedResume.data;
//     link.download = "Resume"; // Default download name
//     link.click();
//   } else {
//     document.getElementById("uploadStatus").textContent =
//       "No resume found in IndexedDB.";
//   }
// });

// // Button to view the stored cover letter
// document
//   .getElementById("viewCoverLetter")
//   .addEventListener("click", async function () {
//     const storedCoverLetter = await db.getAppByID("coverLetter");

//     if (storedCoverLetter && storedCoverLetter.data) {
//       const link = document.createElement("a");
//       link.href = storedCoverLetter.data;
//       link.download = "Cover_Letter"; // Default download name
//       link.click();
//     } else {
//       document.getElementById("uploadStatus").textContent =
//         "No cover letter found in IndexedDB.";
//     }
//   });

async function fetchDeletedApplications() {
  try {
      const response = await fetch('http://localhost:3021/applications/deleted');
      if (!response.ok) {
          throw new Error("Failed to fetch deleted applications.");
      }

      const deletedApplications = await response.json();
      renderDeletedApplications(deletedApplications);
  } catch (error) {
      console.error("Error fetching deleted applications:", error);
  }
}

function renderDeletedApplications(deletedApplications) {
  const deletedColumn = document.getElementById("deleted-applications");
  deletedColumn.innerHTML = ""; // Clear existing applications

  deletedApplications.forEach(application => {
      const appBox = document.createElement("div");
      appBox.className = "application-box";
      appBox.id = `app-${application.id}`;

      appBox.innerHTML = `
          <div class="application-content">
              <h4>${application.companyName}</h4>
              <button class="restore-btn" onclick="restoreApplication('${application.id}')">Restore</button>
              <button class="delete-btn" onclick="permanentlyDelete('${application.id}')">Delete Permanently</button>
          </div>
      `;

      deletedColumn.appendChild(appBox);
  });
}

// Call this function on page load to fetch and render deleted applications
document.addEventListener("DOMContentLoaded", fetchDeletedApplications);
async function restoreApplication(id) {
  try {
      const response = await fetch(`http://localhost:3021/applications/restore/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          alert('Application restored successfully!');
          fetchDeletedApplications(); // Refresh the deleted applications
      } else {
          alert('Failed to restore application.');
      }
  } catch (error) {
      console.error("Error restoring application:", error);
  }
}
async function permanentlyDelete(id) {
  try {
      const response = await fetch(`http://localhost:3021/applications/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          alert('Application permanently deleted.');
          fetchDeletedApplications(); // Refresh the deleted applications
      } else {
          alert('Failed to delete application.');
      }
  } catch (error) {
      console.error("Error permanently deleting application:", error);
  }
}
