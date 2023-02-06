let FPS = 1000 / 8; // fps
let loop;
let boardColor = "rgb(6, 61, 21)";
const board = document.querySelector("#board");
let w = board.width;
let h = board.height;

let headColor = "rgb(9, 235, 73)";
let bodyColor = "rgb(27, 171, 68)";
let snake = [
    {x: 1, y: 0},
    {x: 0, y: 0}
];

let currentDirection = "";
let lastDirection = "";
const direction = {
    right: "ArrowRight",
    left: "ArrowLeft",
    up: "ArrowUp",
    down: "ArrowDown"
}

document.addEventListener("keyup", setDirection); // add event listener to all keypress
let sqrSize = 20;
let x = w / sqrSize; // number of squares on the x line
let y = h / sqrSize; // number of the squares on the y line



const ctx = board.getContext("2d"); // drawing tool

loop = setInterval(Frame,FPS) // 66ms * 15 = 1000ms (calling this function 15 times in a second)
function Frame(){ 
    Board();
    Food();
    Snake();
    SnakeMove();
}

function Board(){
    ctx.fillStyle = boardColor;

    ctx.fillRect(0, 0, w, h);
}
function Square(x, y, color){
    ctx.fillStyle = color;

    ctx.fillRect(x * sqrSize, y * sqrSize, sqrSize, sqrSize);   // filling the block
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * sqrSize, y * sqrSize, sqrSize, sqrSize); // outline at the same position
}

function Snake(){ 
    snake.forEach((tile, i) =>{
        const color = i === 0 ? headColor : bodyColor // list index 0 use headColor else bodyColor
        Square(tile.x, tile.y, color) // get each body part and head's location and draw them by using the Square function
    })

}

function setDirection(k){
    lastDirection = currentDirection
    if(k.key == direction.right && lastDirection != direction.left ||
        k.key == direction.left && lastDirection != direction.right ||
        k.key == direction.up && lastDirection != direction.down ||
        k.key == direction.down && lastDirection != direction.up) // tried 37 38 39 40 but could'nt get it to work
    currentDirection = k.key // get a new key if it's one of the arrow keys
}

function SnakeMove(){
    const head = {...snake[0]}; // creating a new head seperate from the original (no pointer)
    if( currentDirection == direction.left && lastDirection != direction.right){
        head.x -= 1; // move head to the left 1 square
        snake.pop(); // remove the snake's last part
        snake.unshift(head); // adding head at the start of the snake
    }
    else if(currentDirection == direction.right && lastDirection != direction.left){
        head.x += 1;
        snake.pop();
        snake.unshift(head);
    }
    else if(currentDirection == direction.down && lastDirection != direction.up){
        head.y += 1;
        snake.pop();
        snake.unshift(head);
    }
    else if(currentDirection == direction.up && lastDirection != direction.down){
        head.y -= 1;
        snake.pop();
        snake.unshift(head);
    }
}
function Food(){ // draw the food

}

