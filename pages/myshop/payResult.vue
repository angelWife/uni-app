<template>
	<view class="content">
		<view class="comResult">
			<view class="pic">
				<image src="../../static/images/paySuc.png" mode="widthFix"></image>
			</view>
			<view class="text orange blod fs20">
				{{resText}}
			</view>
			<view class="text">
				还差<text class="red">2</text>人，赶紧邀请好友来拼单吧
			</view>
		</view>
		<view class="btnBox">
			<view class="text text-center fs13 c999">
				人满发货，人不满退款<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
			</view>
			<view class="btn1">随便逛逛</view>
			<view class="btn1">重新支付</view>
			<button type="null" open-type="share">推荐给好友</button>
			<navigator url="">查看订单详情</navigator>
		</view>
	</view>
</template>

<script>
	import uniCountDown from '@/components/countDown.vue';
	export default {
		components: {
			uniCountDown
		},
		data() {
			return {
				resText:'支付成功',
				color:'#999',
			};
		},
	}
</script>

<style lang="less">

.btnBox{
	padding:0 24rpx;
	.btn1{
		width: 100%;
		border-radius:80rpx;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		color:#fff;
		margin-top:30rpx;
		background:linear-gradient(180deg,rgba(219,11,0,1) 0%,rgba(253,89,89,1) 100%);
	}
	button{
		margin-top:30rpx;
		line-height: 80rpx;
		border-radius:80rpx;
		width: 100%;
	}
	navigator{
		margin-top:30rpx;
		display: block;
		text-align: center;
		margin-top:30rpx;
	}
}

</style>
