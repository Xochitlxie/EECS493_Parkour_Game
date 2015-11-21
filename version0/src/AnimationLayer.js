
var AnimationLayer = cc.Layer.extend({

    spriteSheet:null,
    runningAction:null,
    sprite:null,
    body:null,
    shape:null,

    space:null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();

        this._debugNode = cc.PhysicsDebugNode.create(this.space);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);

    },

    // avoid runner running out of screen
    getEyeX:function () {
        return this.sprite.getPositionX() - g_runnerStartX;
    },

    init:function () {

        this._super();
        
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.runner_png);
        this.addChild(this.spriteSheet);

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
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
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
    }
});