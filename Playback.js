var anotherFrameOfData = nj.array([[[ 674.96526, 581.49647,   143.075, 674.96526, 581.49647,   143.075],
    [ 674.96526, 581.49647,   143.075,  582.7481, 531.38073,   130.063],
    [  582.7481, 531.38073,   130.063, 519.17134, 496.37097,   122.082],
    [ 519.17134, 496.37097,   122.082, 474.93698, 471.42524,   117.787]],
    [[ 699.95396, 538.38155,   137.886, 627.65974, 496.56118,   89.3575],
        [ 627.65974, 496.56118,   89.3575, 570.45886, 483.30335,   63.2131],
        [ 570.45886, 483.30335,   63.2131, 537.26357, 482.96267,   48.5303],
        [ 537.26357, 482.96267,   48.5303, 513.54576, 486.56812,   38.2959]],
    [[ 724.04772,  538.6257,   133.197,  674.6372, 502.76141,   84.0654],
        [  674.6372, 502.76141,   84.0654, 641.58868, 505.49247,   48.9108],
        [ 641.58868, 505.49247,   48.9108, 618.67464, 516.51038,   28.9434],
        [ 618.67464, 516.51038,   28.9434, 602.12624, 528.26074,   16.3568]],
    [[ 747.89587, 545.70316,   129.107, 723.28175, 518.37556,   82.8587],
        [ 723.28175, 518.37556,   82.8587, 710.06194, 504.15249,    49.308],
        [ 710.06194, 504.15249,    49.308, 696.84064, 504.56982,    28.573],
        [ 696.84064, 504.56982,    28.573, 685.41985,  509.7963,   14.9227]],
    [[  768.2891, 567.94055,   126.024, 764.49345, 542.62576,   82.5384],
        [ 764.49345, 542.62576,   82.5384, 781.58607, 534.23102,   56.2532],
        [ 781.58607, 534.23102,   56.2532, 787.19046, 534.19128,   41.3952],
        [ 787.19046, 534.19128,   41.3952, 789.26512,  537.4958,   28.2645]]]);

var oneFrameOfData = nj.array([[[ 0.49286, 0.29253,       0, 0.49286, 0.29253,       0],
    [ 0.49286, 0.29253,       0,  0.5198, 0.37561,       0],
    [  0.5198, 0.37561,       0, 0.50805,  0.4146,       0],
    [ 0.50805,  0.4146,       0, 0.48713, 0.43235,       0]],
    [[  0.4448, 0.35982,       0, 0.51106, 0.54473,       0],
        [ 0.51106, 0.54473,       0, 0.54241,   0.655,       0],
        [ 0.54241,   0.655,       0, 0.56904, 0.68619,       0],
        [ 0.56904, 0.68619,       0,    0.59, 0.69375,       0]],
    [[ 0.40324, 0.36429,       0, 0.43397, 0.53667,       0],
        [ 0.43397, 0.53667,       0, 0.42114, 0.67547,       0],
        [ 0.42114, 0.67547,       0, 0.43137, 0.73134,       0],
        [ 0.43137, 0.73134,       0, 0.44652, 0.75115,       0]],
    [[ 0.36332, 0.35772,       0, 0.35882, 0.50567,       0],
        [ 0.35882, 0.50567,       0, 0.38619, 0.51668,       0],
        [ 0.38619, 0.51668,       0, 0.40597, 0.51875,       0],
        [ 0.40597, 0.51875,       0, 0.42049, 0.51813,       0]],
    [[ 0.33129, 0.32806,       0, 0.29695, 0.46209,       0],
        [ 0.29695, 0.46209,       0, 0.34882, 0.48506,       0],
        [ 0.34882, 0.48506,       0, 0.38192, 0.48925,       0],
        [ 0.38192, 0.48925,       0, 0.41318, 0.48837,       0]]]);



var frameIndex = 0;
var frameSwitch = 0;

function draw()
{
    var xStart;
    var yStart;
    var xEnd;
    var yEnd;

    if (frameIndex == 100)
    {
        frameIndex = 0;

        if (frameSwitch == 0){

            frameSwitch = 1;
        }
        else if (frameSwitch == 1) {
            frameSwitch = 0;
        }

    }
    clear();



    for (var fingerIndex = 0; fingerIndex <= 4; fingerIndex++)
    {
        for (var boneIndex = 0; boneIndex <= 3; boneIndex++) {
            xStart = window.innerWidth * oneFrameOfData.get(fingerIndex,boneIndex,0);
            yStart = window.innerHeight *(1 - oneFrameOfData.get(fingerIndex,boneIndex,1));
            xEnd = window.innerWidth * oneFrameOfData.get(fingerIndex,boneIndex,3)
            yEnd =  window.innerHeight * (1 - oneFrameOfData.get(fingerIndex,boneIndex,4));


            if (frameSwitch % 2 == 0) {
                line(xStart, yStart, xEnd, yEnd);
            }
            else {
               // line(xStart2, zStart2, xEnd2, zEnd2);
            }

            //console.log(xStart, zStart, yStart, xEnd, zEnd, yEnd);

        }
    }
    console.log(frameSwitch)
    frameIndex++;

}


//draw();