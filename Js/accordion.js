const buttons = document.querySelectorAll(".accordion-btn");

// Open one panel: show it, then animate its height from 0 to its content height
function openPanel(button, panel) {
  button.setAttribute("aria-expanded", "true");
  panel.hidden = false;
  panel.style.height = "0px";
  // Next frame, so the browser registers the starting height before the change
  requestAnimationFrame(function () {
    panel.style.height = panel.scrollHeight + "px";
  });
  // After the animation, let the height adjust naturally (e.g. on resize)
  panel.addEventListener("transitionend", function done() {
    if (button.getAttribute("aria-expanded") === "true") panel.style.height = "auto";
    panel.removeEventListener("transitionend", done);
  });
}

function closePanel(button, panel) {
  button.setAttribute("aria-expanded", "false");
  // Set the current height first, otherwise "auto" cannot be animated
  panel.style.height = panel.scrollHeight + "px";
  requestAnimationFrame(function () {
    panel.style.height = "0px";
  });
  panel.addEventListener("transitionend", function done() {
    if (button.getAttribute("aria-expanded") === "false") panel.hidden = true;
    panel.removeEventListener("transitionend", done);
  });
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = button.getAttribute("aria-expanded") === "true";

    // Close any other open panel first, so only one is open at a time
    buttons.forEach(function (other) {
      if (other !== button && other.getAttribute("aria-expanded") === "true") {
        closePanel(other, document.getElementById(other.getAttribute("aria-controls")));
      }
    });

    if (isOpen) {
      closePanel(button, panel);
    } else {
      openPanel(button, panel);
    }
  });
});