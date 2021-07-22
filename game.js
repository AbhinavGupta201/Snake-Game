// global variable
highest_score=0;
canvas = document.getElementById("mycanvas"); // canvas object 

play=document.getElementById("start")
play.addEventListener("click",()=>{
    document.getElementById("game_over").style.visibility="hidden"
    init();
    // setinterval variable 
    f = setInterval(gameloop, 400);
})

function init() {

    
    W = canvas.width ;  
    H = canvas.height ;
    // W = H = canvas.height = canvas.width = 670;   // width and height of the canvas
    
    pen = canvas.getContext('2d');  // context 
    cs = 67; // cell size 
    score = 0;   // score
    game_over = false;  // game status
    
    food_img = new Image();
    food_img.src = "assets/apple1.png";
    
    food = new GenerateFoodObject();
    
    snake = {
        
        initial_length: 5,
        cells: [],
        direction: "right",
        color: "blue",
        
        createSnake: function () {
            for (let i = this.initial_length; i > 0; i--) {
                this.cells.push({ x: i, y: 5 });
            }
        },
        
        updateSnake: function () {
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            // console.log(headX,headY);
            
            
            var nextX = 0, nextY = 0;
            var flage = false;
            
            
            if (snake.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            else if (snake.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else if (snake.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if(snake.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            
            
            if (headX == food.x && headY == food.y) {
                score++;
                updateScore()
                // pen.fillStyle=food.color;
                
                let f1 = true;
                while (f1) {
                    food = new GenerateFoodObject();
                    
                    for (let i = 0; i < this.cells.length; i++) {
                        if (food.x == this.cells[i].x && food.y == this.cells[i].y) {
                            break;
                        }
                    }
                    if (i >= this.cells.length)
                    f1 = false;
                }
                pen.drawImage(food_img, food.x * cs, food.y * cs, 50, 50);
                
            }
            else {
                this.cells.pop();
            }
            if (headX <= 0 || headY <=0 || headX >= Math.floor((W - cs) / cs) || headY >= Math.floor((H - cs) / cs)) {
                game_over = true;
                clearInterval(f);
                gameOver()
            }
            else {
                for (let i = 0; i < this.cells.length-1; i++) {
                    if (nextX == this.cells[i].x && nextY == this.cells[i].y) {
                        game_over = true;
                        clearInterval(f);
                        gameOver()
                        break;
                    }
                }
                snake.cells.unshift({ x: nextX, y: nextY });
                
            }
            
            
        }
        
        
        
    };
    
    snake.createSnake();
    updateScore();
    UpdateHighest();
    
    document.addEventListener('keydown', keyPressed);
    
    function keyPressed(e) {
        
        if (e.key == "ArrowUp") {
            if (snake.direction != "down")
            snake.direction = "up";
        }
        
        else if (e.key == "ArrowDown") {
            if (snake.direction != "up")
            snake.direction = "down";
        }
        else if (e.key == "ArrowLeft") {
            if (snake.direction != "right")
            snake.direction = "left";
        }
        
        else if (e.key == "ArrowRight") {
            if (snake.direction != "left")
            snake.direction = "right";
        }

    }
}


// food object generator 
function GenerateFoodObject() {
    var posi_x = Math.ceil(Math.random() * (W - cs) / cs);
    var posi_y = Math.ceil(Math.random() * (H - cs) / cs);
    
    food = {
        x: posi_x,
        y: posi_y,
        color: "red",
    };
    
    return food;
}

// draw function of gameloop 
function draw() {
    
    // clearing canvas
    pen.clearRect(0, 0, W, H);   
    // food draw
    pen.drawImage(food_img, food.x * cs, food.y * cs, 50, 50);
    // snake draw
    for (i = 0; i < snake.cells.length; i++) {
        pen.fillStyle = snake.color;
        pen.fillRect(snake.cells[i].x * cs, snake.cells[i].y * cs, cs-2 , (cs-2 ));
        
    }
    
}

// update function of the game
function update() {
    // update the snake
    snake.updateSnake();
}

// Game loop 
function gameloop() {
    if (game_over == true) {
        clearInterval(f);
        gameOver()
    }
    else
    {
        update();
        draw();
    }
}
// game_over
function gameOver() {
    highest_score=Math.max(highest_score,score);
    updateScore();
    UpdateHighest();
    document.getElementById("game_over").style.visibility="visible"    
}
// score update 
function updateScore(){
    let item=document.getElementsByClassName("current_score")
    for(let i=0;i<item.length;i++)
        item[i].innerHTML=score

}
// update highest score 
function UpdateHighest(){
    let item=document.getElementsByClassName("highest_score")
    for(let i=0;i<item.length;i++)
        item[i].innerHTML=highest_score
}
/* 
// initial function 
init();

// setinterval variable 
f = setInterval(gameloop, 400);

 */
