var virustimer = new Timer(100);
var virustimer2 = new Timer(100);
var playground = document.querySelector('.playground')
var score = 0
var punkteAnzeige = document.querySelector('.punkte')
var spieler = document.querySelector('.player')
var startGame = document.querySelector(".startGame")
restartgame = document.querySelector(".restartgame")

//SOUNDS
var shot_sound = new Audio('assets/sounds/shoz.mp3')
var gameover_sound = new Audio('assets/sounds/gameoversound.mp3')
var gamesound = new Audio('assets/sounds/soundtrack.mp3')
var herzweg = new Audio('assets/sounds/ouch.mp3')

//LEBEN
var herz = 6;
var herzanzeige = document.querySelector('.herz');

var herztext = ""
for (var i = 0; i < herz; i++) {
  herztext = herztext + "&#10084;"
}
herzanzeige.innerHTML = herztext;

//ZEIT
var counter = 0

//SPIELFELD
var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')

vollbildButton.addEventListener('click', function () {
  document.body.requestFullscreen()
})




function loop() {
  gamesound.play()
  counter = counter + 0.016666666
  if (herz < 1) {
    document.querySelector('.gameoverscore').textContent += score
    document.querySelector('.gameovertext').style.visibility = 'visible'
    document.querySelector('.overlay').style.visibility = 'visible'
    gameover_sound.play()
    return
  }


  if (mouseClick()) {
    var x = document.createElement("img")
    x.src = "assets/splashes.png"
    x.setAttribute("class", "splash");
    x.style.position = "absolute"
    x.style.left = mousePositionX(playground) + 'px'
    x.style.top = mousePositionY(playground) + 'px'
    x.style.width = "60px"
    x.style.height = "60px"
    setTimeout(() => { x.parentNode.removeChild(x) }, 400);

    shot_sound.currentTime = 0
    shot_sound.play()

    playground.appendChild(x)
  }


  //------SOUDNS------//


  var virus = document.querySelectorAll('.virus');
  for (var v of virus) {
    v.style.right = parseInt(v.style.right) + 2.9 + 'px';
    if (parseInt(v.style.right) > playground.clientWidth) {
      v.parentNode.removeChild(v)
      herz = herz - 1
      var herztext = ""
      herzweg.currentTime = 0
      herzweg.play()
      for (var i = 0; i < herz; i++) {
        herztext = herztext + "&#10084;"
      }

      herzanzeige.innerHTML = herztext;
    }
  }
  if (virustimer.ready()) {
    virustimer = new Timer(100 - counter);
    var new_virus = document.createElement("div");
    new_virus.style.right = '0px';
    new_virus.style.top = Math.random() * 500 + 'px';
    playground.appendChild(new_virus);
    new_virus.setAttribute("class", "virus");
    new_virus.addEventListener("click", function () {

      score = score + 1
      punkteAnzeige.textContent = "Your Score: " + score
      this.classList.add("shrink");
      setTimeout(() => { this.parentNode.removeChild(this) }, 400);
    })
  }

  var virus2 = document.querySelectorAll('.virus2');
  for (var v of virus2) {
    v.style.left = parseInt(v.style.left) + 3.1 + 'px';
    if (parseInt(v.style.left) > playground.clientWidth) {
      v.parentNode.removeChild(v)
      herz = herz - 1
      var herztext = ""
      herzweg.currentTime = 0
      herzweg.play()
      for (var i = 0; i < herz; i++) {
        herztext = herztext + "&#10084;"
      }
      herzanzeige.innerHTML = herztext;
    }
  }
  if (virustimer2.ready()) {
    virustimer2 = new Timer(100 - counter);
    var new_virus2 = document.createElement("div");
    new_virus2.style.left = '0px';
    new_virus2.style.top = Math.random() * 330 + 'px';
    playground.appendChild(new_virus2);
    new_virus2.setAttribute("class", "virus2");
    new_virus2.addEventListener("click", function () {

      score = score + 1
      punkteAnzeige.textContent = "Your Score: " + score
      this.classList.add("shrink");
      setTimeout(() => { this.parentNode.removeChild(this) }, 400);
    })
  }



  window.requestAnimationFrame(loop)
}



//-----...
startGame.addEventListener("click", function again(e) {
  window.requestAnimationFrame(loop);
  startGame.style.display = 'none';
  e.preventDefault();
  e.stopPropagation();
  return false;
})

restartgame.addEventListener("click", reload)


function reload() {
  location.reload()
}