
// define enum for runner status
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
    RunnerStat.stop = 3;
}
	
var demoAnimationLayer = cc.Layer.extend({

    spriteSheet:null,
    runningAction:null,
    sprite:null,
    body:null,
    shape:null,

    space:null,
    step:null,
	jumpUpAction:null,
	jumpDownAction:null,
    coinTag:null,
	
	stat: RunnerStat.running,// init with running status
	
    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
        this.step = 0;

        //this._debugNode = cc.PhysicsDebugNode.create(this.space);
        // Parallax ratio and offset
        //this.addChild(this._debugNode, 10);

        //this._debugNode.setVisible(false);
        


    },

    getCurrentPos:function(){

        if(animateStopForStar===1 && starFinished===0) return g_runnerStartX+250;
        if(animateStopForSky===1 && skyFinished===0) return g_runnerStartX+1400;
        if(animateStopForBlock===1 && blockFinished===0) return g_runnerStartX+2000;
        if(animateStopForStatus===1 && statusFinished===0) return g_runnerStartX+2700;

        return this.sprite.getPositionX();
    },

    // avoid runner running out of screen
    getEyeX:function() {
        return this.getCurrentPos() - g_runnerStartX;
    },

	update: function() {
		var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
		statusLayer.updateMeter(this.getCurrentPos() - g_runnerStartX);
		
        if(this.getCurrentPos()-g_runnerStartX >= 250 && animateStopForStar===0){
            console.log("will stop soon on star");
            this.stat = RunnerStat.stop;
            animateStopForStar = 1;
            this.step++;
            console.log(this.step);
        } 

        if(this.getCurrentPos()-g_runnerStartX >= 1400 && animateStopForSky===0){
            console.log("will stop soon on sky");
            this.stat = RunnerStat.stop;
            animateStopForSky = 1;
            this.step++;
            console.log(this.step);
        }

        if(this.getCurrentPos()-g_runnerStartX >= 2000 && animateStopForBlock===0){
            console.log("will stop soon on block");
            this.stat = RunnerStat.stop;
            animateStopForBlock = 1;
            this.step++;
            console.log(this.step);
        }

        if(this.getCurrentPos()-g_runnerStartX >=2700 && animateStopForStatus===0){
            console.log("will stop soon on status");
            this.stat = RunnerStat.stop;
            animateStopForStatus = 1;
            this.step++;
            console.log(this.step);
        }


		//in the update method of AnimationLayer
		// check and update runner stat
        var vel = this.body.getVel();
        if (this.stat == RunnerStat.jumpUp) {
            if (vel.y < 0.1) {
                this.stat = RunnerStat.jumpDown;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.jumpDownAction);
            }
        } else if (this.stat == RunnerStat.jumpDown) {
            if (vel.y == 0) {
                this.stat = RunnerStat.running;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.runningAction);
            }
        } else if (this.stat == RunnerStat.stop){
            this.sprite.stopAllActions();
            
            if (this.step == 1){
            var coinTag = cc.Sprite.create("res/Collect_stars.png");
            coinTag.attr({x: 700, y: 200});
            this.addChild(coinTag);
            }
            else if (this.step == 2){
            var jumpTag = cc.Sprite.create("res/jump.png");
            jumpTag.attr({x: 2100, y: 350});
            this.addChild(jumpTag);   
            }
            else if (this.step == 3){
            var blockTag = cc.Sprite.create("res/block.png");
            blockTag.attr({x: 2600, y: 210});
            this.addChild(blockTag);   
            }
            else if (this.step == 4){
            var distanceTag = cc.Sprite.create("res/distance.png");
            distanceTag.attr({x: 3430, y: 530});
            var starsTag = cc.Sprite.create("res/stars.png");
            starsTag.attr({x: 2800, y: 470});
            this.addChild(distanceTag);       
            this.addChild(starsTag);   
            }
            console.log("haha");
            this.sprite.setPosition(new cc.Point(this.getCurrentPos(), g_groundHight+24));
            //this.sprite.pause();
            //this.runAction
            //this.runningAction.release();
    }
	},
	
	jump:function () {
       cc.log("jump");
       if (this.stat == RunnerStat.running) {
           this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
           this.stat = RunnerStat.jumpUp;
           this.sprite.stopAllActions();
		   this.sprite.runAction(this.jumpUpAction);
		   //this.sprite.runAction(this.jumpDownAction);
       }
	},

    goOn:function(){
        cc.log("will go on");
        //this.Coin.removeFromParent();
        this.sprite.runAction(this.runningAction);
        this.stat = RunnerStat.running;
        
        if(!starFinished) starFinished = 1;
        else if(starFinished && !skyFinished) skyFinished = 1;
        else if(starFinished && skyFinished && !blockFinished) blockFinished = 1;
        else if(starFinished && skyFinished && blockFinished && !statusFinished) statusFinished = 1;
    },
	
	initAction: function() {
		// init runningAction
        var animFrames = [];
        for (var i = 1; i < 3; i++) {
            var str = "run_Nana_mini_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        animation.setDelayPerUnit(1/14);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
		this.runningAction.retain();
 
		// init jumpUpAction
		animFrames = [];
		for (var i = 1; i < 3; i++) {
			var str = "run_Nana_mini" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
 
		animation = new cc.Animation.create(animFrames, 0.2);
		this.jumpUpAction = cc.RepeatForever.create(cc.Animate.create(animation));
		this.jumpUpAction.retain();
 
		// init jumpDownAction
		animFrames = [];
		for (var i = 1; i < 3; i++) {
			var str = "run_Nana_mini" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
 
		animation = new cc.Animation.create(animFrames, 0.3);
		this.jumpDownAction = cc.RepeatForever.create(cc.Animate.create(animation));
		this.jumpDownAction.retain();  
	},
	
    init:function () {

        this._super();
        
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.runner_png);
        this.addChild(this.spriteSheet);

		this.initAction();
		
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  function(keycode, event){
    			cc.log("Key with keycode " + keycode + " pressed");  
    			if(keycode===32) event.getCurrentTarget().jump();
                else if (keycode===13) {
                    //Coin.removeFromParent();
                    event.getCurrentTarget().goOn();
                }
			},  
			onKeyReleased: function(keycode, event){
			    cc.log("Key with keycode " + keycode + " released"); 
			}
        }, this);  
    /*    // init runningAction
        var animFrames = [];
        for (var i = 1; i < 3; i++) {
            var str = "run_Nana_mini_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        animation.setDelayPerUnit(1/14);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
	*/	
        this.sprite = cc.PhysicsSprite.create('#run_Nana_mini_1.png');
		
        var contentSize = this.sprite.getContentSize();
        //2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        console.log(contentSize.height);
        console.log(g_groundHight);
        var h = 0;
        this.body.p = new cc.Point(g_runnerStartX, 100);
        console.log(this.body.p);
        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(200, 0), cp.v(100, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height-50);
        //this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height+500);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.sprite.setBody(this.body);

        //this.sprite.attr({x:130, y:120});
        this.sprite.runAction(this.runningAction);

        this.spriteSheet.addChild(this.sprite);



        // //create the hero sprite
        // var spriteRunner = cc.Sprite.create(res.runner_png);
        // spriteRunner.attr({x: 80, y: 85});
 
        // //create the move action
        // var actionTo = cc.MoveTo.create(2, cc.p(300, 85));
        // spriteRunner.runAction(cc.Sequence.create(actionTo));
        // this.addChild(spriteRunner);
    },
	
	onExit:function() {
        animateStopForStar = 0;
        starFinished = 0;
        animateStopForSky = 0;
        skyFinished = 0;
        animateStopForBlock = 0;
        blockFinished = 0;
        animateStopForStatus = 0;
        statusFinished = 0;

        this.runningAction.release();
        this.jumpUpAction.release();
        this.jumpDownAction.release();
        this._super();
	}
});