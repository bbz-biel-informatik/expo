var spieler = document.querySelector('.player')
spieler.style.left = '1000px'

var spielfeld = document.querySelector('.playground')
var backgroundPosition = 0;

var timer = new Timer(60)
var timerbaum = new Timer(60)

var punkteAnzeige = document.querySelector('.punkte')
var score = 0

var savanna = new Audio('savanna.wav')

function loop() {
  if (keyboard(39) && parseInt(spieler.style.left) < spielfeld.clientWidth - spieler.clientWidth) {
    spieler.style.left = parseInt(spieler.style.left) + 20 + 'px'
  }

  if (keyboard(37) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 20 + 'px';
  }

  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `0 ${backgroundPosition}px`;

  if (timer.ready()) {
    var createoase = document.createElement('div')
    createoase.classList.add('oase')
    createoase.style.top = '0px'
    createoase.style.left = Math.random() * 1800 + 'px'
    spielfeld.appendChild(createoase)
  }

  var oasen = document.querySelectorAll('.oase')
  for (var oase of oasen) {
    oase.style.top = parseInt(oase.style.top) + 5 + 'px'
    if (parseInt(oase.style.top) > 1000) {
      oase.parentNode.removeChild(oase)
    }
  }

  if (timerbaum.ready()) {
    var createbaum = document.createElement('div')
    createbaum.classList.add('baum')
    createbaum.style.top = '0px'
    createbaum.style.left = Math.random() * 1800 + 'px'
    spielfeld.appendChild(createbaum)
  }

  var baume = document.querySelectorAll('.baum')
  for (var baum of baume) {
    baum.style.top = parseInt(baum.style.top) + 5 + 'px'
    if (parseInt(baum.style.top) > 1000) {
      baum.parentNode.removeChild(baum)
    }
  }

  if (parseInt(spieler.style.left) > 200) {
    score = score + 1
    punkteAnzeige.textContent = score
  }

  if (anyCollision(spieler, oasen) || anyCollision(spieler, baume)) {
    alert("GAME OVER")
    location.reload()
    return
  }

  savanna.play()

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)