
var flappyScene = cc.Scene.extend({

	space:null,
	shapeToRemove : [],
	gameLayer:null,

	// init space of chipmunk
	initPhysics : function() {
	    //1. new space object
	    this.space = new cp.Space();
	    //2. setup the  Gravity
	    this.space.gravity = cp.v(0, -350);

	    // 3. set up Walls
		var g_ceilHight = cc.director.getWinSize()-30;
	    var wallBottom = new cp.SegmentShape(this.space.staticBody,
	        cp.v(0, g_groundHight),// start point
	        cp.v(4294967295, g_groundHight),// MAX INT:4294967295
	        1);// thickness of wall
	    this.space.addStaticShape(wallBottom);

	    var winsize = cc.director.getWinSize();

	    var wallUpper = new cp.SegmentShape(this.space.staticBody,
	    	cp.v(0, winsize.height-60),
	    	cp.v(4294967295, winsize.height-60),
	    	1);
	    this.space.addStaticShape(wallUpper);

	    // collision Handler
	    this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
        	this.collisionCoinBegin.bind(this), null, null, null);
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
            this.collisionRockBegin.bind(this), null, null, null);
	},

	collisionCoinBegin:function (arbiter, space) {
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[1]);
		var statusLayer = this.getChildByTag(TagOfLayer.Status);
		statusLayer.addCoin(1);

		cc.audioEngine.playEffect(res.pickup_coin_wav);

    },

    collisionRockBegin:function (arbiter, space) {
        cc.log("==game over");
        var animate = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        animate.body.applyForce(cp.v(0, 1800), cp.v(0, 0));
		cc.audioEngine.stopMusic();

		//cc.director.pause();
        this.addChild(new GameOverLayer());
    },


	onEnter : function(){

		this.shapesToRemove = [];

		this._super();

		this.initPhysics();

		this.gameLayer = cc.Layer.create();

		this.gameLayer.addChild(new flappyBgrLayer(this.space), 0, TagOfLayer.background);
	    this.gameLayer.addChild(new flappyAnimationLayer(this.space), 0, TagOfLayer.Animation);
	    this.addChild(this.gameLayer);
	    this.addChild(new flappyStatusLayer(), 0, TagOfLayer.Status);


		// this.addChild(new BackgroundLayer());
  //       this.addChild(new AnimationLayer(this.space));
  //       this.addChild(new StatusLayer());

        this.scheduleUpdate();

		cc.audioEngine.playMusic(res.background_ogg, true);

		this.scheduleUpdate();

	},

	update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        for(var i = 0; i < this.shapesToRemove.length; i++) {
		    var shape = this.shapesToRemove[i];
		    this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
		}
		this.shapesToRemove = [];

        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
	    var eyeX = animationLayer.getEyeX();

		animationLayer.update();

	    this.gameLayer.setPosition(cc.p(-eyeX,0));

	}

})
