var spieler = document.querySelector('.player')
spieler.style.top = '-100px'
spieler.style.left = '200px'

var playground = document.querySelector('.playground')
var backgroundPosition = 0;

var zeitanzeige = document.querySelector('.zeit')
var timer = 30
var timerz = 30
var a = 0
var zeitstart = (new Date()).getTime()

var gameover = new Audio ('daten/gameover.wav')
var music = new Audio ('daten/music.mp3')


//Button help
function FunctionClick() {
  alert('Du hast den Bus verpasst und musst nun auf den Zug rennen um ihn nicht zu verpassen. \n Auf dem Weg liegen Bananenschalen und andere Hindernisse. Spring über sie um nicht hängenzubleiben. \n Springen kann man mit der Leertaste. Versuche möglichst lange durchzuhalten. Viel Glück!');
  window.location.reload()
}


function loop() {
  
  //Hintergrundmusik
  music.play()

  //Timer
  timer = timer - 1

  var zeit = (new Date()).getTime() - zeitstart

  zeitanzeige.textContent = Math.round(zeit / 1000)

  //Timer zwei
  timerz = timerz - 1

  //Springen
  if(parseInt(spieler.style.top) > 600) {
    a = 0
  }
  if(keyboard(32)) {
    a = 5
  }
  a = a - 0.5
  spieler.style.top = parseInt(spieler.style.top) - a + 'px'


  //Hintergrund
  backgroundPosition = backgroundPosition + 5;
  playground.style.backgroundPosition = `-${backgroundPosition}px 0`;


  //Hindernisse
  if(timer < 0) {
    timer = 50 + Math.random() * 100
    var b = document.createElement('img');
    var zahl = Math.random()
    if(zahl < 0.5){
      b.setAttribute("src", "daten/banane.png");
      b.classList.add('banana')
    } else {
      b.setAttribute("src", "daten/plant.png");
      b.classList.add('plant')
    }
    b.style.right = '0px'
    playground.appendChild(b)
  }


  var hindernisse = document.querySelectorAll('.banana, .plant')
  for(var hindernis of hindernisse) {
    hindernis.style.right = parseInt(hindernis.style.right) + 5 + 'px'
    if(parseInt(hindernis.style.right) > 1920) {
      hindernis.parentNode.removeChild(hindernis)
    }
  }

  //Wolken (Hindernis)
  if(timerz < 0) {
    timerz = 100 + Math.random() * 100
    var w = document.createElement('img');
    var zahlz = Math.random()
    if(zahlz < 0.5){
      w.setAttribute("src", "daten/wolke1.png");
      w.classList.add('wolkea')
    } else {
      w.setAttribute("src", "daten/wolke2.png");
      w.classList.add('wolkeb')
    }
    w.style.right = '0px'
    playground.appendChild(w)
  }


  var wolken = document.querySelectorAll('.wolkea, .wolkeb')
  for(var wolke of wolken) {
    wolke.style.right = parseInt(wolke.style.right) + 5 + 'px'
    if(parseInt(wolke.style.right) > 1920) {
      wolke.parentNode.removeChild(wolke)
    }
  }

  
  // Kollision (sobald der Spieler mit Hindernissen kollidiert, ist das Spiel fertig)
  if(anyCollision(spieler, hindernisse)) {
    gameover.play()
    alert('Game over!' + '\n' + 'Score: ' + Math.round(zeit / 1000) + ' Sekunden')
    var neustart = confirm('Neustart?')
    if(neustart) {
      window.location.reload()
    }
      return
  }

    // Kollision (sobald der Spieler mit den Wolken kollidiert, ist das Spiel fertig)
    if(anyCollision(spieler, wolken)) {
      gameover.play()
      alert('Game over!' + '\n' + 'Score: ' + Math.round(zeit / 1000) + ' Sekunden')
      var neustart = confirm('Neustart?')
      if(neustart) {
        window.location.reload()
      }
        return
    }


  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)