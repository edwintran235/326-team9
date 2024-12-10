async function fetchAppData(applicationId) {

  try {

    const response = await fetch(`http://localhost:3021/application/application/${applicationId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch application details. Status: ${response.status}`);
    }

    const applicationData = await response.json();
    console.log("fetched data: ", applicationData);


    appDetails(applicationData);

    // Fetch reminders
    const reminderResponse = await fetch('http://localhost:3021/reminder');
    if (!reminderResponse.ok) {
      throw new Error("Failed to fetch reminders");
    }
    const reminders = await reminderResponse.json();
    console.log("Fetched reminders: ", reminders);

    // Render the reminders
    reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
    reminders.forEach(renderReminderWithoutDelete);


  } catch (error) {
    console.error("Error fetching application:", error);
  }

}

function appDetails(data) {

  console.log(data);

  document.getElementById("company-name").textContent = data.companyName;
  document.getElementById("jobPos").value = data.position;
  document.getElementById("jobLoc").value = data.location;
  document.getElementById("jobCon").value = data.contacts;
  document.getElementById("jobDesc").value = data.description;
  document.getElementById("applied").value = data.dateApplied;
}


async function fetchNoteData(applicationId) {

  try {

    const response = await fetch(`http://localhost:3021/interview/${applicationId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch note details. Status: ${response.status}`);
    }

    console.log("fetched note data: ", noteData);
    noteDetails(noteData)

    appDetails(noteData);

    // Fetch reminders
    const reminderResponse = await fetch('http://localhost:3021/interview/questions');
    if (!reminderResponse.ok) {
      throw new Error("Failed to fetch notes");
    }
    const reminders = await reminderResponse.json();
    console.log("Fetched notes: ", questions);

    interviewNotes.forEach(note => {
      const noteDiv = document.createElement("div");
      noteDiv.className = "note-item";
      noteDiv.innerHTML = `<strong>Question:</strong> ${note.questions}`;
      container.appendChild(noteDiv);
  });

  } catch (error) {
    console.error("Error fetching notes:", error);
  }

}


function noteDetails(data) {
  console.log(data);
  document.getElementById("interview-questions").textContent = data.questions;
}

function getApplicationIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id'); 
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the application ID from the URL
  const applicationId = getApplicationIdFromURL();
  console.log('Fetched Application ID:', applicationId);


  if (applicationId) {
      // Fetch and display the application data
      fetchAppData(applicationId);
  } else {
      alert("Application ID not found in the URL.");
  }
});

function renderReminderWithoutDelete(reminder) {
  const reminderContainer = document.createElement("div");
  reminderContainer.className = "reminder-container";
  reminderContainer.dataset.id = reminder.id;

  const reminderRow = document.createElement("div");
  reminderRow.className = "reminder-row";

  const reminderTextDiv = document.createElement("div");
  reminderTextDiv.className = "reminder-text";

  const reminderName = document.createElement("p");
  reminderName.className = "reminder-name";
  reminderName.textContent = reminder.description;

  const reminderDateP = document.createElement("p");
  reminderDateP.className = "reminder-date";

  const reminderDate = new Date(reminder.date);
  const reminderToDate = reminderDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
  reminderDateP.textContent = `Deadline: ${reminderToDate}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (reminderDate < today) {
    reminderDateP.style.color = 'red';
  }

  reminderTextDiv.appendChild(reminderName);
  reminderTextDiv.appendChild(reminderDateP);

  reminderRow.appendChild(reminderTextDiv);
  reminderContainer.appendChild(reminderRow);

  const currReminders = document.getElementById("add-reminder");
  currReminders.appendChild(reminderContainer);

}

// async function fetchInterviewNotes(applicationId) {
//   try {
//     // Fetch interview notes for the application
//     const response = await fetch(`http://localhost:3021/interview/${applicationId}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch interview notes. Status: ${response.status}`);
//     }
//     const interviewNotes = await response.json();
//     console.log("Fetched interview notes: ", interviewNotes);

//     // Render interview notes
//     renderInterviewNotes(interviewNotes);
//   } catch (error) {
//     console.error("Error fetching interview notes:", error);
//   }
// }

// function renderInterviewNotes(interviewNotes) {
//   const container = document.getElementById("interview-questions");
//   container.innerHTML = ""; // Clear existing notes

//   interviewNotes.forEach(note => {
//       const noteDiv = document.createElement("div");
//       noteDiv.className = "note-item";
//       noteDiv.innerHTML = `<strong>Question:</strong> ${note.questions}`;
//       container.appendChild(noteDiv);
//   });
// }
