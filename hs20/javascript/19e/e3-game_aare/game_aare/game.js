var spieler = document.querySelector('.player')
spieler.style.left = '420px'
spieler.style.bottom = '50px'
var gegner1 = document.querySelector('.plastik')
var gegner2 = document.querySelector('.boot')
var gegner3 = document.querySelector('.mensch')
var gegner4 = document.querySelector('.buechse')

var timer = new Timer(200)
var timer2 = new Timer(290)
var timer3 = new Timer(240)
var timer4 = new Timer(260)

var spielfeld = document.querySelector('.playground')

var score = 0

var punkteAnzeige = document.querySelector(".punkte")

function loop() {

//Tastatur//
  if(keyboard(39)) {
   spieler.style.left = parseInt(spieler.style.left) + 10 + 'px'
 }
 if(keyboard(37)) {
   spieler.style.left = parseInt(spieler.style.left) - 12 + 'px'
 }

//Plastik//
 if(timer.ready()) {
   var h = document.createElement('div')
   h.classList.add('abfall')
   h.style.top = '0px'
   h.style.left = Math.random()*800 + 'px'
   spielfeld.appendChild(h)
 }

 var abfaelle = document.querySelectorAll('.abfall')
 for(var abfall of abfaelle) {
   abfall.style.top = parseInt(abfall.style.top) + 5 + 'px'
   if(parseInt(abfall.style.top) > 620) {
     abfall.parentNode.removeChild(abfall)
     score = score - 5
       punkteAnzeige.textContent = score
     if (score == 0) {
      if (confirm ("GAME OVER! Click OK to start again.")) {
        window.location.reload()
      }
     }
   }
 }

//Boote//
      if(timer2.ready()) {
        var h = document.createElement('div')
        h.classList.add('boot')
        h.style.top = '0px'
        h.style.left = Math.random()*800 + 'px'
        spielfeld.appendChild(h)
      }

      var boote = document.querySelectorAll('.boot')
      for(var boot of boote) {
        boot.style.top = parseInt(boot.style.top) + 5 + 'px'
        if(parseInt(boot.style.top) > 600) {
          boot.parentNode.removeChild(boot)
        }
 }

//Mensch//
  if(timer3.ready()) {
    var h = document.createElement('div')
    h.classList.add('mensch')
    h.style.top = '0px'
    h.style.left = Math.random()*800 + 'px'
    spielfeld.appendChild(h)
  }

  var menschen = document.querySelectorAll('.mensch')
  for(var mensch of menschen) {
    mensch.style.top = parseInt(mensch.style.top) + 5 + 'px'
    if(parseInt(mensch.style.top) > 590) {
      mensch.parentNode.removeChild(mensch)
    }
  }

  //Buechse//
   if(timer4.ready()) {
     var h = document.createElement('div')
     h.classList.add('buechse')
     h.style.top = '0px'
     h.style.left = Math.random()*800 + 'px'
     spielfeld.appendChild(h)
   }

   var buechsen = document.querySelectorAll('.buechse')
   for(var buechse of buechsen) {
     buechse.style.top = parseInt(buechse.style.top) + 5 + 'px'
     if(parseInt(buechse.style.top) > 620) {
       buechse.parentNode.removeChild(buechse)
       score = score - 5
         punkteAnzeige.textContent = score
       if (score == 0) {
        if (confirm ("GAME OVER! Click OK to start again.")) {
          window.location.reload()
        }
       }
     }
   }

//Collisions//
  var collisions = allCollisions(spieler, abfaelle)
    for(var collision of collisions) {
      collision.parentNode.removeChild(collision)
      score = score + 10
      punkteAnzeige.textContent = score
    }

    var collisions = allCollisions(spieler, boote)
      for(var collision of collisions) {
        collision.parentNode.removeChild(collision)
        score = score - 30
        punkteAnzeige.textContent = score
      }

    var collisions = allCollisions(spieler, menschen)
      for(var collision of collisions) {
        collision.parentNode.removeChild(collision)
        score = score - 20
        punkteAnzeige.textContent = score
      }

      var collisions = allCollisions(spieler, buechsen)
        for(var collision of collisions) {
          collision.parentNode.removeChild(collision)
          score = score + 10
          punkteAnzeige.textContent = score
        }

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
