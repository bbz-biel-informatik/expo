



var playground = document.querySelector('.playground');
var nemo = document.querySelector('.nemo');
nemo.style.left = playground.clientWidth / 5 + 'px';
nemo.style.top =playground.clientHeight / 2 + 'px';
var punkteAnzeige = document.querySelector('.punkte');
var punkteAnzeigegameover = document.querySelector('.punktegameover');
var score = 0;
var timer = (100 + Math.random() * 100);
var backgroundPosition = 0;
var backgroundaudio = new Audio('underwater.mp3');
var scoreaudio = new Audio('score.wav');
var gameoveraudio = new Audio('hit.wav');





function loop() {

    backgroundPosition = backgroundPosition + 1.5;
    playground.style.backgroundPosition = `-${backgroundPosition}px 0`;
 
    if(keyboard(38) && parseInt(nemo.style.top) > 0) {
        nemo.style.top = parseInt(nemo.style.top) + -5 + 'px' 
    } 

    if(keyboard(40)&& parseInt(nemo.style.top) < playground.clientHeight - nemo.clientHeight) {
        nemo.style.top = parseInt(nemo.style.top) + 5 + 'px' 
    }

    backgroundaudio.play()
    
    timer = timer -1;
    if(timer < 0) {
        var x = document.createElement("img"); 
        x.src = 'Piranhas.png';
        var y = document.createElement("img");
        y.src = 'dorie.png'
        x.classList.add("piranha")
        y.classList.add("dorie")
        playground.appendChild(x)
        playground.appendChild(y)
        y.style.right = -50 - Math.random() * 150 + 'px'
        y.style.top = '50%'
        x.style.right = '0px'
        x.style.top = '50%';
        timer = (100 + Math.random() * 100)
      }

      var piranhas = document.querySelectorAll('.piranha')
      for(var piranha of piranhas){
        piranha.style.right = parseInt(piranha.style.right) + 3 + 'px' 
      }

      var dories = document.querySelectorAll('.dorie')
      for(var dorie of dories){
        dorie.style.right = parseInt(dorie.style.right) + 3 + 'px' 
      }


      if(anyCollision(nemo, dories)) {
        score = score + 1
        punkteAnzeige.textContent = score
        punkteAnzeigegameover.textContent = score
        scoreaudio.play()
        scoreaudio.volume = 0.1;
      }
   
      if(anyCollision(nemo, piranhas)) {
        document.querySelector('.gameover').style.display= "block";
        document.querySelector('.punktegameover').style.display= "block";
        document.querySelector('.text').style.display= "block";
        gameoveraudio.play()
        document.addEventListener("keyup", (e) => {
          console.log(e)
          if (e.keyCode==32){
            location.reload();
          }
        })
        return
      }
      window.requestAnimationFrame(loop)
}


document.querySelector("button").addEventListener("click", ()=> {
  window.requestAnimationFrame(loop)
  document.querySelector('.beschreibung').style.display= "none";
})














