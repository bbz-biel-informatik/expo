//https://game.bbz.cloud

//Definition der Variabeln
var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
var punkteAnzeige = document.querySelector('.punkte')
var gameOver = document.querySelector('.gameOver')
var score = 0
var timer = new Timer(90)
var startPosition = 0

//Start-position des Spielers
spieler.style.left = '240px'
spieler.style.top = '580px'

function loop() {
  //Generierung der Balken
  if(timer.ready()) {
    var h = document.createElement('div')
    h.classList.add('balken')
    h.style.top = '0px'
    h.style.left = Math.random() * 350 + 'px'
    spielfeld.appendChild(h)
  }

  //Ausblendung des Start-Balkens
  var dieBalken = document.querySelectorAll('.balken')
  for(var balken of dieBalken) {
    balken.style.top = parseInt(balken.style.top) + 2 + 'px'
    if(parseInt(balken.style.top) > 630) {
      balken.parentNode.removeChild(balken)
    }
  }

  //Kollision mit Spieler und Balken
  var c = anyCollision(spieler, dieBalken)

  if(parseInt(spieler.style.top)&&keyboard(32)) {
    score = score + 1
    punkteAnzeige.textContent = score
  }

  //Tastensteuerung
  if(keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
  }
  if(keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
  }
  if(keyboard(32)&&c&&startPosition<=0) {
    startPosition = 7
    c = false
  }

  //
  startPosition = startPosition - 0.2
  if(c) {
    startPosition= 0
  }
  spieler.style.top = parseInt(spieler.style.top) - startPosition + 'px'

  //Game over
  if (score>0) {
    firstBalken.style.display = 'none'
  }

  if (parseInt(spieler.style.left)>460 || parseInt(spieler.style.left)<0 || parseInt(spieler.style.top)<0 || parseInt(spieler.style.top)>610) {
    gameOver.style.visibility = 'visible';
    return
  }

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
