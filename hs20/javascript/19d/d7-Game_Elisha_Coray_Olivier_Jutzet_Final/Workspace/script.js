const spieler = document.querySelector(".player");
spieler.style.left = "300px";
spieler.style.bottom = "0px";
const gegner1 = document.querySelector(".enemy1");
const gegner2 = document.querySelector(".enemy2");
const coin1 = document.querySelector(".coin1");
const coin2 = document.querySelector(".coin2");
const coin3 = document.querySelector(".coin3");
const coin4 = document.querySelector(".coin4");
const element1 = document.querySelector(".element1");
const element2 = document.querySelector(".element2");
const element3 = document.querySelector(".element3");
const element4 = document.querySelector(".element4");
const element5 = document.querySelector(".element5");
const finish = document.querySelector(".end");
var backgroundPosition = 0;
var a = 0;
var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

//################ Vollbildbutton ############
const spielfeld = document.querySelector(".playground");
const vollbildButton = document.querySelector(".fullscreen");
vollbildButton.addEventListener("click", function () {
  spielfeld.requestFullscreen();
});
alert(
  "Erreiche das Portal. Sammle Münzen um Punkte zu Gewinnen. Meide dabei Gegner. Klicke zu Beginn des Spiels den Vollbild Button. Nutze die Pfeiltasten um dich zu bewegen. "
);

function loop() {
  //#########TastaturStr##############
  var objekte = document.querySelectorAll(
    ".element1, .element2, .element3, .element4, .enemy1, .enemy2,.enemy3, .enemy4, .coin1, .coin2, .coin3, .coin4, .coin5, .end "
  );

  if (keyboard(39)) {
    for (var objekt of objekte) {
      objekt.style.left = objekt.offsetLeft - 5 + "px";
    }
    backgroundPosition = backgroundPosition + 5;
  }
  if (keyboard(37)) {
    for (var objekt of objekte) {
      objekt.style.left = objekt.offsetLeft + 5 + "px";
    }

    backgroundPosition = backgroundPosition - 5;
  }
  //#########schiessen #########33
  if (keyboard(32)) {
    var spielerx = parseInt(spieler.style.left);
    var spielery = parseInt(spieler.style.bottom);
    var b = angle(spielerx, spielery);
  }

  //######## Punkte #############
  punkteAnzeige.textContent = score;

  

  //######### Schwerkraft/ Jump ##############
  a = a - 0.4;
  if (
    parseInt(spieler.style.bottom) < 0 ||
    anyCollision(spieler, [element1, element2, element3, element4])
  ) {
    a = 0;
    if (keyboard(38)) {
      a = 13;
      new Audio(
        "https://freesound.org/data/previews/456/456368_9498993-lq.mp3"
      ).play();
    }
  }
  spieler.style.bottom = parseInt(spieler.style.bottom) + a + "px";

  //###########Enemy Collision #############

  if (anyCollision(spieler, [gegner2, gegner1])) {
    new Audio(
      "https://freesound.org/data/previews/406/406113_150886-lq.mp3"
    ).play();
    if (confirm("Score: " + score + " Mission failed! Restart?")) {
      window.location.reload();
      return;
    } else {
      return;
    }
  }
  if (anyCollision(spieler, [finish])) {
    if (confirm("Score: " + score + " You WON!!! Restart?")) {
      window.location.reload();
      return;
    } else {
      return;
    }
  }

  // ###############Coins#######################

  const collisions = allCollisions(spieler, [coin1, coin2, coin3, coin4]);

  for (const collision of collisions) {
    collision.parentNode.removeChild(collision);
  }
  for (const collision of collisions) {
    score = score + 10;
    new Audio(
      "https://freesound.org/data/previews/341/341695_5858296-lq.mp3"
    ).play();
  }

  // ############### Scroll #######################

  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

console.log(spieler);
