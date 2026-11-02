
     //--------1.Elements---------

const searchInput =document.getElementById("menu-search");
const sortSelect = document.getElementById("menu-sort");
const clearBtn = document.getElementById("menu-clear");
const filterBar = document.getElementById("menu-filters");
const resultsInfo = document.getElementById("menu-count");
const grid = document.getElementById("menu-grid");

// ---------- 2. STATE (what the user has chosen) ----------
let activeCategory = "All";

// ---------- 3. Helpers----------
function formatPrice(number) {
  return "R" + number.toFixed(2);
}


// "images/x-300w.jpg" ->   "images/x-600w.jpg"
function largerImage(path) {
  return path.replace("-300w", "-600w");
}

// -------- 4. Build the category buttons from the data ---------
function buildFilters() {
  const categories = ["All"];
  PRODUCTS.forEach(function (p) {
    if (!categories.includes(p.category)) categories.push(p.category);
  });

  categories.forEach(function (cat) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn";
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.setAttribute("aria-pressed", cat === "All" ? "true" : "false");
    filterBar.appendChild(btn);
  });
}

// ---------- 5. Filter + Sort ----------
function getVisibleProducts() {
  const term = searchInput.value.trim().toLowerCase();

  let list = PRODUCTS.filter(function (p) {
    const inCategory = activeCategory === "All" || p.category === activeCategory;
    // Search the name, category and sub-category
    const text = (p.name + " " + p.category + " " + p.subcategory).toLowerCase();
    return inCategory && text.includes(term);
  });

  const sort = sortSelect.value;
  list = list.slice(); // copy so PRODUCTS keeps its original order

  if (sort === "name-asc") {
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  } else if (sort === "price-asc") {
    list.sort(function (a, b) { return a.price - b.price; });
  } else if (sort === "price-desc") {
    list.sort(function (a, b) { return b.price - a.price; });
  }
  return list;
}


// -------- 6. Drawing the cards ----------
function render() {
  const list = getVisibleProducts();
  grid.innerHTML = "";

  if (list.length === 0) {
    const msg = document.createElement("p");
    msg.className = "menu-empty";
    msg.textContent = "No items match your search. Try a different word or choose another category.";
    grid.appendChild(msg);
  }

  list.forEach(function (p) {
    const card = document.createElement("div");
    card.className = "menu-item-card";

    const img = document.createElement("img");
    img.className = "menu-item-img";
    img.src = p.image;
    img.srcset = p.image + " 300w, " + largerImage(p.image) + " 600w";
    img.sizes = "(max-width: 480px) 45vw, 200px";
    img.alt = p.alt;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "menu-item-info";

    const name = document.createElement("span");
    name.className = "menu-item-name";
    name.textContent = p.name;

    const group = document.createElement("span");
    group.className = "menu-item-group";
    group.textContent = p.subcategory || p.category;

    const price = document.createElement("span");
    price.className = "menu-item-price";
    price.textContent = formatPrice(p.price);

    info.append(name, group, price);
    card.append(img, info);
    grid.appendChild(card);
  });

  // Announced to screen readers because the element has aria-live
  resultsInfo.textContent =
    "Showing " + list.length + " of " + PRODUCTS.length + " items";
}

// ------- 7. Events --------
searchInput.addEventListener("input", render);
sortSelect.addEventListener("change", render);

filterBar.addEventListener("click", function (event) {
  const btn = event.target.closest(".filter-btn");
  if (!btn) return;

  activeCategory = btn.dataset.category;
  filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
    b.setAttribute("aria-pressed", b === btn ? "true" : "false");
  });
  render();
});


clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  sortSelect.value = "default";
  activeCategory = "All";
  filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
    b.setAttribute("aria-pressed", b.dataset.category === "All" ? "true" : "false");
  });
  render();
  searchInput.focus();
});


// ---------- 8. Start----------
buildFilters();
render();
