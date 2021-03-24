let boardSize = 21;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
let direction = 0;
let foodIsEaten = true;
let position = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
let foodPosition = { x: 0, y: 0 };

let snakePositions = [];
snakePositions.push("x" + position.x + "y" + position.y);




//drawBoard

function drawBoard() {
    //drawBoard (maakt het speelveld dat is opgebouwd uit div elementen met een unieke id)
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            board.innerHTML += "<div id='x" + x + "y" + y + "' class='cell'>x" + x + "y" + y + "</div>";
        }
        board.innerHTML += "<br>";
    }
}


//clearBoard

function clearBoard() {
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            let snakeId = "x" + i + "y" + j;
            document.getElementById(snakeId).className = "cell";
        }
    }
}


//updatePosition

function updatePosition() {
    if (direction == 1) {
        position.y = position.y - 1;
    }
    if (direction == 2) {
        position.y = position.y + 1;
    }
    if (direction == 3) {
        position.x = position.x + 1;
    }
    if (direction == 4) {
        position.x = position.x - 1;
    }
    snakePositions.shift();
    snakePositions.push("x" + position.x + "y" + position.y);
}


//resetGame

function resetGame() {
    direction = 0;
    position = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
    foodIsEaten = false;
    snakePositions.length = 0;   //dit zorgt er voor dat de slang in 1 keer dood gaat als hij tegen de muur gaat en spawnt dan weer met 1 bolletje.

}


//gameOver

function collisionCheck() {
    // checkt of je buiten het speelveld gaat
    if (position.x < 0 || position.y < 0 || position.x > boardSize - 1 || position.y > boardSize - 1) {
        resetGame()
    }
    //checken of de slang zichzelf raakt
    let snakePositionControle = "x" + position.x + "y" + position.y;
    for (let i = 0; i < snakePositions.length - 1; i++) {
        if (snakePositionControle == snakePositions[i]) {
            console.log("botsing tegen eigen lijf!!!!");
            resetGame();
        }
    }

}


//drawSnake

function drawSnake() {
    for (let i = 0; i < snakePositions.length; i++) {
        if (i == snakePositions.length - 1) {
            //hier wordt zijn hoofd getekend
            // document.getElementById(snakePositions[i]).className += " bodyHead"
            document.getElementById(snakePositions[i]).className += " bodyDirection" + direction;
        } else if (i == 0) {
            //hier wordt zijn staart getekend
            if (snakePositions.length>1){
                // document.getElementById(snakePositions[i]).className += " bodyDirectionAchter" + direction;
                // let hokjenaastdestaart = snakePositions[i+1]; 
                // let hokjenaastdestaartX = hokjenaastdestaart.split("y")[0].split("x")[1];
                // let hokjenaastdestaartY = hokjenaastdestaart.split("y")[1];
                
                // let hokjestaart = snakePositions[i];
                // let hokjestaartX = hokjestaart.split("y")[0].split("x")[1];
                // let hokjestaartY = hokjestaart.split("y")[1];

                // if (hokjenaastdestaartX==hokjestaartX)
                // {
                //     if (hokjenaastdestaartY<hokjestaartY)
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection2";
                //     }
                //     else
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection1";
                //     }
                // }
                // else
                // {
                //     if (hokjenaastdestaartX<hokjestaartX)
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection4";
                //     }
                //     else
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection3";
                //     }
                // }
                // if (hokjenaastdestaartY==hokjestaartY)
                // {
                //     if (hokjenaastdestaartY<hokjestaartX)
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection1";
                //     }
                //     else
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection4";
                //     }
                // }
                // else
                // {
                //     if (hokjenaastdestaartX<hokjestaartY)
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection2";
                //     }
                //     else
                //     {
                //         document.getElementById(snakePositions[i]).className += " bodyDirection3";
                //     }
                // }
            }
            // document.getElementById(snakePositions[i]).className += " bodyDirectionAchter" + direction;
        }
        // console.log(snakePositions[i]);
        document.getElementById(snakePositions[i]).className += " body";
    }

}


// Dit is voor het voedsel

function drawFood() {
    if (foodIsEaten) {
        //
        //TODO: zorg er voor dat het voedsel nooit op de slang kan komen te staan!!
        //
        let xRandom = Math.floor(Math.random() * (boardSize - 1));
        let yRandom = Math.floor(Math.random() * (boardSize - 1));
        foodPosition.x = xRandom;
        foodPosition.y = yRandom;
        foodIsEaten = false;
    }
    let foodPositionID = "x" + foodPosition.x + "y" + foodPosition.y;
    document.getElementById(foodPositionID).className += " food";
}


function snakeEatsFood() {
    if (position.x == foodPosition.x && position.y == foodPosition.y) {
        foodIsEaten = true;
        snakePositions.push("x" + position.x + "y" + position.y);
    }
}

//gameLoop
let timeCounter = 0;
function gameLoop() {

    updatePosition();
    collisionCheck();
    clearBoard();
    drawFood();
    drawSnake();
    snakeEatsFood();
    timeCounter++
    var timeoutTime = 550 - snakePositions.length * 30 - timeCounter / 2;   //hierdoor gaat de slang steeds sneller per seconde
    if (timeoutTime < 100) {   //dit zorgt er voor dat de slang niet sneller kan dan 100
        timeoutTime = 100;
    }
    setTimeout(gameLoop, timeoutTime);
}

drawBoard();

setTimeout(gameLoop, 0);
// keyboard controls

window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp") {
        if (direction != 2) {
            direction = 1;
        }
    }
    if (event.key == "ArrowDown") {
        if (direction != 1) {
            direction = 2;
        }
    }
    if (event.key == "ArrowRight") {
        if (direction != 4) {
            direction = 3;
        }
    }
    if (event.key == "ArrowLeft") {
        if (direction != 3) {
            direction = 4;
        }
    }
    // keyboardInput.innerHTML = "direction:" + direction;
}, true);

