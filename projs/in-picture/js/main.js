'use strict'

var gQuests = createQuests()
var gImages = ["img/1.jpg.png", "img/2.jpg.jpg", "img/3.jpg.jpg"]
var gCurrQuestIdx = 0


function init() {
    renderQuest(gCurrQuestIdx);
}

function createQuests() {
    var q1 = { id: 1, opts: ['Australia', 'Canada', 'Singapore'], correctOptIndex: 1 };
    var q2 = { id: 2, opts: ['Croatia', 'Dominic Republic', 'Liberia'], correctOptIndex: 0 };
    var q3 = { id: 3, opts: ['Gambia', 'Jamaica', 'South Africa'], correctOptIndex: 2 };
    gQuests = [q1, q2, q3];
    return gQuests;
}

function renderQuest(idx) {
    var strImgHTML = `<img src="${gImages[idx]}" class="img" />`;
    var strOptHTML = '';
    var currOpts = gQuests[idx].opts;
    for (var i = 0; i < currOpts.length; i++) {
        var currOpt = currOpts[i];
        strOptHTML += `<div class="answer" onclick="checkAnswer(this)">${currOpt}</div> `;
    }
    var elBox = document.querySelector(".box");
    elBox.innerHTML = strImgHTML + strOptHTML;
}

function checkAnswer(elOpt) {
    var currOpts = gQuests[gCurrQuestIdx].opts;
    var currOptIdx = gQuests[gCurrQuestIdx].correctOptIndex;
    console.log('currOpts[currOptIdx] :>> ', elOpt);
    if (elOpt.innerText === currOpts[currOptIdx]) {
        elOpt.classList.add("correct");
        gCurrQuestIdx++
        setTimeout(function () {
            if (gCurrQuestIdx < 3) renderQuest(gCurrQuestIdx)
            else alert('Good job!')
        }, 500)
    }
}

// function nextQuest() {
