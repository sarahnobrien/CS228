const knnClassifier = ml5.KNNClassifier();
var controllerOptions = {}


var numSamples = train2.shape[0];
var predictedClassLabels = nj.zeros([numSamples]);
var trainingCompleted  = false;
var oneFrameOfData = nj.zeros([5,4,6]);


function GotResults(err, result){
    predictedClassLabels = parseInt(result.label);


    console.log(parseInt(result.label));

}
function Train(){
    for (var i = 0; i < train2.shape[3]; i++ ){

        var features = train2.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 2);
        console.log(features);


        features = train4.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

    }
    console.log("Training complete!");
    trainingCompleted = true;

}

function Test(){
    for (var i = 0; i < 2; i++ ) {

        var currentTestingSample = oneFrameOfData.pick(null, null, null, i);
        currentTestingSample = currentTestingSample.reshape(120).tolist();
        var predictedLabel = knnClassifier.classify(currentTestingSample, GotResults);

    }
}

function HandleFrame (frame){
    var InteractionBox = frame.interactionBox;
    if (frame.hands.length >= 1 ){
        var hand = frame.hands[0];
        var fingers = hand.fingers;
        //console.log(oneFrameOfData.toString())
        Test();
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

function HandleBone(bone,frame,fingerIndex, boneIndex, InteractionBox){

    var normalizedPrevJoint = frame.interactionBox.normalizePoint(bone.prevJoint, true);
    var normalizedNextJoint = frame.interactionBox.normalizePoint(bone.nextJoint, true);

    oneFrameOfData.set(fingerIndex, boneIndex, 0, normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex, boneIndex, 1, normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex, boneIndex, 2, 1);
    oneFrameOfData.set(fingerIndex, boneIndex, 3, normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex, boneIndex, 4, normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex, boneIndex, 5, 1);

    var canvasPrevX = window.innerWidth * normalizedPrevJoint[0];
    var canvasPrevY = window.innerHeight * (1 - normalizedPrevJoint[1]);

    var canvasNextX = window.innerWidth * normalizedNextJoint[0];
    var canvasNextY = window.innerHeight * (1 - normalizedNextJoint[1]);

    xb = canvasPrevX;
    zb = canvasPrevY;

    xt = canvasNextX;
    zt = canvasNextY;


    if (bone.type == 0) {
        strokeWeight(11);
        stroke('rgb(220,220,220)');
        line(xt, zt, xb, zb);
    }

    if (bone.type == 1) {
        strokeWeight(8);
        stroke('rgb(192,192,192)');
        line(xt, zt, xb, zb);
    }
    if (bone.type == 2) {
        strokeWeight(6);
        stroke('rgb(128,128,128)');
        line(xt, zt, xb, zb);
    }
    else if (bone.type == 3) {
        strokeWeight(4);
        stroke('rgb(105,105,105)');
        line(xt, zt, xb, zb);
    }

}
Leap.loop(controllerOptions, function(frame) {
    clear();
    if (trainingCompleted == false) {
        Train();
    }
    HandleFrame(frame);




});


