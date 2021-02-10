const player = document.querySelector("#player");
player.style.top = "10px";

var spielfeld = document.querySelector(".background");
var h = spielfeld.clientHeight
var backgroundPosition = 0;
var timer = new Timer(30)


function loop() {
  
  if (keyboard(87)&&parseInt(player.style.top)>10) {
    player.style.top = parseInt(player.style.top) - 8 + "px";
  }
  if (keyboard(83)) {
    player.style.top = parseInt(player.style.top) + 8 + "px";
  }

  backgroundPosition = backgroundPosition + 4;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  if(timer.ready()) {
    var h = document.createElement('div')
    h.classList.add('obstacle')
    var position = Math.random()*400
    h.style.top = - position + "px"
    h.style.left = '1800px'
    h.style.transform = 'rotate(180deg)'
    spielfeld.appendChild(h)

    var h = document.createElement('div')
    h.classList.add('obstacle')
    h.style.top = 850 - position + "px"
    h.style.left = '1800px'
    spielfeld.appendChild(h)
  }

  var obstacles = document.querySelectorAll('.obstacle')
  for(var obstacle of obstacles) {
    obstacle.style.left = parseInt(obstacle.style.left) + -7 + 'px'
    if(parseInt(obstacle.style.left) < -50) {
      obstacle.parentNode.removeChild(obstacle)
    }
  }

  var obstacle = document.querySelectorAll('.obstacle')
  var end = new Audio('error.mp3')

  if(anyCollision(player, obstacle)) {
    end.play()
    alert("Game over!")
    location.href = "index.html"
    return
  }

  window.requestAnimationFrame(loop);
  
}

window.requestAnimationFrame(loop);
