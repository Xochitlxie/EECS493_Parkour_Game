var GameOverLayerDemo = cc.LayerColor.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();
 
        var centerPos1 = cc.p(winSize.width / 3, winSize.height / 2);
        var centerPos2 = cc.p((winSize.width / 3) * 2, winSize.height / 2)
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
            new cc.Sprite(res.backToMenu_n_png),
            new cc.Sprite(res.backToMenu_s_png),
            this.onRestart1, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos1);
        this.addChild(menu);
        var menuItemReplay = new cc.MenuItemSprite(
            new cc.Sprite(res.restart_n_png),
            new cc.Sprite(res.restart_s_png),
            this.onRestart2, this);
        var menu2 = new cc.Menu(menuItemReplay);
        menu2.setPosition(centerPos2);
        this.addChild(menu2);  
    },
    onRestart1:function (sender) {

        cc.director.resume();
        cc.director.runScene(new MenuScene());
    },
    onRestart2:function (sender) {

        cc.director.resume();
        cc.director.runScene(new demoScene());
    },
    
    
});
