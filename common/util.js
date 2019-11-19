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

// 图片点击事件
const showBigPic = (showSrc,list) => {
    uni.previewImage({
      current: showSrc,
      urls: list
    })
}
// 上传图片
const uploadPic = (url) => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed','original'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function(res) {
			let tempFilePaths = res.tempFilePaths;
			return tempFilePaths[0]
			uni.uploadFile({
				url: app.__config.basePath + '/api/rabbit/setting/upd_imghead', // 仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				header: {
					token,
					rabbitId,
					channel
				},
				name: 'file',
				success: function(res) {
					return tempFilePaths[0]
				}
			});
		}
	});
}

module.exports = {
	formatTime,
	showBigPic,
	uploadPic
}