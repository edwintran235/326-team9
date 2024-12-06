// Import Database class
import { Database } from "../components/indexedDB.js";

// Initialize the database
const db = new Database("appDB");
await db.openDB();

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
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  const column = e.target.closest(".status-column");
  if (column) {
    column.appendChild(draggable); // Append the dragged element to the new column
    column.classList.remove("drag-over"); // Remove the highlight

    // Update application status in IndexedDB
    const newStatus = column.id;
    const appData = await db.getAppByID(parseInt(id, 10));
    if (appData) {
      appData.status = newStatus;
      await db.updateApp(appData.id, appData);
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

let appQuery;

submitBtn.addEventListener("click", async () => {
  const companyName = document.getElementById("companyName").value;
  const position = document.getElementById("position").value;
  const status = document.getElementById("status").value;

  const applicationData = {
    id: new Date().getTime(),
    companyName: companyName,
    position: position,
    status: status,
    dateApplied: document.getElementById("dateApplied").value,
    deadline: document.getElementById("deadline").value,
  };

  try {
    // Save the application to IndexedDB
    db.addApp(applicationData);

    // Create a new application box
    const applicationBox = document.createElement("div");
    applicationBox.className = "application-box";
    applicationBox.id = applicationData.id;
    applicationBox.draggable = true;
    applicationBox.innerHTML = companyName + "<br><br>• " + position;

    applicationBox.addEventListener("dragstart", dragStart);
    applicationBox.addEventListener("dragend", dragEnd);

    const statusColumn = document.getElementById(status);
    if (statusColumn) {
      statusColumn.appendChild(applicationBox);
    }

    appQuery = companyName;
    applicationBox.addEventListener("dblclick", () => {
      window.location.href = `applicationInfo.html?id=${applicationData.id}`;
    });

    // Clear form fields and close the modal
    document.getElementById("companyName").value = "";
    document.getElementById("position").value = "";
    document.getElementById("dateApplied").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("status").value = "interested";
    modal.style.display = "none";
  } catch (error) {
    console.log("Error adding new application.", error);
  }
});

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

remindSubmit.addEventListener("click", () => {
  const reminderText = document.getElementById("reminder-des").value;
  const reminderDate = document.getElementById("remind-date").value;

  if (!reminderText || !reminderDate) {
    alert("Please fill out both fields.");
    return;
  }

  /* const reminderData = {
    id: new Date().getTime(),
    description: reminderText,
    date: reminderDate
  }
    
    save data

  */

  try {

    // add new reminder box
    const reminderContainer = document.createElement("div");
    reminderContainer.className = "reminder-container";

    const reminderRow = document.createElement("div");
    reminderRow.className = "reminder-row";

    const reminderTextDiv = document.createElement("div");
    reminderTextDiv.className = "reminder-text";

    const reminderName = document.createElement("p");
    reminderName.className = "reminder-name";
    reminderName.textContent = reminderText;
    const reminderDateP = document.createElement("p");
    reminderDateP.className = "reminder-date";
    reminderDateP.textContent = `Deadline: ${reminderDate}`;

    reminderTextDiv.appendChild(reminderName);
    reminderTextDiv.appendChild(reminderDateP);

    const checkboxLabel = document.createElement("label");
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxLabel.appendChild(checkboxInput);

    reminderRow.appendChild(reminderTextDiv);
    reminderRow.appendChild(checkboxLabel);

    reminderContainer.appendChild(reminderRow);

    const newReminder = document.getElementById("add-reminder");
    newReminder.appendChild(reminderContainer);

    document.getElementById("reminder-des").value = "";
    document.getElementById("remind-date").value = "";
    
    reminder.style.display = "none";


  } catch (error) {
      console.log("Error adding new reminder!", error);
  }











});

export { appQuery };
