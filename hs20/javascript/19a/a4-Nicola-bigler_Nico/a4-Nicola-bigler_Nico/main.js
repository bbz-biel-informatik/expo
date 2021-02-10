var spieler = document.querySelector('.player')
var timer = new Timer(180)
var timer2 = new Timer(300)
var timer3 = new Timer(220)
var playground = document.querySelector('.playground')
var backgroundPosition = 0;
var score = 0
var showscore = document.querySelector('.score')
var jump = 0

spieler.style.left = '550px'
spieler.style.top = '580px'


function loop() {


    // Gravitation Sprung
    if (keyboard(32) && parseInt(spieler.style.top) >= 580) {
        jump = 16
        spieler.style.top = "580px"
    }

    jump = jump - 0.6

    if (parseInt(spieler.style.top) > 580) {
        jump = 0
    }

    spieler.style.top = parseInt(spieler.style.top) - jump + 'px'


    // Hindernisse
    if (timer.ready()) {
        var h = document.createElement('div')
        h.classList.add('wall')
        h.style.top = '630px'
        h.style.right = '0px'
        playground.appendChild(h)
    }

    wall = document.querySelectorAll('.wall')


    if (timer2.ready()) {
        var b = document.createElement('div')
        b.classList.add('bird')
        b.style.top = '580px'
        b.style.right = '0px'
        playground.appendChild(b)
    }

    bird = document.querySelectorAll('.bird')

    if (timer3.ready()) {
        var c = document.createElement('div')
        c.classList.add('coin')
        c.style.top = '620px'
        c.style.right = '0px'
        playground.appendChild(c)
    }

    coin = document.querySelectorAll('.coin')

    for (c of coin) {
        c.style.right = parseInt(c.style.right) + 5 + 'px'
    }

    for (b of bird) {
        b.style.right = parseInt(b.style.right) + 8 + 'px'
    }

    for (h of wall) {
        h.style.right = parseInt(h.style.right) + 5 + 'px'
    }

    // Hintergrund-Verschiebung

    backgroundPosition = backgroundPosition + 5;
    playground.style.backgroundPosition = `-${backgroundPosition}px 0`;





    // Kollisionen
    if (anyCollision(spieler, wall)) {
        alert("Game over!")
        return
    }

    if (anyCollision(spieler, bird)) {
        alert("Game over!")
        return
    }

    var collisions = allCollisions(spieler, coin)


    for (var collision of collisions) {
        collision.parentNode.removeChild(collision)
        score = score + 1
        showscore.textContent = score
    }




    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)



