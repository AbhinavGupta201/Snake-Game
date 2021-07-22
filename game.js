// // // canvas object extracting from the document object 
// // var canvas=document.getElementById("mycanvas");

// // W=canvas.width=1000;
// // H=canvas.height=500;

// // var pen=canvas.getContext('2d');

// // function keypressed(){
// //     console.log("key Pressed");

// // }
// // canvas.addEventListener('keypress',keypressed());

// /*

// var snake={
//     x:50,
//     y:50,
//     initial_length:5,
//     cells:[],
//     cs:66,

// };

// function f1()
// {
//     pen.clearRect(0,0,W,H);
//     pen.fillStyle="red";
//     pen.fillRect(snake.x,snake.y,snake.cs,snake.cs);
//     snake.x+=snake.cs;

//     console.log("function called");

// }

// setInterval(f1,1000);



// */

// a=10;  // global variable
// let f=20; // block level variable
// var g=30; // function level 



// function f2()
// {
//     let c=50;
//     var d=21;
//     if(c==50)
//     {
//         let e=10;
//         console.log("inside the block e=",e);
//         console.log("inside the block d=",d);
//         console.log("inside the block a=",a);
//     }
//    // console.log("outside the block e=",e);
//     console.log("inside the block d=",d);
//     console.log("inside the block a=",a);



// }

// f2();
// f1(100);

// // function in js   this way of function is called function decleartion - it follow the function hoisting that on manipulation the it will be shifted to the top of the document so can be called from any where in the javascript file 
// function f1(n)
// {
//     console.log(n);
//     return ;

// }

// // printf("hi");
// // // function expression 

// // var printf= function(n)
// // {
// //     console.log(n);
// //     return ;
// // }

// var arr=[1,2,3];
// console.log(arr);

// a=2;

// // if and else 
// if(a==1)
// {
//     console.log("1");
// }
// else if(a==2)
// {
//     console.log("2");  
// }
// else
// console.log("3");


// // this is called JSON( javascript object notation ) object  and it is also hoisted 
// var fruit={
//     name:'mango',
//     color:'yello',
//     taste:'sweet',
//     price:200,
//     status:[1,0,1,0,1],

//     func: function()
//     {
//         console.log("this is ",this.name);
//         return this.color;
//     },

// };

// fruit.status.forEach( function( value,index)
// {
//     console.log(index,value);
// });

// // ways to create the object by passing a function 
// function food(name,price)
// {
//     this.name=name;
//     this.price=price;
// }


// let guava= new food('guava',120);
// console.log(guava);

// // class way of creating the object 
// // this is called as the class declearion  and it is hoisted 

// class fruitN{
//     constructor(taste,color)
//     {
//         this.color=color;
//         this.taste=taste;
//     }
// };

// let pineapple=new fruitN("sour","yellowish");
// console.log(pineapple);

// // another way of creating the class 
// // called as the class expression 

// let NewFruit= class {
//     constructor(taste,color)
//     {
//         this.color=color;
//         this.taste=taste;
//     }
// };

// let watermelon= new NewFruit("sweet","green");
// console.log(watermelon);


// function func2(e)
// {
//     console.log("you clicked a key  ",e.key);
//     return ;
// }

// document.addEventListener('keydown',func2);


// initial function of the game loop 

// global variable
highest_score=0;

play=document.getElementById("start")
play.addEventListener("click",()=>{
    console.log("you clikced");
    document.getElementById("game_over").style.visibility="hidden"
    init();
    // setinterval variable 
    f = setInterval(gameloop, 400);
})

function init() {
    canvas = document.getElementById("mycanvas"); // canvas object 

    
    W = canvas.width = 940;  
    H = canvas.height = 470;
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
            if (headX < 0 || headY < 0 || headX >= Math.round((W - cs) / cs) || headY >= Math.round((H - cs) / cs)) {
                game_over = true;
                clearInterval(f);
                gameOver()
            }
            else {
                for (let i = 0; i < this.cells.length; i++) {
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
        
        else {
            if (snake.direction != "left")
            snake.direction = "right";
        }

    }
}


// food object generator 
function GenerateFoodObject() {
    var posi_x = Math.round(Math.random() * (W - cs) / cs);
    var posi_y = Math.round(Math.random() * (H - cs) / cs);
    
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
