// Neuer Eintrag
var formData = new FormData();

formData.append("game", "Merikurisumasu-Game");
formData.append("name", $nickname);
formData.append("score", $punkte);

var request = new XMLHttpRequest();
request.open("POST", "https://scores.bbz.cloud/score");
request.send(formData);

// Einträge abrufen
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://scores.bbz.cloud/scores?game=Merikurisumasu-Game");
oReq.send();

var res = document.querySelector('.results');

function reqListener() {
  var data = JSON.parse(this.responseText);
  for(var datum of data) {
    res.innerHTML += "<b>" + datum.name + "</b> " + datum.score + "<br>"
  }
}