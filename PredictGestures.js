const knnClassifier = ml5.KNNClassifier();


var trainingCompleted  = false;
var testingSampleIndex = 0;
var numSamples = train2.shape[0];
var predictedClassLabels = nj.zeros([numSamples]);


function GotResults(err, result){
    predictedClassLabels[testingSampleIndex] = parseInt(result.label);

    testingSampleIndex++;
    if (testingSampleIndex > numSamples){
        testingSampleIndex = 0;
    }

    console.log(parseInt(result.label));



}
function Train(){
    for (var i = 0; i < train2.shape[3]; i++ ){
        var features = train2.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 2);


        var features = train4.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);


    }
    trainingCompleted = true;

}

function Test(){
    for (var i = 0; i < test.shape[3]; i++ ) {

        var currentTestingSample = test.pick(null, null, null, i);
        currentTestingSample = currentTestingSample.reshape(120).tolist();
        var predictedLabel = knnClassifier.classify(currentTestingSample, GotResults);

    }
}


function draw() {
    clear();
    if (trainingCompleted == false) {
        Train();
    }

    Test()


}



