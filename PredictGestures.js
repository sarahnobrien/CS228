const knnClassifier = ml5.KNNClassifier();
var controllerOptions = {}

var numSamples = train2.shape[0];
var predictedClassLabels = nj.zeros([numSamples]);
var trainingCompleted  = false;
var oneFrameOfData = nj.zeros([5,4,6]);

var predictionObtained = 0;
var meanPredictionAccuracy = 0;

var programState = 0;
var digitToShow = 0;
var timeSinceLastDigitChange = new Date();

var totalAccuracy = {"0": 0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0,  "9":0}
var totalPredicted = {"0": 0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0,  "9":0}
var currentDigitsShownToUser = [0,1]
var userProficient = false;
var currentSum;

var x = 0;
var y = 0;
var gamePoints = 0;
var gameRounds = 5;
var totalRounds = 0;
var userScores = []
var playerPoints;
var gameHighScore = 0;
var playerHighScore = "";
var GameHTMLCreated = false;
var HTMLCreated = false;


function GameStyleDrawLowerLeft(){
    var style = document.createElement('style')
    style.innerHTML = '.resultsContainer {\n' + 'position: absolute;\n' + ' bottom: ' + String((window.innerHeight / 2) - 600) + ';\n' + 'left: ' + 200+ ';\n' + ' }';
    document.body.appendChild(style);
    style = document.createElement('style')
    style.innerHTML = '.bottomleft {\n' + ' display: block;\n' + 'font-size: 40px;\n' + '}';
    document.body.appendChild(style);
    var container = document.createElement('div');
    container.classList.add("resultsContainer");
    var header = document.createElement('div');
    var current = document.createElement('div');
    var last = document.createElement('div');
    var playersTable = document.createElement('div');
    header.classList.add("bottomleft");
    header.id = "header";
    current.classList.add("bottomleft");
    current.id = "curr";
    last.classList.add("bottomleft");
    last.id = "last";
    playersTable.classList.add("bottomleft");
    playersTable.id = "playersTable"
    container.appendChild(header);
    container.appendChild(current);
    container.appendChild(last);
    container.appendChild(playersTable);
    document.body.appendChild(container);
}
function StyleDrawLowerLeft(){
    var style = document.createElement('style')
    document.body.appendChild(style);
    // var canvas = document.getElementById("defaultCanvas0");
    // var main = document.getElementById("main");
    style.innerHTML = '.resultsContainer {\n' + 'position: absolute;\n' + ' bottom: ' + String((window.innerHeight / 2) - 600) + ';\n' + 'left: ' + 200+ ';\n'  + ' }';
    style = document.createElement('style')
    style.innerHTML = '.bottomleft {\n' + ' display: block;\n' + 'font-size: 30px;\n' + '}';
    document.body.appendChild(style);
    var container = document.createElement('div');
    container.classList.add("resultsContainer");
    var means = document.createElement('div');
    means.classList.add("bottomleft");
    means.id = "means";
    container.appendChild(means);
    //main.appendChild(container);
    document.body.appendChild(container)


}
function DrawLowerLeft(){
    if(!HTMLCreated){
        StyleDrawLowerLeft();
        HTMLCreated = true;
    }
    document.getElementById("means").innerHTML =   "0: " + totalAccuracy[0] +  "<br>" + "1: " + totalAccuracy[1] +  "<br>" + "2: " + totalAccuracy[2] +  "<br>" + "3: " + totalAccuracy[3] +  "<br>" + "4: " + totalAccuracy[4] +  "<br>" + "5: " + totalAccuracy[5] +  "<br>" + "6: " + totalAccuracy[6] +  "<br>" + "7: " + totalAccuracy[7] +  "<br>" + "8: " + totalAccuracy[8] +  "<br>" + "9: " + totalAccuracy[9];
}


function GameDrawLowerLeft(){
    Score();
}

function Score(){
    if (!GameHTMLCreated) {
        GameStyleDrawLowerLeft();
        GameHTMLCreated = true;
    }
    document.getElementById("header").innerHTML =   "&#x1F51D;"+getUserPoints(document.getElementById('username').value) + "<br>" +  "&#x1F4CD;"+ gamePoints + "<br>" +  " &#x1F525; " +playerHighScore + " " + gameHighScore;
}


function getPlayerHighScore(list){
    var users = list.children;
    var score
    for (i = 0; i < users.length; i++){
        if (users[i].id.includes("_Points")){
            score = users[i].innerHTML;
            if (score > gameHighScore){
                playerHighScore = users[i-2].innerHTML;
                gameHighScore = users[i].innerHTML;
            }
        }
    }
    console.log(playerHighScore, gameHighScore)
}
function getUserPoints(username,list){
    var ID = String(username) + "_Points";
    var listItem = document.getElementById(ID);
    console.log("List Item: ", listItem)
    return parseInt(listItem.innerHTML);
}

function setUserPoints(username, list){
    var ID = String(username) + "_Points";
    var listItem = document.getElementById(ID);
    listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    playerPoints = listItem.innerHTML;
    getPlayerHighScore(list);
}

function GameModeEquations(){
    var sum = Math.floor(Math.random() * (10));
    var x = Math.floor(Math.random() * sum);
    var y = sum - x;
    //currentSum = x + y;
    //currentSum = digitToShow;
    //console.log(x + " + " + y + " = " );
    return [x, y];
}
function GameSwitchDigits(){
        var xyArray = GameModeEquations();
        x = xyArray[0];
        y = xyArray[1];
        currentSum = x + y;
        digitToShow = currentSum;
        predictionObtained = 0;
        meanPredictionAccuracy = 0;

}
function SwitchDigits() {
    lastDigit = currentDigitsShownToUser[currentDigitsShownToUser.length - 1]
    if (digitToShow !== (currentDigitsShownToUser.length - 1)) {
        digitToShow += 1;
        predictionObtained = 0;
        meanPredictionAccuracy = 0;
        // predictionObtained = totalPredicted[(digitToShow + 1)].toString();
        // meanPredictionAccuracy = totalAccuracy[(digitToShow + 1)].toString();
    } else {
        digitToShow = 0;
        predictionObtained = 0;
        meanPredictionAccuracy = 0;
        //currentDigitsShownToUser[0];
    }

}

function DetermineAddDigit() {
    var needToAddDigit = true;
    if (currentDigitsShownToUser.length === 10) {
        if(totalAccuracy["9"] > 0.2){
            userProficient = true;
        }
       return false
    }
    else {
        for (var key in totalAccuracy) {
            if (totalAccuracy[key] < 0.42 && parseInt(key) < currentDigitsShownToUser.length)
                needToAddDigit = false
            }
        return needToAddDigit
    }

}
function addDigit(){
    if (DetermineAddDigit()){
        currentDigitsShownToUser.push(currentDigitsShownToUser.length);
    }
}

function DetermineWhetherToSwitchDigits(){
    if (TimeToSwitchDigits()){
        addDigit();
        SwitchDigits();
    }
}
function TimeToSwitchDigits() {
    let currentTime = new Date()
    timeInMilliseconds = currentTime - timeSinceLastDigitChange;
    timeInSeconds = timeInMilliseconds / 1000
    if (userProficient === false) { //third scaffold
        if (timeInSeconds > 15 || (timeInSeconds > 6 && totalAccuracy[digitToShow.toString()] >= .4)) { //if its been a certain amount of time and their mean prediction accuracy is high, can move on
            timeSinceLastDigitChange = currentTime;
            return true;
        } else {
            return false;
        }
    } else {
        //third scaffold when fast wowooo
        if (timeInSeconds > 8 || (timeInSeconds > 6 && totalAccuracy[digitToShow.toString()] >= .5)) { //if its been a certain amount of time and their mean prediction accuracy is high, can move on
            timeSinceLastDigitChange = currentTime;
            return true;
        } else {
            return false;
        }
    }

}
function GameDetermineWhetherToSwitchDigits(){
    if (GameTimeToSwitch()){
        GameSwitchDigits();
    }
}

function GameTimeToSwitch(){
    var username = document.getElementById('username').value;
    var list = document.getElementById('users');
    let currentTime = new Date()
    timeInMilliseconds = currentTime - timeSinceLastDigitChange;
    timeInSeconds = timeInMilliseconds / 1000
    if (totalRounds <= gameRounds) {
        if (timeInSeconds > 15) {
            timeSinceLastDigitChange = currentTime;
            totalRounds +=1;
            return true;
        }
        else if (meanPredictionAccuracy >= .5 && timeInSeconds > 10){
            timeSinceLastDigitChange = currentTime;
            gamePoints += 1;
            totalRounds +=1;
            if(gamePoints > getUserPoints(username,list)){
                setUserPoints(username, list)
            }

            return true;
        }
        else{
            return false;

        }
    }

    else if (totalRounds > gameRounds){
        return false;

    }
}
function GameModeDrawLowerRightPanel(){
    //console.log("lower right" + x,y,digitToShow);
    if (totalRounds <= gameRounds) {
        image(plusSign, (window.innerWidth / 4) * 2, (window.innerHeight / 4) * 3, window.innerWidth / 6, window.innerHeight / 6)

        if (x === 0) {
            image(digit0Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 1) {
            image(digit1Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 2) {
            image(digit2Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 3) {
            image(digit3Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 4) {
            image(digit4Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 5) {
            image(digit5Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 6) {
            image(digit6Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 7) {
            image(digit7Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 8) {
            image(digit8Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (x === 9) {
            image(digit9Sign, window.innerWidth / 4, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        }

        if (y === 0) {
            image(digit0Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 1) {
            image(digit1Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 2) {
            image(digit2Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 3) {
            image(digit3Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 4) {
            image(digit4Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 5) {
            image(digit5Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 6) {
            image(digit6Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 7) {
            image(digit7Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 8) {
            image(digit8Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);
        } else if (y === 9) {
            image(digit9Sign, (window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3, window.innerWidth / 5, window.innerHeight / 5);

        }
    }

    if (totalRounds > gameRounds){
        image(refresh, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
    }
}

function DrawLowerRightPanel(){
    if(userProficient === false) {
        if (digitToShow === 0) {
            image(digit0Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 1) {
            image(digit1Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 2) {
            image(digit2Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 3) {
            image(digit3Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 4) {
            image(digit4Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 5) {
            image(digit5Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 6) {
            image(digit6Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 7) {
            image(digit7Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 8) {
            image(digit8Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 9) {
            image(digit9Sign, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        }
    }
    else if (userProficient === true){
        if (digitToShow === 0) {
            image(digit0, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 1) {
            image(digit1, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 2) {
            image(digit2, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 3) {
            image(digit3, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 4) {
            image(digit4, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 5) {
            image(digit5, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 6) {
            image(digit6, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 7) {
            image(digit7, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 8) {
            image(digit8, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        } else if (digitToShow === 9) {
            image(digit9, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2.5, window.innerHeight / 2.5);
        }
    }
}
function GotResults(err, result) {

    var username = document.getElementById('username');
    var list = document.getElementById('users');

    //predictedClassLabels = parseInt(result.label);
    //console.log(parseInt(result.label));
    //console.log(programState);
    predictionObtained++;
    meanPredictionAccuracy = (((predictionObtained - 1) * meanPredictionAccuracy) + (parseInt(result.label) === digitToShow)) / predictionObtained;
    totalAccuracy[digitToShow.toString()] = meanPredictionAccuracy.toFixed(2);
    totalPredicted[digitToShow.toString()] = predictionObtained++;

    if (programState === 2) {
        console.log(predictionObtained, meanPredictionAccuracy, parseInt(result.label));
    }
    else if (programState === 3) {
        console.log(predictionObtained, meanPredictionAccuracy, parseInt(result.label));
        console.log(gamePoints);
        console.log(totalRounds);

        //console.log(String(getUserPoints(username, list))); //why make error maybe new got results? maybe the issue
        //is when switching from lesson to game? m
    }
}

function Test(){
    for (var i = 0; i < 2; i++ ) {
//i think not supposed to be for looop
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
        //Test();
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

    var R = (1-meanPredictionAccuracy) * 200;
    var G = meanPredictionAccuracy * 200;

    var normalizedPrevJoint = frame.interactionBox.normalizePoint(bone.prevJoint, true);
    var normalizedNextJoint = frame.interactionBox.normalizePoint(bone.nextJoint, true);

    oneFrameOfData.set(fingerIndex, boneIndex, 0, normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex, boneIndex, 1, normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex, boneIndex, 2, normalizedPrevJoint[2]);
    oneFrameOfData.set(fingerIndex, boneIndex, 3, normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex, boneIndex, 4, normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex, boneIndex, 5, normalizedPrevJoint[2]);

    var canvasPrevX = (window.innerWidth / 2) * normalizedPrevJoint[0];
    var canvasPrevY = (window.innerHeight / 2) * (1 - normalizedPrevJoint[1]);

    var canvasNextX = (window.innerWidth / 2) * normalizedNextJoint[0];
    var canvasNextY = (window.innerHeight / 2) * (1 - normalizedNextJoint[1]);

    xb = canvasPrevX;
    zb = canvasPrevY;

    xt = canvasNextX;
    zt = canvasNextY;


    if (bone.type == 0) {
        strokeWeight(15);
        stroke(R,G,0);
        line(xt, zt, xb, zb);
    }

    if (bone.type == 1) {
        strokeWeight(12);
        stroke(R,G,0);
        line(xt, zt, xb, zb);
    }
    if (bone.type == 2) {
        strokeWeight(10);
        stroke(R,G,0);
        line(xt, zt, xb, zb);
    }
    else if (bone.type == 3) {
        strokeWeight(8);
        stroke(R,G,0);
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
            //9("x: " ,currentX, shiftedX);
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
    currentZMean = zValues.mean();
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

function DetermineState(frame){
    //console.log(programState)
    if (frame.hands.length == 0){
        programState = 0;
    }
    else if (HandIsUncentered()){
        programState = 1;
    }
    else if (!HandIsUncentered()) {
        SetMode()
        if (mode === "game mode"){
            programState = 3;
        }
        else {
            programState = 2;
        }
    }
   // console.log("Prog state:"+ programState);



}

function HandleState0(frame){
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
    numPredictions = 0
}

function HandleState1(frame){
    HandleFrame(frame);

    if (HandIsTooFarToTheLeft()){
        DrawArrowRight();
    }
    else if (HandIsTooFarToTheRight()){
        DrawArrowLeft();
    }
    else if (HandIsTooFarUp()){
        DrawArrowDown();
    }
    else if (HandIsTooFarDown()){
        DrawArrowUp();
    }
    else if(HandIsTooClose()){
        DrawArrowAway();
    }
    else if(HandIsTooFar()){
        DrawArrowTowards();
    }

}

function HandleState2(frame){
    HandleFrame(frame);
    Test();
    DrawLowerLeft();
    DrawLowerRightPanel();
    DetermineWhetherToSwitchDigits();
    addDigit()
}

function HandleState3(frame){
    HandleFrame(frame);
    Test();
    //GameModeEquations();
    GameDrawLowerLeft();
    GameModeDrawLowerRightPanel();
    GameDetermineWhetherToSwitchDigits();
}

function HandIsUncentered(frame){
    return (HandIsTooFarToTheLeft() || HandIsTooFarToTheRight() || HandIsTooFarUp() || HandIsTooFarDown() || HandIsTooClose() || HandIsTooFar());
}

function HandIsTooFarToTheLeft(){
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    currentXMean = xValues.mean();

    return (currentXMean < 0.25);
}

function DrawArrowRight(){
    image(imgTooLeft,window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2);
}

function HandIsTooFarToTheRight(){
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    currentXMean = xValues.mean();

    return (currentXMean > 0.75);
}

function DrawArrowLeft(){
    image(imgTooRight,window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2);
}

function HandIsTooFarUp(){
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    currentYMean = yValues.mean();

    return (currentYMean > 0.75);
}

function DrawArrowDown(){
    image(imgTooHigh,window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2);
}

function HandIsTooFarDown(){
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    currentYMean = yValues.mean();

    return (currentYMean < 0.25);
}

function DrawArrowUp(){
    image(imgTooLow,window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2);
}

function HandIsTooClose(){
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    currentZMean = zValues.mean();

    return (currentZMean > 0.75);
}

function DrawArrowAway(){
    image(imgTooClose,window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2);
}

function HandIsTooFar(){
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    currentZMean = zValues.mean();

    return (currentZMean < 0.25);
}

function DrawArrowTowards(){
    image(imgTooFar,window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2);
}

function TrainKNNIfNotDoneYet(){
    if (trainingCompleted == false) {
        Train();
    }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img,0,0, window.innerWidth / 2, window.innerHeight / 2);
}


function SignIn(){
    //console.log("hey this function was just called!")

    username = document.getElementById('username').value;
    var list = document.getElementById('users');
    if (IsNewUser(username,list)) {
        CreateNewUser(username,list);
    }else {
        CreateSignInItem(username,list);
    }
    console.log("Signed In - " + username);
    console.log(list.innerHTML);
    getPlayerHighScore(list)
    return false;

}

function IsNewUser(username,list){
    var usernameFound = false;
    var users = list.children;
    for (i = 0; i < users.length; i++)
    {
        if (users[i].innerHTML === username)
        {
            usernameFound = true;
            console.log(users[i]);
            console.log(users[i].innerHTML);
        }
    }

    return usernameFound == false;

}

function CreateNewUser(username,list)
{
    var item = document.createElement('li');
    item.id = String(username) + "_name";
    item.innerHTML = String(username);
    list.appendChild(item);
    item = document.createElement('li');
    item.id = String(username) + "_signins";
    item.innerHTML = 1;
    list.appendChild(item);

    item = document.createElement('li');
    item.id = String(username) + "_Points";
    item.innerHTML = 0;
    list.appendChild(item);
}


function CreateSignInItem(username,list)
{
    var ID = String(username) + "_signins";
    var listItem = document.getElementById(ID);
    listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    // var signIn = (parseInt(listItem.getAttribute('value'))) + 1;
    // listItem.setAttribute("value", String(sign_ins))
}

function Train() {
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

        features = train1Bongard.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);

        features = train1Wolley.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 1);
        console.log(features);

        //do more 1 examples please

        //Digit 2

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

        features = train3Shi.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);

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


        features = train3Li.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 3);
        console.log(features);


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

        features = train4Beattie.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        features = train4Bertschinger.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        features = train4Faucher.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);


        features = train4Liu.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        features = train4Makovsky.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 4);
        console.log(features);

        features = train5Bertschinger.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 5);
        console.log(features);



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

        features = train8Timsina.pick(null,null,null,i);
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 8);
        console.log(features);

        //Digit 9
        features = train9.pick(null,null,null,i); //bongard
        features = features.reshape(120).tolist();
        knnClassifier.addExample(features, 9);
        console.log(features);

    }
    console.log("Training complete!");
    trainingCompleted = true;

}
function SetMode(){
    mode = document.getElementById("Mode").value;
    //console.log(mode)
    if (mode === "learning mode"){
        return true;
    }
    else if (mode === "game mode"){
        return false;
    }
}

Leap.loop(controllerOptions, function(frame) {
    clear();
    DetermineState(frame);
    //SetMode()
    //if (SetMode() === true) {
        // DetermineState(frame);
        if (programState === 0) {
            HandleState0(frame);
        }
        else if (programState === 1) {
            HandleState1(frame);
        }
        else if (programState === 2) {
            HandleState2(frame);
        }
        else if (programState === 3){

            HandleState3(frame);
    //}
    // else if (SetMode() === false){
    //     // DetermineState(frame);
    //     HandleState3(frame);
        //split the second half of the screen into threes, have space for two digit and an operator image.
        //Figure out the whole random situation
        //Hell yeah baby
    }//program state 3?


});


