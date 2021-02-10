var spieler = document.querySelector(".player");
spieler.style.top = "60%";
spieler.style.left = "25%";
var spielfeld = document.querySelector(".playground");
var höhe = spielfeld.clientHeight;
var timer = new Timer(120);
var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

function loop() {
  if (keyboard(32)) {
    spieler.style.top = parseInt(spieler.style.top) - 13 + "px";
  }
  if (
    parseInt(spieler.style.top) < höhe - 30 &&
    parseInt(spieler.style.top) > 0
  ) {
    spieler.style.top = parseInt(spieler.style.top) + 4 + "px";
  } else {
    Gameover();
    return;
  }
  if (timer.ready()) {
    var x = Math.random();
    var h = document.createElement("div");
    h.classList.add("baumstamm");
    h.style.right = "-95px";
    h.style.top = höhe * 0.3 + x * (höhe * 0.6) + "px";
    spielfeld.appendChild(h);

    var i = document.createElement("div");
    i.classList.add("baumstamm");
    i.style.right = "-95px";
    i.style.top = höhe * -1 + x * (höhe * 0.6) + "px";
    spielfeld.appendChild(i);
  }

  var baumstaemme = document.querySelectorAll(".baumstamm");
  for (var baumstamm of baumstaemme) {
    baumstamm.style.right = parseInt(baumstamm.style.right) + 5 + "px";
    if (parseInt(baumstamm.style.right) > 500) {
      baumstamm.parentNode.removeChild(baumstamm);
      score = score + 0.5;
      punkteAnzeige.textContent = score;
    }
  }

  if (anyCollision(spieler, baumstaemme)) {
    Gameover();
    return;
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://scores.bbz.cloud/scores?game=Moodhunter");
oReq.send();

var res = document.querySelector(".leaderboard");

function reqListener() {
  var data = JSON.parse(this.responseText);
  var count = 0;
  for (var datum of data) {
    if (count >= 5) {
      return;
    }
    count++;
    res.innerHTML +=
      "<div class='score'><span>" +
      datum.score +
      "</span><span>" +
      datum.name +
      "</span></div>";
  }
}

function Gameover() {
  alert("MOOD OVER");
  alert("Refresh for new mood");
  var name = prompt("benutzername");
  var formData = new FormData();

  formData.append("game", "Moodhunter");
  formData.append("name", name);
  formData.append("score", score);

  var request = new XMLHttpRequest();
  request.open("POST", "https://scores.bbz.cloud/score");
  request.send(formData);
}
