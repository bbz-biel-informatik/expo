var spieler = document.querySelector(".player");
spieler.style.top = "150px";
spieler.style.left = "300px";

var punkteAnzeige = document.querySelector(".punkte");
var resultatAnzeige = document.querySelector(".result");
var spielfeld = document.querySelector(".playground");

var timer = 120;

var playsound = new Audio("sound/background.mp3");
var crash = new Audio("sound/MOO.wav");
var jubel = new Audio("sound/yeah.mp3");
var playing = false;
var score = 0;
var tempo = 2.5;

function reload() {
  window.location.reload();
}
document.querySelector(".again").addEventListener("click", reload);

function loop() {
  // Kommentar: sobald der Spieler mit Gegner1 oder 2 kollidiert, ist das Spiel fertig
  timer = timer - 1;

  if (timer == 0) {
    timer = Math.round(400 / tempo);
    var x = Math.random() * 400;
    var y = Math.random() * 800;
    var h = document.createElement("div");
    h.classList.add("gabel");
    h.style.bottom = x + "px";
    h.style.right = "0px";
    spielfeld.appendChild(h);

    /*Elemente generieren*/
    var k = document.createElement("div");
    k.classList.add("gabel");
    k.style.top = 80 - x + "px";
    k.style.right = "0px";
    k.style.transform = "rotate(180deg)";
    spielfeld.appendChild(k);

    var w = document.createElement("div");
    w.classList.add("wand");
    w.style.top = "0px";
    w.style.right = "0px";
    spielfeld.appendChild(w);

    var g = document.createElement("div");
    g.classList.add("gurke");
    g.style.top = y + "px";
    g.style.right = "0px";
    spielfeld.appendChild(g);
  }

  /*Elemente verschieben*/
  var waende = document.querySelectorAll(".wand");
  for (var wand of waende) {
    wand.style.right = parseInt(wand.style.right) + tempo + "px";
    tempo = tempo + 0.001;
    if (parseInt(wand.style.right) > spielfeld.clientWidth) {
      wand.parentNode.removeChild(wand);
    }
  }

  var gabeln = document.querySelectorAll(".gabel");
  for (var gabel of gabeln) {
    gabel.style.right = parseInt(gabel.style.right) + tempo + "px";
    tempo = tempo + 0.001;
    if (parseInt(gabel.style.right) > spielfeld.clientWidth) {
      gabel.parentNode.removeChild(gabel);
    }
  }

  /*Gurke*/
  var gurken = document.querySelectorAll(".gurke");
  for (var gurke of gurken) {
    gurke.style.right = parseInt(gurke.style.right) + tempo + "px";
    tempo = tempo + 0.001;
    if (parseInt(gurke.style.right) > spielfeld.clientWidth) {
      gurke.parentNode.removeChild(gurke);
    }
  }

  /*Kollisonen*/
  if (anyCollision(spieler, gabeln)) {
    crash.play();
    playsound.pause();
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".punkte").style.position = "static";
    playing = false;
    var user = prompt("benutzername");
    if (!user) {
      return;
    }

    /*externe Datenbank für Bestenliste*/
    var formData = new FormData();

    formData.append("game", "Cheesjump");
    formData.append("name", user);
    formData.append("score", score);

    var request = new XMLHttpRequest();
    request.open("POST", "https://scores.bbz.cloud/score");
    request.send(formData);

    return;
  }

  var kollisionen = allCollisions(spieler, waende);
  if (kollisionen.length > 0) {
    score = score + 1;
    punkteAnzeige.textContent = score;
    resultatAnzeige.textContent = score;
    wand = kollisionen[0];
    wand.parentNode.removeChild(wand);
  }
  var guerkli = allCollisions(spieler, gurken);
  for (var gurke of guerkli) {
    jubel.play();
    score = score + 1;
    punkteAnzeige.textContent = score;
    resultatAnzeige.textContent = score;
    gurke.parentNode.removeChild(gurke);
  }

  /*Steuerung*/
  if (keyboard(38) && parseInt(spieler.style.top) > 0) {
    spieler.style.top = parseInt(spieler.style.top) - 5 - (0.3 * tempo) + "px";
  } else if (
    keyboard(40) &&
    parseInt(spieler.style.top) < spielfeld.clientHeight - spieler.clientHeight
  ) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + (0.3 * tempo) + "px";
  } else if (keyboard(37) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 5 - (0.3 * tempo) + "px";
  } else if (
    keyboard(39) &&
    parseInt(spieler.style.left) < spielfeld.clientWidth - spieler.clientWidth
  ) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + (0.3 * tempo) + "px";
  }

  window.requestAnimationFrame(loop);
}

document.querySelector("#start").addEventListener("click", function () {
  if (!playing) {
    playsound.play();
    window.requestAnimationFrame(loop);
    playing = true;
    document.querySelector("#start").style.display = "none";
  }
});

window.addEventListener("keydown", function (event) {
  if (!playing && event.keyCode == 13) {
    playsound.play();
    window.requestAnimationFrame(loop);
    playing = true;
    document.querySelector("#start").style.display = "none";
  }
});
