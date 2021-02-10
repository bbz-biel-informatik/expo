var spieler = document.querySelector('.player')

var punkteAnzeige = document.querySelector('.punkte')
var score = 0

spieler.style.bottom = '175px'

var spielfeld = document.querySelector('.playground')

var restart = document.querySelector('.restart')
restart.addEventListener('click', reload)

function reload() {
  window.location.reload()
}

var start = document.querySelector('.start-feld')
start.addEventListener('click', startgame)
function startgame() {
  window.requestAnimationFrame(loop)
  document.querySelector('.start-container').classList.add('hidden')
}

var a = 0

var timer = new Timer(180)

var backgroundPosition = 0

function loop() {
  backgroundPosition = backgroundPosition - 7
  spielfeld.style.backgroundPosition = backgroundPosition + "px bottom"

  //* Büsche *//
  if(timer.ready()) {
    var h = document.createElement('img')
    var random = Math.random()
    if (random < 0.25) {
      h.setAttribute('src','images/Busch1.png')
    } else if (random < 0.5) {
      h.setAttribute('src','images/Busch2.png')
    } else if (random < 0.75){
      h.setAttribute('src','images/Busch3.png')
    } else {
      h.setAttribute('src','images/Busch4.png')
    }

    h.classList.add('bush')
    h.style.left = '1400px'
    spielfeld.appendChild(h)
  }

  var bush = document.querySelectorAll('.bush')
   for(var b of bush) {
     b.style.left = parseInt(b.style.left) - 7 + 'px'
     if(parseInt(b.style.left) < 0) {
       b.parentNode.removeChild(b)
     }
   }

     // Kommentar: sobald der Spieler mit Gegner1 oder 2 kollidiert, ist das Spiel fertig
    if(anyCollision(spieler, bush)) {
      document.querySelector('.feld').style.display = 'block'
      document.querySelector('.highscore').textContent = score
      return
    }


   //* Punktanzahl *//
   if(parseInt(spieler.style.bottom) < 500) {
    score = score + 1
    punkteAnzeige.textContent = score
  }

   //* Tastensteuerung *//
   if((keyboard(38)||keyboard(32)) && parseInt(spieler.style.bottom) <= 175) {
      a = 11
    }

      a = a - 0.25
     if(parseInt(spieler.style.bottom) < 175) {
       a = 0
       spieler.style.bottom = '175px'
     }
     spieler.style.bottom = parseInt(spieler.style.bottom) + a + 'px'

     if(score == 1000) {
       timer = new Timer(140)
     }


  window.requestAnimationFrame(loop)
}
