
var demoBackgroundLayer = cc.Layer.extend({

    map00 : null,
    map01 : null,
    mapWidth : 0,
    mapIndex : 0,

    space:null,
    spriteSheet:null,
    objects:[],

    ctor:function (space) {
        this._super();

        this.objects = [];
        this.space = space;

        this.init();
        
    },
 
    init:function () {

        console.log("in demo background layer");
        this._super();

        this.map00 = cc.TMXTiledMap.create(res.demo_map00_tmx);
        this.addChild(this.map00);
        this.mapWidth = this.map00.getContentSize().width;

        this.map01 = cc.TMXTiledMap.create(res.demo_map01_tmx);
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);

        this.map02 = cc.TMXTiledMap.create(res.demo_map02_tmx);
        this.map02.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map02);

        cc.spriteFrameCache.addSpriteFrames(res.background_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.background_png);
        this.addChild(this.spriteSheet);

        this.loadObjects(this.map00, 0);
        this.loadObjects(this.map01, 1);
        this.loadObjects(this.map02, 2);

        this.scheduleUpdate();

        // var winsize = cc.director.getWinSize();
 
        // //create the background image and position it at the center of screen
        // var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        // var spriteBG = cc.Sprite.create(res.PlayBG_png);
        // spriteBG.setPosition(centerPos);
        // this.addChild(spriteBG);
    },

    loadObjects:function (map, mapIndex) {
       //add coin
       var coinGroup = map.getObjectGroup("coin");
       var coinArray = coinGroup.getObjects();
       for (var i = 0; i < coinArray.length; i++) {
           var coin = new Coin(this.spriteSheet,
               this.space,
               cc.p(coinArray[i]["x"] + this.mapWidth * mapIndex,coinArray[i]["y"]));
           coin.mapIndex = mapIndex;
           this.objects.push(coin);
       }
 
       //add rock 
       var rockGroup = map.getObjectGroup("rock");
       var rockArray = rockGroup.getObjects();
       for (var i = 0; i < rockArray.length; i++) {
           var rock = new Rock(this.spriteSheet,
               this.space,cc.p(rockArray[i]["x"] + this.mapWidth * mapIndex,rockArray[i]["y"]));
               //rockArray[i]["x"] + this.mapWidth * mapIndex);
           rock.mapIndex = mapIndex;
           this.objects.push(rock);
       }
    },

    removeObjects:function (mapIndex) {  // change later
        while((function (obj, index) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].mapIndex == index) {
                    obj[i].removeFromParent();
                    obj.splice(i, 1);
                    return true;
                }
            }
            return false;
        })(this.objects, mapIndex));
    },

    removeObjectByShape:function (shape) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getShape() == shape) {
                this.objects[i].removeFromParent();
                this.objects.splice(i, 1);
                break;
            }
        }
    },

    checkAndReload:function (eyeX) {

        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapIndex == newMapIndex) {
            return false;
        }
        if (0 == newMapIndex % 3) {
            // change mapSecond
            this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map00, newMapIndex + 1); // add objects
        } else if (newMapIndex%3 == 1){
            // change mapFirst
            this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map01, newMapIndex + 1);
        } else if( newMapIndex%3 == 2){

            // change mapthird
            this.map02.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map02, newMapIndex + 1);
        }

        this.removeObjects(newMapIndex - 1); // remove objects in older map
        this.mapIndex = newMapIndex;
        return true;
    },

    update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);
    }

});
