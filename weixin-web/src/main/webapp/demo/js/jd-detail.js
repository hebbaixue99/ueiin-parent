define('wg.itemV6', function(require, exports, module) {
	var myHight=0;
	var __cacheThisModule__, $ = require('zepto'),
		urlParam = require('url'),
		loopScroll = require('loopScroll'),
		ls = require('loadJs'),
		util = require('util'),
		login = require('login'),
		cookie = require('cookie'),
		address = require('jd.address'),
		ui = require('ui'),
		report = require('report'),
		commDet = require('wq.item.detail'),
		skuImgPrice = require('wq.skuImgPrice'),
		md5 = require('md5'),
		itemSpec = require('wq.itemSpec'),
		cache = require('cache');
	var ItemDet = function() {
			var opt = {
				protocol: 'http:',
				domainStr: '',
				isAndroid23: false,
				isAndroid: false,
				isWX: true,
				isSQ: false,
				isQQbrowser: false,
				isLogin: '',
				isLoginAct: '',
				isLoginInit: true,
				isImgInit: true,
				isUseSticky: false,
				isZiying: false,
				isExpByjd: false,
				isCashDelivery: false,
				isLoadCoupon: true,
				isLoadYanbao: true,
				isWareOff: false,
				bid: '',
				itemId: '',
				showMobileDet: true,
				skuType: "1",
				cgiTimeout: 4000,
				loopImg: [],
				sliderProtal: null,
				sliderDetail: null,
				pageHight: $(window).height(),
				pageWidth: $(window).width(),
				lockScrollH: 0,
				mainViewScroll: 0,
				blackCoverShow: false,
				buyBtmFloatShow: false,
				isLoadDet: [1, 0, 1, 0],
				isDetPCStr: '',
				detTabH: 0,
				detLowH: 0,
				detIndex: 0,
				commStr: '',
				getAddrTime: 0,
				jdPvLogobj: {
					category: '',
					sku_change: '0'
				},
				txPvLogobj: {
					pv_type: '0',
					scn_type: '3'
				},
				skuJson: {},
				skuPro: {},
				specName: '',
				specValue: [],
				relatedItem: {},
				timeout: {},
				isInit: true,
				favInfo: {},
				isHoldFav: false,
				skuId: '',
				changeSkuId: '',
				baseSkuId: '',
				descriptionId: '',
				specificationId: '',
				shopImLink: '',
				jdCategory: [],
				jdPrice: 0,
				jdStatus: true,
				jdSkuIds: [],
				jdSkuInfo: {},
				jdAddrId: [],
				jdAddrName: [],
				jdSkuStatus: true,
				koStatus: 0,
				yushouStatus: 0,
				yushouInfo: null,
				venderId: 0,
				venderName: '京东',
				saleNum: [],
				maxBuyNum: 200,
				isSpecItem: false,
				isHYKHSP: false,
				isBind: false,
				cpart: 'main',
				tabInit: true,
				isAd: false,
				pgStatus: 0,
				pgInfo: {},
				xuniBrandId: 0,
				isOverseaPurchase: 0,
				isOTC: 0,
				cfeeType: null,
				timmer: null,
				evalHold: false,
				evalTotal: 0,
				evalPage: 1,
				evalPageCur: 1,
				evalType: 3,
				buyNum: 1,
				isYuShouNoWay: false,
				yuShouNoWayStatus: 0,
				isChou: false,
				isChouTuan: {},
				qqmemprice: {},
				isYanBao: false,
				locShopInfo: {},
				locJdGame: {},
				isSamGoods: false,
				miaoErr: {
					errId: '',
					errMsg: ''
				},
				promoteTips: {},
				promoteTag10: 0,
				iconHtml: '',
				network: '',
				postTip: '',
				giftPool: {},
				isGiftPool: false,
				priceVerify: {
					isJump: false,
					bsid: '',
					img: '',
					ip: '',
					hasVerify: false
				},
				loadJsObj: {},
				moduleAsynObj: {}
			};
			$.extend(this, opt);
		};
	ItemDet.prototype.init = function() {
		if (window._PFM_TIMING) _PFM_TIMING[2] = new Date();
		this.protocol = window.location.protocol || this.protocol;
		var obj = this;
		this.skuId = urlParam.getUrlParam('sku').replace(/%20|\s/g, '');
		if (!this.skuId) {
			this.createPopup({
				flag: 4,
				msg: '链接地址错误，请检查。',
				icon: 'info',
				okText: '搜索商品',
				cancelText: '逛逛首页',
				onConfirm: function() {
					location.href = (obj.isWX ? '//wqs.jd.com/portal/wx/category_m.shtml?PTAG=37080.12.9' : '//wqs.jd.com/portal/sq/category_q.shtml?ptag=37128.3.1');
				},
				onCancel: function() {
					location.href = (obj.isWX ? '//wq.jd.com/mcoss/mportal/show?tabid=17&tpl=17' : '//wq.jd.com/mcoss/mportal/show?tabid=6&tpl=7');
				}
			});
			return;
		}
		window._skuTpl = (window._skuTpl || '<div class="sku" id="sku{#no#}" ptag="7001.1.5"><h3>{#name#}</h3><div class="sku_list">{#option#}</div></div>');
		this.isZiying = this.skuId.length < 10;
		this.isLoadCoupon = !(window._loadCoupon === false);
		this.isLoadYanbao = !(window._loadYanbao === false);
		var os = $.os;
		this.isAndroid23 = os && os.android && (os.version.indexOf('2.3') != -1);
		this.isAndroid = os && os.android;
		this.isUseSticky = this.supportSticky();
		if (this.isAndroid23) $('body').addClass('android_23_fix');
		this.baseSkuId = this.skuId;
		this.changeSkuId = this.skuId;
		this.bid = urlParam.getUrlParam('bid');
		this.itemId = urlParam.getUrlParam('ic');
		this.detLowH = this.pageHight - $('#detailTab').height() + 20;
		this.isChou = urlParam.getUrlParam('zhongchou');
		if (~' 1000 1001 1002 1003 1004 '.indexOf(' ' + this.isChou + ' ')) {
			this.isChouTuan[this.skuId] = this.isChou;
			this.isChou = false;
		}
		this.qqmemprice[this.skuId] = urlParam.getUrlParam('qqmemprice');
		window.location.hash = '#main';
		try {
			this.checkBrowser();
			this.checkAd();
			this.setAddrId();
			this.domainStr = (document.domain || 'wq.jd.com').split('.').slice(1).join('.');
			if (this.domainStr.indexOf('jd.com') == -1) this.priceVerify.hasVerify = true;
			this.isLogin = (cookie.get("wq_uin") && cookie.get("wq_skey"));
			this.isLoginAct = (cookie.get('doAddCart') || cookie.get('dofav') || cache.getItem('itemLogin'));
			JD.report.umpBiz({
				bizid: '25',
				operation: '22',
				result: this.isLogin ? '0' : '1',
				source: '0',
				message: 'item login'
			});
			cache.removeItem('itemLogin');
			if (this.domainStr.indexOf('jd.com') == -1) {
				this.iframeSynList = [{
					ss: '2',
					key: 'PPRD_P'
				}, {
					ss: '2',
					key: 'jdAddrId'
				}, {
					ss: '2',
					key: '__jda'
				}, {
					ss: '2',
					key: 'jdAddrName'
				}, {
					ss: '2',
					key: 'cartNum'
				}, {
					ss: '2',
					key: '_tj_rvurl'
				}, {
					ss: '2',
					key: '_tj_rpds'
				}, {
					ss: '2',
					key: 'visitkey'
				}, {
					ss: '2',
					key: 'tjhelper'
				}, {
					ss: '2',
					key: '__jdv'
				}, {
					ss: '2',
					key: '__wga'
				}];
				itemSpec.inforSyn(null, obj);
			}
		} catch (e) {}
		if (this.isAd) $('#summaryEnter .good').hide();
		if (this.isAd || this.isQQbrowser) {
			if (this.isQQbrowser || this.isWX) $('#backUrl').attr('href', '//wq.jd.com/mcoss/wxmall/home?ptype=1&ptag=7001.1.53');
			$('#topBack').show();
		}
		if (window._itemInfo) {
			this.skuJson[this.skuId] = _itemInfo;
			_itemInfo = null;
			JD.report.umpBiz({
				bizid: '25',
				operation: '16',
				result: '0',
				source: '0',
				message: 'item straight success'
			});
		} else {
			JD.report.umpBiz({
				bizid: '25',
				operation: '16',
				result: '1',
				source: '0',
				message: 'item straight fail ' + this.skuId
			});
		}
		this.setItemInfo();
		try {
			this.reportAdkey();
			itemSpec.isHuanAlert(obj);
			if (urlParam.getUrlParam('iscossview') == '1') {
				setTimeout(function() {
					$('#id-pcprompt-mask').addClass('hide');
				}, 500);
			}
		} catch (e) {}
	};
	ItemDet.prototype.checkBrowser = function() {
		this.isWX = util.isWX();
		this.isSQ = util.isSQ();
		this.isQQbrowser = (JD.device.scene === 'qqbrower');
		if (!this.isWX) {
			try {
				JD.sqapi.ready(function() {
					mqq.ui.setWebViewBehavior({
						swipeBack: 0
					});
				});
			} catch (e) {}
		}
	};
	ItemDet.prototype.checkNetwork = function(images) {
		var obj = this;
		if (obj.network) {
			obj.setProtalImg(images);
		} else {
			try {
				JD.device.getNetwork(function(nt) {
					obj.network = nt;
					if ($('#loopImgDiv').attr('setimg') !== '1') obj.setProtalImg(images);
				});
				setTimeout(function() {
					if ($('#loopImgDiv').attr('setimg') !== '1') obj.setProtalImg(images);
				}, 1000);
			} catch (e) {
				obj.setProtalImg(images);
			}
		}
	};
	ItemDet.prototype.item = function() {
		if (!this.skuJson[this.skuId] || !this.skuJson[this.skuId].item) {
			JD.report.umpBiz({
				bizid: '25',
				operation: '15',
				result: '9',
				source: '0',
				message: 'itemerror' + this.skuId
			});
			return {};
		}
		return this.skuJson[this.skuId].item;
	};
	ItemDet.prototype.checkAd = function() {
		var adck = cookie.get('PPRD_P'),
			reg = new RegExp(this.isWX ? '17048|17047|17066\\.2\\.' : '17051|17061|17062'),
			ptag = urlParam.getUrlParam('ptag') || '';
		if (reg.test(adck) || reg.test(ptag)) {
			this.isAd = true;
		}
	};
	ItemDet.prototype.getAddrInfo = function() {
		return {
			id: cookie.get('jdAddrId') || localStorage.getItem('jdAddrId') || cookie.get('jdLOCAddrId') || localStorage.getItem('jdLOCAddrId') || '1_72_4139',
			name: cookie.get('jdAddrName') || localStorage.getItem('jdAddrName') || cookie.get('jdLOCAddrName') || localStorage.getItem('jdLOCAddrName') || '北京_北京市_北苑'
		};
	};
	ItemDet.prototype.setAddrId = function() {
		var addr = this.getAddrInfo();
		this.jdAddrId = addr.id.split('_');
		this.jdAddrName = addr.name.split('_');
		for (var i = 0; i < 4; i++) {
			if (!this.jdAddrId[i]) this.jdAddrId[i] = 0;
			if (!this.jdAddrName[i]) this.jdAddrName[i] = '';
		}
		$('#addrName').html(this.jdAddrName[0]);
	};
	ItemDet.prototype.initStatus = function() {
		this.jdStatus = true;
		this.jdSkuStatus = true;
		this.showMobileDet = true;
		this.cfeeType = null;
		this.evalPageCur = 1;
		this.evalType = 3;
		this.promoteTag10 = 0;
		this.isWareOff = false;
		$('#statusNotice,#relatedEnter,#promoGift,#promotePanel,#ziYingMsg,#viewGuess,#arrivalNotice,#giftPool,#specBuyBtn,#jdCouponTip,#itemDesc,#globalNotice,#globalComm,#pcItemLink').hide();
		$('#serviceInfo,#eBayTip,#actTitleDesc,#ybArea,#jdService,#popupJdService,#taxTip,#decorationWrap,#certificationNotice,#certificationTimer,#baitiaoDiv,#mupWrap,#jdGameWrap,#serviceArea .icon_point').hide();
		$('#loopImgDiv').attr('setimg', '0');
		$('#quckArea').css('bottom', '');
		$('#jdServiceList,#ybArea2').html('');
		$('#buyBtn2,#addCart2').removeClass('btn_disable').show();
		if (window._isClothShoe) {
			$('#buyBtn1').html('立即购买');
			$('#buyBtn1,#addCart1').removeClass('disabled_1').show();
			$('#popupConfirm').removeClass('disabled_1');
			$('#viewGuess1,#arrivalNotice1,#popupNotice,#specBuyBtn1').hide();
			if ($('#popupConfirm').attr('tag') > 0) {
				$('#popupConfirm').parent().addClass('show').show();
				$('#buyBtn1').parent().removeClass('show').hide();
			} else {
				$('#popupConfirm').parent().removeClass('show').hide();
				$('#buyBtn1').parent().addClass('show').show();
			}
		}
		$('#promShopFullfree').html('').hide();
		$('#priceWQDiscount').addClass('hide');
		if (!this.isWX) {
			$('#headEval').show();
			$('#evalQQMem').hide();
			$('#qqMemTip').hide().attr('qqmemprice', 0);
		}
		this.iconHtml = '';
		if (this.isSpecItem) {
			this.maxBuyNum = 200;
			this.koStatus = 0;
			this.yushouStatus = 0;
			if (this.pgStatus != 0) document.title = '京东商城-商品详情';
			this.pgStatus = 0;
			if (this.timmer) {
				clearInterval(this.timmer);
				this.timmer = null;
			}
			this.locShopInfo.isLOC = false;
			this.locJdGame.isGame = false;
			$('#buyBtnExp,#priceGroupStyle,#priceExp,#popSale,#buyBtnExp1').hide();
			$('#postNotice1, #postNotice2').html('');
			$('#buyBtn2').html('立即购买');
			$('#priceTitle').html('').addClass('hide');
			$('#fav,#gotoCart').show();
			$('#favWrap').addClass('fn_goods_name');
			$('#itemDesc').addClass('right_shorter');
			itemSpec.initStatus();
		}
		this.isSpecItem = false;
	};
	ItemDet.prototype.setItemInfo = function(param) {
		if (!param) param = {};
		var obj = this;
		this.createTimeout('1', 'item view api fail');
		window.skuInfoCB = function(json) {
			if (json.huanUrl) {
				location.href = json.huanUrl;
				return;
			}
			if (!obj.isInit && json.redirectUrl) {
				location.href = json.redirectUrl;
				return;
			}
			if (json.errCode == '20160304') {
				obj.createPopup({
					flag: 4,
					msg: '该商品已下架',
					icon: 'info',
					okText: '搜索商品',
					cancelText: '逛逛首页',
					onConfirm: function() {
						location.href = (obj.isWX ? '//wqs.jd.com/portal/wx/category_m.shtml?PTAG=37080.12.9' : '//wqs.jd.com/portal/sq/category_q.shtml?ptag=37128.3.1');
					},
					onCancel: function() {
						location.href = (obj.isWX ? '//wq.jd.com/mcoss/mportal/show?tabid=17&tpl=17' : '//wq.jd.com/mcoss/mportal/show?tabid=6&tpl=7');
					}
				});
				return;
			}
			obj.skuJson[obj.changeSkuId] = json;
			obj.skuId = obj.changeSkuId;
			if (!obj.priceVerify.hasVerify && json.errCode && ~json.errCode.indexOf('20160510')) {
				obj.priceVerify.isJump = false;
				obj.priceVerify.ip = json.errCode.split('|')[1];
				obj.getVerifyCode({
					flag: true,
					callback: function() {
						obj.createPopup({
							flag: 5,
							msg: '该商品当前访问人数过多，请输入验证码后继续购买',
							noCoverEvent: true
						});
					}
				});
			} else {
				obj.priceVerify.isJump = true;
			}
			var item = json.item || {},
				stock = json.stock;
			obj.venderId = item.venderID;
			if (!obj.skuPro.id) obj.setSkuInfo(item.ColorSize, item.Color, item.Size, item.Spec);
			if (!obj.isBind) {
				$('#btnTools').show();
				obj.bindEvent();
			}
			obj.descriptionId = item.description;
			obj.specificationId = item.specification;
			obj.jdCategory = item.category || [];
			if (!json.item || !obj.jdCategory.length) {
				JD.report.umpBiz({
					bizid: '25',
					operation: '15',
					result: (!json.item ? '5' : '6'),
					source: '0',
					message: 'item view api noitemcategory' + obj.skuId
				});
			}
			obj.skuType = item.skuType;
			if (window._jdApp) _jdApp.category = obj.jdCategory[0];
			item.spAttr = item.spAttr || {};
			obj.isOverseaPurchase = 0;
			obj.isOTC = (obj.jdCategory[1] == '12632' ? (obj.isZiying ? (obj.isWX ? 1 : 2) : 3) : 0);
			if (item.spAttr.isOverseaPurchase > 0) obj.isOverseaPurchase = item.spAttr.isOverseaPurchase;
			if (item.spAttr.isKO == '1') obj.isLoadCoupon = false;
			if (param.itemType != 'heyue') obj.initStatus();
			obj.checkNetwork(item.image);
			if (obj.isAd) $('#summaryEnter .good').hide();
			try {
				if (~' 1713 4051 4052 4053 '.indexOf(' ' + obj.jdCategory[0] + ' ')) {
					if (!$('#mupWrap').length) {
						$('#detailBaseLine').before('<div class="detail_link" id="mupWrap" style="display:none;"><a class="detail_link_item" href="//mup.jd.com/accompany/book"><i class="icon_peiban"></i><strong>陪伴计划</strong><span>全新上线，加入有礼</span></a></div>');
					}
					$('#mupWrap').show();
				}
				if (!json.feetype || !json.feetype.datas || !json.feetype.datas.length === 0) {
					json.feetype = null;
				}
			} catch (e) {}
			if (param.itemType != "heyue" && json.feetype) {
				obj.isSpecItem = true;
				obj.maxBuyNum = 1;
				itemSpec.setSkuAttach(json.feetype, obj);
				$('#sku2 h3').html('版本：');
			}
			if (obj.jdCategory[2] == '6980') {
				obj.isSpecItem = true;
				obj.setBtnStatus({
					flag: 2
				});
				obj.isEcard = true;
			}
			if (item.expandAttr && (obj.jdCategory[2] == '4835' || obj.jdCategory[2] == '4836')) {
				obj.convertXuni(item.expandAttr);
				if (obj.xuniBrandId) {
					obj.isSpecItem = true;
					obj.setBtnStatus({
						flag: 2,
						favFlag: 1,
						msg: '本商品暂不支持在' + (obj.isWX ? '微信' : 'QQ') + '内购买'
					});
					obj.setBtnStatus({
						flag: 3
					});
					$('#gotoShop').hide();
					obj.maxBuyNum = parseInt(500 / json.price.p) || 1;
					$('#postNotice1, #postNotice2').html('');
				}
				$('#sendArea').hide();
			}
			if (obj.venderId == '117761') {
				obj.jdStatus = false;
				obj.isSpecItem = true;
				obj.setBtnStatus({
					flag: 3
				});
			}
			if (item.spAttr.HYKHSP == '1') {
				obj.isSpecItem = true;
				obj.isHYKHSP = true;
				obj.setBtnStatus({
					flag: 2
				});
			}
			if (!obj.isSpecItem && !obj.xuniBrandId && (((obj.jdCategory[0] == '4938' || obj.jdCategory[2] == '1195' || obj.jdCategory[2] == '13046') && obj.jdCategory[2] != '9392') || (obj.isOTC == 2) || obj.jdCategory[2] == '13121' || obj.jdCategory[2] == '13532')) {
				obj.setBtnStatus({
					msg: '抱歉，该商品暂不支持在此购买',
					flag: 3
				});
			} else if (item.warestatus != "1") {
				obj.setBtnStatus({
					msg: '此商品已经售完',
					flag: 4
				});
				obj.isWareOff = true;
			} else if (item.spAttr.isFlimPrint == '1') {
				obj.setBtnStatus({
					msg: '抱歉，该商品暂不支持在此购买',
					flag: 3
				});
			} else if (item.spAttr.isSelfService === '1' || item.spAttr.isSelfService === '2' || item.spAttr.isSelfService === '5') {
				obj.setBtnStatus({
					msg: '抱歉，该商品不支持单独购买',
					flag: 3
				});
			} else if (item.spAttr.YuShouNoWay == '1' && item.spAttr.YuShou == '1') {
				obj.isSpecItem = true;
				itemSpec.yuShouNoWay(obj);
			} else if (item.spAttr.YuShou == '1') {
				obj.isSpecItem = true;
				obj.setBtnStatus({
					flag: 6,
					buyTxt: '立即预约'
				});
				$('#postNotice1, #postNotice2').html('');
				obj.maxBuyNum = 1;
				obj.yuShou();
			} else if (item.spAttr.isKO == '1' || (json.miao && json.miao.isKo == '1')) {
				obj.isSpecItem = true;
				obj.setBtnStatus({
					flag: 6
				});
				$('#postNotice1, #postNotice2').html('');
				obj.maxBuyNum = 1;
				obj.qianggou();
			} else if (item.spAttr.isLOC != '1' && item.spAttr.isLOC != '3') {
				obj.getSkuStock(stock);
			}
			if (json.pingou && json.pingou == 1) {
				obj.isSpecItem = true;
				obj.isLogin ? itemSpec.getPinggouStatus(obj) : obj.login(location.href.replace(obj.baseSkuId, obj.skuId), function() {
					itemSpec.getPinggouStatus(obj);
				});
			}
			if (obj.isChou || obj.isChouTuan[obj.skuId]) {
				obj.isSpecItem = true;
				obj.setBtnStatus({
					flag: 6,
					favFlag: 1,
					buyTxt: obj.isChouTuan[obj.skuId] ? '发起量贩团' : '发起好友筹款'
				});
				$('#gotoShop').hide();
			}
			if (obj.isSpecItem) {
				$('#addCart2').removeClass('btn_618v1');
				$('#buyBtn2').removeClass('btn_618v2');
			}
			obj.jdPrice = (obj.jdPrice || urlParam.getUrlParam('price'));
			item.category = item.category || [0, 0, 0];
			item.sales = item.sales || '-';
			obj.saleNum = item.sales.split('-');
			try {
				obj.getSkuPrice(json.price, item.areaSkuId);
				obj.setBuyNum(obj.buyNum);
				obj.loginSetCookie(function() {
					if (obj.isLoginInit) {
						if (!obj.isYuShouNoWay) obj.getCouponList();
						obj.checkFav();
						if (cookie.get('doAddCart')) {
							var cookirStr = cookie.get('doAddCart');
							cookie.del('doAddCart');
							if (cookirStr != 'ok') {
								try {
									cookirStr = JSON.parse(cookirStr);
								} catch (e) {}
							}
							obj.addCart(cookirStr);
						}
					}
					obj.isLoginInit = false;
				});
				obj.loadEval();
				obj.setDetTab();
				obj.setFavStatus();
				json.AdvertCount = json.AdvertCount || {};
				obj.setIconTip({
					spAttr: item.spAttr,
					skuName: item.skuName,
					advertTip: json.AdvertCount.ad
				});
				if (obj.isLoadYanbao) obj.loadNewYanBao();
				if (item.spAttr.isLOC == '3') {
					$reportTrace({
						ptag: '7358.1.4'
					});
					itemSpec.showJdGame(obj);
				}
				obj.loadRelatedItem();
				obj.showPromotion(json.promov2);
				if (obj.qqmemprice[obj.skuId] > 0 && !($('#qqMemTip').attr('qqmemprice') > 0)) obj.showQQMemPrice(obj.qqmemprice[obj.skuId]);
				if (item.spAttr.isLOC == '1') {
					itemSpec.showStore(obj);
				}
				obj.getPostPrice(stock);
				if (obj.isOverseaPurchase > 0) {
					if (!obj.jdSkuInfo.globalNotice) obj.jdSkuInfo.globalNotice = {};
					var category1 = obj.jdCategory[0];
					commDet.globalBuyNotice({
						json: obj.jdSkuInfo.globalNotice[category1],
						commId: 'globalNoticeArea',
						category: category1,
						type: obj.isOverseaPurchase,
						callback: function(json) {
							obj.jdSkuInfo.globalNotice[category1] = json;
							$('#globalNotice,#globalComm')[$('#globalNoticeArea').attr('hasdata') == '1' ? 'show' : 'hide']();
						}
					});
				}
			} catch (e) {}
			if (obj.isInit) {
				try {
					obj.loadRecommendSuit();
					obj.loadGuess();
					obj.loadSearchRank();
					obj.showMarketPrice();
					obj.shopInfo(stock);
					obj.getVenderInfo();
					obj.checkIsFavShop();
					itemSpec.loadSizeInfo(obj);
					itemSpec.priceTag(obj);
				} catch (e) {}
				obj.addressInit();
				obj.setCartNum();
				if (obj.isAd) {
					$('#appdlCon,#appdlCon2').addClass('hide');
				}
				obj.reports();
				obj.isInit = false;
			} else {
				obj.getTabData();
			}
			obj.reportPV();
			obj.delTimeout('itil1');
			JD.report.umpBiz({
				bizid: '25',
				operation: '1',
				result: '0',
				source: '0',
				message: 'item view api loaded'
			});
		};
		if (this.skuJson[this.changeSkuId]) {
			skuInfoCB(this.skuJson[this.changeSkuId]);
		} else {
			var viewUrl = ['//wq.jd.com/item/view2?datatype=1&callback=skuInfoCB', 'sku=' + this.changeSkuId, 'areaid=' + this.jdAddrId.join('_'), 'u_source=' + (this.isWX ? 'weixin' : 'qq'), 't=' + Math.random()];
			ls.loadScript(viewUrl.join('&'));
		}
	};
	ItemDet.prototype.setIconTip = function(opt) {
		var spAttr = opt.spAttr || {},
			skuName = opt.skuName || '',
			advertTip = opt.advertTip || '',
			promoteIco = urlParam.getUrlParam('extlogo') == 'gh' ? '<span class="tag">广货</span>' : '';
		if (this.isOverseaPurchase > 0) {
			promoteIco += '<div class="mod_sign_tip bg_1 bor"><b><i class="i_global"></i> 全球购</b>' + (this.isZiying ? '<span>自营</span>' : '') + '</div>';
			if (spAttr.isEbay == '1' || spAttr.isEbay == '2') {
				$('#eBayTip').show();
			}
			if (spAttr.isCartshield == 1 || spAttr.isCartshield == 3) {
				$('#addCart2,#fav,#gotoShop,#gotoCart').hide();
				$('#favWrap').removeClass('fn_goods_name');
				$('#itemDesc').removeClass('right_shorter');
			}
			if (this.isOverseaPurchase == 3) {
				$('#taxTip').show().html((this.item().wTax > 0 ? '需缴纳' + (this.item().wTax * 1).toFixed(2) + '%跨境电商综合税' : '税费:以结算页金额为准') + '<i class="ques" id="taxTipUp"></i>');
			}
		}
		if (spAttr.isLOC == '1') {
			promoteIco += '<div class="label label_icon_txt" id="storeIcon"><i class="icon_service serv_to_shop"></i><span class="txt">到店服务</span></div>';
		}
		if (this.isZiying && this.isOverseaPurchase == 0) promoteIco += '<div class="mod_sign_tip"><span>自营</span></div>';
		var jdqTips = '',
			otcTips = '';
		if (this.isOTC > 0) {
			promoteIco += '<div class="mod_sign_tip medicine"><span>药品</span></div>';
			otcTips = '请仔细阅读产品说明书，或在药师指导下购买和使用。';
		}
		$('#itemName').html(promoteIco + skuName);
		if (spAttr.isCanUseDQ == '0') jdqTips = '东券';
		if (spAttr.isCanUseJQ == '0') jdqTips += ' 京券';
		if (jdqTips || otcTips) {
			if (jdqTips) jdqTips = '不支持使用' + jdqTips;
			$('#jdCouponTip').show().find('div.name').html(otcTips + jdqTips);
		}
		if (window._whiteUser) {
			advertTip = advertTip.replace(/\\/g, '').replace('_blank', '_self').replace('http://', '//');
		} else {
			advertTip = advertTip.replace(/<a.*\/a>[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|,|\?|\.|!|:]*/ig, '');
			if (~advertTip.toLowerCase().indexOf('app')) advertTip = '';
		}
		if (advertTip) $('#itemDesc').html(advertTip).show();
	};
	ItemDet.prototype.setSkuInfo = function(arr, color, size, spec) {
		arr = arr || [];
		this.skuPro = {
			color: {},
			size: {},
			name: {},
			id: {}
		};
		var obj = this,
			csku = [],
			disableClass = 'option_disabled',
			selectClass = 'option_selected';
		if (window._isClothShoe) {
			disableClass = 'over';
			selectClass = 'active';
		}
		for (var i = 0; i < arr.length; i++) {
			this.jdSkuIds.push(arr[i].SkuId);
			var tmp = [arr[i].Color, arr[i].Size, arr[i].Spec].filter(function(s) {
				return s;
			});
			this.skuPro.name[tmp.join('~~')] = arr[i].SkuId;
			this.skuPro.id[arr[i].SkuId] = tmp;
			if (arr[i].SkuId == this.skuId) csku = tmp;
		};
		if (!this.jdSkuIds.length) this.jdSkuIds.push(this.skuId);
		$.each([1, 2, 3], function(index, item) {
			var arr = $('#sku' + item + ' span');
			if (arr.length > 0) {
				for (var i = 0, len = arr.length; i < len; i++) {
					var $arr = $(arr[i]);
					if ($arr.text() == csku[item - 1]) {
						$arr.addClass(selectClass);
						break;
					}
				}
			}
		});
		var no = csku[0] ? 1 : 2;
		this.checkSkuList(no, csku[no - 1]);
		$('#sku' + no + ' span').removeClass(disableClass);
	};
	ItemDet.prototype.checkSkuList = function(skuNo, cName) {
		var obj = this,
			nameRelated = [],
			cindex = skuNo - 1,
			disableClass = 'option_disabled',
			selectClass = 'option_selected';
		if (window._isClothShoe) {
			disableClass = 'over';
			selectClass = 'active';
		}
		$.each(obj.skuPro.id, function() {
			if (this[cindex] == cName) nameRelated.push(this);
		});
		$.each([1, 2, 3], function(i, no) {
			if (skuNo == no) return;
			$('#sku' + no + ' span').each(function() {
				var isRelate = false,
					name = $(this).text();
				$.each(nameRelated, function() {
					isRelate = isRelate || this[i] == name;
				});
				$(this)[isRelate ? 'removeClass' : 'addClass'](disableClass);
			});
		});
		if (!$('#sku3 span').length) return;
		var partnerNo = [0, 2, 1, 1][skuNo],
			checkNo = [0, 3, 3, 2][skuNo],
			partnerName = $('#sku' + partnerNo + ' .' + selectClass).text();
		if (!partnerName) return;
		$('#sku' + checkNo + ' span').addClass(disableClass);
		$.each(nameRelated, function() {
			var arr = this;
			$('#sku' + checkNo + ' span').each(function() {
				if (arr[partnerNo - 1] == partnerName && arr[cindex] == cName && arr[checkNo - 1] == $(this).text()) $(this).removeClass(disableClass);
			});
		});
	};
	ItemDet.prototype.convertXuni = function(str) {
		var arr = str.split('^');
		for (var i = 0; i < arr.length; i++) {
			var tmp = arr[i].split(':');
			if (tmp[0] == '8457' || tmp[0] == '8459') {
				this.xuniBrandId = tmp[2];
				break;
			}
		}
	};
	ItemDet.prototype.setShareConfig = function() {
		window.shareConfig.title = this.item().skuName;
		window.shareConfig.desc = '售价：' + $('#priceSale').attr('price') + (this.isWX ? '。京东商城，正品保证，微信专享。' : '');
		window.shareConfig.link = location.href.replace('//wq.jd.com/', '//wqitem.jd.com/').replace('//wqmitem.jd.com/', '//wqitem.jd.com/').replace(this.baseSkuId, this.skuId).replace(/\&huan=|\&isSamGoods=/g, '&').replace(/#.*/, '').replace('/mitem/view?', '/item/view?');
		if (window.shareConfig.link.indexOf('&logid=') == -1) {
			if (window.__logid) window.shareConfig.link += '&logid=' + window.__logid;
		}
	};
	ItemDet.prototype.reports = function() {
		var obj = this;
		this.setShareConfig();
		JD.store.setHistory({
			type: '2',
			key: obj.skuId,
			refer: document.referrer,
			url: shareConfig.link,
			title: shareConfig.title,
			desc: ($('#priceSale').attr('price') || $('#priceSale').html()),
			img: shareConfig.img_url
		});
	};
	ItemDet.prototype.reportPV = function() {
		var obj = this,
			dapeiId = urlParam.getUrlParam('dapeiid'),
			tmp = {
				sku: this.skuId,
				skus: this.jdSkuIds.join(','),
				item: this.itemId,
				shop: this.venderId,
				category: this.jdCategory[0],
				leaf: this.jdCategory[2],
				isJD: this.venderId * 1 ? 1 : 2
			},
			objMsgTimmer = setInterval(function() {
				if (window.ECC_cloud_report_pv) {
					clearInterval(objMsgTimmer);
					objMsgTimmer = null;
					obj.jdPvLogobj.sku_id = obj.skuId;
					obj.jdPvLogobj.leaf = obj.jdCategory.join('_');
					obj.jdPvLogobj.vender_id = obj.venderId;
					if (dapeiId) obj.jdPvLogobj.dapeiid = dapeiId;
					if (window.jdPvLog) {
						window.jdPvLog(obj.jdPvLogobj);
					} else {
						window.ja_data = obj.jdPvLogobj;
					}
					obj.jdPvLogobj.sku_change = '1';
					$.extend(FOOTDETECT.objMsgPv, tmp);
					ECC.cloud.report.pv(FOOTDETECT.objMsgPv);
				}
			}, 200);
		obj.txReport({
			isPV: true
		});
	};
	ItemDet.prototype.setDetTab = function() {
		if (!this.tabInit) return;
		this.tabInit = false;
		var obj = this;
		this.sliderDetail = loopScroll.init({
			moveDom: $('#detailCont'),
			moveChild: $('#detailCont > div'),
			tab: $('#detailTab span'),
			viewDom: $('#detailCont'),
			index: 1,
			lockScrY: true,
			min: this.pageWidth,
			step: Math.min(this.pageWidth, 640),
			fun: function(index) {
				obj.showDetTab(index);
			}
		});
	};
	ItemDet.prototype.showPart = function(part, func) {
		this.cpart = part, obj = this;
		var arr = ['main', 'address', 'tab', 'summary', 'yanbao', 'related', 'gift', 'landing'];
		if (part != 'main') {
			this.mainViewScroll = $(window).scrollTop();
			$('#jdBtmLogo').parent().hide();
		} else {
			$('#jdBtmLogo').parent().show();
		}
		setTimeout(function() {
			for (var i = 0; i < arr.length; i++) {
				arr[i] == part ? $('#part_' + arr[i]).show() : $('#part_' + arr[i]).hide();
			};
			if (part == 'tab') {
				obj.setDetTab();
				obj.setDetHeight();
			}
			part == 'main' ? window.scrollTo(0, obj.mainViewScroll) : window.scroll(0, 0);
			if (func) func();
		}, 200);
	};
	ItemDet.prototype.setProtalImg = function(images) {
		$('#loopImgDiv').attr('setimg', '1');
		if (!images || images.length == 0) return;
		var imgStr = [],
			tab = [],
			subfix = '//m.360buyimg.com/mobilecms/s750x750_';
		var wh = 'style="width:' + window._wb + 'px; height:' + window._wb + 'px;"';
		if (~ (' 2g 2G 3g 3G ').indexOf(' ' + this.network + ' ')) subfix = '//img14.360buyimg.com/n1/';
		this.loopImg = [];
		for (var i = 0; i < images.length; i++) {
			tab.push('<li></li>');
			var src = subfix + images[i];
			src = JD.img.getImgUrl(src);
			this.loopImg.push(src.replace(/\s+/g, ''));
			if (this.isImgInit && i == 0) continue;
			imgStr.push('<li ' + wh + (i == 0 ? ' id="firstImgLi"' : '') + '><img back_src="' + src + '"></li>');
		}
		$('#loopImgBar').html(tab.join(''));
		this.isImgInit ? $('#loopImgUl').append(imgStr.join('')) : $('#loopImgUl').html(imgStr.join(''));
		$('#loopImgUl').css({
			left: '0px'
		});
		$('#popupImg').attr('src', this.loopImg[0]);
		this.sliderProtal = loopScroll.init({
			tp: 'img',
			loadImg: true,
			moveDom: $('#loopImgUl'),
			moveChild: $('#loopImgUl li'),
			tab: $('#loopImgBar li'),
			loopScroll: (this.loopImg.length > 1 ? true : false),
			lockScrY: true,
			imgInitLazy: 1000,
			index: 1,
			fun: function(index) {}
		});
		if (images.length) {
			window.shareConfig.img_url = this.protocol + '//img14.360buyimg.com/n4/' + images[0];
		}
		this.isImgInit = false;
		itemSpec.initLabeling(this.item().pTag);
	};
	ItemDet.prototype.showDetTab = function(index) {
		var isChange = this.detIndex != index;
		if (!isChange) return;
		var st = $(window).scrollTop();
		this.detTabH = $('#detailBaseLine').offset().top;
		this.detIndex = index;
		if (index == 1) this.loadCommDet();
		if (index == 2) {
			this.loadCommParam();
			this.loadPackgeSer();
		}
		if (index == 3) {
			this.loadPackgeSer();
			if (this.isOverseaPurchase > 0) {
				$('#detail3Normal').hide();
				$('#detail3Global').show();
			} else {
				$('#detail3Normal').show();
				$('#detail3Global').hide();
			}
		}
		if (st > this.detTabH && isChange) {
			window.scrollTo(0, this.detTabH + 20);
		}
		this.setDetHeight();
	};
	ItemDet.prototype.getTabData = function() {
		if (this.detIndex == 3) {
			this.loadPackgeSer();
		} else if (this.detIndex == 2) {
			this.loadCommParam();
			this.loadPackgeSer();
		} else if (this.detIndex == 1) {
			this.loadCommDet();
		}
	};
	ItemDet.prototype.getVerifyCode = function(opt) {
		opt = opt || {};
		var obj = this,
			param = {
				businessId: 'pcp.m.jd.com',
				ip: obj.priceVerify.ip,
				pin: cookie.get('pin') || '',
				ua: navigator.userAgent,
				referer: document.referrer
			},
			callback = opt.callback,
			flag = opt.flag;
		if (!obj.priceVerify.ip) {
			obj.priceVerify.isJump = true;
			return;
		}
		if (flag) {
			setTimeout(function() {
				if (!obj.priceVerify.bsid || !obj.priceVerify.img) {
					callback = false;
					obj.priceVerify.isJump = true;
					obj.getSkuPrice(null, obj.item().areaSkuId);
				}
			}, 2000);
		}
		window.priceVerifyCB = function(json) {
			if (!json || !json.sec_comp || !json.sec_comp.length) {
				if (flag) {
					obj.priceVerify.isJump = true;
					obj.getSkuPrice(null, obj.item().areaSkuId);
				}
				return;
			}
			var secComp = json.sec_comp[0],
				imgParam = {
					bsid: secComp.bsid,
					ip: obj.priceVerify.ip,
					pin: cookie.get('pin') || '',
					ua: navigator.userAgent,
					referer: document.referrer
				};
			obj.priceVerify.bsid = secComp.bsid;
			obj.priceVerify.img = '//pcp.m.jd.com/authCode.auth?body=' + encodeURIComponent(JSON.stringify(imgParam) + '&scr=75x30&c=m');
			callback && callback();
			$('#verifyCodeImg').attr('src', obj.priceVerify.img);
			if (flag) {
				setTimeout(function() {
					$('#verifyInput').off().on('focus', function() {
						$('#warnTip').removeClass('show');
					});
					$('#verifyCodeImg').off().on('click', function() {
						callback = null;
						obj.getVerifyCode();
					});
					$('#modAlertDiv p.btns').off().on('click', function() {
						obj.verifyCodeCheck();
					});
				}, 500);
			}
		};
		ls.loadScript('//pcp.m.jd.com/sJsonp?body=' + encodeURIComponent(JSON.stringify(param)) + '&callback=priceVerifyCB');
	};
	ItemDet.prototype.verifyCodeCheck = function() {
		var obj = this,
			inputStr = $('#verifyInput').val();
		if (!inputStr) {
			$('#warnTip').html('请输入验证码').addClass('show');
			return;
		}
		var param = {
			bsid: obj.priceVerify.bsid,
			code: inputStr,
			ip: obj.priceVerify.ip,
			type: 'captcha',
			pin: cookie.get('jdpin') || '',
			userid: (cookie.get('visitkey') || ''),
			ua: navigator.userAgent,
			referer: document.referrer
		};
		window.codeCheckCB = function(json) {
			if (json.subcode == '0') {
				obj.priceVerify.hasVerify = true;
				obj.priceVerify.isJump = true;
				obj.getSkuPrice(null, obj.item().areaSkuId);
				obj.setDelayTime();
				$('#modAlertMask,#modAlertDiv').remove();
				var tkVal = json.pdtk;
				if (tkVal && obj.domainStr.indexOf('jd.com') == -1) {
					try {
						cookie.set('pdtk', tkVal, 7200, '/', obj.domainStr);
					} catch (e) {
						console.log(e);
					}
				}
			} else {
				$('#warnTip').html('验证码错误或超时，请重新输入').addClass('show');
				obj.getVerifyCode();
			}
		};
		ls.loadScript('//pcp.m.jd.com/checkCodeJsonp?body=' + encodeURIComponent(JSON.stringify(param)) + '&callback=codeCheckCB');
	};
	ItemDet.prototype.getSkuPrice = function(json, areaSkuId) {
		var obj = this;
		if (!obj.priceVerify.isJump) return;
		window.skuPrice = function(arr) {
			var tmp = {
				id: obj.skuId,
				p: '0',
				m: '0',
				pcp: '0',
				sp: '0'
			};
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id == (obj.skuId) || arr[i].id == areaSkuId) {
					tmp = arr[i];
					obj.getPCPrice(arr[i]);
					break;
				}
			}
			var p = tmp.p * 1 > 0 ? tmp.p : 0,
				m = tmp.m * 1 > 0 ? tmp.m : 0;
			if (!obj.cfeeType) {
				if (obj.isSamGoods && obj.jdPrice > 0 && p > 0 && p != obj.jdPrice) {
					obj.createPopup({
						flag: 3,
						msg: '因地址变化，当前商品价格已自动更新，请留意价格变动'
					});
				}
				obj.setP(p);
				if (obj.isSamGoods) itemSpec.samPriceTag(tmp, obj);
				obj.getBaiTiao();
			}
			if ((obj.venderId * 1 || obj.skuType == 2 || obj.skuType == 3) && obj.jdCategory[1] != '4855' && obj.jdCategory[1] != '6929') {
				$('#priceMarket').html(m ? ('&yen;' + m) : '');
				if (m * 100 > p * 100) {
					$('#priceDis').html((Math.ceil(p * 100 / m) / 10).toFixed(1) + '折');
				}
			}
			if (window.is_xbox_yuyue && window.xbox_price) {
				$('#priceSale').html(window.xbox_price);
				$('#priceMarket').html(window.xbox_price);
			}
			obj.setShareConfig();
		};
		if (!json) {
			var price = urlParam.getUrlParam('price');
			if (price > 0) obj.setP(price);
			ls.loadScript('//pe.3.cn/prices/pcpmgets?skuids=' + this.skuId + '&origin=' + ((this.isWX || this.isQQbrowser) ? 5 : 4) + '&source=wxsq&area=' + this.jdAddrId.slice(0, 3).join('_') + '&callback=skuPrice' + '&t=' + Math.random());
		} else {
			window.skuPrice([json]);
		}
	};
	ItemDet.prototype.getPCPrice = function(price) {
		var priceWQDiscount = $("#priceWQDiscount");
		if (!price || !(price.p > 0) || !(price.pcp > 0)) {
			return;
		}
		var obj = this,
			disCount = price.pcp - price.p;
		if (disCount > 0) {
			(obj.isWX || obj.isQQbrowser) ? $('#wxSqTip').html('<i class="icon_tit_wx"></i>微信专享') : $('#wxSqTip').html('<i class="icon_tit_qq"></i>手Q专享');
			$('#pcDesc').html("比电脑买省 &yen;" + disCount.toFixed(2));
			$('#wxSqTip').show();
			$('#pcDesc').show();
			priceWQDiscount.removeClass("hide");
		}
	};
	ItemDet.prototype.showQQMemPrice = function(qqMemPrice) {
		var obj = this;
		if (obj.isWX || obj.isQQbrowser || !qqMemPrice) return;
		var price = $('#priceSale').attr('p');
		qqMemPrice = qqMemPrice.replace('¥', '').replace('￥', '');
		var disCount = (price * 1 - qqMemPrice * 1).toFixed(2).replace('.00', '').replace('.0', '');
		if (disCount > 0) {
			var url = '//mc.vip.qq.com/qqwallet/index?aid=' + (obj.isAndroid ? 'mvip.pt.vipsite.cooperation_huiyuanjia' : 'mios.pt.vipsite.cooperation_huiyuanjia') + '&send=0&ADTAG=jd001';
			$('#qqMemTip').html('<a class="tag_blue" ptag="7001.1.58" href="' + url + '">QQ会员再减 ¥' + disCount + ' <span class="btn_open_qv">去开通/续费</span></a>');
			$('#headEval').hide();
			$('#qqMemTip').show().attr('qqmemprice', qqMemPrice);
			$('#evalQQMem').show();
			$("#priceWQDiscount").removeClass("hide");
		}
	};
	ItemDet.prototype.showDownJzBox = function() {
		var obj = this,
			nowTime = new Date().getTime(),
			endTime = new Date('2016/03/01 00:00:00').getTime();
		if (obj.isWX || nowTime > endTime) return;
		var jzCategory1 = obj.jdCategory[0],
			jzCategory3 = obj.jdCategory[2],
			downStr = ' 12062 9777 12060 9780 9778 9776 6912 12061 6906 12067 12068 12066 9781 9782 9783 6911 6910 6909 6908 6907 9775 9774 9772 9770 9769 6920 6918 6917 6916 6915 6914 12064 12063 12029 12030 12037 12038 12039 12018 9740 3982 12089 12001 12004 12002 12003 9742 9741 1350 1349 9724 9725 9737 9726 12005 9728 9729 9730 9731 9732 9733 9734 9735 9736 9739 9738 1348 9720 11993 11991 11989 11988 9705 9706 9707 9708 9710 9711 9712 9713 11987 9714 9715 9716 9717 9718 9719 9721 9722 11985 11986 3983 1356 1355 1354 12000 11999 11998 11996 9751 9749 9748 9747 9745 9744 9743 12013 12008 12009 12010 9753 12011 12012 12015 12006 1369 1368 1365 1364 12014 1371 12025 12021 1376 9790 9792 9793 9794 12022 12023 12024 12026 12027 12028 12123 12141 12142 12128 12130 9758 9760 9761 9768 9754 9755 12101 12100 9759 9756 9757 9762 9765 9764 9763 12106 9766 9767 12103 12104 12107 12105 12108 12120 12158 12159 12160 5154 1491 1489 12131 12127 12125 12132 12133 12134 12135 12136 12126 12137 12138 12139 12140 12129 12124 9187 12069 5260 5259 9188 9189 9190 9191 11934 11937 11936 11935 9186 12076 5271 5265 3997 3998 2589 2588 2580 12070 5256 5257 5258 12073 1455 2584 5262 12071 12072 2587 1362 1470 2632 1471 2690 3999 5263 13049 1452 4688 ';
		var wxDownStr = ' 12218 12259 12379 12473 12813 1320 1620 1713 4051 4052 4053 4938 6196 6233 6322 6325 652 670 6728 6994 737 911 9192 9570 9669 9847 9855 9987 ';
		if (((!obj.isWX) && downStr.indexOf(' ' + jzCategory3 + ' ') < 0) || (obj.isWX && wxDownStr.indexOf(' ' + jzCategory1 + ' ') < 0)) return;
		$('#downJzApp div.tip').html('领券去');
		if (obj.isWX) $('#downJzApp >div.txt').html(' <i class="icon_zapp"></i>京致衣橱购买服饰类商品立减<span class="tag">20元</span>');
		$('#downJzApp').removeClass('hide');
		$('#downJzApp').on('click', function() {
			location.href = '//wqs.jd.com/item/jzcoupon.shtml?sku=' + obj.skuId + '&category=' + obj.jdCategory.slice(0, 3).join('|');
		});
	};
	ItemDet.prototype.getPostPrice = function(data) {
		var obj = this;
		if (obj.isExpByjd) {
			$('#postPrice').html('满99免运费');
			obj.postTip = '<h3 class="title">运费说明</h3><div class="inner"><dl><dt>京东配送</dt><dd>自营订单钻石会员满79元（含）免运费，其他会员满99元（含）免运费，不足金额订单收取6元/单运费</dd></dl><dl><dt>上门自提</dt><dd>自营订单钻石会员满79元（含）免运费，其他会员满99元（含）免运费，不足金额订单收取3元/单运费</dd></dl>' + ((obj.item().spAttr && obj.item().spAttr.PianYuanYunFei == '1') ? '<dl><dt>其他说明</dt><dd>部分商品因超重或超大额外收取5元/件运费</dd></dl>' : '') + '</div>';
			if (obj.isOTC == 1 || obj.isOTC == 2) obj.postTip = '<h3 class="title">运费说明</h3><div class="inner"><dl><dd>自营订单钻石会员满79元（含）免运费，其他会员满99元（含）免运费，不足金额订单收取6元/单运费</dd></dl></div>';
			$('#ziYingPost').show();
			$('#ziYingMsg').show()
		} else {
			$('#ziYingPost').hide();
			if (!data || !data.Dc) return;
			var dtype0, dcash0, ordermin0, json = data.Dc;
			if (json && json.length > 0) {
				dtype0 = json[0].dtype;
				dcash0 = json[0].dcash;
				ordermin0 = json[0].ordermin;
				var postPop = '';
				switch (dtype0) {
				case 0:
					postPop = (dcash0 > 0) ? ('运费' + dcash0 + '元') : '免运费';
					break;
				case 1:
				case 2:
				case 3:
					if (dcash0 > 0 && ordermin0 > 0) {
						var price = $('#priceSale').attr('p');
						if (price) {
							if (price < ordermin0) {
								obj.postTip = '<p>店铺单笔订单满' + ordermin0 + '元，免运费</p>';
								postPop = '运费' + dcash0 + '元' + '<span class="de_icon_btn" id = "postIcon" ptag="7001.1.51"><i class="icon_s_addr"></i></span>';
							} else {
								postPop = '免运费';
							}
						}
					} else if (ordermin0 == 0) {
						postPop = dcash0 > 0 ? ('运费' + dcash0 + '元') : '免运费';
					} else if (dcash0 == 0) {
						postPop = '免运费';
					}
					break;
				default:
					break;
				}
				if (postPop) {
					$('#postNotice4').html(' ' + postPop);
					$('#ziYingMsg').show();
				} else {
					$('#postNotice4').html('');
					$('#ziYingMsg').hide();
				}
			}
		}
	};
	ItemDet.prototype.setHeyueStatNew = function() {
		if (this.cfeeType && this.cfeeType.ft != 100) {
			$('#buyBtn2,#buyBtn1').html(this.getFeeBtnStr(this.cfeeType.ft));
			$('#addCart2,#addCart1').hide();
		} else {
			$('#buyBtn2,#buyBtn1').html('立即购买');
			$('#addCart2,#addCart1').show();
		}
	};
	ItemDet.prototype.getFeeBtnStr = function(ft) {
		if (ft == 18) return '选择套餐';
		if (ft == 100) return '立即购买';
		return '选择套餐和号码';
	};
	ItemDet.prototype.setP = function(p) {
		this.jdPrice = p;
		var intPrice = 0,
			decimiPrice = 0;
		if (p) {
			var parr = p.split('.');
			intPrice = parr[0];
			decimiPrice = parr[1] || '00';
		}
		$('#priceSale,#priceSale2').html(p ? ('&yen; <em>' + intPrice + '</em>.' + decimiPrice) : '暂无定价');
		$('#priceSale').attr('price', p ? '¥' + p : '暂无定价');
		$('#priceSale').attr('p', p);
	};
	ItemDet.prototype.yuShou = function(opt) {
		opt = opt || {};
		var obj = this,
			btnStr = ((this.cfeeType && this.cfeeType.ft != 100) ? this.getFeeBtnStr(this.cfeeType.ft) : ''),
			needCgi = opt.needCgi,
			isSwitch = opt.isSwitch,
			noStock = opt.noStock;
		obj.jdStatus = false;
		window.yushouJDCB = function(json) {
			obj.skuJson[obj.skuId].yuyue = json;
			if (obj.timeout.itil17) {
				obj.delTimeout('itil17');
				JD.report.umpBiz({
					bizid: '25',
					operation: '17',
					result: '0',
					source: '0',
					message: 'item yushou api success'
				});
			}
			var note = '',
				limit = 0,
				setNoteTimer = function() {
					if (note) {
						$('#statusNote').html(note.replace('limit', '<span id="timeLimit"></span>'));
						$('#popupNotice').html(note.replace('limit', '<span id="timeLimit1"></span>')).show();
						$('#certificationTimer').html(note.replace('limit', '<span id="timeLimit2"></span>')).show();
						$('#statusNotice').show();
						if (~note.indexOf('limit')) {
							obj.showLimit(limit, function() {
								var param = {
									needCgi: true,
									noStock: true
								};
								if (obj.yushouStatus == '3') {
									param.isSwitch = true;
									$('#buyBtn2').html('排队中');
								}
								if (obj.skuJson[obj.skuId].miao) obj.skuJson[obj.skuId].miao.serverTime += 2;
								setTimeout(function() {
									obj.yuShou(param);
								}, 2000);
							});
						}
					}
				},
				getIsMiao = function(callback, is_Yushou_KO) {
					if ((obj.item().spAttr && obj.item().spAttr.isKO == '1') || (obj.skuJson[obj.skuId].miao && obj.skuJson[obj.skuId].miao.isKo == '1')) {
						obj.qianggou(is_Yushou_KO);
						return;
					}
					window.isMiaoCB = function(miaoData) {
						if (miaoData.isKo == 1) {
							obj.skuJson[obj.skuId].miao = miaoData;
							obj.qianggou(is_Yushou_KO);
						} else {
							callback && callback();
						}
					};
					ls.loadScript('//wq.jd.com/deal/miao/IsMiao?callback=isMiaoCB&skuid=' + obj.skuId + '&t=' + Math.random());
				};
			if (!isSwitch || json.state != 3) {
				$('#buyBtn2').addClass('btn_disable').html('立即预约');
				$('#buyBtn1').addClass('disabled_1').html('立即预约');
			}
			if (json.type == 2) {
				$('#statusNotice').show();
				$('#statusNote').html('此商品已经售完');
				$('#popupNotice').html('此商品已经售完').show();
				$('#buyBtn2').addClass('btn_disable').html('立即预约');
				$('#buyBtn1').addClass('disabled_1').html('立即预约');
				return;
			}
			$('#statusNotice,#popupNotice').hide();
			obj.yushouStatus = json.state;
			limit = json.d;
			switch (json.state) {
			case 0:
				note = '预约还没有开始';
				break;
			case 1:
				note = '距预约开始还有：limit';
				break;
			case 2:
				$('#buyBtn2').removeClass('btn_disable');
				$('#buyBtn1').removeClass('disabled_1');
				note = '已有' + json.num + '人成功预约！';
				obj.jdStatus = true;
				break;
			case 3:
				var statusTip = (json.num > 0 ? '已有' + json.num + '人成功预约！<br/>' : '') + '距抢购开始还有：limit';
				note = (limit < 0 ? '开抢时间：敬请期待' : statusTip);
				if (!isSwitch) {
					$('#buyBtn2').addClass('btn_disable').html(btnStr || '等待开抢');
					$('#buyBtn1').addClass('disabled_1').html(btnStr || '等待开抢');
				}
				break;
			case 4:
				obj.jdStatus = true;
				note = '距抢购结束还有：limit';
				if (obj.cfeeType && obj.cfeeType.ft != 100) obj.setHeyueStatNew();
				$('#buyBtn2').removeClass('btn_disable').html(btnStr || '立即抢购');
				$('#buyBtn1').removeClass('disabled_1').html(btnStr || '立即抢购');
				if (!noStock) obj.getSkuStock();
				if (obj.koStatus != 1 && obj.koStatus != 2) {
					getIsMiao(false, true);
				}
				break;
			case 5:
				note = '抢购活动已结束。';
				$('#buyBtn2').addClass('btn_disable').html(btnStr || '立即购买');
				$('#buyBtn1').addClass('disabled_1').html(btnStr || '立即购买');
				getIsMiao();
				break;
			default:
				obj.jdStatus = true;
				$('#buyBtn2,#buyBtn1').html('立即购买');
				$('#buyBtn2, #addCart2').removeClass('btn_disable');
				$('#buyBtn1, #addCart1').removeClass('disabled_1');
				$('#addCart2,#addCart1').show();
				getIsMiao();
				break;
			}
			if (obj.koStatus != 2) setNoteTimer();
		};
		window.yushouWGCB = function(json) {
			if (json.errCode != "0") {
				obj.jdStatus = false;
				$('#buyBtn2').addClass('btn_disable').html('立即预约');
				return;
			}
			obj.jdStatus = true;
			var data = json.data;
			obj.yushouInfo = data;
			if (data.rest_seconds <= 0) {
				obj.jdStatus = false;
				$('#buyBtn2').addClass('btn_disable');
				obj.yushouStatus = 3;
				$('#statusNote').html('开抢时间：' + (data.sale_start_time || '敬请期待'));
				$('#buyBtn2').addClass('btn_disable').html(btnStr || '立即抢购');
			} else {
				$('#buyBtn2').removeClass('btn_disable');
				if (json.data.amount > 0) $('#buyBtn2').html(data.amount == '0.01' ? '1分钱预约' : (data.amount.replace('.00', '') + '元预约'));
			}
		};
		if (!needCgi && obj.skuJson[obj.skuId].yuyue && obj.skuJson[obj.skuId].yuyue.d >= 0) {
			window.yushouJDCB(obj.skuJson[obj.skuId].yuyue);
		} else {
			obj.createTimeout('17', 'item yushou api fail' + obj.skuId);
			ls.loadScript('//yushou.jd.com/youshouinfo.action?callback=yushouJDCB&sku=' + this.skuId + '&t=' + Math.random());
		}
	};
	ItemDet.prototype.qianggou = function(is_Yushou_KO) {
		(new Image).src = '//wq.jd.com/deal/miao/IsMiao?callback=aa&skuid=' + this.skuId + '&t=' + Math.random();
		var obj = this,
			btnStr = (this.cfeeType && this.cfeeType.ft != 100 ? this.getFeeBtnStr(this.cfeeType.ft) : '');
		obj.koStatus = 1;
		if (!is_Yushou_KO) {
			obj.jdStatus = false;
			$('#buyBtn2').addClass('btn_disable');
			$('#buyBtn1').addClass('disabled_1');
		}
		$('#addCart1,#addCart2').hide();
		window.qiangCB = function(json) {
			if (obj.timeout.itil18) {
				obj.delTimeout('itil18');
				JD.report.umpBiz({
					bizid: '25',
					operation: '18',
					result: '0',
					source: '0',
					message: 'item miao api success'
				});
			}
			obj.miaoErr = {
				errId: json.errId,
				errMsg: json.errMsg
			};
			if (!is_Yushou_KO) {
				$('#statusNotice,#popupNotice,#certificationTimer').show();
				$('#buyBtn2,#buyBtn1').html(btnStr || '立即抢购');
			}
			if (json.isKo == 0 && json.errId != '16385' && !is_Yushou_KO) {
				obj.koStatus = 3;
				$('#statusNote,#popupNotice,#certificationTimer').html('活动已结束，请等待开放正常购买');
				return;
			}
			var limit = 0,
				stat = 1;
			if (json.startTime - json.serverTime > 0 && !is_Yushou_KO) {
				$('#statusNote').html('离抢购开始还有：<span id="timeLimit"></span>');
				$('#popupNotice').html('离抢购开始还有：<span id="timeLimit1"></span>');
				$('#certificationTimer').html('离抢购开始还有：<span id="timeLimit2"></span>');
				$('#buyBtn2').addClass('btn_disable').html(btnStr || '等待开抢');
				$('#buyBtn1').addClass('disabled_1').html(btnStr || '等待开抢');
				limit = json.startTime - json.serverTime;
				obj.koStatus = 1;
			} else if (json.endTime - json.serverTime > 0 || json.errId == '16385') {
				obj.jdStatus = true;
				obj.koStatus = 2;
				stat = 2;
				$('#statusNotice,#popupNotice').show();
				$('#statusNote').html('抢购时间还剩：<span id="timeLimit"></span>');
				$('#popupNotice').html('抢购时间还剩：<span id="timeLimit1"></span>');
				$('#certificationTimer').html('抢购时间还剩：<span id="timeLimit2"></span>');
				$('#buyBtn2').removeClass('btn_disable').html(btnStr || '立即抢购');
				$('#buyBtn1').removeClass('disabled_1').html(btnStr || '立即抢购');
				limit = json.endTime - json.serverTime;
				if (!is_Yushou_KO) obj.getSkuStock();
				if (json.errId == '16385') $('#statusNotice').hide();
			} else if (json.endTime && json.serverTime - json.endTime > 0 && !is_Yushou_KO) {
				obj.koStatus = 3;
				$('#statusNote,#popupNotice,#certificationTimer').html('活动已结束，请等待开放正常购买');
			} else if (!is_Yushou_KO) {
				obj.jdStatus = true;
				obj.koStatus = 2;
				$('#buyBtn2').removeClass('btn_disable').html(btnStr || '立即抢购');
				$('#buyBtn1').removeClass('disabled_1').html(btnStr || '立即抢购');
				$('#statusNotice,#popupNotice,#certificationTimer').hide();
			}
			if (json.certifiction == '1') obj.setCertification();
			if (obj.koStatus != 2 && is_Yushou_KO) return;
			var setstatus = function() {
					if (limit > 0) obj.showLimit(limit, function() {
						if (stat == 1) {
							$('#statusNote').html('抢购时间还剩：<span id="timeLimit"></span>');
							$('#buyBtn2').removeClass('btn_disable').html(btnStr || '立即抢购');
							$('#popupNotice').html('抢购时间还剩：<span id="timeLimit1"></span>');
							$('#certificationTimer').html('抢购时间还剩：<span id="timeLimit2"></span>');
							$('#buyBtn1').removeClass('disabled_1').html(btnStr || '立即抢购');
							obj.jdStatus = true;
							obj.koStatus = 2;
							stat = 2;
							limit = json.endTime - json.startTime;
							setstatus();
						} else if (stat == 2) {
							obj.jdStatus = false;
							obj.koStatus = 3;
							$('#statusNote,#popupNotice').html('活动已结束，请等待开放正常购买');
							$('#buyBtn2').addClass('btn_disable').html(btnStr || '立即抢购');
							$('#buyBtn1').addClass('disabled_1').html(btnStr || '立即抢购');
						}
					});
				};
			setstatus();
		};
		if (this.skuJson[this.skuId].miao) {
			qiangCB(this.skuJson[this.skuId].miao);
		} else {
			obj.createTimeout('18', 'item miao api fail' + obj.skuId);
			ls.loadScript('//wq.jd.com/deal/miao/IsMiao?callback=qiangCB&skuid=' + this.skuId + '&t=' + Math.random());
		}
	};
	ItemDet.prototype.setCertification = function() {
		var obj = this;
		if (!this.isLogin) {
			this.login(null, function() {
				obj.setCertification();
			});
			return;
		}
		var $domTip = $('#certificationNotice p.tips');
		$domTip.html('商品为实名用户专享抢购商品');
		$('#certificationNotice').show();
		$('#popupNotice').hide();
		$('#quckArea').css('bottom', '106px;');
		window.verifyUserCB = function(json) {
			obj.jdSkuInfo.certification = json;
			if (json.retcode == 0 && json.status == 2) {
				var buyUrl = location.href;
				if (obj.koStatus == 2 || obj.yushouStatus == 4) {
					buyUrl = (obj.getBuyLink() || buyUrl);
				}
				window.certificationUrlCB = function(jsonUrl) {
					if (jsonUrl.retcode == 0 && jsonUrl.redirect) {
						obj.jdSkuInfo['certificationUrl' + obj.skuId] = jsonUrl.redirect;
						if (jsonUrl.redirect) {
							$domTip.html('商品为实名用户专享抢购商品，<span>点击立即完善账号并实名&gt;&gt;</span>');
						}
					} else {
						$domTip.html('商品为实名用户专享抢购商品，您已经是实名用户');
					}
				};
				ls.loadScript('//wq.jd.com/vipplus/LoginBrigdeAuthName?callback=certificationUrlCB&' + (obj.isWX ? 'scene=weixin&bussinessType=72' : 'scene=qq&bussinessType=73') + '&rurl=' + encodeURIComponent(buyUrl) + '&t=' + Math.random());
			}
		};
		if (this.jdSkuInfo.certification) {
			window.verifyUserCB(this.jdSkuInfo.certification);
		} else {
			ls.loadScript('//wq.jd.com/vipplus/VerifyAuthUser?callback=verifyUserCB&t=' + Math.random());
		}
	};
	ItemDet.prototype.certificationNotice = function() {
		var rurl = this.jdSkuInfo['certificationUrl' + this.skuId],
			obj = this;
		if (!rurl) return;
		if (!this.isLogin) {
			this.login(null, function() {
				obj.certificationNotice();
			});
			return;
		}
		var wid = (cookie.get("wq_uin") || cookie.get('wg_uin') || '');
		window.pinStatusCB = function(json) {
			if (json.url && json.defaultFlag == '1') {
				window.location.href = json.url;
			} else {
				window.location.href = rurl;
			}
		};
		ls.loadScript('//wq.jd.com/pinbind/QueryPinStatus?callback=pinStatusCB&sceneid=80019&wid=' + wid + '&source=' + (this.isWX ? '2' : '1') + '&rurl=' + encodeURIComponent(rurl) + '&check=' + md5.getHash(wid + location.href + 'pinstatus@20140917') + '&r=' + Math.random());
	};
	ItemDet.prototype.showLimit = function(limit, fun, fen) {
		var obj = this,
			$dom = $('#timeLimit,#timeLimit1,#timeLimit2');
		if (limit < 0) {
			$('#statusNotice,#popupNotice,#certificationTimer').hide();
			return;
		}
		if (limit > 3600 * 24) {
			$dom.html(parseInt(limit / (3600 * 24)) + '天');
		} else if (fen && limit > fen) {
			$dom.html((limit < 3600 ? '' : (parseInt(limit / 3600) + '小时')) + parseInt(limit % 3600 / 60) + '分');
		} else if (limit > 3600) {
			$dom.html(parseInt(limit / 3600) + '小时');
		} else {
			var t = limit;
			clearInterval(obj.timmer);
			obj.timmer = null;
			obj.timmer = setInterval(function() {
				t--;
				if (obj.skuJson[obj.skuId].miao) obj.skuJson[obj.skuId].miao.serverTime++;
				if (obj.skuJson[obj.skuId].yuyue) obj.skuJson[obj.skuId].yuyue.d--;
				if (t <= 0) {
					clearInterval(obj.timmer);
					obj.timmer = null;
					fun();
				} else {
					$dom.html((t < 60 ? '' : (parseInt(t / 60) + '分')) + (t % 60) + '秒');
				}
			}, 1000);
		}
	};
	ItemDet.prototype.showPromotion = function(data) {
		var obj = this,
			jsonData = {},
			htmlArr = [],
			tpl1 = $('#promoteGroupTpl').html(),
			giftArr = [],
			tpl2 = $('#promoteGiftTpl').html(),
			iconHtml = '',
			getNewUserLevel = function(e) {
				switch (e) {
				case -1:
					return '未注册';
				case 50:
				case 59:
					return '注册';
				case 56:
					return '铜牌';
				case 60:
				case 61:
					return '银牌';
				case 62:
					return '金牌';
				case 63:
					return '钻石';
				case 64:
					return '经销商';
				case 110:
					return 'VIP';
				case 66:
					return '京东员工';
				case 88:
				case 103:
				case 104:
				case 105:
					return '钻石';
				case 90:
					return '企业';
				case 5001:
				case 5002:
				case 5003:
				case 5004:
				case 5005:
					return '店铺VIP';
				case 6010:
					return 'PLUS试用';
				case 6020:
					return 'PLUS正式';
				}
				return '未知';
			};
		window.promotionCB = function(json) {
			if (!json || !json[0] || !json[0]['pis']) return;
			var promTip = {
				'1': '会员特价',
				'2': '直降',
				'3': '限购',
				'4': '京豆优惠购',
				'6': '赠券',
				'7': '赠京豆',
				'9': '限制',
				'10': '赠品',
				'11': '封顶',
				'15': '满减',
				'16': '满送',
				'17': '加价购',
				'18': '满赠',
				'19': '多买优惠',
				'20': '团购',
				'21': '京东帮',
				'22': 'QQ会员价',
				'23': '跨店铺满免',
				'36': '跨店铺满折'
			},
				promTags = ['1', '2', '3', '4', '6', '7', '9', '10', '11', '15', '16', '17', '18', '19', '20', '21', '22', '23', '29', '36'],
				promos = json[0]['pis'],
				item = {},
				itemContent = {},
				tagTypes = [],
				content = '',
				conArr = [],
				tag = '',
				idNo = 'n_',
				pid = [],
				specIds = [],
				tagName = '',
				itemLen = 0,
				promotionId = [],
				itemEtg = '',
				fullFreeTimes = 0,
				getFullFreeUrl = function() {
					if (fullFreeTimes > 0) return;
					fullFreeTimes++;
					window.showPageData28048 = function(json) {
						obj.jdSkuInfo.promotionppms = json;
						var data = json.data,
							iitem = {},
							jitem = {},
							promoItem = {},
							nowTime = new Date().getTime();
						if (!data.length) return;
						for (var i = 0, leni = data.length; i < leni; i++) {
							iitem = data[i];
							if (!iitem || !iitem.id) continue;
							promoItem = promotionId.filter(function(item) {
								return item.promotionId == iitem.id
							})[0];
							if (!promoItem) continue;
							if (promoItem.flag == 2) {
								var $dom = $('#promoteList [promotionid="' + iitem.id + '"]');
								jitem = iitem.list.filter(function(item) {
									return ~item.env.indexOf(obj.isWX ? '1' : '2') && (nowTime > new Date(item.bdate).getTime() && nowTime < new Date(item.edate));
								})[0];
								if (jitem && jitem.desc) {
									obj.iconHtml = obj.iconHtml.replace('加价购', '升级购');
									$dom.find('em.hl_red_bg').html('升级购');
									$dom.find('div.de_span').html('<span>' + iitem.list[0].desc + '</span>');
								}
							} else {
								jitem = iitem.list.filter(function(item) {
									return ~item.env.indexOf(obj.isWX ? '1' : '2') && (nowTime > new Date(item.bdate).getTime() && nowTime < new Date(item.edate));
								})[0];
								if (jitem && jitem.url) {
									$('#promShopFullfree [promotionid="' + iitem.id + '"]').attr('href', jitem.url);
								}
							}
						}
					};
					if (obj.jdSkuInfo.promotionppms) {
						setTimeout(function() {
							window.showPageData28048(obj.jdSkuInfo.promotionppms);
						}, 0);
					} else {
						ls.loadScript('//wq.360buyimg.com/data/ppms/js/ppms.pagev28048.jsonp?t=' + Math.random());
					}
				},
				str2json = function(str) {
					if (!str) return false;
					try {
						var outObj = JSON.parse(str.replace('\t', ''));
						return outObj;
					} catch (e) {
						return false;
					}
				};
			for (var i = 0; i < promos.length; i++) {
				item = promos[i];
				itemEtg = (item.etg || '').split(',');
				if (~itemEtg.indexOf('11')) continue;
				tagTypes = [];
				for (var key in item) {
					if (promTags.indexOf(key) > -1) {
						tagTypes.push(key);
					}
				}
				pid = (item.pid ? item.pid.split('_') : []);
				if (pid[1] == '10') obj.promoteTag10++;
				jsonData.promotionId = pid[0] || '0';
				itemLen += tagTypes.length;
				for (var j = 0; j < tagTypes.length; j++) {
					idNo = 'n_';
					tag = tagTypes[j];
					if (obj.isAd && (~' 23 36 '.indexOf(' ' + tag + ' ') || (~' 15 19 '.indexOf(' ' + tag + ' ') && ~itemEtg.indexOf(tag == '15' ? '4' : '14')))) continue;
					tagName = promTip[tag];
					content = item[tag].replace(/(\.00|\.0[^\d])/g, '');
					conArr = (content.indexOf('!@@!') > -1 ? content.split('!@@!') : []);
					switch (tag) {
					case '1':
						if (conArr.length > 0) {
							var isVip = (~itemEtg.indexOf('16'));
							if (obj.isLogin) {
								if (json[0].hit == '1') {
									content = '您享受' + getNewUserLevel((~' 5001 5002 5003 5004 5005 '.indexOf(' ' + conArr[0] + ' ') ? json[0].vl * 1 : (~' 6010 6020 '.indexOf(' ' + conArr[0] + ' ') ? json[0].pl * 1 : json[0].jl * 1)) || conArr[0] * 1).replace('PLUS正式', 'PLUS') + '会员' + (isVip ? '专享' : '') + '价：&yen;' + conArr[1];
									if (isVip && (conArr[0] == '50' || conArr[0] == '59')) {
										tagName = '新人专享';
										content = '您可享受新用户专享价：&yen;' + conArr[1];
									}
								} else {
									content = (isVip ? '未知' : '成为' + getNewUserLevel(conArr[0] * 1) + '会员' + '可享受会员价，最低&yen;' + conArr[1] + '起');
								}
							} else {
								content = (isVip ? '请登录 确认是否可享受该优惠' : getNewUserLevel(conArr[0] * 1) + '会员' + '可享受会员价，最低&yen;' + conArr[1] + '起');
							}
						} else {
							content = '未知';
						}
						if (~content.indexOf('未知')) itemLen--;
						break;
					case '10':
						giftArr = [];
						var giftNum = 0;
						content = str2json(conArr.length > 0 ? conArr[0] : content);
						if (!content || !content.length) {
							itemLen--;
							content = '未知';
							break;
						}
						for (var k = 0; k < content.length; k++) {
							itemContent = content[k] || {};
							if (itemContent.gt == '2') {
								jsonData.link = '//wq.jd.com/item/view?sku=' + itemContent['sid'];
								jsonData.giftImg = itemContent['mp'] ? '//img13.360buyimg.com/n5/' + itemContent['mp'] : '//misc.360buyimg.com/product/skin/2012/i/gift.png';
								jsonData.giftName = itemContent['nm'];
								jsonData.giftDesc = 'x ' + itemContent['num'];
								giftArr.push($jsonToTpl(jsonData, tpl2));
								giftNum++;
							}
						}
						if (giftNum > 0) {
							iconHtml = '<em class="hl_red_bg">赠品</em>' + iconHtml;
							$('#promoGiftEm').html('<em class="hl_red_bg">赠品</em><em class="hl_red">赠下方的热销商品，赠完即止' + (conArr.length > 0 ? ('，' + conArr.slice(1).join('，')) : '') + '</em>');
							$('#promoGiftItem').html(giftArr.join(''));
							$('#promoGift').show();
						} else {
							itemLen--;
						}
						content = '未知';
						break;
					case '15':
					case '23':
					case '19':
					case '36':
						var nowTime = new Date().getTime();
						if (~' 23 36 '.indexOf(' ' + tag + ' ') || (~' 15 19 '.indexOf(' ' + tag + ' ') && ~itemEtg.indexOf(tag == '15' ? '4' : '14'))) {
							tagName = (tag == '23' ? '跨店铺满免' : (tag == '36' ? '跨店铺满折' : '跨店铺满减'));
							if (item['st'] * 1000 < nowTime) {
								jsonData.emRedBg = '<em class="hl_red_bg">' + tagName + '</em>' + '<span class="hl_yellow_bg">进行中</span>';
							} else {
								var stTime = obj.formatTime(new Date(item['st'] * 1000));
								content = stTime.month + '月' + stTime.day + '日' + stTime.hour + ':' + stTime.min + '该商品参加' + tagName + '活动，' + content;
								tagName = '活动预告';
								jsonData.emRedBg = '<em class="hl_red_bg">' + tagName + '</em>';
							}
							iconHtml = '<em class="hl_red_bg">' + tagName + '</em>' + iconHtml;
							jsonData.link = 'javascript:void(0);';
							jsonData.no = 'n_' + i + (j + 1);
							if (pid[0]) {
								jsonData.link = '//wq.jd.com/search/searchpr?ptag=7001.1.7&promotion_aggregation=yes&activity_id=' + pid[0] + '&pro_d=' + (encodeURIComponent(tagName)) + '&pro_s=' + (encodeURIComponent(content));
								specIds.push('promo_item_pos_' + i + (j + 1));
								jsonData.no = 's_' + i + (j + 1);
							}
							jsonData.emSpan = '<span>' + content + '</span >';
							$('#promShopFullfree').append($jsonToTpl(jsonData, tpl1)).show();
							promotionId.push({
								promotionId: pid[0]
							});
							getFullFreeUrl();
							content = '未知';
						}
						idNo = 's_';
						break;
					case '22':
						obj.showQQMemPrice(content);
						itemLen--;
						content = '未知';
						break;
					case '16':
					case '17':
					case '18':
						if (tag == '17') {
							promotionId.push({
								promotionId: pid[0],
								flag: 2
							});
							getFullFreeUrl();
						}
						idNo = 's_';
						break;
					case '29':
						content = str2json(conArr.length > 0 ? conArr[0] : content);
						if (!content || !content.length) {
							itemLen--;
							content = '未知';
							break;
						}
						obj.giftPool = {};
						for (var k = 0, lenk = content.length; k < lenk; k++) {
							itemContent = content[k] || {};
							if (!itemContent.pno) continue;
							if (itemContent.gt == '2') {
								if (!obj.giftPool[itemContent.pno]) obj.giftPool[itemContent.pno] = {
									'inStock': [],
									'outStock': []
								};
								obj.giftPool[itemContent.pno].inStock.push(itemContent);
							}
						}
						var pnoTpl = '<li class="item" id="giftPoolItem_{#pno#}" sku="{#sid#}"><img src="{#img#}" alt="赠品图片"></li>',
							pnoNum = 0,
							pnoHtml = [],
							inStockArr = [],
							outStockArr = [],
							partPnoHtml = [],
							partItemHtml = [],
							partPnoTpl = '<section class="main"><h1 class="head">{#poolName#}<span>（{#nums#}选1）</span></h1><div class="container"><ul class="gifts">{#giftStr#}</ul><a href="//wq.jd.com/item/view?sku={#sid#}" class="detail" id="partGiftDetail_{#pno#}">{#detailStr#}</a></div></section>',
							partItemTpl = '<li class="gift {#outStock#} {#chosen#}" id="partGiftItem_{#sid#}" sku="{#sid#}" pno="{#pno#}"><img src="{#img#}" alt="赠品图片"><i class="icon_choose"></i></li>',
							partDetailTpl = '<img src="{#imgBig#}" alt="赠品图片"><div class="content"><h1 class="title">{#nm#}</h1><p class="prop_and_num"><em class="prop">赠品</em><span class="num">x{#num#}</span></p></div>',
							tplStr = function(opt) {
								var arr = opt.arr || [],
									flag = opt.flag,
									tpl = opt.tpl,
									item = {},
									outStrHtml = [];
								if (arr.length > 0) {
									for (var k = 0, lenk = arr.length; k < lenk; k++) {
										item = arr[k] || {};
										item.outStock = flag ? 'none' : '';
										item.chosen = (item.chosen ? 'active' : '');
										if (item.mp) {
											item.img = JD.img.getImgUrl('//img13.360buyimg.com/n5/' + item.mp);
											item.imgBig = JD.img.getImgUrl('//img13.360buyimg.com/n3/' + item.mp);
										} else {
											item.img = '//misc.360buyimg.com/product/skin/2012/i/gift.png';
											item.imgBig = '//misc.360buyimg.com/product/skin/2012/i/gift.png';
										}
										outStrHtml.push($jsonToTpl(item, tpl));
									}
								}
								return outStrHtml.join('');
							};
						for (var pno in obj.giftPool) {
							if (obj.giftPool.hasOwnProperty(pno) && obj.giftPool[pno] && obj.giftPool[pno].inStock.length > 0) {
								pnoNum++;
								if (pnoNum > 5) break;
								inStockArr = obj.giftPool[pno].inStock;
								outStockArr = obj.giftPool[pno].outStock;
								partItemHtml = [];
								itemContent = inStockArr[0];
								itemContent.chosen = true;
								partItemHtml.push(tplStr({
									arr: inStockArr,
									tpl: partItemTpl
								}));
								partItemHtml.push(tplStr({
									arr: outStockArr,
									tpl: partItemTpl,
									flag: true
								}));
								partPnoHtml.push($jsonToTpl({
									poolName: itemContent.poolName,
									nums: inStockArr.length + outStockArr.length,
									giftStr: partItemHtml.join(''),
									sid: itemContent.sid,
									pno: itemContent.pno,
									detailStr: $jsonToTpl(itemContent, partDetailTpl)
								}, partPnoTpl));
								pnoHtml.push($jsonToTpl(itemContent, pnoTpl));
							}
						}
						if (pnoNum > 0) {
							obj.isGiftPool = true;
							$('#giftPoolItem').html(pnoHtml.join(''));
							$('#partGiftTip').html('<span>您可以选择' + pnoNum + '件搭配赠品</span>');
							$('#giftPoolTip').html('<span>赠品</span>此套餐包含' + pnoNum + '件搭配赠品，点击选择切换');
							$('#partGiftGroup').html(partPnoHtml.join(''));
							$('#giftPool').show().on('click', function() {
								location.hash = '#gift';
							});
						}
						content = '未知';
						itemLen--;
						break;
					default:
						break;
					}
					if (content.indexOf('未知') == -1) {
						iconHtml += '<em class="hl_red_bg">' + tagName + '</em>';
						jsonData.link = 'javascript:void(0);';
						if (pid[0] && idNo == 's_') {
							jsonData.link = '//wq.jd.com/search/searchpr?ptag=7001.1.7&promotion_aggregation=yes&activity_id=' + pid[0] + '&pro_d=' + (encodeURIComponent(tagName)) + '&pro_s=' + (encodeURIComponent(content));
							specIds.push('promo_item_pos_' + i + (j + 1));
						}
						jsonData.no = idNo + i + (j + 1);
						jsonData.emRedBg = '<em class="hl_red_bg">' + tagName + '</em>';
						jsonData.emSpan = '<span>' + content + '</span >';
						htmlArr.push($jsonToTpl(jsonData, tpl1));
					}
				}
			}
			$('#promoteList').html(htmlArr.join(''));
			for (var i = 0; i < specIds.length; i++) {
				$('#' + specIds[i]).show();
			}
			if (itemLen > 0) {
				obj.iconHtml += iconHtml;
				$('#promoteList').show();
			} else {
				$('#promoteList').hide();
			}
		};
		if (data && data[0] && data[0]['pis']) {
			obj.setDelayTime();
			window.promotionCB(data);
			obj.setPromoteTitle();
		}
	};
	ItemDet.prototype.setPromoteTitle = function() {
		if (!this.iconHtml) return;
		var tipProm = '可享受以下促销';
		if (this.promoteTag10 > 1) {
			tipProm = '以下促销活动可在购物车内进行切换选择';
			$('#promote').addClass('de_c_red').removeClass('de_span');
		}
		$('#promote').html(tipProm);
		$('#promoteIcon').removeClass('icon_point_drop').addClass('icon_point_up');
		$('#promotePanel').show();
		setTimeout(function() {
			$('#promGroup').show();
		}, 300);
	};
	ItemDet.prototype.loadScriptJs = function(opt) {
		opt = opt || {};
		var tag = opt.tag,
			url = opt.url;
		if (this.loadJsObj[tag]) return;
		this.loadJsObj[tag] = true;
		var scriptJs = document.createElement('script');
		scriptJs.src = url;
		document.body.appendChild(scriptJs);
	};
	ItemDet.prototype.showMarketPrice = function() {
		if (!this.jdCategory) return;
		var jdId = ['', 1316, 5025, 737, 670, 652, 4938, 6728, 9987, 1320, 12259, 9192, 12193, 1528, 1526, 1527, 1525, 1524, 1523, 1702, ''].join(',');
		var popId = ['', 1316, 5025, 12193, 1528, 1526, 1527, 1525, 1524, ''].join(',');
		var cate = ',' + this.jdCategory.join(',|,') + ',',
			reg = new RegExp(cate);
		if (this.skuType == 2 || this.skuType == 3) {
			$('#priceMarket, #priceDis').show();
		}
	};
	ItemDet.prototype.getSkuStock = function(data) {
		var obj = this;
		if (!obj.jdStatus || obj.isWareOff) return;
		window.stockCallback = function(json) {
			var stock = json.stock || json;
			$('#postNotice1, #postNotice2, #serviceInfo').html('');
			switch (stock.StockState) {
			case 33:
			case 39:
			case 40:
				$('#postNotice1').html('有货');
				$('#postNotice2').html('');
				if (new RegExp('无货|售罄|预订').test($('#statusNote').text())) $('#statusNotice,#popupNotice,#certificationTimer').hide();
				if (!obj.isSpecItem) {
					$('#arrivalNotice,#viewGuess,#arrivalNotice1,#viewGuess1').hide();
					$('#buyBtn2, #addCart2,#buyBtn1,#addCart1').show();
				}
				$('#buyBtn2, #addCart2').removeClass('btn_disable');
				$('#buyBtn1, #addCart1,#popupConfirm').removeClass('disabled_1');
				obj.jdStatus = true;
				if (obj.koStatus == 3) {
					$('#addCart2,#addCart1').show();
					$('#statusNotice').hide();
					$('#buyBtn2,#buyBtn1').html('立即购买');
				}
				break;
			case 36:
				$('#postNotice1').html(stock.ArrivalDate ? ('预订，预计' + stock.ArrivalDate + '日后有货') : '预订，商品到货后发货，现在可下单');
				$('#buyBtn2, #addCart2').removeClass('btn_disable');
				$('#buyBtn1, #addCart1,#popupConfirm').removeClass('disabled_1');
				obj.jdStatus = true;
				break;
			case 0:
			case 34:
			default:
				if (obj.koStatus == 2 || obj.yushouStatus == 4) {
					obj.setBtnStatus({
						msg: '该商品已售罄<br/>未成功支付的订单取消后，库存将被释放，敬请关注'
					});
					$('#certificationTimer').html('该商品已售罄，敬请关注库存变化').show();
					$('#quckArea').css('bottom', '96px;');
				} else {
					obj.setBtnStatus({
						msg: '无货，或此商品不支持配送至' + obj.jdAddrName[1] + obj.jdAddrName[2]
					});
					if (!obj.isSpecItem) {
						$('#buyBtn2, #addCart2,#buyBtn1,#addCart1').hide();
						$('#viewGuess,#viewGuess1').show();
						if (obj.isZiying) $('#arrivalNotice,#arrivalNotice1').show();
						$('#popupConfirm').parent().removeClass('show').hide();
						$('#buyBtn1').parent().addClass('show').show();
					}
				}
				$('#buyBtn2, #addCart2').addClass('btn_disable');
				$('#buyBtn1, #addCart1,#popupConfirm').addClass('disabled_1');
				obj.jdStatus = false;
				break;
			}
			itemSpec.landingMatch(stock, obj);
			obj.isExpByjd = obj.isZiying || (stock.D && stock.D.type == 1);
			if (stock.code == 3 || stock.code == 4) {
				obj.setFullAddr();
			}
			var pr = stock.pr,
				ir = stock.ir || [];
			if (pr && pr.resultCode == 1) $('#postNotice2').html(pr.promiseResult);
			var spAttr = obj.item().spAttr,
				is7t = spAttr.is7ToReturn,
				html = [],
				tpl = $('#serviceTpl').html();
			if (is7t === '0' || obj.isOTC == 1 || obj.isOTC == 2) {
				is7t = '<div class="item"><div class="label"><i class="icon_service icon_7day disabled"></i><div class="txt">不支持7天无理由退换货</div></div></div>';
			} else if (is7t === '1' || is7t === null) {
				is7t = '<div class="item"><div class="label"><i class="icon_service icon_7day"></i><div class="txt">支持7天无理由退货</div></div></div>';
			} else {
				is7t = '';
			}
			var icoName = {
				sendpay_211: '211限时达',
				pop_PaymentCod: '货到付款',
				sendpay_411: '极速达',
				appliances_PaymenCod: '货到付款'
			};
			var icoShow = 'NL_CJBDY,sendpay_411,sendpay_311,sendpay_211,sendpay_nextday,sendpay_aftertomorrow,jingdou_xiankuan,payment_cod,special_ziti,free_delivery,service_home,appliances_NightShip,appliances_211,jingdou_xiankuan_appliances,appliances_PaymenCod,appliances_OpenAhead,appliances_Install,appliances_Delivery,appliances_free_delivery,pop_SendpayTJOnetime,pop_SendpayToday,pop_SendpayNextday,pop_SendpayAftertomorrow,pop_PaymentCod,ps_Jbd,pop_Selfpick,pop_FreightInsurance,POP_freeSend,pop_pinzhixian';
			for (var i = 0; i < ir.length; i++) {
				if (ir[i].iconCode == 'pop_PaymentCod') obj.isCashDelivery = true;
				if (icoShow.indexOf(ir[i].iconCode) == -1) continue;
				ir[i].iconSrc = icoName[ir[i].iconCode] ? icoName[ir[i].iconCode] : ir[i].iconSrc;
				if (ir[i].resultCode == 1) html.push($jsonToTpl(ir[i], tpl));
			}
			if (is7t || html.length > 0) $('#serviceInfo').html(is7t + html.join('')).show();
			if (html.length > 0) {
				$('#serviceArea .icon_point').show();
				$('#serviceArea').attr('hasmore', '1');
			} else {
				$('#serviceArea .icon_point').hide();
				$('#serviceArea').attr('hasmore', '0');
			}
			if (!obj.skuJson[obj.baseSkuId] || !obj.skuJson[obj.baseSkuId].stock) {
				obj.shopInfo(stock);
			}
			if (!obj.skuJson[obj.skuId].stock) {
				obj.skuJson[obj.skuId].stock = stock;
				obj.getPostPrice(stock);
			}
			if ($('#postNotice2').text().replace(/\s/g, '')) $('#ziYingMsg').show();
		};
		if (data) {
			window.stockCallback(data);
		} else {
			var pduid = cookie.get('__jda') || '',
				pdpin = cookie.get('pin');
			if (pduid) pduid = pduid.split('.')[1];
			ls.loadScript({
				url: ['//c0.3.cn/stock?callback=stockCallback&buyNum=1', 'skuId=' + obj.skuId + (pduid ? '&pduid=' + pduid : '') + (pdpin ? '&pdpin=' + encodeURIComponent(pdpin) : ''), 'venderId=' + obj.venderId, 'cat=' + obj.jdCategory.slice(0, 3).join(','), 'area=' + obj.jdAddrId.slice(0, 4).join('_'), 'ch=' + (obj.isWX ? 4 : 5), 'extraParam=' + encodeURIComponent('{"originid":"3"}'), 't=' + Math.random()].join('&'),
				charset: 'GBK'
			});
		}
	};
	ItemDet.prototype.setFullAddr = function() {
		this.getAddrTime++;
		if (this.getAddrTime > 4) return;
		var index = 0,
			obj = this;
		for (var i = 0; i < this.jdAddrId.length; i++) {
			if (this.jdAddrId[i] * 1 < 1) break;
			index = i;
		};
		window.setAddrCB = function(arr) {
			if (arr.length) {
				obj.jdAddrId[index + 1] = arr[0].id;
				obj.jdAddrName[index + 1] = arr[0].name;
				cookie.set('jdAddrId', obj.jdAddrId.join('_'), 999999);
				localStorage.setItem('jdAddrId', obj.jdAddrId.join('_'));
				cookie.set('jdAddrName', obj.jdAddrName.join('_'), 999999);
				localStorage.setItem('jdAddrName', obj.jdAddrName.join('_'));
				obj.setFullAddr();
			} else {
				obj.jdStatus = true;
				obj.getSkuStock();
			}
		};
		ls.loadScript('//d.jd.com/area/get?fid=' + this.jdAddrId[index] + '&callback=setAddrCB&t=' + Math.random());
	};
	ItemDet.prototype.getSkuSummary = function() {
		var obj = this;
		window.skuSummary = function(json) {
			obj.jdSkuInfo['summary'] = json;
			var arr = json.CommentsCount,
				tmp = arr[0];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].SkuId == obj.skuId) {
					tmp = arr[i];
					break;
				}
			}
			if (obj.cpart == 'main') {
				$('#evalNo1, #evalNo2,#evalNo3').html(tmp.CommentCount || '0');
				$('#evalRate').html(tmp.GoodRateShow ? tmp.GoodRateShow + '%' : '0');
			} else {
				var no = 0;
				$('#evalHead').html($jsonToTpl(tmp, $('#evalHeadTpl').html()));
			}
		};
		if (!this.jdSkuInfo['summary']) {
			ls.loadScript({
				url: '//club.jd.com/clubservice/summary-m-' + this.jdSkuIds.join(',') + '.html?callback=skuSummary' + '&t=' + Math.random(),
				setReportUrl: function() {
					return '//club.jd.com/clubservice/summary-m-';
				}
			});
		} else {
			window.skuSummary(this.jdSkuInfo['summary']);
		}
	};
	ItemDet.prototype.setEvelHead = function(data) {
		if (this.jdSkuInfo['eval'][this.skuId][0] || !data) return;
		data.goodRateShow = data.goodRateShow > 0 ? (data.goodCount * 100 / data.commentCount).toFixed(1) : '0';
		data.goodRateShow = data.goodRateShow.replace('.0', '');
		data.commentCount == 0 ? $('#evalRate, #evalHead2, #evalTag2').hide() : $('#evalRate, #evalHead2, #evalTag2').show();
		$('#evalNo1, #evalNo2,#evalNo3').html(data.commentCount || '0');
		$('#evalRate').html(data.goodRateShow ? data.goodRateShow + '%' : '0');
		$('#evalHead').html($jsonToTpl(data, $('#evalHeadTpl').html()));
		$('#evalTab span.cur').removeClass('cur');
		$('#evalTab span[no="' + this.evalType + '"]').addClass('cur');
	};
	ItemDet.prototype.loadEval = function() {
		var obj = this;
		if (this.evalHold || this.evalPageCur > this.evalPage) {
			setTimeout(function() {
				obj.evalHold = false;
			}, 500);
			return;
		}
		$('#eveaLoading').show();
		this.evalHold = this.evalPageCur != 1;
		window.skuJDEval = function(json) {
			if (obj.timeout.itil4) {
				obj.delTimeout('itil4');
				JD.report.umpBiz({
					bizid: '25',
					operation: '4',
					result: '0',
					source: '0',
					message: 'item comments api loaded'
				});
				JD.report.umpBiz({
					bizid: '25',
					operation: '9',
					result: '8',
					source: '0',
					message: 'club back ' + obj.skuId
				});
			}
			if (obj.evalType != json.score) return;
			var isMain = obj.cpart == 'main',
				evalDom = isMain ? $('#evalDet_main') : $('#evalDet_summary');
			var sdImg = function(imgs) {
					var str = '',
						p = '',
						imgSrc = '',
						len = imgs.length,
						isMore = len > 4,
						strMore = isMore ? '<span class="tip_more" onclick="$(this).hide().parent().parent().find(\'.more_img\').show()">点击查看更多晒图</span>' : '';
					for (var i = 0; i < len; i++) {
						imgSrc = imgs[i].imgUrl.replace('http://', '//');
						p = imgSrc.replace('s128x96_', '');
						str += '<span class="img"><img ptag="7001.1.29" src="' + imgSrc + '" prview="' + p + '"/>' + (i == 3 ? strMore : '') + '</span>';
						if (isMore) {
							if (i == 3) str += '<span class="more_img" style="display:none">';
							if (i == (len - 1)) str += '</span>';
						}
					}
					return str;
				};
			obj.setEvelHead(json.productCommentSummary);
			if (obj.evalPageCur == 1) obj.jdSkuInfo['eval'][obj.skuId][obj.evalType] = json;
			$('#eveaLoading').hide();
			var data = json.comments,
				html = [],
				tpl = $('#evalTpl').html();
			for (var i = 0; data && i < data.length; i++) {
				if (isMain && i >= 3) break;
				data[i].creationTime = data[i].creationTime.slice(0, 10);
				data[i].name = data[i].anonymousFlag == 1 ? (data[i].nickname.substr(0, 1) + '***' + data[i].nickname.substr(-1)) : data[i].nickname;
				data[i].levelName = data[i].anonymousFlag == 1 ? '' : ('(' + data[i].userLevelName + ')');
				data[i].sku = (data[i].productColor ? ('<span>颜色：' + data[i].productColor + '</span>') : '') + (data[i].productSize ? ('  <span>型号：' + data[i].productSize + '</span>') : '');
				data[i].shaidanImg = data[i].images ? sdImg(data[i].images) : '';
				data[i].score_code = Math.min(100, data[i].score * 20);
				data[i].reply = '<a href="//wqs.jd.com/my/comment/list.shtml?view=wg.my.commentview-init&from=1&productid=' + data[i].referenceId + '&guid=' + data[i].guid + '&PTAG=37287.3.1" onclick="return !window.holdAction;"  class="btn">' + (data[i].replyCount > 0 ? '<span class="num">' + data[i].replyCount + '</span>' : '') + '回复</a>';
				html.push($jsonToTpl(data[i], tpl));
			}
			var str = (html.length ? html.join('') : '<li class="null"><center>暂无评价，欢迎您购买之后留下您的宝贵评价：）</center></li>');
			obj.evalPageCur == 1 ? evalDom.html(str) : evalDom.append(str);
			if (isMain) {
				if (html.length >= 3) {
					$('#summaryEnter2, #summaryEnterIco').show();
					$('#summaryEnter').attr('hashval', 'summary');
				} else {
					$('#summaryEnter2, #summaryEnterIco').hide();
					$('#summaryEnter').removeAttr('hashval');
				}
			}
			var tagHtml = '',
				tags = json.hotCommentTagStatistics;
			if (obj.evalPageCur == 1 && tags) {
				for (var i = 0; i < tags.length; i++) {
					tagHtml += '<span>' + tags[i].name + '(' + tags[i].count + ')</span>';
				}
				$('#evalTag, #evalTag2').html(tagHtml);
				if (tagHtml == '') {
					$('#evalTag').hide();
				}
			}
			obj.evalHold = false;
			var pcs = json.productCommentSummary || {},
				count = [pcs.commentCount, pcs.poorCount, pcs.generalCount, pcs.goodCount, pcs.showCount];
			obj.evalPage = Math.ceil(count[obj.evalType] / 10) || 1;
			obj.evalTotal = pcs.commentCount;
			obj.evalPageCur++;
			if (!isMain && obj.evalPageCur > obj.evalPage && html.length) {
				evalDom.append('<li class="null">没有更多评价啦 </li>');
			}
		};
		if (!this.jdSkuInfo['eval']) this.jdSkuInfo['eval'] = {
			1: 1
		};
		if (!this.jdSkuInfo['eval'][this.skuId]) this.jdSkuInfo['eval'][this.skuId] = {};
		if (this.jdSkuInfo['eval'][this.skuId][this.evalType] && obj.evalPageCur == 1) {
			window.skuJDEval(this.jdSkuInfo['eval'][this.skuId][this.evalType]);
		} else {
			ls.loadScript({
				url: '//club.jd.com/productpage/p-' + this.skuId + '-s-' + this.evalType + '-t-0-p-' + (obj.evalPageCur - 1) + '.html?callback=skuJDEval&t=' + Math.random(),
				setReportUrl: function() {
					return '//club.jd.com/productpage/p-';
				}
			});
			JD.report.umpBiz({
				bizid: '25',
				operation: '9',
				result: '7',
				source: '0',
				message: 'club ' + obj.skuId
			});
			obj.createTimeout('4', 'item eval api fail' + obj.skuId);
		}
	};
	ItemDet.prototype.loadCommParam = function() {
		$('#package').hide();
		if (this.isLoadDet[this.detIndex] == this.skuId) return;
		var expandAttrDesc = {},
			obj = this;
		if (this.skuJson[obj.skuId] && this.skuJson[obj.skuId].expAttr) {
			expandAttrDesc = this.skuJson[obj.skuId].expAttr;
		} else {
			expandAttrDesc = this.item().expandAttrDesc || {};
		}
		if (!this.jdSkuInfo['param']) this.jdSkuInfo['param'] = {};
		commDet.loadCommParam({
			packId: 'detParam',
			json: this.jdSkuInfo['param'][this.skuId],
			skuType: this.skuType,
			infoItem: this.item(),
			expandAttrDesc: expandAttrDesc,
			specificationId: this.specificationId,
			skuId: this.skuId,
			callback: function(json) {
				obj.jdSkuInfo['param'][obj.skuId] = json;
				obj.isLoadDet[obj.detIndex] = obj.skuId;
			}
		});
	};
	ItemDet.prototype.loadCommDet = function() {
		if (this.isLoadDet[this.detIndex] == this.skuId) return;
		if (!this.jdSkuInfo['det']) this.jdSkuInfo['det'] = {};
		var key = this.skuId,
			obj = this,
			skuType = this.skuType;
		if (skuType == 2 || skuType == 3) {
			this.loadActTitleDesc();
		} else {
			if (!this.isZiying && this.venderId * 1) {
				key = this.venderId;
				if (this.jdSkuInfo['det'][key]) return;
			}
		}
		if (this.jdSkuInfo['det'][key + 'pcdet']) {
			this.showMobileDet = false;
			key += 'pcdet';
		}
		commDet.loadCommDet({
			commId: 'commDesc',
			showMobileDet: this.showMobileDet,
			pcLinkId: 'pcItemLink',
			json: this.jdSkuInfo['det'][key],
			skuType: skuType,
			descriptionId: this.descriptionId,
			skuId: this.skuId,
			callback: function(json) {
				if (json.showMobileDet == '1' && key.indexOf('pcdet') == -1) key += 'pcdet';
				obj.jdSkuInfo['det'][key] = json;
				obj.isLoadDet[obj.detIndex] = obj.skuId;
				setTimeout(function() {
					var em = $('#commDesc img').eq(0),
						init_src = em.attr('init_src');
					if (init_src) em.attr('src', init_src);
				}, 2000);
				obj.setDetHeight();
			}
		});
	};
	ItemDet.prototype.loadActTitleDesc = function() {
		var info = this.item(),
			type = info.skuType,
			str = '';
		var autherStr = function(astr) {
				var auther = astr.replace(/]/g, ']<a>').replace(/，\[/g, '</a>,[').replace(/，/g, '</a>,<a>') + '</a>';
				if (auther.indexOf('[') !== 0) auther = '<a>' + auther;
				return auther.replace(/\[/g, '<span class="cup">[').replace(/\]/g, ']</span>').replace(/,/g, '，');
			};
		(info.Author && type == 2) && (str += autherStr(info.Author) + '<span class="cup"> 著; </span>');
		(info.Editer && type == 2) && (str += autherStr(info.Editer) + '<span class="cup"> 编; </span>');
		(info.Drawer && type == 2) && (str += autherStr(info.Drawer) + '<span class="cup"> 绘; </span>');
		(info.Photography && type == 2) && (str += autherStr(info.Photography) + '<span class="cup"> 摄影; </span>');
		(info.Write && type == 2) && (str += autherStr(info.Write) + '<span class="cup"> 书写; </span>');
		if (info.Authors && type == 3) {
			if (!info.Authorsstr) {
				info.Authorsstr = '';
				var tmp = [],
					aut = info.Authors;
				for (var i = 0; i < aut.length; i++) {
					var ta = [];
					for (var j = 0; j < aut[i].author.length; j++) {
						ta.push('<a>' + aut[i].author[j].author + '</a>');
						if (ta.length == 3) {
							ta[2] = ta[2] + '...';
							break;
						}
					}
					tmp.push('<span class="cup">' + aut[i].title + '：</span>' + ta.join('，'));
				}
				if (info.Publishing_Company) {
					tmp.push('<br/><span class="cup">发行公司：</span><a>' + info.Publishing_Company + '</a>');
				}
				info.Authorsstr = tmp.join(' ');
			}
			str += info.Authorsstr;
		}
		if (info.Transfer) str += autherStr(info.Transfer.replace('，等', '')) + '<span class="cup"> 译</span>';
		if (info.Publishers) str += '<br><a>' + info.Publishers + '</a>';
		str = str.replace(/（/g, '</a>（<a>').replace(/）<\/a>/g, '</a>）');
		if (str) $('#actTitleDesc').show().html(str);
		$('#actTitleDesc a').each(function() {
			this.href = '//wqs.jd.com/search/index.shtml?ptag=7001.1.54&key=' + encodeURIComponent(this.innerHTML);
		});
		var spanTag = $('#actTitleDesc').find('span'),
			spanLen = spanTag.length;
		(spanLen > 0) && spanTag.eq(spanLen - 1).text(spanTag.eq(spanLen - 1).text().replace('; ', ''));
	};
	ItemDet.prototype.loadPackgeSer = function() {
		var obj = this;
		if (!this.jdSkuInfo['p_s']) this.jdSkuInfo['p_s'] = {};
		commDet.loadPackgeSer({
			detServer: 'detServer',
			detPackage: 'detPackage',
			json: this.jdSkuInfo['p_s'][this.skuId],
			skuId: this.skuId,
			callback: function(json) {
				obj.jdSkuInfo['p_s'][obj.skuId] = json;
				$('#package')[json.packList ? 'show' : 'hide']();
			}
		});
	};
	ItemDet.prototype.loadRelatedItem = function() {
		var obj = this,
			needAccessory = ~' 655 831 832 834 5012 2694 672 1105 '.indexOf(' ' + obj.jdCategory[2] + ' ') && (!obj.locJdGame.isGame);
		window.relatedSuit = function(json) {
			if (obj.timeout.itil10) {
				JD.report.umpBiz({
					bizid: '25',
					operation: '10',
					result: '0',
					source: '0',
					message: 'item relate api success'
				});
				obj.delTimeout('itil10');
			}
			obj.jdSkuInfo['relate' + obj.skuId] = json;
			if (json && json.accessories && json.accessories.status == 200) {
				obj.renderAccessory(json.accessories);
			}
			if (!json || json.suit.status != 200 || !json.suit.data) return;
			var relateds = [],
				max = 0,
				ct = obj.item(),
				citem = {
					sku: obj.skuId,
					name: ct.skuName,
					num: 1,
					img: obj.loopImg[0],
					link: '//wq.jd.com/item/view?sku=' + obj.skuId + '&ptag=7001.1.45'
				},
				suitList = obj.isZiying ? json.suit.data.packResponseList : json.suit.data.packList,
				item = {},
				pr = {},
				tmp = {},
				skuList = [],
				tmpItem = {};
			if (!suitList || !suitList.length) {
				return;
			}
			for (var i = 0, len = suitList.length; i < len; i++) {
				pr = suitList[i];
				pr.packPrice = pr.packPrice || {};
				tmp = {};
				skuList = [];
				if (obj.isZiying) {
					item = pr.productList;
					max = Math.max(max, pr.baseDiscount);
					tmp.reid = pr.packId;
					tmp.price = (pr.packPrice.amount).toFixed(2);
					tmp.dis = (pr.baseDiscount).toFixed(2);
					tmp.mprice = (pr.packPrice.amount + pr.baseDiscount).toFixed(2);
					tmp.item = [];
					skuList.push(pr.packId);
				} else {
					item = pr.poolList;
					max = Math.max(max, pr.packPrice.suitDiscount);
					tmp.reid = pr.packId;
					tmp.price = (pr.packPrice.packPromotionPrice).toFixed(2);
					tmp.dis = (pr.packPrice.suitDiscount).toFixed(2);
					tmp.mprice = (pr.packPrice.packOriginalPrice).toFixed(2);
					tmp.item = [citem];
					skuList.push(pr.packId);
					skuList.push(obj.skuId);
				}
				for (var j = 0, lenj = item.length; j < lenj; j++) {
					tmpItem = item[j] || {};
					if (obj.isZiying) {
						if (!tmpItem.skuId) continue;
						skuList.push(tmpItem.skuId);
						tmp.item.push({
							sku: tmpItem.skuId,
							link: '//wq.jd.com/item/view?sku=' + tmpItem.skuId + '&ptag=7001.1.45',
							name: tmpItem.skuName,
							img: '//img14.360buyimg.com/n4/' + tmpItem.skuPicUrl,
							num: tmpItem.skuNum
						});
					} else {
						if (tmpItem.selectState != 1) continue;
						tmpItem = tmpItem.colorList[0].skuList[0];
						if (!tmpItem.skuId) continue;
						skuList.push(tmpItem.skuId);
						tmp.item.push({
							sku: tmpItem.skuId,
							link: '//wq.jd.com/item/view?sku=' + tmpItem.skuId + '&ptag=7001.1.45',
							name: tmpItem.name,
							img: '//img14.360buyimg.com/n4/' + tmpItem.image,
							num: 1
						});
					}
				}
				tmp.cartid = skuList.join('_');
				relateds.push(tmp);
			};
			obj.isZiying ? obj.relatedItem[json.suit.data.skuId] = [relateds, max] : obj.relatedItem[json.suit.data.masterSkuId] = [relateds, max];
			obj.setRelated();
		};
		if (this.jdSkuInfo['relate' + this.skuId]) {
			window.relatedSuit(this.jdSkuInfo['relate' + this.skuId]);
		} else {
			obj.createTimeout('10', 'item relate api timeout');
			ls.loadScript({
				url: '//c.3.cn/recommend?callback=relatedSuit&methods=suit' + (needAccessory ? ',accessories' : '') + '&channel=' + (this.isWX ? 4 : 5) + '&sku=' + this.skuId + '&cat=' + this.jdCategory.slice(0, 3).join(','),
				charset: 'GBK'
			});
		}
	};
	ItemDet.prototype.setRelated = function() {
		var data = this.relatedItem[this.skuId];
		if (!data || data[0].length == 0) return;
		if (this.cpart == 'main') {
			$('#relatedNotice').html('最高省 <span class="price">' + data[1] + '</span>元，共' + data[0].length + '款');
			$('#relatedEnter').show();
			this.iconHtml = '<em class="hl_red_bg">优惠套装</em>' + this.iconHtml;
			this.setPromoteTitle();
		} else {
			var html = [],
				data = data[0];
			var tpl = $('#relatedTpl').html(),
				tpl2 = $('#relatedBigTpl').html(),
				tpl3 = $('#relatedSmallTpl').html();
			for (var i = 0; i < data.length; i++) {
				var html2 = [],
					html3 = [];
				for (var j = 0; j < data[i].item.length; j++) {
					html2.push($jsonToTpl(data[i].item[j], tpl2));
					html3.push($jsonToTpl(data[i].item[j], tpl3));
				};
				data[i].no = i + 1;
				data[i].itemBig = html2.join('');
				data[i].itemSmall = html3.join('');
				html.push($jsonToTpl(data[i], tpl));
			}
			$('#relatedDet').html(html.join(''));
		}
		$("#related_s_1").trigger("tap");
		if (urlParam.getUrlParam('isrelated')) window.location.hash = '#related';
	};
	ItemDet.prototype.showRelatedItem = function(em) {
		var id = em.id,
			cell = $(em.parentNode.parentNode);
		if (id.indexOf('_s_') > 0) {
			cell.addClass('detail_row_unfold');
			cell.find('[val="small"]').hide();
			cell.find('[val="big"]').show();
			this.setDelayTime();
		} else {
			cell.removeClass('detail_row_unfold');
			cell.find('[val="small"]').show();
			cell.find('[val="big"]').hide();
		}
	};
	ItemDet.prototype.renderAccessory = function(json) {
		if ($('#accessoryBd').attr('hasdata') == 1 || !json.data || !json.data.list || !json.data.list.length) return;
		var obj = this,
			list = json.data.list,
			iitem = {},
			jitem = {},
			skuArr = [],
			nameArr = [],
			ihtmlArr = [],
			jhtmlArr = [],
			jhtmlstr = '',
			tplName = '<li class="fitting {#cur#}" typeid="{#typeId#}" id="accessory_{#typeId#}" ptag="7001.1.18">{#typeName#}</li>',
			tpl = '<li class="grid_item"><a href="{#url#}" onclick="return !window.holdAction;"><div class="img_wrap"><img back_src="{#image#}"></div></a><h1 class="name">{#wName#}</h1><div class="buy_wrap"><span class="price" id="price_{#wid#}"></span><span class="buy" sku="{#wid#}" ppptag="7001.1.19" id="accessoryCart_{#no#}"></span></div></li>';
		nameArr.push($jsonToTpl({
			cur: 'cur',
			typeId: 'all',
			typeName: '精选配件'
		}, tplName));
		if (!this.jdSkuInfo.accessory) this.jdSkuInfo.accessory = {};
		for (var i = 0, leni = list.length; i < leni; i++) {
			jhtmlArr = [];
			iitem = list[i];
			iitem.cur = '';
			iitem.accessoryShows = iitem.accessoryShows || [];
			if (!iitem.accessoryShows.length) continue;
			nameArr.push($jsonToTpl(iitem, tplName));
			for (var j = 0, lenj = iitem.accessoryShows.length; j < lenj; j++) {
				jitem = iitem.accessoryShows[j];
				jitem.image = JD.img.getImgUrl('//img13.360buyimg.com/n6/' + jitem.imageUrl);
				jitem.url = '//wq.jd.com/item/view?sku=' + jitem.wid + '&ptag=37287.4.2';
				jitem.no = i + '' + j;
				jhtmlstr = $jsonToTpl(jitem, tpl);
				if (j < 2) ihtmlArr.push(jhtmlstr);
				jhtmlArr.push(jhtmlstr);
				skuArr.push(jitem.wid);
			}
			this.jdSkuInfo.accessory[iitem.typeId] = jhtmlArr;
		}
		ihtmlArr = ihtmlArr.slice(0, 24);
		if (ihtmlArr.length > 0) {
			this.jdSkuInfo.accessory.typeId = 'all';
			this.jdSkuInfo.accessory.all = ihtmlArr;
			$('#accessoryBd').html($jsonToTpl({
				accessoryTab: '<ul class="fitting_tabs">' + nameArr.join('') + '</ul>',
				tag: 'accessory'
			}, $('#guessTpl').html()));
			this.setGuessAreaHtml({
				recommendName: '配件推荐',
				html: ihtmlArr,
				tag: 'accessory',
				loopScroll: true,
				divClassName: 'slider_page',
				ulClassName: 'grid',
				num: 4
			});
			skuImgPrice.getPriceBySkus({
				skus: skuArr.join(','),
				callback: function(json) {
					obj.jdSkuInfo.accessory.price = json;
					obj.setAccessoryPrice();
				}
			});
		}
	};
	ItemDet.prototype.setAccessoryPrice = function() {
		if (this.jdSkuInfo.accessory && this.jdSkuInfo.accessory.price) {
			var json = this.jdSkuInfo.accessory.price,
				item = {},
				priceArr = [],
				priceStr = '';
			for (var i = 0, len = json.length; i < len; i++) {
				item = json[i];
				priceStr = '敬请期待';
				if (item.price > 0) {
					priceArr = this.setSpecPrice(item.price);
					priceStr = '&yen;<span class="int">' + priceArr[0] + '</span>.' + priceArr[1];
				}
				$('#price_' + item.sku).html(priceStr);
			}
		}
	};
	ItemDet.prototype.setGuessAreaHtml = function(opt) {
		var html = opt.html,
			tag = opt.tag,
			$domBd = $('#' + tag + 'Bd');
		if (!(html.length > 0)) {
			$domBd.attr('hasdata', '0');
			return;
		}
		$domBd.attr('hasdata', '1');
		$('#' + tag + 'Tab').show();
		$('#dapeiBd,#accessoryBd,#guessBd,#rankBd').hide();
		var dataNum = ($('#dapeiBd').attr('hasdata') || 0) * 1 + ($('#accessoryBd').attr('hasdata') || 0) * 1 + ($('#guessBd').attr('hasdata') || 0) * 1 + ($('#rankBd').attr('hasdata') || 0) * 1;
		if (dataNum > 1) {
			$('#guessOnly').hide();
			$('#guessRecommend').show();
			var tabIndx = JSON.parse(cache.getItem('guesstabindx') || '{}'),
				tagStore = 'guess';
			if ($('#accessoryBd').attr('hasdata') == 1) tagStore = 'accessory';
			if ($('#dapeiBd').attr('hasdata') == 1) tagStore = 'dapei';
			if (tabIndx.sku == this.baseSkuId && tabIndx.tag) tagStore = tabIndx.tag;
			if ($('#' + tagStore + 'Bd').attr('hasdata') != 1) tagStore = tag;
			$('#' + tagStore + 'Tab').addClass('cur').siblings().removeClass('cur');
			$('#' + tagStore + 'Bd').show();
		} else {
			if (opt.recommendName) $('#guessOnly').html(opt.recommendName).show();
			$('#guessRecommend').hide();
			$domBd.show();
		}
		$('#gameArea').hide();
		$('#guessArea').show();
		this.setLoopScroll(opt);
	};
	ItemDet.prototype.setLoopScroll = function(opt) {
		opt = opt || {};
		if (!opt.loopScroll) return;
		var html = opt.html,
			tag = opt.tag,
			tab = [],
			$dom = $('#' + tag + 'Item'),
			$tabDom = $('#' + tag + 'ItemTab'),
			divClassName = opt.divClassName,
			num = opt.num,
			ulClassName = opt.ulClassName,
			html1 = [].concat(html),
			showImg = function(dom) {
				dom.find('img').each(function() {
					if ($(this).attr('back_src')) {
						this.src = $(this).attr('back_src');
						$(this).removeAttr('back_src');
					}
				});
			};
		$dom.html('').attr('style', '');
		while (html1.length) {
			var div = '',
				ul = document.createElement('ul');
			ul.className = ulClassName;
			ul.innerHTML = html1.splice(0, num).join('');
			if (divClassName) {
				div = document.createElement('div');
				div.className = divClassName;
				div.appendChild(ul);
				$dom.append(div);
			} else {
				$dom.append(ul);
			}
			tab.push('<li></li>');
		}
		if (tab.length > 1) {
			$tabDom.parent().show().prev().hide();
			$tabDom.html(tab.join(''));
			loopScroll.init({
				tp: 'text',
				min: 20,
				moveDom: $dom,
				moveChild: $dom.children(),
				tab: $tabDom.find('li'),
				lockScrY: true,
				enableTransX: true,
				index: 1,
				fun: function(index) {
					showImg($(this.moveChild[index - 1]));
				}
			});
		} else {
			$tabDom.html('');
			$tabDom.parent().hide().prev().show();
			showImg($dom);
		}
	};
	ItemDet.prototype.loadRecommendSuit = function() {
		var obj = this,
			category1 = obj.jdCategory[0],
			isCloth = (~' 11729 1315 1318 1672 5025 6144 '.indexOf(' ' + category1 + ' ')),
			isFurnishing = false;
		if (obj.locJdGame.isGame || !(isCloth || isFurnishing)) return;
		obj.createTimeout('20', 'item recommendSuitCB api timeout');
		window.recommendSuitCB = function(json) {
			obj.delTimeout('itil20');
			if (!json || json.errCode != 0) {
				JD.report.umpBiz({
					bizid: '25',
					operation: 20,
					result: '2',
					source: '0',
					message: 'item recommendSuitCB api fail' + obj.skuId
				});
				return;
			}
			JD.report.umpBiz({
				bizid: '25',
				operation: 20,
				result: '0',
				source: '0',
				message: 'item recommendSuitCB api success' + obj.skuId
			});
			if (!json.recommend_dapei || !json.recommend_dapei.length || (isCloth && !json.tag)) {
				console.log('no dapei data, cat: ' + obj.jdCategory.join(','));
				return;
			}
			var recommendList = json.recommend_dapei,
				priceArr = [],
				tagMap = isCloth ? json.tag : {},
				dataItem = {},
				dataTagItem = {},
				tagStr = [],
				htmlStr = [],
				linkPre = (obj.isWX ? '//wqs.jd.com/portal/wx/collocation_detail.shtml?' : '//wqs.jd.com/portal/sq/collocation_detail.shtml?'),
				tpl = '<li><a href="{#link#}" onclick="return !window.holdAction;"><div class="coll_cover"><img back_src="{#image#}"></div><div class="coll_info"><div class="icon_tag_blue">{#tagStr#}</div><p class="name">{#title#}</p><div class="price"><i class="icon_tag_red"><span class="tag">搭配价</span>{#numStr#}</i>{#priceStr#}</div><p class="discount">{#discountStr#}</p></div></a></li>';
			if (isFurnishing) tpl = '<li><a href="{#link#}" onclick="return !window.holdAction;"><div class="cover"><img back_src="{#image#}">{#anchorStr#}</div><div class="info"><p class="name">{#title#}</p><p class="price"><span class="tag_coll"><b>搭配价</b>{#numStr#}</span>{#priceStr#}<small class="orgin">{#discountStr#}</small></p></div></a></li>';
			recommendList = recommendList.filter(function(a) {
				return a && (a.price_disabled == '1' || a.price > 0) && ((isFurnishing && a.type == '4') || (isCloth && a.type == '2'));
			});
			recommendList = recommendList.sort(function(a, b) {
				return a.price_disabled - b.price_disabled;
			});
			for (var i = 0, len = recommendList.length; i < len; i++) {
				dataItem = recommendList[i];
				tagStr = [];
				dataItem.link = linkPre + 'id=' + dataItem.dapei_id + '&ptag=37287.4.1';
				dataItem.image = JD.img.getImgUrl('//img14.360buyimg.com/dapei/s316x420_' + dataItem.mainlogo);
				if (isCloth) {
					for (var j = 0, lenJ = dataItem.taglist.length; j < lenJ; j++) {
						dataTagItem = dataItem.taglist[j];
						if (dataTagItem.tagcategory != 1 || !tagMap[dataTagItem.tagid]) continue;
						tagStr.push(tagMap[dataTagItem.tagid].tagname);
					}
					dataItem.tagStr = (tagStr.length > 0 ? '<span>' + tagStr.join('</span><span>') + '</span>' : '');
					dataItem.numStr = (dataItem.item_count > 0 ? '<span class="num">' + dataItem.item_count + '件</span>' : '');
				} else if (isFurnishing) {
					dataItem.anchorStr = '';
					if (dataItem.anchor && dataItem.anchor.length > 0) {
						for (var j = 0, lenJ = dataItem.anchor.length; j < lenJ; j++) {
							dataTagItem = dataItem.anchor[j];
							dataTagItem.className = (dataTagItem.angle > 90 ? 'tag_r' : 'tag_l');
							tagStr.push($jsonToTpl(dataTagItem, '<span class="tag {#className#}" style="top:{#y#}%;left:{#x#}%;"><i></i>{#title#}</span>'));
						}
						dataItem.anchorStr = tagStr.join('');
					}
					dataItem.numStr = (dataItem.item_count > 0 ? dataItem.item_count + '件' : '');
				}
				if (dataItem.price_disabled == '1') {
					dataItem.priceStr = '<span class="int">搭配已售完</span>';
					dataItem.discountStr = '可选择单品购买';
				} else {
					priceArr = obj.setSpecPrice(dataItem.price);
					dataItem.priceStr = '&yen;<span class="int">' + priceArr[0] + '</span>.' + priceArr[1];
					dataItem.discountStr = ((dataItem.chnl_price - dataItem.price > 0) ? '立省&yen;' + (dataItem.chnl_price - dataItem.price).toFixed(2) : '&nbsp;');
				}
				htmlStr.push($jsonToTpl(dataItem, tpl));
			}
			if (isFurnishing) htmlStr = htmlStr.slice(0, 5);
			$('#dapeiBd').html($jsonToTpl({
				accessoryTab: '',
				tag: 'dapei'
			}, $('#guessTpl').html()));
			obj.setGuessAreaHtml({
				recommendName: '搭配推荐',
				html: htmlStr,
				tag: 'dapei',
				loopScroll: true,
				divClassName: (isCloth ? 'wei_sub_colls' : ''),
				ulClassName: (isCloth ? 'coll_grid' : 'coll_furns'),
				num: (isCloth ? 2 : 1)
			});
		};
		ls.loadScript({
			url: '//wq.jd.com/bases/recommend/recommend?callback=recommendSuitCB&page=1&pagesize=10&scene=1&datatype=0&skuid=' + obj.skuId + '&areaid=' + obj.jdAddrId.slice(0, 4).join(',') + '&t=' + Math.random(),
			onError: function() {
				JD.report.umpBiz({
					bizid: '25',
					operation: 20,
					result: '2',
					source: '0',
					message: 'item recommendSuitCB api fail' + obj.skuId
				});
			}
		});
	};
	ItemDet.prototype.loadGuess = function() {
		var obj = this,
			tjw = (this.isAd ? 630006 : (this.isWX ? 902026 : 635015)),
			isMixerCgi = (!this.isAd),
			expVal = (obj.isWX ? (obj.isZiying ? '1742' : '1877') : (obj.isZiying ? '1744' : '1879')),
			isDress = false,
			isNewGuess = false;
		if (obj.locJdGame.isGame) return;
		if (isMixerCgi && obj.jdCategory[2] == '9719') {
			isDress = true;
			if (Math.random() < 0.1) isNewGuess = true;
		}
		if (isMixerCgi && !this.timeout.reloadGuess && !isNewGuess) {
			this.timeout.reloadGuess = setTimeout(function() {
				if ($('#guessBd').attr('hasdata') != 1) obj.loadGuess();
			}, 6000);
		}
		if (isMixerCgi) {
			JD.report.umpBiz({
				bizid: '25',
				operation: '9',
				result: '3',
				source: '0',
				message: 'mixer ' + obj.skuId
			});
		} else {
			if (window._PFM_TIMING) _PFM_TIMING[5] = new Date();
			JD.report.umpBiz({
				bizid: '25',
				operation: '9',
				result: '1',
				source: '0',
				message: 'diviner ' + obj.skuId
			});
		}
		window['cb' + tjw] = function(json) {
			if (!isMixerCgi) {
				if (window._PFM_TIMING) _PFM_TIMING[6] = new Date();
				JD.report.umpBiz({
					bizid: '25',
					operation: '9',
					result: '2',
					source: '0',
					message: 'diviner back ' + obj.skuId + ' pin:' + cookie.get('pin')
				});
			} else {
				JD.report.umpBiz({
					bizid: '25',
					operation: '9',
					result: '4',
					source: '0',
					message: 'mixerback ' + obj.skuId
				});
			}
			var data = json.data;
			if (!data || !data.length || $('#guessBd').attr('hasdata') == 1) return;
			var tpl = '<li><a href="{#link#}" repURL="{#clk#}" source="{#source#}" id="tjwguess_{#no#}" class="row_item" onclick="return !window.holdAction;"><div class="img_wrap"><img back_src="{#image#}"></div><div class="name">{#name#}</div><div class="buy_wrap"><span class="price" id="guessPrice_{#sku#}">{#price#}</span></div></a></li>',
				flow = json.flow,
				html = [],
				dataItem = {},
				priceSkus = [],
				linkPtag = '7001.1.45',
				len = data.length,
				isNeedMore = false,
				impr = json.impr,
				expid = getVParam('expid', impr),
				reqsig = getVParam('reqsig', impr),
				csku = getVParam('csku', impr);
			if (isMixerCgi) {
				linkPtag = (isDress ? (isNewGuess ? '37287.1.3' : '37287.1.2') : '37287.1.1');
				if (isNewGuess) {
					len += (len % 2 == 0 ? 0 : -1);
				} else {
					if (len > 29) {
						len = 29;
						isNeedMore = true;
					}
				}
			} else {
				expVal = '0';
			}
			if (isNewGuess) {
				tpl = '<li><a href="{#link#}" repURL="{#clk#}" source="{#source#}" onclick="return !window.holdAction;"><div class="cover"><img init_src="{#image#}"></div><div class="info"><div class="name">{#name#}</div><div class="price" id="guessPrice_{#sku#}">{#price#}</div></div></a></li>';
			}
			var expVal1 = expid || expVal,
				priceArr = [];
			for (var i = 0; i < len; i++) {
				dataItem = data[i];
				dataItem.link = '//wq.jd.com/item/view?sku=' + dataItem.sku + '&ptag=' + linkPtag + '&exp=' + expVal1 + '&rec=' + tjw;
				dataItem.image = JD.img.getImgUrl((isNewGuess ? '//img14.360buyimg.com/n7/' : '//img14.360buyimg.com/n2/') + dataItem.img);
				dataItem.name = dataItem.t;
				if (dataItem.jp > 0) {
					priceArr = obj.setSpecPrice(dataItem.jp);
					dataItem.price = (isNewGuess ? '&yen;<em>' + priceArr[0] + '</em>.' + priceArr[1] : '&yen;<span class="int">' + priceArr[0] + '</span>.' + priceArr[1]);
				} else {
					dataItem.price = '暂无定价';
				}
				dataItem.no = i;
				if (isMixerCgi) {
					dataItem.clk = dataItem.clk ? dataItem.clk : dataItem.clk_url;
					dataItem.link += '&flow=' + flow + '&sid=' + dataItem.sid + '&source=' + dataItem.source;
				}
				priceSkus.push(dataItem.sku);
				html.push($jsonToTpl(dataItem, tpl));
			}
			if (isNeedMore) {
				html.push('<li><a href="//wqs.jd.com/item/recommend_more.shtml?sku=' + obj.skuId + '&ptag=37287.1.1&category=' + obj.jdCategory.slice(0, 3).join('_') + '&price=' + obj.jdPrice + '&adids=' + expVal + '" class="row_item more"><div class="more_box"><i class="icon_more"></i><div class="desc">查看更多</div><div class="icon_go"></div></div></a></li>');
			}
			if (impr.indexOf('mercury') > -1) {
				report.guessyoulikeReport({
					src: 'rec',
					action: 0,
					sku: obj.skuId,
					csku: csku,
					expid: expid,
					reqsig: reqsig,
					t: 'rec.' + tjw
				});
			}
			if (isNewGuess) {
				if (!$('#newGuessArea').length) $('#detail').after('<div class="detail_gap"></div><div class="mod_recommend" id="newGuessArea"><h3 class="title">猜你喜欢</h3><ul class="list" id="newGuessList"></ul></div>');
				$('#newGuessList').html(html.join(''));
				obj.moduleAsyn({
					moduleName: 'mLazy',
					moduleKey: 'lazyLoad',
					asynAlias: {
						lazyLoad: '//wq.360buyimg.com/js/version/201605/lazyLoad.201605110918.js'
					},
					cb: function() {
						if (obj.moduleAsynObj.mLazy) {
							obj.moduleAsynObj.mLazy.autoLoadImage({
								container: 'newGuessList'
							});
						}
					}
				});
			} else {
				$('#guessBd').html($jsonToTpl({
					accessoryTab: '',
					tag: 'guess'
				}, $('#guessTpl').html()));
				obj.setGuessAreaHtml({
					recommendName: '猜你喜欢',
					html: html,
					tag: 'guess',
					loopScroll: true,
					divClassName: 'slider_page',
					ulClassName: 'row',
					num: 6
				});
			}
			skuImgPrice.getPriceBySkus({
				skus: priceSkus.join(','),
				callback: function(json) {
					if (json.length > 0) {
						var item = {},
							priceArr = [];
						for (var i = 0, len = json.length; i < len; i++) {
							item = json[i];
							if (item.price > 0) {
								priceArr = obj.setSpecPrice(item.price);
								$('#guessPrice_' + item.sku).html((isNewGuess ? '&yen;<em>' + priceArr[0] + '</em>.' + priceArr[1] : '&yen;<span class="int">' + priceArr[0] + '</span>.' + priceArr[1]));
							}
						}
					}
				}
			});
			$('#guessItem,#newGuessList').on('click', 'a', function(e) {
				var $em = $(this),
					repurl = $em.attr('repURL'),
					toLink = $em.attr('href'),
					itemSource = $em.attr('source'),
					scene = 0;
				if ($('#dapeiBd').attr('hasdata') == 1) scene = 1;
				if ($('#accessoryBd').attr('hasdata') == 1) scene = 2;
				if (isDress) scene = 4;
				if (isNewGuess) scene = 5;
				$em.attr('href', toLink + '&scene=' + scene);
				if (!repurl) return;
				if (itemSource == '1') {
					window.sessionStorage && sessionStorage.setItem('reportTJW', JSON.stringify({
						value: repurl
					}));
				}
				if (isMixerCgi) {
					var val = urlParam.getUrlParam('flow', toLink) + '_' + urlParam.getUrlParam('source', toLink) + '_' + urlParam.getUrlParam('sid', toLink);
					cookie.set('adinfo', val, 30, '/', obj.domainStr);
				}
				if (itemSource == '0' && impr.indexOf('mercury') > -1) {
					var indx = ($em.attr('id') && $em.attr('id').match(/\d+/) && $em.attr('id').match(/\d+/)[0]) || 0;
					csku = urlParam.getUrlParam('sku', toLink);
					report.guessyoulikeReport({
						src: 'rec',
						action: 1,
						sku: obj.skuId,
						csku: csku,
						expid: expid,
						reqsig: reqsig,
						index: indx,
						t: 'rec.' + tjw
					});
				}
			});

			function getVParam(name, url) {
				var u = arguments[1] || window.location.search,
					reg = new RegExp(name + "=([^\$|&]*)"),
					r = u.substr(u.indexOf("\?") + 1).match(reg);
				return r != null ? r[1] : "";
			}
		};
		var uuid = (cookie.get('jd_uuid') || cookie.get('visitkey'));
		var url = function(p) {
				var c = obj.item().category;
				if (isMixerCgi) {
					return ['//mixer.jd.com/mixer?p=' + p, 'uuid=' + uuid, 'sku=' + obj.skuId, 'pin=' + encodeURIComponent(cookie.get('pin')), 'c1=' + c[0] + '&c2=' + c[1] + '&c3=' + c[2], 'lid=' + obj.jdAddrId[0], 'lim=' + (isNewGuess ? '50' : '30') + '&sp=&hi=&fe=&fne=&ro=&ec=utf-8&iplocation=&app_info=&ad_ids=' + expVal, obj.isWX ? 'mobile_type=3&device_type=512&device_id=' + cookie.get('open_id') : 'mobile_type=4&device_type=1024&device_id=' + (cookie.get('open_id') || cookie.get('sq_open_id')), 'callback=cb' + p].join('&');
				}
				return ['//diviner.jd.com/diviner?p=' + p, 'uuid=' + uuid, 'sku=' + obj.skuId, 'pin=&c1=' + c[0] + '&c2=' + c[1] + '&c3=' + c[2], 'lid=' + obj.jdAddrId[0], 'hi=' + (obj.isWX ? cookie.get('open_id') : (cookie.get('open_id') || cookie.get('sq_open_id'))), 'lim=30&sp=&fe=&fne=&ro=', 'ec=utf-8', 'callback=cb' + p, 't=' + Math.random()].join('&');
			};
		ls.loadScript(url(tjw));
		JD.store.get("reportTJW", function(a, b) {
			if (b && b.value) {
				(new Image).src = b.value.replace('http://', '//');
				JD.store.set("reportTJW", '', function(key, value) {}, "wqs.jd.com", true);
			}
		}, "wqs.jd.com", true);
		if (window.sessionStorage && sessionStorage.getItem('reportTJW')) {
			try {
				var reportTJW = JSON.parse(sessionStorage.getItem('reportTJW')).value;
				if (reportTJW)(new Image).src = reportTJW.replace('http://', '//');
			} catch (e) {}
			sessionStorage.removeItem('reportTJW');
		}
	};
	ItemDet.prototype.loadSearchRank = function() {
		var obj = this,
			category1 = obj.jdCategory[0],
			category3 = obj.jdCategory[2];
		if (obj.locJdGame.isGame || ' 737 652 670 9987 '.indexOf(' ' + category1 + ' ') == -1) return;
		window.searchRankCB = function(json) {
			JD.report.umpBiz({
				bizid: '25',
				operation: '9',
				result: '14',
				source: '0',
				message: 'wq.jd.com back'
			});
			if (json.retcode == '0' && json.rank.length > 0) {
				var rankItem = json.rank[0],
					cdata = (rankItem.cdata || []).slice(0, 6),
					cdataItem = {},
					htmlArr = [],
					rankName = encodeURIComponent(rankItem.rankname || ''),
					tpl = '<div class="item"><a href="{#url#}" class="url"><i class="icon_tag_hot {#grey#}">{#hot#}</i><div class="cover"><img src="{#imgUrl#}"></div><div class="info"><div class="title">{#name#}</div><p class="price">{#price#}</p><p class="count">{#Accountusr#}人已购买</p></div></a></div>';
				if (cdata.length < 6) return;
				var priceArr = [];
				for (var i = 0, len = cdata.length; i < len; i++) {
					cdataItem = cdata[i];
					cdataItem.hot = i + 1;
					cdataItem.url = cdataItem.surl + '&ptag=37287.4.3';
					cdataItem.grey = (i > 2 ? 'c_grey' : '');
					cdataItem.imgUrl = '//img14.360buyimg.com/n2/' + cdataItem.img;
					if (cdataItem.price > 0) {
						priceArr = obj.setSpecPrice(cdataItem.price / 100);
						cdataItem.price = '&yen;<span class="int">' + priceArr[0] + '</span>.' + priceArr[1];
					} else {
						cdataItem.price = '暂无定价';
					}
					htmlArr.push($jsonToTpl(cdataItem, tpl));
				}
				$('#rankBd').html('<div class="hot_list">' + htmlArr.join('') + '</div><div class="hot_more"><a href="//wqs.jd.com/search/searchrankingthirdcat_' + (obj.isWX ? 'wx' : 'sq') + '.shtml?ptag=37287.4.4&catid=' + category3 + '&key=' + rankName + '&title=' + rankName + '" class="hot_more_lnk">查看完整榜单<i class="icon_arrow"></i></a></div>');
				obj.setGuessAreaHtml({
					recommendName: '热销排行',
					html: [1],
					tag: 'rank'
				});
			}
		};
		ls.loadScript('//wq.jd.com/mcoss/ranklist/bshow?callback=searchRankCB&sn=10&rt=1&rids=' + category3 + '&t=' + Math.random());
		JD.report.umpBiz({
			bizid: '25',
			operation: '9',
			result: '13',
			source: '0',
			message: 'wq.jd.com'
		});
	};
	ItemDet.prototype.setSpecPrice = function(p) {
		var parr = [];
		if (p) {
			p = (p * 1).toFixed(2);
			parr = p.split('.');
		}
		return parr;
	};
	ItemDet.prototype.detItemToSku = function() {
		var obj = this;
		obj.showMobileDet = false;
		obj.isLoadDet[obj.detIndex] = null;
		obj.jdSkuInfo['det'][obj.skuId] = null;
		obj.detIndex = 0;
		obj.showDetTab(1);
	};
	ItemDet.prototype.shopInfo = function(data) {
		if (!data) return;
		var obj = this,
			shopInfoHtml = '',
			postNotice3Html = '由 京东' + (obj.isOTC > 0 ? '大药房' : '') + ' 发货，并提供售后服务';
		if (data.serviceInfo) postNotice3Html = data.serviceInfo.replace(/<.*?>/ig, '');
		if (obj.item().spAttr && obj.item().spAttr.factoryShip == '1') postNotice3Html = '由厂家或供应商提供和配送';
		if (obj.venderId * 1) {
			var json = data.self_D || data.D || {
				vender: '京东'
			};
			obj.venderName = json.vender;
			if (obj.isZiying || obj.isOverseaPurchase > 0) {
				shopInfoHtml = '<div class="name jd_self"><span class="_n">' + json.vender + '</span>' + (obj.isOverseaPurchase > 0 ? ('<div class="mod_sign_tip bg_1 bor" style="margin-left:5px"><b><i class="i_global"></i> 全球购</b>' + (obj.isZiying ? '<span>自营</span>' : '') + '</div>') : '<em class="jd">京东自营</em>') + '</div>';
			} else {
				shopInfoHtml = (json.linkphone ? '<p class="name"><span class="_n">' + json.vender + '</span></p><p class="desc">' + json.linkphone + '</p>' : '<p class="name jd_self"><span class="_n">' + json.vender + '</span></p>');
			}
			obj.checkChartStatus(json.id);
			obj.showShopLink(obj.item().shopInfo && obj.item().shopInfo.logo);
			$('#shopLinks, #quick_shoplink,#gotoShop').show();
			obj.shopUrl = '//wq.jd.com/mshop/gethomepage?ptag=7001.1.21&venderId=' + obj.venderId + '&source=' + (obj.isWX ? 1 : 0) + '&sid=' + cookie.get('sid') + '&loginFlag=1';
			$('#shopInfo').html(shopInfoHtml);
			$('#postNotice3').removeClass('jd');
			$('#shopArea').show();
		} else {
			$('#shopArea').hide();
			$('#postNotice3').addClass('jd');
			obj.checkChartStatus();
		}
		$('#postNotice3').html(postNotice3Html);
	};
	ItemDet.prototype.getVenderInfo = function() {
		var obj = this;
		if (!(obj.venderId * 1)) return;
		window.getVenderInfoCB = function(data) {
			if (!data || (data.fansNum == '0' && data.totalNum == '0')) return;
			var tpl = '<div class="tab_item"><p class="num">{#num#}</p><p class="desc">{#desc#}</p></div>',
				html = [];
			html.push($jsonToTpl({
				num: data.fansNum || '0',
				desc: '粉丝人数'
			}, tpl));
			html.push($jsonToTpl({
				num: data.totalNum || '0',
				desc: '全部商品'
			}, tpl));
			$('#shopBaseInfo').html(html.join('')).show();
		};
		ls.loadScript('//wq.jd.com/wdcolumn/mshopnumshow/getmshopdetail?callback=getVenderInfoCB&venderid=' + obj.venderId);
	};
	ItemDet.prototype.checkIsFavShop = function() {
		var obj = this;
		if (!this.isLogin) return;
		window.checkFavShopCB = function(json) {
			if (json.iRet == "0") {
				if (json.state == "0") {
					$('#shopFav').removeClass('favor').html('<i class="icon_unfavor"></i>收藏店铺');
				} else {
					$('#shopFav').addClass('favor').html('<i class="icon_favor"></i>已收藏店铺');
				}
			}
		};
		ls.loadScript('//wq.jd.com/fav/shop/QueryOneShopFav?venderId=' + obj.venderId + '&callback=checkFavShopCB&t=' + Math.random());
	};
	ItemDet.prototype.shopFav = function() {
		var obj = this,
			$btn = $('#shopFav');
		if (!this.isLogin) {
			obj.login(null, function() {
				obj.shopFav();
			});
			return;
		}
		if (obj.isHoldFav) return;
		obj.isHoldFav = true;
		setTimeout(function() {
			obj.isHoldFav = false;
		}, 600);
		if ($btn.hasClass('favor')) {
			window.delShopFavCB = function(json) {
				if (json.iRet == "9999") return;
				if (json.iRet == "0" || json.iRet == "20") {
					$btn.removeClass("favor").html('<i class="icon_unfavor"></i>收藏店铺');
					obj.showNotice('取消成功');
				}
			};
			ls.loadScript("//wq.jd.com/fav/shop/DelShopFav?venderId=" + obj.venderId + "&callback=delShopFavCB&t=" + Math.random());
		} else {
			window.addShopFavCB = function(json) {
				if (json.iRet == "9999") return;
				if (json.iRet == "0" || json.iRet == "2") {
					$btn.addClass("favor").html('<i class="icon_favor"></i>已收藏店铺');
					obj.showNotice('收藏成功');
				}
			};
			ls.loadScript("//wq.jd.com/fav/shop/AddShopFav?venderId=" + obj.venderId + "&callback=addShopFavCB&t=" + Math.random());
		}
	};
	ItemDet.prototype.showShopLink = function(url) {
		var obj = this;
		if (url) {
			$('#shopLogo').attr('src', url);
			return;
		}
		window.shopLink = function(json) {
			if (json.errorCode == 0) {
				if (json.shopLogoUrl) {
					$('#shopLogo').attr('src', json.shopLogoUrl.replace('http://', '//'));
				}
			}
		};
		ls.loadScript('//wq.jd.com/mshop/CheckVenderId?callback=shopLink&venderId=' + this.venderId + '&t=' + Math.random());
	};
	ItemDet.prototype.checkChartStatus = function(shopId) {
		var obj = this;
		this.shopImLink = ['//wq.jd.com/mjgj/dongdong/goodsquery?skuid=' + obj.skuId, 'imgUrl=' + (encodeURIComponent(obj.loopImg[0])), 'name=' + (encodeURIComponent(obj.item().skuName)), 'price=' + ($('#priceSale').attr('p') || 'KONG'), obj.isWX ? 'source=0&entry=2' : 'source=1&entry=7', 'sid=' + encodeURIComponent(cookie.get('sid') || '')].join('&');
		window.checkChatStatuCb = function(json) {
			var $shopIM = $('#shopIM');
			$shopIM[json.code == 0 ? 'hide' : 'show']();
			$shopIM[json.code == 1 ? 'addClass' : 'removeClass']('on');
		};
		ls.loadScript('//chat1.jd.com/api/checkChat?callback=checkChatStatuCb&pid=' + obj.skuId + '&t=' + Math.random());
	};
	ItemDet.prototype.checkFav = function() {
		var obj = this;
		if (cookie.get('dofav')) {
			cookie.del('dofav');
			this.fav();
		} else if (obj.isLogin) {
			obj.createTimeout('6', 'item collection api(check) timeout');
			window.checkFav = function(json) {
				if (json.iRet != '0') return;
				var data = json.data;
				for (var i = 0; i < data.length; i++) {
					obj.favInfo[data[i].skuid] = data[i].state == '1';
				}
				obj.setFavStatus();
				obj.delTimeout('itil6');
			};
			var param = {
				'commId': this.jdSkuIds.join(','),
				'shopId': (this.venderId || 0),
				't': Math.random()
			};
			setTimeout(function() {
				ls.loadScript('//wq.jd.com/fav/comm/FavManyCommQuery?callback=checkFav&' + $.param(param));
			}, 1500);
		}
	};
	ItemDet.prototype.setFavStatus = function() {
		if (this.favInfo[this.skuId]) {
			$('#fav').addClass('yes').html('已收藏');
		} else {
			$('#fav').removeClass('yes').html('收藏');
		}
	};
	ItemDet.prototype.fav = function() {
		var obj = this;
		if (obj.isHoldFav) return;
		if (!this.jdSkuStatus) {
			if (window._isClothShoe) {
				obj.showPopupArea();
			} else {
				document.getElementById('skuCont').scrollIntoView(true);
			}
			this.showNotice('请选择颜色/尺寸');
			return false;
		}
		obj.isHoldFav = true;
		setTimeout(function() {
			obj.isHoldFav = false;
		}, 600);
		obj.createTimeout('6', 'item collection api timeout');
		if (this.favInfo[this.skuId]) {
			window.cancelFav = function(json) {
				if (json.iRet == '9999') return;
				obj.favInfo[obj.skuId] = false;
				obj.setFavStatus();
				obj.showNotice('取消成功');
				obj.delTimeout('itil6');
			};
			var param = {
				'commId': this.skuId,
				'shopId': (this.venderId || 0),
				't': Math.random()
			};
			ls.loadScript('//wq.jd.com/fav/comm/FavCommDel?callback=cancelFav&' + $.param(param));
		} else {
			window.addFav = function(json) {
				if (json.iRet == '9999') {
					if (obj.isLoginAct) {
						JD.report.umpBiz({
							bizid: '25',
							operation: '6',
							result: '0',
							source: '0',
							message: 'item collection api loaded'
						});
						return;
					}
					cookie.set('dofav', 'ok', 1);
					obj.login();
				} else if (json.iRet == '2') {
					obj.showNotice('已达到商品收藏上限');
				} else if (json.iRet == '0' || json.iRet == '3') {
					obj.favInfo[obj.skuId] = true;
					obj.setFavStatus();
					obj.showNotice('收藏成功');
				}
				obj.delTimeout('itil6');
			};
			var tmp = this.skuPro.id[this.skuId] || [],
				param = ['//wq.jd.com/fav/comm/FavCommAdd?callback=addFav&commId=' + this.skuId, 'category=' + (this.jdCategory.slice(0, 3).join('_')), 'shopId=' + (this.venderId || 0), 'commTitle=' + encodeURIComponent(this.item().skuName), 'commPrice=' + (this.jdPrice * 100).toFixed(0), 'shopName=' + encodeURIComponent(this.venderName), 'imageUrl=' + encodeURIComponent(this.loopImg[0]), 'commColor=' + (tmp[0] || ''), 'commSize=' + (tmp[1] || ''), 't=' + Math.random()];
			ls.loadScript(param.join('&'));
		}
	};
	ItemDet.prototype.loadNewYanBao = function() {
		var obj = this;
		window.yanbaoCB = function(list) {
			obj.jdSkuInfo['yanbao' + obj.skuId] = list;
			if (!list || list.length === 0) return;
			var iconArr = {
				'CXTH': 11,
				'ZHBX': 7,
				'YCBX': 8,
				'FWBZ': 10,
				'YWBH': 9
			},
				ybItemHtml = [],
				ybHtml = [],
				skuList = [],
				ybItem = {},
				skuItem = {},
				skuHtml = [],
				tpl1 = '<div class="item" id="yb_{#categoryCode#}" style="display:none;"><div class="label"><i class="icon_service icon_ins_{#iconNo#}"></i><div class="txt">{#displayName#}</div></div></div>',
				tpl2 = '<div class="mod_bm_picker"><div class="tit"><i class="icon_ins_{#iconNo#}"></i>{#displayName#}</div><div class="option_list">{#listStr#}</div></div>',
				tpl3 = '<div class="op_item" id="ybItem_{#bindSkuId#}" sku="{#bindSkuId#}" categorycode="{#categoryCode#}" skuname="{#bindSkuName#}" price="{#price#}"><div class="checkbox"><i class="icon_check"></i></div><div class="name">{#bindSkuName#}<span class="price">&yen;{#price#}</span>{#favor#}</div><div class="desc">{#tip#}</div></div>',
				favorStr = '<div class="mod_sign_tip bor"><span>优惠</span></div>';
			if (window._isClothShoe) {
				tpl1 = '<div class="item" id="yb_{#categoryCode#}" style="display:none;">{#displayName#}</div>';
				tpl2 = '<div class="service"><h1 class="name icon_ins_{#iconNo#}">{#displayName#}</h1><ul class="items">{#listStr#}</ul></div>';
				tpl3 = '<li class="item" id="ybItem_{#bindSkuId#}" sku="{#bindSkuId#}" categorycode="{#categoryCode#}" skuname="{#bindSkuName#}" price="{#price#}"><p class="type">{#bindSkuName#}{#favor#}<span class="price">&yen;{#price#}</span></p><p class="content">{#tip#}</p></li>';
				favorStr = '<span class="discount">优惠</span>';
			}
			for (var i = 0, len = list.length; i < len; ++i) {
				skuHtml = [];
				ybItem = list[i];
				skuList = ybItem.fuwuSkuWebDetailList;
				for (var j = 0, jlen = skuList.length; j < jlen; ++j) {
					skuItem = skuList[j];
					skuItem.categoryCode = ybItem.categoryCode;
					skuItem.favor = (skuItem.favor ? favorStr : '');
					skuHtml.push($jsonToTpl(skuItem, tpl3));
				}
				ybItem.iconNo = (iconArr[ybItem.categoryCode] || 0);
				ybItem.listStr = skuHtml.join('');
				ybHtml.push($jsonToTpl(ybItem, tpl2));
				ybItemHtml.push($jsonToTpl(ybItem, tpl1));
			}
			obj.yanbaoStr = ybItemHtml.join('');
			obj.yanbaoTip = '本商品支持购买' + list.length + '类京东服务，点击选择';
			if (window._isClothShoe) {
				$('#jdService').show().find('p.tips').show();
				$('#jdServiceList').hide();
				$('#popupJdService').show().html('<p class="title">京东服务</p>' + ybHtml.join(''));
			} else {
				$('#ybService').html(ybHtml.join(''));
				$('#ybArea2').html(obj.yanbaoTip);
				$('#ybArea').show();
			}
			obj.isYanBao = true;
		};
		if (obj.jdSkuInfo['yanbao' + obj.skuId]) {
			window.yanbaoCB(obj.jdSkuInfo['yanbao' + obj.skuId]);
		} else {
			ls.loadScript(['//baozhang.jd.com/bindSkusWeb/queryBindSkus.do?callback=yanbaoCB&mainSkuId=' + obj.skuId, 'brandId=' + (obj.item().brandId || ''), 'thirdCategoryId=' + (obj.jdCategory[2] || ''), 'pin=' + (cookie.get('jdpin') || ''), 'area=' + obj.jdAddrId.slice(0, 4).join('_')].join('&'));
		}
	};
	ItemDet.prototype.setNewYanBao = function() {
		var obj = this,
			$tar = '',
			$selected = [],
			$dom = '',
			$nameDom = '';
		if (window._isClothShoe) {
			$selected = $('#popupJdService .checked');
			$dom = $('#jdServiceList');
			$dom.html(obj.yanbaoStr).hide();
			if ($selected.length > 0) {
				$('#jdService p.tips').hide();
				$dom.show();
			} else {
				$('#jdService p.tips').show();
			}
		} else {
			$selected = $('#part_yanbao .op_item_selected');
			$dom = $('#ybArea2');
			$dom.html($selected.length > 0 ? obj.yanbaoStr : obj.yanbaoTip);
		}
		if ($selected.length > 0) {
			$selected.each(function(ind, item) {
				var $item = $(item);
				$tar = $('#yb_' + $item.attr('categorycode'));
				$tar.attr('sku', $item.attr('sku'));
				$nameDom = (window._isClothShoe ? $tar : $tar.find('div.txt'));
				$nameDom.html($item.attr('skuname') + '<span class="price">¥' + $item.attr('price') + '</span>');
				$tar.show();
			});
			obj.txReport({
				ptag: '7001.1.65'
			});
		}
	};
	ItemDet.prototype.getNewYanBaoList = function() {
		var obj = this,
			skuids = [],
			$tar = [],
			sku = '',
			$doms = $('#' + (window._isClothShoe ? 'jdServiceList' : 'ybArea2') + ' div.item');
		$doms.each(function(ind, item) {
			$tar = $(item);
			sku = $tar.attr('sku');
			sku && skuids.push([sku, '0', '0', '0', '0', obj.skuId, '0'].join(','));
		});
		return skuids;
	};
	ItemDet.prototype.setPartGift = function($dom) {
		if (!$dom || $dom.hasClass('none')) return;
		if (!$dom.hasClass('active')) {
			$dom.addClass('active').siblings().removeClass('active');
			var sku = $dom.attr('sku'),
				pno = $dom.attr('pno'),
				item = {},
				$partDetail = $('#partGiftDetail_' + pno);
			if (!this.giftPool[pno]) {
				console.log(this.giftPool);
				console.log(pno);
			}
			for (var i = 0, len = this.giftPool[pno].inStock.length; i < len; i++) {
				item = this.giftPool[pno].inStock[i];
				if (item.sid == sku) {
					$partDetail.attr('href', '//wq.jd.com/item/view?sku=' + sku);
					$partDetail.find('img').attr('src', item.imgBig);
					$partDetail.find('h1').html(item.nm);
					$partDetail.find('span.num').html('x' + item.num);
					break;
				}
			}
		}
	};
	ItemDet.prototype.setGiftPool = function() {
		var $em = '',
			pno = '',
			item = {},
			sku = '',
			obj = this;
		$('#partGiftGroup li.active').each(function(indx, em) {
			$em = $(em);
			pno = $em.attr('pno');
			sku = $em.attr('sku');
			if (!obj.giftPool[pno] || obj.giftPool[pno].inStock.length == 0) return true;
			for (var i = 0, len = obj.giftPool[pno].inStock.length; i < len; i++) {
				item = obj.giftPool[pno].inStock[i];
				if (item.sid == sku) {
					$('#giftPoolItem_' + pno).attr('sku', sku).find('img').attr('src', item.img);
					break;
				}
			}
		});
	};
	ItemDet.prototype.getGiftPoolList = function() {
		var skuIds = [];
		$('#giftPoolItem li.item').each(function(indx, em) {
			skuIds.push($(em).attr('sku'));
		});
		return skuIds;
	};
	ItemDet.prototype.addCart = function(param) {
		var isAccessory = (param && param.isAccessory);
		if (!isAccessory && (this.yushouStatus > 0 || !this.jdStatus)) {
			if (!this.jdStatus && !($('#addCart2').hasClass('btn_disable'))) JD.report.umpBiz({
				bizid: '25',
				operation: '8',
				result: '4',
				source: '0',
				message: 'item addcart can not add'
			});
			return false;
		}
		if (!isAccessory && !this.jdSkuStatus) {
			document.getElementById(window._isClothShoe ? 'popupSkuArea' : 'skuCont').scrollIntoView(true);
			this.showNotice('请选择颜色/尺寸');
			JD.report.umpBiz({
				bizid: '25',
				operation: '8',
				result: '2',
				source: '0',
				message: 'item addcart sku not ready'
			});
			return false;
		}
		var obj = this,
			type = 0,
			commlist = [this.skuId, this.itemId, this.buyNum, this.skuId, '1,0,0'],
			isRelated = false;
		type = (this.item().spAttr && this.item().spAttr.isXnzt == '1' ? '3' : '0');
		if (param && typeof(param) == 'object') {
			if (param.type) type = param.type;
			if (param.commlist) commlist = param.commlist;
			isRelated = param.isRelated;
		}
		if (!isAccessory && this.isGiftPool) {
			var skuIds = this.getGiftPoolList();
			if (skuIds.length > 0) commlist.push(skuIds.join('_'));
		}
		var paramStr = ['//wq.jd.com/deal/mshopcart/addcmdy?callback=addCartCB&scene=2&reg=1', 'type=' + type, 'commlist=' + commlist.join(','), 'locationid=' + [this.jdAddrId.slice(0, 3).join('-')], 't=' + Math.random()];
		if (!isAccessory && this.isYanBao) {
			var pids = this.getNewYanBaoList();
			if (pids.length > 0) {
				paramStr.push('isnewyb=1&ybcommlist=' + pids.join('$'));
			}
		}
		this.createTimeout('8', 'item addcart api timeout');
		window.addCartCB = function(json) {
			obj.delTimeout('itil8');
			if (json.errId == '13') {
				JD.report.umpBiz({
					bizid: '25',
					operation: '15',
					result: '4',
					source: '0',
					message: 'item addcart not login' + obj.skuId
				});
				if (obj.isLoginAct) {
					return;
				}
				var cookieStr = (param && typeof(param) == 'object') ? JSON.stringify(param) : 'ok';
				cookie.set('doAddCart', cookieStr, 1);
				window.location.href = json.nextUrl + encodeURIComponent(location.href.replace(obj.baseSkuId, obj.skuId));
			} else if (json.errId == '8968') {
				obj.showNotice('商品数量最大超过200');
				JD.report.umpBiz({
					bizid: '25',
					operation: '8',
					result: '5',
					source: '0',
					message: 'item addcart over 200'
				});
			} else if (json.errId == '8969') {
				obj.showNotice('添加商品失败，已超出购物车最大容量！');
				JD.report.umpBiz({
					bizid: '25',
					operation: '8',
					result: '5',
					source: '0',
					message: 'item addcart over capacity'
				});
			} else if (json.errId == '0') {
				JD.report.umpBiz({
					bizid: '25',
					operation: '8',
					result: '0',
					source: '0',
					message: 'item addcart api loaded'
				});
				if (isRelated) {
					obj.createPopup({
						flag: 4,
						msg: "商品已成功添加至购物车",
						icon: "success",
						okText: "去购物车",
						cancelText: "再逛逛",
						onConfirm: function() {
							window.location.href = '//wqs.jd.com/my/cart/jdshopcart.shtml';
						},
						onCancel: null
					});
				} else {
					obj.showNotice('添加成功');
				}
				$('#popupClose').trigger('tap');
				$('#popone').html('+' + obj.buyNum).addClass('show');
				setTimeout(function() {
					$('#popone').removeClass('show');
				}, 2000);
				obj.setCartNum(json.cart.mainSkuNum * 1);
			} else {
				obj.showNotice('添加失败，请稍后再试');
				JD.report.umpBiz({
					bizid: '25',
					operation: '8',
					result: '6',
					source: '0',
					message: 'item addcart fail' + obj.skuId + '_' + json.errId
				});
			}
		};
		ls.loadScript(paramStr.join('&'));
	};
	ItemDet.prototype.setCartNum = function(num) {
		var n = cookie.get('cartNum') * 1 || 0;
		if (num) {
			n = num;
			cookie.set('cartNum', n, 999999, "/", this.domainStr);
			localStorage.setItem('cartNum', n);
		}
		n ? $('#cartNum').html(n > 99 ? '99+' : n).show() : $('#cartNum').hide();
	};
	ItemDet.prototype.addCartRelated = function(em) {
		var cartid = $(em).attr('cartid');
		if (!cartid) return;
		this.addCart({
			type: 0,
			commlist: [cartid, '', 1, '', '4,0,0'],
			isRelated: true
		});
	};
	ItemDet.prototype.loginLocation = function(url) {
		if (this.isLogin) {
			location.href = url;
		} else {
			this.login(url);
		}
	};
	ItemDet.prototype.loginSetCookie = function(cb) {
		if (this.isLogin || ~this.domainStr.indexOf('jd.com')) {
			cb && cb();
			return;
		}
		var obj = this;
		window.setCookieCB = function(json) {
			if (json.retcode == 0) {
				for (var key in json) {
					if (key != 'retcode' && key != 'errmsg' && json.hasOwnProperty(key) && json[key]) {
						cookie.set(key, encodeURI(json[key]), 43200, '/', obj.domainStr);
					}
				}
				obj.isLogin = (cookie.get("wq_uin") && cookie.get("wq_skey"));
			}
			cb && cb();
		};
		ls.loadScript({
			url: (this.isWX ? '//wq.jd.com/mlogin/wxv3/LoginExplicit?' : '//wq.jd.com/mlogin/h5v1/LoginExplicit?') + 'callback=setCookieCB&t=' + Math.random()
		});
	};
	ItemDet.prototype.login = function(reUrl, cb) {
		reUrl = reUrl || location.href;
		try {
			if (~reUrl.indexOf('/item/view?')) {
				if (this.isLoginAct && this.domainStr.indexOf('jd.com') == -1) {
					var obj = this,
						limit = null,
						t = 20;
					limit = setInterval(function() {
						t--;
						if (t <= 0 || obj.isLogin) {
							clearInterval(limit);
							limit = null;
							obj.isLogin = obj.isLogin || 'OK';
							cb && cb();
						}
					}, 100);
					return;
				}
				cache.setItem('itemLogin', '1', 60);
			}
		} catch (e) {}
		login.login({
			rurl: reUrl,
			bj: true
		});
	};
	ItemDet.prototype.getBuyLink = function() {
		var obj = this;
		if (!this.jdStatus) {
			if ($('#buyBtn2').hasClass('btn_disable')) {
				JD.report.umpBiz({
					bizid: '25',
					operation: '15',
					result: '2',
					source: '0',
					message: 'item buy other' + obj.skuId
				});
			} else {
				JD.report.umpBiz({
					bizid: '25',
					operation: '21',
					result: '3',
					source: '0',
					message: 'item buy can not buy' + obj.skuId
				});
			}
			return false;
		}
		if (!this.jdSkuStatus) {
			document.getElementById(window._isClothShoe ? 'popupSkuArea' : 'skuCont').scrollIntoView(true);
			this.showNotice('请选择颜色/尺寸');
			JD.report.umpBiz({
				bizid: '25',
				operation: '21',
				result: '2',
				source: '0',
				message: 'item buy sku not ready'
			});
			return false;
		}
		if (this.skuJson[this.skuId] && this.skuJson[this.skuId].feetype && !this.cfeeType) {
			document.getElementById('skuCont').scrollIntoView(true);
			this.showNotice('请选购买方式');
			JD.report.umpBiz({
				bizid: '25',
				operation: '21',
				result: '2',
				source: '0',
				message: 'item buy sku not ready'
			});
			return false;
		}
		var weixinadkey = '';
		if (cookie.get('weixinadkey')) {
			weixinadkey = '&weixinadkey=' + cookie.get('weixinadkey');
		}
		if (window.morderCookie && morderCookie.zzz) cookie.set('_modc', morderCookie.zzz, 180, "/", this.domainStr);
		var url = '';
		if (this.yushouStatus == 2) {
			return '//wqs.jd.com/item/yuyue_item.shtml?sku=' + this.skuId;
		}
		if (this.isHYKHSP) {
			return ['//wqs.jd.com/item/phone_simcard1.shtml?feeType=0', 'sku=' + this.skuId, 'cityId=' + this.jdAddrId[1], 'provinceId=' + this.jdAddrId[0]].join('&');
		}
		if (this.cfeeType && this.cfeeType.ft != 100) {
			var tp = 'phone_option1',
				add = '';
			if (this.cfeeType.ft == 18) tp = 'phone_option_cmcc1';
			if (this.cfeeType.ft == 28) add = '&cucc=1';
			return ['//wqs.jd.com/item/' + tp + '.shtml?sku=' + this.cfeeType.sku, 'feeType=' + this.cfeeType.ft, 'sids=' + (this.cfeeType.sids || ''), 'cityId=' + this.jdAddrId[1], 'provinceId=' + this.jdAddrId[0] + add].join('&');
		}
		if (this.koStatus == 1 || this.koStatus == 2) {
			if (obj.miaoErr.errId == '16385') {
				ui.alert({
					container: document.body,
					msg: obj.miaoErr.errMsg,
					onConfirm: function() {
						location.reload();
					}
				});
				JD.report.umpBiz({
					bizid: '25',
					operation: '21',
					result: '3',
					source: '0',
					message: 'item buy can not buy'
				});
				return false;
			}
			return '//wqs.jd.com/order/s_confirm_miao.shtml?bid=' + (this.bid || '') + '&scene=jd&isCanEdit=1&EncryptInfo=&Token=&commlist=,,1,' + this.skuId + weixinadkey;
		}
		if (this.xuniBrandId) {
			var xltype = {
				4835: 1,
				4836: 2
			},
				commlist = [this.xuniBrandId, '', this.buyNum, this.skuId, xltype[this.jdCategory[2]] || 0];
			return '//wqs.jd.com/order/s_confirm_virtual.shtml?commlist=' + commlist.join(',') + '#wechat_redirect';
		}
		if (this.locShopInfo['isLOC']) {
			if (!this.locShopInfo['locationId'] || !this.locShopInfo['shopId']) {
				JD.report.umpBiz({
					bizid: '25',
					operation: '21',
					result: '3',
					source: '0',
					message: 'item buy can not buy'
				});
				return false;
			}
			return (['//wqs.jd.com/order/wq.confirm.loc.shtml?commlist=' + [this.skuId, this.itemId, this.buyNum, this.skuId, '1,0,0'].join(','), 'venderid=' + this.venderId, 'locationid=' + this.locShopInfo['locationId'], 'shopid=' + this.locShopInfo['shopId']].join('&'));
		}
		var bf = '',
			pg = '',
			wdref = '&wdref=' + encodeURIComponent(this.protocol + '//wq.jd.com/item/view?sku=' + this.skuId),
			spAttr = this.item().spAttr || {};
		if (urlParam.getUrlParam('bf')) bf += 'bf=' + urlParam.getUrlParam('bf');
		if (this.isChou || this.isChouTuan[this.skuId]) {
			bf += 'zhongchou=' + (this.isChouTuan[this.skuId] || this.isChou);
		}
		if (this.pgStatus > 0 && this.pgStatus < 10) pg = '&action=3&activeid=' + this.pgInfo.active_id + '&bizkey=' + this.pgInfo.biz_key + '&bizval=' + this.pgInfo.biz_value + '&member=' + this.pgInfo.tuan_member_count;
		if (this.pgStatus == 1111) pg = '&appprice=1';
		window.buyLink = '//wqs.jd.com/order/' + (this.yuShouNoWayStatus == 1 ? 's_confirm_booking.shtml' : (this.isOTC == 1 ? 's_confirm_otc.shtml' : 'wq.confirm.shtml'));
		var commlist = [this.skuId, this.itemId, this.buyNum, this.skuId, '1,0,0'];
		if (this.isGiftPool) {
			var skuIds = this.getGiftPoolList();
			if (skuIds.length > 0) commlist.push(skuIds.join('_'));
		}
		url = [window.buyLink + '?bid=' + (this.bid || '') + weixinadkey + wdref, 'scene=jd&isCanEdit=1&EncryptInfo=&Token=&commlist=' + commlist.join(','), 'locationid=' + this.jdAddrId.slice(0, 3).join('-'), 'type=' + (spAttr.isXnzt == '1' ? '3' : '0'), spAttr.LuxuryGoods == '1' ? 'lg=1' : 'lg=0', spAttr.isSupermarket == '1' ? 'supm=1' : 'supm=0', pg + (pg && bf ? '&' : '') + bf];
		if (location.pathname.indexOf('mitem') > 0) url.push('ismitem=1');
		if (this.isYanBao) {
			var pids = this.getNewYanBaoList();
			if (pids.length > 0) {
				url.push('isnewyb=1&ybcommlist=' + pids.join('$'));
			}
		}
		if (this.isOverseaPurchase > 0) {
			url.push('globalbuy=' + this.isOverseaPurchase);
		}
		if (this.isEcard) url.push('eCard=1');
		return url.join('&') + '#wechat_redirect';
	};
	ItemDet.prototype.addressInit = function() {
		var obj = this;
		address.init({
			con: 'addrList',
			onSelect: function(id, name, level) {
				window.scroll(0, 0);
			},
			onClose: function() {
				setTimeout(function() {
					obj.showPart('main');
				}, 200);
			},
			onFinish: function(area, areaId) {
				obj.setAddrId();
				if (obj.cfeeType && obj.cfeeType.ft != 100) {
					location.href = location.href.replace(obj.baseSkuId, obj.skuId).replace(/#.*/, '') + '&t=' + Math.random();
					return;
				}
				obj.jdSkuInfo['price'] = null;
				obj.skuJson = {};
				obj.setItemInfo();
				setTimeout(function() {
					obj.showPart('main', function() {
						if (obj.sliderProtal) obj.sliderProtal.resize($('#loopImgUl li').eq(0).width());
					});
				}, 200);
			}
		});
	};
	ItemDet.prototype.chooseAddress = function() {
		this.showPart('address');
		address.show();
	};
	ItemDet.prototype.setBuyNum = function(num) {
		num = num * 1 || 1;
		var tmp = num,
			$minus = $('#minus'),
			$plus = $('#plus'),
			minusClass = 'minus_disabled',
			plusClass = 'plus_disabled';
		num = Math.max(1, num);
		num = Math.min(this.maxBuyNum, num);
		this.buyNum = num;
		if (window._isClothShoe) {
			$('#skuChoose').html(window._skuChooseArr.join(',') + ',' + num + '个');
			$('#popupSkuChoose').html('<span>已选</span>' + ' ' + window._skuChooseArr.join(',') + ',' + num + '个');
			$minus = $('#minus1');
			$plus = $('#plus1');
			minusClass = 'disable';
			plusClass = 'disable';
		}
		$('#buyNum,#buyNum1').val(num);
		if (tmp > this.maxBuyNum) this.showNotice('单款最多可买' + this.maxBuyNum + '件');
		$minus[num == 1 ? 'addClass' : 'removeClass'](minusClass);
		$plus[this.maxBuyNum > num ? 'removeClass' : 'addClass'](plusClass);
	};
	ItemDet.prototype.setDetHeight = function() {
		var h = $("#detail" + this.detIndex).height();
		$("#detail").css('height', Math.max(h, this.detLowH));
	};
	ItemDet.prototype.supportSticky = function() {
		var t, n = '-webkit-sticky',
			e = document.createElement("i");
		e.style.position = n;
		t = e.style.position;
		e = null;
		return t === n;
	};
	ItemDet.prototype.scroll = function() {
		if (this.blackCoverShow) {
			window.scrollTo(0, this.lockScrollH);
			return;
		}
		var obj = this,
			st = $(window).scrollTop();
		if (!this.isUseSticky) {
			this.detTabH = $('#detailBaseLine').offset().top;
			  myHight = this.detTabH ;
			if (st > this.detTabH) {
				$('#detailTab').addClass('mod_tab_fixed');
			} else {
				$('#detailTab').removeClass('mod_tab_fixed');
			}
		}
		if (st > this.pageHight * 2) {
			$('.goTopBtn').show();
		} else {
			$('.goTopBtn').hide();
		}
		this.setDetHeight();
		if (this.detIndex == 1) {
			commDet.loadImg();
		}
		if (this.cpart == 'summary') {
			if (st >= (($(document).height() - $(window).height()) - 220)) {
				this.loadEval();
			}
		}
		$('#quckArea').removeClass('more_active');
	};
	ItemDet.prototype.showNotice = function(str, t) {
		if (!str) return;
		t = t ? t : 2000;
		$('#noticeStr').html(str);
		$('#noticePanel').show();
		$('#noticePanel').css('margin-left', '-' + ($('#noticePanel').width()) / 2 + 'px');
		setTimeout(function() {
			$('#noticePanel').hide();
		}, t);
	};
	ItemDet.prototype.setDelayTime = function() {
		window.holdAction = true;
		setTimeout(function() {
			window.holdAction = false;
		}, 400);
	};
	ItemDet.prototype.resizeProtal = function(showBlack) {
		if (showBlack) {
			var temp = $('#loopImgDiv').hasClass('mod_slider_viewer');
			if (temp) {
				$('#loopImgDiv').removeClass('mod_slider_viewer');
			} else {
				$('#loopImgDiv').addClass('mod_slider_viewer');
				window.location.hash = '#img';
			}
		}
		if (this.sliderProtal) this.sliderProtal.resize($('#loopImgUl li').eq(0).width());
	};
	ItemDet.prototype.showPopupArea = function(flag) {
		if (!window._isClothShoe) return;
		this.showHidePopup($('#popupBuyArea'), true);
		if (flag == '1' || flag == '2') {
			$('#buyBtn1').parent().removeClass('show').hide();
			$('#popupConfirm').attr('tag', flag).parent().addClass('show').show();
		} else {
			$('#popupConfirm').attr('tag', '0').parent().removeClass('show').hide();
			$('#buyBtn1').parent().addClass('show').show();
		}
	};
	ItemDet.prototype.showHidePopup = function($dom, flag) {
		if (flag) {
			$('body').addClass('overflowHide');
			$dom.show();
			setTimeout(function() {
				$dom.addClass('show');
			}, 50);
		} else {
			$('body').removeClass('overflowHide');
			this.setDelayTime();
			$dom.removeClass('show');
			setTimeout(function() {
				$dom.hide();
			}, 50);
		}
	};
	ItemDet.prototype.bindEvent = function() {
		$(window).on("scroll", $.proxy(this.scroll, this));
		this.isBind = true;
		var obj = this,
			hideDelay = true;
		var hideBlackCover = function() {
				if (hideDelay) {
					setTimeout(function() {
						hideBlackCover();
					}, 300);
					hideDelay = false;
					return;
				}
				hideDelay = true;
				$('#blackCover').hide();
				obj.blackCoverShow = false;
				if ($('#loopImgDiv').hasClass('mod_slider_viewer')) {
					obj.resizeProtal(true);
				} else {
					$('#imageViewer').hide();
				}
			};
		var showSingeImg = function(src) {
				obj.lockScrollH = $(window).scrollTop();
				obj.blackCoverShow = true;
				$('#blackCover').show();
				$('#imageViewer').show();
				$('#fullImg').attr('src', src);
			};
		var replaceDom = function(opt) {
				opt = opt || {};
				var flag = opt.flag,
					isAccessory = (flag == 1),
					$dom = opt.$dom,
					typeId = $dom.attr(isAccessory ? 'typeid' : 'areaid'),
					oldTypeId = (isAccessory ? obj.jdSkuInfo.accessory.typeId : obj.locJdGame.areaId),
					oldSlideBox = $(isAccessory ? '#accessoryWrap' : '#gameWrap'),
					$newDom = '';
				if (isAccessory) {
					obj.jdSkuInfo.accessory.typeId = typeId;
					if (!obj.jdSkuInfo.accessory['dom' + oldTypeId]) {
						obj.jdSkuInfo.accessory['dom' + oldTypeId] = oldSlideBox;
					}
					$newDom = obj.jdSkuInfo.accessory['dom' + typeId];
				} else {
					obj.locJdGame.areaId = typeId;
					if (!obj.locJdGame['dom' + oldTypeId]) {
						obj.locJdGame['dom' + oldTypeId] = oldSlideBox;
					}
					$newDom = obj.locJdGame['dom' + typeId];
				}
				if ($newDom) {
					oldSlideBox.replaceWith($newDom);
				} else {
					var newSlideBox = oldSlideBox.clone();
					oldSlideBox.replaceWith(newSlideBox);
					if (isAccessory) {
						obj.setLoopScroll({
							html: obj.jdSkuInfo.accessory[typeId],
							tag: 'accessory',
							loopScroll: true,
							divClassName: 'slider_page',
							ulClassName: 'grid',
							num: 4
						});
						obj.setAccessoryPrice();
					} else {
						obj.setLoopScroll({
							html: obj.locJdGame[typeId],
							tag: 'game',
							loopScroll: true,
							divClassName: 'slider_page competition_goods',
							ulClassName: 'grid',
							num: 4
						});
					}
				}
			};
		$('#commDesc, #evalDet_summary, #evalDet_main,#globalNotice').on('tap', 'img', function(e) {
			var $this = $(this),
				src = $this.attr('prview') || $this.attr('src').replace(/\s+/g, '');
			if (window.WeixinJSBridge) {
				var imgs = [];
				if ($this.attr('prview')) {
					$this.parent().parent().find('img').each(function() {
						imgs.push($(this).attr('prview'));
					});
				} else {
					imgs = [src];
				}
				src = (~src.indexOf('http') ? '' : obj.protocol) + src;
				for (var i = 0, len = imgs.length; i < len; i++) {
					imgs[i] = (~imgs[i].indexOf('http') ? '' : obj.protocol) + imgs[i];
				}
				WeixinJSBridge.invoke('imagePreview', {
					'current': src,
					'urls': imgs
				});
			} else {
				showSingeImg(src);
			}
		});
		$('#summaryEnter,#summaryEnter2').on('click', function() {
			location.hash = '#summary';
		});
		setTimeout(function() {
			$('#loopImgUl,#popupImg').on('tap', function(e) {
				$reportTrace({
					ptag: '7001.1.3'
				});
				if (~obj.domainStr.indexOf('jd.com') && window.WeixinJSBridge) {
					var loopImg = [];
					for (var i = 0, len = obj.loopImg.length; i < len; i++) {
						loopImg.push((obj.loopImg[i].indexOf('http') > -1 ? '' : obj.protocol) + obj.loopImg[i]);
					}
					WeixinJSBridge.invoke('imagePreview', {
						'current': loopImg[(obj.sliderProtal ? (obj.sliderProtal.index - 1) : 0)],
						'urls': loopImg
					});
					return;
				}
				if (obj.loopImg.length == 1) {
					showSingeImg(obj.loopImg[0]);
					return;
				}
				if (!obj.loopImg.length) return;
				if ($('#loopImgDiv').hasClass('mod_slider_viewer')) {
					window.history.go(-1);
				} else {
					obj.lockScrollH = $(window).scrollTop();
					obj.blackCoverShow = true;
					$('#blackCover').show();
					obj.resizeProtal(true);
				}
			});
		}, 400);
		$('body').on('touchend', function(e) {
			var target = e.srcElement || e.target,
				em = target,
				i = 1;
			while (em && !em.id && i <= 3) {
				em = em.parentNode;
				i++;
			}
			if (!em || !em.id) return;
			switch (em.id) {
			case 'imageViewer':
			case 'fullImg':
				hideBlackCover();
				e.preventDefault();
				break;
			case 'blackCover':
				if ($('#loopImgDiv').hasClass('mod_slider_viewer')) {
					window.history.go(-1);
				} else {
					hideBlackCover();
				}
				e.preventDefault();
				break;
			case 'goTop':
				window.scroll(0, 0);
				e.preventDefault();
				break;
			}
		});
		$('body').on('tap', function(e) {
			var target = e.srcElement || e.target,
				em = target,
				i = 1;
			while (em && !em.id && i <= 4) {
				em = em.parentNode;
				i++;
			}
			if (!em || !em.id) return;
			var $em = $(em),
				emId = em.id;
			if (emId.indexOf('couponItem_') > -1) {
				obj.getCoupon($em);
				return;
			}
			if (emId.indexOf('related_') > -1) {
				obj.showRelatedItem(em);
				return;
			}
			if (emId.indexOf('addCart_') > -1) {
				obj.addCartRelated(em);
				return;
			}
			if (emId.indexOf('ybItem_') > -1) {
				var selectClass = (window._isClothShoe ? 'checked' : 'op_item_selected');
				$em.toggleClass(selectClass);
				$em.siblings().removeClass(selectClass);
				if (window._isClothShoe) {
					obj.setNewYanBao();
				}
				return;
			}
			if (emId.indexOf('partGiftItem_') > -1) {
				obj.setPartGift($em);
				return;
			}
			if (~emId.indexOf('accessory_') || ~emId.indexOf('game_')) {
				if ($em.hasClass('cur')) return;
				$em.addClass('cur').siblings().removeClass('cur');
				replaceDom({
					flag: (~emId.indexOf('accessory_') ? 1 : 2),
					$dom: $em
				});
				return;
			}
			if (~emId.indexOf('accessoryCart_')) {
				var skuId = $em.attr('sku');
				if (skuId) {
					obj.txReport({
						ptag: '7001.1.19',
						skuId: skuId
					});
					obj.addCart({
						type: 0,
						commlist: [skuId, '', 1, skuId, '1,0,0'],
						isAccessory: true
					});
				}
				return;
			}
			switch (emId) {
			case 'buyBtnExp':
			case 'buyBtnExp1':
				obj.pgStatus = 1111;
			case 'buyBtn2':
			case 'buyBtn1':
			case 'popupConfirm':
				if (!obj.isSpecItem && window._isClothShoe && emId == 'buyBtn2') {
					obj.showPopupArea('2');
					break;
				}
				if (emId == 'popupConfirm') {
					if ($em.attr('tag') == '1') {
						obj.txReport({
							ptag: '7001.1.10'
						});
						obj.addCart();
						break;
					}
				}
				obj.createTimeout('21', 'item buy click fail' + obj.skuId);
				try {
					var url = obj.getBuyLink(),
						ptag = ($('#buyBtn2').text() == '立即抢购' ? '7001.1.9' : '7001.1.8');
					if (!url) obj.delTimeout('itil21');
					cookie.set('buysku', obj.skuId, 30);
					if (window.jdm) {
						var v = jdm.x(jdm.y);
						jdm.z && cookie.set(jdm.z, v, 999999, "/", obj.domainStr);
						if (!obj.isWX) cookie.set('wqmnx', '180850892b323d04f811f0ab89cbhq86', 999999, "/", obj.domainStr);
					}
					if (obj.isChouTuan[obj.skuId] && url) {
						ptag = '7145.12.2';
						url = util.addRd(url, '7145.12.3');
					}
					obj.txReport({
						ptag: ptag
					});
					if (url) {
						JD.report.umpBiz({
							bizid: '25',
							operation: '21',
							result: '0',
							source: '0',
							message: 'item buy clicked'
						});
						obj.loginLocation(url);
					}
				} catch (e) {
					if (url) location.href = url;
					JD.report.umpBiz({
						bizid: '25',
						operation: '15',
						result: '8',
						source: '0',
						message: 'item buy jserror' + e
					});
				}
				if (!url) obj.delTimeout('itil21');
				return false;
				break;
			case 'viewGuess':
			case 'viewGuess1':
				window.location.href = '//wqs.jd.com/search/searchsimilar.shtml?ptag=7001.1.46&sceneid=4&sku=' + obj.skuId + '&jp=' + obj.jdPrice;
				break;
			case 'arrivalNotice':
			case 'arrivalNotice1':
				obj.loginLocation('//wqs.jd.com/item/arrival_notice.shtml?ptag=7001.1.56&sku=' + obj.skuId);
				break;
			case 'quckIco2':
				$('#quckArea').toggleClass('more_active');
				return;
				break;
			case 'plus':
			case 'minus':
			case 'plus1':
			case 'minus1':
				if ($em.hasClass('minus_disabled|disable|plus_disabled')) return;
				var num = (emId == 'plus' || emId == 'plus1' ? obj.buyNum + 1 : obj.buyNum - 1);
				obj.setBuyNum(num);
				break;
			case 'couponRow':
				$('#couponListDiv').hasClass('detail_row_unfold') ? $('#couponListDiv').removeClass('detail_row_unfold') : $('#couponListDiv').addClass('detail_row_unfold');
				break;
			case 'fav':
				obj.txReport({
					ptag: '7001.1.22'
				});
				obj.fav();
				break;
			case 'shopFav':
				if (!obj.isQQbrowser) obj.shopFav();
				break;
			case 'addCart2':
			case 'addCart1':
				if (window._isClothShoe && emId == 'addCart2') {
					obj.showPopupArea('1');
					break;
				}
				obj.txReport({
					ptag: '7001.1.10'
				});
				obj.addCart();
				break;
			case 'gotoCart':
				window.location.href = '//wqs.jd.com/my/cart/jdshopcart.shtml?ptag=7001.1.1';
				break;
			case 'dapeiTab':
			case 'accessoryTab':
			case 'guessTab':
			case 'rankTab':
				var $target = $(target),
					tag = $target.attr('tag');
				if ($target.hasClass('cur')) return;
				$('#dapeiBd,#accessoryBd,#guessBd,#rankBd').hide();
				$('#' + tag + 'Bd').show();
				cache.setItem('guesstabindx', JSON.stringify({
					sku: obj.baseSkuId,
					tag: tag
				}), 60);
				$target.addClass('cur').siblings().removeClass('cur');
				break;
			case 'shopLinks':
			case 'quick_shoplink':
			case 'shopLogoInfo':
			case 'shopBaseInfo':
			case 'gotoShop':
			case 'shopLogo':
			case 'shopInfo':
				if (obj.shopUrl) window.location.href = obj.shopUrl;
				break;
			case 'addrArea':
			case 'addrName':
			case 'postNotice1':
				obj.chooseAddress();
				break;
			case 'postIcon':
				obj.createPopup({
					flag: 1
				});
				break;
			case 'ysTip':
				obj.createPopup({
					flag: 2
				});
				break;
			case 'taxTipUp':
				obj.createPopup({
					flag: 6
				});
				break;
			case 'addrBack':
				address.prev();
				break;
			case 'serviceArea':
			case 'postNotice3':
			case 'serviceInfo':
				if ($('#serviceArea').attr('hasmore') == '1') $('#serviceArea').toggleClass('detail_row_unfold');
				break;
			case 'shopIM':
				if ($em.hasClass('on')) {
					location.href = obj.shopImLink;
				} else {
					obj.showNotice('客服暂时不在线，请稍后联系');
				}
				break;
			case 'popupSkuCont':
			case 'skuChoose':
			case 'jdService':
			case 'jdServiceList':
				obj.showPopupArea();
				break;
			case 'popupClose':
			case 'popupBuyArea':
				obj.showHidePopup($('#popupBuyArea'));
				$('#popupConfirm').attr('tag', '0');
				break;
			case 'couponListDiv':
			case 'baitiaoDiv':
				obj.showHidePopup($(~emId.indexOf('coupon') ? '#couponPopup' : '#baitiaoPopup'), true);
				break;
			case 'couponClose':
			case 'couponPopup':
			case 'baitiaoClose':
			case 'baitiaoPopup':
			case 'baitiaoBtn':
				obj.showHidePopup($(~emId.indexOf('coupon') ? '#couponPopup' : '#baitiaoPopup'));
				break;
			case 'sku1':
			case 'sku2':
			case 'sku3':
				if (target.nodeName != 'SPAN') return;
				var $target = $(target),
					cname = $target.text(),
					no = emId.replace('sku', ''),
					disableClass = 'option_disabled',
					selectClass = 'option_selected';
				if (window._isClothShoe) {
					disableClass = 'over';
					selectClass = 'active';
				}
				if ($target.hasClass(disableClass)) {
					if (emId == 'sku1' && $('#sku2 span').length) {
						$('#sku1 span').removeClass(selectClass);
						$target.removeClass(disableClass).addClass(selectClass);
						obj.checkSkuList(no, cname);
						obj.jdSkuStatus = false;
					}
					return;
				}
				var isSkuA = emId == 'sku1',
					sid2 = isSkuA ? 'sku2' : 'sku1';
				if ($target.hasClass(selectClass)) {
					$target.removeClass(selectClass);
					$('#' + sid2 + ' span').removeClass(disableClass);
				} else {
					$('#' + emId + ' span').removeClass(selectClass);
					$target.addClass(selectClass);
					obj.checkSkuList(no, cname);
				}
				var skuName = [$('#sku1 .' + selectClass).text(), $('#sku2 .' + selectClass).text(), $('#sku3 .' + selectClass).text()].filter(function(s) {
					return s;
				});
				var sid = obj.skuPro.name[skuName.join('~~')];
				if (sid) {
					obj.jdSkuStatus = true;
					obj.changeSkuId = sid;
					if (obj.isYuShouNoWay) {
						window.setTimeout(function() {
							location.href = location.href.replace(obj.baseSkuId, sid);
						}, 200);
					} else {
						if (window._isClothShoe) {
							window._skuChooseArr = [].concat(skuName);
							skuName.push(obj.buyNum + '个');
							$('#skuChoose').html(skuName.join(','));
							$('#popupSkuChoose').html('<span>已选</span>' + ' ' + skuName.join(','));
						}
						obj.setItemInfo();
					}
				} else {
					obj.jdSkuStatus = false;
				}
				break;
			case 'evalTab':
				if (target.nodeName != 'SPAN') target = target.parentNode;
				if (target.nodeName != 'SPAN') return;
				obj.evalType = Math.min(parseInt($(target).attr('no')), 4);
				obj.evalPageCur = 1;
				$('#evalTab span').removeClass('cur');
				target.className = 'cur';
				window.scroll(0, 0);
				obj.loadEval();
				break;
			case 'headEval':
			case 'evalNo1':
			case 'evalNo3':
				document.getElementById('summaryEnter').scrollIntoView(true);
				break;
			case 'promoteDiv':
			case 'promote':
			case 'promoteIcon':
				if ($('#promoteIcon').hasClass('icon_point_up')) {
					$('#promote').html(obj.iconHtml).removeClass('de_c_red').addClass('de_span').children().hide();
					$('#promote .hl_red_bg').show();
					$('#promoteIcon').removeClass('icon_point_up').addClass('icon_point_drop');
					$('#promGroup').hide();
				} else {
					obj.setPromoteTitle();
				}
				break;
			case 'relatedEnter':
			case 'relatedNotice':
				location.hash = '#related';
				break;
			case 'ybArea':
			case 'ybArea1':
			case 'ybArea2':
				location.hash = '#yanbao';
				break;
			case 'sureYbServiceBtn':
				obj.setDelayTime();
				obj.setNewYanBao();
				location.hash = '#main';
				break;
			case 'partGiftBtn':
				obj.setDelayTime();
				obj.setGiftPool();
				location.hash = '#main';
				break;
			case 'buyNum':
				if (!obj.isAndroid) setTimeout(function() {
					$('#btnTools').removeClass('fixed');
				}, 200);
				break;
			case 'certificationNotice':
			case 'certificationTimer':
				if (obj.jdSkuInfo['certificationUrl' + obj.skuId]) obj.certificationNotice();
				break;
			default:
				break;
			}
		});
		$('body').on('tap', function(e) {
			var target = e.srcElement || e.target,
				em = target,
				i = 1;
			try {
				while (em && em.nodeName != 'BODY' && !em.getAttribute('ptag') && i <= 4) {
					em = em.parentNode;
					i++;
				}
				if (!em || !em.getAttribute('ptag')) return;
				var ptag = em.getAttribute('ptag');
				obj.txReport({
					ptag: ptag,
					noJd: true
				});
			} catch (e) {}
		});
		$('#buyNum,#buyNum1').off().on({
			input: function() {
				if (this.value) obj.setBuyNum(this.value);
			},
			blur: function() {
				obj.setBuyNum(this.value);
				if (!window._isClothShoe) {
					$('#btnTools').addClass('fixed');
				}
			}
		});
		var hashChange = function() {
				var hash = window.location.hash;
				switch (hash) {
				case '#detail':
					break;
				case '#address':
					obj.chooseAddress();
					break;
				case '#related':
					obj.showPart('related');
					obj.setRelated();
					break;
				case '#summary':
					obj.showPart('summary');
					obj.evalPageCur = 1;
					obj.evalType = 3;
					obj.loadEval();
					obj.reloadEvalAppdl();
					break;
				case '#yanbao':
					obj.showPart('yanbao');
					break;
				case '#gift':
					obj.showPart('gift');
					break;
				case '#landing':
					obj.showPart('landing');
					break;
				case '#main':
					obj.showPart('main');
					obj.reloadEvalAppdl(true);
					break;
				default:
					break;
				}
				if (hash != '#img') {
					if ($('#loopImgDiv').hasClass('mod_slider_viewer')) {
						hideBlackCover();
					}
				}
			};
		window.onhashchange = hashChange;
		if (!obj.isWX) {
			setTimeout(function() {
				window.onhashchange = hashChange;
			}, 1000);
			setTimeout(function() {
				window.onhashchange = hashChange;
			}, 2000);
		}
		window.onresize = function() {
			if (obj.pageWidth == $(window).width()) return;
			obj.pageWidth = $(window).width();
			obj.resizeProtal();
			obj.sliderDetail && obj.sliderDetail.resize(obj.pageWidth);
		};
	};
	ItemDet.prototype.reportAdkey = function() {
		var adkey = report.getADKEY();
		if (adkey) {
			var img = new Image();
			img.src = '//wq.jd.com/webmonitor/collect/biz.json?contents=2|1|0|1|ok';
		}
	};
	ItemDet.prototype.reloadEvalAppdl = function(back) {
		if (!window._jdApp || !this.isWX) return;
		if (back) {
			if (window._jdApp.oldInitHide) return;
			window._jdApp.androidindex = 8;
			window._jdApp.appdlCon = 'appdlCon';
			window._jdApp.reload && window._jdApp.reload();
		} else {
			window._jdApp.oldInitHide = window._jdApp.initHide;
			window._jdApp.androidindex = 9;
			window._jdApp.appdlCon = 'appdlCon2';
			window._jdApp.initHide = false;
			window._jdApp.reload && window._jdApp.reload();
		}
	};
	ItemDet.prototype.getBaiTiao = function() {
		var obj = this;
		if (!obj.isLogin || (!(obj.jdPrice > 0)) || $('#baitiaoDiv').attr('sku') == obj.skuId) return;
		window.baitiaoCB = function(json) {
			if (!obj.jdSkuInfo['baitiao' + obj.skuId]) {
				JD.report.umpBiz({
					bizid: '25',
					operation: '9',
					result: '16',
					source: '0',
					message: 'baitiao back'
				});
				obj.jdSkuInfo['baitiao' + obj.skuId] = json;
			}
			var data = json.data;
			if (json.errcode === '0' && data && data.creditStatus === 1 && data.isLogin && data.isBtUser && data.isFull && data.isAva && data.isShopAva && data.isSkuAva && data.isItemAva && data.marketingText && data.planInfos && data.planInfos.length) {
				var serviceHtml = [],
					jsonItem = {},
					jsonStr = '',
					tpl = '<div class="section"><dl><dt>{#title#}<span class="tips">{#tip#}</span></dt>{#str#}</dl></div>';
				for (var i = 0, len = data.planInfos.length; i < len; i++) {
					jsonItem = data.planInfos[i];
					jsonStr = '<dd>' + (jsonItem.plan === 1 && !(jsonItem.rate > 0) ? '30天内免息<span class="detail">不分期，无手续费' : jsonItem.plan + '期 * ' + jsonItem.curTotal.toFixed(2) + '元<span class="detail">' + (jsonItem.rate > 0 ? '含手续费，每期' + jsonItem.planFee.toFixed(2) + '元，费率' + jsonItem.rate + '%' : '无手续费')) + '</span></dd>';
					serviceHtml.push(jsonStr);
				}
				if (serviceHtml.length > 0) {
					$('#baitiaoBody').html($jsonToTpl({
						title: '分期服务',
						tip: '（使用前的分期情况）',
						str: serviceHtml.join('')
					}, tpl));
					$('#baitiaoDiv').attr('sku', obj.skuId).html('<span class="title">白条</span><span class="text">' + data.marketingText + '</span>').show();
					$reportTrace({
						ptag: '7001.1.72',
						pin: encodeURIComponent(cookie.get('jdpin'))
					});
				}
			}
		};
		if (obj.jdSkuInfo['baitiao' + obj.skuId]) {
			window.baitiaoCB(obj.jdSkuInfo['baitiao' + obj.skuId]);
		} else {
			ls.loadScript(['//wq.jd.com/commodity/btinfo/get?callback=baitiaoCB', 'num=' + obj.buyNum, 'skuid=' + obj.skuId, 'cat=' + obj.jdCategory.slice(0, 3).join(','), 'ven=' + obj.venderId, 'price=' + Math.ceil(obj.jdPrice * 100), 'suit=' + (obj.item().spAttr && obj.item().spAttr.isXnzt == '1' ? '1' : '0'), 'jd=' + (obj.isZiying ? '1' : '0'), 'oversea=' + (obj.isOverseaPurchase > 0 ? '1' : '0'), 't=' + Math.random()].join('&'));
			JD.report.umpBiz({
				bizid: '25',
				operation: '9',
				result: '15',
				source: '0',
				message: 'wq.jd.com baitiao'
			});
		}
	};
	ItemDet.prototype.formatTime = function(date) {
		var addZero = function(num) {
				return (num < 10 ? '0' : '') + num;
			};
		return {
			year: date.getFullYear(),
			month: addZero(date.getMonth() + 1),
			day: addZero(date.getDate()),
			hour: addZero(date.getHours()),
			min: addZero(date.getMinutes()),
			sec: addZero(date.getSeconds())
		};
	};
	ItemDet.prototype.getCouponList = function() {
		if (!this.venderId || !this.isLoadCoupon) return;
		var obj = this;
		window.getCouponListCB = function(json) {
			obj.delTimeout('itil11');
			if (json.ret == 0) {
				var getCoupons = json.coupons || [],
					useCoupons = json.use_coupons || [],
					couponHtml = [],
					iitem = {},
					htmlArr = [],
					tpl = '<span class="coupon">满{#quota#}减{#discount#}</span>',
					couponTpl = $('#couponTpl').html(),
					dateObj = {},
					renderCoupon = function(opt) {
						opt = opt || {};
						var arr = opt.arr || [],
							iitem = {},
							flag = opt.flag,
							tpl1 = opt.tpl,
							couponHtml1 = [];
						for (var i = 0, leni = arr.length; i < leni; i++) {
							iitem = arr[i];
							iitem.typeClass = 'type_dong';
							iitem.typeName = '东券';
							if (iitem.couponType == 0) {
								iitem.typeClass = 'type_jing';
								iitem.typeName = '京券';
							}
							iitem.quotaDesc = (iitem.quota > 0 ? '满' + iitem.quota + '可用' : '无门槛使用');
							iitem.limit = '可在京东商城使用';
							iitem.useCouponTip = '';
							iitem.id = 'couponItem_' + iitem.roleId;
							if (flag) {
								iitem.useCouponTip = '<span class="c_tag bg_2">已领取</span>';
								iitem.typeClass += ' disabled';
								iitem.id = '';
							}
							couponHtml1.push($jsonToTpl(iitem, couponTpl));
						}
						if (couponHtml1.length > 0) {
							return $jsonToTpl({
								title: flag ? '<p class="title">可用优惠券</p><p class="subtitle">您账户中适用于该商品的券</p>' : '<p class="title">可领优惠券</p>',
								couponStr: couponHtml1.join('')
							}, tpl1);
						}
						return '';
					};
				JD.report.umpBiz({
					bizid: '25',
					operation: '11',
					result: '0',
					source: '0',
					message: 'item queryusegetcoupon api success'
				});
				if (!getCoupons.length && !useCoupons.length) return;
				if (useCoupons.length > 0) $reportTrace({
					ptag: '7001.1.71',
					pin: encodeURIComponent(cookie.get('jdpin'))
				});
				getCoupons = getCoupons.sort(function(a, b) {
					return b.discount - a.discount;
				});
				for (var i = 0, leni = useCoupons.length; i < leni; i++) {
					iitem = useCoupons[i];
					iitem.discount = parseInt(iitem.parValue);
					iitem.quota = parseInt(iitem.quota);
					iitem.couponType = iitem.type;
					iitem.timeDesc = '';
					if (iitem.beginTime && iitem.endTime) {
						dateObj = obj.formatTime(new Date(iitem.beginTime));
						iitem.timeDesc = '有效期' + dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
						dateObj = obj.formatTime(new Date(iitem.endTime));
						iitem.timeDesc += '至' + dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
					}
				}
				useCoupons = useCoupons.sort(function(a, b) {
					return b.discount - a.discount;
				});
				couponHtml = getCoupons.concat(useCoupons).slice(0, 3);
				for (var i = 0, leni = couponHtml.length; i < leni; i++) {
					couponHtml[i] = $jsonToTpl(couponHtml[i], tpl);
				}
				$('#couponListDiv').html('<span class="num">共' + (getCoupons.length + useCoupons.length) + '张</span><span class="title">领券</span>' + couponHtml.join('')).show();
				tpl = '<div class="title_line"><div class="title_wrap">{#title#}</div></div><div class="mod_coupon_area"><div class="mod_clist with_cols1">{#couponStr#}</div></div>';
				htmlArr.push(renderCoupon({
					tpl: tpl,
					arr: getCoupons
				}));
				htmlArr.push(renderCoupon({
					tpl: tpl,
					arr: useCoupons,
					flag: true
				}));
				$('#couponPopupBody').html(htmlArr.join('')).show();
			} else {
				JD.report.umpBiz({
					bizid: '25',
					operation: '11',
					result: '2',
					source: '0',
					message: 'item queryusegetcoupon api error'
				});
			}
		};
		obj.createTimeout('11', 'item CommCouponQuery api timeout');
		ls.loadScript(['//wq.jd.com/mjgj/fans/queryusegetcoupon?callback=getCouponListCB', 'cid=' + obj.jdCategory[2], 'sku=' + obj.skuId, 'popId=' + (obj.isOverseaPurchase == 3 ? '8889' : (obj.isZiying ? '8888' : obj.venderId)), 'pin=' + encodeURIComponent(cookie.get('pin') || ''), 'platform=' + (obj.isWX ? '5' : '4'), 't=' + Math.random()].join('&'));
	};
	ItemDet.prototype.getCoupon = function($em) {
		var obj = this;
		if (!this.isLogin) {
			this.login(null, function() {
				obj.getCoupon($em);
			});
			return;
		}
		var key = $em.attr('key'),
			roleid = $em.attr('roleid');
		if (!key || !roleid) return;
		window.ObtainJdShopFreeCouponCallBack = function(json) {
			var drawTips = {
				999: '领取成功！<br/>优惠券将在1分钟内到账,<br/>请稍后前往个人中心查看~',
				14: '您已经领取过此优惠券',
				15: '您今天已经参加过此活动，请明天再试',
				16: '此券今日已经被领完，请明天再来~',
				17: '此券已经被领完了，下次记得早点来哟'
			};
			if (json.code == 1000) {
				obj.login();
			} else {
				obj.showNotice(drawTips[json.code] || '领取失败，请稍候再试', 3000);
				if (json.code == 999 || json.code == 14) {
					$em.addClass('disabled');
				}
			}
		};
		ls.loadScript('//wq.jd.com/activeapi/obtainjdshopfreecoupon?callback=ObtainJdShopFreeCouponCallBack&key=' + key + '&roleid=' + roleid + '&scene=2&_t=' + Date.now());
	};
	ItemDet.prototype.setBtnStatus = function(opt) {
		opt = opt || {};
		var obj = this,
			flag = opt.flag,
			favFlag = opt.favFlag,
			msg = opt.msg;
		if (obj.isWareOff) return;
		switch (flag) {
		case 1:
			$('#sendArea,#addCart2,#addCart1,#buyBtn2,#buyBtn1').hide();
			$('#popupConfirm').parent().removeClass('show').hide();
			$('#buyBtn1').parent().addClass('show').show();
			$('#specBuyBtn,#specBuyBtn1').html(obj.locShopInfo.isLOC ? '选择门店' : '立即报名').show();
			$('#specBuyBtn').removeClass('btn_disable');
			$('#specBuyBtn1').removeClass('disabled_1');
			break;
		case 2:
			$('#addCart2,#addCart1').hide();
			if ($('#popupConfirm').attr('tag') == '1') {
				$('#popupConfirm').parent().removeClass('show').hide();
				$('#buyBtn1').parent().addClass('show').show();
			}
			break;
		case 3:
			obj.jdStatus = false;
			$('#buyBtn2, #addCart2').addClass('btn_disable');
			$('#buyBtn1, #addCart1,#popupConfirm').addClass('disabled_1');
			break;
		case 4:
			obj.jdStatus = false;
			$('#buyBtn2, #addCart2,#buyBtn1,#addCart1').hide();
			$('#viewGuess,#viewGuess1').show();
			$('#popupConfirm').parent().removeClass('show').hide();
			$('#buyBtn1').parent().addClass('show').show();
			break;
		case 5:
			obj.jdStatus = true;
			$('#buyBtn2,#addCart2').removeClass('btn_disable');
			$('#buyBtn1,#addCart1,#popupConfirm').removeClass('disabled_1');
			break;
		case 6:
			$('#addCart2,#addCart1').hide();
			$('#popupConfirm').parent().removeClass('show').hide();
			$('#buyBtn1').parent().addClass('show').show();
			if (opt.buyTxt) {
				$('#buyBtn1,#buyBtn2').html(opt.buyTxt);
			}
			break;
		}
		if (favFlag === 1) {
			$('#fav').hide();
			$('#favWrap').removeClass('fn_goods_name');
			$('#itemDesc').removeClass('right_shorter');
		}
		if (msg) {
			$('#statusNotice').show();
			$('#statusNote').html(msg);
			$('#popupNotice').html(msg).show();
		}
	};
	ItemDet.prototype.delTimeout = function(key) {
		if (this.timeout[key]) {
			clearTimeout(this.timeout[key]);
			this.timeout[key] = null;
		}
	};
	ItemDet.prototype.createTimeout = function(operationNo, msg) {
		var itilStr = 'itil' + operationNo;
		this.delTimeout(itilStr);
		this.timeout[itilStr] = setTimeout(function() {
			JD.report.umpBiz({
				bizid: '25',
				operation: operationNo,
				result: '1',
				source: '0',
				message: msg
			});
		}, this.cgiTimeout);
	};
	ItemDet.prototype.ajaxSend = function(url, params) {
		if (!url || url.indexOf('wq.jd.com') === -1) return;
		params = params || {};
		var obj = this,
			timeout = (params.timeout || obj.cgiTimeout),
			umpResultCode = (params.umpResultCode || {
				'404': '10',
				'302': '11',
				'timeout': '12',
				'other': '13'
			}),
			resultCode = '0',
			msg = (params.msg || 'item api '),
			operationNo = params.operationNo,
			reqParam = {
				type: 'GET',
				url: url,
				async: true,
				timeout: timeout,
				dataType: 'json',
				complete: function(xhr, textStatus) {
					var status = xhr.status,
						repText = xhr.responseText;
					if (status == 200 || status == 304) {
						resultCode = '0';
						if (~repText.indexOf('<!DOCTYPE HTML>')) {
							resultCode = umpResultCode['302'];
							msg += 'fail ';
						} else {
							msg += 'success ';
						}
					} else {
						resultCode = ((status == 404 || status == 302) ? umpResultCode['302'] : (umpResultCode[textStatus] || umpResultCode.other));
						msg += 'fail ' + status + textStatus;
					}
					JD.report.umpBiz({
						bizid: '25',
						operation: operationNo,
						result: resultCode,
						source: '0',
						message: msg
					});
				}
			},
			ajaxSend = $.ajax(reqParam);
	};
	ItemDet.prototype.createPopup = function(opt) {
		var obj = this,
			flag = opt.flag,
			stopMove = opt.stopMove,
			msg = opt.msg,
			noCoverEvent = opt.noCoverEvent,
			stopMoveFun = function(e) {
				e.preventDefault();
			},
			btnClose = false,
			btnConfirm = false,
			btnCancel = false,
			btnEvent = function() {
				obj.setDelayTime();
				$('#modAlertDiv,#modAlertMask').hide().removeClass(' mod_alert_info show fixed');
				if (stopMove) document.removeEventListener("touchmove", stopMoveFun, false);
			};
		if (!$('#modAlertDiv').length) {
			$('body').append('<div id="modAlertDiv" class="mod_alert" style="display: none;"></div><div id="modAlertMask" class="mod_alert_mask" style="display: none;"></div>')
		}
		var $el = $('#modAlertDiv'),
			$cover = $('#modAlertMask');
		switch (flag) {
		case 1:
			if (this.isExpByjd) {
				$el.addClass('mod_alert_info');
			}
			msg = this.postTip;
			$el.html(msg + '<p class="btns"><a href="javascript:void(0);" class="btn btn_1">知道了</a></p>');
			btnClose = 'p.btns';
			break;
		case 2:
			$el.addClass('mod_alert_info');
			$el.html('<span class="close"></span><h3 class="title">预售规则</h3><div class="inner"><dl><dd> 1、定金下单后，请在30分钟内付款，超时将自动关闭订单；</dd></dl><dl><dd>2、定金付款后，若非京东或商家责任（根据《售后政策》和客服判断为准），定金恕不退还；</dd></dl><dl><dd>3、预售结束时，由系统自动更新尾款价格，先下单后下单均能享受同样的价格。请至京东“我的订单”内付尾款；</dd></dl><dl><dd>4、尾款开始付款后，请在要求的时间（72小时）内支付尾款，若超时将自动关闭订单，且定金不予退还。请注意预售的结束时间，并及时支付尾款；</dd></dl><dl><dd>5、预售商品不支持7天无理由退换货；</dd></dl><dl><dd>6、发货时间请以预售商品详情页“发货时间”描述为准。</dd></dl></div>');
			btnClose = 'span.close';
			break;
		case 3:
			$el.html(msg + '<p class="btns"><a href="javascript:void(0);" class="btn btn_1">知道了</a></p>');
			btnClose = 'p.btns';
			break;
		case 4:
			$el.html((opt.icon != 'none' ? ('<i class="icon' + (opt.icon != 'info' ? (' icon_' + opt.icon) : '') + '"></i>') : '') + '<p>' + msg + '</p><p class="btns"><a href="javascript:;" class="btn btn_1">' + opt.okText + '</a><a href="javascript:;" class="btn btn_2">' + opt.cancelText + '</a></p>');
			btnConfirm = 'a.btn_1';
			btnCancel = 'a.btn_2';
			btnClose = 'a.btn_2';
			break;
		case 5:
			msg = '<i class="icon"></i><p>' + msg + '</p><div class="verify_input"><input class="input" type="text" id="verifyInput"><span class="wrap"><img src="' + (obj.priceVerify.img || '//fpoimg.com/75x30') + '" alt="点击刷新" id="verifyCodeImg"></span></div><p class="warn_text" id="warnTip">验证码错误，请重新输入</p>';
			$el.html(msg + '<p class="btns"><a href="javascript:void(0);" class="btn btn_1">提交</a></p>');
			break;
		case 6:
			$el.addClass('mod_alert_info');
			$el.html('<span class="close"></span><h3 class="title">税费提示</h3><div class="inner"><dl><dd>1.财政部，海关总署，国家税务总局发布跨境电子商务零售进口税收政策，自2016年4月8日起，跨境电商单次交易限值为人民币2000元，个人年度交易限值为人民币20000元。</dd></dl><dl><dd>2.跨境电商综合税需按一般贸易增值税及消费税税额的70%征收，京东全球购代征代缴，税费以结算页金额为准。</dd></dl><dl><dd>3. 商品价格不包含税费。</dd></dl></div>');
			btnClose = 'span.close';
			break;
		}
		setTimeout(function() {
			$el.show().addClass('show fixed');
			$cover.show().addClass('show fixed');
		}, obj.isAndroid ? 100 : 400);
		if (btnClose) {
			$el.off().on('click', btnClose, function(e) {
				btnEvent();
			});
		}
		if (btnConfirm) {
			$el.on('click', btnConfirm, function() {
				opt.onConfirm && opt.onConfirm();
			});
		}
		if (btnCancel) {
			$el.on('click', btnCancel, function() {
				opt.onCancel && opt.onCancel();
			});
		}
		if (!noCoverEvent) {
			$cover.on('click', function() {
				btnEvent();
			});
		}
		if (stopMove) document.addEventListener("touchmove", stopMoveFun, false);
	};
	ItemDet.prototype.txReport = function(opt) {
		opt = opt || {};
		var obj = this,
			ptag = opt.ptag,
			isPV = opt.isPV,
			skuId = opt.skuId || obj.skuId;
		if (isPV) {
			var skuItem = obj.item();
			$.extend(obj.txPvLogobj, {
				detail_sku: skuId,
				detail_ispop: (obj.isZiying ? '0' : '1'),
				detail_cid: obj.jdCategory.slice(0, 3).join('_'),
				detail_price: obj.jdPrice,
				detail_brand: (skuItem.brandName || '') + '_' + (skuItem.brandId || ''),
				detail_vendor: (skuItem.shopInfo && skuItem.shopInfo.name || '') + '_' + (obj.venderId || '')
			});
			obj.txPvLogobj.detail_action = '';
			try {
				window.wa && wa('tencent.send', 'pv', obj.txPvLogobj);
				obj.txPvLogobj.pv_type = '1';
			} catch (e) {}
		} else {
			obj.txPvLogobj.detail_action = ptag;
			try {
				if (!opt.noJd) JD.report.rd({
					sku_id: skuId,
					vender_id: obj.venderId || '',
					ptag: ptag
				});
				window.wa && wa('tencent.send', 'click', obj.txPvLogobj);
			} catch (e) {}
		}
	};
	ItemDet.prototype.moduleAsyn = function(opt) {
		if (!opt || !opt.moduleName) return;
		var obj = this;
		if (!obj.moduleAsynObj[opt.moduleName]) {
			$.extend(window._moduleConfig.alias, opt.asynAlias);
			modulejs(opt.moduleKey, function(mod) {
				obj.moduleAsynObj[opt.moduleName] = mod;
				opt.cb && opt.cb();
			});
		} else {
			opt.cb && opt.cb();
		}
	};

	function $reportTrace(opt) {
		if (!opt) return;
		try {
			report.trace(opt);
		} catch (e) {}
	}

	function $jsonToTpl(json, tpl) {
		return tpl.replace(/{#(\w+)#}/g, function(a, b) {
			return json[b] === 0 ? '0' : (json[b] || "");
		});
	}
	exports.init = function() {
		var item = new ItemDet();
		item.init();
		window._itemDetail = item;
	};
});