
var voiceStatusLayer = cc.Layer.extend({

    labelCoin:null,
    labelMeter:null,
    coins:0,
 
    ctor:function () {
        this._super();
        this.init();
    },
 
    init:function () {
        this._super();
 
        var winsize = cc.director.getWinSize();
 
        this.labelCoin = cc.LabelTTF.create("Coins:0", "Helvetica", 20);
        this.labelCoin.setColor(cc.color(255,0,0));//black color
        this.labelCoin.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelCoin);
 
        this.labelMeter = cc.LabelTTF.create("0M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelMeter);
    },
	
	updateMeter:function (px) {
        this.labelMeter.setString( parseInt(px / 10) + "M");
		var distance = parseInt(px / 10);
		var olddis = 0;
		if (distance - olddis > 100) {
			olddis = distance;
			var event = new cc.EventCustom("accelerate");
			cc.eventManager.dispatchEvent(event);
	}
	},
	
	addCoin:function (num) {
        this.coins += num;
        this.labelCoin.setString("Coins:" + this.coins);
	}
});
