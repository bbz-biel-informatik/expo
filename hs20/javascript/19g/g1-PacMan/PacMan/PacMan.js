var spieler = document.querySelector('.player')
var punkteAnzeige = document.querySelector('.punkte')
var spielfeld = document.querySelector('.playground')
var img = document.querySelector('.feld')
var punkte = document.querySelectorAll('.point')
var ghost = document.querySelectorAll('.enemy')
var ghost1 = document.getElementById('move')
var ghost2 = document.getElementById('move1')
var ghost3 = document.getElementById('move2')
var ghost4 = document.getElementById('move3')
var ghost5 = document.getElementById('move4')
var ghost6 = document.getElementById('move5')
var step = 0

punkte[0].style.left ="95px"
punkte[0].style.top ="195px"
punkte[1].style.left ="200px"
punkte[1].style.top ="160px"
punkte[2].style.left ="95px"
punkte[2].style.top ="300px"
punkte[3].style.left ="320px"
punkte[3].style.top ="390px"
punkte[4].style.left ="300px"
punkte[4].style.top ="300px"
punkte[5].style.left ="10px"
punkte[5].style.top ="390px"
punkte[6].style.left ="170px"
punkte[6].style.top ="215px"
punkte[7].style.left ="230px"
punkte[7].style.top ="215px"
punkte[8].style.left ="280px"
punkte[8].style.top ="100px"
punkte[9].style.left ="120px"
punkte[9].style.top ="100px"
punkte[10].style.left ="355px"
punkte[10].style.top ="62px"
punkte[11].style.left ="125px"
punkte[11].style.top ="390px"
punkte[12].style.left ="40px"
punkte[12].style.top ="230px"
punkte[13].style.left ="355px"
punkte[13].style.top ="230px"
punkte[14].style.left ="200px"
punkte[14].style.top ="60px"
punkte[15].style.left ="200px"
punkte[15].style.top ="352px"
punkte[16].style.left ="40px"
punkte[16].style.top ="155px"
punkte[17].style.left ="200px"
punkte[17].style.top ="352px"
punkte[18].style.left ="200px"
punkte[18].style.top ="270px"
punkte[19].style.left ="200px"
punkte[19].style.top ="430px"
punkte[20].style.left ="280px"
punkte[20].style.top ="200px"
punkte[21].style.left ="10px"
punkte[21].style.top ="10px"
punkte[22].style.left ="235px"
punkte[22].style.top ="10px"
punkte[23].style.left ="330px"
punkte[23].style.top ="150px"
punkte[24].style.left ="70px"
punkte[24].style.top ="100px"
punkte[25].style.left ="382px"
punkte[25].style.top ="430px"


ghost[0].style.left = "65px"
ghost[0].style.top = "185px"
ghost[1].style.left = "30px"
ghost[1].style.top = "295px"
ghost[2].style.left = "230px"
ghost[2].style.top = "150px"
ghost[3].style.left = "320px"
ghost[3].style.top = "160px"
ghost[4].style.left = "120px"
ghost[4].style.top = "380px"
ghost[5].style.left = "170px"
ghost[5].style.top = "53px"

var canvas = document.createElement('canvas')
img.addEventListener("load", () => {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
})


spieler.style.left = '0px'
spieler.style.top = '225px'
var score = 0
var timer = new Timer(10)

function loop() {

    step = step + 0.02
    ghost1.style.top=185 + Math.sin(step)*80 + "px"
    ghost2.style.left=50 + Math.sin(step)*50 + "px"
    ghost3.style.left=200 + Math.sin(step)*65 + "px"
    ghost4.style.top=160 + Math.sin(step)*90 + "px"
    ghost5.style.top=365 + Math.sin(step)*20 + "px"
    ghost6.style.left=170 + Math.sin(step)*80 + "px"

    if(anyCollision(spieler, ghost)) {
        alert("Game over!")
        return
      }
    
    if(score == 260) {
        alert("Du hast gewonnen")
        return
    }

    var punkte = document.querySelectorAll('.point')
    var collisions = allCollisions(spieler, punkte)
    for(var collision of collisions) {
      collision.parentNode.removeChild(collision)
      score = score + 10
      punkteAnzeige.textContent = score
    }

    var directionx = 0
    var directiony = 0

    if (keyboard(39) && parseInt(spieler.style.left) < 375) {
        spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
        directionx = 5
        spieler.style.transform="rotate(0deg)"
    }
    if (keyboard(37) && parseInt(spieler.style.left) > 0) {
        spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
        directionx = -5
        spieler.style.transform="rotate(180deg)"
    }
    if (keyboard(38) && parseInt(spieler.style.top) > 0) {
        spieler.style.top = parseInt(spieler.style.top) - 5 + 'px'
        directiony = -5
        spieler.style.transform="rotate(270deg)"
    }
    if (keyboard(40) && parseInt(spieler.style.top) < 425) {
        spieler.style.top = parseInt(spieler.style.top) + 5 + 'px'
        directiony = 5
        spieler.style.transform="rotate(90deg)"
    }

    if(containsBlue(parseInt(spieler.style.left), parseInt(spieler.style.top), 25)) {
        if (directionx != 0) {
            spieler.style.left = parseInt(spieler.style.left) - directionx + 'px'
        }
        if (directiony != 0) {
            spieler.style.top = parseInt(spieler.style.top) - directiony + 'px'
        }
    }

    

    window.requestAnimationFrame(loop)
}

function containsBlue(x, y, width) {
    const context = canvas.getContext('2d');
    for(let i = 5; i < 30; i+=5) {
        for(let j = 5; j < 30; j+=5) {
            const imgData = context.getImageData(x + i, y + j, 1, 1);
            if (imgData.data[2] != 0) {
                console.log("B")
                return true

            }
        }
    }
    return false
}

window.requestAnimationFrame(loop)