<template>
	<view class="content">
		<view class="item flex item-center">
			<view class="name flex-1">
				支付密码
			</view>
			<view class="text-right">
				<text class="c999">未设置</text>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				打赏弹幕
			</view>
			<view class="text-right">
				<switch :checked="barrage" @change="changeBarrage" :color="switchColor" />
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				系统推送
			</view>
			<view class="text-right">
				<switch :checked="system" @change="changeSystem" :color="switchColor" />
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				版本号
			</view>
			<view class="text-right">
				<text class="c999"></text>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				用户协议
			</view>
			<view class="text-right">
				<text class="c999"></text>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				常见问题
			</view>
			<view class="text-right">
				<text class="c999"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchColor:'#4C8FF7',
				barrage:false,
				system:true
			};
		},
		methods:{
			changeBarrage(event){
				
			},
			changeSystem(event){
				
			},
		}
	}
</script>

<style lang="less">
	.content{
		padding-left:24rpx;
	}
.item{
	border-bottom:1px solid #ccc;
	height: 100rpx;
	padding-right:24rpx;
}
</style>
