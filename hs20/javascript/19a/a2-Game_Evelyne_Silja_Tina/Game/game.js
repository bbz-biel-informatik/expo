// Objekte aus dem HTML laden
var spieler = document.querySelector(".player");
var playground = document.querySelector(".playground");
var hindernis1 = document.querySelector("#obstacle1");
var hindernis2 = document.querySelector("#obstacle2");
var hindernis3 = document.querySelector("#obstacle3");
var hindernis4 = document.querySelector("#obstacle4");
var hindernis5 = document.querySelector("#obstacle5");
var hindernis6 = document.querySelector("#obstacle6");
var hindernis7 = document.querySelector("#obstacle7");
var hindernis8 = document.querySelector("#obstacle8");
var hindernis9 = document.querySelector("#obstacle9");
var hindernis10 = document.querySelector("#obstacle10");
var punkteAnzeige = document.querySelector(".punkte");
var pumpkinorange = document.querySelector(".pumpkinorange");
var ButtonRestart = document.querySelector(".restart");
var newPumpkin = document.createElement("img");
var eatOrangePumkin = new Audio("sounds/orange.mp3");
var eatBlackPumkin = new Audio("sounds/black.mp3");
var GameOverSound = new Audio("sounds/gameover.mp3");

// Score ist 0
var score = 0;

// Spieler mittig positionieren
spieler.style.left = "370px";
spieler.style.top = "370px";

/* Hindernisse zufällig positionieren */
for (var hindernis of [
  hindernis1,
  hindernis2,
  hindernis3,
  hindernis4,
  hindernis5,
]) {
  do {
    hindernis.style.left = Math.random() * 700 + "px";
    hindernis.style.top = Math.random() * 700 + "px";
    hindernis.style.width = 20 + Math.random() * 20 + "px";
    hindernis.style.height = 80 + Math.random() * 20 + "px";
  } while (
    // Solange die Hindernisse mit etwas anderem kollidieren, werden sie neu positioniert
    anyCollision(
      hindernis,
      document.querySelectorAll(
        ".obstacle, .pumpkinblack, .pumpkinorange, .player, newPumpkin"
      )
    )
  );
}

for (var hindernis of [
  hindernis6,
  hindernis7,
  hindernis8,
  hindernis9,
  hindernis10,
]) {
  do {
    hindernis.style.left = Math.random() * 700 + "px";
    hindernis.style.top = Math.random() * 700 + "px";
    hindernis.style.width = 80 + Math.random() * 20 + "px";
    hindernis.style.height = 20 + Math.random() * 20 + "px";
  } while (
    anyCollision(
      hindernis,
      document.querySelectorAll(
        ".obstacle, .pumpkinblack, .pumpkinorange, .player, newPumpkin"
      )
    )
  );
}

// Oranger Kürbis zufällig positionieren
do {
  pumpkinorange.style.left = Math.random() * 740 + "px";
  pumpkinorange.style.top = Math.random() * 740 + "px";
} while (
  // Solange der Kürbis mit etwas anderem kollidieren, wird er neu positioniert
  anyCollision(
    pumpkinorange,
    document.querySelectorAll(
      ".obstacle, .pumpkinblack, .pumpkinorange, .player, newPumpkin"
    )
  )
);
var pumpkinblack = document.querySelector(".pumpkinblack");
// Schwarzer Kürbis zufällig positionieren
do {
  pumpkinblack.style.left = Math.random() * 740 + "px";
  pumpkinblack.style.top = Math.random() * 740 + "px";
} while (
  // Solange der Kürbis mit etwas anderem kollidieren, wird er neu positioniert
  anyCollision(
    pumpkinblack,
    document.querySelectorAll(
      ".obstacle, .pumpkinblack, .pumpkinorange, .player, newPumpkin"
    )
  )
);

// Gameloop
function loop() {
  var pumpkinblack = document.querySelectorAll(".pumpkinblack");

  //Pfeil nach rechts gedrückt
  if (keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }

  //Pfeil nach links gedrückt
  if (keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }

  //Pfeil nach oben gedrückt
  if (keyboard(38)) {
    spieler.style.top = parseInt(spieler.style.top) - 5 + "px";
  }

  //Pfeil nach unten gedrückt
  if (keyboard(40)) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }

  if (
    //Sobald der Spieler den Spielfeldrand berührt, ist das Spiel fertig
    parseInt(spieler.style.top) <= -5 ||
    parseInt(spieler.style.top) >= 740 ||
    parseInt(spieler.style.left) <= -5 ||
    parseInt(spieler.style.left) >= 750 ||
    // Sobald der Spieler mit einem Hinderniss kollidiert, ist das Spiel fertig
    anyCollision(spieler, [
      hindernis1,
      hindernis2,
      hindernis3,
      hindernis4,
      hindernis5,
      hindernis6,
      hindernis7,
      hindernis8,
      hindernis9,
      hindernis10,
    ])
  ) {
    GameOverSound.play();
    alert("Game over!");
    return;
  }

  // Punkte erhalten
  if (anyCollision(spieler, [pumpkinorange])) {
    pumpkin();
  }

  function pumpkin() {
    eatOrangePumkin.play();
    score = score + 1;
    punkteAnzeige.textContent = score;
    do {
      var x = Math.random() * 740 + "px";
      var y = Math.random() * 740 + "px";
      pumpkinorange.style.top = x;
      pumpkinorange.style.left = y;
    } while (
      // Solange der Kürbis mit etwas anderem kollidieren, wird er neu positioniert
      anyCollision(
        pumpkinorange,
        document.querySelectorAll(
          ".obstacle, .pumpkinblack, .pumpkinorange, .player, newPumpkin"
        )
      )
    );

    // Neuer schwarzer Kürbis hinzufügen
    var newPumpkin = document.createElement("img");
    newPumpkin.setAttribute("src", "img/pumpkinblack.svg");
    newPumpkin.classList.add("pumpkinblack");
    do {
      newPumpkin.style.left = Math.random() * 700 + "px";
      newPumpkin.style.top = Math.random() * 700 + "px";
      playground.appendChild(newPumpkin);
    } while (
      // Solange der Kürbis mit etwas anderem kollidieren, wird er neu positioniert
      anyCollision(
        newPumpkin,
        document.querySelectorAll(
          ".obstacle, .pumpkinblack, .pumpkinorange, .player, newPumpkin"
        )
      )
    );
  }

  // Punkte verlieren
  var collisions = allCollisions(spieler, pumpkinblack);
  if (collisions.length > 0) {
    pumpkinfail(collisions[0]);
  }
  if (anyCollision(spieler, [newPumpkin])) {
    pumpkinfail();
  }

  function pumpkinfail(pumpkinblack) {
    eatBlackPumkin.play();
    score = score - 1;
    punkteAnzeige.textContent = score;
    var x = Math.random() * 740 + "px";
    var y = Math.random() * 740 + "px";
    pumpkinblack.style.top = x;
    pumpkinblack.style.left = y;
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// Neustart, wenn Neustartknopf geklickt wird
ButtonRestart.addEventListener("click", newLoad);

// Neu laden
function newLoad() {
  location.reload();
}
// Neustart, wenn Entertaste gedrückt wird
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    newLoad();
  }
});
