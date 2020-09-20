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

var OneFrameOfData = nj.zeros([5,4,6]);

Leap.loop(controllerOptions, function(frame)
    {


        currentNumHands = frame.hands.length;
        //console.log(previousNumHands);
        //console.log(currentNumHands);
        clear();
        HandleFrame(frame);
        if (currentNumHands == 1 && previousNumHands == 2){
            RecordData();
        }
        previousNumHands = currentNumHands;

    }
);

function HandleFrame (frame){
    if (frame.hands.length >= 1 ){
        var hand = frame.hands[0];
        var fingers = hand.fingers;
        HandleHand(hand, frame)
    }

}

function HandleHand(hand, frame){
    for (var j = 3; j >= 0; j--){

        for (var i = 0; i < hand.fingers.length; i++){
            finger = hand.fingers[i];
            HandleBone(finger.bones[j], frame, i, j)
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

function HandleBone(bone,frame,fingerIndex, boneIndex){

    xb = bone.prevJoint[0];
    zb = bone.prevJoint[1];
    yb = bone.prevJoint[2];

    xt = bone.nextJoint[0];
    zt = bone.nextJoint[1];
    yt = bone.nextJoint[2];

    [xb,zb] = TransformCoordinates(xb,zb); // base
    [xt,zt] = TransformCoordinates(xt,zt); // tip

    zb = -zb + (window.innerHeight);
    zt = -zt + (window.innerHeight);

    //sumFinger = xb + zb + yb + xt + zt + yt;
    OneFrameOfData.set(fingerIndex, boneIndex, 0, xb);
    OneFrameOfData.set(fingerIndex, boneIndex, 1, zb);
    OneFrameOfData.set(fingerIndex, boneIndex, 2, yb);
    OneFrameOfData.set(fingerIndex, boneIndex, 3, xt);
    OneFrameOfData.set(fingerIndex, boneIndex, 4, zt);
    OneFrameOfData.set(fingerIndex, boneIndex, 5, yt);


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
    console.log(OneFrameOfData.toString())
}