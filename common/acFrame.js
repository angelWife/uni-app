import Service from '@/common/interface'
import Util from '@/common/util'
import MyConfig from '@/common/config'

class AcFrame {
  constructor() {
    this.HttpService = new Service()
    // 常用方法
    this.Util = Util
    // 生成权限字符串方法
    this.MyConfig = MyConfig
    this.debug = MyConfig.debug
    // 缓存token和用户信息
    this._setUser = (res) => {
      // return new Promise((resolve, reject) => {
      uni.setStorageSync('access_token', res.accessToken)
      uni.setStorageSync('owner', res)
      getApp().globalData.owner = res
    }
	// 获取微信用户的code
	this._getCode = () => {
	  return wepy.login().then(res => {
		wepy.setStorageSync('code', res.code)
		return res.code
	  })
	}
    this.getToken = async (options = {}) => {
      let code = await _getCode()
      return HttpService.getToken(code).then(res => {
        console.log('async getToken', res)
        if (!res.hasBindPublicApp) {
          setTimeout(() => {
            wepy.redirectTo({
              url: '/pages/webview'
            })
          }, 100)
        }
        this._setUser(res)
        return res.accessToken
      }).catch(err => {
        console.error('async getToken', err)
        setTimeout(() => {
          wepy.redirectTo({
            url: '/pages/login'
          })
        }, 1000)
      })
    }
  }
}

let acFrame = new AcFrame()

export default acFrame
