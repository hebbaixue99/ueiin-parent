(function($) {
 
	$.fn.scrollFix = function(options) {
		return this
				.each(function() {
					var mytouch="";
					var mydoc = document;
					var myscroll;
					var myheader;
					var fixed = false;
					var opts = $.extend({}, $.fn.scrollFix.defaultOptions,
							options);
					var obj = $(this)[0], base = this, selfTop = 0, selfLeft = 0, toTop = 0, parentOffsetLeft = 0, parentOffsetTop = 0, outerHeight, outerWidth, objWidth = 0, placeholder = jQuery('<div>'), // 创建一个jquery对象
					optsTop = opts.distanceTop, // 定义到顶部的高度
					mydoc = opts.mydoc[0], myscroll = opts.myscroll[0], myheader = opts.myheader[0], endfix = 0; // 开始停止固定的位置
					var originalScrollTop;
					var originalPosition;
					var originalOffsetTop;
					var originalZIndex;
					var lastOffsetLeft = -1;
					var isUnfixed = true;
					// 如果没有找到节点，不进行处理
					if (obj.length <= 0) {
						return;
					}
					if (lastOffsetLeft == -1) {
						originalZIndex = obj.style.zIndex;
						position = obj.style.position;
						originalPosition = obj.style.position;
						originalOffsetTop = obj.style.top;
					}

					var zIndex = obj.style.zIndex;
					if (opts.zIndex != 0) {
						zIndex = opts.zIndex;
					}
					// 获取相对定位或者绝对定位的父类
					var parents = obj.parentNode;
					var Position = parents.style.position;
					while (!/^relative|absolute$/i.test(Position)) { // 检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
						parents = parents.parentNode;
						Position = parents.style.positon;//  .css('position');
						if (/^body|html$/i.test(parents.tagName))
							break; // 假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
					}

					var ie6 = !-[ 1, ] && !window.XMLHttpRequest; // 兼容IE6
					var resizeWindow = false;

					function resetScroll() {
						setUnfixed();
						selfTop = obj.offsetTop; // 对象距离顶部高度
						originalScrollTop = obj.offsetTop;
						selfLeft = obj.offsetLeft; // 对象距离左边宽度
						outerHeight = obj.clientHeight; // 对象高度
						outerHeight = parseFloat(outerHeight)
								+ parseFloat(obj.style.marginBottom.replace(
										/auto/, 0));
						outerWidth = obj.clientWidth; // 对象外宽度
						objWidth = obj.clientWidth;
						var documentHeight = $(mydoc)[0].clientHeight; // 文档高度
						var startTop = $(opts.startTop)[0], // 开始浮动固定对象
						startBottom = $(opts.startBottom)[0], toBottom, // 停止滚动位置距离底部的高度
						ScrollHeight; // 对象滚动的高度

						// 计算父类偏移值
						if (/^body|html$/i.test(parents.tagName)) { // 当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
							parentOffsetTop = 0, parentOffsetLeft = 0;
						} else {
							parentOffsetLeft = parents.offset().left,
									parentOffsetTop = parents.offset().top;
						}

						// 计算父节点的上边到顶部距离
						// 如果 body 有 top 属性, 消除这些位移
						var bodyToTop = parseInt($('body')[0].style.top, 10);
						if (!isNaN(bodyToTop)) {
							optsTop += bodyToTop;
						}
						// 计算停在底部的距离
						if (!isNaN(opts.endPos)) {
							toBottom = opts.endPos;
						} else {
							toBottom = parseFloat(documentHeight
									- $(opts.endPos)[0].offsetTop);
						}
						// 计算需要滚动的高度以及停止滚动的高度
						ScrollHeight = parseFloat(documentHeight - toBottom
								- optsTop);
						endfix = parseFloat(ScrollHeight - outerHeight);
						// 计算顶部的距离值
						if (startTop[0]) {
							var startTopOffset = startTop.offset(), startTopPos = startTopOffset.top;
							selfTop = startTopPos;
						}
						 

						toTop = selfTop - optsTop;
						toTop = (toTop > 0) ? toTop : 0;

						var selfBottom = documentHeight - selfTop - outerHeight;
						// 如果滚动停在底部的值不为0，并且自身到底部的高度小于上面这个值，不执行浮动固定
						if ((toBottom != 0) && (selfBottom <= toBottom)) {
							return;
						}

					}
					function setUnfixed() {
						if (!isUnfixed) {
							lastOffsetLeft = -1;
							placeholder.style.display = "none";
							obj.style.zindex = originalZIndex ;
							obj.style.width="";
							obj.style.position= originalPosition;
							obj.style.left="";
							obj.style.top=originalOffsetTop;
							obj.style.myginLeft="";
							o/*bj.css({
								'z-index' : originalZIndex,
								'width' : '',
								'position' : originalPosition,
								'left' : '',
								'top' : originalOffsetTop,
								'margin-left' : ''
							});*/
							//obj.removeClass('scrollfixed');
							isUnfixed = true;
						}
					}

					function onScroll() {
						lastOffsetLeft = 1;
						var ScrollTop = 0 -mydoc.offsetTop;  

						var a = mydoc;
						var b = myscroll;

						if (opts.bottom != -1) {
							ScrollTop = ScrollTop + $(window)[0].height()
									- outerHeight - opts.bottom;
						}
						if (ScrollTop > toTop && (ScrollTop < endfix)) {
							 
								/*
								 * obj.addClass(opts.baseClassName).css({
								 * "z-index": zIndex, "position": "fixed",
								 * "top": opts.bottom == -1 ? optsTop+ScrollTop :
								 * '', "bottom": opts.bottom == -1 ? '' :
								 * opts.bottom, "left": selfLeft, "width":
								 * objWidth });
								 */

							 
							if (fixed == false) {
								placeholder.css({
									'height' : outerHeight,
									'width' : outerWidth,
									'display' : 'block',
									'background' : 'red'
								}).insertBefore(obj);
								
								$(obj).appendTo(myheader);
								fixed = true;
							}

						} else if (ScrollTop >= endfix) {
							/*
							 * obj.addClass(opts.baseClassName).css({ "z-index":
							 * zIndex, "position": "absolute", "top": endfix -
							 * parentOffsetTop + optsTop, 'bottom': '', "left":
							 * selfLeft - parentOffsetLeft, "width": objWidth
							 * });
							 */
							if (fixed == false) {
								placeholder.css({
									'height' : outerHeight,
									'width' : outerWidth,
									'display' : 'block',
									'background' : 'red'
								}).insertBefore(obj);
								$(obj).appendTo(myheader);
								fixed = true;
							}
						} else {
							/*
							 * obj.removeClass(opts.baseClassName).css({
							 * "z-index": originalZIndex, "position": "static",
							 * "top": "", "bottom": "", "left": "" });
							 */
							// placeholder.insertBefore(obj);
							if (fixed) {
								obj.insertBefore(placeholder);
								placeholder.remove();
								fixed = false;
							}

						}
					}
					var Timer = 0;
					// if (isUnfixed) {case 'scrollstart': scrollend
					// touchstart,touchend,touchmove
					resetScroll();
					// }
					$(mydoc).on("scroll", function() {
						$("#my").text("scroll");
						onScroll();
						/*if (Timer) {
							clearTimeout(Timer);
						}
						Timer = setTimeout(onScroll, 0);*/
						if (mytouch=="touchend")
							{
							  $("#my").text("timeend");
							if (Timer) {
							   clearInterval(Timer) ;
							}	
							}
					});

					 window.addEventListener('touchstart', function(e) {
						// do touchstart
						 $("#my").text("touchstart");
						 mytouch = "touchstart";
					/*	if (Timer) {
							clearTimeout(Timer);
						}
						Timer = setTimeout(onScroll, 0);*/
					});
					window.addEventListener('touchmove', function(e) {
						// do touchmove
						$("#my").text("touchmove");
						mytouch = "touchmove";

						//Timer = setTimeout(onScroll, 0);
					});
					window.addEventListener('touchend', function(e) {
						// do touchend
						$("#my").text("touchend");
						mytouch = "touchend";	 
						if (Timer) {
							clearInterval(Timer);
						}
						Timer = setInterval(onScroll, 10);
					}); 

					// 当发现调整屏幕大小时，重新执行代码
					$(window).on("resize", function() {
						if (Timer) {
							clearTimeout(Timer);
						}
						Timer = setTimeout(function() {
							isUnfixed = false;
							resetScroll();
							onScroll();
						}, 0);
					});
				})
	}
	$.fn.scrollFix.defaultOptions = {
		startTop : null, // 滑到这个位置顶部时开始浮动，默认为空
		startBottom : null, // 滑到这个位置末端开始浮动，默认为空
		distanceTop : 0, // 固定在顶部的高度
		endPos : 0, // 停靠在底部的位置，可以为jquery对象
		bottom : -1, // 底部位置
		zIndex : 0, // z-index值
		baseClassName : 'scrollfixed' // 开始固定时添加的类
	};
})(mui);