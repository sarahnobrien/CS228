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
        if ( x < rawXMin){
            rawXMin = x;
            //console.log(rawXMin);
        }

        if (x > rawXMax){
            rawXMax = x;
            //console.log(rawXMax);
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

    for (var i = 0; i < finger.bones.length; i++){
        bone = finger.bones[i];
        HandleBone(bone)
    }


}

function HandleBone(bone){
    x = bone.nextJoint[0];
    z = bone.nextJoint[1];
    y = bone.nextJoint[2];

    z = -z + (window.innerHeight);
    oldXRange = (rawXMax - rawXMin);
    oldYRange = (rawYMax - rawYMin);
    newXValue = (((x - rawXMin) * window.innerWidth) / oldXRange) + 0;
    newYValue = (((z - rawYMin) * window.innerHeight) / oldYRange) + 0;
    circle(newXValue,newYValue,50);
    console.log(bone)
}