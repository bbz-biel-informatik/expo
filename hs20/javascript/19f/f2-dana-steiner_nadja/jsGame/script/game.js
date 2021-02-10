var elefant = document.querySelector('.elefant')
var game = document.querySelector('.game')
var showMoney = document.getElementById("showMoney")
elefant.style.top = '310px'
moneyCount = 0

var timer = new Timer(110);

// Bringt Elefant zum Springen
function jump() {
    if(keyboard(32)) {

        elefant.style.top = parseInt(elefant.style.top) - 10 + 'px'
        setTimeout(function(){
            elefant.style.top = parseInt(elefant.style.top) + 10 +'px'
        }, 600)
    }
      window.requestAnimationFrame(jump)
}


// Bewegt Geld und Münzen + Kollision
function moveFlowerAndMoney() {

    if(timer.ready()) {
      var h = document.createElement('div')
      h.classList.add('flower')
      h.style.top = '360px'
      h.style.left = '1150px'
      game.appendChild(h)

      var m = document.createElement('div')
        m.classList.add('money')
        m.style.top = '230px'
        m.style.left = '1150px'
        game.appendChild(m)
    }

    var flowers = document.querySelectorAll('.flower')
    for(var flower of flowers) {
        if(anyCollision(elefant, [flower])) {  
            gameOver();            
            return
        } else {
            flower.style.left = parseInt(flower.style.left) - 5 + 'px'
            if (parseInt(flower.style.left) < 0) {
                flower.parentNode.removeChild(flower)
              }
        }
    }

    var moneys = document.querySelectorAll('.money')
    for(var money of moneys) {
        if(anyCollision(elefant, [money])) {  
            moneyCount++
            showMoney.innerHTML = moneyCount 
            money.parentNode.removeChild(money)
        } else {
            money.style.left = parseInt(money.style.left) - 5 + 'px'
            if (parseInt(money.style.left) < 0) {
                money.parentNode.removeChild(money)
              }
        }
    }
    window.requestAnimationFrame(moveFlowerAndMoney)
  }

  // Game Over Funktion bei Kollision
  function gameOver(){
    var gameover = document.createElement('div')
    gameover.innerHTML = "<div id='gameover'>" +
    "<h3>Game Over!</h3>" + 
    "<p>Du hast " + moneyCount + " Münzen gesammelt</p>" +  
    "<button id='play'>Nochmal spielen</button>" + 
    "</div>"
    game.appendChild(gameover)

    document.getElementById("play").onclick = function () {
        location.href = "game.html"
    };
  }
  
  window.requestAnimationFrame(jump)
  window.requestAnimationFrame(moveFlowerAndMoney)