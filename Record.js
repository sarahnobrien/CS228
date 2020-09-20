var controllerOptions = {};

var i = 0;
var x = 0;
var y = 0;
var z = 0;
var rawXMin = 1000;
var rawXMax = 1;
var rawYMin = 1000;
var rawYMax = 1;

var previousNumHands = 0;
var currentNumHands = 0;

var OneFrameOfData = nj.zeros([5,4]);

Leap.loop(controllerOptions, function(frame)
    {
        console.log(OneFrameOfData.toString())

        currentNumHands = frame.hands.length;
        console.log(previousNumHands);
        console.log(currentNumHands);
        clear();
        HandleFrame(frame);
        if (previousNumHands == 2 && currentNumHands == 1){
            RecordData();
        }
        previousNumHands = currentNumHands;

    }
);

function HandleFrame (frame){
    var hand;
    if (frame.hands.length == 1 || frame.hands.length == 2){
        var hand = frame.hands[0];
        var fingers = hand.fingers;
        HandleHand(hand, frame)
    }

}

function HandleHand(hand, frame){
    for (var j = 3; j >= 0; j--){

        for (var i = 0; i < hand.fingers.length; i++){
            finger = hand.fingers[i];
            HandleBone(finger.bones[j], frame, i)
        }

    }
}

function HandleFinger(finger, frame){
/**

        x = finger.tipPosition[0];
        z = finger.tipPosition[1];
        y = finger.tipPosition[2];
**/
    for (var i = 0; i < finger.bones.length; i++){
        bone = finger.bones[i];
        HandleBone(bone,frame)
    }


}

function HandleBone(bone,frame,fingerIndex){

    xb = bone.prevJoint[0];
    zb = bone.prevJoint[1];
    yb = bone.prevJoint[2];

    xt = bone.nextJoint[0];
    zt = bone.nextJoint[1];
    yt = bone.nextJoint[2];

    sumFinger = xb + zb + yb + xt + zt + yt;
    OneFrameOfData.set(fingerIndex, sumFinger);


    [xb,zb] = TransformCoordinates(xb,zb); // base
    [xt,zt] = TransformCoordinates(xt,zt); // tip

    zb = -zb + (window.innerHeight);
    zt = -zt + (window.innerHeight);



    if (frame.hands.length == 1) {

        if (bone.type == 0) {
            strokeWeight(11);
            stroke('rgb(0,220,0)');
            line(xt, zt, xb, zb);
        }

        if (bone.type == 1) {
            strokeWeight(8);
            stroke('rgb(0,140,0)');
            line(xt, zt, xb, zb);
        }
        if (bone.type == 2) {
            strokeWeight(6);
            stroke('rgb(0,100,0)');
            line(xt, zt, xb, zb);
        } else if (bone.type == 3) {
            strokeWeight(4);
            stroke('rgb(0,50,0)');
            line(xt, zt, xb, zb);
        }
    }
    else{
        if (bone.type == 0) {
            strokeWeight(11);
            stroke('rgb(220,0,0)');
            line(xt, zt, xb, zb);
        }

        if (bone.type == 1) {
            strokeWeight(8);
            stroke('rgb(140,0,0)');
            line(xt, zt, xb, zb);
        }
        if (bone.type == 2) {
            strokeWeight(6);
            stroke('rgb(100,0,0)');
            line(xt, zt, xb, zb);
        } else if (bone.type == 3) {
            strokeWeight(4);
            stroke('rgb(50,0,0)');
            line(xt, zt, xb, zb);
        }
    }


}

function TransformCoordinates(x,z){
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

    oldXRange = (rawXMax - rawXMin);
    oldYRange = (rawYMax - rawYMin);

    newXValue = (((x - rawXMin) * window.innerWidth) / oldXRange) + 0;
    newYValue = (((z - rawYMin) * window.innerHeight) / oldYRange) + 0;
    return[newXValue,newYValue]
}

function RecordData(){
    background(51);
}