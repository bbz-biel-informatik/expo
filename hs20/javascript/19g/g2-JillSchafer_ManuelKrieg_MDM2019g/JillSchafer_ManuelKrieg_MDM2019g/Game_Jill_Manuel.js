var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
var ball = document.querySelector('.ball')
spieler.style.left = '200px' // Startposition
spieler.style.top = '800px'
ball.style.left = '300px' // Startposition
ball.style.top = '650px'

var fail = new Audio('music/failmix.mp3')
var balken = new Audio('music/block.m4a')
var miss = new Audio('music/fail.mp3')
var background = new Audio('music/backgroundmusic.mp3')
var yipee = new Audio('music/Yipee.mp3')

var scoreAnzeige = document.querySelector('.score')
var punkteAnzeige = document.querySelector('.punkte')

var score = 3
var punkte = 0


for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    var block = document.createElement ("div")
    block.classList.add ("block")
    block.style.left = j*100+"px"
    block.style.top = i*50+"px"
    spielfeld.appendChild (block)

  }
}


function loop() {
  background.play()

  //Game over//
  if (score == 0) {
    background.pause()
    fail.play()
    setTimeout(()=>{
var antwort = confirm("GAME OVER. Neustarten?");
if (antwort){
  location.reload();
}},100);
    return;
  }


  var blocks = document.querySelectorAll('.block')
  var collisions = allCollisions(ball, blocks)

  // Entfernt Balken
  for(var collision of collisions) {
    balken.play()
    collision.parentNode.removeChild(collision)
    ball.setAttribute('data-angle', Math.random()*4)
    punkte = punkte + 1
    punkteAnzeige.textContent = punkte
  }

  // Kommentar: Kollision Spieler & Ball
  if(anyCollision(spieler, [ball])) {
    ball.setAttribute('data-angle', Math.random()*4)

  }

  // Kommentar: Linke Sperre
  if (parseInt (ball.style.left)<00){
    var rotation = ball.getAttribute('data-angle')
    ball.setAttribute('data-angle', 2*Math.PI-rotation)

  }
  // Kommentar: Rechte Sperre
  if (parseInt (ball.style.left)>750){
    var rotation = ball.getAttribute('data-angle')
    ball.setAttribute('data-angle', 2*Math.PI-rotation)

  }

  // Kommentar: untere Sperre
  if (parseInt (ball.style.top)>850){
    score = score - 1
    scoreAnzeige.textContent = score
    miss.play()
    ball.style.left = '300px' // Startposition
    ball.style.top = '650px'
    spieler.style.left = '200px' // Startposition
    spieler.style.top = '800px'
    var rotation = ball.getAttribute('data-angle')
    ball.setAttribute('data-angle', Math.PI-rotation)
}

  // Kommentar: obere Sperre
  if (parseInt (ball.style.top)<0){
    var rotation = ball.getAttribute('data-angle')
    ball.setAttribute('data-angle', Math.PI-rotation)

  }


  if(keyboard(38)) { //Balken*Spieler* Einstellung
    spieler.style.left = parseInt(spieler.style.left) + 10 + 'px'
  }
  if(keyboard(39)&&(parseInt (spieler.style.left)<620)) {
    spieler.style.left = parseInt(spieler.style.left) + 10 + 'px'
  }
  if(keyboard(37)&&(parseInt (spieler.style.left)>00)) {
    spieler.style.left = parseInt(spieler.style.left) - 10 + 'px'
  }


  var schuesse = document.querySelectorAll('.ball')
  for(var schuss of schuesse) {
    var xPos = parseFloat(schuss.style.left)
    var yPos = parseFloat(schuss.style.top)
    var rotation = schuss.getAttribute('data-angle')
    schuss.style.left = 6 * Math.sin(rotation) + xPos + 'px' //Geschwindigkeit Ball
    schuss.style.top = 6 * Math.cos(rotation) + yPos + 'px'
  }

  //erkennt, ob alle Blöcke weg sind //  bis 128 Punkte
  if (document.querySelectorAll(".block").length==0 && punkte<5*64) {
    yipee.play()

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var block = document.createElement ("div")
        ball.style.left = '300px' // Startposition
        ball.style.top = '650px'
        spieler.style.left = '200px' // Startposition
        spieler.style.top = '800px'
        block.classList.add ("block")
        block.style.left = j*100+"px"
        block.style.top = i*50+"px"
        spielfeld.appendChild (block)
      }
    }
  }



    //WIN//
    if (punkte == 320) {
      //fail.play()
      alert("WIN!");
      return;

    }

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
