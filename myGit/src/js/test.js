(function($) {
	var defaults = {
		'container': '#container',
		'sections': '.section',
		'easing': 'ease',
		'duration': 1000,
		'pagination': true,
		'loop': false,
		'keyboard': true,
		'direction': 'vertical',
		'pages': '#pages',
		'onpageSwitch': function(pagenum) {}
	};

	var win = $(window),
		container, sections;

	var opts = {},
		canScroll = true;

	var iIndex = 0;

	var arrElement = [];

	var SP = $.fn.switchPage = function(options) {
			opts = $.extend({}, defaults, options || {});

			container = $(opts.container), sections = container.find(opts.sections);
			sections.each(function() {
				arrElement.push($(this));
			});
			return this.each(function() {

				if (opts.direction == "horizontal") {
					initLayout();
				}

				if (opts.keyboard) {
					keyDown();
				}
				sliderClick();
			});
		}


	SP.moveSectionUp = function() {
		if (iIndex) {
			iIndex--;
			scrollPage(arrElement[iIndex]);
		}

	};


	SP.moveSectionDown = function() {
		if (iIndex < (arrElement.length - 1)) {
			if(iIndex==0){
					var str='http://7xrd9l.com1.z0.glb.clouddn.com/ht-earth2.mp4';
					$("#section0").find("video").attr("src",str);
			}
			iIndex++;
			scrollPage(arrElement[iIndex], iIndex);
		}

	};


	function scrollPage(element, iIndex) {
		var dest = element.position();
		if (typeof dest === 'undefined') {
			return;
		}
		initEffects(dest, element, iIndex);
	}


	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);

	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if (canScroll) {
			if (delta < 0) {
				SP.moveSectionDown();
			} else {
				SP.moveSectionUp();
			}
		}
		return false;
	}


	function initLayout() {
		var length = sections.length,
			width = (length * 100) + "%",
			cellWidth = (100 / length).toFixed(2) + "%";
		container.width(width).addClass("left");
		sections.width(cellWidth).addClass("left");
	}


	function paginationHandler() {
		var pages = $("#pages li");
		pages.eq(iIndex).addClass("active").siblings().removeClass("active");
	}

	function isSuportCss(property) {
		var body = $("body")[0];
		for (var i = 0; i < property.length; i++) {
			if (property[i] in body.style) {
				return true;
			}
		}
		return false;
	}


	function initEffects(dest, element, iIndex) {
		var transform = ["-webkit-transform", "-ms-transform", "-moz-transform", "transform"],
			transition = ["-webkit-transition", "-ms-transition", "-moz-transition", "transition"];

		canScroll = false;
		var cssObj = (opts.direction == "horizontal") ? {
			left: -dest.left
		} : {
			top: -dest.top
		};
		container.animate(cssObj, opts.duration, function() {
			canScroll = true;
		});
		if (arrElement[iIndex - 1]) {
			var shtml = arrElement[iIndex - 1].find(".conten_wrap").html();
			if (shtml != '') {
				return;
			} else {
				
				var templ = arrElement[iIndex - 1].find(".templ").html();
				arrElement[iIndex - 1].find(".conten_wrap").html(templ);
			}

		}
		element.addClass("active").siblings().removeClass("active");
		paginationHandler();


	}


	var resizeId;
	// win.resize(function(){
	// 	clearTimeout(resizeId);
	// 	resizeId = setTimeout(function(){
	// 		reBuild();
	// 	},500);
	// });

	function reBuild() {
		var currentHeight = win.height(),
			currentWidth = win.width();

		var element = arrElement[iIndex];
		if (opts.direction == "horizontal") {
			var offsetLeft = element.offset().left;
			if (Math.abs(offsetLeft) > currentWidth / 2 && iIndex < (arrElement.length - 1)) {
				iIndex++;
			}
		} else {
			var offsetTop = element.offset().top;
			if (Math.abs(offsetTop) > currentHeight / 2 && iIndex < (arrElement.length - 1)) {
				iIndex++;
			}
		}
		if (iIndex) {
			paginationHandler();
			var cuerrentElement = arrElement[iIndex],
				dest = cuerrentElement.position();
			initEffects(dest, cuerrentElement);
		}
	}

	function keyDown() {
		var keydownId;
		win.keydown(function(e) {
			clearTimeout(keydownId);
			keydownId = setTimeout(function() {
				var keyCode = e.keyCode;
				if (keyCode == 37 || keyCode == 38) {
					SP.moveSectionUp();
				} else if (keyCode == 39 || keyCode == 40) {
					SP.moveSectionDown();
				}
			}, 150);
		});
	}

	function sliderClick() {
		$("#pages").find("li").each(function(index) {
			$(this).click(function() {
				//iIndex=index;
				var seq = $(this).attr("data-seq");
				var cuerrentElement = arrElement[seq],
					dest = cuerrentElement.position();
				initEffects(dest, cuerrentElement, seq);

			});
		});
		$("#htqt").on('click',function(){
			var cuerrentElement = arrElement[5],
				dest = cuerrentElement.position();
				initEffects(dest, cuerrentElement, 5);
		});
	}
})(jQuery);