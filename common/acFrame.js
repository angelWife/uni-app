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
	  return new Promise((resolve, reject)=>{
		  uni.login({
		  	provider: 'weixin',
		  	success(res) {
		  		console.log(res)
		  		uni.setStorageSync('wxcode',res.code)
		  		resolve(res.code)
		  	}
		  })
	  })
	}
    this.getToken = async (options = {}) => {
	  let self = this
      let code = await self._getCode()
	  let params={
		  inviteCode:''
	  }
      return new Promise((resolve, reject)=>{
		  self.HttpService.getToken(params).then(res => {
		    console.log('async getToken', res)
		    uni.setStorageSync('access_token', res.accessToken)
			resolve(res)
		  }).catch(err => {
		    console.error('async getToken', err)
		    reject(err)
		  })
	  })
	  
    }
  }
}

let acFrame = new AcFrame()

export default acFrame
