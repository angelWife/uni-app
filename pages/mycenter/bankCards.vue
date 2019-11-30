<template>
	<view class="content">
		<view class="cardLis">
			<view class="item flex item-center">
				<view class="pic">
					<image src="../../static/images/gongshang.png" mode="widthFix"></image>
				</view>
				<view class="center white flex-1">
					<view class="name fs16">中国工商银行</view>
					<view class="type">
						储蓄卡
					</view>
				</view>
				<view class="carNum fs16">
					<text class="hideMum">****</text>
					<text class="white">8888</text>
				</view>
			</view>
		</view>
		<view class="addCard flex" @tap="linkTo('checkCard')">
		<icon class="iconfont icon-add"></icon>
		<view class="flex-1">
			添加银行卡
		</view>
		<icon class="iconfont icon-right"></icon>
		</view>
		<view class="questions">
			常见问题
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			linkTo(name){
				uni.navigateTo({
					url: name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
page{
	min-height:100%;
	background: #efefef;
}
.content{
	padding:24rpx 24rpx 80rpx;
}
.item{
	height:200rpx;
	margin-bottom:20rpx;
	border-radius:0.3em;
	background: linear-gradient(90deg,#FE8F65 0%,#FD5262 100%);
	.pic{
		margin:0 40rpx;
		width: 100rpx;
		height:100rpx;
		line-height: 100rpx;
		text-align: center;
		background: #fff;
		border-radius: 100%;
		overflow: hidden;
		image{
			width: 60rpx;
		}
	}
	.name{
		padding:0 0 10rpx 0;
	}
	.hideMum{
		color:#fff;
		opacity: 0.5;
	}
	.carNum{
		margin:0 40rpx 0 0;
		text{
			display: inline-block;
			margin-left:20rpx;
		}
	}
}
.addCard{
	background: #fff;
	height:100rpx;
	line-height: 100rpx;
	border-radius:0.3em;
	padding:0 40rpx;
	.icon-add{
		margin-right:40rpx;
		color:#B40000;
	}
	.icon-right{
		font-size:28rpx;
		color:#999;
	}
}
.questions{
	position:fixed;
	width: 100%;
	bottom:0;
	left:0;
	text-align: center;
	font-size:24rpx;
	line-height: 80rpx;
}
</style>
