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
        var centerpos = cc.p(winsize.width/2, winsize.height / 2);
        var basepos = cc.p(winsize.width * 1.4 /2, winsize.height * 0.95 /2);
        var demoPos = cc.p(winsize.width * 1.4 /2, winsize.height * 1.28 /2);
        var flappyPos = cc.p(winsize.width * 1.4 /2, winsize.height * 0.62 / 2);
        var voicePos = cc.p(winsize.width * 1.4 /2, winsize.height * 0.25 / 2);
        var titlepos = cc.p(winsize.width * 0.5 / 2, winsize.height * 1.7 / 2);
     
        //4. create a background image and set it's position at the center of the screen
        var spritebg = cc.Sprite.create(res.helloBG_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
        var title = cc.Sprite.create(res.title_png);
        title.setPosition(titlepos);
        this.addChild(title);
     
        //5.
        cc.MenuItemFont.setFontSize(60);
     
        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= cc.MenuItemSprite.create(
            cc.Sprite.create(res.start_n_png), // normal state image
            cc.Sprite.create(res.start_s_png), //select state image button with callback
            this.onPlay, this);
        var menu = cc.Menu.create(menuItemPlay);  //7. create the menu
        menu.setPosition(basepos);
        this.addChild(menu);

        //7. create demo button
        var demoPlay = cc.MenuItemSprite.create(
            cc.Sprite.create(res.demo_png),
            cc.Sprite.create(res.demo_png),
            this.demoPlay, this);
        var demoMenu = cc.Menu.create(demoPlay);
        demoMenu.setPosition(demoPos);
        this.addChild(demoMenu);

        //8. create flappy version button
        var flappyPlay = cc.MenuItemSprite.create(
            cc.Sprite.create(res.flappy_png),
            cc.Sprite.create(res.flappy_png),
            this.flappyPlay, this);
        var flappyMenu = cc.Menu.create(flappyPlay);
        flappyMenu.setPosition(flappyPos);
        this.addChild(flappyMenu);

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

    flappyPlay : function(){
        cc.log("enter flappy play");
        cc.director.runScene(new flappyScene());
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


