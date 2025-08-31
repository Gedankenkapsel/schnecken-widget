let schnecke = document.getElementById("schnecke");
let likeInfo = document.getElementById("likeInfo");

let position = 0;
let previousLikes = 0;
const likeZiel = 150000;
const containerBreite = 1500;
const schneckeBreite = 200;
const maxPosition = containerBreite - schneckeBreite;
const pixelProLike = maxPosition / likeZiel;

const testMode = true; // ⬅️ true = Testmodus, false = Livemodus

function updateSchnecke(likes) {
  if (likes > previousLikes) {
    let neueLikes = likes - previousLikes;
    position += neueLikes * pixelProLike;
    if (position > maxPosition) position = maxPosition;

    schnecke.style.left = position + "px";
  }

  likeInfo.textContent = `Likes: ${likes} / ${likeZiel}`;
  previousLikes = likes;
}

async function fetchLikes() {
  try {
    const response = await fetch("ws://localhost:21213/");
    const data = await response.json();
    const aktuelleLikes = data.likes;
    updateSchnecke(aktuelleLikes);
  } catch (error) {
    console.error("Fehler beim Abrufen der Likes:", error);
  }
}

function simulateLikes() {
  let fakeLikes = previousLikes + Math.floor(Math.random() * 50 + 10);
  updateSchnecke(fakeLikes);
}

setInterval(() => {
  if (testMode) {
    simulateLikes();
  } else {
    fetchLikes();
  }
}, 1000);
