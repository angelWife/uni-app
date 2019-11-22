<template>
	<view class="content">
		<view class="searchBox flex">
			<view class="flex-1 input">
				<icon class="iconfont icon-search"></icon>
				<input type="text" value="" confirm-type="search" v-model="searchVal" @confirm="searchData" @tap="searchClick" readyonly />
				<icon class="iconfont icon-clear"></icon>
			</view>
			<view class="search">
				<button v-if="isSearch" @tap="cancelSearch" size="mini" type="text" hover-class="none">取消</button>
				<button v-else size="mini" type="red" @tap="ralease" hover-class="none">发布</button>
				<view class="operBox" v-if="showOper">
					<navigator class="item" url="posting" hover-class="hover">
						<icon class="iconfont icon-fatie"></icon>
						<text>发帖</text>
					</navigator>
					<navigator class="item" url="editArticle" hover-class="hover">
						<icon class="iconfont icon-article"></icon>
						<text>写文章</text>
					</navigator>
					<text class="sanjiao"></text>
				</view>
			</view>
		</view>
		<view class="resBox" v-if="isSearch">
			<view class="fastSearch" v-if="nosearch">
				<view class="histroy">
					<view class="title">
						<text>历史记录</text>
						<icon class="iconfont icon-delete"></icon>
					</view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in histroySearch" :key="index">
							<view class="item">{{ item }}</view>
						</block>
					</view>
				</view>
				<view class="hotSearch">
					<view class="title"><text>热门搜索</text></view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in hotSearch" :key="index">
							<view class="item">{{ item }}</view>
						</block>
					</view>
				</view>
			</view>
			<view class="searchList" v-else>
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData"><commentItem :dataList="dataList"></commentItem></scroll-view>
				<view class="noData flex f-row just-con-c item-center">
					<view class="text-center">
						<image src="/static/images/defaultpro.png" mode=""></image>
						<button class="radiuBtn" type="rednull" @tap="cancelSearch">随便看看</button>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox" v-else>
			<view class="nav-tabs flex">
				<block v-for="(item, index) in tabList" :key="index">
					<view class="flex-1 tabitem c999" :class="{ active: item.active }" @tap="tabClick(index)">
						<text>{{ item.name }}</text>
					</view>
				</block>
			</view>
			<view class="list-content">
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData"><commentItem :dataList="dataList"></commentItem></scroll-view>
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
			isSearch: false,
			showOper: false, // 发布的操作
			showPic: false, // 打开图片无需重新加载数据
			searchVal: '',
			tabList: [{ name: '关注', active: true }, { name: '广场', active: false }],
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
			histroySearch: ['苹果的nfc怎么打开', '王者的积分战队怎么玩的流', '苹果手机被锁住了怎么办'],
			hotSearch: ['四大名著', '护肤品', '女士口红', '女士香水', '怎么让孩子听话'],
			nosearch: false
		};
	},
	onLoad() {
		// uni.setNavigationBarColor({
		// 	backgroundColor: "#d20000",
		// 	frontColor: '#ffffff',
		// 	animation: {
		// 		duration: 400,
		// 		timingFunc: 'easeIn'
		// 	}
		// })
		// uni.setNavigationBarTitle({
		// 	title: '我的首页'
		// })
		console.log(this.$acFrame.Util.formatTime());
	},
	onShow() {
		if (!this.showPic) {
		} else {
			this.showPic = false;
		}
	},
	onShareAppMessage() {
		uni.showShareMenu();
	},
	onHide() {
		this.showOper = false;
	},
	methods: {
		searchClick() {
			this.isSearch = true;
		},
		// searchInput(e){
		//  this.searchVal = e.detail.val
		// },
		cancelSearch() {
			this.isSearch = false;
			this.searchVal = false;
		},
		searchData() {},
		ralease() {
			this.showOper = !this.showOper;
		},
		tabClick(ind) {
			this.tabList.forEach((v, i) => {
				if (i == ind) {
					v.active = true;
				} else {
					v.active = false;
				}
			});
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
}
.content {
	height: 100%;
	overflow: hidden;
}
.searchBox {
	padding: 20rpx 24rpx 10rpx;
	background: #fff;
	.input {
		position: relative;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 24rpx;
		background: #eee;
		border-radius: 0.2em;
		input {
			width: 100%;
			padding: 0 60rpx;
			height: 60rpx;
			line-height: 60rpx;
		}
		.iconfont {
			position: absolute;
			top: 0;
			width: 60rpx;
			text-align: center;
			color: #999;
		}
		.icon-clear {
			right: 0;
		}
	}
	.search {
		position: relative;
		.operBox {
			position: absolute;
			z-index: 5;
			width: 180%;
			top: 70rpx;
			right: 0;
			border-radius: 0.3em;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
			background: #2c2c2c;
			.item {
				height: 60rpx;
				line-height: 60rpx;
				padding: 10rpx 20rpx;
				color: #fff;
				icon {
					color: #fff;
					margin-right: 10rpx;
				}
				&:hover {
					background: #4c4c4c;
				}
			}
			.sanjiao {
				position: absolute;
				right: 20rpx;
				top: -6rpx;
				width: 0;
				height: 0;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-bottom: 10rpx solid #2c2c2c;
			}
		}
	}
	button {
		height: 60rpx;
		line-height: 60rpx;
	}
}
.listBox {
	height: calc(100% - 90rpx);
	.nav-tabs {
		background: #fff;
		text-align: center;
		font-size: 30rpx;
		.tabitem {
			padding: 10rpx 0 20rpx;
			text {
				display: inline-block;
				line-height: 40rpx;
				padding: 0 6rpx;
				border-bottom: 2px solid #fff;
			}
			&.active {
				color: #b40000;
				text {
					border-color: #b40000;
				}
			}
		}
	}
	.list-content {
		height: calc(100% - 50rpx);
		.myscroll {
			padding-bottom: 20rpx;
			box-sizing: border-box;
		}
	}
}
.resBox {
	height: calc(100% - 90rpx);
	.title {
		padding: 0 20rpx;
		font-size: 30rpx;
		line-height: 60rpx;
		icon {
			float: right;
			color: #999;
		}
	}
	.histroy {
		margin-top: 10rpx;
		.h_list {
			font-size: 26rpx;
			.item {
				float: left;
				width: 50%;
				padding: 10rpx 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:nth-child(2n) {
					border-left: 1px solid #efefef;
				}
			}
		}
	}

	.hotSearch {
		margin-top: 10rpx;
		.h_list {
			font-size: 24rpx;
			padding: 0 10rpx;
			.item {
				float: left;
				background: #eeeeee;
				color: #999;
				line-height: 40rpx;
				padding: 0 10rpx;
				border-radius: 0.3em;
				margin: 10rpx;
			}
		}
	}
	.searchList {
		height: 100%;
	}
	.noData {
		height: 100%;
	}
}
</style>
