<template>
	<view class="content" @tap="hideTab">
		<view class="searchBox flex">
			<view class="flex-1 input">
				<icon @tap="searchData" class="iconfont icon-search"></icon>
				<input v-if="isSearch" type="text" @input="changeVal" confirm-type="search" v-model="keywords" @confirm="searchData" />
				<input v-else type="text" value="" @tap="searchClick" readyonly />
				<icon class="iconfont icon-clear"></icon>
			</view>
			<view class="search">
				<button v-if="isSearch" @tap="cancelSearch" size="mini" type="text" hover-class="none">取消</button>
				<button v-else size="mini" type="red" @tap.stop="ralease" hover-class="none">发布</button>
				<view class="operBox" v-if="showOper">
					<view class="item" hover-class="hover" @tap.stop="linkTo('posting')">
						<icon class="iconfont icon-fatie"></icon>
						<text>发帖</text>
					</view>
					<view class="item" hover-class="hover" @tap.stop="linkTo('editArticle')">
						<icon class="iconfont icon-article"></icon>
						<text>写文章</text>
					</view>
					<text class="sanjiao"></text>
				</view>
			</view>
		</view>
		<view class="resBox" v-if="isSearch">
			<view class="fastSearch" v-if="nosearch">
				<view class="histroy" v-if="historyList.length > 0">
					<view class="title">
						<text>历史记录</text>
						<icon class="iconfont icon-delete" @tap="clearHistory"></icon>
					</view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in historyList" :key="index">
							<view class="item" @tap="tapSearch(item)">{{ item }}</view>
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
			<view class="searchList" v-else>
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData">
					<commentItem :nodata="nodata" :nomore="searchnomore" :dataList="serchList"></commentItem>
				</scroll-view>
			</view>
		</view>
		<view class="listBox" v-else>
			<view class="nav-tabs flex">
				<block v-for="(item, index) in tabList" :key="index">
					<view class="flex-1 tabitem c999" :class="{ active: item.active }" @tap="tabClick(index, item.type)">
						<text>{{ item.name }}</text>
					</view>
				</block>
			</view>
			<view class="list-content">
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData">
					<commentItem :nodata="nodata" :nomore="nomore" :pageType="pageType" :dataList="dataList"></commentItem>
				</scroll-view>
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
			nosearch: true,
			nodata: false,
			nomore:false,
			keywords: '',
			tabList: [{ name: '关注', active: false, type: 2 }, { name: '广场', active: true, type: 1 }],
			dataList: [],
			serchList: [],
			historyList: [],
			// histroySearch: ['苹果的nfc怎么打开', '王者的积分战队怎么玩的流', '苹果手机被锁住了怎么办'],
			hotSearch: [],
			pageIndex: 1,
			pageSize: 10,
			pageType: 1,
			pageTotal: 1
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
		this.dataList=[]
		this.serchList=[]
		this.historyList=[]
		this.hotSearch=[]
		if (!this.showPic) {
			this.initData();
		} else {
			this.showPic = false;
		}
		// uni.navigateTo({
		// 	url: '/pages/home/commentDetail'
		// });
	},
	onShareAppMessage() {
		uni.showShareMenu();
	},
	onHide() {
		this.showOper = false;
	},
	methods: {
		initData() {
			let self = this;
			let params = {
				pageType: self.pageType,
				pageIndex: self.pageIndex,
				pageSize: self.pageSize,
				keywords: self.keywords,
				atId: null,
				topicId: null
			};
			self.$acFrame.HttpService.postList(params).then(res => {
				if (res.success) {
					let _data = res.data;
					let dataList = _data.rows;
					self.pageTotal = _data.pageTotal;
					if (dataList.length > 0) {
						dataList.filter((v, i) => {
							if(v.adInfo){
								v.adInfo.imgList.filter((val,i) => {
									if(val){
										v.adInfo.imgList[i] = self.$acFrame.Util.setImgUrl(val);
									}
								});
							}
							
							v.articleInfo.imgList.filter((val,i) => {
								if(val){
									v.articleInfo.imgList[i] = self.$acFrame.Util.setImgUrl(val);
								}
								
							});
							v.itemLinkList.filter((val,i) => {
								if(val.imgPath){
									v.itemLinkList[i].imgPath = self.$acFrame.Util.setImgUrl(val.imgPath);
								}
								
							});
							if(v.publishUser.imgPathHead){
								v.publishUser.imgPathHead = self.$acFrame.Util.setImgUrl(v.publishUser.imgPathHead);
							}
							if (v.type == 1) {
								if(v.articleInfo.contentExtendList.length>0){
									v.articleInfo.showContent = self.setContent(v.articleInfo.contentExtendList);
								}
								v.articleInfo.showMore = false;
							}
							if (v.articleInfo.content.length > 60) {
								v.articleInfo.isDetail = false;
							}
						});
						if (self.isSearch) {
							self.serchList = self.serchList.concat(dataList);
						} else {
							self.dataList = self.dataList.concat(dataList);
						}
						console.log(self.dataList)
						
						self.nodata = false;
					} else {
						
						self.nodata = true;
					}
					if(self.isSearch){
						self.nosearch = false
					}
				} else {
					if(self.isSearch){
						self.nosearch = true
					}
					self.$acFrame.Util.mytotal(res.code);
				}
			});
		},
		setContent(mydata) {
			let showContent = [];
			let type = mydata.type; //1帖子  2文章
			let content = mydata.content;
			let star = 0;
			let contentExtendList = mydata.contentExtendList;
			contentExtendList.filter((v, i) => {
				let end = v.index;
				let _list = v;
				_list.content = content.slice(star, end);
				star = end;
				showContent.push(_list);
			});
			return showContent;
		},
		searchClick() {
			this.isSearch = true;
			//this.dataList = []
			this.historyList = uni.getStorageSync('historyList') || [];
			this.hotSearch = this.$acFrame.Util.getHotList(1);
		},
		hideTab() {
			this.showOper = false;
		},
		linkTo(name) {
			uni.navigateTo({
				url: name,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		
		changeVal(e) {
			this.keywords = e.detail.value;
		},
		cancelSearch() {
			this.isSearch = false;
			this.searchVal = false;
			this.keywords = '';
		},
		searchData(e) {
			let val = this.keywords;
			this.pageIndex = 1;
			this.pageSize = 10;
			this.pageType = null;
			let historyList = uni.getStorageSync('historyList') || [];
			if (historyList.length < 10) {
				historyList.shift(val);
			} else {
				historyList.splice(9, 1);
				historyList.shift(val);
			}
			uni.setStorageSync('historyList', historyList);
			this.initData();
		},
		tapSearch(val) {
			this.resetData();
			this.pageType = null;
			this.keywords = val;
			this.initData();
		},
		//清空历史
		clearHistory() {
			uni.setStorageSync('historyList', []);
		},
		ralease() {
			this.showOper = !this.showOper;
		},
		tabClick(ind, type) {
			this.tabList.forEach((v, i) => {
				if (i == ind) {
					v.active = true;
				} else {
					v.active = false;
				}
			});
			this.pageType = type;
			this.resetData();
			this.initData();
		},
		loadMoreData(){
			let pageIndex = this.pageIndex
			pageIndex++
			if(pageIndex<=this.pageTotal){
				this.pageIndex = pageIndex
				this.initData()
				this.nomore = false
			}else{
				this.nomore = true
			}
		},
		resetData(){
			this.pageIndex = 1;
			this.pageSize = 10;
			this.dataList=[];
			this.nodate=false;
			this.nomore = false
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
			line-height: 60rpx;
			text-align: center;
			color: #999;
			&::before{
				line-height: 60rpx;
				vertical-align: top;
			}
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
				padding: 0 20rpx;
				box-sizing: border-box;
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
