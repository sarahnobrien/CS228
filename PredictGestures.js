const knnClassifier = ml5.KNNClassifier();
var controllerOptions = {}

var numSamples = train2.shape[0];
var predictedClassLabels = nj.zeros([numSamples]);
var trainingCompleted  = false;
var oneFrameOfData = nj.zeros([5,4,6]);

var predictionObtained = 0;
var meanPredictionAccuracy = 0;

function GotResults(err, result){
    predictedClassLabels = parseInt(result.label);


    console.log(parseInt(result.label));

    predictionObtained++;

    meanPredictionAccuracy = (((predictionObtained - 1) * meanPredictionAccuracy) + (parseInt(result.label) == 8)) / predictionObtained
    //console.log(predictionObtained, meanPredictionAccuracy, parseInt(result.label) );

}
function Train(){
    for (var i = 0; i < train2.shape[3]; i++ ){

        // Digit 0
        var features = train0.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 0);
        console.log(features);

        features = train0Wills.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 0);
        console.log(features);

        features = train0Allison.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 0);
        console.log(features);

        // features = train0ReckordGroten.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 0);
        // console.log(features);

        // features = train0Bongard.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 0);
        // console.log(features);

        // Digit 1
        features = train1.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);
        //
        features = train1Davis.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);
        //
        features = train1Riofrio.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);
        //
        // features = train1Rice.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 1);
        // console.log(features);
        //
        // features = train1McLaughlin.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 1);
        // console.log(features);
        //
        // features = train1Li.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 1);
        // console.log(features);

        features = train1Bongard.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);

        // features = train1Jimmo.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 1);
        // console.log(features);
        //
        features = train1Wolley.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);

        //do more 1 examples please

        //Digit 2
        // features = train2.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 2);
        // console.log(features);

        // features = train2Bongard.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 2);
        // console.log(features);

        features = train2Sheboy.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 2);
        console.log(features);

        features = train2Downs.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 2);
        console.log(features);

        features = train2Jimmo.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 2);
        console.log(features);

        //Digit 3

        // features = train3.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 3);
        // console.log(features);
        // //
        features = train3Shi.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);
        // //
        features = train3Downs.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

        features = train3Bongard.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

        features = train3Beattie.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

        // features = train3Jing.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 3);
        // console.log(features);

        features = train3Li.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

        //
        features = train3Riofrio.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);
        // //
        features = train3Luksevish.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

        features = train3part2.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

        //do more 3 examples

        //Digit 4

        features = train4.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);
        //
        features = train4Beattie.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);
        //
        features = train4Bertschinger.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        features = train4Faucher.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);


        // features = train4Bongard.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 4);
        // console.log(features);

        features = train4Liu.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        features = train4Makovsky.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        // features = train4Sheboy.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 4);
        // console.log(features);

        //Digit 5
        // features = train5.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 5);
        // console.log(features);

        // features = train5Bongard.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 5);
        // console.log(features);

        // features = train5Koretsky.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 5);
        // console.log(features);
        //
        features = train5Bertschinger.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 5);
        console.log(features);
        //
        // features = train5Fekert.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 5);
        // console.log(features);
        // //
        // features = train5Kiely.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 5);
        // console.log(features);


        //Digit 6
        features = train6.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 6);
        console.log(features);

        features = train6Potts.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 6);
        console.log(features);
        //
        features = train6Timsina.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 6);
        console.log(features);

        features = train6Bongard.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 6);
        console.log(features);

        features = train6Socia.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 6);
        console.log(features);


        //Digit 7
        // features = train7.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 7);
        // console.log(features);

        features = train7Bongard.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 7);
        console.log(features);

        features = train7Fisher.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 7);
        console.log(features);




        //Digit 8
        features = train8.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 8);
        console.log(features);

        // features = train8Bongard.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 8);
        // console.log(features);

        features = train8Timsina.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 8);
        console.log(features);

        //Digit 9
        features = train9.pick(null,null,null,i); //bongard
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 9);
        console.log(features);

        // features = train9McLaughlin.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 9);
        // console.log(features);
        //
        // features = train9ILee.pick(null,null,null,i);
        // features = features.reshape(120).tolist();
        // knnClassifier.addExample(features, 9);
        // console.log(features);

    }
    console.log("Training complete!");
    trainingCompleted = true;

}

function Test(){
    for (var i = 0; i < 2; i++ ) {

        var currentTestingSample = oneFrameOfData.pick(null, null, null, i);
        CenterData()
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
        strokeWeight(15);
        stroke('rgb(220,220,220)');
        line(xt, zt, xb, zb);
    }

    if (bone.type == 1) {
        strokeWeight(12);
        stroke('rgb(192,192,192)');
        line(xt, zt, xb, zb);
    }
    if (bone.type == 2) {
        strokeWeight(10);
        stroke('rgb(128,128,128)');
        line(xt, zt, xb, zb);
    }
    else if (bone.type == 3) {
        strokeWeight(8);
        stroke('rgb(105,105,105)');
        line(xt, zt, xb, zb);
    }

}

function CenterXData(){
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    //console.log(xValues.shape);
    currentXMean = xValues.mean();
    //console.log(currentMean);
    horizontalShift = 0.5 - currentXMean;
    //console.log(horizontalShift);
    for (var currentRow = 0; currentRow < xValues.shape[0]; currentRow++ ) {
        for (var currentColumn = 0; currentColumn < xValues.shape[1]; currentColumn++) {
            currentX = oneFrameOfData.get(currentRow, currentColumn, 0);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(currentRow, currentColumn, 0, shiftedX);
            //console.log(currentX, shiftedX);


            currentX = oneFrameOfData.get(currentRow, currentColumn, 3);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(currentRow, currentColumn, 3, shiftedX);
            //console.log("x: " ,currentX, shiftedX);
        }
    }
    currentXMean = xValues.mean();
    //console.log(currentMean);

}

function CenterYData(){
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    currentYMean = yValues.mean()
    verticalShift = 0.5 - currentYMean;
    for (var currentRow = 0; currentRow < yValues.shape[0]; currentRow++ ){
        for(var currentColumn = 0; currentColumn < yValues.shape[1]; currentColumn++){
            currentY = oneFrameOfData.get(currentRow,currentColumn,1);
            shiftedY = currentY + verticalShift;
            oneFrameOfData.set(currentRow,currentColumn,1, shiftedY);
            //console.log(currentX, shiftedX);


            currentY = oneFrameOfData.get(currentRow,currentColumn,4);
            shiftedY = currentY + verticalShift;
            oneFrameOfData.set(currentRow,currentColumn,4, shiftedY);
            //console.log("y: ",currentY, shiftedY);
        }
    }
    currentYMean = yValues.mean();
   // console.log(currentYMean);
}

function CenterZData(){
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    currentZMean = zValues.mean()
    zShift = 0.5 - currentZMean;
    for (var currentRow = 0; currentRow < zValues.shape[0]; currentRow++ ){
        for(var currentColumn = 0; currentColumn < zValues.shape[1]; currentColumn++){
            currentZ = oneFrameOfData.get(currentRow,currentColumn,2);
            shiftedZ = currentZ + zShift;
            oneFrameOfData.set(currentRow,currentColumn,2, shiftedZ);
            //console.log(currentZ, shiftedZ);


            currentZ = oneFrameOfData.get(currentRow,currentColumn,5);
            shiftedZ = currentZ + zShift;
            oneFrameOfData.set(currentRow,currentColumn,5, shiftedZ);
           //console.log(currentZ, shiftedZ);
        }
    }
    currentZMean = zValues.mean();
    //console.log(currentZMean);
}

function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();


}


Leap.loop(controllerOptions, function(frame) {
    clear();
    if (trainingCompleted == false) {
        Train();
    }
    HandleFrame(frame);

});


