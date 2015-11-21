var PlayScene = cc.Scene.extend({

	space:null,

	// init space of chipmunk
	initPhysics : function() {
	    //1. new space object 
	    this.space = new cp.Space();
	    //2. setup the  Gravity
	    this.space.gravity = cp.v(0, -350);
	 
	    // 3. set up Walls
	    var wallBottom = new cp.SegmentShape(this.space.staticBody,
	        cp.v(0, g_groundHight),// start point
	        cp.v(4294967295, g_groundHight),// MAX INT:4294967295
	        1);// thickness of wall
	    this.space.addStaticShape(wallBottom);
	},


	onEnter : function(){

		this._super();

		this.initPhysics();

		this.gameLayer = cc.Layer.create();

		this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
	    this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
	    this.addChild(this.gameLayer);
	    this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

		
		// this.addChild(new BackgroundLayer());
  //       this.addChild(new AnimationLayer(this.space));
  //       this.addChild(new StatusLayer());

        this.scheduleUpdate();
		
	},

	update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
	    var eyeX = animationLayer.getEyeX();
	 
	    this.gameLayer.setPosition(cc.p(-eyeX,0));
	}

})




