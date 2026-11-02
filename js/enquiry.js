// ---------- 1. GET THE ELEMENTS ----------
const form = document.getElementById("enquiry-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const typeSelect = document.getElementById("enquiry-type");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const typeError = document.getElementById("enquiry-type-error");
const messageError = document.getElementById("message-error");

const responseBox = document.getElementById("enquiry-response");

// ---------- 2. HELPERS ----------
// Show an error under a field and mark the field as invalid
function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

// Remove the error and the invalid styling
function clearError(input, errorSpan) {
  errorSpan.textContent = "";
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

// ---------- 3. VALIDATORS (each returns true or false) ----------
function validateName() {
  const value = nameInput.value.trim();

  if (value.length < 2) {
    showError(nameInput, nameError, "Please enter your full name (at least 2 characters).");
    return false;
  }
  // Letters, spaces, hyphens and apostrophes only
  if (!/^[A-Za-z\u00C0-\u024F' -]+$/.test(value)) {
    showError(nameInput, nameError, "Your name can only contain letters, spaces, hyphens and apostrophes.");
    return false;
  }
  clearError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showError(emailInput, emailError, "Please enter your email address.");
    return false;
  }
  // something@something.something with no spaces
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailInput, emailError, "Please enter a valid email address, for example name@example.com.");
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validatePhone() {
  // Remove spaces and hyphens so "063 219 8701" is accepted
  const value = phoneInput.value.replace(/[\s-]/g, "");

  if (value === "") {
    showError(phoneInput, phoneError, "Please enter your phone number.");
    return false;
  }
  // South African format: 0 followed by 9 digits, or +27 followed by 9 digits
  if (!/^(0|\+27)[0-9]{9}$/.test(value)) {
    showError(phoneInput, phoneError, "Please enter a valid South African number, for example 0632198701 or +27632198701.");
    return false;
  }
  clearError(phoneInput, phoneError);
  return true;
}

function validateType() {
  if (typeSelect.value === "") {
    showError(typeSelect, typeError, "Please choose a type of enquiry.");
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
  if (value.length > 500) {
    showError(messageInput, messageError, "Your message is too long. Please keep it under 500 characters.");
    return false;
  }
  clearError(messageInput, messageError);
  return true;
}

// ---------- 4. IMMEDIATE FEEDBACK ----------
// Check a field when the user leaves it, then re-check as they fix it
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
typeSelect.addEventListener("change", validateType);
messageInput.addEventListener("blur", validateMessage);

nameInput.addEventListener("input", function () {
  if (nameInput.classList.contains("invalid")) validateName();
});
emailInput.addEventListener("input", function () {
  if (emailInput.classList.contains("invalid")) validateEmail();
});
phoneInput.addEventListener("input", function () {
  if (phoneInput.classList.contains("invalid")) validatePhone();
});
messageInput.addEventListener("input", function () {
  if (messageInput.classList.contains("invalid")) validateMessage();
});

// ---------- 5. RESPONSE AFTER A VALID SUBMIT ----------
// A different follow-up depending on the type of enquiry
const responses = {
  "catering": "We’ve received your catering enquiry. Our team will check availability for your date and send you a quote within 2 business days.",
  "venue": "Thank you for your venue enquiry. We’ll confirm whether your preferred date is available and contact you with details and costs.",
  "made-to-order": "Thank you for your made-to-order enquiry. Our bakers will confirm whether we can make what you need, and send you a price and a lead time."
};

function showResponse() {
  const name = nameInput.value.trim();
  const type = typeSelect.value;

  // textContent (not innerHTML) so anything typed by the user is shown as plain text
  responseBox.textContent = "Thank you, " + name + ". " + responses[type] +
    " We’ll reply to " + emailInput.value.trim() + ".";
}

// ---------- 6. SUBMIT HANDLER ----------
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page reloading

  // Run every validator (no short-circuit, so all errors show at once)
  const results = [
    validateName(),
    validateEmail(),
    validatePhone(),
    validateType(),
    validateMessage()
  ];

  const allValid = results.every(function (ok) { return ok; });

  if (!allValid) {
    responseBox.textContent = "";
    // Move focus to the first field with an error
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  showResponse();
  form.reset();
  responseBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
});