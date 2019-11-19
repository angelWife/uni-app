<template>
	<view class="">
		<view v-for="(item, index) in dataList" :key="index" class="listItem">
			<view class="item-head flex item-center">
				<view class="img item-center"><image :src="item.headImg" mode="widthFix" @error="imageError"></image></view>
				<view class="flex-1 head-msg" v-if="item.isAdvent">
					<view class="clearfix">
						<text class="name fs15">{{ item.createName }}</text>
					</view>
					<view class="timer c999 fs12">{{ item.createTime }}</view>
				</view>
				<view class="flex-1 head-msg" v-else>
					<view class="clearfix">
						<text class="name fs15">{{ item.name }}</text>
						<text v-if="item.rank" class="rank">{{ item.rank }}</text>
						<text v-if="item.follow" class="shop">店铺</text>
					</view>
					<view class="timer c999 fs12 clearfix">
						<text>{{ item.timer }}</text>
						<text class="mark">受赏</text>
						<text class="mark">置顶</text>
					</view>
				</view>
				<view class="followBox">
					<!-- follow -->
					<block v-if="item.isAdvent"><text class="follow">广告</text></block>
					<block v-else>
						<text class="follow" v-if="item.follow">已关注</text>
						<text class="follow active" v-else>关注</text>
					</block>
				</view>
			</view>
			<block v-if="item.isAdvent">
				<view class="adventPicBox">
					<view class="adventPic"><image src="http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg" mode="widthFix"></image></view>
					<view class="text-right addventBtn"><button size="mini" type="red">立即查看</button></view>
				</view>
			</block>
			<block v-else>
				<view class="articalBox">
					<view class="msg" :class="{ 'clamp clamp-3': !item.showMore && !isDetail }" @tap="linkDetail">
						<text class="name blue">@一只鱼</text>
						<text class="text">这边是前面一个人的具体的发表文章，内容随便，想看就看</text>
						<text class="from blue">#影视#</text>
						<text class="text">这边是前面一个人的具体的发表文章，内容随便，想看就看，哇哦这边最多显示文字为三行，超过三行的省略号</text>
						<view class="blue lookPic">
							<icon class="iconfont icon-tupian"></icon>
							查看图片
						</view>
					</view>
					<view v-if="!isDetail">
						<text v-if="item.showMore" class="blue" @tap="hideMore(index)">收起</text>
						<text v-else class="blue" @tap="showAll(index)">全文</text>
					</view>
				</view>
				<view class="articalBox news flex item-center" v-if="index == 1">
					<view class="a_pic"><image src="http://ww1.sinaimg.cn/thumb150/6ec1a24agw1f7p6rse818j20qo0zk0wt.jpg" mode="widthFix"></image></view>
					<view class="a_main flex-1">
						<view class="title blod clamp clamp-2">2019天猫双十一全天成交总额2684亿元 湖南位列全国第11名</view>
						<view class="msg fs12 clamp clamp-2">
							火热的买买买在11月11日24时打下了一个阶段性的句号，2019天猫双11成交额为2684亿元，较去年增长25.7%。11日19时数据显示，湖南交易额位列全国第11位。
						</view>
					</view>
				</view>
				<view class="articalBox flex item-center" v-else>
					<view class="a_main flex-1">
						<view class="title blod clamp clamp-2">2019天猫双十一全天成交总额2684亿元 湖南位列全国第11名</view>
						<view class="msg fs12 clamp clamp-2">
							火热的买买买在11月11日24时打下了一个阶段性的句号，2019天猫双11成交额为2684亿元，较去年增长25.7%。11日19时数据显示，湖南交易额位列全国第11位。
						</view>
					</view>
				</view>
				<view class="imgList clearfix">
					<view v-for="(imgItem, imgInd) in item.imgList" :key="imgInd" @tap="showBigImg(index, imgInd)" class="imgItem flex-1">
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
				<view class="itemOperBox flex">
					<view class="flex-1">
						<icon class="iconfont icon-share"></icon>
						<text>122</text>
					</view>
					<view class="flex-1">
						<icon class="iconfont icon-pinglun"></icon>
						<text>122</text>
					</view>
					<view class="flex-1">
						<icon class="iconfont icon-dianzan"></icon>
						<text>122</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'comment-item',
	props: {
		dataList: {
			// 要显示的数组
			type: Array,
			default() {
				return [];
			}
		},
		isDetail: { // 是否是详情
			type: Boolean,
			default() {
				return false;
			}
		}
		// showOper:{ // 距离头部多少px将其固定
		//   type: Boolean,
		//   default(){
		//     return false;
		//   }
		// }
	},
	data() {
		return {};
	},
	methods: {
		showAll(ind) {
			this.dataList[ind].showMore = true;
		},
		hideMore(ind) {
			this.dataList[ind].showMore = false;
		},
		showBigImg(listInd, imgInd) {
			let info = this.dataList[listInd];
			let imgList = info.imgList;
			this.$acFrame.Util.showBigPic(imgList[imgInd], imgList);
			this.showPic = true;
		},
		loadMoreData() {},
		linkDetail(){
			if(!this.isDetail) {
				uni.navigateTo({
					url:'/pages/index/commentDetail'
				})
			}
			
		}
	},
	watch: {}
};
</script>

<style lang="less">
.listItem {
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
		}
		.addventBtn {
			margin: 20rpx 0;
		}
	}
}
</style>
