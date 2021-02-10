var spieler = document.querySelector('.player');
  spieler.style.width = '80px';
  spieler.style.height = '110px';
  spieler.style.top =   '50%';


var enemy = document.querySelector('.enemy');

var e2 = document.querySelector('.e2');
var e3 = document.querySelector('.e3');
var e4 = document.querySelector('.e4');
var e5 = document.querySelector('.e5');
var e6 = document.querySelector('.e6');
var e7 = document.querySelector('.e7');


var hit = new Audio('sounds/hit.mp3')

var spielfeld = document.querySelector('.playground')
var backgroundPosition = 0;

// score
var score = 0
var punkteAnzeige = document.querySelector('.punkte')


// random speed Asteroid

function randTime(generate) {
  var time = Math.floor(Math.random()*10)+1;
  generate.style.setProperty('--animation-time', time +'s');
  setTimeout( randTime, time * 1000, generate);

}

randTime(e1)
randTime(e2)
randTime(e3)
randTime(e4)
randTime(e5)
randTime(e6)
randTime(e7)



function loop() {
  // up

  if (keyboard(38)  && spieler.style.top > '1%'){
    spieler.style.top = parseInt(spieler.style.top) - 1 + '%'
  }

  // down
  if (keyboard(40) && spieler.style.top < '87%' ) {
    spieler.style.top = parseInt(spieler.style.top) + 1 + '%'
  }


  // Background image scroll
  backgroundPosition = backgroundPosition + 2;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;


  // score

  setInterval(function () {
    score++;
  }, 1000);
  punkteAnzeige.textContent = score





  // Kollision

  if(anyCollision(spieler, [enemy, e2, e3, e4, e5, e6, e7])) {
    hit.play()
    alert("Game over!")
    return
  }


  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
