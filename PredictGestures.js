const knnClassifier = ml5.KNNClassifier();


var trainingCompleted  = false;


function GotResults(err, result){





}
function Train(){
    for (var i = 0; i < train0.shape[3]; i++ ){
        var features = train0.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 0);
        console.log(features.toString());
    }
    trainingCompleted = true;

}

function Test(){



}

function DrawCircles(){


}



function draw() {
    clear();
    if (trainingCompleted == false){
        Train();
    }



}


