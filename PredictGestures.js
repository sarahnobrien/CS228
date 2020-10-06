const knnClassifier = ml5.KNNClassifier();


var trainingCompleted  = false;
var testingSampleIndex = 0;
var numSamples = train0.shape[0];
var predictedClassLabels = nj.zeros([numSamples]);


function GotResults(err, result){
    predictedClassLabels[testingSampleIndex] = parseInt(result.label);
    testingSampleIndex++ ;
    if (testingSampleIndex > numSamples){
        testingSampleIndex = 0;
    }
    console.log(parseInt(result.label))



}
function Train(){
    for (var i = 0; i < train0.shape[3]; i++ ){
        var features = train0.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 0);

        var features = train1.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 0);
    }
    trainingCompleted = true;

}

function Test(){
    for (var i = 0; i < train0.shape[3]; i++ ) {
        var currentTestingSample = test.pick(null, null, null, i);
        currentTestingSample = currentTestingSample.reshape(120).tolist()
        //var currentLabel = test.get(testingSampleIndex, -1);
        var predictedLabel = knnClassifier.classify(currentTestingSample, GotResults);
        console.log(currentTestingSample );
    }
}

function DrawCircles(){


}



function draw() {
    clear();
    if (trainingCompleted == false) {
        Train();
    }

    Test()


}


