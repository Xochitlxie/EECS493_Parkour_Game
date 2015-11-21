
var BackgroundLayer = cc.Layer.extend({

    map00 : null,
    map01 : null,
    mapWidth : 0,
    mapIndex : 0,

    ctor:function () {
        this._super();
        this.init();

        
    },
 
    init:function () {
        this._super();

        this.map00 = cc.TMXTiledMap.create(res.map00_tmx);
        this.addChild(this.map00);
        this.mapWidth = this.map00.getContentSize().width;

        this.map01 = cc.TMXTiledMap.create(res.map01_tmx);
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);

        // var winsize = cc.director.getWinSize();
 
        // //create the background image and position it at the center of screen
        // var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        // var spriteBG = cc.Sprite.create(res.PlayBG_png);
        // spriteBG.setPosition(centerPos);
        // this.addChild(spriteBG);
    }
});
