
var ttt = document.querySelectorAll("td");
//var restart = document.getElementById("restart")
var restart = $("#restart"); // jQuery code

var changeMe = new Array(9).fill(0);
var newHand = 0;
var x = document.createElement("img");
var o = document.createElement("img");

x.src = "https://images.squarespace-cdn.com/content/v1/55ece940e4b048d1ed401c11/1450136257542-4DATU4KRB70MDENGJXJX/ke17ZwdGBToddI8pDm48kAf-OpKpNsh_OjjU8JOdDKBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwkCFOLgzJj4yIx-vIIEbyWWRd0QUGL6lY_wBICnBy59Ye9GKQq6_hlXZJyaybXpCc/X%3A++The+Unknown?format=500w";
o.src = "https://upload.wikimedia.org/wikipedia/commons/7/73/Deseret_small_long_O.svg"

function start() {
    for (let i = 0; i < 9; i++) {
        ttt[i].addEventListener("click", main);
    }
}

function main () {
    if (newHand % 2 == 0) {
        this.textContent = "X";
        //ttt[i].appendChild(x);
    }
    else
        this.textContent = "O"
        //ttt[i].appendChild(o);
    newHand++;

    if (colorCells(checkRows()) || colorCells(checkColumns()) || colorCells(checkDiagonals()))
        for (let i = 0; i < 9; i++) {
            ttt[i].removeEventListener("click", main);
        }
}

function checkRows () {
    var pat = "";
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            pat = pat + ttt[i*3+j].textContent;
        }
        if (pat==="XXX" || pat==="OOO") {
            return [i*3, i*3+1, i*3+2];
        }
        pat = "";
    }
    return 0;
}

function checkColumns() {
    var pat = "";
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            pat = pat + ttt[i+j*3].textContent;
        }
        if (pat==="XXX" || pat==="OOO") {
            return [i, i+3, i+6];
        }
        pat = "";
    }
    return 0;
}

function checkDiagonals() {
    diag1 = [0,4,8];
    diag2 = [2,4,6];
    txt1 = ttt[0].textContent + ttt[4].textContent + ttt[8].textContent;
    txt2 = ttt[2].textContent + ttt[4].textContent + ttt[6].textContent;
    if (txt1 === "XXX" || txt1 === "OOO")
        return diag1;
    else if (txt2 === "XXX" || txt2 == "OOO")
        return diag2;
    
    return 0;
}

function colorCells (cells) {
    if (cells != 0) {
        ttt[cells[0]].style.background = 'red';
        ttt[cells[1]].style.background = 'red';
        ttt[cells[2]].style.background = 'red';
        return 1;
    }
    return 0;
}

start();

restart.on("click", function(event){
    //console.log(event.which);
    $(this).text("New Game!"); // jQuery handling
    //$(this).on("keypress")
    for (let i = 0; i < ttt.length; i++) {
        ttt[i].textContent = " ";
        ttt[i].style.background = 'antiquewhite';
    }
    start();
})
