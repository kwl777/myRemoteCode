/*
移动端滑屏效果
*/
// PageSlide接收三个参数:页面元素,要设定的滑动方向,可选的扩展函数
var PageSlide = function(el, swipe, options) {
    this.options = options || {}; //可选函数
    this.current = 0;  //当前页面索引
    this.pageX;  //横向的手指落点
    this.pageY;  //纵向的手指落点
    this.height; //设备高度
    this.width;  //设备宽度
    this.flag;  //判断滑动方向的变量
    this.move;  //滑动的距离
    this.$el = el; //当前页面的对象
    this.swipe = swipe || 'X'; //滑动方向参数
    this.resize().init().bindEvents(); //初始化
}
PageSlide.prototype.init = function(i) {
    var current = i ? this.$el.children[i] : this.$el.firstElementChild;
    if (!current) throw 'ERROR';
//moving类名作为当前滑动页面的标记,也在样式中作滑动的扩展效果
    current.classList.add('moving');
    current.style.webkitTransform = 'translate3d(0,0,0)';
    current.style.transform = 'translate3d(0,0,0)';
    current.style.mozTransform = 'translate3d(0,0,0)';
//以swipe的值预设置其他页面的宽高，获得流畅的交互效果
for(var i = 1; i <this.$el.children.length ; i++){
        this['set' + this.swipe](this.$el.children[i],  (this.swipe === 'X' ? this.width : this.height))
        };
    setTimeout(function() {
        current.classList.remove('moving')
        current.classList.add('play')
    }, 3e2);
    return this
};
//为页面绑定各种事件的绑定函数
PageSlide.prototype.bindEvents = function() {
    var self = this;
    window.addEventListener('resize orientationchange', this.resize.bind(this), false);
    'touchstart touchmove touchend touchcancel'.split(' ').forEach(function(evn) {
   //将四个触控函数（申明在后面）绑定到每个页面
        self.$el.addEventListener(evn, self[evn].bind(self), false);
    });
}
//获得当前触控的页面对象
PageSlide.prototype.getCurrent = function() {
    return this.$el.children[this.current];
};
//初始化时获得设备的宽高
PageSlide.prototype.resize = function() {
    this.width = this.$el.parentNode.clientWidth;
    this.height = this.$el.parentNode.clientHeight;
    return this;
};
//到达任意页面的random()方法
PageSlide.prototype.random = function() {
    var count = this.$el.children.length;
    var current = this.current;
    var arr = [];
    var num;
    for (var i = 0; i < count; i++) {
        if (i !== current) arr.push(i.toString())
    };
    num = Math.floor(Math.random() * arr.length);
    this.direct(+arr[num]);
}
// 四个内建的滑动事件函数,与前面绑定函数相呼应
PageSlide.prototype.touchstart = function(e) {
    var touches = e.touches[0];
    //触控开始
    this.flag = null;
    this.move = 0;
    //记录落点
    this.pageX = touches.pageX;
    this.pageY = touches.pageY;
};
PageSlide.prototype.touchmove = function(e) {
    var touches = e.touches[0];;
    var X = touches.pageX - this.pageX;
    var Y = touches.pageY - this.pageY;
    var current = this.getCurrent();
    var next = current.nextElementSibling;
    var prev = current.previousElementSibling;
    //添加移动样式
    if (!this.flag) {
        this.flag = Math.abs(X) > Math.abs(Y) ? 'X' : 'Y';
        if (this.flag === this.swipe) {
            current.classList.add('moving');
            next && next.classList.add('moving');
            prev && prev.classList.add('moving');
        };
    };
    if (this.flag === this.swipe) {
        e.preventDefault();
        e.stopPropagation();
        switch (this.swipe) {
            case 'X':
                //swipe horizontal
                this.move = X;
                this.setX(current, X);
                next && (this.setX(next, X + this.width));
                prev && (this.setX(prev, X - this.width));
                break;
            case 'Y':
                //swipe vertical
                this.move = Y;
                this.setY(current, Y);
                next && (this.setY(next, Y + this.height));
                prev && (this.setY(prev, Y - this.height));
                break;
        }
    }
}
PageSlide.prototype.touchend = function(e) {
    var minRange = 50;
    var move = this.move;
    var current = this.getCurrent();
    var next = current.nextElementSibling;
    var prev = current.previousElementSibling;
    current.classList.remove('moving');
    next && next.classList.remove('moving');
    prev && prev.classList.remove('moving');
    if (!this.flag) return;
    e.preventDefault();
   //滑动结束前往下一页面,next()方法调用了go()方法
    if (move < -minRange && next) return this.next();
    if (move > minRange && prev) return this.prev();
    this.reset();
}
PageSlide.prototype.touchcancel = function(e) {
    var current = this.getCurrent();
    var next = current.nextElementSibling;
    var prev = current.previousElementSibling;
    current.classList.remove('moving');
    next && next.classList.remove('moving');
    prev && prev.classList.remove('moving');
    this.reset();
}
//动态设定translate3d参数方法
PageSlide.prototype.setX = function(el, x, unit) {
    el && (el.style.webkitTransform = 'translate3d(' + x + (unit || 'px') + ',0,0)');
    el && (el.style.transform = 'translate3d(' + x + (unit || 'px') + ',0,0)');
    el && (el.style.mozTransform = 'translate3d(' + x + (unit || 'px') + ',0,0)');
};
PageSlide.prototype.setY = function(el, y, unit) {
    el && (el.style.webkitTransform = 'translate3d(0,' + y + (unit || 'px') + ',0)');
    el && (el.style.mozTransform = 'translate3d(0,' + y + (unit || 'px') + ',0)');
    el && (el.style.transform = 'translate3d(0,' + y + (unit || 'px') + ',0)');
};
//设置当前触控页面translate3d参数为0的方法
PageSlide.prototype.setCurrent = function(el, i) {
    el && (el.style.webkitTransform = 'translate3d(0,0,0)');
   
    if (i) {
        this.current = i;
        this.$current = this.$el.children[i];
    }
}
//调用go()方法前往下一或上一页面
PageSlide.prototype.next = function() {
    this.go(this.current + 1);
};
PageSlide.prototype.prev = function() {
    this.go(this.current - 1);
};
//重置方法,用于初始化以及当前页面的重置
PageSlide.prototype.reset = function() {
    var width = this.width;
    var height = this.height;
    var swipe = this.swipe;
    var current = this.getCurrent();
    var prev = current.previousElementSibling;
    var next = current.nextElementSibling;
    this.setCurrent(current);
    prev && (this['set' + swipe](prev, -(swipe === 'X' ? width : height)));
    next && (this['set' + swipe](next, swipe === 'X' ? width : height));
}
//去往下一或上一页面的go方法
PageSlide.prototype.go = function(i) {
    var onFinish = this.options.onFinish;
    var current = this.getCurrent();
    var total = this.$el.childElementCount;
    var target = this.$el.children[i];
    var d = i < this.current ? -1 : 1;
    if (i === this.current || i < 0 || i >= total) return;
    if (onFinish && (typeof onFinish === 'function')) onFinish.call(this, i);
    // 滑动完成调用方法
    typeof this.options.tranSetionEnd ==='function' && this.options.tranSetionEnd.call(this);
    this.current = i;
    this['set' + this.swipe](current, -d * (this.swipe === 'X' ? this.width : this.height)); //问题所在
    this.setCurrent(target, i);
    this.finish(current, target);
};
//滑动完成后删除当前页面.play标记以及为下一页面添加.play标记
PageSlide.prototype.finish = function(curr, target) {
    this.flag = null;
    setTimeout(function() {
        curr && curr.classList.remove('play');
        target && target.classList.add('play');
    }, 3e2);
};
//直达任意页面的方法
/*直达某一页面的方法, 因为个人研究的需要,写了这个方法,要从任意页面开始滑动依然能保持正常的滑动体验,就需要将直达页面的前面所有页面的translate3d参数都设置为(0,-height,0)  */
PageSlide.prototype.direct = function(i){
    if(i&&typeof(i)==='number'){
        this.go(i);
        for(var j = 0; j< i ;j++) {
            this['set' + this.swipe](this.$el.children[j], -1 * (this.swipe === 'X' ? this.width : this.height));      
            };
    }
    else  return;
};