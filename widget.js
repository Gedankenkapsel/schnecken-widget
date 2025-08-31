let schnecke = document.getElementById("schnecke");
let likeInfo = document.getElementById("likeInfo");

let position = 0;
let previousLikes = 0;
const likeZiel = 150000;
const containerBreite = 1920;
const schneckeBreite = 250;
const maxPosition = containerBreite - schneckeBreite;
const pixelProLike = maxPosition / likeZiel;

const testMode = true;

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

function simulateLikes() {
  let fakeLikes = previousLikes + Math.floor(Math.random() * 200 + 80);
  updateSchnecke(fakeLikes);
}

setInterval(() => {
  if (testMode) {
    simulateLikes();
  }
}, 1000);

