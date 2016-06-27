var _imgUrl = "http://c1.mifile.cn/f/i/hd/2016051101/",

	_userName = me.name,
	_dialog = {},
	_members = {},
	gif = {
		welcome: '<img src="http://pic9.qiyipic.com/common/20160530/zbs61-dlam.gif">',
		lol: '<img src="http://pic9.qiyipic.com/common/20160530/zbs61-dlam.gif">',
		cry: '<img src="http://pic9.qiyipic.com/common/20160530/zbs61-dlam.gif">'
	};
var chatContent = $("#chatContent");
var dotTpl = doT.template($("#messageTpl").text());
var pMsgAudio = document.getElementById("message-push-music");
var newMsg = document.getElementById("new-message");
//加载页面资源
var manifest = [{
	src: "http://pic9.qiyipic.com/common/20160530/zbs61-dlam.gif",
	id: "emoj"
}, {
	src: "http://pic0.qiyipic.com/common/20160528/zbs61-sdds.png",
	id: 'sdsxs'
}, {
	src: "http://pic2.qiyipic.com/common/20160528/zbs61-kn2.png",
	id: 'kn2'
}, {
	src: "http://pic9.qiyipic.com/common/20160528/zbs61-all2.png",
	id: "all"
}, {
	src: "http://pic7.qiyipic.com/common/20160528/zbs61-xy.png",
	id: "xy"
}, {
	src: "http://pic0.qiyipic.com/common/20160528/zbs61-tomjerry.png",
	id: "tmjr"
}, {
	src: "http://pic1.qiyipic.com/common/20160528/zbs61-qbt.png",
	id: "qbt"
}, {
	src: "http://pic3.qiyipic.com/common/20160528/zbs61-jymb.png",
	id: "jymb"
}, {
	src: "http://app.iqiyi.com/common/20160528/zbs61-egg.png",
	id: "egg"
}, {
	src: "http://pic2.qiyipic.com/common/20160530/zbs61-dlamgg.png",
	id: "dlamgg"
}, {
	src: "http://www.qiyipic.com/common/fix/zbs61-dlam.jpg",
	id: "dlam"
}, {
	src: "http://www.qiyipic.com/common/fix/duolaam-video.png",
	id: "duolaam"
}, {
	src: "http://pic9.qiyipic.com/common/20160528/zbs61-swkd.png",
	id: "swkd"
}, {
	src: "http://pic9.qiyipic.com/common/20160528/201305041010160936.gif",
	id: "gif"
}, {
	src: "http://pic7.qiyipic.com/common/20160528/zbs61-crazyAnimal.png",
	id: "bbmm"
}, {
	src: "http://pic8.qiyipic.com/common/20160530/zbs61-rmvideo.png",
	id: "rmvideo"
}];

//页面滚动
$.fn.scrollSmooth = function(height, time) {
	var _this = this,
		obj = _this[0],
		sTop = obj.scrollTop,
		r = height - sTop,
		startTime = Date.now();

	function a() {
		var speed = Math.min(1, (Date.now() - startTime) / time);
		obj.scrollTop = r * speed + sTop;
		if (speed < 1) {
			setTimeout(a, 10);
		}

	}
	a();
};
$.fn.goSmooth = function(height, time) {
	var _this = this,
		oBjectMb = 1 * _this.css("margin-bottom").replace("px", ""),
		disHeight = height - oBjectMb,
		beginTime = Date.now();

	function a() {
		var e = Math.min(1, (Date.now() - beginTime) / time);
		_this.css("margin-bottom", disHeight * e + oBjectMb);
		if (e < 1) {
			setTimeout(a, 10);
		}
	}

	a()
};
//canvas 表情
var requestAni = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
function(callback) {
	setTimeout(callback, 1e3 / 60)
};
var cRequestAni = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame;

function canvasInit(options) {
	var options = options || {};
	this.maxFlake = options.maxFlake || 200;
	this.flakeSize = options.flakeSize || 10;
	this.fallSpeed = options.fallSpeed || 2;
	this.emojiImage = options.emojiImage;
}

function getCanvas() {
	var emojiCanvas = document.getElementById('emoji');
	this.canvas = emojiCanvas;
	this.ctx = emojiCanvas.getContext('2d');
	this.flake = this.flake || [];
	var flakeLen = this.maxFlake;
	for (var i = 0; i < flakeLen; i++) {
		var newFlake = new createFlake(emojiCanvas.width, emojiCanvas.height, this.flakeSize, this.fallSpeed, this.emojiImage);
		this.flake.push(newFlake);
	}

}

function createFlake(width, height, flakeSize, fallSpeed, emojiImage) {
	//横坐标
	this.x = Math.floor(Math.random() * width);
	//纵坐标
	this.y = Math.floor(Math.random() * height * 1.5) - 1.5 * height;
	//大小
	this.size = Math.random() * flakeSize + 2;
	this.maxSize = flakeSize;
	this.speed = 1 * Math.random() + fallSpeed;
	this.fallSpeed = fallSpeed;
	this.velY = this.speed;
	this.velX = 0;
	this.stepSize = Math.random() / 30;
	this.step = 0;
	this.emojiImage = emojiImage
}

function clearCanvas() {

	var maxNum = this.maxFlake,
		newFlake = this.flake,
		ctx = this.ctx,
		canvas = this.canvas,
		_this = this;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < maxNum; i++) {
		newFlake[i].update();
		newFlake[i].render(ctx);

	}
	this.loop = requestAni(function() {
		clearCanvas.apply(_this)
	})
}
canvasInit.prototype.start = function() {
	getCanvas.apply(this);
	clearCanvas.apply(this);
};
canvasInit.prototype.stop = function() {
	this.pause();
	var e = this.ctx,
		t = this.canvas;
	e.clearRect(0, 0, t.width, t.height);
};
canvasInit.prototype.pause = function() {
	canvasInit(this.loop)
};
canvasInit.prototype.resume = function() {
	this.loop = requestAni(function() {
		clearCanvas.apply(that)
	})
}
createFlake.prototype.update = function() {
	this.x, this.y;
	this.velX *= .98;
	if (this.velY <= this.speed) {
		this.velX += Math.cos(this.step += .05) * this.stepSize * 5;
		this.y += this.velY;
		this.x += this.velX
	}
};
createFlake.prototype.reset = function(e, t) {
	this.x = Math.floor(Math.random() * e);
	this.y = 0;
	this.size = Math.random() * this.maxSize + 2;
	this.speed = 1 * Math.random() + this.fallSpeed;
	this.velY = this.speed;
	this.velX = 0
};
createFlake.prototype.render = function(e) {
	var img = new Image;
	img.src = this.emojiImage;
	if (img.complete) {
		e.drawImage(img, this.x, this.y, 84, 84)
	} else {
		img.onload = function() {
			e.drawImage(img, this.x, this.y, 84, 84)
		};
	}
};
window.emojiFall = canvasInit;
_emoji = new emojiFall({
	maxFlake: 20,
	fallSpeed: 10,
	emojiImage: "http://pic9.qiyipic.com/common/20160530/zbs61-dlam.gif"
})

function getDialog(userInfo) {
	var startInfo = {
		tnj: {
			id: "tnj",
			name: "童年君",
			avatar: "http://pic4.qiyipic.com/common/20160531/zbs61-tnj0531.jpg"
		},
		dlam: {
			id: "dlam",
			name: "多啦A梦",
			avatar: "http://pic7.qiyipic.com/common/20160531/zbs61-dlam0531.jpg"
		},
		sgj: {
			id: "sgj",
			name: "时光机",
			avatar: "http://pic7.qiyipic.com/common/20160531/zbs61-timer0531.jpg"
		},
		rym: {
			id: "rym",
			name: "任意门",
			avatar: "http://pic0.qiyipic.com/common/20160531/zbs61-rym.jpg"
		},
		rydht: {
			id: "rydht",
			name: "如果电话亭",
			avatar: "http://pic9.qiyipic.com/common/20160531/zbs61-phone0531.jpg"
		},
		sdsxs: {
			id: "sdsxs",
			name: "圣斗士星矢",
			avatar: "http://pic5.qiyipic.com/common/20160531/zbs61-sddxs0531.jpg"
		},
		kn: {
			id: "kn",
			name: "柯南",
			avatar: "http://pic6.qiyipic.com/common/20160531/zbs61-kn0531.jpg"
		},
		all: {
			id: "all",
			name: "阿拉蕾",
			avatar: "http://pic1.qiyipic.com/common/20160531/zbs61-all0531.jpg"
		},
		bbxy: {
			id: "bbxy",
			name: "百变小樱",
			avatar: "http://pic5.qiyipic.com/common/20160531/zbs61-xy0531.jpg"
		},
		tmyjr: {
			id: "tmyjr",
			name: "汤姆与杰瑞",
			avatar: "http://pic7.qiyipic.com/common/20160531/zbs61-tmj0531.jpg"
		},
		qbtzj: {
			id: "qbtzj",
			name: "丘比特之箭",
			avatar: "http://pic5.qiyipic.com/common/20160531/zbs61-qbtzj0531.jpg"
		},
		jymb: {
			id: "jymb",
			name: "记忆面包",
			avatar: "http://pic2.qiyipic.com/common/20160531/zbs61-jymb0531.jpg"
		},
		cldcd: {
			id: "cldcd",
			name: "催泪大彩蛋",
			avatar: "http://app.iqiyi.com/common/20160528/zbs61-egg.png"
		}
	};
	_members = $.extend(_members, startInfo);
	_dialog.disabled = [{
		type: "system",
		content: "生活就像一盒巧克力，要不断的进行新尝试哦！"
	}];
	//开篇
	_dialog.d0 = [{
		type: "system",
		content: "童年君邀请你加入了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.tnj,
		content: "儿童节不卖萌怎么行，给你召唤个老腊肉",
		pause: 1e3
	}, {
		type: "picture",
		author: _members.tnj,
		content: {
			src: "http://pic8.qiyipic.com/common/20160531/tfddlam-small.jpg",
			seq: 1
		},
		extra: "gallery",
		pause: 2e3
	}, {
		type: "plain",
		author: _members.me,
		content: "阔怕",
		pause: 2e3
	}, {
		type: "plain",
		author: _members.tnj,
		content: "Oh No，解锁方式混乱，其实是这样的",
	}, {
		type: "picture",
		author: _members.tnj,
		content: {
			src: "http://pic1.qiyipic.com/common/20160531/dlam-small.jpg",
			seq: 2
		},
		extra: "gallery",
		pause: 2e3
	}, {
		type: "plain",
		author: _members.me,
		content: "卡哇伊~，我是你的粉" + gif.welcome + gif.welcome,
		flag: "emoji-welcome",
		pause: 1e3
	}, {
		type: "system",
		content: "童年君邀请多啦A梦加入群聊",
		pause: 1e3
	}, {
		type: "video",
		author: _members.dlam,
		content: {
			video: "http://www.iqiyi.com/kszt/dlamh5phone.html",
			poster: "http://pic0.qiyipic.com/common/20160531/dlam-video53.jpg"
		},
		pause: 1e3
	}, {
		type: "plain",
		author: _members.dlam,
		content: "自行猛补功课。我想大雄了，这个道具留给你，拜了个拜",
		pause: 2e3
	}, {
		type: "picture",
		author: _members.dlam,
		content: {
			src: "http://pic2.qiyipic.com/common/20160531/dlamdkd-small.jpg",
			seq: 3
		},
		extra: "gallery",
		pause: 2e3
	}, {
		type: "system",
		content: "多啦A梦退出了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.tnj,
		content: "来看看这个神奇的口袋怎么玩",
		pause: 1e3
	}];


	//任意门
	_dialog.d1 = [{
		type: "system",
		content: "童年君邀请任意门加入群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.rym,
		content: "在这个星球上，不仅有人类，有疯狂的动物"
	}, {
		type: "picture",
		author: _members.rym,
		content: {
			src: "http://pic0.qiyipic.com/common/20160531/zbs61-swkd-qyqx0531.gif",
			seq: 4
		},

	}, {
		type: "picture",
		author: _members.rym,
		content: {
			src: "http://pic0.qiyipic.com/common/20160531/crazanimla0531.gif",
			seq: 5
		},

	}, {
		type: "plain",
		author: _members.rym,
		content: "还有诗和远方，你得去看看"
	}, {
		type: "plain",
		author: _members.me,
		content: "没钱"
	}, {
		type: "plain",
		author: _members.tnj,
		content: "好吧，我们都一样。再换一个道具，看看有什么惊喜吧"
	}];
	//时光机
	_dialog.d2 = [{
		type: "system",
		content: "童年君邀请时光机加入群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.sgj,
		content: "Hello，我是时光机，我可以带你回到童年哦"
	}, {
		type: "plain",
		author: _members.me,
		content: "宝宝等不及呐"
	}, {
		type: "video",
		author: _members.sgj,
		content: {
			video: "http://www.iqiyi.com/kszt/dlamh5phone2.html",
			poster: "http://pic7.qiyipic.com/common/20160531/hhh-video.jpg",
		}
	}, {
		type: "plain",
		author: _members.sgj,
		content: "刚才出现了什么奇怪的东西"
	}, {
		type: "plain",
		author: _members.me,
		content: "嘻嘻，假装什么都没有看见"
	}, {
		type: "plain",
		author: _members.sgj,
		content: "童年是个什么模样"
	}, {
		type: "plain",
		author: _members.tnj,
		content: "我来呐，给你看这个，相信你能找回童年"
	}, {
		type: "video",
		author: _members.sgj,
		content: {
			video: "http://www.iqiyi.com/kszt/dlamh5phone3.html",
			poster: "http://pic1.qiyipic.com/common/20160531/zuihaiwomen-video.jpg",
		}
	}, {
		type: "plain",
		author: _members.tnj,
		content: "是不是已经记起来些什么了，换换其他道具试试看吧"
	}];
	//如意电话停
	_dialog.d3 = [{
		type: "system",
		content: "童年君邀请如果电话亭加入了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.rydht,
		content: "我知道你在想什么，让我帮你实现",
		pause: 2e3
	}, {
		type: "system",
		content: "童年君邀请如果圣斗士星矢、柯南、阿拉蕾、百变小樱、汤姆与杰瑞加入了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.sdsxs,
		content: "你好~我们一起去拯救世界，保护女王吧"
	}, {
		type: "plain",
		author: _members.kn,
		content: "现代的福尔摩斯就是我，与我一起拯救人类吧"
	}, {
		type: "plain",
		author: _members.all,
		content: "哦呦呦~~~要和我一起玩吗"
	}, {
		type: "plain",
		author: _members.bbxy,
		content: "请与我签下契约吧"
	}, {
		type: "plain",
		author: _members.tmyjr,
		content: "/\（￣︶￣）/"
	}, {
		type: "plain",
		author: _members.me,
		content: "不了，我好萌，我要自己玩",
		pause: 2e3
	}, {
		type: "system",
		content: "你的朋友 圣斗士星矢 已下线"
	}, {
		type: "system",
		content: "你的朋友万年小学生（柯南）已下线"
	}, {
		type: "system",
		content: "你的朋友 阿拉蕾 已下线"
	}, {
		type: "system",
		content: "你的朋友百变小樱（木之本樱）已下线"
	}, {
		type: "system",
		content: "你的朋友 汤姆与杰瑞 已下线"
	}, {
		type: "plain",
		author: _members.rydht,
		content: "你这么傲娇！好啦，大家有事情都先走了"
	}, {
		type: "plain",
		author: _members.rydht,
		content: "那再来试试看其他的道具吧"
	}];

	//记忆面包
	_dialog.d4 = [{
		type: "system",
		content: "童年君邀请如果记忆面包加入了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.me,
		content: "学霸，学习太痛苦了求帮助"
	}, {
		type: "plain",
		author: _members.jymb,
		content: "少年不要怕，我这里有适合你的好方式"
	}, {
		type: "picture",
		author: _members.jymb,
		content: {
			src: "http://pic9.qiyipic.com/common/20160528/201305041010160936.gif",
			seq: 6
		},

		pause: 1e3
	}, {
		type: "plain",
		author: _members.jymb,
		content: "拿错了拿错了，应该是介个"
	}, {
		type: "picture",
		author: _members.jymb,
		content: {
			src: "http://pic5.qiyipic.com/common/20160531/dengcxb-small.jpg",
			seq: 6
		},
		extra: "gallery",
	}, {
		type: "plain",
		author: _members.me,
		content: "邓超!等等我知道你要讲什么了…"
	}, {
		type: "picture",
		author: _members.jymb,
		content: {
			src: "http://pic2.qiyipic.com/common/20160528/zbs61-tbdb.png",
			seq: 6
		},

	}, {
		type: "video",
		author: _members.jymb,
		content: {
			video: "http://www.iqiyi.com/kszt/dlamh5phone4.html",
			poster: "http://pic3.qiyipic.com/common/20160531/paonan-video.jpg",
		}
	}, {
		type: "plain",
		author: _members.jymb,
		content: "超叔建议大家多泡图书馆，爱奇艺喊你过来领略超叔风采~Mua~"
	}];

	//丘比特之箭
	_dialog.d5 = [{
		type: "system",
		content: "童年君邀请丘比特之箭加入了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.qbtzj,
		content: "是不是当年小鹿到处乱撞，却不知道如何示好"
	}, {
		type: "plain",
		author: _members.me,
		content: "你好懂哦"
	}, {
		type: "plain",
		author: _members.qbtzj,
		content: "要是当年有这个，估计你就会多份坚持了吧"
	}, {
		type: "picture",
		author: _members.qbtzj,
		content: {
			src: "http://pic5.qiyipic.com/common/20160531/nnqc-small1.jpg",
			seq: 7
		},
		extra: "gallery",
	}, {
		type: "plain",
		author: _members.me,
		content: "男神女神耶"
	}, {
		type: "plain",
		author: _members.qbtzj,
		content: "借你舔舔"
	}, {
		type: "picture",
		author: _members.me,
		content: {
			src: "http://pic4.qiyipic.com/common/20160530/zbs61-hhd.jpg",
			seq: 7
		},

	}, {
		type: "plain",
		author: _members.qbtzj,
		content: "赶紧观摩下《那年青春，我们正好》，大胆与身边喜欢的TA表白吧",

	}, {
		type: "video",
		author: _members.qbtzj,
		content: {
			video: "http://www.iqiyi.com/kszt/dlamh5phone5.html",
			poster: "http://pic0.qiyipic.com/common/20160531/nanianqc-video.jpg",
		}

	}, {
		type: "plain",
		author: _members.qbtzj,
		content: "我要走了，再来看看其他神奇的道具吧",

	}, {
		type: "plain",
		author: _members.me,
		content: "这么捉急！"
	}, {
		type: "plain",
		author: _members.qbtzj,
		content: "爱像一阵风，龙卷风",

	}];

	//催泪大彩蛋
	_dialog.d6 = [{
		type: "system",
		content: "童年君邀请催泪大彩蛋加入了群聊",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.tnj,
		content: "无论是大朋友，还是小同学在爱奇艺都能收获童年的快乐"
	}, {
		type: "plain",
		author: _members.tnj,
		content: "爱奇艺最懂你，Mua~",
		pause: 2e3
	}, {
		type: "plain",
		author: _members.me,
		content: "非常谢谢童年君，请问我可以把聊天记录分享给我的朋友们吗",
		pause: 2e3
	}, {
		type: "plain",
		author: _members.tnj,
		content: "当然可以，非常高兴认识你",
		pause: 2e3
	}, {
		type: "plain",
		author: _members.me,
		content: "请问我可以经常见到你吗",
		pause: 1e3
	}, {
		type: "plain",
		author: _members.tnj,
		content: "当然没问题啦，来爱奇艺吧，祝宝宝六一快乐"
	}, {
		type: 'system',
		content: '温馨提示:<br/>本策划由懂你爱你的<br/><span style="font-size:1rem">爱奇艺总编室出品</span><br/>六一我们一起手拉手<br/>Hold住欢乐童年',
		stop: 'true'
	}]



}


function epop() {}
epop.prototype = {
	linkAdd: function(e) {
		return this._last ? this._last = this._last._next = {
			el: e,
			_next: null
		} : this._last = this._first = {
			el: e,
			_next: null
		}
	}
};

function createDia(dialog) {
	var sInfoLen = dialog.length;
	var newEpop = new epop();
	for (var i = 0; i < sInfoLen; i++) {
		newEpop.linkAdd(dialog[i]);
	}
	return newEpop;

}

function getSpeed(dialog, callback) {
	$(".box_ft").find(".input-wrapper").removeClass("J_inputWrapper");
	var sText = dialog._first;

	function repeat(speed) {
		void 0 == speed && (speed = 1000 * Math.random() + 800);
		var timer = setTimeout(function() {
			if (sText) {
				chatContent.append(dotTpl([sText.el]));
				//消息推送声音
				pMsgAudio.play();
				if (sText.el.flag) {
					var flg = sText.el.flag;
					switch (flg) {
					case "emoji":
						_emoji.stop();
						_emoji.start();
						break;
					case "emoji-welcome":
						var h = new emojiFall({
							maxFlake: 15,
							fallSpeed: 15,
							emojiImage: "http://pic9.qiyipic.com/common/20160530/zbs61-dlam.gif"
						});
						h.start();
						break;
					case "playVideo":
						break;
					}
				}



				if (sText.el.pause) {
					repeat(sText.el.pause);
					sText = sText._next;
				} else {
					sText = sText._next;
					repeat();
				}
				var chatHeight = chatContent.height();
				var wrapeChatHeight = $(".J_scrollContent").height();
				$(".J_scrollContent").scrollSmooth(chatHeight - wrapeChatHeight + 36, 300);
				//	
			} else {
				clearTimeout(timer);
				$(".box_ft").find(".input-wrapper").addClass("J_inputWrapper")
				callback();
			}

		}, speed);
	}
	repeat(0);
}

function closeChoice() {
	$(".box_bd").goSmooth(0, 100);
	$(".J_inputWrapper").removeClass("opened");
	$(".J_choiceWrapper").removeClass("opened")
}

function slectedChoice(choiceNo, time) {
	$(".J_noticeInput").hide();
	$(".J_choiceWrapper").find(".J_choice").hide();
	var ttime = time || 100;
	var cno = choiceNo || 0;
	setTimeout(function() {
		$(".J_choiceWrapper").addClass("opened");
		$(".J_inputWrapper").addClass("opened");
		var choiceUl = $(".J_choiceWrapper").find(".J_choice").filter('[data-choice="' + cno + '"]'),
			choiceUlHeight = choiceUl.addClass("choosen").show().height(),
			boxFotHeight = $(".box_ft").height(),
			chatHeight = $("#chatContent").height();
		$(".box_bd").goSmooth(choiceUlHeight);
		$(".J_scrollContent").scrollSmooth(boxFotHeight + chatHeight, 300);

	}, ttime);
}
//主程序入口处
var preload = new createjs.LoadQueue(true);
preload.on('fileload', handleFileLoad);
preload.on("progress", handleFileProgress);
preload.on('complete', loadComplete);
preload.loadManifest(manifest);
//处理单个文件加载

function handleFileLoad(event) {

}
//已加载完毕进度

function handleFileProgress(event) {
	// body...event.loaded || preload.progress

	$("#progressing").text("已加载 " + Math.round(event.loaded * 100) + "%");
}
//全部加载完毕

function loadComplete(event) {
	$(".loadingMask").hide();
	var time = new Date();
	var yue = time.getMonth() + 1;
	var ri = time.getDate();
	var hour = time.getHours();
	var fen = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes();
	var miao = time.getSeconds();
	var xq = time.getDay();
	var xqj = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	$(".hour").text(hour);
	if(hour<10){
		$("#time2 .hour").html("早上"+hour);
	}else if(hour<12){
		$("#time2 .hour").html("上午"+hour);
	}else if(hour<19){
		$("#time2 .hour").html("上午"+hour);
	}else{
		$("#time2 .hour").html("晚上"+hour);
	}
	$(".fen").text(fen);
	$(".date").html(yue + "月" + ri + "日");
	$(".day").text(xqj[xq]);
	newMsg.play();
	$(".slide1").on('touchstart', function(e) {
		$(this).fadeOut();
		newMsg.pause();
		$(".slide2").show();
		$("#msg1").on('touchstart', function() {
			$(".slide2").fadeOut();
			$(".chat").show();
			_members.me = me;
			var imgArr = [''];
			getDialog();
			//将前几个内容推出来

			var sDialog = createDia(_dialog.d0);
			//推出内容的后续
			getSpeed(sDialog, function() {
				//出现提问按钮
				$(".input-wrapper p").show();
			});
		});

	});



	//点击底部----选项----按钮,出现选项，每一个选项点击时进行的操作
	//操作有：获取第几个对话的信息----2.选中后，置灰---3.选项消失
	$(".box_ft").on("click", ".J_choice .J_liNext", function(e) {
		e.preventDefault();
		e.stopPropagation();
		if ($(this).hasClass('disabled')) {
			//关闭对话框
			closeChoice();
			var s2Dialog = createDia(_dialog.disabled);
			getSpeed(s2Dialog, function() {
				//继续对话
				if (!iScontinue) {
					//出现提问按钮
					$(".input-wrapper p").show();
					$(".J_choiceWrapper").find(".J_choice").removeClass("choosen");
					$(".J_choiceWrapper").find(".J_choice").filter('[data-choice="' + choiceNo + '"]').addClass("choosen");
				} else {
					$(".input-wrapper p").hide();
				}
			});
		} else {
			var _this = $(this),
				dialogNo = _this.attr("data-target-dialog"),
				//第几个对话信息
				choiceNo = _this.attr("data-target-choice"),
				//第几个选项
				iScontinue = _this.attr("data-continue"); //是否结束对话
			$(".J_mainChoice").find('.J_liNext[data-target-dialog="' + dialogNo + '"]').addClass("disabled");

			//关闭对话框
			closeChoice();

			//弹出消息
			var s2Dialog = createDia(_dialog['d' + dialogNo + '']);
			getSpeed(s2Dialog, function() {
				//继续对话
				if (!iScontinue) {
					//出现提问按钮
					$(".input-wrapper p").show();
					$(".J_choiceWrapper").find(".J_choice").removeClass("choosen");
					$(".J_choiceWrapper").find(".J_choice").filter('[data-choice="' + choiceNo + '"]').addClass("choosen");
					//slectedChoice(choiceNo, 500);
				} else {
					$(".input-wrapper p").hide();
					setTimeout(function() {
						$(".shareMask").show();
					}, 500);
				}
			});
		}


		//$(".J_mainChoice").find(".J_liNext").not(".disabled"); 
	});
	//点击底部
	$(document).on("click", ".J_inputWrapper", function() {
		var e = $(".J_choice").filter(".choosen").attr("data-choice") || 0;
		if ($(".J_choiceWrapper").hasClass("opened")) {
			closeChoice();
		} else {
			slectedChoice(e, 300);
		}
	});
	//图片点击显示大图
	$(document).on("click", ".J_galleryShow", function(e) {
		var seq = $(this).attr("data-seq") - 1;
		$(".J_gallerySlide").find("img").each(function(index) {
			var imgSrc = $(this).attr("data-origin");
			$(this).attr("src", imgSrc);
		});

		$(".J_galleryOverlay").filter('[data-gallery="1"]').show();
		$(".J_gallerySlide").css({
			"line-height": $(window).height() + "px"
		});

		$(".J_gallerySlide").find("figure").eq(seq).show().siblings().hide();
		var close = $(".J_galleryClose");
		close.on("click", function() {
			$(".J_galleryOverlay").hide()
		})
	});
	//点击视频，出现播放框
	$(document).on("click", ".J_fpVideo", function(e) {
		var videoSrc = $(this).attr("data-src"),
			a = $(".J_videoOverlay");
		if (videoSrc) {
			var videoIframe = document.createElement("iframe");
			videoIframe.src = videoSrc, $(videoIframe).attr({
				frameborder: 0,
				allowfullscreen: false
			});
			$(".J_videoOverlay").show().find(".J_videoWrapper").append(videoIframe)
		}
		$(".J_videoClose").on('click', function() {
			$(videoIframe).remove();
			$(".J_videoOverlay").hide();
		});
	});
	$(".shareMask").on('click', function() {
		$(this).hide();
	});
}