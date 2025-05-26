// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.onload = function () {
  alert("Page fully loaded!");
  loadPreferences();
};

// 6. Arrays and Methods - Example event list
const events = [
  { name: "Community Picnic", date: "2025-06-01", seats: 20, category: "picnic" },
  { name: "Art Workshop", date: "2025-06-15", seats: 0, category: "workshop" },
  { name: "Music Festival", date: "2025-07-05", seats: 50, category: "music" }
];

// 3. Conditionals, Loops, and Error Handling
function displayEvents() {
  const eventSection = document.getElementById("events");
  const eventCards = events.filter(ev => {
    const eventDate = new Date(ev.date);
    const today = new Date();
    return eventDate >= today && ev.seats > 0;
  });
  eventCards.forEach(ev => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.textContent = `${ev.name} on ${ev.date} (${ev.seats} seats available)`;
    eventSection.appendChild(card);
  });
}
displayEvents();

// 11. Working with Forms
const form = document.getElementById("registrationForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  try {
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const date = form.elements["date"].value;
    const eventType = form.elements["eventType"].value;

    if (!name || !email || !date || !eventType) {
      throw new Error("Please fill all required fields.");
    }

    confirmation.textContent = `Thank you, ${name}! You have registered for the ${eventType} event on ${date}.`;
    updateSeats(eventType);
    savePreferences(eventType);
  } catch (error) {
    confirmation.style.color = "red";
    confirmation.textContent = error.message;
  }
});

function updateSeats(eventName) {
  const eventObj = events.find(ev => ev.category === eventName);
  if (eventObj && eventObj.seats > 0) {
    eventObj.seats--;
  }
}

// 6. Event Handling
function validatePhone() {
  const phone = document.getElementById("phone").value;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number (e.g., 123-456-7890)");
  }
}

// 7. Video Invite with Media Events
function videoReady() {
  document.getElementById("videoMessage").textContent = "Video ready to play";
}

// 8. Saving User Preferences
function savePreferences(eventType) {
  localStorage.setItem("preferredEvent", eventType);
}

function loadPreferences() {
  const preferred = localStorage.getItem("preferredEvent");
  if (preferred) {
    const select = document.getElementById("eventType");
    select.value = preferred;
  }
}

function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared.");
}

// 9. Geolocation for Event Mapping
function findNearbyEvents() {
  const output = document.getElementById("geoOutput");
  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  output.textContent = "Locating...";

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      output.textContent = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        output.textContent = "Permission denied for location access.";
      } else if (error.code === error.TIMEOUT) {
        output.textContent = "Location request timed out.";
      } else {
        output.textContent = "Unable to retrieve your location.";
      }
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
}
