var rowLen = 6;
var colLen = 6;
var winLen = 4;

var myDiv = document.getElementById("htmlT");
var winLenId = document.getElementById("winLen");
var colLenId = document.getElementById("colLen");
var rowLenId = document.getElementById("rowLen");

// var rowLen = rowLenId.value + 1;
// var colLen = colLenId.value + 1;
// var winLen = winLenId.value + 1;


//var c4Table = new Array(rowLen).fill(new Array(colLen).fill(null));
var c4Table = (new Array(rowLen)).fill().map(function(){ return new Array(colLen).fill("0");})
var currPlayer = 0;
var newgame = $("#newGame"); // jQuery code

var htmlTable = document.createElement("table");
    
// function convertArrayToMatrix (arr, len) {
//     var mat = new Array(arr.length/len).fill(Array(len).fill(null));
//     for (let i = 0; i < arr.length/len; i++) {
//         for (let j = 0; j < len; j++) {
//             //console.log(j+i*len);
//             mat[i][j] = arr[j+i*len];
//         } 
//     }
//     return mat;
// }

function colorLine (a, b) {
    // color row
    if (a[0] === b[0] && a[1] != -1) {
        for (i = a[1]; i < b[1]; i++) {
            htmlTable.rows[a[0]].cells[i].textContent = "X";
            }
    }
    // color column
    if (a[1] === b[1] && a[0] != -1) {
        for (i = a[0]; i < b[0]; i++) {
            htmlTable.rows[i].cells[a[1]].textContent = "X";
        }
    }
}

function createTable (rowLen, colLen) {
    var tab = document.createElement("table");
    for (let i = 0; i < rowLen; i++) {
        var row = document.createElement("tr");
        for (let j = 0; j < colLen; j++) {
            //console.log(i+" "+j)
            //c4Table[i][j] = document.createElement("td");
            row.appendChild(document.createElement("td"));
        }
        //htmlTable.set
        tab.appendChild(row);
    }
    return tab;
}

function makeRepetativeString (str, len) {
    var newStr = "";
    for (let i = 0; i < len; i++)
        newStr = newStr + str;
    return newStr;
}

function checkWinByColors (str) {
    rs = makeRepetativeString("r", winLen);
    bs = makeRepetativeString("b", winLen);
    if (str.includes(rs,0)) {
        console.log("GAME OVER! RED WON!");
        disconnect();
        return str.indexOf(rs,0);
    }
    if (str.includes(bs,0)) {
        console.log("GAME OVER! BLUE WON!");
        disconnect();
        return str.indexOf(bs,0);
    }
    return -1;
}

function checkWin () {
    // check rows
    for (let i = 0; i < rowLen; i++) {
        var str = "";
        for (let j = 0; j < colLen; j++) {
            str = str + c4Table[i][j];
        }
        ind = checkWinByColors(str);
        colorLine([i,ind], [i, ind + winLen]);
    }
    // check columns
    for (let j = 0; j < colLen; j++) {
        var str = "";
        for (let i = 0; i < rowLen; i++) {
            str = str + c4Table[i][j];
        }
        ind = checkWinByColors(str);
        colorLine([ind, j], [ind + winLen, j]);
    }

} 

function main () {
    col = this.cellIndex;
    if (c4Table[0][col] != "0") {
        alert("Full column");
        return;
    }
    color = "black";
    if (currPlayer == 0) {
        color = "red";
        currPlayer++;
    }
    else if(currPlayer == 1) {
        color = "blue";
        currPlayer = 0;
    }
    for (let i = 0; i < rowLen; i++) {
        if ((i === rowLen-1) && c4Table[rowLen-1][col] == "0") {
            c4Table[rowLen-1][col] = color[0];
            htmlTable.rows[rowLen-1].cells[col].style.background = color;
            break;
        }
        if (c4Table[i][col] != "0") {
            c4Table[i-1][col] = color[0];
            htmlTable.rows[i-1].cells[col].style.background = color;
            break;
        }
    }
    checkWin();
    //console.log(c4Table);
}

function start() {
    currPlayer = 0;
    // rowLen = parseInt(rowLenId.value);
    // colLen = parseInt(colLenId.value);
    // winLen = parseInt(winLenId.value);

    // console.log(winLen + " " + rowLen + " " + colLen)

    c4Table = (new Array(rowLen)).fill().map(function(){ return new Array(colLen).fill("0");});
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            htmlTable.rows[i].cells[j].addEventListener("click", main);
        }
    }
}

function disconnect() {
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            htmlTable.rows[i].cells[j].removeEventListener("click", main);
        }
    }
}

htmlTable = createTable(rowLen, colLen);
myDiv.appendChild(htmlTable);

htmlTable.rows[3].style.border = "1px solid black";

//start();

newgame.on("click", function() {
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            htmlTable.rows[i].cells[j].style.background = 'rgb(187, 175, 160)';
            htmlTable.rows[i].cells[j].textContent = "";
        }
    }
    start();
});

//htmlTable.style.border = "2px solid black";



// var tests = document.createElement("h1");
// tests.appendChild(document.createTextNode("Some text"));
// var myDiv = document.getElementById("htmlT");
// myDiv.appendChild(tests);