<template>
	<view class="content">
		<view class="prodBox flex">
			<view class="pic"><image :src="setImg(speci.detailList[0].goodsImgPath)" mode="widthFix"></image></view>
			<view class="name flex-1">{{speci.detailList[0].goodsName}}</view>
		</view>
		<view class="starBox">
			<view class="item flex">
				<view class="name">服务态度</view>
				<view class="starList">
					<block v-for="(item, ind) in server" :key="ind"><image :src="item.src" mode="widthFix" @tap="clickstar('server',ind)"></image></block>
				</view>
			</view>
			<view class="item flex">
				<view class="name">物流服务</view>
				<view class="starList">
					<block v-for="(item, ind) in logist" :key="ind"><image :src="item.src" mode="widthFix" @tap="clickstar('logist',ind)"></image></block>
				</view>
			</view>
			<view class="item flex">
				<view class="name">综合评分</view>
				<view class="starList">
					<block v-for="(item, ind) in compre" :key="ind"><image :src="item.src" mode="widthFix" @tap="clickstar('compre',ind)"></image></block>
				</view>
			</view>
		</view>
	    <view class="evalText">
	    	<view class="title">评价内容(选填)</view>
			<textarea :value="areaText" @input="areaChange" maxlength="300" placeholder="说说你用完宝贝后的感想吧" />
	    </view>
		<view class="imgList clearfix">
			<view class="item" v-for="(iten,ind) in picList" :key="ind">
				<image  :src="iten" mode="widthFix"></image>
			</view>
			<view class="item upLoad" @tap="choosePic">
				<icon class="iconfont icon-camaer"></icon>
				<text class="fs10">上传图片</text>
			</view>
		</view>
		<view class="btnBox">
			<view class="linear_btn" @tap="confirmEvaluate">
				确认评价
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			server: [
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false }
			],
			logist: [
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false }
			],
			compre: [
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false },
				{ src: '/static/images/null_star.png', choose: false }
			],
			picList:[],
			picInd:0,
			id:0,
			speci:{},
			areaText:''
		};
	},
	onLoad(options){
		this.id = options.id;
		this.speci=JSON.parse(options.speci);
		console.log(this.speci);
	},
	methods:{
		areaChange(e){
			this.areaText = e.detail.value
		},
		clickstar(name,ind){
			let _data = this[name];
			_data.filter((v,i)=>{
				if(i<ind){
					v.choose=true
					v.src="../../static/images/yellow_star.png"
				}else if(i==ind){
					if(v.choose){
						v.choose=false
						v.src="/static/images/null_star.png"
					}else{
						v.choose=true
						v.src="/static/images/yellow_star.png"
					}
				}else{
					v.choose=false
					v.src="/static/images/null_star.png"
				}
			})
			this[name]=_data
		},
		confirmEvaluate(){
			let self = this
			let params={
				content:this.areaText,
				gradeLogistics:this.getStarLen('server'),
				gradeService:this.getStarLen('logist'),
				gradeZh :this.getStarLen('compre'),
				orderDetailId :this.speci.detailList[0].id,
				orderId :this.speci.id
			}
			this.$acFrame.HttpService.subEvaluate(params).then(res=>{
				if(res.success){
					self.$acFrame.Util.mytotal('评论成功！')
					self.uploadPic(res.data)
				}
			})
		},
		getStarLen(name){
			let len = 0 
			this[name].filter(v=>{
				if(v.choose){
					len++
				}
			})
			return len
		},
		choosePic() {
		  let self = this;
		  let len =self.picList.length
		  if(len==9){
			  self.$acFrame.Util.mytotal("亲，最多上传九张图片哦");
			  return false;
		  }
		  uni.chooseImage({
		    count: 9-len,
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
		      url:
		        getApp().globalData.config.basePath +
		        "order/info_detail_comment/publish_img?commentId=" +
		        id, // 仅为示例，非真实的接口地址
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
		    setTimeout(function() {
				uni.navigateBack({});
			}, 1000);
		  }
		},
		setImg(url) {
			return this.$acFrame.Util.setImgUrl(url);
		},
	}
};
</script>

<style lang="less">
.prodBox {
	padding: 24rpx 24rpx 0;
	.pic {
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
	}
	.name {
		margin-left: 20rpx;
		width: 50%;
	}
}
.starBox {
	padding: 20rpx 0;
	border-bottom:1px solid #ccc;
	.item {
		line-height: 60rpx;
		.name {
			margin: 0 24rpx;
		}
		.starList {
			image {
				display: inline-block;
				margin-right: 24rpx;
				width: 20px;
			}
		}
	}
}
.evalText{
	padding: 0 24rpx;
	.title{
		padding:24rpx 0;
	}
	textarea{
		width: 100%;
		height:200rpx;
	}
}
.imgList{
	margin-top:20rpx;
	padding:0 10rpx;
	.item{
		float:left;
		width: 140rpx;
		height:140rpx;
		margin:14rpx;
		overflow: hidden;
	}
	.upLoad{
		text-align: center;
		border:1px dashed #ccc;
		border-radius: 0.2em;
		padding-top:30rpx;
		.iconfont{
			font-size:50rpx;
			color:#999;
		}
		text{
			display: block;
			color:#999;
		}
	}
}
.btnBox{
	padding:24rpx;
    margin-top:40rpx;
}
</style>
