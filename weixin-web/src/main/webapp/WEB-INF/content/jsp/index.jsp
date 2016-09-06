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
<link rel="stylesheet" href="static/css/icons-extra.css">
<link rel="stylesheet" href="static/css/index.css">
</head>
<body>
	<!-- 底部导航开始 -->
	<nav class="mui-bar mui-bar-tab">
		<a id="home" class="mui-tab-item mui-active" href="#tabbar"> 
		   <span class="mui-icon mui-icon-home"></span>
		   <span class="mui-tab-label">首页</span>
		</a> 
		<a id="category" class="mui-tab-item" href="#tabbar-with-chat"> 
		    <span class="mui-icon mui-icon-list"></span>
			<span class="mui-tab-label">分类</span>
		</a> 
		<a id ="cart" class="mui-tab-item" href="#tabbar-with-contact"> 
		    <span class="mui-icon-extra mui-icon-extra-cart"> 
		        <span class="mui-badge">9</span>
		    </span> 
		    <span class="mui-tab-label">购物车</span>
		</a>
		<a id="setting" class="mui-tab-item" href="./examples/setting.html">
			<span class="mui-icon mui-icon-gear"></span> <span
			class="mui-tab-label">个人中心</span>
		</a>
	</nav>
	<!-- 底部导航结束 -->
	 
	<script src="static/js/mui.js"></script>
	<script>
		//mui.init();
		mui.init({
			swipeBack: false,
			statusBarBackground: '#f7f7f7',
			gestureConfig: {
				doubletap: true
			},
			subpages: [{
				id: 'home',
				url: 'wx_index/r/home',
				styles: {
					top: '0px',
					bottom: 0,
					display:'block',
					bounce: 'vertical'
				}
			},{
				id: 'examples/setting',
				url: 'examples/setting.html',
				styles: {
					top: '0px',
					bottom: 0,
					display:'none',
					bounce: 'vertical'
				}
			}]
		});	
	</script>		 
</body>
</html>