var spieler = document.querySelector('.player')

var timer = new Timer(30)

var a = 0

spieler.style.left = '0px'
spieler.style.bottom = '0px'

var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')
var gegner1 = document.querySelector('.enemy1')
var gegner2 = document.querySelector('.enemy2')
var gegner3 = document.querySelector('.enemy3')
var gegner4 = document.querySelector('.enemy4')

gegner1.style.left = '200px'
gegner1.style.bottom ='0px'
gegner2.style.left = '300px'
gegner2.style.bottom ='0px'
gegner3.style.left = '500px'
gegner3.style.bottom ='0px'
gegner4.style.left = '700px'
gegner4.style.bottom ='0px'

var spielfeld = document.querySelector('.playground')
var backgroundPosition = 0;


vollbildButton.addEventListener('click', function () {
    spielfeld.requestFullscreen()
  })

  var i = document.createElement('div')
        i.classList.add('plattform')
        i.style.bottom = '0px'
        i.style.left = '800px'
        spielfeld.appendChild(i)
        



    

function loop() {
    if(keyboard(68)) {
        spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
      }
      if(keyboard(65)) {
        spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
      }
      if(keyboard(32)&&a==0) {
        a = 7
        
      }
      spieler.style.bottom = parseInt(spieler.style.bottom) + a + 'px'
      if (parseInt(spieler.style.bottom)>=0&&!anyCollision(spieler,[i])){
      
      a = a - 0.2
      }
      else {
        a = 0
      }

      if(anyCollision(spieler, [gegner1, gegner2, gegner3, gegner4])) {
        alert("Game over!")
        return
      }

      if(timer.ready()) {
        var h = document.createElement('div')
        h.classList.add('stein')
        h.style.bottom = '0px'
        h.style.left = '500px'
        spielfeld.appendChild(h)
      }
      var steine = document.querySelectorAll('.stein')
  for(var stein of steine) {
    stein.style.left = `${parseInt(stein.style.left) - 5}px`
    if(parseInt(stein.style.left) > 500) {
      stein.parentNode.removeChild(stein)
    }}

    backgroundPosition = backgroundPosition + 5;
    spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

    

        
      

      

      


    
      
    

  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)