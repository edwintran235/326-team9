import { Database } from '../components/indexedDB.js';

// Initialize IndexedDB for storing user credentials
const db = new Database("appDB");
await db.openDB();

// DOM elements
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");
const signupContainer = document.getElementById("signupContainer");
const showSignup = document.getElementById("showSignup");
const showSignin = document.getElementById("showSignin");

// Toggle forms
showSignup.addEventListener("click", () => {
  signinForm.parentElement.style.display = "none";
  signupContainer.style.display = "block";
});

showSignin.addEventListener("click", () => {
  signupContainer.style.display = "none";
  signinForm.parentElement.style.display = "block";
});

// Hashing function (for simplicity)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Sign-up logic
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Check if the user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      alert("User already exists. Please sign in.");
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Add the user to IndexedDB
    await db.addUser({ email, password: hashedPassword });
    alert("Sign-up successful! Please sign in.");
    signupContainer.style.display = "none";
    signinForm.parentElement.style.display = "block";
  } catch (error) {
    console.error("Error signing up:", error);
  }
});

// Sign-in logic
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signinEmail").value.trim();
  const password = document.getElementById("signinPassword").value.trim();

  try {
    // Get the user by email from IndexedDB
    const user = await db.getUserByEmail(email);

    if (!user) {
      alert("User not found. Please sign up.");
      return;
    }

    // Hash the input password and compare
    const hashedPassword = await hashPassword(password);

    if (user.password === hashedPassword) {
      alert("Login successful!");
      sessionStorage.setItem("userEmail", email); // Store user's email in sessionStorage
      window.location.href = "./homepage.html"; // Redirect to homepage
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
});
