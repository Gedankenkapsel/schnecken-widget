let schnecke = document.getElementById("schnecke");
let likeInfo = document.getElementById("likeInfo");

let position = 0;
let previousLikes = 0;
const likeZiel = 150000; // Dein Ziel

const testMode = true; // ⬅️ Ändere auf false für echten Livemodus

function updateSchnecke(likes) {
  if (likes > previousLikes) {
    let neueLikes = likes - previousLikes;
    position += neueLikes * 5; // z. B. 5px pro Like
    schnecke.style.left = position + "px";
  }

  likeInfo.textContent = `Likes: ${likes} / ${likeZiel}`;
  previousLikes = likes;
}

async function fetchLikes() {
  try {
    const response = await fetch("ws://localhost:21213/"); // Tikfinity-API
    const data = await response.json();
    const aktuelleLikes = data.likes;
    updateSchnecke(aktuelleLikes);
  } catch (error) {
    console.error("Fehler beim Abrufen der Likes:", error);
  }
}

function simulateLikes() {
  let fakeLikes = previousLikes + Math.floor(Math.random() * 50 + 10); // 10–60 Likes pro Tick
  updateSchnecke(fakeLikes);
}

// Alle 0.5 Sekunden aktualisieren
setInterval(() => {
  if (testMode) {
    simulateLikes();
  } else {
    fetchLikes();
  }
}, 500);
