import Service from '@/common/interface'
import Util from '@/common/util'
import MyConfig from '@/common/config'

class AcFrame {
  constructor() {
    this.HttpService = new Service()
    this.Util = Util
    this.MyConfig = MyConfig
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
		  		// console.log(res)
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
		  inviteCode:getApp().globalData.userCode
	  }
      return new Promise((resolve, reject)=>{
		  self.HttpService.getToken(params).then(res => {
			  if(res.success){
				  uni.setStorageSync('access_token', res.data.token)
				  uni.setStorageSync('userCode', res.data.userCode)
				  uni.setStorageSync('secret', res.data.secret)
				  resolve(res)
			  }
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
