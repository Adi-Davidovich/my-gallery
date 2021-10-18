'use strict'
const WALL = ''
const FOOD = '●'
const EMPTY = ' ';
const SUPER_FOOD = '🏐';
const CHERRY = '🍒'


var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    foodCount: 60,
    gameOver: null
}
// var gFoodCount;
var gEmptyCells = [];
var gIntervalCherry;
var gElBox = document.querySelector('.box');
var gElBoxText = document.querySelector('.box span');

function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.score = 0;
    gGame.isOn = true;
    gGame.foodCount = 60;
    gGame.gameOver = null;
    document.querySelector('h2 span').innerText = 0;
    gElBox.classList.add('hide');
    gIntervalCherry = setInterval(addCherry, 15000);
    // countFood(gBoard)
}


function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 1 && j === 1) board[i][j] = SUPER_FOOD
            else if (i === SIZE - 2 && j === 1) board[i][j] = SUPER_FOOD;
            else if (i === 1 && j === board[0].length - 2) board[i][j] = SUPER_FOOD;
            else if (i === SIZE - 2 && j === board[0].length - 2) board[i][j] = SUPER_FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}


function addCherry() {
    gEmptyCells = checkEmptyCells(gBoard);
    var location = drawNum(gEmptyCells);
    gBoard[location.i][location.j] = CHERRY;
    renderCell(location, CHERRY);
}


function checkEmptyCells(board) {
    gEmptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var emptycell = { i: i, j: j }
            if (board[i][j] === EMPTY) {
                gEmptyCells.push(emptycell);
            }
        }
    }
    return gEmptyCells;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}


function checkGameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    gElBox.classList.remove('hide');
    if (gGame.gameOver) {
        gElBoxText.innerText = 'GAME OVER';
    } else {
        gElBoxText.innerText = 'YOU WON!!!';
    }
}


// function countFood(board) {
//     gFoodCount = 0;
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[i].length; j++) {
//             if (board[i][j] === FOOD ||
//                 board[i][j] === GHOST ||
//                 board[i][j] === SUPER_FOOD) gFoodCount++;
//         }
//     }
//     return gFoodCount;
// }



