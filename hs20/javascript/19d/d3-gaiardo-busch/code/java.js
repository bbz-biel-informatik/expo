var spieler = document.querySelector('.player')
spieler.style.left = '0px'
spieler.style.bottom = '50px'


var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')
var beschleunigung = 0

vollbildButton.addEventListener('click', function () {
  spielfeld.requestFullscreen()
})
var backgroundPosition = 0;

var jumpsound = new Audio('jumpsound.wav')


var punkteAnzeige = document.querySelector('.punkte')
var score = 0


function loop() {
  if (keyboard(39)) {
    backgroundPosition = backgroundPosition + 5;
    spieler.style.backgroundImage = "url(walking.gif)"
    score = score + 1
    punkteAnzeige.textContent = score
  }

  if (keyboard(37)) {
    backgroundPosition = backgroundPosition - 5;
    spieler.style.backgroundImage = "url(walkingleft.gif)"
    score = score - 1
    punkteAnzeige.textContent = score
  }

  if (!keyboard(39) && !keyboard(37)) {
    spieler.style.backgroundImage = ""
  }

  if (parseInt(spieler.style.bottom) <= 0) {
    beschleunigung = 0
    spieler.style.bottom = '0px'
  } else {
    beschleunigung = beschleunigung - 0.4
    spieler.style.backgroundImage = "url(jump.png)"
  }

  if (keyboard(38) && parseInt(spieler.style.bottom) <= 0) {
    beschleunigung = 15
    jumpsound.play()
    
 
  }

  spieler.style.bottom = parseInt(spieler.style.bottom) + beschleunigung + 'px'

  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;
  

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

