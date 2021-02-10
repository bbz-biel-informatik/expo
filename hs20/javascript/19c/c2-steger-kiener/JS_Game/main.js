var henry = document.getElementById('henry');
var punkteAnzeige = document.querySelector('#counter');
var gameover = document.querySelector('#gameover');
var info = document.getElementById('info');
var title = document.getElementById('title');
var infotext = document.getElementById('info-text');
var footer = document.getElementById('footer');
var counter = 0;
var timer = new Timer(30)
var musik = new Audio("audio/sax.mp3")


/* Funktion um sich nach Links zu bewegen*/
function moveLeft() {
    let left = parseInt(window.getComputedStyle(henry).getPropertyValue("left"));
    left -= 100;
    if (left >= 0) {
        henry.style.left = left + "px";
        document.getElementById("rechts").setAttribute("src", "img/henrylinks.gif");
    }
}

/* Funktion um sich nach Rechts zu bewegen*/
function moveRight() {
    let left = parseInt(window.getComputedStyle(henry).getPropertyValue("left"));
    left += 100;
    if (left < 300) {
        henry.style.left = left + "px";
        document.getElementById("rechts").setAttribute("src", "img/henryrechts.gif");
    }
}


/*Tastaturabfragen*/
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        moveLeft();

    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
    if (event.key === "a") {
        moveLeft();

    }
    if (event.key === "d") {
        moveRight();
    }
    if (event.key === " ") {
        location.reload();
    }
    if (event.key  === "i") {
        auto.style.animation = "silde 3000s linear infinite";
        footer.style.height = "86.8%";
        footer.style.opacity = "0.9";
        info.style.visibility = "hidden";
        title.style.opacity = "0.9";
        gameover.style.visibility = "hidden";
        punkteAnzeige.style.visibility = "hidden";
        infotext.style.visibility = "visible";

    }

})

/*Tastaturabfrage für Infobutton*/
document.addEventListener("keyup", event => {
    if (event.key  === "i") {
        auto.style.animation = "silde 0.725s linear infinite";
        footer.style.height = "8%";
        footer.style.opacity = "0.8";
        info.style.visibility = "visible";
        title.style.opacity = "0.8";
        gameover.style.visibility = "hidden";
        punkteAnzeige.style.visibility = "hidden";
        infotext.style.visibility = "hidden";
}
})

/*Auto generieren*/
var auto = document.getElementById('auto');
auto.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random() * 3);

    left = random * 100;
    auto.style.left = left + "px";
    counter++;
})

/*Kollision*/
setInterval(function () {
    var henryLeft = parseInt(window.getComputedStyle(henry).getPropertyValue("left"));
    var autoLeft = parseInt(window.getComputedStyle(auto).getPropertyValue("left"));
    var autoTop = parseInt(window.getComputedStyle(auto).getPropertyValue("top"));

    if (henryLeft == autoLeft && autoTop < 500 && autoTop > 300) {
        gameover.style.visibility = "visible";
        auto.style.animation = "none";
        counter = counter + 1; 
        punkteAnzeige.style.visibility = "visible";
        punkteAnzeige.textContent = ("HENRY HAT ") + counter * 10 + (" METER ÜBERLEBT");

    }
}, 1)

/* Play Musik */
document.addEventListener("keyup", () => {
    musik.play()
} )