var RUN = true

var punkteAnzeige = document.querySelector('.punkte')

var timer = new Timer(30)

var spieler = document.querySelector('.player')
spieler.style.left = '700px'
spieler.style.top = '325px'

var spielfeld = document.querySelector('.playground')

var breite = 1000, hoehe = 600
var score = 0

var gameOverScreen = document.querySelector('#game-over-screen')
var restartButton = document.querySelector('#restart')

var wincol = new Audio('sounds/win.wav')
var losecol = new Audio('sounds/lose.wav')

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var enemyList = []

function restartGame() {
  enemyList.forEach(enemy => enemy.render.remove())
  enemyList = []
  spieler.style.width = "20px"
  spieler.style.height = "20px"
  spieler.style.left = '700px'
  spieler.style.top = '325px'
  score = 0
  punkteAnzeige.textContent = score
  gameOverScreen.style.display = 'none'
  RUN = true
  window.requestAnimationFrame(loop)
}

restartButton.addEventListener("click", restartGame)

function loop() {

  // 1. Player movement
  if(keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
  }
  if(keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
  }
  if(keyboard(38)) {
    spieler.style.top = parseInt(spieler.style.top) - 5 + 'px'
  }
  if(keyboard(40)) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + 'px'
  }

  // 2. Collision handling
  var collisions = getCollisions(spieler, enemyList.map(enemy => enemy.render))
  collisions.forEach(enemy => {

    var spieler_size = spieler.offsetWidth * spieler.offsetHeight
    var enemy_size = enemy.offsetWidth * enemy.offsetHeight

    if(enemy_size <= spieler_size) {
      // EAT ENEMY
      wincol.pause()
      wincol.currentTime = 0
      wincol.play()
      score = score + 100
      punkteAnzeige.textContent = score
      spieler.style.width = spieler.offsetWidth + 2 + 'px'
      spieler.style.height = spieler.offsetHeight + 2 + 'px'
      enemy.remove()
    }
    else {
      // GET EATEN BY ENEMY: GAME OVER
      console.log("Game over")
      losecol.pause()
      losecol.currentTime = 0
      losecol.play()
      RUN = false
      gameOverScreen.style.display = 'block'
      return
    }
  })

  // 3. Create Enemies
  if (timer.ready()) {

    var direction = randomNumber(0, 4)
    var speed = randomNumber(0, 15)
    var size = randomNumber(spieler.offsetWidth - 10, spieler.offsetWidth + 15)
    var enemy = new Enemy(direction, speed, size)
    enemyList.push(enemy)
    spielfeld.appendChild(enemy.render)
  }

  // 4. Remove enemies out of bounds
  enemyList.forEach(enemy => {
    enemy.move()
    if(enemy.isOutOfBounds()) {
      enemyList.filter(enemy => !enemy.isOutOfBounds())
      enemy.render.remove()
    }
  })

  if(RUN) window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
