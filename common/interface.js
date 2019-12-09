import HttpService from '@/common/HttpServer'
class Service extends HttpService {
	constructor(options) {
		super(options)
		this.$$path = {
			getToken: 'user/login_mp_register', // 通用根据code获取Token
			loginOut: 'user/login_out', //退出登录
			//上传

			//用户
			userInfo: 'app/user_info/load_by_id', // 根据id加载个人资料信息
			ownerInfo: 'app/user_info/load_owner', // 根据id加载个人资料信息
			updateInfo: 'app/user_info/load_setting_info', // 根据id加载个人资料信息
			//文章帖子
			raleaseArtical: 'article/info/publish', // 发文章
			commentList: 'article/info_comment/table_data', // 评论列表
			raleasePic: 'article/info/publish_tie_img', // 帖子发布图片
			raleasePost: 'article/info/publish_tie', // 发布帖子
			deletePost: 'article/info/remove_by_id', // 删除帖子
			postList: 'article/info/table_data', //分页数据 1广场  2关注
			loadTopic: 'article/topic/load_by_id', // 根据ID加载主题信息
			loadTopicList: 'article/topic/table_data', // 根据主题加载分页
			hotList: 'article/info/hot_search/list_data', //热搜关键字列表
			followPost: 'app/user_follow/exc', //关注
			//商品
			productList: 'product/goods/table_data', // 销售商品分页
			directBuy: 'order/info/buy', //商品直接购买
			createSpell: 'order/spell/cre', // 创建拼团
			joinSpell: 'order/spell/join', // 加入拼单
			productCommentList: 'product/goods_comment/table_data', //商品品论
			productDetail: 'product/goods/load_by_id', //商品详情
			shopDetail: 'shop/info/load_by_id', //店铺详情
			shopFollow: 'shop/info_user/follow', //店铺关注
			shopList: 'shop/product_goods/table_data', //店铺列表
		}
	}
	getToken(params) {
		return this.postRequest(this.$$path.getToken, {
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
	hotList(params) {
		return this.postRequest(this.$$path.hotList)
	}
	loadTopic(params) {
		return this.postRequest(this.$$path.loadTopic, {
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
}

export default Service
