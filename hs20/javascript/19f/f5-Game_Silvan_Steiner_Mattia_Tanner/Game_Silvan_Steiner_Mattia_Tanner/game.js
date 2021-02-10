var spieler = document.querySelector('.player')
spieler.style.left = '0px'
var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')
var score = 0
var punkteAnzeige = document.querySelector('.punkte')

vollbildButton.addEventListener('click', function () {
  spielfeld.requestFullscreen()
})
var timer = new Timer(20)

function loop() {

  if(timer.ready()) {
    if(parseInt(spieler.style.left) > 200) {
      score = score + 1
      punkteAnzeige.textContent = score
    }
    
    var h = document.createElement('div')
    h.classList.add('stein')
    h.style.top = '0px'
    h.style.left = Math.random()*1600+'px'
    spielfeld.appendChild(h)
  }

  var steine = document.querySelectorAll('.stein')
  for(var stein of steine) {
    stein.style.top = parseInt(stein.style.top) + 5 + 'px'
    if(parseInt(stein.style.top) > 1000) {
      stein.parentNode.removeChild(stein)
      
    }
  }

  if(anyCollision(spieler, steine)) {
    alert("Game over!")
    return
  }

  if(keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 15 + 'px'
  }
  if(keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 15 + 'px'
  }

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)