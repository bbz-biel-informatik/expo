//Delcare Global Variables
var s;
var scl = 40;
var food = [];
const GAME_SIZE = 800;
const MAX_FOOD = 5;
if(localStorage.getItem('score') == null){
  localStorage.setItem('score', 0);
}
// p5js Setup function - required

function setup() {
  createCanvas(GAME_SIZE, GAME_SIZE + 40);
  background(51);
  s = new Snake();
  frameRate (10);
}


// p5js draw function

function draw() {
  background(51);
  renderScoreBoard();
  s.checkCollusion();
  s.death();
  s.update();

  fill(255,255,100);
  renderFood();
  if(food.length < MAX_FOOD){
    spawnFood();
  }

  s.show();
}

//render food function
function renderFood(){
  for(let i = 0; i < food.length; i++){
    rect(food[i].x,food[i].y, scl, scl);
  }
}
//spawn new food and get location in game

function spawnFood() {
  var cols = floor(GAME_SIZE/scl);
  var rows = floor(GAME_SIZE/scl);
  food1 = createVector(floor(random(cols)), floor(random(rows)));
  food1.mult(scl);   
  let newFood = new Food(food1.x, food1.y, scl);
  food.push(newFood);

}

// scoreboard
let moveDirection = "right";


function renderScoreBoard() {
  fill(0);
  rect(0, GAME_SIZE, GAME_SIZE, 40);
  fill(255);
  textFont("Arial");
  textSize(18);
  text("Score: ", 10, GAME_SIZE + 25);
  text("Highscore: ", 450, GAME_SIZE + 25);
  text(s.score, 70, GAME_SIZE + 25);
  text(localStorage.getItem('score'), 540, GAME_SIZE + 25);
}

// CONTROLS function

function keyPressed() {
  if (keyCode === UP_ARROW){
    if(moveDirection == "down")return;
      s.direction(0, -1);
      moveDirection = "up";
  }else if (keyCode === DOWN_ARROW) {
    if(moveDirection == "up")return;
      s.direction(0, 1);
      moveDirection = "down";
  }else if (keyCode === RIGHT_ARROW) {
    if(moveDirection == "left")return;
      s.direction (1, 0);
      moveDirection = "right";
  }else if (keyCode === LEFT_ARROW) {
    if(moveDirection == "right")return;
      s.direction (-1, 0);
      moveDirection = "left";
  }
}

class Food{
  x;
  y;
  width;
  constructor(x, y, width){
    this.x = x;
    this.y = y;
    this.width = width;
  }
}


// SNAKE OBJECT

class Snake {
  x;
  y;
  xspeed;
  yspeed;
  total;
  tail;
  score;
  highscore;

  constructor(){
    this.x =0;
    this.y =0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.score = 1;
    this.highscore = 1;
  }

  direction(x,y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  checkCollusion(){
    let toRemove = null;
    for(let i = 0; i < food.length; i++){
      var d = dist(this.x, this.y, food[i].x, food[i].y);
      if (d < 1) {
        this.total++;
        this.score++;
        toRemove = i;
        text(this.score, 70, GAME_SIZE + 25);
        if (this.score > localStorage.getItem('score')) {
          localStorage.setItem('score', this.score);

        }
        text(localStorage.getItem('score'), 540, GAME_SIZE + 25);

      } 
    }
    if(toRemove != null){
      food.splice(toRemove, 1);
      console.log("remove: " + toRemove);
    }
  }
  eat(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      //text(this.score, 70, 625);
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      //text(this.highscore, 540, 625);
      return true;
    } else {
      return false;
    }
  }

  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      if(typeof pos == "undefined")continue;
      
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.score = 0;
        this.tail = [];
      }
    }
  }

  update(){
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
    }

    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    this.x = constrain(this.x, 0, GAME_SIZE-scl);
    this.y = constrain(this.y, 0, GAME_SIZE-scl);


  }
  show(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      try{
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
        catch(e){
        console.log(e);
        }
    }

    rect(this.x, this.y, scl, scl);
  }
}