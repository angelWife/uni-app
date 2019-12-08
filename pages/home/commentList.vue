<template>
	<view class="content">
		<view class="item selfComment flex item-center">
			<view class="img item-center">
				<image src="../../static/images/head1.png" mode="widthFix"></image>
			</view>
			<view class="flex-1 head-msg">
				<view class="clearfix">
					<text class="name fs15 blod">这边是评论的标题</text>
					<text class="rank">少校</text>
					<view class="float-right dianzan c999 fs12">
						<icon class="iconfont icon-dianzan"></icon>
						100
					</view>
				</view>
				<view class="text">
					这比安是评论内容
				</view>
				<view class="timer c999 fs12 clearfix">
					<text>2分总前</text>
				</view>
				<view class="blue look" @tap="lookSelf">查看原帖</view>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="img item-center">
				<image src="../../static/images/head1.png" mode="widthFix"></image>
			</view>
			<view class="flex-1 head-msg">
				<view class="clearfix">
					<text class="name fs15 blod">这边是评论的标题</text>
					<text class="rank">少校</text>
					<view class="float-right dianzan c999 fs12">
						<icon class="iconfont icon-dianzan"></icon>
						100
					</view>
				</view>
				<view class="text">
					这比安是评论内容
				</view>
				<view class="timer c999 fs12 clearfix">
					<text>2分总前</text>
				</view>
			</view>
		</view>
		<view class="footInput" @tap="showComment">
			<input type="text" value="" disabled="true" placeholder="回复评论" />
		</view>
		<commentModal :showModal="showModal" @relaseComment="relaseComment" @cancelRelase="cancelRelase"></commentModal>
	</view>
</template>

<script>
import commentModal from '@/components/comment.vue';	
	export default {
		components: {
			commentModal
		},
		data() {
			return {
				showModal:false
			};
		},
		methods:{
			showComment(){
				this.showModal=true
			},
			relaseComment(val){
				console.log(val)
			},
			cancelRelase(){
				this.showModal=false
			}
		}
	}
</script>

<style lang="less">
	.content{
		padding-bottom:100rpx;
	}
	.item {
		padding: 0 24rpx;

		.img {
			margin-right: 20rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			overflow: hidden;

			image {
				width: 100%;
			}
		}

		.head-msg {
			padding: 20rpx;
			border-bottom: 1px solid #ccc;

			text {
				float: left;
				margin-right: 20rpx;
			}

			.text {
				padding: 10rpx 0;
			}

			.name {
				max-width: 240rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.dianzan {
				margin-top: -10rpx;
			}

			.rank {
				margin-top: 4rpx;
				border-radius: 40rpx;
				padding: 0 16rpx;
				background: #46d88c;
				color: #ffffff;
				font-size: 26rpx;
			}

			.shop {
				border-radius: 40rpx;
				padding: 0 16rpx;
				background: #ffaf43;
				color: #ffffff;
				font-size: 26rpx;
			}

			.look {
				margin-top: 10rpx;
			}


		}

		.timer {
			text {
				float: left;
				margin-right: 20rpx;
			}

			.mark {
				font-size: 22rpx;
				border-radius: 30rpx;
				line-height: 32rpx;
				padding: 0 16rpx;
				border: 1px solid #b40000;
				color: #b40000;
				margin-top: 10rpx;
			}
		}

		&.selfComment {
			border-bottom: 1px solid #ccc;

			.head-msg {
				border: 0;
			}
		}
	}
	.footInput{
		height:100rpx;
		position:fixed;
		width: 100%;
		left:0;
		bottom:0;
		padding:18rpx 24rpx;
		border-top:1px solid #ccc;
		input{
			height:64rpx;
			line-height: 64rpx;
			padding:0 20rpx;
			border-radius: 64rpx;
			border:1px solid #ccc;
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
