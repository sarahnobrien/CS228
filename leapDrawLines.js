var controllerOptions = {};

var i = 0;
var x = 0;
var y = 0;
var z = 0;
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
/**

        x = finger.tipPosition[0];
        z = finger.tipPosition[1];
        y = finger.tipPosition[2];
**/
    for (var i = 0; i < finger.bones.length; i++){
        bone = finger.bones[i];
        HandleBone(bone)
    }


}

function HandleBone(bone){
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

    if (bone.type == 0) {
        strokeWeight(10);
        stroke('rgb(220,220,220)');
        line(xt,zt,xb,zb);
    }

    if (bone.type == 1){
        strokeWeight(7);
        stroke('rgb(192,192,192)');
        line(xt,zt,xb,zb);
    }
    if (bone.type == 2){
        strokeWeight(4);
        stroke('rgb(128,128,128)');
        line(xt,zt,xb,zb);
    }

    else if (bone.type == 4){
        strokeWeight(2);
        stroke('rgb(105,105,105)');
        line(xt,zt,xb,zb);
    }



    //console.log(bone);
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