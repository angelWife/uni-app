<template>
	<view class="content pagebg">
		<view class="comListBox">
			<view class="item flex">
				<view class="name">卡类型</view>
				<view class="flex-1 blod">中国银行储蓄卡（1235）</view>
			</view>
		</view>
		<view class="title">请填写实名信息</view>
		<view class="comListBox">
			<view class="item flex">
				<view class="name">卡类型</view>
				<view class="flex-1"><input type="text" value="" /></view>
			</view>
			<view class="item flex">
				<view class="name">身份证</view>
				<view class="flex-1"><input type="idcard" value="" /></view>
			</view>
			<view class="item flex">
				<view class="name">手机号</view>
				<view class="flex-1"><input type="number" value="" /></view>
			</view>
		</view>
		<view class="btnBox"><button type="red">下一步</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
.comListBox {
	margin-top: 20rpx;
	.name {
		width: 160rpx;
	}
	input {
		height: 80rpx;
		line-height: 80rpx;
	}
}
.title {
	padding: 0 24rpx;
	margin-top: 40rpx;
	color: #999;
}
.btnBox {
	margin-top: 50px;
	padding: 0 24rpx;
	line-height: 80rpx;
}
</style>
