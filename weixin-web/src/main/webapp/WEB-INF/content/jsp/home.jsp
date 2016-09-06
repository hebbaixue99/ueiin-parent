<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<base href="${pageContext.request.contextPath}/"> 
<meta charset="utf-8">
<title>中信e家</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="stylesheet" href="static/css/mui.min.css">
<link rel="stylesheet" href="static/css/index.css">
</head>
<body>
	<!-- 底部导航开始 -->
	<nav class="mui-bar mui-bar-tab">
	</nav>
	<!-- 底部导航结束 -->
	
	<div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
	<!-- 侧滑菜单开始 -->
		<aside id="offCanvasSide" class="mui-off-canvas-left">
			<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
				<div class="title">商品分类</div>
				<div class="mui-scroll">
					<ul
						class="mui-table-view mui-table-view-chevron mui-table-view-inverted">
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								食品饮料 </a></li>

						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								图书 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								手机数码 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								家具家装 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								珠宝配饰 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								投资收藏 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								汽车 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								旅游酒店 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								个护化妆 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								健康医疗 </a></li>
						<li class="mui-table-view-cell"><a class="mui-navigate-right">
								地产 </a></li>
					</ul>
				</div>
			</div>
		</aside>
		<!-- 侧滑菜单结束 -->
		<!-- 主界面部分开始 -->
		<div class="mui-inner-wrap">
		    <!-- 顶部固定栏开始 -->
			<header id = "mui-header"  style="display:none;" class="mui-bar mui-bar-nav">
				<a href="#offCanvasSide"
					class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>
				<form action="#" method="get" class="search_form">
					<div class="sdiv">
						<input name="s" style="width: 80%" class="sinput"
							placeholder="输入 回车搜索" x-webkit-speech="" type="text"> </input>
							<input  value="搜索" style="widht: 50px" class="sbtn" type="submit"></input>
					</div>
				</form>
				<div style="clear: both;"></div>
                <div id = "my" style="display:none;">1</div>
			</header>
			<!-- 顶部固定栏结束 -->
            <!-- 主要内容开始 -->
			<div id="offCanvasContentScroll" style="padding-top:0px;"
				class="mui-content mui-scroll-wrapper">
				<div class="mui-scroll">
					<div class="mui-content-padded">
						<div class="mui-content">
							<!-- 底部导航-第一项内容 -->
							<div id="tabbar" class="mui-control-content mui-active">	
								<!-- 顶部图片轮播开始 -->
								<div id="slider"    class="mui-slider">
									<div class="mui-slider-group mui-slider-loop">
										<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
										<div class="mui-slider-item mui-slider-item-duplicate">
											<a href="#"> <img src="static/images/yuantiao.jpg">
												<p class="mui-slider-title">静静看这世界</p>
											</a>
										</div>
										<div class="mui-slider-item">
											<a href="#"> <img src="static/images/shuijiao.jpg">
												<p class="mui-slider-title">幸福就是可以一起睡觉</p>
											</a>
										</div>
										<div class="mui-slider-item">
											<a href="#"> <img src="static/images/muwu.jpg">
												<p class="mui-slider-title">想要一间这样的木屋，静静的喝咖啡</p>
											</a>
										</div>
										<div class="mui-slider-item">
											<a href="#"> <img src="static/images/cbd.jpg">
												<p class="mui-slider-title">Color of SIP CBD</p>
											</a>
										</div>
										<div class="mui-slider-item mui-slider-item-duplicate">
											<a href="#"> <img src="static/images/yuantiao.jpg">
												<p class="mui-slider-title">静静看这世界</p>
											</a>
										</div>
										
									</div>
									<div class="mui-slider-indicator mui-text-right">
										<div class="mui-indicator mui-active"></div>
										<div class="mui-indicator"></div>
										<div class="mui-indicator"></div>
										<div class="mui-indicator"></div>
									</div>
								</div>
								<!-- 图片轮播结束 -->
								<ul id = "myfix" class="mui-table-view mui-grid-view mui-grid-9 ">
									<li
										class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
										<a class="mui-icon-sty mui-icon-sty01" href="#"> </a>
									</li>
									<li
										class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
										<a class="mui-icon-sty mui-icon-sty02" " href="#"> </a>
									</li>
									<li
										class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
										<a class="mui-icon-sty mui-icon-sty03" " href="#"> </a>
									</li>
									<li
										class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
										<a class="mui-icon-sty mui-icon-sty15" " href="#"> </a>
									</li>
								</ul>
					<div class="main">			 
								 
			 
								<div class="indexEnter">
									<span class="type">美食天地</span>
									<p>
										<a href="http://wx.ecitic.com/wx_good/goodList?catid=103108">
											<img
											src="http://wx.ecitic.com/uploads/banners/9/1410760117193.jpg" />
										</a>
									</p>
									<!-- <span class="dis">来到e中信，品尝世界美食</span> -->
								</div>
								<div class="indexEnter">
									<span class="type">学富五车</span>
									<p>
										<a href="http://wx.ecitic.com/wx_good/goodList?catid=103118">
											<img
											src="http://wx.ecitic.com/uploads/banners/9/1410760334116.jpg" />
										</a>
									</p>
									<!-- <span class="dis">知识是人类进步的阶梯</span> -->
								</div>
								<div class="indexEnter">
									<span class="type">财源广进</span>
									<p>
										<a href="http://wx.ecitic.com/wx_good/goodList?catid=103126">
											<img
											src="http://wx.ecitic.com/uploads/banners/12/1451268846602.jpg" />
										</a>
									</p>
									<!-- <span class="dis">福临宝地千秋盛，财进家门万事兴</span> -->
								</div>
								<div class="indexEnter">
									<span class="type">行达四海</span>
									<p>
										<a href="http://wx.ecitic.com/wx_good/goodList?catid=103121">
											<img
											src="http://wx.ecitic.com/uploads/banners/9/1410760243207.jpg" />
										</a>
									</p>
									<!-- <span class="dis">阳光沙滩海浪山峰峡谷瀑布不一样的风景</span> -->
								</div>
								<div class="indexEnter">
									<span class="type">美容保健</span>
									<p>
										<a class="mui-navigate-right" href="http://wx.ecitic.com/wx_good/goodList?catid=103114">
											<img
											src="http://wx.ecitic.com/uploads/banners/9/1410760317150.jpg" />
										</a>
									</p>
									<!-- <span class="dis">美丽健康，从信开始</span> -->
								</div>
								<div class="indexEnter">
									<span class="type">住福天下</span>
									<p>
										<a href="http://wx.ecitic.com/wx_good/goodList?catid=103107">
											<img
											src="http://wx.ecitic.com/uploads/banners/9/1410760265675.jpg" />
										</a>
									</p>
									<!-- <span class="dis">为您提供家一样的感觉</span> -->
								</div>
								<div style="width:100%;height:45px;"></div>
							</div>
							<div id="tabbar-with-chat" class="mui-control-content">
								<div class="title">这是div模式选项卡中的第2个子页面，该页面展示一个消息列表</div>
								<ul class="mui-table-view mui-table-view-chevron">
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 1</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 2</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 3</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 4</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 5</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 6</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 7</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 8</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 9</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 10</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 11</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 12</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 13</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 14</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 15</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 16</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 17</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 18</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 19</a></li>
									<li class="mui-table-view-cell"><a href=""
										class="mui-navigate-right">Item 20</a></li>
								</ul>
							</div>
							<div id="tabbar-with-contact" class="mui-control-content">
								<div class="title">这是div模式选项卡中的第3个子页面，该页面展示一个通讯录示例.</div>
								<ul
									class="mui-table-view mui-table-view-striped mui-table-view-condensed">
									<li class="mui-table-view-cell">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-avatar mui-table-cell">
													<img src="${pageContext.request.contextPath}/images/60x60.gif" />
												</div>
												<div class="oa-contact-content mui-table-cell">
													<div class="mui-clearfix">
														<h4 class="oa-contact-name">叶文洁</h4>
														<span class="oa-contact-position mui-h6">董事长</span>
													</div>
													<p class="oa-contact-email mui-h6">yewenjie@sina.com</p>
												</div>
											</div>
										</div>
									</li>
									<li class="mui-table-view-cell">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-avatar mui-table-cell">
													<img src="static/images/60x60.gif" />
												</div>
												<div class="oa-contact-content mui-table-cell">
													<div class="mui-clearfix">
														<h4 class="oa-contact-name">艾AA</h4>
														<span class="oa-contact-position mui-h6">总经理</span>
													</div>
													<p class="oa-contact-email mui-h6">aaa@163.com</p>
												</div>
											</div>
										</div>
									</li>
									<li class="mui-table-view-cell">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-avatar mui-table-cell">
													<img src="static/images/60x60.gif" />
												</div>
												<div class="oa-contact-content mui-table-cell">
													<div class="mui-clearfix">
														<h4 class="oa-contact-name">罗辑</h4>
														<span class="oa-contact-position mui-h6">员工</span>
													</div>
													<p class="oa-contact-email mui-h6">luoji@126.com</p>
												</div>
											</div>
										</div>
									</li>
									<li class="mui-table-view-cell">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-avatar mui-table-cell">
													<img src="static/images/60x60.gif" />
												</div>
												<div class="oa-contact-content mui-table-cell">
													<div class="mui-clearfix">
														<h4 class="oa-contact-name">云天明</h4>
														<span class="oa-contact-position mui-h6">员工</span>
													</div>
													<p class="oa-contact-email mui-h6">ytm@163.com</p>
												</div>
											</div>
										</div>
									</li>
									<li class="mui-table-view-cell">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-avatar mui-table-cell">
													<img src="static/images/60x60.gif" />
												</div>
												<div class="oa-contact-content mui-table-cell">
													<div class="mui-clearfix">
														<h4 class="oa-contact-name">史强</h4>
														<span class="oa-contact-position mui-h6">员工</span>
													</div>
													<p class="oa-contact-email mui-h6">shiqiang@gmail.com</p>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div id="tabbar-with-map" class="mui-control-content">
								<div class="title">这是div模式选项卡中的第4个子页面，该页面展示一个常见的设置示例.</div>
								<ul class="mui-table-view">
									<li class="mui-table-view-cell"><a
										class="mui-navigate-right"> 新消息通知 </a></li>
									<li class="mui-table-view-cell"><a
										class="mui-navigate-right"> 隐私 </a></li>
									<li class="mui-table-view-cell"><a
										class="mui-navigate-right"> 通用 </a></li>
								</ul>
								<ul class="mui-table-view" style="margin-top: 25px;">
									<li class="mui-table-view-cell"><a
										class="mui-navigate-right"> 关于mui </a></li>
								</ul>
								<ul class="mui-table-view" style="margin-top: 25px;">
									<li class="mui-table-view-cell"><a
										style="text-align: center; color: #FF3B30;"> 退出登录 </a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- off-canvas backdrop -->
		<div class="mui-off-canvas-backdrop"></div>
	</div>
	<script src="static/js/mui.min.js"></script>
	<script>
		mui.init();
		var slider = mui("#slider");
		slider.slider({
			interval : 5000
		});
		//侧滑容器父节点
		var offCanvasWrapper = mui('#offCanvasWrapper');
		//主界面容器
		var offCanvasInner = offCanvasWrapper[0]
				.querySelector('.mui-inner-wrap');
		//菜单容器
		var offCanvasSide = document.getElementById("offCanvasSide");
		/*if (!mui.os.android) {
			document.getElementById("move-togger").classList
					.remove('mui-hidden');
			var spans = document.querySelectorAll('.android-only');
			for (var i = 0, len = spans.length; i < len; i++) {
				spans[i].style.display = "none";
			}
		}*/
		//移动效果是否为整体移动
		var moveTogether = false;
		//侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
		var classList = offCanvasWrapper[0].classList;
		//变换侧滑动画移动效果；
		mui('.mui-input-group').on(
				'change',
				'input',
				function() {
					if (this.checked) {
						offCanvasSide.classList.remove('mui-transitioning');
						offCanvasSide.setAttribute('style', '');
						classList.remove('mui-slide-in');
						classList.remove('mui-scalable');
						switch (this.value) {
						case 'main-move':
							if (moveTogether) {
								//仅主内容滑动时，侧滑菜单在off-canvas-wrap内，和主界面并列
								offCanvasWrapper[0].insertBefore(offCanvasSide,
										offCanvasWrapper[0].firstElementChild);
							}
							break;
						case 'main-move-scalable':
							if (moveTogether) {
								//仅主内容滑动时，侧滑菜单在off-canvas-wrap内，和主界面并列
								offCanvasWrapper[0].insertBefore(offCanvasSide,
										offCanvasWrapper[0].firstElementChild);
							}
							classList.add('mui-scalable');
							break;
						case 'menu-move':
							classList.add('mui-slide-in');
							break;
						case 'all-move':
							moveTogether = true;
							//整体滑动时，侧滑菜单在inner-wrap内
							offCanvasInner.insertBefore(offCanvasSide,
									offCanvasInner.firstElementChild);
							break;
						}
						offCanvasWrapper.offCanvas().refresh();
					}
				});
		//主界面‘显示侧滑菜单’按钮的点击事件
		/*	document.getElementById('offCanvasShow').addEventListener('tap',
					function() {
						offCanvasWrapper.offCanvas('show');
					});*/
		//设置按钮的点击事件
		/*document.getElementById('setting').addEventListener('tap', function() {
			mui.openWindow({
				url : "./examples/setting.html",
				id : "settings"
			})
		});*/
        /*
		//添加列表项的点击事件
		mui('.indexEnter').on('tap', 'a', function(e) {
			var id = this.getAttribute('id');
			var surl = this.getAttribute('href');
			//alert(surl);
			//打开详情页面          
			mui.openWindow({
				url : surl,
				id : surl
			});
		});
         */
		//菜单界面，‘关闭侧滑菜单’按钮的点击事件
		/*document.getElementById('offCanvasHide').addEventListener('tap', function() {
			offCanvasWrapper.offCanvas('close');
		});*/
		//主界面和侧滑菜单界面均支持区域滚动；
		mui('#offCanvasSideScroll').scroll();
		mui('#offCanvasContentScroll').scroll();
		//实现ios平台原生侧滑关闭页面；
		if (mui.os.plus && mui.os.ios) {
			mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
				plus.webview.currentWebview().setStyle({
					'popGesture' : 'none'
				});
			});
		}
		
		(function($) {
			$('#scroll').scroll({
				indicators: true //是否显示滚动条
			});
			var segmentedControl = document.getElementById('segmentedControl');
			$('.mui-input-group').on('change', 'input', function() {
				if (this.checked) {
					var styleEl = document.querySelector('input[name="style"]:checked');
					var colorEl = document.querySelector('input[name="color"]:checked');
					if (styleEl && colorEl) {
						var style = styleEl.value;
						var color = colorEl.value;
						segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
					}
				}
			});
		})(mui);
		
		
	</script>
	
	<script src="static/js/jquery.js"></script>
    <script type="text/javascript">
	<!--
	!window.jQuery && document.write('<script src=js/jquery.js><\/script>');
	//-->
	</script>
	<script src="static/js/scrollfix.js"></script>
	<script type="text/javascript">
		$(function(){
			var   fixtop = $("#myfix") ;//第一种情况
			var fixtop2 = $(".fix-top");
			// fix.scrollFix( 
			//第二种情况
			var scrollDoc =$("#offCanvasContentScroll").find(".mui-scroll");
			var fixHeader = $("#mui-header");
			 fixtop .scrollFix({distanceTop:20,scrollDoc:scrollDoc,fixHeader:fixHeader});
			 fixtop2.scrollFix({distanceTop:20,scrollDoc:scrollDoc,fixHeader:fixHeader});
			//第三种情况
			//fixStartTop.scrollFix({startTop:"#startTop"});
			//第四种情况
			//fixStartBottom.scrollFix({startBottom:"#startBottom"});
			//第五种情况
			//fixbottom.scrollFix({endPos:300});
			//第六种情况
			//fixfooter.scrollFix({endPos:"#fixFooter"})
		})
	</script>
</body>
</html>