var controllerOptions = {};

var i = 0;
var x = (window.innerWidth) / 2
var y = (window.innerHeight) / 2

Leap.loop(controllerOptions, function(frame)
{
    var z = (Math.floor(Math.random()* 1)) - 1
    circle(x + z, y, 100)
    console.log(i)

}
);