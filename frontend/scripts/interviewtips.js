// Function to handle form submission
function submitTip() {
    const personName = document.getElementById("person-name").value;
    const companyName = document.getElementById("company-name").value;
    const category = document.getElementById("category").value;
    const tipContent = document.getElementById("tip-content").value;

    if (!personName || !companyName || !tipContent) {
        alert("Please fill out all fields!");
        return;
    }

    // Create a new tip container
    const newTip = document.createElement("div");
    newTip.classList.add("tip");
    newTip.innerHTML = `
        <p><strong>${personName}</strong> from <em>${companyName}</em></p>
        <p>${tipContent}</p>
    `;

    // Append the new tip to the corresponding category
    const categoryContainer = document.getElementById(category);

    // Create a new row if none exist or the last row is full
    let lastRow = categoryContainer.lastElementChild;
    if (!lastRow || lastRow.children.length >= 3) { // Assuming 3 tips per row
        lastRow = document.createElement("div");
        lastRow.classList.add("tips-row");
        categoryContainer.appendChild(lastRow);
    }

    // Add the tip to the last row
    lastRow.appendChild(newTip);

    // Reset the form and close the modal
    closeTipForm();
    document.getElementById("tip-form-modal").reset();
}

// Function to open the form modal
function openTipForm() {
    document.getElementById("tip-form-modal").classList.remove("hidden");
}

// Function to close the form modal
function closeTipForm() {
    document.getElementById("tip-form-modal").classList.add("hidden");
    document.getElementById("person-name").value = "";
    document.getElementById("company-name").value = "";
    document.getElementById("tip-content").value = "";
    document.getElementById("category").value = "general-tips";
}
