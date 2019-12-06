<template>
	<view class="content">
		<image class="top" src="../../static/images/bg-loading1.png" mode="widthFix"></image>
		<image class="center" src="../../static/images/icon-loading.png" mode="widthFix"></image>
		<image class="foot-left" src="../../static/images/bg-loading2.png" mode="widthFix"></image>
		<view class="foot-center">
			<image class="logo" src="../../static/images/logo.png" mode="widthFix"></image>
			<image class="logo-name" src="../../static/images/logo-xinggou.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Index",
		data() {
			return {
				
			};
		},
		onLoad(options){
			uni.setNavigationBarColor({
				backgroundColor: "#ffffff",
				frontColor: '#333333',
				animation: {
					duration: 100,
					timingFunc: 'easeIn'
				}
			})
			var access_token = uni.getStorageSync('access_token');
			if(!access_token){
				this.$acFrame.getToken().then(res => {
					if(res.success){
						uni.switchTab({
							url:'../home/index'
						})
					}
				})
			}else{
				uni.switchTab({
					url:'../home/index'
				})
			}
		}
	}
</script>

<style lang="less">
.content{
	border:0;
	height:100vh;
	position: relative;
	overflow: hidden;
	.top{
		position:absolute;
		width: 480rpx;
		top:0;
		right:-160rpx;
		z-index: 1;
	}
	.center{
		position:absolute;
		width: 480rpx;
		left:50%;
		top:50%;
		margin-left:-240rpx;
		margin-top:-160rpx;
		z-index: 3;
	}
	.foot-left{
		position:absolute;
		width: 540rpx;
		bottom:-100rpx;
		left:-180rpx;
		z-index: 1;
	}
	.foot-center{
		position:absolute;
		text-align: center;
		z-index: 3;
		line-height: 100rpx;
		width: 100%;
		bottom:40rpx;
		left:0;
		image{
			display: inline-block;
		}
		.logo{
			width: 80rpx;
			margin-right:40rpx;
		}
		.logo-name{
			width: 120rpx;
		}
	}
}
</style>
