const sldrEat = document.querySelector("#slider-eat");
let eat = sldrEat.value
const sldrSpeed = document.querySelector("#slider-speed");
let speed = 1 + (sldrSpeed.value/100); // 1.01 to 2 slider
let FPS = 1000 / (8 * speed); // fps
let loop;
let boardColor = "rgb(6, 61, 21)";
const board = document.querySelector("#board");
let w = board.width;
let h = board.height;

const scr = document.querySelector("#score");
const msg = document.querySelector("#message");
const hscr = document.querySelector("#h-score");
let score = 0;

let headColor = "rgb(9, 235, 73)";
let bodyColor = "rgb(27, 171, 68)";
let snake = [
    {x: 15, y: 7},
    {x: 14, y: 7}
];
const lngth = document.querySelector("#length");
const sttngs = document.querySelector("#settings");
sttngs.addEventListener("click", Menu);
const spd = document.querySelector("#speed");
const mn = document.querySelector("#menu")
mn.style.visibility = "hidden"

let currentDirection = "";
let lastDirection = "";
// because of .keyCode is not recommended we are using .key
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
// https://www.w3.org/TR/uievents-key/#key-string
const input = { 
    right: "ArrowRight",
    left: "ArrowLeft",
    up: "ArrowUp",
    down: "ArrowDown",
    p: "p",
    escape: "Escape",
    space: " "
}

let pause = false;

document.addEventListener("keyup", setDirection); // add event listener to all keypress
let sqrSize = 10;
let xsqr = w / sqrSize; // number of squares on the x line
let ysqr = h / sqrSize; // number of the squares on the y line
let food = Food();


const ctx = board.getContext("2d"); // drawing tool




hscr.innerHTML = `High Score: ${localStorage.getItem("highScore") || 0}`
lngth.innerHTML = `Length: ${snake.length}`
spd.innerHTML = `Speed: ${Math.round((speed-1)*100)}`
loop = setInterval(Frame,FPS) // 66ms * 15 = 1000ms (calling this function 15 times in a second)


function Menu(){
   
    if(mn.style.visibility == "hidden"){
        mn.style.visibility = "visible"
    }
    else if( mn.style.visibility == "visible"){
        mn.style.visibility = "hidden"
        Settings();
    }
}


function Frame(){ 
    if(pause == false){
        Board();
        Food();
        DrawFood();
        Snake();
        SnakeMove();
        LoseWall();
        LoseSelf();
    }
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
    if(k.key == input.p || k.key == input.escape || k.key == input.space){
        pause = !pause;
        pause ? msg.innerHTML = "PAUSED" : msg.innerHTML = "";
    }
    if(pause == false){
        lastDirection = currentDirection
        if(k.key == input.right && lastDirection != input.left ||
            k.key == input.left && lastDirection != input.right ||
            k.key == input.up && lastDirection != input.down ||
            k.key == input.down && lastDirection != input.up)
            currentDirection = k.key // get a new key if it's one of the arrow keys
    }
}

function Movement(head, tail){
    if(food.x == snake[0].x && food.y == snake[0].y){ // if location of the food is same as the location of snake's head
        food = Food(); // create a new food location
        score++;
        scr.innerHTML = `Score: ${score}`;
        UpdateHighScore();
        for(let i = 1; i < eat; i++){
            snake.push(tail);
        }
    }
    else{
        snake.pop(); // else remove the snake's last part
    }
    snake.unshift(head); // adding head at the start of the snake
    lngth.innerHTML = `Length: ${snake.length}`
}
function SnakeMove(){
    const head = {...snake[0]}; // creating a new head seperate from the original (no pointer) 
    const tail = {...snake[snake.length-1]};
    if( currentDirection == input.left && lastDirection != input.right){
        head.x -= 1; // move head to the left 1 square
        Movement(head, tail);
    }
    else if(currentDirection == input.right && lastDirection != input.left){
        head.x += 1;
        Movement(head, tail);
    }
    else if(currentDirection == input.down && lastDirection != input.up){
        head.y += 1;
        Movement(head, tail);
    }
    else if(currentDirection == input.up && lastDirection != input.down){
        head.y -= 1;
        Movement(head, tail);
    }
}
function Food(){ // generate a location for the food
    let food = {
        x: Math.floor(Math.random() * xsqr),
        y: Math.floor(Math.random() * ysqr)
    }
    while(snake.some((tile) => tile.x == food.x && tile.y == food.y)){ // some method returns true if any of the list items passes the condition
        food = {
            x: Math.floor(Math.random() * xsqr),
            y: Math.floor(Math.random() * ysqr)
        }
    }
    return food;
}
function DrawFood(){
    Square(food.x, food.y, "red")
}


function LoseWall(){
    if(snake[0].x < 0 ||
        snake[0].x >= xsqr ||
        snake[0].y < 0 ||
        snake[0].y >= ysqr)
        GameOver();
}

function LoseSelf(){
    for(let i=1; i<snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            GameOver();
        }
    }
}
function UpdateHighScore(){
    if(score > localStorage.getItem("highScore") || 0){
        localStorage.setItem("highScore", score.toString())
        hscr.innerHTML = `High Score: ${localStorage.getItem("highScore")}`
    }
}
function GameOver(){
    board.style.borderColor = "red";
    document.removeEventListener("keyup", setDirection)
    clearInterval(loop);
    UpdateHighScore();
    msg.innerHTML = "RESTART?";
    msg.addEventListener("click", Reset);
    msg.style.cursor =  "url('https://cdn.custom-cursor.com/db/15051/32/starter-northern-lights-pointer.png'), auto";
}
function Reset(){
    board.style.borderColor = "black";
    document.addEventListener("keyup", setDirection)
    msg.style.cursor = "inherit";
    msg.removeEventListener("click", Reset);
    msg.innerHTML = "PRESS ARROW KEYS TO START"
    snake = [
        {x: 15, y: 7},
        {x: 14, y: 7}
    ];
    food = Food();
    loop = setInterval(Frame,FPS)
    score = 0;
    currentDirection = "";
    lastDirection = "";
    pause = false;
    scr.innerHTML = `Score: ${score}`;
    lngth.innerHTML = `Length: ${snake.length}`
}

function Settings(){
    speed = 1 + (sldrSpeed.value / 100);
    FPS = 1000 / (8 * speed);
    clearInterval(loop)
    loop = setInterval(Frame,FPS)
    spd.innerHTML = `Speed: ${Math.round((speed-1)*100)}`
    eat = sldrEat.value
    console.log(eat);
}