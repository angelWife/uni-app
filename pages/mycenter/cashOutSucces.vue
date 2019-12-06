<template>
	<view class="content pagebg">
		<view class="comResult">
			<view class="pic">
				<image src="../../static/images/drawalsuccess.png" mode="widthFix"></image>
			</view>
			<view class="text blue blod fs20">
				{{resText}}
			</view>
			<view class="text">
				请留意账户变动提醒
			</view>
		</view>
		<view class="comListBox">
			<view class="item flex">
				<view class="name">提现金额</view>
				<view class="flex-1 text-right">
					¥100.00
				</view>
			</view>
			<view class="item flex">
				<view class="name">到账银行卡</view>
				<view class="flex-1 text-right">
					<text>平安银行</text>
					<text>尾号8888</text>
				</view>
			</view>
		</view>
		<view class="btnBox">
			<view class="linear_btn">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resText:'提现成功'
			};
		}
	}
</script>

<style lang="less">
.comListBox{
	text{
		display: inline-block;
		margin-left:20rpx;
	}
}
.btnBox{
	margin-top:30px;
	padding:0 24rpx;
}
</style>
