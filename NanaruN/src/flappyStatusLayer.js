
var flappyStatusLayer = cc.Layer.extend({

    labelCoin:null,
    labelMeter:null,
    coins:0,
    acc_sta: false,
    count:0,
    lifeLeft:3,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelCoin = cc.LabelTTF.create("Stars:0", "Helvetica", 20);
        this.labelCoin.setColor(cc.color(255,0,0));//black color
        this.labelCoin.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelCoin);

        this.labelLife = cc.LabelTTF.create("Life Left: 2", "Helvetica", 20);
        this.labelLife.setColor(cc.color(255,0,0));
        this.labelLife.setPosition(cc.p(250, winsize.height - 20));
        this.addChild(this.labelLife);

        this.labelMeter = cc.LabelTTF.create("0M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelMeter);
    },

	updateMeter:function (px) {
        this.labelMeter.setString( parseInt(px / 10) + "M");
		var distance = parseInt(px / 10);
    if (distance % 500 > 490 ) this.acc_sta = true;
		if (distance < 99999 && this.acc_sta  && this.count < 100) {
      this.count = this.count + 1;
      if (this.count == 20) this.acc_sta = false;
		  var event = new cc.EventCustom("accelerate");
			cc.eventManager.dispatchEvent(event);
	   }
	},

    decreaseLife:function(){
      this.lifeLeft = this.lifeLeft - 1;
      this.labelLife.setString("Life Left: " + this.lifeLeft);
      
    },

    getLeftLife:function(){
      return this.lifeLeft;
    },

	addCoin:function (num) {
        this.coins += num;
        this.labelCoin.setString("Stars:" + this.coins);
	}
});
