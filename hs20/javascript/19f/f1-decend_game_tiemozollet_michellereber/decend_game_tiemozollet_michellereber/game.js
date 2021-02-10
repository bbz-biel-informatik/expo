var spieler = document.querySelector('.player')
spieler.style.left = '8px'
spieler.style.top = '50px'
var end = document.querySelector('.end')
end.style.top = '0px'
var punkteAnzeige = document.querySelector('.punkte')
var score = 0;
var timer = new Timer(30);



var spielfeld = document.querySelector('.playground')
var backgroundPosition = 0;
function loop() {

  // timer
  if (timer.ready()) {
    var f = document.createElement('div')
    f.classList.add('floor')
    f.style.top = '430px'
    f.style.left = '8px'
    spielfeld.appendChild(f)
    var floor = document.querySelector('.floor')

    var h = document.createElement('div')
    h.classList.add('hole')
    h.style.top = '430px'
    h.style.left = Math.floor(Math.random() * 340) + 8;
    spielfeld.appendChild(h)
    var hole = document.querySelector('.hole')
  }

  var floors = document.querySelectorAll('.floor')
  for (var floor of floors) {
    floor.style.top = parseInt(floor.style.top) + -4 + 'px'
    if (parseInt(floor.style.top) < 45) {
      floor.parentNode.removeChild(floor)
    }
  }

  var holes = document.querySelectorAll('.hole')
  for (var hole of holes) {
    hole.style.top = parseInt(hole.style.top) + -4 + 'px'
    if (parseInt(hole.style.top) < 45) {
      hole.parentNode.removeChild(hole)
    }
  }

  if (parseInt(spieler.style.top) > 50) {
    score = score + 1
    punkteAnzeige.textContent = score
  }

  if (anyCollision(spieler, [end])) {
    alert("Game over!")
    return
  }


  //gravity
  if (parseInt(spieler.style.top) < 431) {
    //funktioniert nicht, ich kann keine generierten Objekte collision abfragen machen
    if (anyCollision(spieler, [floor]) && !anyCollision(spieler, [hole])) {
      spieler.style.top = parseInt(spieler.style.top) + -4 + 'px'
      return
    } else {
      spieler.style.top = parseInt(spieler.style.top) + 5 + 'px'
    }
  }
  /*
  if(parseInt(spieler.style.top) < 431) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + 'px'
  } */


  backgroundPosition = backgroundPosition + 2;
  spielfeld.style.backgroundPosition = `0 -${backgroundPosition}px `;

  if (keyboard(39) && parseInt(spieler.style.left) < 385) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
  }
  if (keyboard(37) && parseInt(spieler.style.left) > 10) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
  }
  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
