<template>
	<view class="content">
		
		<view class="head">
			<image class="foot" src="../../static/images/pic-ladder@2x.png" mode="widthFix"></image>
			<view class="item one" @tap="userInfo(item.userCode )">
				<image class="guan" src="../../static/images/icon-crown.png" mode="widthFix"></image>
				<view class="pic">
					<image :src="setImg(dataList[0].imgHeadPath)" mode="widthFix"></image>
				</view>
				<text class="num">1</text>
				<view class="name text">{{dataList[0].nickName}}</view>
			</view>
			<view class="item two" @tap="userInfo(item.userCode )">
				<view class="pic">
					<image :src="setImg(dataList[1].imgHeadPath)" mode="widthFix"></image>
				</view>
				<text class="num">2</text>
				<view class="name">{{dataList[1].nickName}}</view>
			</view>
			<view class="item three" @tap="userInfo(item.userCode )">
				<view class="pic">
					<image :src="setImg(dataList[2].imgHeadPath)" mode="widthFix"></image>
				</view>
				<text class="num">3</text>
				<view class="name">{{dataList[2].nickName}}</view>
			</view>
			
		</view>
		<view class="list">
			<block v-for="(item,index) in dataList" :key="index">
			<view v-if="index > 2" class="item flex item-center" @tap="userInfo(item.userCode )">
				<view class="num c666">
					{{index+1}}
				</view>
				<view class="pic">
					<image :src="setImg(item.imgHeadPath )"></image>
				</view>
				<view class="name flex-1 textEllipsis">
					{{item.nickName }}
				</view>
				<view class="c999">
					<view class="">已邀请</view>
					<view class="">
						{{item.numTotalInvite}}人
					</view>
				</view>
			</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				pageIndex:1,
				pageSize:10,
				pageTotal:1,
				nomore:false,
				nodata:false
			}
		},
		onLoad(){
			uni.setNavigationBarColor({
				backgroundColor: "#60ACF8",
				frontColor: '#ffffff',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		onShow(){
			this.initData()
		},
		onPullDownRefresh(){
			this.resetData()
			this.initData()
			uni.stopPullDownRefresh();
		},
		onReachBottom(){
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.initData()
			} else {
				this.nomore = true
				return false;
			}
		},
		methods: {
			initData(){
				let self = this
				let params = {
					pageSize:this.pageSize,
					pageIndex:this.pageIndex
				}
				this.$acFrame.HttpService.inviteRank(params).then(res=>{
					if(res.success){
						self.pageTotal=res.data.pageTotal
						let list = res.data.rows
						self.pageSize = res.data.pageSize
						if(list.length>0){
							self.dataList =self.dataList.concat(res.data.rows);
						}else{
							self.nodata=true
						}
						
					}
				})
			},
			setImg(src){
				return  this.$acFrame.Util.setImgUrl(src);
			},
			resetData(){
				this.pageSize = 10
				this.pageIndex = 1
				this.nodata = false
				this.nomore = false
				this.dataList=[]
			}
		}
	}
</script>

<style lang="less">
.content{
	border:0;
}
.head{
	height:466rpx;
	background: linear-gradient(180deg,#60ACF8 0%,#0077D6 100%);
	padding:0 30rpx;
	position: relative;
	.foot{
		position:absolute;
		width: 96%;
		bottom:0;
		left:2%;
	}
	.item{
		position:absolute;
		width: 140rpx;
		height:140rpx;
		border-radius: 100%;
		padding:6rpx;
		.pic{
			width: 128rpx;
			height:128rpx;
			border-radius: 100%;
			overflow: hidden;
		}
		.guan{
			position:absolute;
			width: 60rpx;
			top:-30rpx;
			left:50%;
			margin-left:-30rpx;
		}
		.name{
			position:absolute;
			bottom:-70rpx;
			width: 160rpx;
			left:50%;
			margin-left:-80rpx;
			font-size:24rpx;
			text-align: center;
			color: #fff;
		}
		.num{
			position:absolute;
			width: 50rpx;
			height:50rpx;
			line-height: 50rpx;
			border-radius: 100%;
			text-align: center;
			font-size:30rpx;
			bottom:-25rpx;
			left:50%;
			margin-left:-25rpx;
		}
		&.one{
			left:50%;
			margin-left:-70rpx;
			top:46px;
			background: linear-gradient(120deg,#FFFF8B 0%,#FFA348 100%);
			.num{
				background: linear-gradient(180deg,#FFD555 0%,#FFA100 100%);
			}
		}
		&.two{
			width: 108rpx;
			height:108rpx;
			top:168rpx;
			left:80rpx;
			.pic{
				width: 96rpx;
				height:96rpx;
			}
			background: linear-gradient(120deg,#FFFFFF 0%,#A2A2A2 100%);
			.num{
				background: linear-gradient(180deg,#ECFAFF 0%,#A6A7A8 100%);
			}
		}
		&.three{
			width: 108rpx;
			height:108rpx;
			top:168rpx;
			right:80rpx;
			.pic{
				width: 96rpx;
				height:96rpx;
			}
			background: linear-gradient(120deg,#E2AB65 0%,#BB7C2C 100%);
			.num{
				background: linear-gradient(180deg,#FBC884 0%,#D49E55 100%);
			}
		}
	}
}
.list{
	padding-left:30rpx;
	.item{
		padding:20rpx 20rpx 20rpx 0;
		border-bottom:1px solid #ccc;
		.pic{
			width: 96rpx;
			height:96rpx;
			border-radius:100%;
			overflow: hidden;
			margin:0 40rpx;
			image{
				height:96rpx;
			}
		}
		.name{
			width: 50%;
		}
	}
}
</style>
