var controllerOptions = {};

var i = 0;
var x = (window.innerWidth) / 2;
var y = (window.innerHeight) / 2;

Leap.loop(controllerOptions, function(frame)
{

    //console.log(frame);
    //clear();
    //var z = (Math.floor(Math.random()* 7)) -1; //1 was too small to see a change - used 7
   // var j = (Math.floor(Math.random()* 7)) -1; //1 was too small to see a change - used 7
    //circle(x + z, y + j, 100);
    //console.log(i);
    
    if (frame.hands.length == 1 ){
        var hand = frame.hands[0];
        var fingers = hand.fingers;
        //console.log(fingers);

        for (var i = 0; i < hand.fingers.length; i++){
            finger = hand.fingers[i];
            //console.log(finger);
            if (finger.type == 1){
                console.log(finger);
            }
        }

    
        

    }

    
    
}
);