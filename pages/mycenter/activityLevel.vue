<template>
	<view class="content pagebg flex f-col">
		<view class="head">
			<view class="">
				活跃度
				<text class="float-right blue">规则说明</text>
			</view>
			<view class="red blod fs16">
				374526
			</view>
		</view>
		<view class="listBox flex-1">
			<scroll-view class="myscroll" scroll-y="true" >
				<view class="item flex item-center">
					<view class="flex-1">
						<view class="">
							评论
						</view>
						<view class="fs10 c999">
							09-12 08:11
						</view>
					</view>
					<view class="red blod">
						+300
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.content{
	height:100vh;
	overflow: hidden;
}
.head{
	padding:20rpx 24rpx;
	background: #fff;
}
.listBox{
	margin-top:20rpx;
	height:calc(100vh - 150rpx);
	background: #fff;
	padding:0 24rpx;
	.item{
		padding:20rpx 0;
		border-bottom: 1px solid #ccc;
	}
}
</style>
