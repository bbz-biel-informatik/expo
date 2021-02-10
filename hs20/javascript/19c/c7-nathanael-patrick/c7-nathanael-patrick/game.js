//Anleitung
alert('Das Ziel des Spiels ist es, als Erster die von euch eingegebene Rundenanzahl zu schaffen. Es sollten nur ganze Rundenzahlen eingegeben werden. Der Spieler 1 (rot) wird mit den Tasten W/A/D und der andere (grün) mit den Pfeiltasten gesteuert. Die Spieler können springen und sich nach links oder rechts bewegen. Die Steuerung ist mit etwas Übung ganz einfach. Seid Fair und beginnt gleichzeitig :) Klickt erst nachdem jemand gewonnen hat wieder auf Neustart. Sonst seid ihr "etwas" schneller. Viel Spass!')

//Spieler 1
var spieler1 = document.querySelector('.player1')
spieler1.style.left = '450px'
spieler1.style.top = '600px'

//Spieler 2
var spieler2 = document.querySelector('.player2')
spieler2.style.left = '430px'
spieler2.style.top = '600px'

//Runden Messung
var countertop = document.querySelector('.counter-top')
var counterbottom = document.querySelector('.counter-bottom')

//Punkte Anzeige
var punkteAnzeige1 = document.querySelector('.score1')
var punkteAnzeige2 = document.querySelector('.score2')
var top1 = 0
var score1 = 0
var top2 = 0
var score2 = 0

//Anzahl Spielrunden
var spielrunden = 0;

//Sprünge
var a1 = -2
var b1 = -2

//Spielbegrenzungen
var begrenzung = document.querySelectorAll('.boden, .links, .rechts, .oben')

//Audio
var musik = new Audio('sounds/soundtrack.mp3')
musik.volume = 0.5
var jump = new Audio('sounds/jump.mp3')
jump.volume = 0.125
var victory = new Audio('sounds/victory.mp3')
victory.volume = 0.5
var kaChing = new Audio('sounds/Ka_ching.mp3')
victory.volume = 0.5

//Countdown
var i = 3

//Spielfunktion mit Steuerung
function loop() {

    musik.play()

  a1 = a1 - 0.3
  b1 = b1 - 0.3
  //WASD Steuerung Player1
  //Taste D (rechts)
  if(keyboard(68)) {
    spieler1.style.left = parseInt(spieler1.style.left) + 5 + 'px'
    if(collisionRight(spieler1, begrenzung).length > 0) {
      spieler1.style.left = parseInt(spieler1.style.left) - 5 + 'px'
    }
  }
  //Taste A (links)
  if(keyboard(65)) {
    spieler1.style.left = parseInt(spieler1.style.left) - 5 + 'px'
    if(collisionLeft(spieler1, begrenzung).length > 0) {
      spieler1.style.left = parseInt(spieler1.style.left) + 5 + 'px'
    }
  }
  // Taste W (springen)
  if(keyboard(87)) {
    jump.play()
    spieler1.style.top = parseInt(spieler1.style.top) + 15 + 'px'
    var c = collisionBottom(spieler1, begrenzung).length > 0
    spieler1.style.top = parseInt(spieler1.style.top) - 15 + 'px'
    if(c) {
      a1 = 6.5
      if(collisionTop(spieler1, begrenzung).length > 0) {
        spieler1.style.top = parseInt(spieler1.style.top) - 10 + 'px'
        a1 = 0
      }
    }
  }

  spieler1.style.top = parseInt(spieler1.style.top) - a1 + 'px'
  if(collisionBottom(spieler1, begrenzung).length > 0) {
    spieler1.style.top = parseInt(spieler1.style.top) + a1 + 'px'
    a1 = 0
  }

  //Pfeiltasten Steuerung Player2
  //Pfeiltaste rechts
  if(keyboard(39)) {
    spieler2.style.left = parseInt(spieler2.style.left) + 5 + 'px'
    if(collisionRight(spieler2, begrenzung).length > 0) {
      spieler2.style.left = parseInt(spieler2.style.left) - 5 + 'px'
    }
  }
  //Pfeiltaste Links
  if(keyboard(37)) {
    spieler2.style.left = parseInt(spieler2.style.left) - 5 + 'px'
    if(collisionLeft(spieler2, begrenzung).length > 0) {
      spieler2.style.left = parseInt(spieler2.style.left) + 5 + 'px'
    }
  }
  //Pfeiltaste Springen
  if(keyboard(38)) {
    jump.play()
    spieler2.style.top = parseInt(spieler2.style.top) + 15 + 'px'
    var d = collisionBottom(spieler2, begrenzung).length > 0
    spieler2.style.top = parseInt(spieler2.style.top) - 15 + 'px'
    if(d) {
      b1 = 6.5
      if(collisionTop(spieler2, begrenzung).length > 0) {
        spieler2.style.top = parseInt(spieler2.style.top) - 10 + 'px'
        b1 = 0
      }
    }
  }

  spieler2.style.top = parseInt(spieler2.style.top) - b1 + 'px'
  if(collisionBottom(spieler2, begrenzung).length > 0) {
    spieler2.style.top = parseInt(spieler2.style.top) + b1 + 'px'
    b1 = 0
  }

  //Rundenzähler spieler1
    if(anyCollision(spieler1, [countertop])) {
      top1 = 1
    }


    if(anyCollision(spieler1, [counterbottom])) {
      if(top1==1){
        kaChing.play()
        score1 = score1 + 1
        top1 = 0
        punkteAnzeige1.textContent = score1

      }
      if(score1 == spielrunden){
        victory.play()
        alert("Rot hat gewonnen!");
        return
      }
    }

  //Rundenzähler spieler2
  if(anyCollision(spieler2, [countertop])) {
    top2 = 1
  }

  if(anyCollision(spieler2, [counterbottom])) {
    if(top2==1){
      kaChing.play()
      score2 = score2 + 1
      top2 = 0
      punkteAnzeige2.textContent = score2


    }
    if(score2 == spielrunden){
      victory.play()
      alert("Grün hat gewonnen!");
      return
    }
  }

  window.requestAnimationFrame(loop)
}

//Kollision mit einem Hindernis (rechts)
function collisionRight(player, targets) {
  var collisions = [];
  var rect1 = player.getBoundingClientRect();
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    var rect2 = target.getBoundingClientRect();
    if (player != target && rect1.right > rect2.left && rect1.right < rect2.right && rect1.bottom > rect2.top && rect1.top < rect2.bottom) {
      collisions.push(target);
    }
  }
  return collisions;
}

//Kollision mit einem Hindernis (links)
function collisionLeft(player, targets) {
  var collisions = [];
  var rect1 = player.getBoundingClientRect();
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    var rect2 = target.getBoundingClientRect();
    if (player != target && rect1.left < rect2.right && rect1.left > rect2.left && rect1.bottom > rect2.top && rect1.top < rect2.bottom) {
      collisions.push(target);
    }
  }
  return collisions;
}

//Kollision mit einem Hindernis (unten)
function collisionBottom(player, targets) {
  var collisions = [];
  var rect1 = player.getBoundingClientRect();
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    var rect2 = target.getBoundingClientRect();
    if (player != target && rect1.bottom > rect2.top && rect1.bottom < rect2.bottom && rect1.right > rect2.left && rect1.left < rect2.right) {
      collisions.push(target);
    }
  }
  return collisions;
}

//Kollision mit einem Hindernis (oben)
function collisionTop(player, targets) {
  var collisions = [];
  var rect1 = player.getBoundingClientRect();
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    var rect2 = target.getBoundingClientRect();
    if (player != target && rect1.top < rect2.bottom && rect1.top > rect2.top && rect1.right > rect2.left && rect1.left < rect2.right) {
      collisions.push(target);
    }
  }
  return collisions;
}

/*
function countdown() {
  for (i=3; i > 0; i-- ) {
    var myWindow = window.open("", "myWindow", "width=200, height=100");
    myWindow.document.write('i');
    setTimeout(function(){ myWindow.close() }, 1000);
  }
  return
}
*/

//Start Funktion
function main() {

  do {
     spielrunden = parseInt(prompt('Wie viele Runden möchtet ihr spielen? Wir empfehlen für Unerfahrene 2 :)'))
  } while (spielrunden <= 0);

//Number.isInteger(spielrunden) &&

//countdown();

  window.requestAnimationFrame(loop)

}

function restart() {

  window.cancelAnimationFrame(loop);

  //Spieler 1
  var spieler1 = document.querySelector('.player1')
  spieler1.style.left = '450px'
  spieler1.style.top = '600px'

  //Spieler 2
  var spieler2 = document.querySelector('.player2')
  spieler2.style.left = '430px'
  spieler2.style.top = '600px'

  punkteAnzeige1.textContent = 0
  punkteAnzeige2.textContent = 0

  score1 = 0;
  score2 = 0;

  main();
}

main();
