let boardSize = 21;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
let direction = 0;
let foodIsEaten = true;
let position = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
let foodPosition = { x: 0, y: 0 };

let snakePositions = [];
snakePositions.push("x"+position.x+"y"+position.y); 




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
        position.y = position.y -1;
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
    snakePositions.push("x"+position.x+"y"+position.y);
}


//resetGame

function resetGame() {
    direction = 0;
    position = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
    foodIsEaten = false;
    snakePositions.length = 0;

}


//gameOver

function collisionCheck() {
    if (position.x < 0 || position.y < 0 || position.x > boardSize - 1 || position.y > boardSize - 1) { resetGame() }
}


//drawSnake

function drawSnake() {
    //let snakeHeadsnakePosition = "x" + snakePosition.x + "y" + snakePosition.y;
    //document.getElementById(snakeHeadsnakePosition).className += " bodySnake";
    for(let i=0;i<snakePositions.length;i++)
    {
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


function snakeEatsFood(){
    if (position.x == foodPosition.x && position.y == foodPosition.y) {
        foodIsEaten = true;
        snakePositions.push("x"+position.x+"y"+position.y);
    }
}

//gameLoop

function gameLoop() {

    updatePosition();
    collisionCheck();
    clearBoard();
    drawFood();
    drawSnake();
    snakeEatsFood();

}

drawBoard();
setInterval(gameLoop, 130);

// keyboard controls

window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp") {
        direction = 1;
    } else if (direction != 1 && event.key == "ArrowUp"){
        direction = 2
    }
    if (event.key == "ArrowDown") {
        direction = 2;
    }else if (direction != 2 && event.key == "ArrowDown"){
        direction = 1
    }
    if (event.key == "ArrowRight") {
        direction = 3;
    }
    if (event.key == "ArrowLeft") {
        direction = 4;
    }
    // keyboardInput.innerHTML = "direction:" + direction;
}, true);


