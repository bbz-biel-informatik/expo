//Overlay Startbildschirm
$(document).ready(function () {
  /*****Overlay auf / zu**/
  $("#start").click(function () {
    var parent = $(this).parent();
    $(this).hide();
    $(".overlay").hide();
  });

});


// Einmalige Ausführung als Setup
var punkte = 0
var spieler = document.querySelector(".player")
var spielfeld = document.querySelector('.playground')
spieler.style.left = '600px';
spieler.style.top = '350px';

// Background Music
var music = new Audio('christmas_song.mp3')

// Pingu Sound
var nootnoot = new Audio('nootnoot.mp3')

var angryNoot = new Audio('angryNoot.mp3')

var lastdirection = "";

var balls = document.querySelector('.ball');

// Timer für Schneeball
var timer = new Timer(50);

var timer_present = new Timer(300);


//<div id ="stop_timer" onclick="clearInterval(timerVar)">Stop time</div>

function loop() {

  // Ständige Ausführung während dem Spiel
  // Spielerbewegung 
  //right
  if (keyboard(39) && parseInt(spieler.style.left) < 1100) {
    lastdirection = "right";
    spieler.style.left = parseInt(spieler.style.left) + 5 + 'px';
  }

  //left
  else if (keyboard(37) && parseInt(spieler.style.left) > 0) {
    lastdirection = "left";
    spieler.style.left = parseInt(spieler.style.left) - 5 + 'px';
  }

  //down
  else if (keyboard(40) && parseInt(spieler.style.top) < 700) {
    lastdirection = "down";
    spieler.style.top = parseInt(spieler.style.top) + 5 + 'px';
  }

  //up
  else if (keyboard(38) && parseInt(spieler.style.top) > 0) {
    lastdirection = "up";
    spieler.style.top = parseInt(spieler.style.top) - 5 + 'px';
  }



  // Collision Tests
  var trees = document.querySelectorAll(".tree");
  if (anyCollision(spieler, trees)) {
    if (lastdirection == "right") {
      spieler.style.left = parseInt(spieler.style.left) - 5 + 'px';
    }
    else if (lastdirection == "left") {
      spieler.style.left = parseInt(spieler.style.left) + 5 + 'px';
    }
    else if (lastdirection == "down") {
      spieler.style.top = parseInt(spieler.style.top) - 5 + 'px';
    }
    else if (lastdirection == "up") {
      spieler.style.top = parseInt(spieler.style.top) + 5 + 'px';
    }
  }

  var balls = document.querySelectorAll(".ball");
  if (anyCollision(spieler, balls)) {
    angryNoot.play()
    music.pause()
    clearInterval(timerVar)
    var nickname = prompt("You collected "+ punkte + " presents and survived for " + totalSeconds + " seconds! Please enter your name:")
    
    // Neuer Eintrag
var formData = new FormData();

formData.append("game", "Merikurisumasu-Game");
formData.append("name", nickname);
formData.append("score", punkte);

var request = new XMLHttpRequest();
request.open("POST", "https://scores.bbz.cloud/score");
request.send(formData);

location.reload();    

    return
  }

  var presents = document.querySelectorAll(".present");
  var found = allCollisions(spieler, presents);
  if (found.length > 0) {
    nootnoot.play()
    punkte = punkte + 1
    console.log(punkte);
    found[0].parentNode.removeChild(found[0]);
  }



  //Generierung Gegenstände 
  //Schneebälle
  for (var ball of balls) {
    ball.style.left = parseInt(ball.style.left) + 2 + 'px';
    //   ball.style.top = parseInt(ball.style.top) + 10 + 'px';
    if (parseInt(ball.style.left) < 0 || parseInt(ball.style.left) > 1190) {
      ball.parentNode.removeChild(ball)
    }

  }
  if (timer.ready()) {
    var balls = document.createElement('div')
    balls.classList.add('ball')
    balls.style.top = Math.random() * 790 + "px";
    balls.style.left = "1px";
    spielfeld.appendChild(balls)
  }


  //Geschenke
  if (timer_present.ready()) {
    var presents = document.createElement('div')
    presents.classList.add('present')
    presents.style.top = Math.random() * 760 + "px";
    presents.style.left = Math.random() * 1100 + "px";
    spielfeld.appendChild(presents)
  }



  window.requestAnimationFrame(loop);

  //Scores
  document.getElementById("punkte").innerHTML = punkte

}

document.querySelector("#start").addEventListener("click", startgame)
function startgame() {
  music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
  music.play();
  window.setTimeout(function () {
    window.requestAnimationFrame(loop);
  }, 4000
  )
}


// Timer der zählt, wie lange der Spieler lebt
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
  ++totalSeconds;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  if (hour < 10)
    hour = "0" + hour;
  if (minute < 10)
    minute = "0" + minute;
  if (seconds < 10)
    seconds = "0" + seconds;
  document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

// Snowball
for (var i = 1; i < 2; i++) {
  var balls = document.createElement('div')
  balls.classList.add('ball')
  balls.style.top = "10px";
  balls.style.left = "10px";
  spielfeld.appendChild(balls)
}

// Tree
for (var i = 1; i < 6; i++) {
  var h = document.createElement('div')
  h.classList.add('tree')
  h.style.top = Math.random() * 670 + 'px'
  h.style.left = Math.random() * 1110 + 'px'
  spielfeld.appendChild(h)
}

// Einträge abrufen
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://scores.bbz.cloud/scores?game=Merikurisumasu-Game");
oReq.send();

var res = document.querySelector('.results');

function reqListener() {
  var data = JSON.parse(this.responseText);
  for(var datum of data) {
    res.innerHTML += "<b><p>" + datum.name + "</b> " + datum.score + "<br></p>"
  }
}
