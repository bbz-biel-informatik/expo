
var spielfeld = document.querySelector(".playground");
var ton = new Audio('sounds/ton.mp3')
var farbe = "red";
var polizei= document.querySelector("#punktzahl_polizei")
polizei.addEventListener("click", ()=>{
  var p=localStorage.getItem("polizei")
  if(p) {
    p=parseInt(p)+1
  }
  else{
    p=1
  }
  localStorage.setItem("polizei", p)
  polizei.textContent=p
})

var dieb= document.querySelector("#punktzahl_dieb")
dieb.addEventListener("click", ()=>{
  var p=localStorage.getItem("dieb")
  if(p) {
    p=parseInt(p)+1
  }
  else{
    p=1
  }
  localStorage.setItem("dieb", p)
  dieb.textContent=p
})

function loop() {
  var boxen = document.querySelectorAll(".player");
  for (var box of boxen) {
    if (parseInt(box.style.top) < 500 && !anyCollision(box, boxen)) {
      box.style.top = parseInt(box.style.top) + 5 + "px";
    }
  }





  window.requestAnimationFrame(loop);
  


}

window.requestAnimationFrame(loop);
var buttons = document.querySelectorAll(".btn");
for (var button of buttons) {
  button.addEventListener("click", click);
}

function click() {
  var id = this.getAttribute("data-id");
  var box = document.createElement("div");
  box.classList.add("player");
  box.style.left = (id - 1) * 100 + "px";
 box.classList.add(farbe)
  box.style.top = "0px";
  spielfeld.appendChild(box);
  if (farbe == "red") {
    farbe = "blue";
  } else {
    farbe = "red";
  }


    ton.play()

  

}

var neustart = document.querySelector(' .loeschen')
function reload ()  {
  window.location.reload()
}
  

neustart.addEventListener('click', reload)

var neustart = document.querySelector('.restart')
function reload ()  {
  window.location.reload()
}


neustart.addEventListener('click', reload)

var p=localStorage.getItem("polizei")
if(p) {
  polizei.textContent=parseInt(p)
}

var p=localStorage.getItem("dieb")
if(p) {
  dieb.textContent=parseInt(p)
}