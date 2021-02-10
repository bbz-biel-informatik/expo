// Einmalige Ausführung als Setup 

var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')

vollbildButton.addEventListener('click', function () {
  spielfeld.requestFullscreen()
})

spieler.style.left = 0
spieler.style.top = 0
spieler.style.right = 0
spieler.style.bottom = 0

var timerhindernis = new Timer(35)
var timerabfall = new Timer(30)
var score = 0
var punkteAnzeige = document.querySelector('.punkte')
var zeitmessungAnzeige = document.querySelector('.zeitmessung')
var tempo = 1

// Hintergrundmusik und Soundeffects
var music = new Audio('sound/underthesea.mp3')
var playing = false

var zusammenstossen = new Audio('sound/zusammenstossen.mp3')
var einsammeln = new Audio('sound/einsammeln.mp3')

var startzeit = new Date().getTime()

function loop() {

  tempo = tempo + 0.002
  var zeit = new Date().getTime() - startzeit
  zeitmessungAnzeige.textContent = zeit

  // Neustart
  if(score<0){
    var username = prompt("Benutzername")
    var formData = new FormData();

  formData.append("game", "Joyclean");
  formData.append("name", username);
  formData.append("score", zeit);

  var request = new XMLHttpRequest();
  request.open("POST", "https://scores.bbz.cloud/score");
  request.send(formData);
    var antwort=confirm("Neustart?")
    if(antwort){
      window.location.reload();
    }
    return
  }

  // Nemo Hindernis
  if (timerhindernis.ready()) {
    timerhindernis = new Timer(35-tempo)
    var h = document.createElement('div')
    h.classList.add('hindernis')
    h.style.top = Math.random() * 900 + 'px'
    h.style.left = '1300px'
    spielfeld.appendChild(h)
  }

  var hindernisse = document.querySelectorAll(".hindernis")
  for (var hindernis of hindernisse) {
    hindernis.style.left = parseInt(hindernis.style.left) - 1 - tempo + 'px' 
    if(parseInt(hindernis.style.left) < -200) {
      hindernis.parentNode.removeChild(hindernis)
    }
  }

  // Abfall von rechter Seite, Plastikmüll einsammeln
  if (timerabfall.ready()) {
    timerabfall = new Timer(30-tempo)
    var h = document.createElement('div')
    h.classList.add('abfall')
    h.style.top = Math.random() * 900 + 'px'
    h.style.left = '1300px'
    spielfeld.appendChild(h)
  }

  var abfall = document.querySelectorAll(".abfall")
  for (var abfall of abfall) {
    abfall.style.left = parseInt(abfall.style.left) - 1 - tempo + 'px'
    if(parseInt(abfall.style.left) < -200) {
      abfall.parentNode.removeChild(abfall)
    }
  }

  // Ständige Ausführung während dem Spiel 
  // Steuerung 

  // rechts
  if (keyboard(39)&& parseInt(spieler.style.left) < spielfeld.clientWidth - spieler.clientWidth) {
    spieler.style.left = parseInt(spieler.style.left) + tempo * 3 + 'px'
    spieler.style.backgroundImage="URL(fotos/taucher.png)"
  // down
  } else if (keyboard(40)&& parseInt(spieler.style.top) < spielfeld.clientHeight - spieler.clientHeight) { 
    spieler.style.top = parseInt(spieler.style.top) + tempo * 3 + 'px'
  // links
  } else if (keyboard(37)&& parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - tempo * 3 + 'px'
    spieler.style.backgroundImage="URL(fotos/taucherlinks.png)"
  // up
  } else if (keyboard(38)&& parseInt(spieler.style.top) > 0) {
    spieler.style.top = parseInt(spieler.style.top) - tempo * 3 + 'px'
  }

  // Pet Abfall, den man einsammeln muss
  var abfall = document.querySelectorAll(".abfall")
  var collisions = allCollisions(spieler, abfall)
  // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
  for(var collision of collisions) {
      score = score + 10
      punkteAnzeige.textContent = score
    collision.parentNode.removeChild(collision)
    einsammeln.play()
  }

  // Fische, denen man ausweichen muss
  var hindernisse = document.querySelectorAll(".hindernis")
  var collisions = allCollisions(spieler, hindernisse)
  // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
  for(var collision of collisions) {
      score = score - 3
      punkteAnzeige.textContent = score
      zusammenstossen.play()
  }

  window.requestAnimationFrame(loop);

}

// Musik abspielen
document.addEventListener('click', function () {
  if (!playing) {
    music.play()
    playing = true
    window.requestAnimationFrame(loop);
  }
})

