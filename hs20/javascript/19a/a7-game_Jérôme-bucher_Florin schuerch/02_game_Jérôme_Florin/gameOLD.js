


var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')

spieler.style.left = '0px'
spieler.style.top = '0px'

var start_spawn = false;
var timer_enemy = new Timer(20);

var healthbar = document.getElementById('healthbar');
var lives = 6;
var heart_1 = document.getElementById('heart_1');
var heart_2 = document.getElementById('heart_2');
var heart_3 = document.getElementById('heart_3');
var heart_4 = document.getElementById('heart_4');
var heart_5 = document.getElementById('heart_5');
var heart_6 = document.getElementById('heart_6');

var mainSound = new Audio('sound/main.mp3')
var hurtSound = new Audio('sound/hurt.ogg')
var shotSound = new Audio('sound/shot2.wav')
var walkSound = new Audio('sound/walk.wav')
var dangerSound = new Audio('sound/danger.wav')
var laugtherSound = new Audio('sound/laughter.mp3')
var enemySound = new Audio('sound/enemy.wav')


var punkte = 0;
var punkteanzeige = document.getElementById('points');


var titlescreen = document.getElementById("title");
var startButton = document.getElementById("start");
startButton.addEventListener("click", start_game);

function start_game(){
  titlescreen.style.display = "none";
  start_spawn = true;
  mainSound.play()
  laugtherSound.play()
}

var punkte_safe = 15;

var canGo = true,
    delay = 300; 

function loop() {

punkteanzeige.innerHTML = "Punkte : " + punkte;

var gegner = document.querySelectorAll('.enemy')


if(lives > 6) {
  lives = 6;
}
if(lives == 6){
  heart_6.style.filter = "grayscale(0%)";
}
if(lives == 5){
  heart_6.style.filter = "grayscale(100%)";
  heart_5.style.filter = "grayscale(0%)";
}
if(lives == 4){
  heart_5.style.filter = "grayscale(100%)";
  heart_4.style.filter = "grayscale(0%)";
  spielfeld.style.filter = "grayscale(30%)";
}
if(lives == 3){
  heart_4.style.filter = "grayscale(100%)";
  heart_3.style.filter = "grayscale(0%)";
  spielfeld.style.filter = "grayscale(40%)";
  healthbar.style.backgroundColor = "#d8d8d8";
}
if(lives == 2){
  heart_3.style.filter = "grayscale(100%)";
  heart_2.style.filter = "grayscale(0%)";
  healthbar.style.backgroundColor = " #570f0f"
  spielfeld.style.filter = "grayscale(77%)";
  dangerSound.play()
}
if(lives == 1){
  heart_2.style.filter = "grayscale(100%)";
  heart_1.style.filter = "grayscale(0%)";
  healthbar.style.backgroundColor = " #b10000"
  spielfeld.style.filter = "grayscale(90%)";
}
if(lives == 0){
  heart_1.style.filter = "grayscale(100%)";
  healthbar.style.backgroundColor = " #b10000";
  spielfeld.style.filter = "grayscale(100%)";
  spielfeld.style.filter = "contrast(150%)";
  alert("U dead! Du hast " + punkte + " erreicht.");
  location.reload();
  return}

 
  var collisions_player = allCollisions(spieler, gegner)
  for(var collision of collisions_player) {
    collision.parentNode.removeChild(collision)
    hurtSound.play()
  lives = lives - 1;
    
  }
  


  if (lives < 6 && punkte == punkte_safe) {
    lives = lives + 1;
    punkte_safe = punkte_safe + 10;
  }

  if (keyboard(39) && parseInt(spieler.style.left) < spielfeld.clientWidth - spieler.clientWidth) {
    spieler.style.left = parseInt(spieler.style.left) + 6 + 'px';
    spieler.style.transform = "scaleX(-1)";
    walkSound.play();
  }
  if (keyboard(37) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 6 + 'px';
    spieler.style.transform = "scaleX(1)";
    walkSound.play();
  }
  if (keyboard(40) && parseInt(spieler.style.top) < spielfeld.clientHeight - spieler.clientWidth) {
    spieler.style.top = parseInt(spieler.style.top) + 6 + 'px'
    walkSound.play();
  }
  if (keyboard(38) && parseInt(spieler.style.top) > 0) {
    spieler.style.top = parseInt(spieler.style.top) - 6 + 'px'
    walkSound.play();
  }
  if (keyboard(68) && parseInt(spieler.style.left) < spielfeld.clientWidth - spieler.clientWidth) {
    spieler.style.left = parseInt(spieler.style.left) + 6 + 'px';
    spieler.style.transform = "scaleX(-1)";
    walkSound.play();
  }
  if (keyboard(65) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 6 + 'px';
    spieler.style.transform = "scaleX(1)";
    walkSound.play();
  }
  if (keyboard(83) && parseInt(spieler.style.top) < spielfeld.clientHeight - spieler.clientWidth) {
    spieler.style.top = parseInt(spieler.style.top) + 6 + 'px'
    walkSound.play();
  }
  if (keyboard(87) && parseInt(spieler.style.top) > 0) {
    spieler.style.top = parseInt(spieler.style.top) - 6 + 'px'
    walkSound.play();
  }

  if (timer_enemy.ready() && start_spawn == true) {
      spawn_enemies();
    }



  var myFunction1 = function () {
    if (canGo) {
        canGo = false;

        shotSound.play();
        var spielerX = parseInt(spieler.style.left)
        var spielerY = parseInt(spieler.style.top)
        var a = angle(spielerX, spielerY, mousePositionX(spielfeld), mousePositionY(spielfeld))
    
        var schuss = document.createElement('div')
        schuss.classList.add('shot')
        schuss.style.left = spieler.style.left
        schuss.style.top = spieler.style.top
        schuss.setAttribute('data-angle', (180 - a) * Math.PI / 180)
        spielfeld.appendChild(schuss)

        setTimeout(function () {
            canGo = true;
        }, delay)
    } 
}

    
  if(mouseClick()) {
    myFunction1()
  }

  var schuesse = document.querySelectorAll('.shot')

  for(var schuss of schuesse) {
  	var xPos = parseFloat(schuss.style.left)
    var yPos = parseFloat(schuss.style.top)
    var rotation = schuss.getAttribute('data-angle')
    schuss.style.left = 12 * Math.sin(rotation) + xPos + 'px'
    schuss.style.top = 12 * Math.cos(rotation) + yPos + 'px'

    var collisions = allCollisions(schuss, gegner)
    
    for(var collision of collisions) {
      
      // var ex = document.createElement('div')
      // ex.classList.add('exposion')
      // ex.style.left = collision.style.left
      // ex.style.top = spieler.style.top
      // collision.parentNode.appendChild(ex)
      // console.log('added')
      // setTimeout(removeFunc, 1000)
      // function removeFunc(){
      //   collision.parentNode.removeChild(ex)
      //   console.log('removed')
      // }
      
      //gegner despawn
      collision.parentNode.removeChild(collision)
      enemySound.play()
      punkte = punkte + 1;
      
    }

    if(parseInt(schuss.style.left) < 0 || parseInt(schuss.style.left) > spielfeld.clientWidth - schuss.clientWidth ||
        parseInt(schuss.style.top) < 0 || parseInt(schuss.style.top) > spielfeld.clientHeight - schuss.clientHeight) {
    	schuss.parentNode.removeChild(schuss)
    }
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);


function spawn_enemies() {
  var enemy = document.createElement("div");
  enemy.classList = ('enemy');
  spielfeld.appendChild(enemy);
  enemy.style.width = '64px';
  enemy.style.height = '64px';
  enemy.style.left = Math.floor(Math.random() * spielfeld.clientWidth - 20) + "px";
  enemy.style.top = Math.floor(Math.random() * spielfeld.clientHeight - 20) + "px";
  // enemy.setAttribute('data-angle', (180 - a) * Math.PI / 180)
}
// var villains = document.querySelectorAll('.enemy')

// for(var villain of villains) {
//   var enemyX = parseInt(enemy.style.left);
//   var enemyY = parseInt(enemy.style.top);
//   var rotation = enemy.getAttribute('data-angle')
//   enemy.style.left = 12 * Math.sin(rotation) + xPos + 'px'
//   enemy.style.top = 12 * Math.cos(rotation) + yPos + 'px'


//   if(parseInt(enemy.style.left) < 0 || parseInt(spieler.style.left) > spielfeld.clientWidth - schuss.clientWidth ||
//       parseInt(enemy.style.top) < 0 || parseInt(spieler.style.top) > spielfeld.clientHeight - schuss.clientHeight) {
//     enemy.parentNode.removeChild(schuss)
//   }
// }

