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

function updateSchnecke(likes) {
  // Schnecke bewegen
  if (likes > previousLikes) {
    let neueLikes = likes - previousLikes;
    position += neueLikes * pixelProLike;
    if (position > maxPosition) position = maxPosition;

    schnecke.style.left = position + "px";
  }

  // Like-Zähler aktualisieren
  likeInfo.textContent = `Likes: ${likes} / ${likeZiel}`;

  // Fortschrittsbalken aktualisieren
  let prozent = Math.min((likes / likeZiel) * 100, 100).toFixed(1);
  progressBar.style.width = `${prozent}%`;
  progressText.textContent = `${prozent}%`;

  previousLikes = likes;
}

function simulateLikes() {
  let fakeLikes = previousLikes + Math.floor(Math.random() * 700 + 400);
  updateSchnecke(fakeLikes);
}

setInterval(() => {
  if (testMode) {
    simulateLikes();
  }
}, 1000);

