let schnecke = document.getElementById("schnecke");
let likeInfo = document.getElementById("likeInfo");
let progressBar = document.getElementById("progressBar");
let progressText = document.getElementById("progressText");

let position = 0;
let previousLikes = 0;
const likeZiel = 150000;
const containerBreite = 1920;
const schneckeBreite = 250;
const maxPosition = containerBreite - schneckeBreite;
const pixelProLike = maxPosition / likeZiel;

const testMode = false;

// Funktion zum Aktualisieren der Schnecke
function updateSchnecke(likes) {
  if (likes > previousLikes) {
    let neueLikes = likes - previousLikes;
    position += neueLikes * pixelProLike;
    if (position > maxPosition) position = maxPosition;

    schnecke.style.left = position + "px";
  }

  likeInfo.textContent = `Likes: ${likes} / ${likeZiel}`;

  let prozent = Math.min((likes / likeZiel) * 100, 100).toFixed(1);
  progressBar.style.width = `${prozent}%`;
  progressText.textContent = `${prozent}%`;

  previousLikes = likes;
}

// Testmodus: Likes simulieren
function simulateLikes() {
  let fakeLikes = previousLikes + Math.floor(Math.random() * 700 + 400);
  updateSchnecke(fakeLikes);
}

setInterval(() => {
  if (testMode) {
    simulateLikes();
  }
}, 1000);

// WebSocket-Verbindung zu TikFinity
const socket = new WebSocket("ws://localhost:21213/");

socket.onopen = () => {
  console.log("✅ Verbindung zu TikFinity hergestellt.");
};

socket.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);

    if (message.event === "like") {
      // Achtung: Struktur kann je nach TikFinity-Version variieren
      const likes = message.data.totalLikeCount || message.data.likeCount || 0;
      updateSchnecke(likes);
    }
  } catch (err) {
    console.error("❌ Fehler beim Verarbeiten der Nachricht:", err);
  }
};

socket.onerror = (error) => {
  console.error("❌ WebSocket-Fehler:", error);
};
