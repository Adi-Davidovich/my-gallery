
// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function renderElement(selector, value){
  var elElement = document.querySelector(selector);
  elElement.innerHTML = value;
}

function addClass(selector, className){
  document.querySelector(selector).classList.add(className);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawNum(array) {
  var idx = getRandomInt(0, array.length)
  var num = array[idx]
  array.splice(idx, 1)
  return num
}