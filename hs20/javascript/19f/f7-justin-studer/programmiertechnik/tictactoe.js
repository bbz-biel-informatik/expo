var buttons = document.querySelectorAll('button')
var farbe = "x" 

function titleRot(){
  if(this.classList.contains("gewählt")){
    return
  }
  this.textContent = farbe 
  this.classList.add("gewählt")
  if(farbe=="x"){
    farbe = "o"
  } else{
    farbe = "x"
  }
}
for(var button of buttons) {
  button.addEventListener('click', titleRot)
}


