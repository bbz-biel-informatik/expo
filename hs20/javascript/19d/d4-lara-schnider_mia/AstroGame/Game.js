var spieler = document.querySelector('.player')
spieler.style.top = '400px'
spieler.style.left = '200px'
var spielfeld = document.querySelector('.playground')
var timer = new Timer(800)
var timer2 = new Timer(600)
var timer3 = new Timer(400)
var sound = new Audio('Sound/sound.mp3')



//Tastatursteuerung//
spieler.style.left = '0px'


var h = document.createElement('img')
var a = document.createElement('img')
var e = document.createElement('img')



function restart (e){
      document.querySelector('.overlay').style.display = 'none';
      location.reload()
  }




  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  var timerInterval = setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }




function loop() {


  if (anyCollision(spieler, [h, a, e])) {
    gameover();
    document.querySelector('.yourtime').innerHTML = 'Your Time is '+totalSeconds
    clearInterval(timerInterval);
    return;
  }






    if (keyboard(38)) {
        spieler.style.top = parseInt(spieler.style.top) - 10 + 'px'
    }
    if (keyboard(40)) {
        spieler.style.top = parseInt(spieler.style.top) + 10 + 'px'
    }

    if (timer.ready()) {
        h.src = 'Bilder/Planet1.0.png'
        h.classList.add('planet')
        h.classList.add('schnell')
        h.style.top = Math.random() * spielfeld.clientHeight + 'px'
        h.style.left = spielfeld.clientWidth + 'px'
        spielfeld.appendChild(h)

    }


    if (timer2.ready()) {
        a.src = 'Bilder/Planet2.0.png'
        a.classList.add('planet')
        a.classList.add('mittel')
        a.style.top = Math.random() * spielfeld.clientHeight + 'px'
        a.style.left = spielfeld.clientWidth + 'px'
        spielfeld.appendChild(a)
    }

    if (timer3.ready()) {
        e.src = 'Bilder/Planet3.0.png'
        e.classList.add('planet')
        e.classList.add('langsam')
        e.style.top = Math.random() * spielfeld.clientHeight + 'px'
        e.style.left = spielfeld.clientWidth + 'px'
        spielfeld.appendChild(e)
    }

    var planeten = document.querySelectorAll('.langsam')
    for (var planet of planeten) {
        planet.style.left = parseInt(planet.style.left) - 6 + 'px'
        if (parseInt(planet.style.left) < -740) {
            planet.parentNode.removeChild(planet)
        }
    }

    var planeten = document.querySelectorAll('.mittel')
    for (var planet of planeten) {
        planet.style.left = parseInt(planet.style.left) - 8 + 'px'
        if (parseInt(planet.style.left) < -740) {
            planet.parentNode.removeChild(planet)
        }
    }

    var planeten = document.querySelectorAll('.schnell')
    for (var planet of planeten) {
        planet.style.left = parseInt(planet.style.left) - 10 + 'px'
        if (parseInt(planet.style.left) < -740) {
            planet.parentNode.removeChild(planet)
        }
    }

    function gameover (e){
      document.querySelector('.overlay').style.display = 'flex';
    }

    if(sound) {
      sound.play()
    }


    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
