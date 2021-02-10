var spieler = document.querySelector(`.player`)

var startscreen = document.querySelector(`.startscreen`)

var spielfeld = document.querySelector('.playground')
var backgroundPosition = 0;

var punkteAnzeige = document.querySelector('.punkte')

var finalscore = document.querySelector('.final')


var score = 0

spieler.style.left = `200px`
spieler.style.top = `200px`

var timer = new Timer(120)

function loop() {

  // Hindernisse
  if(timer.ready()) {
    var x = Math.random()*200 - 100
    var stonebottom = document.createElement('img')
    stonebottom.classList.add('steinbottom')
    stonebottom.style.bottom = '0px'
    stonebottom.style.left = '480px'
    stonebottom.style.height = 280 + x + 'px'
    stonebottom.src= 'stein-02.png'
    spielfeld.appendChild(stonebottom)

    var stonetop = document.createElement('img')
    stonetop.classList.add('steintop')
    stonetop.style.top = '0px'
    stonetop.style.left = '480px'
    stonetop.style.height = 280 - x + 'px'
    stonetop.src= 'stein-03.png'
    spielfeld.appendChild(stonetop)

    var stonehidden = document.createElement('div')
    stonehidden.classList.add('steinhidden')
    stonehidden.style.top = 280 - x + 'px'
    stonehidden.style.left = '480px'
    stonehidden.style.height = '140px'
    spielfeld.appendChild(stonehidden)
  }

  var hindernisse = document.querySelectorAll(`.steinbottom, .steintop`)
  for(var hinderniss of hindernisse){
    hinderniss.style.left = parseInt(hinderniss.style.left) - 2 + 'px'
    if(parseInt(hinderniss.style.left) < 0) {
      hinderniss.parentNode.removeChild(hinderniss)
    }
  }

  var scores = document.querySelectorAll(`.steinhidden`)
  for(var s of scores){
    s.style.left = parseInt(s.style.left) - 2 + 'px'
  }

  // background
  backgroundPosition = backgroundPosition + 2;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  // Schwerkraft
  spieler.style.top = parseInt(spieler.style.top) + 2.5 + 'px'

if (spieler.style.top > 0 + `px`){
  if(keyboard(32)) {
    spieler.style.top = parseInt(spieler.style.top) - 10 + 'px'
  }
}

  // punktestand
  if(anyCollision(spieler, scores) ) {
    score = score + 1
    if(score % 45 == 0){
      punkteAnzeige.textContent = score / 45
    }
  }


  // Kolision
  if(anyCollision(spieler, hindernisse)) {
    var screen_go = document.createElement('img')
    screen_go.classList.add('gameover')
    screen_go.src= 'gameover_screen.png'
    spielfeld.appendChild(screen_go)

    var punkte_go = document.createElement('p')
    punkte_go.classList.add('final')
    spielfeld.appendChild(punkte_go)
    var final = punkteAnzeige
    document.addEventListener("keyup", () =>{
      location.reload()
    })
    return
  }



  window.requestAnimationFrame(loop)
}



startscreen.addEventListener("click", () =>{
window.requestAnimationFrame(loop)
startscreen.style.display = "none"
})
