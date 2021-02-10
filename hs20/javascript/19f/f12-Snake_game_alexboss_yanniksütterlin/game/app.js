/*eslint-env es6*/
/*eslint-env browser*/
/* exported remove */

var canvas = document.querySelector("#mycan");

canvas.width = 600;
canvas.height = 600;

var c = canvas.getContext('2d');

window.addEventListener("resize", function(){
    location.reload();
    
})

var mouse = {
    x: 10,
    y: 10
}

var colors = [
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#191919"
]

window.addEventListener("mousemove", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

var score = 0;
if (localStorage.getItem("highscore") == undefined){
    var highscore = 0;
} else {
    highscore = localStorage.getItem("highscore");
}

document.addEventListener("keydown", function(event){
    if (event.code == "ArrowLeft"){
        if (snake.xspeed != 1){
            snake.dir(-1, 0);    
        }
    } else if (event.code == "ArrowRight"){
        if (snake.xspeed != -1){
            snake.dir(1, 0);    
        }
    } else if (event.code == "ArrowUp"){
        if (snake.yspeed != 1){
            snake.dir(0, -1);    
        }
    } else if (event.code == "ArrowDown"){
        if (snake.yspeed != -1){
            snake.dir(0, 1);    
        }
    } else if (event.code == "Space"){
        location.reload();
    }
})

function distance(x1, y1, x2, y2){
    var xdistance = x2 - x1;
    var ydistance = y2 - y1;
    return Math.sqrt(Math.pow(xdistance, 2) + Math.pow(ydistance, 2));
}

function randomNumber (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(){
    return colors[randomNumber (1, 10)];
}

function randomPosition(a){
    if (a == "x"){
        return Math.floor(Math.random() * (canvas.height / 20)) * 20;
    } else {
        return Math.floor(Math.random() * (canvas.height / 20)) * 20; 
    }
}

var x = undefined;
var y = undefined;
var shift = true;

function Snake(){
    this.x = 100;
    this.y = 100;
    this.xspeed = 1;
    this.yspeed = 0;
    this.xfood = randomPosition("x");
    this.yfood = randomPosition("y");
    this.tail = [];
    
    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
    
    this.foot = function(){
        if (spiel == true){
            c.beginPath();
            c.fillStyle = "red";
            c.fillRect(this.xfood, this.yfood, 20, 20);        
        }
    }
    
    this.draw = function(){
        c.beginPath();
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, 20, 20);
    }
    this.update = function(){
        c.fillStyle = "white";
            
        x = this.x;
        y = this.y;
        this.tail.push({x, y});
        for (var i = 0; i < this.tail.length; i++){
            c.fillRect(this.tail[i].x, this.tail[i].y, 20, 20)
        }
        if (shift == true){
            this.tail.shift();
        } else {
            shift = true;
        }
        
        
        this.x += this.xspeed * 20;
        this.y += this.yspeed * 20;
        
        if (this.x == this.xfood && this.y == this.yfood){
            this.xfood = randomPosition("x");
            this.yfood = randomPosition("y");
            this.total += 1;
            shift = false;
            score += 1;
        }
        
        this.draw();
    }
}

var snake = new Snake();
var count = 0;
var spiel = true;

function animate(){
    requestAnimationFrame(animate);
    
    if (spiel == false){
        if (snake.x == 50 && snake.y == 50){
            snake.dir(1, 0);
        }else if (snake.x == 530 && snake.y == 50){
            snake.dir(0, 1);
        } else if (snake.x == 530 && snake.y == 530){
            snake.dir(-1, 0);
        } else if (snake.x == 50 && snake.y == 530){
            snake.dir(0, -1);
        }
    }
    
    if (snake.x < 0 || snake.x > canvas.width - 20 || snake.y < 0 || snake.y > canvas.height - 20){
        verkackt();
    }
    
    snake.tail.forEach(function(item){
            if (item.x == snake.x && item.y == snake.y){
                verkackt();
            }
        })
    
    if (count == 7){
        c.clearRect(0, 0, canvas.width, canvas.height);
        snake.update();
        snake.foot();
    } else if (count == 8){
        count = 1;
    }
    count += 1;
}

function verkackt(){
    snake.x = 50;
    snake.y = 50;
    spiel = false;
    
    if (score > highscore){
        highscore = score;
    }
    document.querySelector("#score").innerHTML = "Score: " + score;
    document.querySelector("#highscore").innerHTML = "Highscore: " + highscore;
    
    localStorage.setItem("highscore", highscore);
    
    document.querySelector("#restart").style.visibility = "visible";
    canvas.classList.add("mycan2");
}

animate();