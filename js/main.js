let boardSize = 21;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
let direction = 0;
let foodIsEaten = true;
let position = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
let foodPosition = { x: 0, y: 0 };


//drawBoard

function drawBoard() {
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            board.innerHTML += "<div id='x" + i + "y" + j + "' class='cell'></div>";
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
    if (direction == "up") {
        position.y = position.y - 1;
    }
    if (direction == "down") {
        position.y = position.y + 1;
    }
    if (direction == "right") {
        position.x = position.x + 1;
    }
    if (direction == "left") {
        position.x = position.x - 1;
    }
}


//resetGame

function resetGame() {
    direction = 0;
    position = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
}


//gameOver

function collisionCheck() {
    if (position.x < 0 || position.y < 0 || position.x > boardSize - 1 || position.y > boardSize - 1) { resetGame() }
}


//drawSnake

function drawSnake() {
    let snakeHeadPosition = "x" + position.x + "y" + position.y;
    document.getElementById(snakeHeadPosition).className += " body";
}


// Dit is voor het voedsel

function drawFood() {
    if (foodIsEaten) {
        //
        //todo: zorg er voor dat het voedsel nooit op de slang kan komen te staan!!
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




//gameLoop

function gameLoop() {
    updatePosition();
    collisionCheck();
    clearBoard();
    drawFood();
    drawSnake();
}

drawBoard();
setInterval(gameLoop, 500);


// keyboard controls

window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp") {
        direction = "up";
    }
    if (event.key == "ArrowDown") {
        direction = "down";
    }
    if (event.key == "ArrowRight") {
        direction = "right";
    }
    if (event.key == "ArrowLeft") {
        direction = "left";
    }
    // keyboardInput.innerHTML = direction;
}, true);


