let FPS = 1000 / 15; // 15fps
let loop;
let boardColor = "rgb(6, 61, 21)";
const board = document.querySelector("#board");
let w = board.width;
let h = board.height;


let sqrSize = 20;
let x = w / sqrSize; // number of squares on the x line
let y = h / sqrSize; // number of the squares on the y line



const ctx = board.getContext("2d"); // drawing tool

loop = setInterval(Frame,FPS) // 66ms * 15 = 1000ms (calling this function 15 times in a second)
function Frame(){ 
    Food();
    Snake();
    Board();
    Square(9,9,"red");
    Square(9,8,"red");
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

function Snake(){ // draw the snake

}

function Food(){ // draw the food

}

