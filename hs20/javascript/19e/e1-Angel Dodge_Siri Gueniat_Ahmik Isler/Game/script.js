/* Tastatur */
var spieler = document.querySelector(".player");
var spielfeld = document.querySelector(".playground");

spieler.style.left = "0px";

var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

var timer = new Timer(80); //anzahl Spielschritte zum Geschenk
var timer2 = new Timer(110); //anzahl Spielschritte zum kerze
var timer3 = new Timer(90); //anzahl Spielschritte zum sw kugel
var timer4 = new Timer(120); //anzahl Spielschritte zum goldene kugel

function loop() {
  spieler.style.left = mousePositionX(spielfeld) + "px";
  spieler.style.top = mousePositionY(spielfeld) + "px";
  if (keyboard(39) || keyboard(68)) {
    spieler.style.left = parseInt(spieler.style.left) + 10 + "px";
  }
  if (keyboard(37) || keyboard(65)) {
    spieler.style.left = parseInt(spieler.style.left) - 10 + "px";
  
  }
  if(parseInt(spieler.style.left) > spielfeld.clientWidth - spieler.clientWidth){
    spieler.style.left = spielfeld.clientWidth - spieler.clientWidth + "px"
  }
  if(parseInt(spieler.style.left) < 0 ){
    spieler.style.left = 0 + "px" }



    
  //geschenk

  if (timer.ready()) {
    var h = document.createElement("img");
    h.src = "img/Geschenk.png";
    h.classList.add("Geschenk");
    h.style.top = "-100px";
    h.style.left = Math.random() * (spielfeld.clientWidth-60) + "px";
    spielfeld.appendChild(h);
    timer= new Timer (150 / ( 1 + 0.04 * score))
  }

  var steine = document.querySelectorAll(".Geschenk");
  for (var stein of steine) {
    stein.style.top = parseInt(stein.style.top) +  (1 + 0.04 * score) + "px"; //geschwindigkeit geschenke
    if (parseInt(stein.style.top) > spielfeld.clientHeight) {
      stein.parentNode.removeChild(stein);
    }
  }
  var collisions = allCollisions(spieler, steine);
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
    score = score + 1;
    punkteAnzeige.textContent = score;
  }




  //goldene-kugel

  if (timer4.ready()) {
    var h = document.createElement("img");
    h.src = "img/goldene_kugel.png";
    h.classList.add("goldene-kugel");
    h.style.top = "-100px";
    h.style.left = Math.random() * (spielfeld.clientWidth-30) + "px";
    spielfeld.appendChild(h);
    timer4= new Timer (240 / (1 + 0.04 * score))
  }

  var goldenekugeln = document.querySelectorAll(".goldene-kugel");
  for (var goldenekugel of goldenekugeln) {
    goldenekugel.style.top = parseInt(goldenekugel.style.top) + (2 + 0.04 * score) + "px"; //geschwindigkeit goldne kugel
    if (parseInt(goldenekugel.style.top) > spielfeld.clientHeight) {
      goldenekugel.parentNode.removeChild(goldenekugel);
    }
  }
  var collisions = allCollisions(spieler, goldenekugeln);
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
    score = score + 5;
    punkteAnzeige.textContent = score;
  }




  //kerze

  if (timer2.ready()) {
    var h = document.createElement("img");
    h.src = "img/kerze.png";
    h.classList.add("kerze");
    h.style.top = "-100px";
    h.style.left = Math.random() * (spielfeld.clientWidth-25) + "px";
    spielfeld.appendChild(h);
    timer2= new Timer (300 / (1 + 0.04 * score))
  }

  var steine = document.querySelectorAll(".kerze");
  for (var stein of steine) {
    stein.style.top = parseInt(stein.style.top) +  (4 + 0.04 * score) + "px"; //geschwindigkeit geschenke
    if (parseInt(stein.style.top) > spielfeld.clientHeight) {
      stein.parentNode.removeChild(stein);
    }
  }
  var collisions = allCollisions(spieler, steine);
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
    score = score - 10;
    punkteAnzeige.textContent = score;
  }



  //schwarze-kugel

  if (timer3.ready()) {
    var h = document.createElement("img");
    h.src = "img/schwarze_kugel.png";
    h.classList.add("schwarze-kugel");
    h.style.top = "-100px";
    h.style.left = Math.random() * (spielfeld.clientWidth-60) + "px";
    spielfeld.appendChild(h);
    timer3= new Timer (220 / (1 + 0.04 * score))
  }

  var schwarzekugeln = document.querySelectorAll(".schwarze-kugel");
  for (var schwarzekugel of schwarzekugeln) {
    schwarzekugel.style.top = parseInt(schwarzekugel.style.top) +  (1 + 0.04 * score) + "px"; //geschwindigkeit
    if (parseInt(schwarzekugel.style.top) > spielfeld.clientHeight) {
      schwarzekugel.parentNode.removeChild(schwarzekugel);
    }
  }
  var collisions = allCollisions(spieler, schwarzekugeln);
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
    score = score - 10;
    punkteAnzeige.textContent = score;
  }

  if (score < 0) {
    return alert("You suck, try again dumbass");
  }

  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
