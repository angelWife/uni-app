/* eslint-disable eqeqeq */
// import WxRequest from '../assets/plugins/wx-request/lib/index'
import Core from '@/common/core'
import Config from '@/common/config'
class HttpService extends Core {
	constructor(options) {
		super(options)
		this.urlConf = function(pathName, ...arr) {
			let url = ''
			// eslint-disable-next-line no-useless-escape
			url = this.$$path[pathName].replace(/{[a-zA-Z0-9\$]+}/g, function() {
				return arr.shift()
			})
			return url
		}
		this.blackList = [
			'user/login_mp_register', // 登录获取token
		]
		this.interceptors = [{
			request(request) {
				request.header = request.header || {}
				request.header['content-type'] = 'application/json'
				request.header['user-client'] = 'weixin-mini'
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let token = uni.getStorageSync('access_token')
				let wxcode = uni.getStorageSync('wxcode')
				let needaddtoken = !Config.blackList.includes(request.url.replace(Config.basePath, ''))
                request.header['channel']='MP_WX'
				if (!needaddtoken) {
					request.header['jsCode']=wxcode
					return request
				} else {
					request.header['token']=token
					return request
				}
			},
			requestError(requestError) {
				uni.hideLoading()
				return Promise.reject(requestError)
			},
			response(response) {
				uni.hideLoading()
				console.info('HttpService class response :', response)
				if(!response.data.success){
					if(response.data.message){
						uni.showToast({
							duration:2000,
							icon:'none',
							mask:true,
							title:response.data.message
						})
					}
					
				}
				return response.data
			},
			responseError(responseError = {}) {
				uni.hideLoading()
				// console.warn('HttpService class responseError :', responseError)
				let data = responseError.data || {}
				let {
					errorMsg = '', errorCtx = ''
				} = data
				let msg = errorMsg + '  ' + errorCtx
				if (errorMsg == '' && errorCtx == '') {
					msg = null
				}
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				})
				return Promise.reject(msg)
			}
		}]
	}
}

export default HttpService
