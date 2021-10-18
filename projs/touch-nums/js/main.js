'use strict'

var gNums = []
var gCounter = 1
var gInterval


function createBoard(x) {
    gCounter = 1;
    clearInterval(gInterval);
    document.querySelector(".timer").innerText= "timer: 0.000";
    createNums(x);
    shuffle(gNums);
    renderBoard(x);
}

function cellClicked(clickedNum) {
    var num = +clickedNum.innerText
    if (num === gCounter) {
        clickedNum.classList.add('correct');
        gCounter++;
        if (num === document.querySelectorAll(".cell").length){
            clearInterval(gInterval);
        }
    }
    if (num === 1) timer();
}

function timer() {
    var time = 0;
    var elTimer = document.querySelector(".timer");
    gInterval = setInterval(function () {
        time += 0.001;
        var strHtml = `timer: ${time.toFixed(3)}`;
        elTimer.innerHTML = strHtml;
    }, 10);
    
}

function createNums(x) {
    gNums = []
    for (var i = 1; i < x + 1; i++) {
        gNums.push(i);
    }
    return gNums;
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function renderBoard(x) {
    var strHtml = "";
    for (var i = 0; i < Math.sqrt(x); i++) {
        strHtml += '<tr>';
        for (var j = 0; j < Math.sqrt(x); j++) {
            strHtml += `<td class="cell"
                onclick="cellClicked(this)"
                >${drawNum()}</td>`;
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector(".board");
    elBoard.innerHTML = strHtml;
}


function drawNum() {
    return gNums.pop();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}
