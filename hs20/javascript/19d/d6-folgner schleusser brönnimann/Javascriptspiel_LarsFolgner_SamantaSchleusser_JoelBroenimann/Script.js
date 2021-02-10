//Variablen und Konstanten für später

var GAME_SPEED = 100;
const CANVAS_BACKGROUND_COLOUR = 'white';
const WORM_COLOUR = 'Brown';
const FOOD_COLOUR = 'gray';

//Schwierigkeitsgrad

var ButtonEasy = document.querySelector('#EASYMODE')
var ButtonMedium = document.querySelector('#MEDIUMMODE')
var ButtonHard = document.querySelector('#HARDMODE')
var ButtonInsane = document.querySelector('#INSANEMODE')

ButtonEasy.addEventListener('click', function () {
 GAME_SPEED = 100;
})

ButtonMedium.addEventListener('click', function () {
  GAME_SPEED = 80;
 })

ButtonHard.addEventListener('click', function () {
  GAME_SPEED = 50;
})

ButtonInsane.addEventListener('click', function () {
  GAME_SPEED = 20;
})

//Wurm Startpunkt

let Worm = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
]

//Deffault Settings

let score = 0;
let changingDirection = false;
let SpaceshipX;
let SpaceshipY;
let dx = 10;
let dy = 0;

//Den Canvas deffinieren

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

//Das Spiel starten
main();

createSpaceship();

//Keydown fesstellen

document.addEventListener("keydown", changeDirection);


//Haupt spiel loop

function main() {
  if (didGameEnd()) return;

  setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas();
    drawSpaceship();
    advanceWorm();
    drawWorm();

    main();
  }, GAME_SPEED)
}

//Hinterground deffinieren

function clearCanvas() {

  ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;

  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

//Das Raumschiff generieren

function drawSpaceship() {
  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(SpaceshipX, SpaceshipY, 10, 10);
  ctx.strokeRect(SpaceshipX, SpaceshipY, 10, 10);
}

//Wurm Erweiterung / Neues Raumschiff

function advanceWorm() {

  const head = {x: Worm[0].x + dx, y: Worm[0].y + dy};

  Worm.unshift(head);

  const didEatSpaceship = Worm[0].x === SpaceshipX && Worm[0].y === SpaceshipY;
  if (didEatSpaceship) {

    score += 10;

    document.getElementById('score').innerHTML = score;


    createSpaceship();
  } else {
    Worm.pop();
  }
}

//Spielende bei Wandberührung

function didGameEnd() {
  for (let i = 4; i < Worm.length; i++) {
    if (Worm[i].x === Worm[0].x && Worm[i].y === Worm[0].y) return true
  }

  const hitLeftWall = Worm[0].x < 0;
  const hitRightWall = Worm[0].x > gameCanvas.width - 10;
  const hitToptWall = Worm[0].y < 0;
  const hitBottomWall = Worm[0].y > gameCanvas.height - 10;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

//Spaceship generation - Zuerst werden zufällige Koordinaten generiet

function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createSpaceship() {

  SpaceshipX = randomTen(0, gameCanvas.width - 10);

  SpaceshipY = randomTen(0, gameCanvas.height - 10);

//Checkt ob das neue Spaceship im Wurm drin ist

  Worm.forEach(function isSpaceshipOnWorm(part) {
    const SpaceshipIsoNWorm = part.x == SpaceshipX && part.y == SpaceshipY;
    if (SpaceshipIsoNWorm) createSpaceship();
  });
}

//Wurm generation

function drawWorm() {
  Worm.forEach(drawWormPart)
}

function drawWormPart(WormPart) {

  ctx.fillStyle = WORM_COLOUR;

  ctx.fillRect(WormPart.x, WormPart.y, 10, 10);
}



function changeDirection(event) {
  const LEFT_KEY = 65;
  const RIGHT_KEY = 68;
  const UP_KEY = 87;
  const DOWN_KEY = 83;

//Sicher stellen, das der Wurm nicht in sich selber Essen kann

  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;
  

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

//Fullscreen Button

var vollbildButton = document.querySelector('.fullscreen')

vollbildButton.addEventListener('click', function () {
  gameCanvas.requestFullscreen()
})

//Spielen Button

var playButton = document.querySelector('.play')

playButton.addEventListener('click', function () {
  location.reload();
})

