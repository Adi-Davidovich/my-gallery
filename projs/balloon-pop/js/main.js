// //. In Javascript, when page loads, select the balloons 
// (querySelectorAll) and make each one of them move up a bit 
// by setting their style.bottom in an interval
// 3. Add your global data structure: gBalloons – this is our model!
// a. This should be an array of balloons objects 
// b. Each object should have ‘bottom’ and ‘speed’ properties


var gBalloons = [
    { id: 1, bottom: 0, speed: 1 },
    { id: 2, bottom: 0, speed: 0.5 },
    { id: 3, bottom: 0, speed: 2 },
    { id: 4, bottom: 0, speed: 2.5 },
    { id: 5, bottom: 0, speed: 1.5 }
];

var audio = new Audio('audio/pop.wav');


function init() {
    renderBalloons();
    setInterval(moveBalloons, 20);
}


function moveBalloons() {
    var elBalloons = document.querySelectorAll('.balloon');
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        var elBalloon = elBalloons[i];
        balloon.bottom += balloon.speed;
        elBalloon.style.bottom = balloon.bottom + 'px';

    }
}

function pop(balloonIdx) {

    var elBalloon = document.querySelectorAll('.balloon')[balloonIdx];
    console.log('elBalloon :>> ', elBalloon);
    elBalloon.classList.toggle('clicked')
    // elBalloon.style.display = 'none';
    audio.play();

}


function renderBalloons() {
    var strHTML = '';
    for (var i = 0; i < gBalloons.length; i++) {
        strHTML += '<div class="balloon balloon' + (i + 1) +
            '"  onclick="pop(' + i + ')"></div>';
    }
    console.log('strHTML :>> ', strHTML);
    var elSky = document.querySelector('.sky');
    elSky.innerHTML = strHTML;
}
