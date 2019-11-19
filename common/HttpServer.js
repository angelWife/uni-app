/* eslint-disable eqeqeq */
// import WxRequest from '../assets/plugins/wx-request/lib/index'
import Core from '@/common/core'
import __config from '@/common/config'
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
			'/direct/sys/user/token/get', // 登录获取token
			'/direct/sys/common/nopic/validcode/sms/send', // 发送验证码
			// this.interceptors.blackList = this.blackList
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
				let needaddtoken = !__config.blackList.includes(request.url.replace(__config.basePath, ''))

				console.info('HttpService class request :', {
					url: request.url,
					data: request.data
				})
				if (!needaddtoken) {
					return request
				} else {
					request.url = request.url + '?access_token=' + token
					return request
				}
			},
			requestError(requestError) {
				uni.hideLoading()
				return Promise.reject(requestError)
			},
			response(response) {
				uni.hideLoading()
				// console.info('HttpService class response :', response)
				// console.info('HttpService class response :', response)
				return response.data.data
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
