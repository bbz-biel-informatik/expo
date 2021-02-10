// MUSIC
const music = new Audio('sounds/song.mp3');
const startMusic = () => music.play();

const eastereggsound = new Audio('sounds/eastereggsoundwithf.mp3');
const startEasterEgg= () => eastereggsound.play();


//start
const text = document.querySelector("#text");



const playfield = document.getElementById("playfield");

// 1: Background Squares
// 2: Corridors for Pac-Man with Dots
// 3: Corridors for Pac-Man without Dots
// 5: Wall
// 6: Cage Wall for ghosts
// 7: Ghosts

// Array of gameBoard = 30 x 25
const gameBoard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 5, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 5, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 5, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 5, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 5, 5, 5, 5, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 2, 5, 5, 5, 5, 1, 1,
    1, 1, 5, 2, 2, 2, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 2, 2, 2, 2, 5, 1, 1,
    1, 1, 5, 2, 5, 5, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 2, 5, 5, 2, 5, 1, 1,
    1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1,
    1, 1, 5, 5, 5, 5, 2, 5, 2, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 2, 5, 2, 5, 5, 5, 5, 1, 1,
    5, 5, 5, 5, 5, 5, 2, 2, 2, 5, 2, 5, 1, 1, 1, 1, 1, 1, 5, 2, 5, 2, 2, 2, 5, 5, 5, 5, 5, 5,
    2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 2, 5, 1, 1, 7, 1, 1, 1, 5, 2, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2,
    5, 5, 5, 5, 5, 5, 2, 2, 2, 5, 2, 5, 1, 1, 1, 1, 1, 1, 5, 2, 5, 2, 2, 2, 5, 5, 5, 5, 5, 5,
    1, 1, 5, 5, 5, 5, 2, 5, 2, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 2, 5, 2, 5, 5, 5, 5, 1, 1,
    1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1,
    1, 1, 5, 2, 5, 5, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 2, 5, 5, 2, 5, 1, 1,
    1, 1, 5, 2, 2, 2, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 2, 2, 2, 2, 5, 1, 1,
    1, 1, 5, 5, 5, 5, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 2, 5, 5, 5, 5, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 5, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 5, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 5, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 2, 5, 5, 5, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

];

let x = true;

const screen = document.querySelector("#screen")
    screen.addEventListener('click', () => {

    if (x == true) {
    
    spliceGameboard(gameBoard.indexOf(7), 1, 1);
    spliceGameboard(434, 1, 1);
    
    screen.style.top ="-100%"
    startMusic();
    spliceGameboard(143, 1, 7);
 
    x=false;
} else{
    console.log(text.innerHTML)
    window.location.reload();
}
});


// variables
let playerMaths = 0;
let lastMove = 30;
let lastBlock;
let lastPlayermove = 0;

function drawPlayfield () {
    playfield.innerHTML = "";
    for (i=0; i<gameBoard.length; i++) {
        const square = document.createElement("div");
        square.style.position = "relative";
        playfield.appendChild(square);
        
        switch(gameBoard[i]) {
            case 0:
                square.style.backgroundColor = "none";
                square.style.pointerEvents = "none";
            break;
            case 1:
                square.style.backgroundColor = "black";
            break;
            case 2:
                square.style.backgroundColor = "black";
                const pacDots = document.createElement("div");
                pacDots.classList.add("pac-dots");
                square.appendChild(pacDots);    
            break;
            case 3:
                square.style.backgroundColor = "black";
            break;
            case 5:
                square.style.backgroundColor = "blue";
            break;
            case 6:
                square.style.backgroundColor = "yellow";
            break;
            case 7:
                square.style. backgroundSize= "cover";  
                square.style.backgroundRepeat =  "no-repeat, repeat";
                square.style.filter= "hue-rotate(-80deg)";
                if(lastMove == 1){
                    square.style.backgroundImage = "url('./img/horizontal.gif')";
                    square.style.transform = "scaleX(1)";
                }
                else if(lastMove== -1) {
                    square.style.backgroundImage = "url('./img/horizontal.gif')";
                    square.style.transform = "scaleX(-1)";
                }
                else if(lastMove== -30 ) {
                    square.style.backgroundImage = "url('./img/up.gif')";
                }
                else if(lastMove== 30) {
                    square.style.backgroundImage = "url('./img/down.gif')";
                } else{
                square.style.backgroundImage = "url('./img/horizontal.gif')";

                }
            break;
            case 69:
                square.style. backgroundSize= "cover";  
                square.style.backgroundRepeat =  "no-repeat, repeat";

                if(lastPlayermove == 1){
                    square.style.backgroundImage = "url('./img/horizontal.gif')";
                    square.style.transform = "scaleX(1)";
                }
                else if(lastPlayermove == -1) {
                    square.style.backgroundImage = "url('./img/horizontal.gif')";
                    square.style.transform = "scaleX(-1)";
                }
                else if(lastPlayermove == -30 ) {
                    square.style.backgroundImage = "url('./img/up.gif')";
                }
                else if(lastPlayermove == 30) {
                    square.style.backgroundImage = "url('./img/down.gif')";
                } else{
                square.style.backgroundImage = "url('./img/horizontal.gif')";

                }


        }   
    }   
}

drawPlayfield();

// GET  WALLS
function getSquares(gameBoardArray, searchedValue) {
    let walls = [], i;
    for(i = 0; i < gameBoardArray.length; i++)
    if (gameBoardArray[i] === searchedValue)
    walls.push(i);
    return walls;
}

const walls = getSquares(gameBoard, 5);

// Splice Function
function spliceGameboard (object, start, movement) {
    gameBoard.splice(object, start, movement);
}

// Variable for keyDownHandler Function
let intervalStop = undefined;
let speed = 200; 

// Movement of Pacman

function keyDownHandler(event) {

    let pacman = gameBoard.indexOf(69);

    // const movement = function () {
    //     spliceGameboard(pacman, 1, 3);
    // }

    if(pacman == 449) {
        spliceGameboard(449, 1, 3);
        spliceGameboard(420, 1, 69);
    }
    else if(pacman == 420) {
        spliceGameboard(420, 1, 3);
        spliceGameboard(449, 1, 69);
       
    } 
    else if(event.keyCode == 39) {
        move(1);
        lastPlayermove = 1;
    }
    else if(event.keyCode == 37) {
        move(-1);
        lastPlayermove = -1;
    }
    else if(event.keyCode == 40) {
    move(30)
    lastPlayermove = 30;
    
    }
    else if(event.keyCode == 38) {
    move(-30);
    lastPlayermove = -30;
    }
    else if(event.keyCode == 70) {
        startEasterEgg();
    }
    console.log(lastPlayermove);
    drawPlayfield();
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keydown', drawPlayfield, false);

// Points Count System
let pointsCounter = document.getElementById("points");


function countPoints() {
    let pointsArr = getSquares(gameBoard, 2);
    pointsCounter.innerHTML = pointsArr.length;
    if (pointsArr.length == 0) {
        text.innerHTML ="You have won! F5 to play again"
        screen.style.top="0%";
        startEasterEgg();

    }
}
countPoints();



function move(maths) {
    playerMaths = maths;
}


// Ghost

function randomMove() {
    let ghost = gameBoard.indexOf(7);
    let movementOptions = [-30, -1, 1, 30];
    let wallsSensor = [];
    for(const movementOption of movementOptions) {
        if (!walls.find(wall => wall == ghost + movementOption) && movementOption != -lastMove && ghost + movementOption != 366 && ghost + movementOption != 383) {
            wallsSensor.push(movementOption);
        }
    }
    return wallsSensor[Math.floor(Math.random() * wallsSensor.length)];
}

function moves(maths, cageCheck=false) {
    function motion() {
        let pacman = gameBoard.indexOf(69);
        let ghost = gameBoard.indexOf(7);
        if(ghost == 449) {
            spliceGameboard(449, 1, 3);
            spliceGameboard(421, 1, 7);
        }
        else if(ghost == 420) {
            spliceGameboard(420, 1, 3);
            spliceGameboard(448, 1, 7);
           
        } else{

        maths = randomMove();
        lastMove = maths;
        let ghost = gameBoard.indexOf(7)
        const x = lastBlock;
        lastBlock = gameBoard[ghost + lastMove];
        spliceGameboard(ghost, 1, x);
        spliceGameboard(ghost + lastMove, 1, 7);
        maths = playerMaths;
    }

        if (!walls.find(wall => wall == pacman + maths)) {
            if(pacman == -1 || ghost == -1) {
                text.innerHTML = "You lost the game";
                screen.style.top ="0%";
                startEasterEgg();
            }    
            spliceGameboard(pacman, 1, 3);
            spliceGameboard(pacman + maths, 1, 69);
        }
        countPoints();
        drawPlayfield();
    }
    clearInterval(intervalStop);
    intervalStop = setInterval(motion, speed);
}
moves();

