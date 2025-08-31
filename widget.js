let schnecke = document.getElementById("schnecke");
let likeInfo = document.getElementById("likeInfo");

let position = 0;
let previousLikes = 0;
const likeZiel = 150000; // Dein Ziel

async function fetchLikes() {
  try {
    const response = await fetch("ws://localhost:21213/"); // Hier kommt deine Tikfinity-API rein
    const data = await response.json();

    const aktuelleLikes = data.likes;

    // Schnecke bewegt sich bei neuen Likes
    if (aktuelleLikes > previousLikes) {
      let neueLikes = aktuelleLikes - previousLikes;
      position += neueLikes * 5; // z. B. 5px pro Like
      schnecke.style.left = position + "px";
    }

    // Text aktualisieren
    likeInfo.textContent = `Likes: ${aktuelleLikes} / ${likeZiel}`;
    previousLikes = aktuelleLikes;

  } catch (error) {
    console.error("Fehler beim Abrufen der Likes:", error);
  }
}

// Alle 5 Sekunden aktualisieren
setInterval(fetchLikes, 5000);
