/* =========================================================
   1. Select the elements
   ========================================================= */
const form       = document.getElementById("loginForm");
const email      = document.getElementById("email");
const password   = document.getElementById("password");
const remember   = document.getElementById("remember");
const toggleBtn  = document.getElementById("togglePassword");
const messageBox = document.getElementById("message");


/* =========================================================
   2. Demo account
   Only for practice. A real site never keeps passwords in
   JavaScript - the server checks them.
   ========================================================= */
const DEMO_EMAIL    = "student@example.com";
const DEMO_PASSWORD = "Student@123";
const MAX_ATTEMPTS  = 3;
let attemptsLeft    = MAX_ATTEMPTS;


/* =========================================================
   3. Show an error, or mark a field as correct
   Bootstrap shows .invalid-feedback automatically when the
   input before it has the class .is-invalid
   ========================================================= */
function setError(input, message) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  input.parentElement.querySelector(".invalid-feedback").textContent = message;
}

function setSuccess(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  input.parentElement.querySelector(".invalid-feedback").textContent = "";
}

// one helper so every validator ends the same way
function finish(input, message) {
  if (message) {
    setError(input, message);
    return false;
  }
  setSuccess(input);
  return true;
}


/* =========================================================
   4. One function per field - each returns true or false
   ========================================================= */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail() {
  const value = email.value.trim();
  let message = "";

  if (value === "")                    message = "Email is required";
  else if (!emailPattern.test(value))  message = "Enter a valid email, like name@example.com";

  return finish(email, message);
}

function validatePassword() {
  const value = password.value;
  let message = "";

  if (value === "")            message = "Password is required";
  else if (value.length < 8)   message = "Password must be at least 8 characters";

  return finish(password, message);
}


/* =========================================================
   5. Pick the right validator for a field - switch
   ========================================================= */
function validateField(input) {
  switch (input.id) {
    case "email":    return validateEmail();
    case "password": return validatePassword();
    default:         return true;     // checkbox and buttons
  }
}


/* =========================================================
   6. Show a Bootstrap alert at the top of the form
   type is "success", "warning" or "danger"
   ========================================================= */
function showMessage(text, type) {
  messageBox.textContent = "";                 // remove the old message

  const alertBox = document.createElement("div");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = text;

  messageBox.append(alertBox);
}


/* =========================================================
   7. Show / hide the password
   ========================================================= */
toggleBtn.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    password.type = "password";
    toggleBtn.textContent = "Show";
  }
});


/* =========================================================
   8. Live validation
   ========================================================= */

// check a field when the user leaves it
form.addEventListener("focusout", (event) => {
  // moving from the password box to the Show button is not "leaving"
  if (event.relatedTarget === toggleBtn) return;
  validateField(event.target);
});

// once a field shows an error, re-check it on every keystroke,
// so the error disappears as soon as the user fixes it
form.addEventListener("input", (event) => {
  if (event.target.classList.contains("is-invalid")) {
    validateField(event.target);
  }
});


/* =========================================================
   9. Submit
   ========================================================= */
form.addEventListener("submit", (event) => {
  event.preventDefault();          // stop the page from reloading

  // run EVERY validator so every error shows at once
  const validators = [validateEmail, validatePassword];
  let allValid = true;

  for (const check of validators) {
    if (!check()) {
      allValid = false;
    }
  }

  if (!allValid) {
    form.querySelector(".is-invalid").focus();
    return;
  }

  // the format is fine - now check the account
  const enteredEmail = email.value.trim().toLowerCase();

  if (enteredEmail === DEMO_EMAIL && password.value === DEMO_PASSWORD) {
    showMessage(`Welcome back, ${enteredEmail}! Remember me is ${remember.checked ? "on" : "off"}.`, "success");
    console.log("Logged in:", { email: enteredEmail, remember: remember.checked });

    attemptsLeft = MAX_ATTEMPTS;
    form.reset();
    email.classList.remove("is-valid");
    password.classList.remove("is-valid");
    password.type = "password";
    toggleBtn.textContent = "Show";
    return;
  }

  // wrong email or password
  attemptsLeft--;
  password.value = "";
  password.classList.remove("is-valid");

  if (attemptsLeft === 0) {
    showMessage("Too many failed attempts. The form is locked.", "danger");
    for (const element of form.elements) {
      element.disabled = true;
    }
    return;
  }

  showMessage(`Incorrect email or password. ${attemptsLeft} attempt(s) left.`, "warning");
  password.focus();
});