var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
var schussSound = new Audio('audio/schuss.mp3')
var enemyExplosion = new Audio('audio/explosion.mp3')
var music = new Audio('audio/music.mp3')
var backgroundPosition = 0;
var score = 0;
var punkteAnzeige = document.querySelector('.punkte')
var punkteAnzeige2 = document.querySelector('.punkte2')
var timer = new Timer(250)
var GameOver = document.querySelector("#gameover")
var button = document.querySelector(".button")

spieler.style.left = '0px'
spieler.style.bottom = '0px'

function spawnEnemy(){
  var enemy = document.createElement('div');
  var randomPosition = Math.floor(Math.random() * 320) + 30 ;
  enemy.classList.add('enemy')
  enemy.style.top = 0;
  enemy.style.left = randomPosition + "px";
  spielfeld.appendChild(enemy);
  }

GameOver.style.display = 'none';

var i;
for (i = 0; i < 3; i++) {
  setTimeout(function () {
    spawnEnemy()
  }, 300 * i);
}

function loop() {
  
  music.play();

  if(timer.ready()) {
    var i;
    for (i = 0; i < (Math.sqrt(score)*0.3); i++) {
      setTimeout(function () {
        spawnEnemy()
      }, (30000/(4*Math.sqrt(score))) * i);
    }
  }

  if(parseInt(spieler.style.left) > -1) {
    score = score + 1
    punkteAnzeige.textContent = score
    punkteAnzeige2.textContent = score
  }

  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = ` 0px ${backgroundPosition}px`;

  if(keyboard(39) && parseInt(spieler.style.left) < 340)  {
      spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
  }

  if(keyboard(68) && parseInt(spieler.style.left) < 340)  {
    spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
  }

  if(keyboard(37) && parseInt(spieler.style.left) > 0) {
      spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
  }

  if(keyboard(65) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
  }
  if(mouseClick()) {
    var spielerX = parseInt(spieler.style.left)
    var spielerY = parseInt(spieler.style.bottom)
    
    var schuss = document.createElement('div')
    schuss.classList.add('shot')
    schuss.style.left = spielerX  + 29 + "px";
    schuss.style.bottom = spielerY
    spielfeld.appendChild(schuss)

    schussSound.pause()
    schussSound.currentTime = 0
    schussSound.play()
  }

  var schuesse = document.querySelectorAll('.shot')
  for(var schuss of schuesse) {
    var yPos = parseFloat(schuss.style.bottom)
    schuss.style.bottom = 10 + yPos + 'px'
    if(parseInt(schuss.style.bottom) < 0 || parseInt(schuss.style.bottom) > 700) {
    	schuss.parentNode.removeChild(schuss)
    } 
  }

  var enemies = document.querySelectorAll('.enemy')
  for(var enemy of enemies) {
    var yPos = parseFloat(enemy.style.top)
    enemy.style.top = 2 + yPos + 'px'
    if(parseInt(enemy.style.top) < 0 || parseInt(enemy.style.top) > 650) {
      punkteAnzeige.style.display = 'none';
      GameOver.style.display = 'flex';
      button.style.position = 'center';
      enemy.parentNode.removeChild(enemy)
      clearInterval(interval);
      {break}
    } 
  }

    for(var schuss of schuesse) {
      var collisions = allCollisions(schuss, enemies)
      for(var collision of collisions) {
        schuss.parentNode.removeChild(schuss)

        collision.style.backgroundImage = "url('img/explosion.gif')";
        
        setTimeout(() => {collision.parentNode.removeChild(collision)}, 300)
        
        enemyExplosion.pause()
        enemyExplosion.currentTime = 0
        enemyExplosion.play()
      }
    }
    

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)