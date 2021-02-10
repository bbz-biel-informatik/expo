var spieler = document.querySelector('.player');

var gegner = document.querySelector('.stein');
var spielfeld = document.querySelector('.playground');
var punkteAnzeige = document.querySelector('.punkte')

var score = 0;


spieler.style.bottom = '450px'

var backgroundPosition = 0;

var timer = new Timer(100)
/*
var timerbottom = new Timer(100)
*/
function loop() {

  backgroundPosition = backgroundPosition + 3;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  var scoreup = document.querySelectorAll('.scoreup');

  if (anyCollision(spieler, scoreup)) {
    score = score + 0.0476190476190476 
    //score = Math.round(score * 10) / 10
    punkteAnzeige.textContent = score
  }

  //Hindernisse oben
  if (timer.ready()) {
    var x = Math.random() * 600
    var h = document.createElement('div')
    h.classList.add('stein')
    h.style.right = '-100px'
    h.style.top = -200 - x + "px"
    spielfeld.appendChild(h)
    var h = document.createElement('div')
    h.classList.add('steinbottom')
    h.style.right = '-100px'
    h.style.top = 900 - x + "px"
    spielfeld.appendChild(h)
    var h = document.createElement('div')
    h.classList.add('scoreup')
    h.style.right = '-100px'
    h.style.top = 200 - x + "px"
    spielfeld.appendChild(h)
  }

  var steine = document.querySelectorAll('.stein')
  for (var stein of steine) {
    stein.style.right = parseInt(stein.style.right) + 5 + 'px'
    if (parseInt(stein.style.right) > 1920) {
      stein.parentNode.removeChild(stein)
    }
  }

  var steine = document.querySelectorAll('.steinbottom')
  for (var stein of steine) {
    stein.style.right = parseInt(stein.style.right) + 5 + 'px'
    if (parseInt(stein.style.right) > 1920) {
      stein.parentNode.removeChild(stein)
    }
  }

  var steine = document.querySelectorAll('.scoreup')
  for (var stein of steine) {
    stein.style.right = parseInt(stein.style.right) + 5 + 'px'
    if (parseInt(stein.style.right) > 1920) {
      stein.parentNode.removeChild(stein)
    }
  }

  var top = document.querySelectorAll('.stein');
  var bottom = document.querySelectorAll('.steinbottom');
  var g1 = document.getElementById("go-overlay");


  if (anyCollision(spieler, top)) {
    
    g1.classList.remove('none');
    g1.classList.add('gameover');
    return
  }

  if (anyCollision(spieler, bottom)) {

    g1.classList.remove('none');
    g1.classList.add('gameover');
    return
  }

  if (keyboard(32)) {
    spieler.style.bottom = parseInt(spieler.style.bottom) + 18 + 'px'
  }
  if (parseInt(spieler.style.bottom) > 0) {
    spieler.style.bottom = parseInt(spieler.style.bottom) - 8 + 'px'

  }



  window.requestAnimationFrame(loop)
}

//Overlay Spielerauswahl 
let a1 = document.getElementById("overlay");
let a2 = document.getElementById("player");
let a3 = document.getElementById("1");
let a4 = document.getElementById("2");
let a5 = document.getElementById("3");
let a6 = document.getElementById("4");

document.getElementById("5").onclick = function () {
  spieler.classList.add('player-diener');

  a1.style.display = 'none'

  window.requestAnimationFrame(loop)
};


document.getElementById("4").onclick = function () {
  spieler.classList.add("player-biden");

  a1.style.display = 'none'

  window.requestAnimationFrame(loop)
};


document.getElementById("3").onclick = function () {
  spieler.classList.add("player-merkel");

  a1.style.display = 'none'

  window.requestAnimationFrame(loop)
};


document.getElementById("2").onclick = function () {
  spieler.classList.add("player-putin");

  a1.style.display = 'none'

  window.requestAnimationFrame(loop)
};


document.getElementById("1").onclick = function () {
  spieler.classList.add("player-trump");

  a1.style.display = 'none'

  window.requestAnimationFrame(loop)
};

const refreshButton = document.querySelector('.refresh-button');

const refreshPage = () => {
  location.reload();
}

refreshButton.addEventListener('click', refreshPage)