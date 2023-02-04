let FPS = 1000 / 15; // 15fps
let loop;


loop = setInterval(Frame,FPS) // 66ms * 15 = 1000ms (calling this function 15 times in a second)
function Frame(){ 
    Food();
    Snake();
    Board();
}

function Board(){ // going to draw the board in here (filling canvas with a color)

}

function Snake(){ // draw the snake

}

function Food(){ // draw the food

}

