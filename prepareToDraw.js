var img;
var imgTooLeft;
var imgTooRight;
var imgTooHigh;
var imgTooLow;
var imgTooFar;
var imgTooClose;
var digit1Sign
var digit2Sign
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    img = loadImage('https://i.imgur.com/e2qDrZz.jpg');
    imgTooLeft = loadImage('https://i.imgur.com/llN4i0e.jpg');
    imgTooRight = loadImage('https://i.imgur.com/3BNXbLn.jpg');
    imgTooFar = loadImage('https://i.imgur.com/OakFdvH.jpg');
    imgTooLow = loadImage('https://i.imgur.com/7AehyEP.jpg');
    imgTooHigh = loadImage('https://i.imgur.com/TzA7aNh.jpg');
    imgTooClose = loadImage('https://i.imgur.com/4Z7LNVg.jpg');
    digit1Sign = loadImage('https://i.imgur.com/uXBxyk0.png');
    digit2Sign = loadImage('https://i.imgur.com/8GK37km.png')
    }