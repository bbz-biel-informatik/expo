var spieler = document.querySelector('.player')
var spielfeld = document.querySelector('.playground')
var breite = spielfeld.clientWidth
var timer = new Timer(90)
var abstand = 0
var score = 0
var punkteAnzeige = document.querySelector('.punkte')
spieler.style.bottom = '0px'

function loop() {

    // Hier steigt der Spieler
    if (keyboard(32) && abstand == 0) {
        abstand = 8
        score = score + 1
        punkteAnzeige.textContent = score
    }
    spieler.style.bottom = parseInt(spieler.style.bottom) + abstand + 'px'
    abstand = abstand - 0.2

    // Hier sinkt der Spieler
    if (parseInt(spieler.style.bottom) < 0) {
        abstand = 0
    }
    // Hindernisse / Gegner
    if (timer.ready()) {
        var gegner = document.createElement('img')
        var RandomZahl = Math.random()
        if (RandomZahl < 0.166) {
            gegner.setAttribute('src', 'Grafik/02_Gegner/Lehrer/Lehrer4.png')
        } else if (RandomZahl < 0.33) {
            gegner.setAttribute('src', 'Grafik/02_Gegner/Akku/Akku.png')
        } else if (RandomZahl < 0.5) {
            gegner.setAttribute('src', 'Grafik/02_Gegner/BBZ/BBZ.png')
        } else if (RandomZahl < 0.66) {
            gegner.setAttribute('src', 'Grafik/02_Gegner/Bus/Bus.png')
        } else if (RandomZahl < 0.83) {
            gegner.setAttribute('src', 'Grafik/02_Gegner/Steckdose/Steckdose.png')
        } else if (RandomZahl < 1) {
            gegner.setAttribute('src', 'Grafik/02_Gegner/Corona/Corona.png')
        }
        // Styles für Gegner
        gegner.classList.add('ClassGegner')
        gegner.style.bottom = '0'
        gegner.style.right = '-50px'
        gegner.style.width = 'auto'
        gegner.style.height = 'auto'
        gegner.style.position = 'absolute'
        gegner.style.zIndex = '0'
        spielfeld.appendChild(gegner)
    }

    // Bewegung der Gegener
    var AlleGegner = document.querySelectorAll('.ClassGegner')
    for (var ClassGegner of AlleGegner) {
        ClassGegner.style.right = parseInt(ClassGegner.style.right) + 10 + 'px'
        if (parseInt(ClassGegner.style.right) > breite) {
            ClassGegner.parentNode.removeChild(ClassGegner)
        }
    }

    // Kollision 
    if (anyCollision(spieler, AlleGegner)) {
        var boxVerloren = document.getElementById("boxVerloren")
        boxVerloren.classList.add("boxVerloren");

        var textVerloren = document.createElement('p');
        var textVerloren2 = textVerloren.classList.add("textVerloren");
        textVerloren.textContent = "Dein Punktestand beträgt " + score + "." + " Drücke Leertaste um neuzustarten.";
        boxVerloren.appendChild(textVerloren);

        document.addEventListener("keyup", (event) => {
            if (event.key === " ") {
                location.reload();
            }
        })
        return
    }

    // Verlieren
    if (score == 40) {
        var boxVerloren = document.getElementById("boxVerloren")
        boxVerloren.classList.add("boxVerloren");
        var textVerloren = document.createElement('p');
        textVerloren.classList.add("textVerloren");
        textVerloren.textContent = "Du hast Gewonnen.";
        boxVerloren.appendChild(textVerloren);
        textVerloren2.style.opacity = "0";
        document.addEventListener("keyup", (event) => {
            if (event.key === " ") {
                location.reload();
                textVerloren2.style.opacity = "0";

            }
        })
    }
    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)