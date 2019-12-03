<template>
	<view class="content">
		<view class="info">
			<view class="mark flex f-col just-con-c">
				<view class="pic">
					<image src="/static/images/head2.png" mode="widthFix"></image>
				</view>
				<view class="text">
					打赏小白熊的帖子
				</view>
			</view>
		</view>
		<view class="rewardList">
			<view class="title flex">
				<view class="flex-1">打赏记录</view>
				<view class="c999 text-right">
					他收到过100次打赏
				</view>
			</view>
			<scroll-view scroll-y>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
				<view class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="rewardBtn" @tap="rewardPeople">
			我要打赏
		</view>
		<view v-if="showmask" class="modalmask" @tap="hideModal">
			<view class="comModal rewardModal" :class="{'showModal':showmask}">
				<view class="title">
					<block v-for="(item,index) in modalBar" :key="index">
						<text :class="{'active':item.active}">{{item.name}}</text>
					</block>
				</view>
				<view class="giftList">
					<view class="item">
						<view class="box" @tap.stop="chooseItem(11)">
							<view class="pic">
								<image src="/static/images/photo.png" mode="widthFix"></image>
							</view>
							<view class="text flex just-con-b">
								<view>西瓜</view>
								<view>1星票</view>
							</view>
						</view>
					</view>
				</view>
				<view class="modalfoot flex item-center">
					<view class="text">星票：800</view>
					<view class="text">星能：800</view>
					<view class="btn flex-1 text-right">
						<button class="radiuBtn" type="red" size="mini" @tap.stop="rewardInit">打赏</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let giftModal = uni.createAnimation({
	  duration: 300,
	  timingFunction: "ease",
	  delay: 0
	})
	export default {
		name:'reward',
		data(){
			return {
				showmask:false,
				modalBar:[{name:'礼物',active:true},{name:'我的道具',active:false}],
				animationData:{}
			}
		},
		onLoad(){},
		onShow(){
			
		},
		methods:{
			rewardPeople(){
				this.showmask = true
			},
			hideModal(){
				this.showmask = false
			},
			chooseItem(ind){
				console.log(ind)
			},
			rewardInit(){
				this.showmask = false
			}
		}
	}
</script>
<style lang="less">
	page,.content{
		height:100%;
	}
	.info{
		height:240rpx;
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		overflow: hidden;
		background:url('http://img.taopic.com/uploads/allimg/120925/235089-12092500254595.jpg') center center no-repeat;
		background-color: rgba(0,0,0,0.3);
		background-size: 100% auto;
		text-align: center;
		position: relative;
		.mark{
			position:absolute;
			width: 100%;
			height:100%;
			top:0;
			left:0;
			background: rgba(0,0,0,0.3);
		}
		.pic {
			image{
				width: 100rpx;
				border-radius: 100rpx;
			}
		}
		.text{
			margin-top:10rpx;
			color:#fff;
		}
	}
	.rewardList{
		height:calc(100% - 320rpx);
		.title{
			height:80rpx;
			line-height: 80rpx;
			padding:0 20rpx;
		}
		scroll-view{
			height:calc(100% - 80rpx);
		}
		.item{
			height:100rpx;
			line-height: 100rpx;
			.pic{
				height:60rpx;
				width: 60rpx;
				line-height: 60rpx;
				margin:10rpx 20rpx;
				border-radius:60rpx;
				overflow: hidden;
			}
			.name,.msg{
				border-top:1px solid #efefef;
				padding-right:20rpx;
			}
		}
	}
	.rewardBtn{
		background: #b40000;
		color:#fff;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.rewardModal{
		bottom:-100%;
		transform: bottom 0.3s easy;
		&.showModal{
			bottom:0;
		}
		.title{
			height:80rpx;
			line-height: 80rpx;
			
			text{
				display: inline-block;
				padding:0 20rpx;
			}
			.active{
				font-size:32rpx;
				color:#b40000;
			}
		}
		.giftList{
			padding:10rpx;
			overflow: hidden;
			.item{
				padding:10rpx;
				width: 25%;
				float:left;
				.box{
					height:calc((100vw - 20rpx) / 4 - 20rpx);
					border-radius: 0.5em;
					background: #eee;
					.pic{
						padding:20rpx 20% 0;
					}
					.text{
						font-size:20rpx;
						color:#999;
						padding:10rpx 0;
						> view{width: 50%;text-align: center;}
					}
				}
			}
		}
	    .modalfoot{
			height:80rpx;
			padding: 0 20rpx;
			.text{
				margin-right:30rpx;
			}
		}
	}
</style>