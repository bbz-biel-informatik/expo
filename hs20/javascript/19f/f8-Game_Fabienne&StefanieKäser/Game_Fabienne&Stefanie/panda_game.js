var spieler = document.querySelector('.player')
var essen = new Audio('sound/crash.mp3')
essen.loop =false
/* Da das Audio nur abgespielt wird, wenn der Panda ein Fass berührt und nicht noch wenn er Bambus isst (Siehe ab ca. Zeile 93), haben wir die Audiodateien getauscht. Den Fehler konnten wir leider nicht selbstständig beheben.*/
var hinderniss = new Audio('sound/eat.mp3')
hinderniss.loop =false
var gegner1 = document.querySelector('.oel1')
gegner1.style.left = '300px'
gegner1.style.top = '50px'
var gegner2 = document.querySelector('.oel2')
gegner2.style.left = '100px'
gegner2.style.top = '100px'
var gegner3 = document.querySelector('.oel3')
gegner3.style.left = '200px'
gegner3.style.top = '150px'
var gegner4 = document.querySelector('.oel4')
gegner4.style.left = '250px'
gegner4.style.top = '220px'
var gegner5 = document.querySelector('.oel5')
gegner5.style.left = '50px'
gegner5.style.top = '250px'
var gegner6 = document.querySelector('.oel6')
gegner6.style.left = '350px'
gegner6.style.top = '350px'
var bambus = document.querySelector('.food')
var spielfeld = document.querySelector('.playground')
var timer = new Timer(120)
var punkteAnzeige = document.querySelector('#score')
var score = 0
spieler.style.left = '-5px'
spieler.style.top = '-5px'
var x=2
var y=0

var beschrieb = "Bewege den Panda mit den Pfeiltasten. Sammle Bambus, wachse und erhalte Punkte. Kommst du jedoch einem Fass an, heisst es Game Over "
alert (beschrieb)
function loop() {

	  

	 if(keyboard(39)) {
    x=2
    y=0
  }
  else if(keyboard(37)) {
    x=-2
    y=0
  }
	else if(keyboard(38)) {
    y=-2
    x=0
  }
  else if(keyboard(40)) {
    y=2
    x=0
  }
  spieler.style.left = parseInt(spieler.style.left) + x + 'px'
  spieler.style.top = parseInt(spieler.style.top) + y + 'px'
  if (parseInt(spieler.style.top)>365) {
    spieler.style.top="-5px"
  }
  if (parseInt(spieler.style.top)<-5) {
    spieler.style.top="365px"
  }
  if (parseInt(spieler.style.left)<-5) {
  spieler.style.left="365px"
  }
  if (parseInt(spieler.style.left)>365) {
  spieler.style.left="-5px"
  }

  var b = allCollisions(spieler,[bambus])
   if(b.length > 0) {
    score = score + 1
    punkteAnzeige.textContent = score
    b[0].style.left = Math.random() * 350 + 'px'
    b[0].style.top = Math.random() * 350 + 'px'
  }

  if(anyCollision(spieler, [gegner1, gegner2, gegner3, gegner4, gegner5, gegner6])) {
    alert("Game Over! Neu starten?")
    location.reload()
    return
  }


  var collisions = allCollisions(spieler, [bambus])
  
  for(var collision of collisions) {
    collision.parentNode.removeChild(collision)
  }

  if(allCollisions(spieler, [bambus])) {
    essen.load()
    essen.play()
  }
 if(anyCollision(spieler, [gegner1, gegner2, gegner3, gegner4, gegner5, gegner6])) {
    hinderniss.load()
    hinderniss.play()
  }
  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)