<template>
	<view class="content pagebg flex f-col">
		<view class="picBox">
			<image src="../../static/images/bg-light.png" mode="widthFix"></image>
			<image class="junxian" :src="details.junxianpic" mode="widthFix"></image>
			<text>规则说明</text>
		</view>
		<view class="levelBox">
			<view class="item flex">
				<view class="name">
					粉丝数
				</view>
				<view class="dataBox flex-1">
					<view class="markBox prev">
						<text class="text">111</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="markBox next">
						<text class="text">23541</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="markBox now">
						<text class="text">1221</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="line">
						<view class="nowLine"></view>
					</view>
				</view>
			</view>
			<view class="item flex">
				<view class="name">
					购买额
				</view>
				<view class="dataBox flex-1">
					<view class="markBox prev">
						<text class="text">111</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="markBox next">
						<text class="text">23541</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="markBox now">
						<text class="text">1221</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="line">
						<view class="nowLine"></view>
					</view>
				</view>
			</view>
			<view class="item flex">
				<view class="name">
					活跃度
				</view>
				<view class="dataBox flex-1">
					<view class="markBox prev" :style="">
						<text class="text">111</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="markBox next">
						<text class="text">23541</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="markBox now">
						<text class="text">1221</text>
						<text class="sanjiao"></text>
						<text class="mark"></text>
					</view>
					<view class="line">
						<view class="nowLine"></view>
					</view>
				</view>
			</view>
		</view>
	    <view class="levelMsg">
	    	
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{
					junxianpic:'/static/images/junxian/1.png'
				},
				
			};
		},
		onLoad(){
			uni.setNavigationBarColor({
				backgroundColor: "#D2AE28",
				frontColor: '#ffffff',
				animation: {
					duration: 300,
					timingFunc: 'easeIn'
				}
			})
		},
		onShow(){
			this.getInfo()
		},
		methods:{
			getInfo(){
				let self = this
				this.$acFrame.HttpService.myLeave().then(res=>{
					if(res.success){
						let details = res.data
						details.junxianpic = '/static/images/junxian/'+details.type +'.png'
						let prevStyle='',nextStyle='',nowStyle=''
						self.details = details
						
					}
					self.details.junxianpic = '/static/images/junxian/1.png'
				})
			},
		}
		
	}
</script>

<style lang="less">
	.content{
		border:0;
		height:100vh;
	}
.picBox{
	background:linear-gradient(180deg,rgba(209,173,39,1) 0%,rgba(255,236,115,1) 100%);
	position:relative;
	text-align: center;
	image{
		width: 60%;
	}
	.junxian{
		width:150px;
		position: absolute;
		z-index: 5;
		left:50%;
		top:50%;
		margin-left:-75px;
		
		transform: translateY(-50%);
	}
	text{
		position:absolute;
		right:24rpx;
		bottom:24rpx;
		color:#90741A;
	}
}
.levelBox{
	background: #fff;
	padding:0 24rpx;
	.item{
		.name{
			margin-right:60rpx;
			line-height: 100rpx;
			height:100rpx;
		}
		.dataBox{
			position: relative;
			height:100rpx;
			.markBox{
				position:absolute;
				top:20rpx;
				
				text-align: center;
				z-index: 5;
				text{
					display: inline-block;
				}
				.text{
					border:1px solid #ccc;
					height:20rpx;
					line-height: 20rpx;
					border-radius:20rpx;
					padding:0 10rpx;
					font-size:20rpx;
					color:#999;
				}
				.sanjiao{
					position:absolute;
					left:50%;
					margin-left:-6rpx;
					top:36rpx;
					width: 0;
					height: 0;
					border-left: 8rpx solid transparent;
					border-right: 8rpx solid transparent;
					border-top: 8rpx solid #ccc;
				}
				.mark{
					width: 2px;
					background: #ccc;
					height:16rpx;
					position: absolute;
					left:50%;
					margin-left:-1px;
					top:46rpx;
				}
			}
			.prev{
				left:10%;
			}
			.next{
				left:80%;
			}
			.now{
				left:30%;
				z-index: 3;
				.text{
					background: #FFA820;
					border-color:#FFA820;
					color:#fff;
				}
				.sanjiao{
					border-top-color:#FFA820;
				}
				.mark{
					height:20rpx;
					width: 20rpx;
					border-radius: 20rpx;
					background: #FFA820;
					top:44rpx;
					margin-left:-10rpx;
					box-shadow: 0 0 5px rgba(0,0,0,0.2);
				}
					
			}
			.line{
				height:16rpx;
				border-radius:16rpx;
				overflow: hidden;
				position:absolute;
				background: #efefef;
				width: 100%;
				bottom:20rpx;
				left:0;
				.nowLine{
					position: absolute;
					width:50%;
					height:16rpx;
					border-radius:16rpx;
					background: #FF9D19;
					left:0;
					top:0;
				}
			}
		}
	}
}
.levelMsg{
	height:50%;
	padding:0 24rpx;
	margin-top:20rpx;
	background: #fff;
	overflow: hidden;
	.item{
		padding: 20rpx 0;
		border-bottom: 1px solid #ccc;
		>.flex-1{
			width: 60%;
		}
		.btnBox{
			padding-left:24rpx;
		}
		&:last-child{
			border:0;
		}
	}
}
.myscroll{
	height: calc(100% - 100rpx);
}
</style>
