// ---------- 1. SETTINGS AND ELEMENTS ----------
const MAX_QTY = 50;

const form = document.getElementById("order-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const fulfillmentSelect = document.getElementById("fulfillment");
const dateInput = document.getElementById("pickup-date");
const addressInput = document.getElementById("address");
const paymentRadios = form.querySelectorAll('input[name="payment"]');

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const dateError = document.getElementById("pickup-date-error");
const addressError = document.getElementById("address-error");
const paymentError = document.getElementById("payment-error");

const summaryLines = document.getElementById("summary-lines");
const summaryEmpty = document.getElementById("summary-empty");
const warning = document.querySelector(".empty-warning");
const confirmation = document.getElementById("order-confirmation");

// ---------- 2. HELPERS ----------
function makeEl(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.className = className;
  return el;
}

function formatMoney(cents) {
  return "R" + (cents / 100).toFixed(2);
}

function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  if (input) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  }
}

function clearError(input, errorSpan) {
  errorSpan.textContent = "";
  if (input) {
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  }
}

function showWarning(message) {
  warning.textContent = "\u26A0 " + message;
  warning.classList.add("show");
}

function hideWarning() {
  warning.classList.remove("show");
}

// You cannot choose a date in the past
dateInput.min = todayString();

// ---------- 3. READ THE ITEM ROWS FROM THE PAGE ----------
// Names and prices come from the HTML itself, so nothing is repeated here
const items = Array.from(document.querySelectorAll(".order-row")).map(function (row) {
  const input = row.querySelector('input[type="number"]');
  input.min = 0;
  input.max = MAX_QTY;
  input.step = 1;

  return {
    row: row,
    input: input,
    name: row.querySelector("label").textContent.trim(),
    // "R25.00" -> 2500 (cents, to avoid decimal rounding errors)
    priceCents: Math.round(parseFloat(row.querySelector(".price").textContent.replace(/[^0-9.]/g, "")) * 100)
  };
});

function readOrder() {
  const chosen = [];
  let totalCents = 0;
  let bad = false;

  items.forEach(function (item) {
    const raw = item.input.value.trim();
    const qty = raw === "" ? 0 : Number(raw);
    const ok = Number.isInteger(qty) && qty >= 0 && qty <= MAX_QTY;

    item.input.classList.toggle("invalid", !ok);
    item.row.classList.toggle("has-quantity", ok && qty > 0);

    if (!ok) {
      bad = true;
      return;
    }
    if (qty > 0) {
      const lineCents = qty * item.priceCents;
      chosen.push({ name: item.name, qty: qty, lineCents: lineCents });
      totalCents += lineCents;
    }
  });

  return { chosen: chosen, totalCents: totalCents, bad: bad };
}

// ---------- 4. LIVE SUMMARY ----------
function updateSummary() {
  const order = readOrder();

  summaryLines.innerHTML = "";
  summaryEmpty.hidden = order.chosen.length > 0;

  order.chosen.forEach(function (item) {
    const line = makeEl("div", "", "summary-line");
    line.append(
      makeEl("span", item.qty + " \u00D7 " + item.name),
      makeEl("span", formatMoney(item.lineCents), "summary-price")
    );
    summaryLines.appendChild(line);
  });

  if (order.chosen.length > 0) {
    const total = makeEl("div", "", "summary-total");
    total.append(
      makeEl("span", "Estimated total"),
      makeEl("span", formatMoney(order.totalCents))
    );
    summaryLines.appendChild(total);
  }

  if (order.bad) {
    showWarning("Quantities must be whole numbers from 0 to " + MAX_QTY + ".");
  } else if (order.chosen.length > 0) {
    hideWarning();
  }

  return order;
}

// ---------- 5. VALIDATORS ----------
function validateName() {
  const value = nameInput.value.trim();
  if (value.length < 2) {
    showError(nameInput, nameError, "Please enter your full name (at least 2 characters).");
    return false;
  }
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailInput, emailError, "Please enter a valid email address, for example name@example.com.");
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validatePhone() {
  const value = phoneInput.value.replace(/[\s-]/g, "");
  if (value === "") {
    showError(phoneInput, phoneError, "Please enter your phone number.");
    return false;
  }
  if (!/^(0|\+27)[0-9]{9}$/.test(value)) {
    showError(phoneInput, phoneError, "Please enter a valid South African number, for example 0632198701.");
    return false;
  }
  clearError(phoneInput, phoneError);
  return true;
}

function validateDate() {
  const value = dateInput.value;
  if (value === "") {
    showError(dateInput, dateError, "Please choose a date.");
    return false;
  }
  // ISO dates (YYYY-MM-DD) compare correctly as text
  if (value < todayString()) {
    showError(dateInput, dateError, "Please choose today or a future date.");
    return false;
  }
  clearError(dateInput, dateError);
  return true;
}

function validateAddress() {
  if (fulfillmentSelect.value !== "delivery") {
    clearError(addressInput, addressError);
    return true;
  }
  if (addressInput.value.trim().length < 10) {
    showError(addressInput, addressError, "Please enter your full delivery address (street, suburb and city).");
    return false;
  }
  clearError(addressInput, addressError);
  return true;
}

function validatePayment() {
  if (!form.querySelector('input[name="payment"]:checked')) {
    showError(null, paymentError, "Please choose a payment method.");
    return false;
  }
  clearError(null, paymentError);
  return true;
}

// ---------- 6. IMMEDIATE FEEDBACK ----------
items.forEach(function (item) {
  item.input.addEventListener("input", updateSummary);
});

nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
dateInput.addEventListener("change", validateDate);
addressInput.addEventListener("blur", validateAddress);

fulfillmentSelect.addEventListener("change", validateAddress);

paymentRadios.forEach(function (radio) {
  radio.addEventListener("change", validatePayment);
});

[nameInput, emailInput, phoneInput, addressInput].forEach(function (input) {
  input.addEventListener("input", function () {
    if (!input.classList.contains("invalid")) return;
    if (input === nameInput) validateName();
    if (input === emailInput) validateEmail();
    if (input === phoneInput) validatePhone();
    if (input === addressInput) validateAddress();
  });
});

// ---------- 7. CONFIRMATION ----------
function showConfirmation(order) {
  const reference = "RB-" + todayString().replace(/-/g, "") + "-" + Math.floor(100 + Math.random() * 900);
  const isDelivery = fulfillmentSelect.value === "delivery";
  const paymentNames = {
    card: "Card (on collection or delivery)",
    eft: "EFT / bank transfer",
    cash: "Cash (on collection or delivery)"
  };
  const payment = form.querySelector('input[name="payment"]:checked').value;

  confirmation.innerHTML = "";
  confirmation.appendChild(makeEl("h2", "Order received"));
  confirmation.appendChild(makeEl("p", "Thank you, " + nameInput.value.trim() + ". Your order reference is " + reference + "."));

  order.chosen.forEach(function (item) {
    const line = makeEl("div", "", "summary-line");
    line.append(
      makeEl("span", item.qty + " \u00D7 " + item.name),
      makeEl("span", formatMoney(item.lineCents))
    );
    confirmation.appendChild(line);
  });

  const total = makeEl("div", "", "summary-total");
  total.append(makeEl("span", "Estimated total"), makeEl("span", formatMoney(order.totalCents)));
  confirmation.appendChild(total);

  confirmation.appendChild(makeEl("p", (isDelivery ? "Delivery" : "Store pickup") + " on " + dateInput.value + "."));
  if (isDelivery) {
    confirmation.appendChild(makeEl("p", "Address: " + addressInput.value.trim()));
  }
  confirmation.appendChild(makeEl("p", "Payment: " + paymentNames[payment] + "."));
  confirmation.appendChild(makeEl("p", "We will confirm your final total by email at " + emailInput.value.trim() + "."));
}

// ---------- 8. SUBMIT ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const order = updateSummary();

  // Run every check so all errors show at once
  const fieldChecks = [
    validateName(),
    validateEmail(),
    validatePhone(),
    validateDate(),
    validateAddress(),
    validatePayment()
  ];

  let itemsOk = true;
  if (order.bad) {
    itemsOk = false;
  } else if (order.chosen.length === 0) {
    showWarning("Please select at least one item before submitting.");
    itemsOk = false;
  }

  if (!fieldChecks.every(function (ok) { return ok; }) || !itemsOk) {
    confirmation.innerHTML = "";
    const target =
      form.querySelector(".invalid") ||
      (warning.classList.contains("show") ? warning : paymentError);
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    if (target.matches("input, select, textarea")) target.focus();
    return;
  }

  showConfirmation(order);
  form.reset();
  updateSummary();
  confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---------- 9. START ----------
updateSummary();