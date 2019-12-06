import __config from '@/common/config'
/**
 * Promise 封装 uni.request 请求方法,断线重连
 *
 * @param {Object} defaults 配置项
 * @param {String} defaults.suffix 方法名后缀字符串，默认值 Request
 * @param {String} defaults.baseURL 基础请求路径
 * @param {Object} defaults.header 请求头
 * @param {Array} defaults.transformRequest 转换请求数据
 * @param {Array} defaults.transformResponse 转换响应数据
 * @param {Function} defaults.validateStatus 基于响应状态返回成功或失败
 *
 */
class Core {
	constructor(defaults) {
		this.baseURL = __config.basePath
		this.blackList = __config.blackList
		this.notAllowVisitor = true
		this.reconnectToken = true
		Object.assign(this, {
			defaults
		})
		this.__init()
	}

	/**
	 * 初始化
	 */
	__init() {
		this.__initDefaults()
		this.__initMethods()
	}

	/**
	 * 初始化默认参数
	 */
	__initDefaults() {
		const defaults = {
			// 方法名后缀字符串，默认值 Request
			suffix: 'Request',
			// 基础请求路径
			baseURL: '',
			// 请求头
			header: {
				// 'Accept': 'application/json, text/plain, */*',
				// 'Content-Type': 'application/x-www-form-urlencoded',
				// 'Accept': 'application/json, text/javascript',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			// 基于响应状态返回成功或失败，
			validateStatus: status => status >= 200 && status < 300
		}

		// 合并参数
		this.defaults = Object.assign({}, defaults, this.defaults)
	}

	/**
	 * 遍历对象构造方法，方法名以小写字母+后缀名
	 */
	__initMethods() {
		// 方法名后缀字符串
		const suffix = this.defaults.suffix

		// 发起请求所支持的方法
		const instanceSource = {
			method: [
				'GET',
				'POST',
				'DELETE'
			]
		}
		// 遍历对象构造方法
		for (let key in instanceSource) {
			instanceSource[key].forEach((method, index) => {
				this[method.toLowerCase() + suffix] = (url, config = '') => {
					return this.__defaultRequest(Object.assign({}, config, {
						method,
						url
					}))
				}
			})
		}
	}

	/**
	 * 以 wx.request 作为底层方法
	 * @param {Object|String} config 配置项|接口地址
	 * @param {String} config.method 请求方法
	 * @param {String} config.url    接口地址
	 * @param {Object} config.data 请求参数
	 * @param {Object} config.header 设置请求的 header
	 * @param {String} config.dataType 请求的数据类型
	 */
	__defaultRequest(config) {
		// 判断参数类型，如果第一个参数为字符串则赋值于 url，第二个参数为 config 配置
		if (typeof config === 'string') {
			config = Object.assign({}, {
				url: arguments[1]
			}, arguments[2])
		}

		// 合并参数
		const defaults = Object.assign({
			method: 'GET',
			dataType: 'json'
		}, this.defaults, config)

		// 配置请求参数
		const $$config = {
			url: this.baseURL + defaults.url,
			data: defaults.data,
			header: defaults.header,
			method: defaults.method,
			dataType: defaults.dataType
		}

		let requestInterceptors = []
		let responseInterceptors = []

		this.interceptors && this.interceptors.forEach(n => {
			if (n.request || n.requestError) {
				requestInterceptors.push(n.request, n.requestError)
			}
			if (n.response || n.responseError) {
				responseInterceptors.unshift(n.response, n.responseError)
			}
		})

		const chainInterceptors = (promise, interceptors) => {
			for (let i = 0, ii = interceptors.length; i < ii;) {
				let thenFn = interceptors[i++]
				let rejectFn = interceptors[i++]
				promise = promise.then(thenFn, rejectFn)
			}
			return promise
		}
		let promise = Promise.resolve($$config)
		promise = chainInterceptors(promise, requestInterceptors)
		promise = promise.then(res => {
			return this.__http(res)
		})
		promise = chainInterceptors(promise, responseInterceptors)

		return promise
	}

	/**
	 * __http - wx.request
	 */
	__http(obj) {
		let self = this
		return new Promise((resolve, reject) => {
			uni.request({
				url: obj.url,
				data: obj.data,
				dataType: obj.dataType,
				header: obj.header,
				method: obj.method,
				success: (res1) => {
					if (res1.data.code == 'NoLogin') {
						getApp().globalData.comFunc.getToken().then(res2 => {
							wx.setStorageSync('mytoken', res2.data.token)
							obj.header.token = res2.data.token
							wx.request({
								url: obj.url,
								data: obj.data,
								dataType: obj.dataType,
								header: obj.header,
								method: obj.method,
								success: res3 => {
									resolve(res3)
								},
								fail: e => {
									console.error('http方法wx.request res2错误', e)
									reject(e)
								}
							})
						}).catch(error => {
							resolve(error)
						})
					} else if (res1.statusCode == '200') {
						resolve(res1)
					} else {
						reject(res1)
					}
				},
				fail: (error) => {
					console.error(' wx.request reject', error)
					reject(error)
				}
			})
		})
	}
}

export default Core
