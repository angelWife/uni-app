import HttpService from '@/common/HttpServer'
class Service extends HttpService {
	constructor(options) {
		super(options)
		this.$$path = {
			getToken: 'user/login_mp_register', // 通用根据code获取Token
			loginOut: 'user/login_out', //退出登录
			hotList: 'sys/cfg/hot_search/list_data', //热搜关键字列表'
			//上传

			//用户
			head_img: "app/user_info/upd_img_head", //修改头像
			userInfo: 'app/user_info/load_by_code', // 根据id加载个人资料信息
			ownerInfo: 'app/user_info/load_owner', // 根据id加载个人资料信息
			ownerInfoMain: 'app/user_info/load_owner_main', // 根据id加载个人资料信息
			settingsInfo: 'app/user_info/load_setting_info', // 根据id加载个人资料信息
			modifyInfo: 'app/user_info/modify', //修改个人信息
			defaultAddr: 'app/user_address/load_dft', //默认地址
			addrList: 'app/user_address/list', //地址列表
			addAddr: 'app/user_address/add', //新增地址
			deleteAddr: 'app/user_address/del', //删除地址
			deitAddr: 'app/user_address/modify', //修改地址
			checkPaypwd: 'app/user_account/check_pay_pd', //校验支付密码
			payByOther: 'app/user_account/pay_by_ticket', //星票支付
			rankList: 'dict/app/userMilitaryRankTypeList', //军衔
			sendMark: 'sys/sms_send/exc_by_type', //发送验证码
			submitMark: 'sys/sms_send/use_by_type', //提交
			shopInfoApply: 'shop/info_apply/exc', //创建店铺
			//文章帖子
			raleaseArtical: 'article/info/publish', // 发文章
			commentList: 'article/info_comment/table_data', // 评论列表
			raleasePic: 'article/info/publish_tie_img', // 帖子发布图片
			raleasePost: 'article/info/publish_tie', // 发布帖子
			deletePost: 'article/info/remove_by_id', // 删除帖子
			postList: 'article/info/table_data', //分页数据 1广场  2关注
			getToicList:'article/topic/list_data',
			loadTopic: 'article/topic/load_by_id', // 根据ID加载主题信息
			loadTopicList: 'article/topic/table_data', // 根据主题加载分页
			followPost: 'app/user_follow/exc', //关注
			relasePublish: 'article/info_comment/publish', //发评论
			relasePublishChild:'article/info_comment/publish_child',
			commentPublish: 'article/info_comment_up/exc', //评论带你赞
			likeComment: 'article/info_dt_up/exc', //点赞
			//商品
			productList: 'product/goods/table_data', // 销售商品分页
			directBuy: 'order/info/buy', //商品直接购买
			createSpell: 'order/spell/cre', // 创建拼团
			joinSpell: 'order/spell/join', // 加入拼单
			couponList: 'product/coupon/load_by_goodsId', //确认订单是的额优惠券
			productCommentList: 'product/goods_comment/table_data', //商品品论
			productDetail: 'product/goods/load_by_id', //商品详情
			shopDetail: 'shop/info/load_by_id', //店铺详情
			shopFollow: 'shop/info_user/follow', //店铺关注
			shopList: 'shop/product_goods/table_data', //店铺列表
			logistPrice: 'logistics/calculate/buy', //物流运费

			//订单
			orderList: 'order/info/table_data', //订单列表
			//排行
			articleRank: 'top/ranking/article', // 帖子排行
			prodRank: 'top/ranking/goods', //商品排行
			inviteRank: 'top/ranking/invite_user', //用户排行
			
		}
	}
	getToken(params) {
		return this.postRequest(this.$$path.getToken, {
			data: params
		})
	}
	ownerInfo(params) {
		return this.postRequest(this.$$path.ownerInfo, {
			data: params
		})
	}
	ownerInfoMain(params) {
		return this.postRequest(this.$$path.ownerInfoMain, {
			data: params
		})
	}
	settingsInfo() {
		return this.postRequest(this.$$path.settingsInfo)
	}
	userInfo(params) {
		return this.postRequest(this.$$path.userInfo, {
			data: params
		})
	}
	postList(params) {
		return this.postRequest(this.$$path.postList, {
			data: params
		})
	}
	raleasePost(params) {
		return this.postRequest(this.$$path.raleasePost, {
			data: params
		})
	}
	raleaseArtical(params) {
		return this.postRequest(this.$$path.raleaseArtical, {
			data: params
		})
	}
	followPost(params) {
		return this.postRequest(this.$$path.followPost, {
			data: params
		})
	}
	hotList(params) {
		return this.postRequest(this.$$path.hotList,{
			data:params
		})
	}
	loadTopic(params) {
		return this.postRequest(this.$$path.loadTopic, {
			data: params
		})
	}
	getToicList(params) {
		return this.postRequest(this.$$path.getToicList, {
			data: params
		})
	}
	loadTopicList(params) {
		return this.postRequest(this.$$path.loadTopicList, {
			data: params
		})
	}
	productList(params) {
		return this.postRequest(this.$$path.productList, {
			data: params
		})
	}
	directBuy(params) {
		return this.postRequest(this.$$path.directBuy, {
			data: params
		})
	}
	createSpell(params) {
		return this.postRequest(this.$$path.createSpell, {
			data: params
		})
	}
	joinSpell(params) {
		return this.postRequest(this.$$path.joinSpell, {
			data: params
		})
	}
	productCommentList(params) {
		return this.postRequest(this.$$path.productCommentList, {
			data: params
		})
	}
	productDetail(params) {
		return this.postRequest(this.$$path.productDetail, {
			data: params
		})
	}
	shopDetail(params) {
		return this.postRequest(this.$$path.shopDetail, {
			data: params
		})
	}
	shopFollow(params) {
		return this.postRequest(this.$$path.shopFollow, {
			data: params
		})
	}
	shopList(params) {
		return this.postRequest(this.$$path.shopList, {
			data: params
		})
	}
	couponList(params) {
		return this.postRequest(this.$$path.couponList, {
			data: params
		})
	}
	defaultAddr() {
		return this.postRequest(this.$$path.defaultAddr)
	}
	addrList() {
		return this.postRequest(this.$$path.addrList)
	}
	addAddr(params) {
		return this.postRequest(this.$$path.addAddr, {
			data: params
		})
	}
	deleteAddr(params) {
		return this.postRequest(this.$$path.deleteAddr, {
			data: params
		})
	}
	deitAddr(params) {
		return this.postRequest(this.$$path.deitAddr, {
			data: params
		})
	}
	logistPrice(params) {
		return this.postRequest(this.$$path.logistPrice, {
			data: params
		})
	}
	orderList(params) {
		return this.postRequest(this.$$path.orderList, {
			data: params
		})
	}
	rankList() {
		return this.getRequest(this.$$path.rankList)
	}
	sendMark(params) {
		return this.postRequest(this.$$path.sendMark, {
			data: params
		})
	}
	submitMark(params) {
		return this.postRequest(this.$$path.submitMark, {
			data: params
		})
	}
	shopInfoApply(params) {
		return this.postRequest(this.$$path.shopInfoApply, {
			data: params
		})
	}
	likeComment(params) {
		return this.postRequest(this.$$path.likeComment, {
			data: params
		})
	}
	commentPublish(params) {
		return this.postRequest(this.$$path.commentPublish, {
			data: params
		})
	}
	relasePublish(params) {
		return this.postRequest(this.$$path.relasePublish, {
			data: params
		})
	}
	relasePublishChild(params) {
		return this.postRequest(this.$$path.relasePublishChild, {
			data: params
		})
	}
	commentList(params) {
		return this.postRequest(this.$$path.commentList, {
			data: params
		})
	}
	modifyInfo(params) {
		return this.postRequest(this.$$path.modifyInfo, {
			data: params
		})
	}
	headImg(params) {
		return this.postRequest(this.$$path.head_img, {
			data: params
		})
	}
	post(url,params) {
		return this.postRequest(url, {
			data: params
		})
	}
	get(url) {
		return this.getRequest(url)
	}
	prodRank(){
		return this.postRequest(this.$$path.prodRank)
	}
	articleRank(){
		return this.postRequest(this.$$path.articleRank)
	}
	inviteRank(){
		return this.postRequest(this.$$path.inviteRank)
	}
	rankList(){
		return this.getRequest(this.$$path.rankList)
	}
	sendMark(params) {
		return this.postRequest(this.$$path.sendMark, {
			data: params
		})
	}
	submitMark(params) {
		return this.postRequest(this.$$path.submitMark, {
			data: params
		})
	}
}

export default Service
