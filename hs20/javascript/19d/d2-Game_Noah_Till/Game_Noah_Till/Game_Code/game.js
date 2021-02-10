// Spieler
var spieler = document.querySelector('.player')
var punkteAnzeige = document.querySelector('.punkte')
var coinAnzeige = document.querySelector('.münzen')
var spielfeld = document.querySelector('.playground')
var backgroundPosition = 0
var score = 0
var münzen = 0
var a = 0
var timer = new Timer(30)
var gegner = new Timer(350)
var drache = new Timer(600)
var coinx = new Timer(250)
var gameover = document.querySelector('.gameover')
var restart = document.querySelector('.restart')
var winner = document.querySelector('.win')

spieler.style.left = '0px'
spieler.style.right = '0px'
spieler.style.bottom = '100px'
var walk = new Audio('../sounds/Walk_character_03.mp3')
var jump = new Audio('../sounds/Jump.wav')
var death = new Audio('../sounds/gameover.wav')
var gebrüll = new Audio('../sounds/Monster_Dragon.mp3')
var getCoin = new Audio('../sounds/coin.wav')
var music = new Audio('../sounds/NoahTillGameKrass2k20_Master.wav')
var win = new Audio('../sounds/Winsound_Master.wav')

// Vollbild
var spielfeld = document.querySelector('.playground')
var vollbildButton = document.querySelector('.fullscreen')

vollbildButton.addEventListener('click', function() {
    spielfeld.requestFullscreen()
})

alert(
    "Wilkommen zu Knight Rush!\n" +
    "Das Ziel des Spiels ist es einen Score von 3000 zu erreichen!\n" +
    "Während des Spiels kann man zusätzlich Münzen sammeln.\n" +
    "Das Spiel muss im Vollbildmodus gespielt werden!\n" +
    "Die Steuerung ist einfach:\n" +
    "W = Springen\n" +
    "A = Anhalten / nach links laufen\n" +
    "S = Während dem fallen schneller auf den Boden zurückkehren\n" +
    "D = Nach Rechts rennen\n" +
    "Leertaste = Dash / Sprint\n"
)

// Gameloop
function loop() {
    var skelette = document.querySelectorAll('.skelett')
    var dragons = document.querySelectorAll('.dragon')
    var coins = document.querySelectorAll('.coin')
    music.play()
        // Backgroundscrolling
    if (score < 3000) {
        backgroundPosition = backgroundPosition + 5;
        spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;


        // Walk right
        if (keyboard(68)) {
            spieler.style.left = parseInt(spieler.style.left) + 5 + 'px'
            walk.play()
        }

        // Walk left
        if (keyboard(65)) {
            spieler.style.left = parseInt(spieler.style.left) - 5 + 'px'
        }

        if (parseInt(spieler.style.left) < 0) {
            spieler.style.left = '0px'
        }

        // Jump
        if (keyboard(87) && a == 0) {
            a = 11
            jump.play()
        }

        // Walk down
        if (keyboard(83) && (parseInt(spieler.style.bottom) > 50)) {
            a = a - 0.5
        }

        spieler.style.bottom = parseInt(spieler.style.bottom) + a + 'px'
        if (parseInt(spieler.style.bottom) < 50) {
            a = 0
        } else {
            a = a - 0.2
        }

        // Dash
        if (keyboard(32)) {
            spieler.style.left = parseInt(spieler.style.left) + 50 + 'px'
            walk.play()
        }

        if (parseInt(spieler.style.left) > spielfeld.clientWidth - spieler.clientWidth) {
            spieler.style.left = spielfeld.clientWidth - spieler.clientWidth + "px"
        }

        // Score up
        if (parseInt(spieler.style.left) >= 0) {
            score = score + 1
            punkteAnzeige.textContent = score
        }

        // Timer
        if (timer.ready()) {
            // spieler.style.left = parseInt(spieler.style.left) + 10 + 'px'
        }

        // Enemy
        if (gegner.ready()) {
            var h = document.createElement('img')
            h.setAttribute("src", "../img/skelett.png")
            h.classList.add('skelett')
            h.style.bottom = '40px'
            h.style.right = '0px'
            spielfeld.appendChild(h)
        }

        for (var skelett of skelette) {
            skelett.style.right = parseInt(skelett.style.right) + 5 + 'px'
            if (parseInt(skelett.style.right) > spielfeld.clientWidth) {
                skelett.parentNode.removeChild(skelett)
            }
        }
        // Enemy 2
        if (drache.ready()) {
            var h = document.createElement('img')
            h.setAttribute("src", "../img/Drache.png")
            h.classList.add('dragon')
            h.style.bottom = '465px'
            h.style.right = '0px'
            spielfeld.appendChild(h)
            gebrüll.play()
        }

        for (var dragon of dragons) {
            dragon.style.right = parseInt(dragon.style.right) + 5 + 'px'
            if (parseInt(dragon.style.right) > spielfeld.clientWidth) {
                dragon.parentNode.removeChild(dragon)
            }

        }
        // Coins
        if (coinx.ready()) {
            var h = document.createElement('img')
            h.setAttribute("src", "../img/coin.png")
            h.classList.add('coin')
            h.style.bottom = '350px'
            h.style.right = '0px'
            spielfeld.appendChild(h)
        }

        for (var coin of coins) {
            coin.style.right = parseInt(coin.style.right) + 5 + 'px'
            if (parseInt(coin.style.right) > spielfeld.clientWidth) {
                coin.parentNode.removeChild(coin)
            }

        }
        // Kollision
        if (anyCollision(spieler, dragons)) {
            spielfeld.style.backgroundImage = 'url(../img/gameover.jpg)'
            spielfeld.style.backgroundPosition = `0 0`;
            restart.style.opacity = '100%'
            music.pause();
            music.currentTime = 0;
            death.play()
            return
        }
        if (anyCollision(spieler, skelette)) {
            spielfeld.style.backgroundImage = 'url(../img/gameover.jpg)'
            spielfeld.style.backgroundPosition = `0 0`;
            restart.style.opacity = '100%'
            music.pause();
            music.currentTime = 0;
            death.play()
            return
        }
        var collisions = allCollisions(spieler, coins)
        if (collisions.length > 0) {
            münzen = münzen + 1
            coinAnzeige.textContent = münzen
            getCoin.play()
            collisions[0].parentNode.removeChild(collisions[0])
        }
    } else {

        // Castle
        dragons.forEach((d) => d.parentNode.removeChild(d))
        skelette.forEach((s) => s.parentNode.removeChild(s))
        coins.forEach((c) => c.parentNode.removeChild(c))
        spielfeld.style.backgroundImage = 'url(../img/castle1.png)'
            // spieler.style.left = '0px'
        spieler.style.bottom = '160px'
        spieler.style.left = parseInt(spieler.style.left) + 3 + 'px'

        // End
        if (parseInt(spieler.style.left) > 2250) {
            spielfeld.style.backgroundImage = 'url(../img/End-Screen.jpg)'
            spielfeld.style.backgroundPosition = `0 0`;
            music.pause();
            music.currentTime = 0;
            win.play()
            winner.style.opacity = '100%'
            restart.style.opacity = '100%'
        }
    }

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)