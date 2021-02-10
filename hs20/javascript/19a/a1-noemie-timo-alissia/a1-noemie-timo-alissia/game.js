var spieler = document.querySelector(".player");
var spielfeld = document.querySelector(".playground");
var backgroundPosition = 0;
var breite = spielfeld.clientWidth;
var punkteAnzeige = document.querySelector(".punkte");
var punkteAnzeigeTotal = document.querySelector(".totalScore");
var score = 0;
spieler.style.bottom = "0px";

var timer = new Timer(120);
var timer2 = new Timer(180);

var a = 0;

function loop() {
  // Bewegung (Scrolling) des Hintergrundes
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  if (parseInt(spieler.style.bottom) <= 0) {
    a = 0;
  }

  // Springen des Spielers
  if (keyboard(32) && parseInt(spieler.style.bottom) <= 0) {
    a = 9;
  }

  a = a - 0.2;

  spieler.style.bottom = parseInt(spieler.style.bottom) + a + "px";

  // Punkte zählen beim Laufen & auf ganze Zahl runden
  score = score + 0.1;
  punkteAnzeige.textContent = Math.floor(score);
  punkteAnzeigeTotal.textContent = Math.floor(score);

  // Bücher erstellen & am Rand verschwinden lassen
  if (timer.ready()) {
    var h = document.createElement("img");
    h.src = "Images/books.svg";
    h.classList.add("book");
    h.style.bottom = "0px";
    h.style.left = breite + "px";
    spielfeld.appendChild(h);
  }

  var books = document.querySelectorAll(".book");
  for (var book of books) {
    book.style.left = parseInt(book.style.left) - 5 + "px";
    if (parseInt(book.style.left) < -30) {
      book.parentNode.removeChild(book);
    }
  }

  // Kollision Bücher & Spieler
  if (anyCollision(spieler, books)) {
    spieler.src = "Images/töggeli_sad.png";
    var gameOver = document.querySelector(".gameover");
    gameOver.style.display = "block";
    return;
  }

  // Noten zufällig erstellen & am Rand verschwinden lassen
  if (timer2.ready()) {
    var h = document.createElement("img");
    h.classList.add("grade");
    h.style.bottom = "0px";
    h.style.left = breite + "px";
    spielfeld.appendChild(h);
    if (anyCollision(h, books)) {
      h.style.left = breite + 400 + "px";
    }
    var random = Math.random();
    if (random > 0.5) {
      h.classList.add("good");
      h.src = "Images/note6.svg";
    } else {
      h.classList.add("bad");
      h.src = "Images/note2.svg";
    }
  }

  var grades = document.querySelectorAll(".grade");
  for (var grade of grades) {
    grade.style.left = parseInt(grade.style.left) - 5 + "px";
    if (parseInt(grade.style.left) < 0) {
      grade.parentNode.removeChild(grade);
    }
  }

  // Kollision Noten & Spieler
  var goodGrades = document.querySelectorAll(".grade.good");
  if (anyCollision(spieler, goodGrades)) {
    score = score + 1;
    punkteAnzeige.textContent = Math.floor(score);
    punkteAnzeigeTotal.textContent = Math.floor(score);
  }
  var badGrades = document.querySelectorAll(".grade.bad");
  if (anyCollision(spieler, badGrades)) {
    score = score - 1;
    punkteAnzeige.textContent = Math.floor(score);
    punkteAnzeigeTotal.textContent = Math.floor(score);
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// reload Page
document.querySelector("button").addEventListener("click", () => {
  location.reload();
});
