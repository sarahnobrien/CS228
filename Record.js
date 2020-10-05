var controllerOptions = {};
nj.config.printThreshold = 1000;

var i = 0;
var x = 0;
var y = 0;
var z = 0;


var previousNumHands = 0;
var currentNumHands = 0;

var numSamples = 2;
var currentSample = 0;

var framesOfData = nj.zeros([5,4,6,numSamples]);

Leap.loop(controllerOptions, function(frame)
    {


        currentNumHands = frame.hands.length;
        //console.log(previousNumHands);
        //console.log(currentNumHands);
        clear();
        HandleFrame(frame);

        RecordData();

        previousNumHands = currentNumHands;

    }
);

function HandleFrame (frame){
    var InteractionBox = frame.interactionBox;
    if (frame.hands.length >= 1 ){
        var hand = frame.hands[0];
        var fingers = hand.fingers;
        HandleHand(hand, frame, InteractionBox)
    }

}

function HandleHand(hand, frame, InteractionBox){
    for (var j = 3; j >= 0; j--){

        for (var i = 0; i < hand.fingers.length; i++){
            finger = hand.fingers[i];
            HandleBone(finger.bones[j], frame, i, j, InteractionBox)
        }

    }
}

function HandleFinger(finger, frame){
    for (var i = 0; i < finger.bones.length; i++){
        bone = finger.bones[i];
        HandleBone(bone,frame)
    }


}

function HandleBone(bone,frame,fingerIndex, boneIndex, InteractionBox){

   var normalizedPrevJoint = frame.interactionBox.normalizePoint(bone.prevJoint, true);
   var normalizedNextJoint = frame.interactionBox.normalizePoint(bone.nextJoint, true);

    framesOfData.set(fingerIndex, boneIndex, 0, currentSample, normalizedPrevJoint[0]);
    framesOfData.set(fingerIndex, boneIndex, 1, currentSample, normalizedPrevJoint[1]);
    framesOfData.set(fingerIndex, boneIndex, 2, currentSample, 1);
    framesOfData.set(fingerIndex, boneIndex, 3, currentSample, normalizedNextJoint[0]);
    framesOfData.set(fingerIndex, boneIndex, 4, currentSample, normalizedNextJoint[1]);
    framesOfData.set(fingerIndex, boneIndex, 5, currentSample, 1);

   var canvasPrevX = window.innerWidth * normalizedPrevJoint[0];
   var canvasPrevY = window.innerHeight * (1 - normalizedPrevJoint[1]);

   var canvasNextX = window.innerWidth * normalizedNextJoint[0];
   var canvasNextY = window.innerHeight * (1 - normalizedNextJoint[1]);

    xb = canvasPrevX;
    zb = canvasPrevY;
    //yb = bone.prevJoint[2];

    xt = canvasNextX;
    zt = canvasNextY;
    //yt = bone.nextJoint[2];

   //console.log(OneFrameOfData[1].toString())

   // [xb,zb] = TransformCoordinates(xb,zb); // base
    //[xt,zt] = TransformCoordinates(xt,zt); // tip

   //zb = -zb + (window.innerHeight);
   // zt = -zt + (window.innerHeight);



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

function RecordData(){


    if (currentNumHands == 2) {
         currentSample++;
     }
    if (currentSample == numSamples){
        currentSample = 0;
    }

    if (currentNumHands == 1 && previousNumHands == 2){
        //background(51);
        console.log(framesOfData.toString());

    }
}