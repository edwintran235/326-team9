

// Add event listeners to each application box
const boxes = document.querySelectorAll(".application-box");
const columns = document.querySelectorAll(".status-column");

boxes.forEach((box) => {
  box.addEventListener("dragstart", dragStart);
  box.addEventListener("dragend", dragEnd);
});

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", dragDrop);
});

// Add event listeners to the trash can
const trashCan = document.getElementById("trash-can");
if (trashCan) {
  trashCan.addEventListener("dragover", dragOverTrash);
  trashCan.addEventListener("dragenter", dragEnterTrash);
  trashCan.addEventListener("dragleave", dragLeaveTrash);
  trashCan.addEventListener("drop", dragDropTrash);
}

// Drag and Drop Logic
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
}

function dragEnd(e) {
  e.target.style.display = "block";
}

function dragOver(e) {
  e.preventDefault(); // Allows the drop
}

function dragEnter(e) {
  e.preventDefault();
  const column = e.target.closest(".status-column");
  if (column) {
    column.classList.add("drag-over"); // Add a visual highlight to the column
  }
}

function dragLeave(e) {
  const column = e.target.closest(".status-column");
  if (column) {
    column.classList.remove("drag-over"); // Remove the highlight
  }
}

async function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain"); // Get the ID of the dragged application
  const draggable = document.getElementById(id);

  const column = e.target.closest(".status-column");
  if (column) {
    column.appendChild(draggable); // Append the dragged element to the new column
    column.classList.remove("drag-over"); // Remove the highlight

    const newStatus = column.id; // Get the new status from the column ID

    try {
      // Send an update request to the backend to update the status
      const response = await fetch(`http://localhost:3021/application/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // Update only the status field
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      console.log(`Application ${id} updated to status: ${newStatus}`);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  }
}



function dragOverTrash(e) {
  e.preventDefault(); // Allows the drop
}

function dragEnterTrash(e) {
  trashCan.classList.add("drag-over-trash");
}

function dragLeaveTrash(e) {
  trashCan.classList.remove("drag-over-trash");
}

async function dragDropTrash(e) {
  e.preventDefault();
  trashCan.classList.remove("drag-over-trash");

  const appID = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(appID);

  // Remove from DOM
  if (draggable) {
    draggable.remove();
  }

  // Remove from IndexedDB
  try {
    await db.deleteApp(parseInt(appID, 10));
    alert("Application deleted successfully!");
  } catch (error) {
    console.error("Error deleting application:", error);
  }
}

// Add Job Functionality
const modal = document.getElementById("add-popup");
const btn = document.getElementById("add-button");
const span = document.getElementsByClassName("close")[0];
const submitBtn = document.getElementById("submit");

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// let appQuery;

submitBtn.addEventListener("click", async () => {

  const companyName = document.getElementById("companyName").value;
  const position = document.getElementById("position").value;
  const location = document.getElementById("jobLocation").value;
  const contacts = document.getElementById("jobContacts").value;
  const status = document.getElementById("status").value;
  const previousStatus = null;
  const dateApplied = null;
  const dateDeleted = null;
  const hasStar = null;

  const applicationData = {
    // id: new Date().getTime(),
    companyName: companyName,
    position: position,
    location: location,
    contacts: contacts,
    status: status,
    dateApplied: document.getElementById("dateApplied").value,
    deadline: document.getElementById("deadline").value,
    previousStatus: null,
    dateDeleted: null,
    hasStar: null
  };


  try {
    console.log("data to backend ", JSON.stringify(applicationData));

    // Save the application to database
    const response = await fetch('http://localhost:3021/application', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationData)
    });


    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    const newApplication = await response.json();
    renderApplication(newApplication);

    // Clear form fields and close the modal
    document.getElementById("companyName").value = "";
    document.getElementById("position").value = "";
    document.getElementById("jobLocation").value = "";
    document.getElementById("jobContacts").value = "";
    document.getElementById("jobDescription").value = "";
    document.getElementById("dateApplied").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("status").value = "interested";
    modal.style.display = "none";

  } catch (error) {
    console.log("Error adding new application!", error);
  }
});

// render application box
function renderApplication(application) {
  // Create a new application box
  const applicationBox = document.createElement("div");
  applicationBox.className = "application-box";
  applicationBox.id = application.id; // Use application.id from the parameter
  applicationBox.draggable = true;

  // Add data-* attributes for sorting
  applicationBox.dataset.dateApplied = application.dateApplied || '';
  applicationBox.dataset.companyName = application.companyName.toLowerCase() || '';

  // Set inner HTML using application data
  applicationBox.innerHTML = `
    <span class="star-icon" title="Mark as priority">☆</span>
    ${application.companyName}<br><br>• ${application.position}<br>• ${application.location}
  `;

  // Add event listener to toggle priority on the star icon
  const starIcon = applicationBox.querySelector(".star-icon");
  starIcon.addEventListener("click", () => {
    const statusColumn = applicationBox.closest(".status-column");
    if (statusColumn) {
      const isStarred = starIcon.textContent === "★";
      starIcon.textContent = isStarred ? "☆" : "★"; // Toggle star
      applicationBox.classList.toggle("priority", !isStarred); // Add or remove the priority class

      // Reorder applications based on priority
      const boxes = Array.from(statusColumn.querySelectorAll(".application-box"));

      // Separate priority and non-priority boxes
      const priorityBoxes = boxes.filter((box) =>
        box.querySelector(".star-icon").textContent === "★"
      );
      const nonPriorityBoxes = boxes.filter((box) =>
        box.querySelector(".star-icon").textContent === "☆"
      );

      // Remove all boxes temporarily
      boxes.forEach((box) => statusColumn.removeChild(box));

      // Append priority boxes first, then non-priority boxes
      priorityBoxes.forEach((box) => statusColumn.appendChild(box));
      nonPriorityBoxes.forEach((box) => statusColumn.appendChild(box));
    }
  });

  applicationBox.addEventListener("dragstart", dragStart);
  applicationBox.addEventListener("dragend", dragEnd);

  const statusColumn = document.getElementById(application.status); // Use application.status
  if (statusColumn) {
    statusColumn.appendChild(applicationBox);
  }

  applicationBox.addEventListener("dblclick", () => {
    window.location.href = `applicationInfo.html?id=${application.id}`; // Use application.id
  });
}



// Reminder Modal
const reminder = document.getElementById("reminder-popup");
const remindButton = document.getElementById("new-reminder-button");
const remindSpan = document.getElementsByClassName("close-reminder")[0];
const remindSubmit = document.getElementById("reminder-submit");


remindButton.addEventListener("click", () => {
  reminder.style.display = "flex";
});

remindSpan.addEventListener("click", () => {
  reminder.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == reminder) {
    reminder.style.display = "none";
  }
});

// add reminder delete button functionality

function reminderDeleteListeners() {

  const deleteButtons = document.querySelectorAll('.delete-reminder');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {

      const reminderToDelete = e.target.closest('.reminder-container');
      const reminderId = reminderToDelete.dataset.id;

      if (reminderToDelete) {
        try {

          const response = await fetch(`http://localhost:3021/reminder/${reminderId}`, {
            method: 'DELETE'
          });

          if (!response.ok) {
            throw new Error("Failed to delete reminder");
          }

          reminderToDelete.remove();

        } catch (error) {
          console.log("Error deleting reminder!", error);
        }
      }
    });
  });
}

reminderDeleteListeners(); 

// create and render new reminder 

remindSubmit.addEventListener("click", async () => {
  
  const reminderText = document.getElementById("reminder-des").value;
  const reminderDate = document.getElementById("remind-date").value;

  // get data
  const reminderData = {
    description: reminderText,
    date: reminderDate
  }

  // save data
  try {
    
    console.log("data to backend ", JSON.stringify(reminderData));

    const response = await fetch('http://localhost:3021/reminder', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reminderData)
    });

    if (!response.ok) {
      throw new Error("Failed to create reminder");
    }

    const newReminder = await response.json();
    renderReminder(newReminder);

    document.getElementById("reminder-des").value = "";
    document.getElementById("remind-date").value = "";
    
    reminder.style.display = "none";

  } catch (error) {
    console.log("Error adding new reminder!", error);
  }
});

// render reminders after reload
document.addEventListener("DOMContentLoaded", async () => {
  try {
    
    const reminderResponse = await fetch('http://localhost:3021/reminder');
    const applicationResponse = await fetch('http://localhost:3021/application');
    if (!reminderResponse.ok) {
      throw new Error("Failed to load reminders");
    }
    if (!applicationResponse.ok) {
      throw new Error("Failed to load applications");
    }

    const reminders = await reminderResponse.json();
    reminders.forEach(renderReminder);

    const applications = await applicationResponse.json();
    applications.forEach(renderApplication);

  } catch (error) {
    console.log("Error fetching reminders!", error);
  }

});

// add reminders to UI
function renderReminder(reminder) {

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
  reminderDateP.textContent = `Deadline: ${new Date(reminder.date).toLocaleDateString()}`;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-reminder";
  deleteButton.textContent = "🗑 Delete";

  reminderTextDiv.appendChild(reminderName);
  reminderTextDiv.appendChild(reminderDateP);
  reminderTextDiv.appendChild(deleteButton);

  reminderRow.appendChild(reminderTextDiv);

  reminderContainer.appendChild(reminderRow);

  const currReminders = document.getElementById("add-reminder");
  if (!currReminders) {
    console.error('No element with id "add-reminder" found');
  }
  currReminders.appendChild(reminderContainer);

  reminderDeleteListeners();

}

// Dropdown event listener for sorting
const sortDropdown = document.getElementById("sort-options");

sortDropdown.addEventListener("change", () => {
  const sortOption = sortDropdown.value; // Get selected sort option

  // Get all status columns
  const statusColumns = document.querySelectorAll(".status-column");

  statusColumns.forEach((column) => {
    // Get all application boxes within the column
    const applications = Array.from(column.querySelectorAll(".application-box"));

    // Sort applications based on the selected option
    applications.sort((a, b) => {
      if (sortOption === "company") {
        // Alphabetical sort
        return a.dataset.companyName.localeCompare(b.dataset.companyName);
      } else if (sortOption === "date") {
        // Sort by date applied
        return new Date(a.dataset.dateApplied) - new Date(b.dataset.dateApplied);
      }
      return 0; // Default order (no change)
    });

    // Remove all applications from the column
    applications.forEach((app) => column.removeChild(app));

    // Re-add the applications in the sorted order
    applications.forEach((app) => column.appendChild(app));
  });
});
