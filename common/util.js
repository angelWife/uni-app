// 获取时间
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
	const second=milli/1000
	const minute= second/60
	const hour = minute/60
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

//分享
const shareUrl = (res, _data, title) => {
	let pagePath = '',
		imageUrl = ''
		
	if (res.from === 'button') {
		if (_data.productId) {
			pagePath = '?pagePath=/pages/shopmall/shopDetail/shopDetail&productId=' + _data.productId + '&productType=' + _data
				.productType + '&inviteCode=' + getApp().globalData.rabbitInfo.inviteCode
			imageUrl = _data.imgMainList[0]
			title = '在商城发现好物' + _data.name
		}
	} else {
		pagePath = '?inviteCode=' + getApp().globalData.rabbitInfo.inviteCode
	}
	return {
		title: title,
		path: '/pages/loading/loading' + pagePath,
		imageUrl: imageUrl
	}
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
		picPath='../../static/images/head1.png'
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
const uploadPic = (url) => {
	return new Promise((resolve, reject) => {
		let token = uni.getStorageSync('access_token');
		let channel='MP_WX';
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed', 'original'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				let tempFilePaths = res.tempFilePaths;
				resolve(tempFilePaths[0]);
				uni.uploadFile({
					url: getApp().globalData.config.basePath + '/file/upload', // 仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					header: {
						token,
						channel
					},
					name: 'file',
					success: function(res) {
						resolve(tempFilePaths[0]);
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
	self.$acFrame.HttpService.hotList(params).then(res => {
		if (res.success) {
			let _data = res.data;
			return _data;
		} else {
			self.$acFrame.Util.mytotal(res.code);
			return []
		}
	});
}

//处理订单状态
const setOrderStatus=(status)=>{
	let name = ''
	self.$acFrame.HttpService.hotList(params).then(res => {
		if (res.success) {
			let _data = res.data;
			return _data;
		} else {
			self.$acFrame.Util.mytotal(res.code);
			return []
		}
	});
}

module.exports = {
	formatTime,
	showBigPic,
	uploadPic,
	mytotal,
	shareUrl,
	setImgUrl,
	getHotList,
	countTime
}
