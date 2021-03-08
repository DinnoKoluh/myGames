// var id = null;
// var block = document.getElementById("animate1");
// var pos = 2;

// function myMove() {
  
//   var pos = 0;
//   //clearInterval(id);
//   id = setInterval(frame, 500);
// }

// function frame() {
//     if (pos == 20){
//         clearInterval(id);
//         pos = 2;
//     }
//     else {
//     console.log("Printed")
//     pos++;
//     block.style.top = pos + 'cm';
//     block.style.left = pos + 'cm';
//     }
// }

var block = document.getElementById("animate1");
var btn1 = document.getElementById("circle");
var btn2 = document.getElementById("parabola");
var stopBtn = document.getElementById("stop");
var ball1 = document.getElementById("ball1");
var ball2 = document.getElementById("ball2");

document.addEventListener('keydown', move);


var id1 = null;
var id2 = null;

btn1.addEventListener("click", function(){
    id1 = setInterval(circle, 50);
});

btn2.addEventListener("click", function(){
    id2 = setInterval(parabola, 20)
});

stopBtn.addEventListener("click", function(){
    clearInterval(id1);
    clearInterval(id2);
})

setInterval(function(){
    fallDown(ball1);
}, 30*Math.random());

setInterval(function(){
    fallDown(ball2);
    console.log(collision($("#animate1"), $("#ball1")));
}, 30*Math.random());
//btn1.removeEventListener("click", myMove);

w = 0;
R = 5;
shift = R;

function positionBlock (x, y){
    block.style.left = x + "cm";
    block.style.top = y + "cm";
}


function circle(){
    w = w + 0.1;
    x = R*Math.cos(w) + shift;
    y = R*Math.sin(w) + shift;

    positionBlock(x,y);

    if (w > 2*Math.PI)
        w = 0;
}

function parabola(){
    w = w + 0.1;
    x = w*5;
    y = 0.2*w*w + w;

    positionBlock(x,y);

    if (w > 15)
        w = 0
}


function move(e) {
    y = parseInt(window.getComputedStyle(block).getPropertyValue('top'))*0.0264583333;
    x = parseInt(window.getComputedStyle(block).getPropertyValue('left'))*0.0264583333;
    eps = 0.2;
    if (e.key == "ArrowDown") {
        y = y + eps;
        block.style.top = y + "cm";
    }
    else if (e.key == "ArrowUp") {
        y = y - eps;
        block.style.top = y + "cm";
    }
    else if (e.key == "ArrowLeft") {
        x = x - eps;
        block.style.left = x + "cm";
    }
    else if (e.key == "ArrowRight") {
        x = x + eps;
        block.style.left = x + "cm";
    }
    //console.log(e);
    //console.log(Math.random())
}

function fallDown(ball) {
    eps = 0.1;
    y = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))*0.0264583333;
    //x = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))*0.0264583333;
    y = y + eps;
    ball.style.top = y + "cm";

    if (y > 15) {
        newX = 20*Math.random();
        ball.style.left = newX + "cm";
        ball.style.top = "0cm";
    }
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}