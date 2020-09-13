var controllerOptions = {};

var i = 0;
var x = {};
var y = {};
var z = {};
var rawXMin = 1000;
var rawXMax = 1;
var rawYMin = 1000;
var rawYMax = 1;


Leap.loop(controllerOptions, function(frame)
    {
        clear();
        HandleFrame(frame);

        z = -z + (window.innerHeight);
        oldXRange = (rawXMax - rawXMin);
        oldYRange = (rawYMax - rawYMin);
        newXValue = (((x - rawXMin) * window.innerWidth) / oldXRange) + 0;
        newYValue = (((z - rawYMin) * window.innerHeight) / oldYRange) + 0;

        //circle(x + ((window.innerWidth) / 2), (z * (-1)) + (( window.innerHeight)  /2) , 50);
        circle(newXValue,newYValue,50);
        //console.log(frame);
        //var z = (Math.floor(Math.random()* 7)) -1; //1 was too small to see a change - used 7
        // var j = (Math.floor(Math.random()* 7)) -1; //1 was too small to see a change - used 7
        //circle(x + z, y + j, 100);
        //console.log(i);


    }
);

function HandleFrame (frame){
    var hand;
    if (frame.hands.length == 1 ){
        var hand = frame.hands[0];
        var fingers = hand.fingers;
        HandleHand(hand)
    }

}

function HandleHand(hand){
    for (var i = 0; i < hand.fingers.length; i++){
        finger = hand.fingers[i];
        HandleFinger(finger)
    }
}

function HandleFinger(finger){
    if (finger.type == 1){
        if ( x < rawXMin){
            rawXMin = x;
            console.log(rawXMin);
        }

        if (x > rawXMax){
            rawXMax = x;
            console.log(rawXMax);
        }

        if (z < rawYMin){
            rawYMin = z;
        }

        if (z > rawYMax){
            rawYMax = z;
        }

        x = finger.tipPosition[0];
        z = finger.tipPosition[1];
        y = finger.tipPosition[2];
        console.log(finger.tipPosition);
    }
}