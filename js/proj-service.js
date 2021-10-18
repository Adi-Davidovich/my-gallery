'use strict'

var gProjs = createProjs();

function createProjs() {
    var projs = [
        {
            id: "ball-board",
            name: "Ball Board",
            title: "Collect those balls",
            desc: "lorem ipsum lorem ipsum lorem ipsum",
            url: "projs/ball-board",
            publishedAt: 1448693940000,
            labels: ["Matrixes", "keyboard events"]
        },
        {
            id: "balloon-pop",
            name: "Balloon Pop",
            title: "Can you pop all the balloons?",
            desc: "lorem ipsum lorem ipsum lorem ipsum",
            url: "projs/balloon-pop",
            publishedAt: 1448693940000,
            labels: ["Matrixes", "keyboard events"]
        },
        {
            id: "guess-me",
            name: "Guess Me",
            title: "The guessing game",
            desc: "lorem ipsum lorem ipsum lorem ipsum",
            url: "projs/guessme",
            publishedAt: 1448693940000,
            labels: ["Matrixes", "keyboard events"]
        },
        {
            id: "mineswipper",
            name: "Mineswipper",
            title: "The mineswipper game",
            desc: "lorem ipsum lorem ipsum lorem ipsum",
            url: "projs/mineswipper",
            publishedAt: 1448693940000,
            labels: ["Matrixes", "keyboard events"]
        },
        {
            id: "pacman",
            name: "Pacman",
            title: "The pacman game",
            desc: "lorem ipsum lorem ipsum lorem ipsum",
            url: "projs/pacman",
            publishedAt: 1448693940000,
            labels: ["Matrixes", "keyboard events"]
        },
        {
            id: "touch-nums",
            name: "Touch Numbers",
            title: "Choose the correct number",
            desc: "lorem ipsum lorem ipsum lorem ipsum",
            url: "projs/touch-nums",
            publishedAt: 1448693940000,
            labels: ["Matrixes", "keyboard events"]
        }
    ]
    return projs;
}