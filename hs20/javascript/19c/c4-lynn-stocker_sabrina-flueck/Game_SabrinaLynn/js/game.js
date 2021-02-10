var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
var timer = new Timer(60)
var timer2 = new Timer(200)
var punkteAnzeige = document.querySelector('.punkte')
var score = 0
var stein = document.querySelector('.stein')
var gegner = document.querySelector('.gegner')
var over = document.querySelector('.over')
var text = document.querySelector('.overlay')

spieler.style.left = '0px'
spieler.style.bottom = "0px"

function loop() {

  if(timer.ready()) {
    var h = document.createElement('div')
    h.classList.add('stein')
    h.style.top = '0px'
    h.style.left = Math.random () *800 + "px"
    spielfeld.appendChild(h)
  }

  if(timer2.ready()) {
    var h = document.createElement('div')
    h.classList.add('gegner')
    h.style.top = '0px'
    h.style.left = Math.random () *600 + "px"
    spielfeld.appendChild(h)
  }

  if(keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 6 + 'px'
  }
  if(keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 6 + 'px'
  }

  var steine = document.querySelectorAll (".stein")
  for (var stein of steine){
    stein.style.top = parseInt(stein.style.top) + 3 + 'px'
    if (parseInt(stein.style.top)>520) {
      stein.parentNode.removeChild (stein)
    }
  }

  var gegners = document.querySelectorAll (".gegner")
  for (var gegner of gegners){
    gegner.style.top = parseInt(gegner.style.top) + 3 + 'px'
    if (parseInt(gegner.style.top)>480) {
      gegner.parentNode.removeChild (gegner)
    }
  }

  var collisions = allCollisions(spieler, steine)
  for(var collision of collisions) {
     score = score + 1
     punkteAnzeige.textContent = score
     collision.parentNode.removeChild(collision)
   }

  var collisions = allCollisions(spieler, gegners)
  for(var collision of collisions) {
    over.style.visibility='visible';
    collision.parentNode.removeChild(collision)
    return
  }

   window.requestAnimationFrame(loop)

}

window.requestAnimationFrame(loop)
