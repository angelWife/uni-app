<template>
	<view class="content pagebg">
		<view class="searchBox flex">
			<view class="flex-1 input">
				<icon @tap="searchData" class="iconfont icon-search"></icon>
				<input v-if="isSearch" type="text" @input="changeVal" confirm-type="search" v-model="keywords" @confirm="searchData" />
				<input v-else type="text" value="" @tap="searchClick" disabled />
				<icon v-if="keywords" class="iconfont icon-clear" @tap="clearVal"></icon>
			</view>
			<view class="search" v-if="isSearch"><button @tap="cancelSearch" size="mini" type="text" hover-class="none">取消</button></view>
		</view>
		<view class="resBox" v-if="isSearch">
			<view class="fastSearch" v-if="nosearch">
				<view class="histroy" v-if="prodhistoryList.length > 0">
					<view class="title">
						<text>历史记录</text>
						<icon class="iconfont icon-delete" @tap="clearHistory"></icon>
					</view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in prodhistoryList" :key="index">
							<view class="item" @tap="tapSearch(item,'history')">{{ item }}</view>
						</block>
					</view>
				</view>
				<view class="hotSearch" v-if="hotSearch.length > 0">
					<view class="title"><text>热门搜索</text></view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in hotSearch" :key="index">
							<view class="item" @tap="tapSearch(item)">{{ item }}</view>
						</block>
					</view>
				</view>
			</view>
			<view class="listBox" v-else>
				<view class="shopList">
					<view class="item" v-for="(item,ind) in dataList" :key="ind">
						<view class="shopMsg flex item-center" @tap="shopDetail(item.shopInfoVo.id)">
							<view class="pic">
								<image :src="setImg(item.shopInfoVo.imgPath)" mode="widthFix"></image>
							</view>
							<view class="flex-1">
								<view class="name clearfix">
									<view class="shopname float-left textEllipsis">{{item.shopInfoVo.name}}</view>
									<view class="fs12 c999 float-right">已被{{item.shopInfoVo.numTotalFollow}}人圈粉</view>
								</view>
								<view class="text c999 textEllipsis">{{item.shopInfoVo.describe}}</view>
							</view>
						</view>
						<scroll-view scroll-x="true">
							<view class="proItem" v-for="(proItem,proInd) in item.goodsList" :key="proInd" @tap="productDetail(proItem.goodsId)">
								<view class="pic">
									<image :src="setImg(proItem.imgPath)" mode="widthFix"></image>
								</view>
								<view class="name textEllipsis">{{proItem.goodsName}}</view>
								<view class="price red clearfix">
									<text class="fs10">¥</text>
									<text class="fs18 blod">{{proItem.priceSale}}</text>
									<text class="mark" v-if="proItem.flagSpell==1">拼</text>
								</view>
							</view>
						</scroll-view>
						<view class="advent c999 fs10" v-if="item.type==2">
							广告
						</view>
					</view>
				</view>
			</view>
			<view v-if="nodata" class="noData flex f-row just-con-c item-center">
				<view class="text-center">
					<image src="/static/images/nodata.png" mode="widthFix"></image>
					<view class="text-center c666 fs16">
						这里还没有内容
					</view>
				</view>
			</view>
		</view>
		<view class="listBox" v-else>
			<view class="title">精品小店</view>
			<view class="shopList">
				<view class="item" v-for="(item,ind) in dataList" :key="ind">
					<view class="shopMsg flex item-center" @tap="shopDetail(item.shopInfoVo.id)">
						<view class="pic">
							<image :src="setImg(item.shopInfoVo.imgPath)" mode="widthFix"></image>
						</view>
						<view class="flex-1">
							<view class="name clearfix">
								<view class="shopname float-left textEllipsis">{{item.shopInfoVo.name}}</view>
								<view class="fs12 c999 float-right">已被{{item.shopInfoVo.numTotalFans?item.shopInfoVo.numTotalFans:0}}人圈粉</view>
							</view>
							<view class="text c999 textEllipsis">{{item.shopInfoVo.describe}}</view>
						</view>
					</view>
					<scroll-view scroll-x="true">
						<view class="proItem" v-for="(proItem,proInd) in item.goodsList" :key="proInd" @tap="productDetail(proItem.goodsId)">
							<view class="pic">
								<image :src="setImg(proItem.imgPath)" mode="widthFix"></image>
							</view>
							<view class="name textEllipsis">{{proItem.goodsName}}</view>
							<view class="price red clearfix">
								<text class="fs10">¥</text>
								<text class="fs18 blod">{{proItem.priceSale}}</text>
								<text class="mark" v-if="proItem.flagSpell==1">拼</text>
							</view>
						</view>
					</scroll-view>
					<view class="advent c999 fs10" v-if="item.type==2">
						广告
					</view>
				</view>
			</view>
			<view v-if="nodata" class="noData flex f-row just-con-c item-center">
				<view class="text-center">
					<image src="/static/images/nodata.png" mode="widthFix"></image>
					<view class="text-center c666 fs16">
						这里还没有内容
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSearch: false,
				showOper: false, // 发布的操作
				showPic: false, // 打开图片无需重新加载数据
				keywords: '',
				prodhistoryList: [],
				hotSearch: [],
				nosearch: true,
				dataList: [],
				pagesize: 100,
				pageIndex: 1,
				pageTotal: 1,
				nodata: false
			};
		},
		onShow() {
			this.initData();
		},
		onPullDownRefresh() {
			this.keywords = ''
			this.pageIndex = 1
			this.dataList = []
			this.initData();
			uni.stopPullDownRefresh();
		},
		methods: {
			initData() {
				let self = this
				let params = {
					keywords: this.keywords,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				self.$acFrame.HttpService.shopList(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							self.nodata = false
							self.dataList = list
						} else {
							self.nodata = true
							self.dataList = []
						}
						if (self.isSearch) {
							self.nosearch = false
						}
					} else {

					}
				})
			},
			searchClick() {
				let self = this
				this.isSearch = true;
				this.dataList = []
				this.prodhistoryList = uni.getStorageSync('prodhistoryList') || [];
				this.$acFrame.Util.getHotList(2).then(res => {
					if (res.success) {
						self.hotSearch = res.data
					}
				})
			},
			cancelSearch() {
				this.isSearch = false;
				this.searchVal = false;
				this.nosearch = true

				this.resetData();
				this.initData()
			},
			clearVal() {
				this.keywords = ""
			},
			searchData() {
				let val = this.keywords;
				this.pageIndex = this.pageIndex,
					this.pageSize = this.pageSize
				this.pageType = null;
				let prodhistoryList = uni.getStorageSync('prodhistoryList') || [];
				let goon = true
				prodhistoryList.filter(v => {
					if (v == val) {
						goon = false
					}
				})
				if (goon) {
					if (prodhistoryList.length < 10) {
						if (prodhistoryList.length > 0) {
							prodhistoryList.unshift(val);
						} else {
							prodhistoryList.push(val);
						}

					} else {
						prodhistoryList.splice(9, 1);
						prodhistoryList.unshift(val);
					}
				}
				uni.setStorageSync('prodhistoryList', prodhistoryList);
				this.prodhistoryList = prodhistoryList
				this.initData();
			},
			//清空历史
			clearHistory() {
				uni.setStorageSync('prodhistoryList', []);
				this.prodhistoryList = []
			},
			tapSearch(val, type) {
				if (type && type == 'history') {
					let prodhistoryList = uni.getStorageSync('prodhistoryList');
					prodhistoryList.filter((v, i) => {
						if (v == val) {
							prodhistoryList.splice(i, 1);
							prodhistoryList.unshift(val)
						}
					})
					this.prodhistoryList = prodhistoryList
					uni.setStorageSync('prodhistoryList', prodhistoryList);
				}
				this.resetData();
				this.pageType = null;
				this.keywords = val;
				this.initData();
			},
			shopDetail(id) {

				wx.navigateTo({
					url: `shopDetail?id=${id}`
				})
			},
			productDetail(id) {
				console.log(id);
				wx.navigateTo({
					url: "productDetail?id=" + id
				})
			},
			resetData() {
				this.pageIndex = 1;
				this.pageSize = 10;
				this.dataList = [];
				this.keywords = ''
				this.nodate = false;
				this.nomore = false
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			}
		}
	};
</script>

<style lang="less">
	page {
		min-height: 100%;

	}

	.content {
		padding-top: 120rpx;
		border: 0;

		.advent {
			margin-top: 10rpx;
		}
	}

	.searchBox {
		padding: 20rpx 24rpx 20rpx;
		background: #eee;
		position: fixed;
		width: 100%;
		z-index: 10;
		left: 0;
		top: 0;

		.input {
			position: relative;
			height: 80rpx;
			line-height: 80rpx;
			background: #fff;
			border-radius: 0.2em;

			input {
				width: 100%;
				padding: 0 60rpx;
				height: 80rpx;
				line-height: 80rpx;
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
			margin-left: 24rpx;

			button {
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}

	.resBox {
		min-height: calc(100vh - 120rpx);
		.title {
			padding: 20rpx;
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
						border-left: 1px solid #d6d6d6;
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

	}

	.searchList {
		height: 100%;
		padding-top: 20rpx;
	}

	.listBox {
		.title {
			font-size: 16px;
			font-weight: 600;
			color: #b40000;
			padding: 20rpx 24rpx;
		}

		.shopList {
			padding: 0 24rpx 20rpx;

			.item {
				background: #fff;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
				border-radius: 40rpx;
				padding: 24rpx;
				margin-bottom: 24rpx;

				.shopMsg {
					.pic {
						width: 60rpx;
						height: 60rpx;
						border-radius: 60rpx;
						overflow: hidden;
						margin-right: 20rpx;
					}

					.shopname {
						max-width: 50%;
						font-weight: 600;
					}

					text {
						border: 1px solid #999;
						font-size: 20rpx;
						padding: 0 6rpx;
						border-radius: 0.2em;
						margin-left: 10rpx;
						margin-top: 6rpx;
					}

					.text {
						margin-top: 4rpx;
						font-size: 26rpx;
					}
				}

				scroll-view {
					width: 100%;
					margin-top: 20rpx;
					white-space: nowrap;

					.proItem {
						width: 200rpx;
						display: inline-block;
						margin-right: 10rpx;

						&:last-child {
							margin-right: 0;
						}

						.pic {
							width: 100%;
							height: 200rpx;
							overflow: hidden;
						}

						.name {
							padding: 10rpx 0;
						}

						.price {
							.mark {
								position: relative;
								top: -4rpx;
								margin-left: 6rpx;
								font-size: 20rpx;
								padding: 0 6rpx;
								border-radius: 20rpx;
								border: 1px solid #b40000;
							}
						}
					}
				}
			}
		}
	}
</style>
