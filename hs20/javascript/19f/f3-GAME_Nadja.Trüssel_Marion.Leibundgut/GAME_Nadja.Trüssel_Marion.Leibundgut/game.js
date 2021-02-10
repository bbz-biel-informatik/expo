// Vollbild
var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')


//Spielbeschreibung


alert("Sammle alle Planeten ein und weiche den Meteoriten aus. Bist du bereit? Dann klicke in den weissen Bereich neben dem Spielfeld um das Spiel zu starten\r\n\r\nIst das Spiel zu einfach? Klicke erneut in die weisse Fläche um die Geschwindigkeit zu erhöhen.")
document.addEventListener ("click",function(){
  var audio = new Audio('Euro Sat Theme Song.mp3')
  audio.play()
  window.requestAnimationFrame(loop)
})


// Timer
var timerstein = new Timer(90)

//Vollbildmodus
vollbildButton.addEventListener('click', function () {
  spielfeld.requestFullscreen()
})

//Hintergrundbild
var hintergrundbild = document.querySelector('.playground')
var backgroundPosition = 0;


//Funktion
var spieler = document.querySelector('.player')
spieler.style.left = '0px'
spieler.style.top = '0px'
var timer = new Timer(40)

//Punkteanzeige
var punkteAnzeige = document.querySelector('.punkte')
var score = 0

//Tastatursteuerung
function loop() {

  if(keyboard(32)&&parseInt(spieler.style.top)>0) {
    spieler.style.top = parseInt(spieler.style.top) - 20 + 'px'
  }

  //Schwerkraft
  if(parseInt(spieler.style.top) < spielfeld.clientHeight-20) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + 'px'
  }
  if(parseInt(spieler.style.left) < 40) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
  }
  //Planeten
  var planeten = document.querySelectorAll(".planet")
  var collisions = allCollisions(spieler, planeten)
  for(var collision of collisions) {
    collision.parentNode.removeChild(collision)

    //score
    score = score + 1
    punkteAnzeige.textContent = score
  }

  // Planeten
  for(var planet of planeten) {
    planet.style.left = parseInt(planet.style.left) - 5 + 'px'
    if(parseInt(planet.style.left) < -100) {
      planet.parentNode.removeChild(planet)
    }
  }
  //Timer Planeten
  if(timer.ready()) {
    var m = document.createElement("div")
    m.classList.add("planet")
    m.style.left = spielfeld.clientWidth+'px'
    m.style.top = Math.random()*(spielfeld.clientHeight-100)+'px'
    spielfeld.appendChild(m)
  }

  //Stein
  if(timerstein.ready()) {
    var h = document.createElement('div')
    h.classList.add('stein')
    h.style.right = '-200px'
    h.style.top = Math.random()*(spielfeld.clientHeight-30)+'px'
    spielfeld.appendChild(h)
  }

  // Restart
  var steine = document.querySelectorAll('.stein')
  if(anyCollision(spieler, steine)) {
    if (confirm("Game over!\r\nMöchtest du das Spiel neu starten?")){
      window.location.reload ()
      return
    } else {
      return
    }

    // Stein
  }
  for(var stein of steine) {
    stein.style.right= parseInt(stein.style.right) + 5 + 'px'
    if(parseInt(stein.style.right) > spielfeld.clientWidth) {
      stein.parentNode.removeChild(stein)
    }
  }

  //hintergrundbewegung
  backgroundPosition = backgroundPosition + 5;
  hintergrundbild.style.backgroundPosition = `-${backgroundPosition}px 0`;






  window.requestAnimationFrame(loop)
}
