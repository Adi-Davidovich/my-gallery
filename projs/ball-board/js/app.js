const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png" />';
const BALL_IMG = '<img src="img/ball.png" />';
const GLUE_IMG = '<img src="img/candy.png" />';

var gBoard;
var gGamerPos;
var gIntervalBall;
var gIntervalGlue;
var isStuck = false;

var gBallCounter;
var gCollectedBallCounter;

function initGame() {
  gGamerPos = { i: 2, j: 9 };
  gBoard = buildBoard();
  clearInterval(gIntervalBall);
  clearInterval(gIntervalGlue);
  gBallCounter = 2;
  gCollectedBallCounter = 0;
  renderBoard(gBoard);
  addBall();
  addGlue();
  clearGameOver();
}

function buildBoard() {
  // Create the Matrix
  var board = createMat(10, 12);

  // Put FLOOR everywhere and WALL at edges
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      // Put FLOOR in a regular cell
      var cell = { type: FLOOR, gameElement: null };

      // Place Walls at edges
      if (i !== board.length / 2 && j !== board[0].length / 2) {
        if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
          cell.type = WALL;
        }
      }
      // Add created cell to The game board
      board[i][j] = cell;
    }
  }

  // Place the gamer at selected position
  board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

  // Place the Balls (currently randomly chosen positions)
  board[3][8].gameElement = BALL;
  board[7][4].gameElement = BALL;

  console.log(board);
  return board;
}

// Render the board to an HTML table
function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];

      var cellClass = getClassName({ i: i, j: j });

      cellClass += currCell.type === FLOOR ? ' floor' : currCell.type === WALL ? ' wall' : '';

      strHTML += `\t<td class="cell  ${cellClass}"
			onclick="moveTo(${i},${j})" >\n`;

      // if (currCell.gameElement === GAMER) {
      // 	strHTML += GAMER_IMG;
      // } else if (currCell.gameElement === BALL) {
      // 	strHTML += BALL_IMG;
      // }
      var element = currCell.gameElement;
      switch (element) {
        case GAMER:
          strHTML += GAMER_IMG;
          break;
        case BALL:
          strHTML += BALL_IMG;
      }

      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }

  console.log('strHTML is:');
  console.log(strHTML);
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
  var height = gBoard.length - 1;
  var width = gBoard[0].length - 1;
  if (i < 0) i = height;
  else if (i >= gBoard.length) i = 0;
  else if (j < 0) j = width;
  else if (j >= gBoard[0].length) j = 0;

  var targetCell = gBoard[i][j];

  if (targetCell.type === WALL || isStuck) return;

  // Calculate distance to make sure we are moving to a neighbor cell
  var iAbsDiff = Math.abs(i - gGamerPos.i);
  var jAbsDiff = Math.abs(j - gGamerPos.j);

  // If the clicked Cell is one of the four allowed
  if (
    (iAbsDiff === 1 && jAbsDiff === 0) ||
    (jAbsDiff === 1 && iAbsDiff === 0) ||
    (iAbsDiff === height && jAbsDiff === 0) ||
    (jAbsDiff === width && iAbsDiff === 0)
  ) {
    if (targetCell.gameElement === BALL) {
      gCollectedBallCounter++;
      document.querySelector('.collect').innerHTML = gCollectedBallCounter;
      var sound = new Audio('sound/collect.wav');
      sound.play();
    } else if (targetCell.gameElement === GLUE) {
      console.log('yuck!');
      isStuck = true;
      setTimeout(function () {
        isStuck = false;
      }, 3000);
    }

    // MOVING from current position
    // Model:
    gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
    // Dom:
    renderCell(gGamerPos, '');

    // MOVING to selected position
    // Model:
    gGamerPos.i = i;
    gGamerPos.j = j;
    gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
    // DOM:
    renderCell(gGamerPos, GAMER_IMG);
  } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
  if (gBallCounter === gCollectedBallCounter) gameOver();
}

function addBall() {
  gIntervalBall = setInterval(function () {
    var i = getRandomInt(0, gBoard.length - 1);
    var j = getRandomInt(0, gBoard[0].length - 1);
    if (gBoard[i][j].gameElement === null && gBoard[i][j].type !== WALL) {
      gBoard[i][j].gameElement = BALL;
      renderCell({ i: i, j: j }, BALL_IMG);
      gBallCounter++;
    }
  }, 3000);
}

function addGlue() {
  gIntervalGlue = setInterval(function () {
    var i = getRandomInt(0, gBoard.length - 1);
    var j = getRandomInt(0, gBoard[0].length - 1);
    if (gBoard[i][j].gameElement === null && gBoard[i][j].type !== WALL) {
      gBoard[i][j].gameElement = GLUE;
      renderCell({ i: i, j: j }, GLUE_IMG);
    }
    setTimeout(removeGlue, 3000, i, j);
  }, 5000);
}

function removeGlue(i, j) {
  if (gBoard[i][j].gameElement !== GAMER) {
    gBoard[i][j].gameElement = null;
    renderCell({ i: i, j: j }, '');
  }
}

function gameOver() {
  document.querySelector('.end').classList.remove('d-none');
  clearInterval(gIntervalBall);
  clearInterval(gIntervalGlue);
}

function clearGameOver() {
  document.querySelector('.end').classList.add('d-none');
  document.querySelector('.collect').innerHTML = gCollectedBallCounter;
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
  var cellSelector = '.' + getClassName(location);
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
  var i = gGamerPos.i;
  var j = gGamerPos.j;

  switch (event.key) {
    case 'ArrowLeft':
      moveTo(i, j - 1);
      break;
    case 'ArrowRight':
      moveTo(i, j + 1);
      break;
    case 'ArrowUp':
      moveTo(i - 1, j);
      break;
    case 'ArrowDown':
      moveTo(i + 1, j);
      break;
  }
}

// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive
}
