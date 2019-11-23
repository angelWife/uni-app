<template>
	<view class="content">
		<view class="headBox flex item-center">
			<view class="pic">
				<image class="grade" src="../../static/images/baihu.png" mode="widthFix"></image>
				<image class="headpic" src="../../static/images/head2.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1">
				<view class="address textEllipsis">
					<icon class="iconfont icon-location"></icon>黑龙江哈尔滨市双城区
				</view>
				<view class="text textEllipsis">
					<icon class="iconfont icon-yezi"></icon>最好的人，像孩子一样!
				</view>
				<view class="btn">
					<text>私信</text>
					<text>已关注</text>
				</view>
			</view>
			<view class="offical">
				<image class="grade" src="../../static/images/zhunwei.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="mydatas flex">
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">20</view>
				<view class="text">帖子</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">20</view>
				<view class="text">关注</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">20</view>
				<view class="text">粉丝</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">20</view>
				<view class="text">获赞</view>
			</view>
		</view>
		<view class="infoTab">
			<view class="item" v-for="(item,index) in infoTab" :key="index" :class="{'active':item.choose}">
				{{item.name}}
			</view>
		</view>
		<scroll-view class="myscroll" scroll-y="true" >
			<view class="reward">
				<commentItem :dataList="dataList"></commentItem>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import commentItem from '@/components/comment-item.vue';
	export default {
		components: {
			commentItem
		},
		data() {
			return {
				infoTab:[{name:'帖子',choose:true},{name:'小店',choose:false},{name:'荣誉',choose:false},{name:'受赏',choose:false}],
				dataList: [
					{
						headImg: '/static/images/head1.png',
						name: '哈利路亚妈妈咪呀sda',
						rank: '少校',
						hasShop: true,
						follow: true,
						timer: '5分钟前',
						showMore: false,
						isAdvent: false,
						imgList: ['/static/images/head1.png', '/static/images/head2.png', '/static/images/head1.png', '/static/images/head2.png']
					},
					{
						headImg: '/static/images/head1.png',
						isAdvent: false,
						name: '哈利路亚妈妈咪呀sda',
						rank: '少校',
						hasShop: true,
						follow: true,
						timer: '5分钟前',
						showMore: false,
						imgList: []
					},
					{
						headImg: '/static/images/head1.png',
						isAdvent: false,
						name: '哈利路亚妈妈咪呀sda',
						rank: '少校',
						hasShop: true,
						follow: true,
						timer: '5分钟前',
						showMore: false,
						imgList: [],
						isAdvent: true,
						adventImg: '',
						createName: '妮维雅',
						createTime: '09-21'
					}
				],
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	page{
		height:100%;
	}
.content{
	border:0;
	height:100%;
}
.headBox{
	background: #810d21;
	padding:20rpx 0;
	color:#fff;
	font-size:26rpx;
	.pic{
		position:relative;
		height:100rpx;
		width: 100rpx;
		margin:0 20rpx;
		.headpic{
			border-radius: 100rpx;
			width: 100rpx;
		}
		.grade{
			position: absolute;
			width: 120rpx;
			top:-10rpx;
			left:-10rpx;
		}
	}
	.msg{
		width: 50%;
		.text{
			padding:10rpx 0;
		}
		.btn{
			margin-top:10rpx;
			text{
				display: inline-block;
				padding:0 20rpx;
				border-radius:60rpx;
				border:1px solid #fff;
				margin:0 10rpx;
			}
		}
	}
	.offical{
		width: 160rpx;
		margin:0 20rpx;
	}
}
.mydatas{
	height:100rpx;
	.item{
		width: 25%;
		background: #d83d52;
		text-align: center;
		&:nth-child(2n){
			background:#e55266 ;
		}
		.num{
			color:#fff;
		}
		.text{
			color:#f2a8b2;
			font-size:24rpx;
		}
	}
}
.infoTab{
	background: #fff;
	height: 80rpx;
	.item{
		float:left;
		color:#999;
		border-bottom:2px solid #fff;
		padding:0 10rpx;
		margin:0 20rpx;
		height:80rpx;
		line-height: 100rpx;
		&.active{
			border-color:#b40000;
			color:#b40000;
		}
	}
}
.myscroll{
	height:calc(100% - 360rpx);
}
</style>
