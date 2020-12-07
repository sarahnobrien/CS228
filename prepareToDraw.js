var img;
var imgTooLeft;
var imgTooRight;
var imgTooHigh;
var imgTooLow;
var imgTooFar;
var imgTooClose;
var digit1Sign
var digit2Sign
var digit3Sign
var digit4Sign
var digit5Sign
var digit6Sign
var digit7Sign
var digit8Sign
var digit9Sign
var digit0Sign

var digit0
var digit1
var digit2
var digit3
var digit4
var digit5
var digit6
var digit7
var digit8
var digit9

var plusSign

var refresh

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    img = loadImage('https://i.imgur.com/e2qDrZz.jpg');
    imgTooLeft = loadImage('https://i.imgur.com/llN4i0e.jpg');
    imgTooRight = loadImage('https://i.imgur.com/3BNXbLn.jpg');
    imgTooFar = loadImage('https://i.imgur.com/OakFdvH.jpg');
    imgTooLow = loadImage('https://i.imgur.com/7AehyEP.jpg');
    imgTooHigh = loadImage('https://i.imgur.com/TzA7aNh.jpg');
    imgTooClose = loadImage('https://i.imgur.com/4Z7LNVg.jpg');
    digit1Sign = loadImage('https://i.imgur.com/oIhDOCJ.png');
    digit2Sign = loadImage('https://i.imgur.com/HJ9jCLD.png');
    digit3Sign = loadImage('https://i.imgur.com/whmfZ8j.png');
    digit4Sign = loadImage('https://i.imgur.com/xiWoGzD.png');
    digit5Sign = loadImage('https://i.imgur.com/OB5nzxM.png');
    digit6Sign = loadImage('https://i.imgur.com/AwVrAmy.png');
    digit7Sign = loadImage('https://i.imgur.com/hn1IwNx.png');
    digit8Sign = loadImage('https://i.imgur.com/JnNvxXB.png');
    digit9Sign = loadImage('https://i.imgur.com/2tlt5tA.png');
    digit0Sign = loadImage('https://i.imgur.com/mEbqMSi.png');

    digit0 = loadImage('https://i.imgur.com/i6XOjx7.png');
    digit1 = loadImage('https://i.imgur.com/muuL1P6.png');
    digit2 = loadImage('https://i.imgur.com/i8eOz50.png');
    digit3 = loadImage('https://i.imgur.com/EGddQo2.png');
    digit4 = loadImage('https://i.imgur.com/vRpjPCE.png');
    digit5 = loadImage('https://i.imgur.com/R3xdNrQ.png');
    digit6 = loadImage('https://i.imgur.com/eqcF1Ps.png');
    digit7 = loadImage('https://i.imgur.com/L5KdJ7A.png');
    digit8 = loadImage('https://i.imgur.com/f90KIjy.png');
    digit9 = loadImage('https://i.imgur.com/DU5odFC.png');

    plusSign = loadImage('https://i.imgur.com/D7XwlDb.png')
    refresh = loadImage('https://i.imgur.com/7oKwjW8.png')
    }