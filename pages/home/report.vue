<template>
	<view class="content">
		<view class="modal reasons">
			<view class="title">请选择您想要举报的类型（必选）</view>
			<view class="resonlist">
				<view class="item" v-for="(item,index) in reasons" :key="index" :class="{'choose':item.choose}" @tap="chooseReason(index)">
					<view class="item_box">
						{{item.val}}
					</view>
				</view>
			</view>
		</view>
		<view class="modal picList">
			<view class="title">上传证明图片（选填）</view>
			<view class="picList">
				<view v-for="(item,ind) in picList" :key="ind" class="item">
					<image :src="item" mode="widthFix"></image>
					<icon class="remove iconfont icon-remove" @tap="removePic(ind)"></icon>
				</view>
				<view class="item upload">
					<view class="loadpic flex item-center just-con-c" @tap="choosePic">
						<view>+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="modal textarea">
			<view class="title">补充说明（选填100字以内）</view>
			<textarea v-modal="textVal" placeholder="请详细填写" maxlength="100"/>
		</view>
		<view class="btnBox">
			<button type="red" @tap="reward">确认</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			reasons:[],
			textVal:'猜测是',
			picList:[],
			picInd:0
		}
	},
	onLoad(options){
		this.articleId = options.id
	},
	onShow(){
		if(getApp().globalData.isShowPic){
			getApp().globalData.isShowPic=false
		}else{
			this.getReason()
		}
		
	},
	methods: {
		chooseReason(ind){
			this.reasons[ind].choose = !this.reasons[ind].choose
		},
		reward(){
			let self = this
			let params={
				articleId:self.articleId,
				content:self.textVal,
				typeList:[]
			}
			
			this.reasons.filter(v=>{
				if(v.choose){
					params.typeList.push(v.key)
				}
			})
			if(params.typeList.length==0){
				self.$acFrame.Util.mytotal("亲，请选择举报类型哦");
				return false
			}
			self.$acFrame.HttpService.rewardSub(params).then(res=>{
				if(res.success){
					self.uploadPic(res.data);
					self.$acFrame.Util.mytotal("举报成功");
					setTimeout(function() {
						uni.navigateBack({
							
						})
					}, 1500);
				}
			})
		},
		getReason(){
			let self = this
			self.$acFrame.HttpService.rewardTyps().then(res=>{
				if(res.success){
					let list = res.data
					list.filter(v=>{
						v.choose=false
					})
					self.reasons = list
				}
			})
		},
		choosePic() {
		  let self = this;
		  let len =self.picList.length
		  getApp().globalData.isShowPic = true
		  if(len==3){
			  self.$acFrame.Util.mytotal("亲，最多上传三张图片哦");
			  return false;
		  }
		  uni.chooseImage({
		    count: 3-len,
		    sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
		    success: function(res) {
		      let tempFilePaths = res.tempFilePaths;
		      for(let i=0;i<tempFilePaths.length;i++){
		          self.picList.push(tempFilePaths[i]);
		      }  
		    }
		  });
		},
		uploadPic(id) {
		  let token = uni.getStorageSync("access_token");
		  let channel = "MP_WX";
		  let self = this;
		  let imgUrl = self.picList[self.picInd];
		  let len = self.picList.length;
		  if (self.picInd < len) {
		    wx.uploadFile({
		      url:`${getApp().globalData.config.basePath}article/info_warn/publish_img?articleTieId=${self.articleId}&articleWarnId=${id}`, // 仅为示例，非真实的接口地址
		      filePath: imgUrl,
		      header: {
		        token,
		        channel
		      },
		      // formData:_data,
		      name: "file",
		      success: function(res) {
		        let _data = JSON.parse(res.data);
		        if (_data.success) {
		          self.picInd++;
		          self.uploadPic(id);
		        }
		      },
		      fail: error => {
		        self.$acFrame.Util.mytotal("error");
		      }
		    });
		  } else {
			  return false;
		    // uni.navigateBack({});
		  }
		},
		removePic(ind) {
		  this.picList.splice(ind, 1);
		},
		showpic(ind) {
		  this.$acFrame.Util.showBigPic(this.picList[ind], this.picList);
		},
	},
}
</script>

<style lang="less">
page {
	background: #eeeeee;
	min-height: 100%;
}
.content {
	padding: 20rpx;
	.modal {
		background: #fff;
		margin-bottom: 20rpx;
		.title {
			line-height: 60rpx;
			padding: 0 20rpx;
		}
		.resonlist{
			padding:0 10rpx 10rpx;
			overflow: hidden;
			.item{
				width: 33.3333%;
				float:left;
				padding:10rpx;
				.item_box{
					heigth:60rpx;
					line-height: 60rpx;
					text-align: center;
					background:#e6e6e6;
					color:#999;
					border-radius:0.2em;
				}
				&.choose{
					.item_box{
						color:#fff;
						background-color: #b40000;
					}
					
				}
			}
		}
		.picList{
			padding:10rpx;
			overflow: hidden;
			.item{
				float: left;
				width: 25%;
				height:calc((100vw - 60rpx) / 4);
				padding:10rpx;
				position: relative;
				icon{
					top:10rpx;
					right:10rpx;
				}
				.loadpic{
					width: 100%;
					height:100%;
					border:1px dashed #e6e6e6;
					font-size:80rpx;
					color:#999;
					text-align: center;
				}
			}
		}
		textarea{
			padding:10rpx 20rpx 20rpx;
			height:200rpx;
			width: 100%;
			word-break: break-all;
			box-sizing: border-box;
		}
	}
	.btnBox{
		margin:40rpx 0 20rpx;
	}
}
</style>
