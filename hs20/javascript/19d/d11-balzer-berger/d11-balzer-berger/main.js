/* Elemente aus HTML holen */
const spieler = document.querySelector('.player');
const ball = document.querySelector('.ball');
const spielfeld = document.querySelector('.playground');
const punkteAnzeige = document.querySelector('.punktezahl');
const timeranzeige = document.querySelector('.timer');
var highscore = localStorage.getItem('highscore');
const highscoreanzeige = document.querySelector('.highscore');
/* Allgemeine Sachen definieren */
var timer = new Timer(60 * 60);
ball.style.left = '100px';
ball.style.top = '500px';
spieler.style.backgroundColor = createRandomColor();
spieler.style.left = '0vw';
spieler.style.bottom = '0vw';
const bewegungabstand = 1;
if (highscore) {
  highscoreanzeige.textContent = `Highscore: ${highscore}`;
}
let score = 0;
const fail = new Audio('https://freesound.org/data/previews/450/450616_9159316-lq.mp3');

// 0 = nach unten; Pi = nach oben; 0.5Pi = nach rechts, 0.75Pi nach rechts oben, 1.25Pi nach links oben
ball.setAttribute('data-direction', Math.PI * 1.25);
ball.style.backgroundColor = createRandomColor();

/* Random Color */
function createRandomColor() {
  const hexParts = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexParts[Math.floor(Math.random() * 16)];
  }
  return color;
}

/* Blöcke erstellen */
for (let zeile = 0; zeile < 7; zeile++) {
  for (let spalte = 0; spalte < 10; spalte++) {
    var h = document.createElement('div');
    h.classList.add('stein');
    h.style.top = zeile * 5 + 'vh';
    h.style.left = spalte * 8 + 'vw';
    h.style.backgroundColor = createRandomColor();
    spielfeld.appendChild(h);
  }
}

function loop() {
  /* Ball */
  var xPos = parseFloat(ball.style.left);
  var yPos = parseFloat(ball.style.top);
  var rotation = ball.getAttribute('data-direction');

  ball.style.left = 10 * Math.sin(rotation) + xPos + 'px';
  ball.style.top = 10 * Math.cos(rotation) + yPos + 'px';
  if (parseFloat(ball.style.left) < 0) {
    ball.setAttribute('data-direction', 2 * Math.PI - rotation);
  }
  if (parseFloat(ball.style.left) > spielfeld.clientWidth - ball.clientWidth) {
    ball.setAttribute('data-direction', 2 * Math.PI - rotation);
  }
  if (parseFloat(ball.style.top) < 0) {
    ball.setAttribute('data-direction', Math.PI - rotation);
  }

  /* Bewegung Player */
  if (keyboard(39) && parseInt(spieler.style.left) < 70) {
    spieler.style.left = parseInt(spieler.style.left) + bewegungabstand + 'vw';
  }
  if (keyboard(37) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - bewegungabstand + 'vw';
  }
  if (keyboard(68) && parseInt(spieler.style.left) < 70) {
    spieler.style.left = parseInt(spieler.style.left) + bewegungabstand + 'vw';
  }
  if (keyboard(65) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - bewegungabstand + 'vw';
  }

  /* kollision */
  const steine = document.querySelectorAll('.stein');
  var collisions = allCollisions(ball, steine);
  if (collisions.length > 0) {
    collisions[0].parentNode.removeChild(collisions[0]);
    var rotation = ball.getAttribute('data-direction');
    ball.setAttribute('data-direction', Math.PI - rotation + Math.random() * 0.5);
    new Audio('https://freesound.org/data/previews/244/244653_3624044-lq.mp3').play();
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  /* Rotation */
  if (anyCollision(spieler, [ball])) {
    var rotation = ball.getAttribute('data-direction');
    ball.setAttribute('data-direction', Math.PI - rotation + Math.random() * 0.5);
  }

  /* Meldungen & Anzeigen */
  if (parseFloat(ball.style.top) > spielfeld.clientHeight + 0.5 * ball.clientHeight) {
    if (score > highscore) {
      localStorage.setItem('highscore', score);
    }
    fail.play();
    alert('Game Over!');
    window.location.reload();
    return;
  }
  timeranzeige.textContent = Math.round(60 - timer.value / 60);
  if (timer.ready()) {
    if (score > highscore) {
      localStorage.setItem('highscore', score);
    }
    fail.play();
    alert('Game Over!');
    window.location.reload();
  }

  window.requestAnimationFrame(loop);
}

/* Start */
function start() {
  new Audio('https://freesound.org/data/previews/546/546602_11135759-lq.mp3').play();
  button.style.display = 'none';
  setTimeout(() => {
    window.requestAnimationFrame(loop);
  }, 3000);
}
const button = document.querySelector('button');
button.addEventListener('click', start);
