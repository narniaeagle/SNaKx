let FPS = 1000 / 15; // 15fps
let loop;
let boardColor = "rgb(6, 61, 21)";
const board = document.querySelector("#board");
let w = board.width;
let h = board.height;



const ctx = board.getContext("2d"); // drawing tool

loop = setInterval(Frame,FPS) // 66ms * 15 = 1000ms (calling this function 15 times in a second)
function Frame(){ 
    Food();
    Snake();
    Board();
}

function Board(){
    ctx.fillStyle = boardColor;

    ctx.fillRect(0, 0, w, h);
}

function Snake(){ // draw the snake

}

function Food(){ // draw the food

}

