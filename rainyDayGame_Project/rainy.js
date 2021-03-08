var block = document.getElementById("me");
var startBtn = document.getElementById("start");
var ball1 = document.getElementById("ball1");
var ball2 = document.getElementById("ball2");
var time = document.getElementById("time");

i = 0;

// setXY(block, width*Math.random(), 10);
// setXY(ball1, width*Math.random(), 0);
// setXY(ball2, width*Math.random(), 0);

width = 20;
console.log(collision($("#me"), $("#ball1")));

startBtn.addEventListener("click", initGame);

function initGame() {
    setXY(block, width*Math.random(), 10);
    setXY(ball1, width*Math.random(), 0);
    setXY(ball2, width*Math.random(), 0);

    id1 = setInterval(function(){
        fallDown(ball1);
    }, 30*Math.random());

    id2 = setInterval(function(){
        fallDown(ball2);
    }, 30*Math.random());

    id3 = setInterval(function(){
        time.textContent = i;
        i++;
    }, 1000) 

    id3 = setInterval(function(){
        if (collision($("#me"), $("#ball1")) || collision($("#me"), $("#ball2"))) {
            clearInterval(id1);
            clearInterval(id2);
            clearInterval(id3);
            clearInterval(id4);
            document.removeEventListener("keydown", move);
            i = 0;
        }
    }, 5);


    document.addEventListener('keydown', move);
}

function move(e) {
    y = parseInt(window.getComputedStyle(block).getPropertyValue('top'))*0.0264583333;
    x = parseInt(window.getComputedStyle(block).getPropertyValue('left'))*0.0264583333;
    eps = 1.0;
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

function setX(element, x) {
    element.style.left = x + "cm";
}

function setY(element, y) {
    element.style.top = y + "cm";
}

function setXY(element, x, y) {
    setX(element, x);
    setY(element, y);
}