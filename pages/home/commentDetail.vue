<template>
	<view class="content" id="myContent">
		<view class="detail listItem">
			<view class="item-head flex item-center">
				<view class="img item-center"><image :src="dataInfo.headImg" mode="widthFix" @error="imageError"></image></view>
				<view class="flex-1 head-msg">
					<view class="clearfix">
						<text class="name fs15">{{ dataInfo.name }}</text>
						<text v-if="dataInfo.rank" class="rank">{{ dataInfo.rank }}</text>
						<text v-if="dataInfo.follow" class="shop">店铺</text>
					</view>
					<view class="timer c999 fs12 clearfix">
						<text>{{ dataInfo.timer }}</text>
						<text class="mark">受赏</text>
						<text class="mark">置顶</text>
					</view>
				</view>
				<view class="followBox">
					<text class="follow" v-if="dataInfo.follow">已关注</text>
					<text class="follow active" v-else>关注</text>
				</view>
			</view>
			<view class="articalBox" v-if="isNews">
				<view class="msg">
					<text class="name blue">@一只鱼</text>
					<text class="text">这边是前面一个人的具体的发表文章，内容随便，想看就看</text>
					<text class="from blue">#影视#</text>
					<text class="text">这边是前面一个人的具体的发表文章，内容随便，想看就看，哇哦这边最多显示文字为三行，超过三行的省略号</text>
					<view class="blue lookPic">
						<icon class="iconfont icon-tupian"></icon>
						查看图片
					</view>
				</view>
			</view>
			<view class="articalBox flex item-center" v-else>
				<view class="a_main flex-1">
					<view class="title blod">2019天猫双十一全天成交总额2684亿元 湖南位列全国第11名</view>
					<view class="msg fs12"><rich-text :nodes="dataInfo.richNode"></rich-text></view>
				</view>
			</view>
			<view class="imgList clearfix">
				<view v-for="(imgItem, imgInd) in dataInfo.imgList" :key="imgInd" @tap="showBigImg(index, imgInd)" class="imgItem flex-1">
					<image :src="imgItem" mode="widthFix"></image>
				</view>
			</view>
			<view class="adventBox shopProduct flex item-center">
				<view class="p_pic"><image src="/static/images/defaultpro.png" mode="widthFix"></image></view>
				<view class="p_main flex-1">
					<view class="name"><text class="textEllipsis">亚历山大电子解压器亚历山大电子解压器</text></view>
					<view class="price red fs12">9988.00元</view>
				</view>
				<view class="p_buy"><button size="mini" type="red" class="">购买</button></view>
			</view>
			<view class="adventBox ranking flex item-center">
				<view class="p_pic"><image src="/static/images/defaultpro.png" mode="widthFix"></image></view>
				<view class="p_main flex-1">邀请好友排行榜</view>
				<view class="p_buy"><button size="mini" type="red" class="radiuBtn">去看看</button></view>
			</view>
			<view class="readNums text-right">1234阅读</view>
			<view class="shareBox flex">
				<view>分享到：</view>
				<view class="flex-1"><icon class="iconfont icon-shang"></icon></view>
			</view>
			<view class="operBox clearfix">
				<view class="item item_red"  @tap="reward">
					<icon class="iconfont icon-shang"></icon>
					<text>打赏</text>
				</view>
				<view class="item" @tap="report">
					<icon class="iconfont icon-jubao"></icon>
					<text>举报</text>
				</view>
				<view class="item">
					<icon class="iconfont icon-dianzan"></icon>
					<text>999</text>
				</view>
			</view>
			<view class="adventPicBox" v-if="dataInfo.isAdvent">
				<view class="adventPic">
					<image src="http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg" mode="widthFix"></image>
					<text>广告</text>
				</view>
			</view>
		</view>

		<view class="comment">
			<view class="title">评论 23</view>
			<view class="commentList">
				<view class="item flex">
					<view class="pic"><image src="../../static/images/head2.png" mode="widthFix"></image></view>
					<view class="flex-1">
						<view class="name">
							<text class="blod">十里杏林</text>
							<text class="follow">少校</text>
						</view>
						<view class="msg">优秀的人，是值得称赞的！</view>
						<view class="oper flex item-center">
							<view class="timer c999 fs12 flex-1">半小时前</view>
							<view class="operIocn clearfix">
								<icon class="iconfont icon-dianzan"></icon>
								<text>100</text>
							</view>
							<view class="operIocn clearfix">
								<icon class="iconfont icon-dianzan"></icon>
								<text>100</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="operFoot flex">
			<view class="flex-1">
				<input type="text" value="" placeholder="说点什么吧"/>
			</view>
			<view class="oper flex f-col" @tap="commentClick">
				<icon class="iconfont icon-comment"></icon>
				<text>评论266</text>
			</view>
			<view class="oper flex f-col">
				<icon class="iconfont icon-dianzan"></icon>
				<text>赞255</text>
			</view>
			<view class="oper flex f-col">
				<icon class="iconfont icon-share-b"></icon>
				<text>分享</text>
			</view>
		</view>
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
			isDetail: true,
			dataInfo: {
				headImg: '/static/images/head1.png',
				name: '哈利路亚妈妈咪呀sda',
				rank: '少校',
				hasShop: true,
				follow: true,
				timer: '5分钟前',
				showMore: false,
				isAdvent: true,
				richNode:
					'<p class="pd10">这边是文章内容，主要显示文章的段落，通过后台编辑过来</p><p class="pd10"><img style="width:100%;" src="http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg"/></p>',
				imgList: ['/static/images/head1.png', '/static/images/head2.png', '/static/images/head1.png', '/static/images/head2.png']
			}
		};
	},
	methods:{
		commentClick(){
			const query = uni.createSelectorQuery().in(this);
			query.select('#myContent').boundingClientRect(data => {
			  uni.pageScrollTo({
			  	scrollTop: data.bottom,
			  	duration: 300
			  })
			}).exec();
		},
		reward(){
			uni.navigateTo({
				url:'/pages/index/reward'
			})
		},
		report(){
			uni.navigateTo({
				url:'/pages/index/report'
			})
		}
	}
};
</script>

<style lang="less">
page {
	background: #eeeeee;
	min-height: 100%;
	.pd10 {
		padding: 10rpx 0;
	}
}
.content {
	padding-bottom: 100rpx;
}
.detail {
	background: #fff;
	padding: 20rpx 24rpx;
	border-bottom: 1px solid #efefef;
	.item-head {
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
			line-height: 50rpx;
			text {
				float: left;
				margin-right: 20rpx;
			}
			.name {
				max-width: 240rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.rank {
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
	}

	.followBox {
		height: 100rpx;
		padding-top: 5rpx;
		.follow {
			width: 100rpx;
			text-align: center;
			display: inline-block;
			height: 40rpx;
			line-height: 40rpx;
			border: 1px solid #bfbfbf;
			font-size: 26rpx;
			border-radius: 0.2em;
			color: #999;
			&.active {
				color: #fff;
				background: #b40000;
				border-color: #b40000;
			}
		}
	}
	.articalBox {
		margin: 20rpx auto;
		.msg {
			text {
				display: inline;
			}
			.name {
				margin-right: 10rpx;
			}
			.from {
				margin-left: 10rpx;
			}
		}
		.a_pic {
			width: 160rpx;
			margin-right: 20rpx;
		}
		.a_main {
			text-align: justify;
			width: 70%;
			.msg {
				margin-top: 4rpx;
			}
		}
		.lookPic {
			display: inline-block;
			margin-left: 20rpx;
			icon {
				margin-right: 10rpx;
			}
		}
	}
	.imgList {
		margin: 0 -10rpx;
		.imgItem {
			float: left;
			width: 30.55%;
			margin: 0 10rpx 20rpx;
			background: #f1f1f1;
			image {
				width: 100%;
			}
		}
	}
	.adventBox {
		background: #efefef;
		margin-bottom: 20rpx;
		padding: 16rpx 20rpx 16rpx 16rpx;
		.p_main {
			width: 150px;
			padding: 0 20rpx;
			text {
				display: block;
			}
		}
		.p_pic {
			width: 80rpx;
		}
	}
	.itemOperBox {
		text-align: center;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #999;
		.iconfont {
			margin-right: 10rpx;
			font-size: 40rpx;
			position: relative;
			top: 4rpx;
		}
	}
	.adventPicBox {
		.adventPic {
			margin: 20rpx 0;
			position: relative;
			text {
				position: absolute;
				top: 10rpx;
				left: 10rpx;
				color: #f1f1f1;
				font-size: 24rpx;
			}
		}
	}
	.shareBox {
		line-height: 80rpx;
		padding: 10rpx 0;
		.iconfont {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			border-radius: 80rpx;
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
			background: #fff;
			margin-right: 20rpx;
			font-size: 40rpx;
		}
	}
	.operBox {
		padding: 20rpx 0;
		text-align: center;
		.item {
			display: inline-block;
			padding: 0 30rpx 10rpx;
			line-height: 50rpx;
			border-radius: 50rpx;
			overflow: hidden;
			margin: 0 4%;
			color: #999;
			.iconfont {
				height: 40rpx;
				width: 40rpx;
				text-align: center;
				line-height: 40rpx;
				&::before {
					line-height: 100%;
				}
			}
			border: 1px solid #9f9f9f;
		}
		.item_red {
			background: #b40000;
			border-color: #b40000;
			color: #fff;
		}
	}
}
.comment {
	background: #fff;
	margin-top: 20rpx;
	.title {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
	}
	.item {
		padding: 20rpx;
		border-top: 1px solid #e9e9e9;
		.pic {
			width: 80rpx;
			margin-right: 20rpx;
		}
		.name {
			line-height: 40rpx;
			text {
				display: inline-block;
				margin-right: 20rpx;
			}
		}
		.follow {
			padding: 0 16rpx;
			border-radius: 40rpx;
			background: #46d88c;
			color: #ffffff;
			font-size: 26rpx;
		}
		.msg {
			min-height: 60rpx;
		}
		.oper {
			line-height: 30rpx;
			.timer {
			}
		}
		.operIocn {
			margin-left: 20rpx;
			color: #999;
			.iconfont {
				position: relative;
				top: -6rpx;
			}
			text {
				position: relative;
				top: -6rpx;
			}
		}
	}
}
.operFoot {
	position: fixed;
	z-index: 10;
	width: 100%;
	height: 100rpx;
	left: 0;
	bottom: 0;
	padding-bottom: env(safe-area-inset-bottom);
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
	background: #fff;
    input{
		display: block;
		margin:15rpx 20rpx;
		height:70rpx;
		line-height: 70rpx;
		padding:0 20rpx;
		background: #eeeeee;
		border-radius: 70rpx;
	}
	.oper{
		width: 120rpx;
		text-align: center;
		color:#999;
		text{
			font-size:24rpx;
		}
	}
}
</style>
