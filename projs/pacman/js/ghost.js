'use strict'

const GHOST = '֍';
const EATABLE_GHOST = '👾';

var gGhosts = [];
var gRemovedGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}


function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === SUPER_FOOD) return;
    if (nextCell === CHERRY) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return;
        else {
            gGame.gameOver = true;
            checkGameOver();
            return;
        }
    }
  
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation;

    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    if (gPacman.isSuper) {
        renderCell(ghost.location, getGhostHTML(ghost, EATABLE_GHOST));
    } else {
        renderCell(ghost.location, getGhostHTML(ghost, GHOST));
    }
}


function removeGhost(pacmanLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.i === pacmanLocation.i && currGhost.location.j === pacmanLocation.j) {
            if (currGhost.currCellContent === FOOD) {
                gGame.foodCount--;
                updateScore(1);
            }
            var removedGhost = gGhosts.splice(i, 1);
            // removedGhost[0].location.i = 3;
            // removedGhost[0].location.j = 3;
            removedGhost[0].currCellContent = EMPTY;
            gRemovedGhosts.push(removedGhost[0]);
            return;
        }
    }
}


function reviveGhosts() {
    gGhosts = gGhosts.concat(gRemovedGhosts);
    gRemovedGhosts = [];
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost, value) {
    return `<span style="color: ${ghost.color}">${value}</span>`
}


