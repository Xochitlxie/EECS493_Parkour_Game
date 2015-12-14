

    // define enum for runner status

    if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
    //RunnerStat.stop = 3;
    }

var AnimationLayer = cc.Layer.extend({

    spriteSheet:null,
    runningAction:null,
    sprite:null,
    body:null,
    shape:null,

    space:null,

    jumpUpAction:null,
    jumpDownAction:null,

    stat: RunnerStat.running,// init with running status

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();

        this._debugNode = cc.PhysicsDebugNode.create(this.space);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);

        this._debugNode.setVisible(false);

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
                //else if (keycode===13) event.getCurrentTarget().goOn();
            },
            onKeyReleased: function(keycode, event){
                cc.log("Key with keycode " + keycode + " released");
            }
        }, this);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "accelerate",
            callback: function(event){
          cc.log('accelerate');
                event.getCurrentTarget().accelerate();
            }
      }), this);
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

        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(g_runnerStartX, g_groundHight + contentSize.height / 2);
        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height-50);
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

    getCurrentPos:function(){

        return this.sprite.getPositionX();
    },

    // avoid runner running out of screen
    getEyeX:function () {
        return this.getCurrentPos() - g_runnerStartX;
    },

    update: function() {

        if(!this.getParent().getParent().dead){
            var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
            statusLayer.updateMeter(this.getCurrentPos() - g_runnerStartX);
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
        }
    },

    jump:function () {
       cc.log("jump");
       if (this.stat == RunnerStat.running) {
           this.body.applyImpulse(cp.v(0, 300), cp.v(0, 0));
           this.stat = RunnerStat.jumpUp;
           this.sprite.stopAllActions();
           this.sprite.runAction(this.jumpUpAction);
           //this.sprite.runAction(this.jumpDownAction);
       }
    },

    accelerate: function() {
      cc.log("accelerate");
      this.body.applyImpulse(cp.v(2, 0), cp.v(0, 0));

    },

    onExit:function() {
        this.runningAction.release();
        this.jumpUpAction.release();
        this.jumpDownAction.release();
        this._super();
    }
});
