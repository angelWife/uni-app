<template>
	<view class="content">
		<view class="modal">
			<view class="head flex item-center">
				<view class="pic comHeadPic"  @tap="linkTo('evaluate')">
					<image class="headPic" src="../../static/images/head1.png" mode="widthFix"></image>
					<image class="grade" src="../../static/images/baihu.png" mode="widthFix"></image>
				</view>
				<view class="center flex-1">
					<view class="name">
						<text class="fs15 blod">唐三藏</text>
						<text class="mark" @tap="linkTo('militaryRank')">少校</text>
					</view>
					<view class="text c999 fs13" @tap="linkTo('activityLevel')">
						活跃度：123445
					</view>
				</view>
				<view class="btnBox">
					<button class="radiuBtn" size="mini" type="red" @tap="linkTo('createShop')">申请开店</button>
				</view>
				<view class="right" @tap="linkTo('baseInfo')">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex" @tap="linkTo('mycenter')">
				<view class="icon">
					<image src="../../static/images/icon-homepage.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					我的主页
				</view>
			</view>
			<view class="item flex" @tap="linkTo('myWallet')">
				<view class="icon">
					<image src="../../static/images/icon-wallet.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					钱包
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex"  @tap="linkTo('myTask')">
				<view class="icon">
					<image src="../../static/images/icon-mission.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					任务
				</view>
			</view>
			<view class="item flex">
				<view class="icon">
					<image src="../../static/images/icon-wallet.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					订单
				</view>
			</view>
			<view class="item flex">
				<view class="icon">
					<image src="../../static/images/icon-aftersale.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					售后
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex">
				<view class="icon">
					<image src="../../static/images/icon-ranking.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					排行
				</view>
			</view>
			<view class="item flex">
				<view class="icon">
					<image src="../../static/images/icon-goodfriends.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					好友
				</view>
			</view>
			<view class="item flex" @tap="linkTo('myNews')">
				<view class="icon">
					<image src="../../static/images/icon-infom.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					消息
				</view>
			</view>
			<view class="item flex">
				<view class="icon">
					<image src="../../static/images/icon-treasury.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					宝库
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex" @tap="linkTo('mySpirit')">
				<view class="icon">
					<image src="../../static/images/icon-spirit.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					精灵
				</view>
			</view>
			<view class="item flex" @tap="linkTo('mySettings')">
				<view class="icon">
					<image src="../../static/images/icon-setting.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					设置
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			linkTo(url){
				uni.navigateTo({
					url: url
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
.modal{
	background: #fff;
	margin-bottom:20rpx;
	.item{
		height:80rpx;
		line-height: 80rpx;
		.icon{
			width: 40rpx;
		    margin:0 24rpx;
		}
		.right{
			border-bottom:1px solid #ccc;
		}
		&:last-child{
			.right{
				border:0;
			}
			
		}
		
	}
}
.head{
	padding:20rpx 0;
	.pic{
		width: 100rpx;
		height:100rpx;
		margin:0 24rpx;
	}
	.center{
		line-height: 40rpx;
		.mark{
			display: inline-block;
			margin-left:30rpx;
			border-radius: 40rpx;
			padding:0 20rpx;
			background: #46D88C;
			color:#fff;
			font-size:24rpx;
		}
		.text{
			margin-top:10rpx;
		}
	}
	.btnBox{
		margin-left:24rpx;
	}
	.right{
		height:100rpx;
		line-height: 100rpx;
		width: 80rpx;
		text-align: center;
		.iconfont{
			color:#999;
		}
	}
}

</style>
