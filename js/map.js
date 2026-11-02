
// Approximate demo position (the bakery is fictional)
const BAKERY_LAT = -26.1728;
const BAKERY_LNG = 28.0631;

// Create the map inside <div id="map">, centred on the bakery
const map = L.map("map").setView([BAKERY_LAT, BAKERY_LNG], 15);

// Map pictures from CARTO, built on OpenStreetMap data.
// The attribution text is required, so keep it.
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  subdomains: "abcd",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// Pin with a popup that opens straight away
L.marker([BAKERY_LAT, BAKERY_LNG])
  .addTo(map)
  .bindPopup("<strong>Riverside Bakehouse</strong><br>10 St Patrick Road, Johannesburg")
  .openPopup();