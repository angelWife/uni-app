// 获取时间
import AcFrame from '@/common/acFrame'
const formatTime = (type, date) => {
	const _date = date ? new Date(date) : new Date()
	const year = _date.getFullYear()
	const month = _date.getMonth() + 1
	const day = _date.getDate()
	const hour = _date.getHours()
	const minute = _date.getMinutes()
	const second = _date.getSeconds()
	if (type == 'day') {
		return [year, month, day].map(formatNumber).join('/')
	} else if (type == 'dayhm') {
		return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
	} else if (type == 'hm') {
		return [hour, minute].map(formatNumber).join(':')
	} else if (type == 'hms') {
		return [hour, minute, second].map(formatNumber).join(':')
	} else {
		return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	}
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
//倒计时间
const countTime=(time,type)=>{
	const nowdate = new Date().getTime()
	const enddate = new Date(time).getTime()
	const milli = enddate-nowdate;
	const timer = new Date(milli)
	// const second=milli/1000
	// const minute= second/60
	// const hour = minute/60
	const hour = timer.getHours();
	const minute = timer.getMinutes();
	const second = timer.getSeconds(); 
	if(type == 'hour'){
		return hour
	} else if(type == 'minute'){
		return minute
	} else if(type == 'second'){
		return second
	}
	
}
const mytotal = (title, icon = 'none', mask = false, duration = 2000) => {
	uni.showToast({
		title: title,
		icon: icon,
		mask: mask,
		duration: duration,
		position: 'center'
	});
}

//处理图片的路径
const setImgUrl = (imgPath) => {
	let picPath = ''
	if(imgPath){
		if (imgPath.indexOf('http') >= 0) {
			picPath = imgPath
		} else {
			picPath = getApp().globalData.config.imgPath + imgPath
		}
	} else {
		picPath='/static/images/head1.png'
	}
	
	return picPath

}
// 图片点击事件
const showBigPic = (showSrc, list) => {
	uni.previewImage({
		current: showSrc,
		urls: list
	})
}
// 上传图片
const uploadPic = (a_url) => {
	return new Promise((resolve, reject) => {
		let token = uni.getStorageSync('access_token');
		let channel='MP_WX';
		uni.chooseImage({
			count: 9,
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				let tempFilePaths = res.tempFilePaths;
				//resolve(tempFilePaths[0]);
				if(!a_url){
					a_url = '/file/upload';
				}
				uni.uploadFile({
					url: getApp().globalData.config.basePath + a_url, // 仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					header: {
						token,
						channel
					},
					name: 'file',
					success: function(res) {
						let _data = JSON.parse(res.data)
						resolve(_data.data.fullPath);
					},
					fail: (error) => {
						reject(error);
					}
				});
			}
		});
	})

}

//获取热搜关键字  type:1:帖子  2商品
const getHotList = (type) => {
	let self = this;
	let params = {
		type:type
	}
	AcFrame.HttpService.hotList(params).then(res => {
		if (res.success) {
			let _data = res.data;
			return _data;
		} else {
			mytotal(res.code);
			return []
		}
	});
}

//处理订单状态
const setOrderStatus=(status)=>{
	let name = ''
	let list = uni.getStorageSync('rankList');
	if(list){
		
	} else {
		AcFrame.HttpService.rankList().then(res => {
			if (res.success) {
				let _data = res.data;
				return _data;
			} else {
				mytotal(res.code);
				return []
			}
		});
	}
	
}

//处理军衔
const setRankName=(type)=>{
	let list = uni.getStorageSync('rankList');
	let rankName=''
	if(list){
		list.filter(v=>{
			if(v.key==type){
				rankName = v.val
			}
		})
	} else {
		AcFrame.HttpService.rankList().then(res => {
			if (res.success) {
				uni.setStorageSync('rankList',res.data);
				if(v.key==type){
					rankName = v.val
				}
			} else {
				mytotal(res.message);
			}
		});
	}
	
	return rankName;
}

//分享
const shareUrl = (res, settings) => {
	let title=''
	let imageUrl= ''
	let pagePath=''
	debugger
  if (res.from === 'button') {
    title = settings.title
	imageUrl = settings.imageUrl
	pagePath = settings.pagePath
  } else {
    
  }
  return {
    title: title,
    path: pagePath,
    imageUrl: imageUrl
  }
}

module.exports = {
	formatTime,
	showBigPic,
	uploadPic,
	mytotal,
	shareUrl,
	setImgUrl,
	getHotList,
	countTime,
	setRankName
}
