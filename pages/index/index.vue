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
		onLoad(){
			uni.setNavigationBarColor({
				backgroundColor: "#fff",
				frontColor: '#333',
				animation: {
					duration: 0,
					timingFunc: 'easeIn'
				}
			})
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
		width: 400rpx;
		top:0;
		right:-40%;
		z-index: 1;
	}
	.center{
		position:absolute;
		width: 480rpx;
		left:0;
		top:0;
		right:0;
		bottom:0;
		z-index: 3;
	}
	.foot-left{
		position:absolute;
		width: 400rpx;
		bottom:-20%;
		left:-40%;
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
		}
		.logo-name{
			width: 120rpx;
		}
	}
}
</style>
