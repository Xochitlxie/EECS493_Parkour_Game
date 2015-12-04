
var g_groundHight = 70;
var g_runnerStartX = 80;

var animateStopForStar = 0;
var starFinished = 0;

if(typeof TagOfLayer == "undefined") {

    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.Status = 2;
};


if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.runner = 0;
    
    SpriteTag.coin = 1;
    SpriteTag.rock = 2;
};


