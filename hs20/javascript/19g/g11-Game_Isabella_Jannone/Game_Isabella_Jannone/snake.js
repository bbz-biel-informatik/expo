var richtung="right"
var speed=3

var spieler = document.querySelector('.player')
spieler.style.left = '0px'
spieler.style.top = '0px'


var apple = document.querySelector('.apple')
apple.style.left = Math.random()*530+'px'
apple.style.top = Math.random()*530+'px'

var punkteAnzeige = document.querySelector('.punkte')
var score = 0

function spieler(width, height, color, x, y, type) {

  this.type = type;
  this.width = width;
  this.height = height;
  this.speed = 1;
  this.angle = 0;
  this.x = x;
  this.y = y;    
  this.update = function() {
      ctx = playground.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = color;
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
      ctx.restore();    
  }
  this.newPos = function() {
      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);
  }
}

function updateplayground() {
  playground.clear();
  playground.newPos();
  playground.update();
}

function loop() {


  if(keyboard(39)) {
    richtung="right"
  }
  if(keyboard(37)) {
    richtung="left" 
  }

  if(keyboard(38)) {
    richtung="up"
  }
  if(keyboard(40)) {
   richtung="down"
  }
  if (richtung=="right") {
    spieler.style.left = parseFloat(spieler.style.left) + speed + 'px'
  }
  if (richtung=="left") {
    spieler.style.left = parseFloat(spieler.style.left) - speed + 'px'
  }
  if (richtung=="up") {
    spieler.style.top = parseFloat(spieler.style.top) - speed + 'px'
  }
  if (richtung=="down") {
    spieler.style.top = parseFloat(spieler.style.top) + speed + 'px'
  }
  "/stay inside the box/"
  if(anyCollision(spieler, [apple])) {
    apple.style.left = Math.random()*530+'px'
    apple.style.top = Math.random()*530+'px'
    speed=speed+0.5
    {
      score = score + 1
      punkteAnzeige.textContent = score
    }
  }
  if (parseInt(spieler.style.left)<0){
    spieler.style.left="530px"
    alert("game over")
return
  }
  if (parseInt(spieler.style.left)>530){
    spieler.style.left="0px"
    alert("game over")
return
  }
  if (parseInt(spieler.style.top)<0){
    spieler.style.top="530px"
    alert("game over")
return
  }
  if (parseInt(spieler.style.top)>530){
    spieler.style.top="0px"
    alert("game over")
return
  }


  
  
  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)