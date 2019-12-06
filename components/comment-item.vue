<template>
	<view class="">
		<view v-for="(item, index) in dataList" :key="index" class="listItem">
			<block v-if="item.type == 1">
				<view class="item-head flex item-center">
					<view class="img item-center"><image :src="item.publishUser.imgPathHead" mode="widthFix"></image></view>
					<view class="flex-1 head-msg">
						<view class="clearfix">
							<text class="name fs15">{{ item.publishUser.userName }}</text>
							<text v-if="item.publishUser.militaryRankType" class="rank">{{ item.rank }}</text>
							<text v-if="item.publishUser.shopId" class="shop">店铺</text>
						</view>
						<view class="timer c999 fs12 clearfix">
							<block v-if="pageType == 2">
								<text>{{ item.articleInfo.timeInfo }}</text>
							</block>
							<block v-else>
								<text class="mark">受赏</text>
								<text class="mark">置顶</text>
							</block>
						</view>
					</view>
					<view class="followBox">
						<text class="follow" v-if="item.publishUser.hasFollow">已关注</text>
						<text class="follow active" v-else>关注</text>
					</view>
				</view>
				<block v-if="item.articleInfo.type == 1">
					<view class="articalBox">
						<view class="msg" :class="{ 'clamp clamp-3': !item.articleInfo.showMore && !item.articleInfo.isDetail }" @tap="linkDetail(item.articleInfo.id)">
							<block v-for="(conitem, comind) in item.articleInfo.showContent" :key="comind">
								<block v-if="conitem.type == 1">
									<text class="name blue" @tap.stop="linkUser(conitem.atId)">@{{ conitem.atName }}</text>
									<text class="text">{{ conitem.content }}</text>
								</block>
								<block v-else>
									<text class="from blue" @tap.stop="linkTheme(conitem.topicId)">#{{ conitem.topicName }}#</text>
									<text class="text">{conitem.content}}</text>
								</block>
							</block>
							<!-- <view class="blue lookPic">
								<icon class="iconfont icon-tupian"></icon>
								查看图片
							</view> -->
						</view>
						<view v-if="!item.articleInfo.isDetail">
							<text v-if="item.articleInfo.showMore" class="blue" @tap="hideMore(index)">收起</text>
							<text v-else class="blue" @tap="showAll(index)">全文</text>
						</view>
					</view>
					<view class="imgList clearfix">
						<view v-for="(imgItem, imgInd) in item.articleInfo.imgList" :key="imgInd" @tap="showBigImg(index, imgInd)" class="imgItem flex-1">
							<image :src="imgItem" mode="widthFix"></image>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="articalBox news flex item-center" v-if="item.articleInfo.imgList.length > 0">
						<view class="a_pic"><image :src="item.articleInfo.imgList[0]" mode="widthFix"></image></view>
						<view class="a_main flex-1">
							<view class="title blod clamp clamp-2">{{ item.articleInfo.title }}</view>
							<view class="msg fs12 clamp clamp-2">{{ item.articleInfo.content }}</view>
						</view>
					</view>
					<view class="articalBox flex item-center" v-else>
						<view class="a_main flex-1">
							<view class="title blod clamp clamp-2">{{ item.articleInfo.title }}</view>
							<view class="msg fs12 clamp clamp-2">{{ item.articleInfo.content }}</view>
						</view>
					</view>
				</block>
				<block v-for="(linkitem, linkInd) in item.itemLinkList" :key="linkInd">
					<view v-if="linkitem.type == 1" class="adventBox shopProduct flex item-center" @tap="linkProd(linkitem.goodsId)">
						<view class="p_pic"><image :src="linkitem.imgPath" mode="widthFix"></image></view>
						<view class="p_main flex-1">
							<view class="name">
								<text class="textEllipsis">{{ linkitem.goodsName }}</text>
							</view>
							<view class="price red fs12">{{ linkitem.priceSale }}元</view>
						</view>
						<view class="p_buy"><button size="mini" type="red" class="">购买</button></view>
					</view>
					<view v-else class="adventBox ranking flex item-center" @tap="linkRanking(linkitem.goodsId)">
						<view class="p_pic"><image src="/static/images/defaultpro.png" mode="widthFix"></image></view>
						<view class="p_main flex-1">邀请好友排行榜</view>
						<view class="p_buy"><button size="mini" type="red" class="radiuBtn">去看看</button></view>
					</view>
				</block>

				<view class="itemOperBox flex">
					<view class="flex-1">
						<icon class="iconfont icon-share"></icon>
						<text>{{ item.articleInfo.numTotalShare }}</text>
					</view>
					<view class="flex-1">
						<icon class="iconfont icon-pinglun"></icon>
						<text>{{ item.articleInfo.numTotalPersonReward }}</text>
					</view>
					<view class="flex-1">
						<icon class="iconfont icon-dianzan"></icon>
						<text>{{ item.articleInfo.numTotalUp }}</text>
					</view>
				</view>
			</block>
			<block v-elid="item.type == 2">
				<!-- item.adInfo -->
				<view class="item-head flex item-center">
					<view class="img item-center"><image :src="item.publishUser.imgPathHead" mode="widthFix"></image></view>
					<view class="flex-1 head-msg">
						<view class="clearfix">
							<text class="name fs15">{{ item.adInfo.createName }}</text>
						</view>
						<view class="timer c999 fs12">{{ item.adInfo.createTime }}</view>
					</view>

					<view class="followBox">
						<!-- follow -->
						<text class="follow">广告</text>
					</view>
				</view>
				<view class="adventPicBox">
					<view class="adventPic"><image src="http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg" mode="widthFix"></image></view>
					<view class="text-right addventBtn"><button size="mini" type="red">立即查看</button></view>
				</view>
			</block>
		</view>
		<view v-if="nodata" class="noData flex f-row just-con-c item-center">
			<view class="text-center">
				<image src="/static/images/nodata.png" mode="widthFix"></image>
				<view class="text-center c666 fs16">
					这里还没有内容
				</view>
				<button class="radiuBtn" @tap="linktoshop" type="rednull">随便看看</button>
				<!-- <navigator url="/pages/home/index" class="radiuBtn" hover-class="none">随便看看</navigator> -->
			</view>
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
		pageType: {
			type: Number,
			default() {
				return 1;
			}
		},
		nodata: {
			// 是否是详情
			type: Boolean,
			default() {
				return false;
			}
		},
		isDetail: {
			// 是否是详情
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
		linkDetail() {
			if (!this.isDetail) {
				uni.navigateTo({
					url: '/pages/index/commentDetail'
				});
			}
		},
		linktoshop(){
			debugger
			this.$emit('childLink');
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
