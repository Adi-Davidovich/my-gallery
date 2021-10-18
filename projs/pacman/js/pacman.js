'use strict'
var PACMAN = setPacmanDirection('left');
var gPacman;
var gElPacmanImg;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        gGame.foodCount--;
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        updateScore(1);
        gGame.foodCount--;
        setSuper();
    }
    if (nextCell === CHERRY) {
        updateScore(10);
    }
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
        } else {
            gGame.gameOver = true
            checkGameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;
    
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    renderCell(gPacman.location, PACMAN);

    if (!gGame.foodCount) {
        gGame.gameOver = false;
        checkGameOver();
    };

}

function setSuper() {
    gPacman.isSuper = true;
    setTimeout(function () {
        gPacman.isSuper = false;
        reviveGhosts();
    }, 5000);
}

function setPacmanDirection(direction){
    gElPacmanImg = `<img src="img/pacman ${direction}.png" class = "img-pacman">`;
    return gElPacmanImg;
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            PACMAN = setPacmanDirection('up');
            break;
        case 'ArrowDown':
            nextLocation.i++;
            PACMAN = setPacmanDirection('down');
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PACMAN = setPacmanDirection('left');
            break;
        case 'ArrowRight':
            nextLocation.j++;
            PACMAN = setPacmanDirection('right');
            break;
        default:
            return null;
    }
    return nextLocation;
}