import HttpService from '@/common/HttpServer'
class Service extends HttpService {
	constructor(options) {
		super(options)
		this.$$path = {
			getToken: '/direct/sys/user/token/get', // 通用根据code获取Token
			getTokenByInput: '/direct/sys/user/token/get', // 根据手机+店铺或者账号密码获取Token，登陆界面使用
		}
	}
	getToken(code) {
		let params = {
			loginType: 'WEIXIN_OPENID',
			weixinCode: code
		}
		// params.weixinCode='17702761686'
		return this.postRequest(this.$$path.getToken, {
			data: params
		})
	}
}

export default Service
