var trainingCompleted  = false;

function Train(){
    console.log("I am being trained");
    trainingCompleted = true;
}

function Test(){
    console.log("I am going to do more than just train");
}

function draw() {
    clear();
    if (trainingCompleted == false){
        Train();
    }

    Test();
}

