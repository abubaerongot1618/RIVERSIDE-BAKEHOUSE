// ----- 1. Get the elements-------
const form = document.getElementById("contact-form");

const firstnameInput = document.getElementById("firstname");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const typeSelect = document.getElementById("message-type");
const messageInput = document.getElementById("message");

const firstnameError = document.getElementById("firstname-error");
const surnameError = document.getElementById("surnameError");
const emailError = document.getElementById("email-error");
const typeError = document.getElementById("type-error");
const messageError = document.getElementById("message-error");

const statusBox = document.getElementById("contact-status");

// The bakery's address: the email opens addressed to this
const RECIPIENT = "inforiversidebakehouse.co.za";


// ------ 2. Helpers ---------
function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorSpan) {
  errorSpan.textContent = "";
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

// ---------- 3. Validators----------
const namePattern = /^[A-Za-z\u00C0-\u024F' -]+$/;

function validateFirstname() {
  const value = firstnameInput.value.trim();
  if (value.length < 2) {
    showError(firstnameInput, firstnameError, "Please enter your first name (at least 2 characters).");
    return false;
  }
  if (!namePattern.test(value)) {
    showError(firstnameInput, firstnameError, "Names can only contain letters, spaces, hyphens and apostrophes.");
    return false;
  }
  clearError(firstnameInput, firstnameError);
  return true;
}

function validateSurname() {
  const value = surnameInput.value.trim();
  if (value.length < 2) {
    showError(surnameInput, surnameError, "Please enter your surname (at least 2 characters).");
    return false;
  }
  if (!namePattern.test(value)) {
    showError(surnameInput, surnameError, "Names can only contain letters, spaces, hyphens and apostrophes.");
    return false;
  }
  clearError(surnameInput, surnameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value === "") {
    showError(emailInput, emailError, "Please enter your email address.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailInput, emailError, "Please enter a valid email address, for example name@example.com.");
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validateType() {
  if (typeSelect.value === "") {
    showError(typeSelect, typeError, "Please choose a type of message.");
    return false;
  }
  clearError(typeSelect, typeError);
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value.length < 10) {
    showError(messageInput, messageError, "Please write a message of at least 10 characters.");
    return false;
  }
  if (value.length > 1000) {
    showError(messageInput, messageError, "Your message is too long. Please keep it under 1000 characters.");
    return false;
  }
  clearError(messageInput, messageError);
  return true;
}

// ---------- 4.Immediate Level ----------
firstnameInput.addEventListener("blur", validateFirstname);
surnameInput.addEventListener("blur", validateSurname);
emailInput.addEventListener("blur", validateEmail);
typeSelect.addEventListener("change", validateType);
messageInput.addEventListener("blur", validateMessage);

firstnameInput.addEventListener("input", function () {
  if (firstnameInput.classList.contains("invalid")) validateFirstname();
});
surnameInput.addEventListener("input", function () {
  if (surnameInput.classList.contains("invalid")) validateSurname();
});
emailInput.addEventListener("input", function () {
  if (emailInput.classList.contains("invalid")) validateEmail();
});
messageInput.addEventListener("input", function () {
  if (messageInput.classList.contains("invalid")) validateMessage();
});

// ---------- 5. Build the email ----------
function buildMailto() {
  // Readable label of the chosen option (e.g. "Feedback"), not its value
  const typeLabel = typeSelect.options[typeSelect.selectedIndex].text;
  const fullName = firstnameInput.value.trim() + " " + surnameInput.value.trim();

  const subject = "Website message: " + typeLabel;

  const body =
    "Name: " + fullName + "\n" +
    "Email: " + emailInput.value.trim() + "\n" +
    "Type of message: " + typeLabel + "\n\n" +
    messageInput.value.trim();

  // encodeURIComponent makes spaces, line breaks and symbols safe in a URL
  return "mailto:" + RECIPIENT +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
}

// ---------- 6. Submit Handler ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const results = [
    validateFirstname(),
    validateSurname(),
    validateEmail(),
    validateType(),
    validateMessage()
  ];

  if (!results.every(function (ok) { return ok; })) {
    statusBox.textContent = "";
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const link = buildMailto();

  statusBox.textContent =
    "Thank you, " + firstnameInput.value.trim() +
    ". Your email program should now open with your message ready to send. " +
    "If nothing opens, please email us directly at " + RECIPIENT + ".";

  // Opens the user's email program with everything filled in
  window.location.href = link;

  form.reset();
});