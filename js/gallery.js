// ---------- 1. FIND THE THUMBNAILS ----------
const items = document.querySelectorAll(".gallery-item");

// ---------- 2. BUILD THE LIGHTBOX (hidden until needed) ----------
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Image viewer");
lightbox.setAttribute("aria-hidden", "true");

lightbox.innerHTML =
  '<button type="button" class="lightbox-close" aria-label="Close image">&times;</button>' +
  '<button type="button" class="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
  '<img class="lightbox-img" src="" alt="">' +
  '<p class="lightbox-caption"></p>' +
  '<button type="button" class="lightbox-next" aria-label="Next image">&#8250;</button>';

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");
const caption = lightbox.querySelector(".lightbox-caption");
const closeBtn = lightbox.querySelector(".lightbox-close");
const prevBtn = lightbox.querySelector(".lightbox-prev");
const nextBtn = lightbox.querySelector(".lightbox-next");

let currentIndex = 0;
let lastFocused = null; // so focus returns to the thumbnail on close

// ---------- 3. SHOW, OPEN, CLOSE ----------
function showImage(index) {
  // Wrap around at both ends
  currentIndex = (index + items.length) % items.length;

  const item = items[currentIndex];
  const thumb = item.querySelector("img");

  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = thumb.alt;
  caption.textContent = thumb.alt;
}

function openLightbox(index) {
  lastFocused = document.activeElement;
  showImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // stop the page scrolling behind
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

function isOpen() {
  return lightbox.classList.contains("open");
}

// ---------- 4. EVENTS ----------
items.forEach(function (item, index) {
  item.addEventListener("click", function () {
    openLightbox(index);
  });
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", function () { showImage(currentIndex - 1); });
nextBtn.addEventListener("click", function () { showImage(currentIndex + 1); });

// Clicking the dark background (not the image or buttons) closes it
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard: Escape closes, arrows move, Tab stays inside the lightbox
document.addEventListener("keydown", function (event) {
  if (!isOpen()) return;

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showImage(currentIndex - 1);
  } else if (event.key === "ArrowRight") {
    showImage(currentIndex + 1);
  } else if (event.key === "Tab") {
    const focusable = [closeBtn, prevBtn, nextBtn];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});