//punkte//
var punkteAnzeige = document.querySelector(".points");
var score = 0;
// Abstand zwischen Ninjas//
var timer = 300;
// Abstand zwischen Fliegen//
var timer2 = 400;
// Pizza timer//
var timer3 = new Timer(150);
// Wolken timer//
var timer4 = new Timer(600);
// Abstand zwischen Fliegen2//
var timer5 = 3000;
// Wolken2 timer//
var timer6 = new Timer(900);
// Abstand zwischen Fliegen3//
var timer7 = new Timer(2000);
// Abstand zwischen Fliegen3//
var timer8 = new Timer(2800);
//background//
var spielfeld = document.querySelector(".playground");

var backgroundPosition = 0;
//Hauptspieler//
var spieler = document.querySelector("#player");
spieler.style.left = "0px";
spieler.style.bottom = "100px";
//Soundeffekt//
var over = new Audio("soundeffekt/lose.wav");
over.volume = 0.5;
var jump = new Audio("soundeffekt/jump.wav");
var coin = new Audio("soundeffekt/collect-point.wav");
coin.volume = 0.5;
var win = new Audio("soundeffekt/win.m4a");
win.volume = 0.5;
var backgroundMusic = new Audio("soundeffekt/BackgroundMusic.mp3");
backgroundMusic.volume = 0.5;

function loop() {
  var breite = spielfeld.clientWidth;
  var hoehe = spielfeld.clientHeight;
  // Generiert Ninjas //
  timer = timer - 1;
  if (timer < 0) {
    if (score > 300) {
      timer = 100;
    } else if (score > 150) {
      timer = 150;
    } else if (score > 90) {
      timer = 200;
    } else {
      timer = 300;
    }

    var h = document.createElement("img");
    h.src = "images/Gegner/ninja.gif";
    h.classList.add("ninja");
    h.style.bottom = "100px";
    h.style.right = "-30px";
    spielfeld.appendChild(h);
  }
  // Geschwindigkeit Ninjas //
  var ninjas = document.querySelectorAll(".ninja");
  for (var ninja of ninjas) {
    ninja.style.right = parseInt(ninja.style.right) + 5 + "px";
    if (parseInt(ninja.style.right) > breite) {
      ninja.parentNode.removeChild(ninja);
    } else if (score > 350) {
      ninja.style.right = parseInt(ninja.style.right) + 6 + "px";
    } else if (score > 190) {
      ninja.style.right = parseInt(ninja.style.right) + 5 + "px";
    } else if (score > 90) {
      ninja.style.right = parseInt(ninja.style.right) + 4 + "px";
    }
  }
  // Generiert Ninjas Gross //
  if (timer8.ready()) {
    var h = document.createElement("img");
    h.src = "images/Gegner/ninja.gif";
    h.classList.add("ninja2");
    h.style.bottom = "100px";
    h.style.right = "-30px";
    spielfeld.appendChild(h);
  }
  // Geschwindigkeit Ninjas Gross //
  var ninjas2 = document.querySelectorAll(".ninja2");
  for (var ninja2 of ninjas2) {
    ninja2.style.right = parseInt(ninja2.style.right) + 8 + "px";
    if (parseInt(ninja2.style.right) > breite) {
      ninja2.parentNode.removeChild(ninja2);
    }
  }
  // Generiert Fliegen //
  timer2 = timer - 1;
  if (timer2 < 0) {
    if (score > 350) {
      timer2 = 280;
    } else if (score > 150) {
      timer2 = 350;
    } else if (score > 90) {
      timer2 = 350;
    } else {
      timer2 = 400;
    }
    var h = document.createElement("img");
    h.src = "images/Gegner/fly.gif";
    h.classList.add("fly");
    h.style.bottom = "420px";
    h.style.right = "-30px";
    spielfeld.appendChild(h);
  }
  // Geschwindigkeit Fliegen unten//
  var flies = document.querySelectorAll(".fly");
  for (var fly of flies) {
    fly.style.right = parseFloat(fly.style.right) + 2.5 + "px";
    if (parseInt(fly.style.right) > breite) {
      fly.parentNode.removeChild(fly);
    } else if (score > 390) {
      fly.style.right = parseInt(fly.style.right) + 5 + "px";
    } else if (score > 150) {
      fly.style.right = parseInt(fly.style.right) + 7 + "px";
    } else if (score > 90) {
      fly.style.right = parseFloat(fly.style.right) + 5.5 + "px";
    }
  }
  // Generiert Fliegen2 mitte //
  timer5 = timer - 1;
  if (timer5 < 0) {
    if (score > 390) {
      timer5 = 1800;
    } else if (score > 150) {
      timer5 = 2000;
    } else if (score > 90) {
      timer5 = 2700;
    } else {
      timer5 = 3000;
    }
    var h = document.createElement("img");
    h.src = "images/Gegner/fly.gif";
    h.classList.add("fly2");
    h.style.top = "150px";
    h.style.right = "-100px";
    spielfeld.appendChild(h);
  }
  // Geschwindigkeit Fliegen2 //
  var flies2 = document.querySelectorAll(".fly2");
  for (var fly2 of flies2) {
    fly2.style.right = parseFloat(fly2.style.right) + 7 + "px";
    if (parseInt(fly2.style.right) > breite) {
      fly2.parentNode.removeChild(fly2);
    }
  }
  // Generiert fliegen3 Gross //
  if (timer7.ready()) {
    var h = document.createElement("img");
    h.src = "images/Gegner/fly.gif";
    h.classList.add("fly3");
    h.style.top = "150px";
    h.style.right = "0px";
    spielfeld.appendChild(h);
  }
  // Geschwindigkeit Fliegen3 //
  var flys3 = document.querySelectorAll(".fly3");
  for (var fly3 of flys3) {
    fly3.style.right = parseFloat(fly3.style.right) + 11 + "px";
    if (parseInt(fly3.style.right) > breite) {
      fly3.parentNode.removeChild(fly3);
    }
  }
  // Generiert Pizzas //
  if (timer3.ready()) {
    var h = document.createElement("img");
    h.src = "images/Muenzen/pizza.png";
    h.classList.add("pizza");
    h.style.right = "0px";
    h.style.bottom = 100 + document.body.clientHeight * Math.random() + "px";
    spielfeld.appendChild(h);
  }
  //  Pizzas verschwinden ausserhalb rand//
  var pizzas = document.querySelectorAll(".pizza");
  for (var pizza of pizzas) {
    pizza.style.right = parseInt(pizza.style.right) + 4 + "px";
    if (parseInt(pizza.style.right) > breite) {
      pizza.parentNode.removeChild(pizza);
    }
  }
  // Generiert Wolken //
  if (timer4.ready()) {
    var h = document.createElement("img");
    h.src = "images/Background/BGclouds.png";
    h.classList.add("wolke");
    h.style.top = "100px";
    h.style.right = "0px";
    spielfeld.appendChild(h);
  }
  //  Wolken verschwinden ausserhalb rand//
  var wolken = document.querySelectorAll(".wolke");
  for (var wolke of wolken) {
    wolke.style.right = parseFloat(wolke.style.right) + 2.5 + "px";
    if (parseInt(wolke.style.right) > breite) {
      wolke.parentNode.removeChild(wolke);
    }
  }
  // Generiert Wolken2 //
  if (timer6.ready()) {
    var h = document.createElement("img");
    h.src = "images/Background/BGclouds.png";
    h.classList.add("wolke2");
    h.style.top = "300px";
    h.style.right = "0px";
    spielfeld.appendChild(h);
  }
  //  Wolken verschwinden ausserhalb rand//
  var wolken2 = document.querySelectorAll(".wolke2");
  for (var wolke2 of wolken2) {
    wolke2.style.right = parseFloat(wolke2.style.right) + 3 + "px";
    if (parseInt(wolke2.style.right) > breite) {
      wolke2.parentNode.removeChild(wolke2);
    }
  }

  // Bei Kollision mit Ninjas Gameover box einschalten und todesanimation1//
  var gegner = document.querySelectorAll(".ninja , .ninja2");
  if (anyCollision(spieler, gegner)) {
    document.querySelector(".gameover").style.display = "inline";
    document.querySelector(".try").style.display = "block";
    document.querySelector(".yes").style.display = "inline";
    document.querySelector(".no").style.display = "inline";
    document.querySelector(".muteoff").style.display = "none";
    document.querySelector(".muteon").style.display = "none";
    document.getElementById("player").src = "images/Hauptfigur/Death1.png";
    backgroundMusic.pause();
    over.play();
    return;
  }
  // Bei Kollision mit Fliegen Gameover box einschalten und todesanimation2//
  var gegner2 = document.querySelectorAll(".fly , .fly2 , .fly3");
  if (anyCollision(spieler, gegner2)) {
    document.querySelector(".gameover").style.display = "inline";
    document.querySelector(".try").style.display = "block";
    document.querySelector(".yes").style.display = "inline";
    document.querySelector(".no").style.display = "inline";
    document.getElementById("player").src = "images/Hauptfigur/Death2.png";
    document.querySelector(".muteoff").style.display = "none";
    document.querySelector(".muteon").style.display = "none";
    backgroundMusic.pause();
    over.play();
    return;
  }
  //Hintergrund bewegen//
  backgroundPosition = backgroundPosition + 1;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;
  if (score > 300) {
    backgroundPosition = backgroundPosition + 3;
  } else if (score > 190) {
    backgroundPosition = backgroundPosition + 2;
  } else if (score > 90) {
    backgroundPosition = backgroundPosition + 1.5;
  } else {
    backgroundPosition = backgroundPosition + 1;
  }
  //Gravitation//
  if (parseInt(spieler.style.bottom) > 109) {
    spieler.style.bottom = parseInt(spieler.style.bottom) - 5 + "px";
  }
  //Bei Kollision mit Pizzas Sound abspielen//
  var collect = document.querySelectorAll(".pizza");
  var collisions = allCollisions(spieler, collect);
  for (var collision of collisions) {
    score = score + 20;
    punkteAnzeige.textContent = score;
    coin.play();
    pizza.parentNode.removeChild(collision);
  }
  if (score > 490) {
    document.querySelector(".ballons").style.display = "block";
    document.querySelector(".points").style.display = "none";
    document.querySelector(".muteon").style.display = "none";
    document.querySelector(".muteoff").style.display = "none";
    document.querySelector(".try2").style.display = "block";
    win.play();
    backgroundMusic.pause();
    return;
  }
  // Muteoff an  oder abstellen mit Click//
  document.querySelector(".muteoff").addEventListener("click", function () {
    backgroundMusic.pause();
    document.querySelector(".muteoff").style.display = "none";
    document.querySelector(".muteon").style.display = "inline";
  });
  // Muteon an oder abstellen mit Click//
  document.querySelector(".muteon").addEventListener("click", function () {
    backgroundMusic.play();
    document.querySelector(".muteoff").style.display = "inline";
    document.querySelector(".muteon").style.display = "none";
  });
  //Walk right//
  if (keyboard(39) || keyboard(68)) {
    spieler.style.left = parseInt(spieler.style.left) + 6 + "px";
    spieler.src = "images/Hauptfigur/walk.gif";
  }
  //Walk left//
  if (keyboard(37) || keyboard(65)) {
    spieler.style.left = parseInt(spieler.style.left) - 6 + "px";
    spieler.src = "images/Hauptfigur/walkleft.gif";
  }
  //jump//
  if (
    keyboard(32) &&
    parseInt(spieler.style.bottom) < hoehe - spieler.clientHeight
  ) {
    spieler.style.bottom = parseInt(spieler.style.bottom) + 10 + "px";
    spieler.src = "images/Hauptfigur/jump.png";
  }
  window.requestAnimationFrame(loop);
}
//Replay button yes//
document.querySelector(".yes, .ballons").addEventListener("click", function () {
  window.location.reload();
});

//start game//
document.querySelector(".start").addEventListener("click", function () {
  window.requestAnimationFrame(loop);
  document.querySelector(".start").style.display = "none";
  document.querySelector(".muteoff").style.display = "inline";
  document.querySelector(".steuerung").style.display = "none";
  backgroundMusic.play();
});
//play again yes//
document.querySelector(".try2").addEventListener("click", function () {
  window.location.reload();
});

//play again no//
document.querySelector(".no").addEventListener("click", function () {
  window.location.href =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
});
