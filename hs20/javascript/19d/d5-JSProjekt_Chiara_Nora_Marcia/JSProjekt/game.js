var player = document.querySelector('.fish') // Wählt die Klasse .fish im HTML-Dokument und speichert sie in die Variable player
player.style.top = '300px' // Position Fisch
player.style.height = '150px' // Grösse Fisch
player.style.width = 'auto' // Grösse Fisch angepasst an Höhe

var background = document.querySelector('.playground') // Wählt die Klasse .playground im HTML-Dokument und speichert sie in die Variable background

var failPoints = document.querySelector('.failpoints')
var scorePoints = document.querySelector('.points') // Wählt die Klasse .points im HTML-Dokument und speichert sie in die Variable scorePoints
var score = 0 // Die Variable score beinhaltet den Wert 0

var backgroundSound = new Audio('sounds/Music.mp3') // Wählt eine Audiodatei im Ordner sound und speichert sie in die Variable BackgroundSound
backgroundSound.loop=true //Wiederholt die Musik in der Variable backgroundSound


var backgroundposition = 0 // Die Variable backgroundposition beinhaltet den Wert 0

var fail = document.querySelector('.fail')

/**Generiert alle definierten Sekunden ein neues Objekt und speichert es in der entsprechenden Variable**/

var timerMuenze = new Timer(60)
var timerStein = new Timer(90)
var timerGras = new Timer(120)
var timerShark = new Timer(120)


/*Gibt an was passieren soll*/
function loop() {
  backgroundSound.play() // Musik in der Variable backgroundSound wird abgespielt

  /*Hintergrund bewegen*/
  backgroundposition = backgroundposition - (5+score*0.5) //*0.5 Der in backgroundposition definierte Wert minus 5 verschiebt das Bild um 5 Pixel nach hinten, wird der in score definierte Wert grösser vergrössert sich auch die Grösse der Pixel die das Bild verschieben. Desto grösserer Wert, desto schneller läuft das Bild. */
  background.style.backgroundPosition = backgroundposition + 'px bottom'

  /*Tastaturbefehle ausführen*/
  if (keyboard(40)&& parseInt(player.style.top)< background.clientHeight - player.clientHeight) { // Der Befehl soll nur ausgeführt werden, wenn der player den unteren Rand vom background noch nicht erreicht hat
    player.style.top = parseInt(player.style.top) + 5 + 'px' // Der Abstand von oben zum player soll sich um 5 px vergrössern, wenn die Pfeiltaste 'runter' gedrückt wird 
  }
  if (keyboard(38)&& parseInt(player.style.top)> 40) { // Der Befehl soll nur ausgeführt werden, wenn der player mehr als 20 px vom oberen Rand entfernt ist
    player.style.top = parseInt(player.style.top) - 5 + 'px' // Der Abstand von oben zum player soll sich um 5 px verringern, wenn die Pfeiltaste 'hoch' gedrückt wird
  }

  /*Münzen generieren und ausgeben*/
  if (timerMuenze.ready()) { // Wenn timerMuenze abgelaufen ist, soll folgendes passieren
    var createMünze = document.createElement('img') // Ein Bildobjekt soll generiert und in der Variable c gespeichert werden
    createMünze.setAttribute('src', 'img/geld.png') // Das in der Variable c gespeicherte Bildobjekt soll img/geld.png in die source speichern
    createMünze.classList.add('coints') // Das in der Variable c gespeicherte Bildobjekt soll die Klasse .coints haben
    createMünze.style.bottom = 200 + Math.random() * 450 + 'px' // Das in der Variable c gespeicherte Bildobjekt soll zwischen 200 und 500 px vom unteren Rand generiert werden
    createMünze.style.left = '1300px' // Das in der Variable c gespeicherte Bildobjekt soll einen Abstand von 1300 px vom linken Rand haben
    background.appendChild(createMünze) //
  }

  var Münzen = document.querySelectorAll('.coints') // Wählt die Klasse .coints im HTML-Dokument und speichert sie in die Variable Münzen
  for (var Münze of Münzen) { // Der Befehl gilt für eine einzelne generierte Münze aus der Variable Münzen
    Münze.style.width = '70px' // Grösse Münze
    Münze.style.height = 'auto' // Grösse Münze angepasst an Breite
    Münze.style.left = parseInt(Münze.style.left) - (5+score*0.5) + 'px' // Jede Münze soll 5 px mehr vom linken Rand generiert werden als die Münze vorher 

    if (parseInt(Münze.style.left) < 0) { // Wenn die Münze weniger Abstand als 0 px zum linken Rand hat wird folgender Befehl ausgeführt
      Münze.parentNode.removeChild(Münze) // Münze verschwindet
    }
  }

  /*Kollision Münze mit Spieler*/
  var collisionsMünzen = allCollisions(player, Münzen) // Jede Zusammenstoss zwischen dem Spieler und Münzen wird in der Variable collisionsMünzen gespeichert
  for(var collisionMünze of collisionsMünzen){
    collisionMünze.parentNode.removeChild(collisionMünze)
    score = score + 1 // Der Wert in der Variable score wird um eins hochgezählt
       scorePoints.textContent = score // Der neue Wert in der Variable score wird in der Variable scorePoints gespeichert und als Text ausgegeben
       failPoints.textContent = score
      }

  /*Stein generieren und ausgeben*/
  if (timerStein.ready()) {
    var createStein = document.createElement('img')
    createStein.setAttribute('src', 'img/stein.png')
    createStein.classList.add('Stein')
    createStein.style.bottom = '0px'
    createStein.style.left = '1100px'
    background.appendChild(createStein)
    timerStein = new Timer(90+Math.random()*60) // Der Wert in der Variable timerStein soll neu einen Wert zwischen 90 und 120 haben
  }

  var Steine = document.querySelectorAll('.Stein')
  for (var Stein of Steine) {
    Stein.style.width = '150px'
    Stein.style.height = 'auto'
    Stein.style.left = parseInt(Stein.style.left) - (5+score*0.5) + 'px'

    if (parseInt(Stein.style.left) < 0) {
      Stein.parentNode.removeChild(Stein)
    }
  }
  
  /*Kollision Steine mit Spieler*/
  var collisionsSteine = allCollisions(player, Steine)
  for(var collisionStein of collisionsSteine) {
    collisionStein.parentNode.removeChild(collisionStein)
    
    var scoreMünze = document.querySelector('.collectpoints')
    backgroundSound.pause()
    fail.style.display = 'flex'
    scoreMünze.style.display = 'none'
    return
  }

  /*Hai generieren und ausgeben*/
  if (timerShark.ready()) {
    var createShark = document.createElement('img')
    createShark.setAttribute('src', 'img/hai.png')
    createShark.classList.add('shark')
    createShark.style.bottom = 200 + Math.random() * 400 + 'px' // Haie sollen sich von Unten zwischen 200 und 400 px verteilen
    createShark.style.left = '1100px'
    background.appendChild(createShark)
  }

  var Haie = document.querySelectorAll('.shark')
  for (var Hai of Haie) {
    Hai.style.width = '250px'
    Hai.style.height = 'auto'
    Hai.style.left = parseInt(Hai.style.left) - (5+score*0.5) + 'px'

    if (parseInt(Hai.style.left) < 0) {
      Hai.parentNode.removeChild(Hai)
    }
  }

  /*Kollision Hai mit Spieler*/
  var collisionsHaie = allCollisions(player, Haie)
  for(var collisionHai of collisionsHaie){
  collisionHai.parentNode.removeChild(collisionHai)

  var scoreMünze = document.querySelector('.collectpoints')
  backgroundSound.pause()
  fail.style.display = 'flex'
  scoreMünze.style.display = 'none'
  return
  }

  /*Gras generieren und ausgeben*/
  if (timerGras.ready()) {
    var createAlge = document.createElement('img')
    createAlge.setAttribute('src', 'img/seegras.png')
    createAlge.classList.add('gras')
    createAlge.style.bottom = '0px'
    createAlge.style.left = '1050px'
    background.appendChild(createAlge)
    timerGras = new Timer(30+Math.random()*90)
  }

  var Gräser = document.querySelectorAll('.gras')
  for (var Gras of Gräser) {
    Gras.style.width = '300px'
    Gras.style.height = 'auto'
    Gras.style.left = parseInt(Gras.style.left) - (5+score*0.5) + 'px'

    if (parseInt(Gras.style.left) < 0) {
      Gras.parentNode.removeChild(Gras)
    }
  }


  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)