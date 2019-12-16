<template>
	<view class="content">
		<view class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/icon1.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1 flex item-center">
				<view class="flex-1">
					<view class="name">
						每日签到
					</view>
					<view class="c999 fs12">
						+10星能
					</view>
				</view>
				<view class="btn">
					<button type="red" class="radiuBtn">领取</button>
				</view>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/icon2.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1 flex item-center">
				<view class="flex-1">
					<view class="name">
						邀请好友
					</view>
					<view class="c999 fs12">
						邀请一个好友+10星能
					</view>
				</view>
				<view class="btn">
					<button type="red" class="radiuBtn">去完成</button>
				</view>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/icon3.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1 flex item-center">
				<view class="flex-1">
					<view class="name">
						点赞奖励（0/20）
					</view>
					<view class="c999 fs12">
						+2星能/次
					</view>
				</view>
				<view class="btn">
					<button type="red" class="radiuBtn">去完成</button>
				</view>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/icon4.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1 flex item-center">
				<view class="flex-1">
					<view class="name">
						评论奖励（0/20）
					</view>
					<view class="c999 fs12">
						+5星能/次
					</view>
				</view>
				<view class="btn">
					<button type="red" class="radiuBtn">去完成</button>
				</view>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/icon5.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1 flex item-center">
				<view class="flex-1">
					<view class="name">
						评论奖励（0/10）
					</view>
					<view class="c999 fs12">
						+30星能/次
					</view>
				</view>
				<view class="btn">
					<button type="red" class="radiuBtn">去完成</button>
				</view>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/icon6.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1 flex item-center">
				<view class="flex-1">
					<view class="name">
						购买奖励
					</view>
					<view class="c999 fs12">
						+50星能/次
					</view>
				</view>
				<view class="btn">
					<button type="red" class="radiuBtn">去完成</button>
				</view>
			</view>
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
.item{
	height:120rpx;
	.pic{
		width: 80rpx;
		height:80rpx;
		overflow: hidden;
		margin:20rpx 30rpx;
	}
	.msg{
		height:100%;
		border-bottom:1px solid #ccc;
	}
	.btn{
		margin:0 30rpx;
		button{
			min-width:160rpx;
		}
	}
	.name{
		margin-bottom:10rpx;
	}
}
</style>
