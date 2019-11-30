import HttpService from '@/common/HttpServer'
class Service extends HttpService {
	constructor(options) {
		super(options)
		this.$$path = {
			getToken: 'user/login_mp_register', // 通用根据code获取Token
			loginOut:'user/login_out',//退出登录
			//用户
			userInfo:'app/user_info/load_by_id',// 根据id加载个人资料信息
			ownerInfo:'app/user_info/load_owner',// 根据id加载个人资料信息
			updateInfo:'app/user_info/load_setting_info',// 根据id加载个人资料信息
			//文章
			commentList:'article/info_comment/table_data',// 文章分页
			raleasePic:'article/info/publish_img',// 发布图片
			raleasePost:'article/info/publish_tie',// 发布图片
			deletePost:'article/info/remove_by_id',// 删除帖子
			postList:'article/info/table_data',// 发布图片
			loadTheme:'article/topic/load_by_id',// 根据ID加载主题信息
			listByTheme:'article/topic/table_data',// 根据主题加载分页
			hotList:'article/info/hot_search/list_data',//热搜关键字列表
			//商品
			productList:'product/goods/table_data', // 销售商品分页
		}
	}
	getToken(params) {
		return this.postRequest(this.$$path.getToken, {
			data: params
		})
	}
	productList(params){
		return this.postRequest(this.$$path.productList, {
			data: params
		})
	}
}

export default Service
