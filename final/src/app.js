var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },

    init:function(){
        //call super class's super function
        this._super();
     
        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();
     
        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        var demoPos = cc.p(winsize.width/4, winsize.height/8);
        var voicePos = cc.p(winsize.width*3/4, winsize.height/8);
     
        //4. create a background image and set it's position at the center of the screen
        var spritebg = cc.Sprite.create(res.helloBG_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
     
        //5.
        cc.MenuItemFont.setFontSize(60);
     
        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= cc.MenuItemSprite.create(
            cc.Sprite.create(res.start_n_png), // normal state image
            cc.Sprite.create(res.start_s_png), //select state image button with callback
            this.onPlay, this);
        var menu = cc.Menu.create(menuItemPlay);  //7. create the menu
        menu.setPosition(centerpos);
        this.addChild(menu);

        //7. create demo button
        var demoPlay = cc.MenuItemSprite.create(
            cc.Sprite.create(res.demo_png),
            cc.Sprite.create(res.demo_png),
            this.demoPlay, this);
        var demoMenu = cc.Menu.create(demoPlay);
        demoMenu.setPosition(demoPos);
        this.addChild(demoMenu);

        //8. create voice version button
        var voicePlay = cc.MenuItemSprite.create(
            cc.Sprite.create(res.voice_png),
            cc.Sprite.create(res.voice_png),
            this.voicePlay, this);
        var voiceMenu = cc.Menu.create(voicePlay);
        voiceMenu.setPosition(voicePos);
        this.addChild(voiceMenu);
            
    },

    demoPlay : function(){
        cc.log("enter demo page");
        cc.director.runScene(new demoScene());
    },
     
    onPlay : function(){
        cc.log("onplay clicked");
        cc.director.runScene(new PlayScene());
    },

    voicePlay : function(){
        cc.log("enter voice play");
        cc.director.runScene(new VoiceScene());
    }
});

var MenuScene = cc.Scene.extend({

    onEnter : function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});


