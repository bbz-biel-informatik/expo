var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
spieler.style.left = '100px'
spieler.style.top = '399px'
var punkteAnzeige = document.querySelector('.punkte')
var score = 0

var backgroundPosition = 0;

var a = 0

var timer = new Timer(100)

function loop() {
    if (timer.ready()) {
        var h = document.createElement('div')
        h.classList.add('stein')
        h.style.top = '400px'
        h.style.left = '920px'
        spielfeld.appendChild(h)
        timer = new Timer(50 + Math.random() * 50)
    }

    var steine = document.querySelectorAll('.stein')
    for (var stein of steine) {
        stein.style.left = parseInt(stein.style.left) + -5 + 'px'
        if (parseInt(stein.style.left) < 0) {
            stein.parentNode.removeChild(stein)
        }
    }

    backgroundPosition = backgroundPosition + 5;
    spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

    if (anyCollision(spieler, steine)) {
        alert("Game over!")
        document.addEventListener('keyup', () => {
            location.reload()
        })
        return
    }


    score = score + 0.1
    punkteAnzeige.textContent = Math.round(score)

    if (parseInt(spieler.style.top) < 399) {
        spieler.style.top = parseInt(spieler.style.top) + 5 + 'px'
    } else {
        a = 0
    }


    if (keyboard(32) && parseInt(spieler.style.top) >= 399) {
        a = 20
    }

    a = a - 0.6
    spieler.style.top = parseInt(spieler.style.top) - a + 'px'

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)