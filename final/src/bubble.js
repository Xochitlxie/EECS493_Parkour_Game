    var bubbleSprite = cc.Sprite.extend({
        onEnter:function () {
            cc.log("onEnter");
            this._super();
        },

        onExit:function () {
            cc.log("onExit");
        }

    });

