<template>
	<view class="content" @tap="hideTab">
		<view class="searchBox flex">
			<view class="flex-1 input">
				<icon @tap="searchData" class="iconfont icon-search"></icon>
				<input v-if="isSearch" type="text" @input="changeVal" confirm-type="search" :value="keywords" @confirm="searchData" />
				<input v-else type="text" value="" @tap="searchClick" readyonly />
				<icon v-if="isSearch&&keywords" class="iconfont icon-clear" @tap="clearSearchVal"></icon>
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
		<view class="nav-tabs flex" v-if="!isSearch">
			<block v-for="(item, index) in tabList" :key="index">
				<view class="flex-1 tabitem c999" :class="{ active: item.active }" @tap="tabClick(index, item.type)">
					<text>{{ item.name }}</text>
				</view>
			</block>
		</view>
		<view class="resBox" v-if="isSearch">
			<view class="fastSearch" v-if="!hasSearch">
				<view class="histroy" v-if="historyList.length > 0">
					<view class="title">
						<text>历史记录</text>
						<icon class="iconfont icon-delete" @tap="clearHistory"></icon>
					</view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in historyList" :key="index">
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
			<view class="searchList">
				<view class="myscroll">
					<commentItem :nodata="nodata" :nomore="searchnomore" :dataList="serchList" @dianzan="dianzan" @followPost="followPost"
					 @hideMore="hideMore" @showAll="showAll()"></commentItem>
				</view>
			</view>
		</view>
		<view class="listBox" v-else>
			<view class="list-content">
				<view class="myscroll">
					<commentItem :nodata="nodata" :nomore="nomore" :pageType="pageType" :dataList="dataList" @dianzan="dianzan"
					 @followPost="followPost" @hideMore="hideMore" @showAll="showAll()"></commentItem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commentItem from '@/components/comment-item.vue';
	export default {
		components: {
			commentItem,
		},
		data() {
			return {
				isSearch: false,
				hasSearch:false,//是否搜索过
				showOper: false, // 发布的操作
				showPic: false, // 打开图片无需重新加载数据
				nosearch: true,
				nodata: false,
				nomore: false,
				keywords: '',
				tabList: [{
					name: '关注',
					active: false,
					type: 2
				}, {
					name: '广场',
					active: true,
					type: 1
				}],
				dataList: [],
				serchList: [],
				historyList: [],
				// histroySearch: ['苹果的nfc怎么打开', '王者的积分战队怎么玩的流', '苹果手机被锁住了怎么办'],
				hotSearch: [],
				pageIndex: 1,
				pageSize: 10,
				pageType: 1,
				pageTotal: 1,
				checkShop: 1,
			};
		},
		onLoad(options) {
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
			if (options.userCode) {
				getApp().globalData.userCode = options.userCode
			}
			this.dataList = []
			this.serchList = []
			this.historyList = []
			this.hotSearch = []
		},
		onShow() {

			if (!getApp().globalData.isShowPic) {
				this.resetData();
				this.initData();
			} else {
				getApp().globalData.isShowPic = false;
			}
			// uni.navigateTo({
			// 	url: '/pages/home/commentDetail'
			// });
		},

		onHide() {
			this.cancelSearch()
		},
		onUnload() {
			this.cancelSearch()
		},
		onPullDownRefresh() {
			this.cancelSearch()
			wx.stopPullDownRefresh()
		},
		onReachBottom: function() {
			this.loadMoreData()
		},
        //loadMoreData
		onShareAppMessage(res) {
			getApp().globalData.isShowPic = true
			let settings = {}
			if (res.from === 'button') {
				let index = res.target.dataset.index
				let item = this.dataList[index];
				let title = item.articleInfo.content.replace(new RegExp("{-----}", "gm"), "").substr(0, 24);
				this.shareStat(index);
				settings.imageUrl = ''
				if (item.articleInfo.type == 1) {
					settings.title = item.articleInfo.title
					settings.pagePath = `/pages/home/commentDetail?data=${encodeURIComponent(JSON.stringify(item))}&pageType=${this.pageType}&userCode=${uni.getStorageSync('userCode')}`
				} else {
					settings.title = title
					settings.pagePath = `/pages/home/commentDetail?data=${encodeURIComponent(JSON.stringify(item))}&pageType=${this.pageType}&userCode=${uni.getStorageSync('userCode')}`
				}
			} else {
				settings.imageUrl = '/static/images/sharePic.png'
				settings.title = ''
				settings.pagePath=''
			}
			return settings
		},
		onHide() {
			this.showOper = false;
		},
		onUnload() {
			console.log('loag')
		},
		onHide() {
			this.cancelSearch()
		},
		methods: {
			initData() {
				let self = this;
				console.error(self.keywords)
				let params = {
					checkShop: self.checkShop,
					pageType: self.pageType,
					pageIndex: self.pageIndex,
					pageSize: self.pageSize,
					keywords: self.keywords,
					userCode: null
				};
				self.$acFrame.HttpService.postList(params).then(res => {
					//console.log(res);
					if (res.success) {
						let _data = res.data;
						let dataList = _data.rows;
						self.pageTotal = _data.pageTotal;
						if (dataList.length > 0) {
							dataList.filter((v, i) => {
								if (v.adInfo) {
									v.adInfo.imgList.filter((val, i) => {
										if (val) {
											v.adInfo.imgList[i] = self.$acFrame.Util.setImgUrl(val);
										}
									});
								}
								// if (v.publishUser) {
								// 	v.publishUser.militaryRankType = self.$acFrame.Util.setRankName(v.publishUser.militaryRankType)
								// }

								v.articleInfo.imgList && v.articleInfo.imgList.filter((val, i) => {
									if (val) {
										v.articleInfo.imgList[i] = self.$acFrame.Util.setImgUrl(val);
									}

								});
								v.itemLinkList && v.itemLinkList.filter((val, i) => {
									if (val.type == 2) {
										switch (val.rankType) {
											case 1:
												val.name = `邀请好友`
												break;
											case 2:
												val.name = '热帖排行'
												break;
											case 3:
												val.name = `话题排行`
												break;
											case 4:
												val.name = `热卖排行`
												break;
											default:
												break;
										}
										return false
									} else {
										if (val.goods.imgPath) {
											v.itemLinkList[i].goods.imgPath = self.$acFrame.Util.setImgUrl(val.goods.imgPath);
										}
									}
								});
								if (v.publishUser) {
									v.publishUser.imgPathHead = self.$acFrame.Util.setImgUrl(v.publishUser.imgPathHead,v.publishUser.genderType);
								}
								if (v.type == 1) {
									if (v.articleInfo.contentExtendList && v.articleInfo.contentExtendList.length > 0) {
										v.articleInfo.showContent = self.setContent(v.articleInfo);
									} else {
										v.articleInfo.showContent = []
									}
									//console.log(v.articleInfo);
									v.articleInfo.showMore = false;
								}
								if (v.articleInfo.content.length > 75) {
									v.articleInfo.isDetail = false;
								} else {
									v.articleInfo.isDetail = true;
								}
							});
							if (self.isSearch) {
								self.serchList = self.serchList.concat(dataList);
							} else {
								self.dataList = self.dataList.concat(dataList);
								//console.log(dataList)
							}
							//console.log(self.dataList)

							self.nodata = false;
						} else {

							self.nodata = true;
						}
						if (self.isSearch) {
							self.nosearch = false
						}
					} else {
						if (self.isSearch) {
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
				let temp = [].concat(contentExtendList);
				var texts = [];
				var i = 0;
				var k = 100;
				while((i=content.indexOf('{-----}')) >= 0 && k>0){
						    k--;
							if(i>0){
								texts.push(content.slice(0,i));
								content = content.slice(i);
							}else{
								content = content.replace("{-----}","");
								texts.push("");
							}
				}
				
				texts.forEach(function(item){
					var obj = {};
					if(item!=''){
						obj["type"]="text";
						obj["content"]=item;
						showContent.push(obj);
					}else{
						if(temp.length>0){
							var ext = temp.shift();
							//console.log(ext);
							if(ext.type==1){
								obj["type"]="post";
								obj["id"]=ext.atUserCode;
								obj["name"]=ext.atName;
							}else if(ext.type==2){
								obj["type"]="article";
								obj["id"]=ext.topicId;
								obj["name"]=ext.topicName;
							}
							showContent.push(obj);
						}
					}
				});
				return showContent;
			},
			searchClick() {
				let self = this
				this.isSearch = true;
				this.resetData()
				this.historyList = uni.getStorageSync('historyList') || [];
				
				this.$acFrame.Util.getHotList(1).then(res=>{
					if(res.success){
						self.hotSearch = res.data
					}
				})
			},
			clearSearchVal() {
				this.keywords = '';
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
				this.showOper=false
			},
			shareStat(ind) {
				let self = this
				let listInfo = self.dataList[ind]
				let params = {
					articleId: listInfo.articleInfo.id,
				}

				self.$acFrame.HttpService.sharePost(params).then(res => {
					if (res.success) {
						listInfo.articleInfo.numTotalShare++
						self.dataList[ind] = listInfo
					}
				})
			},
			changeVal(e) {
				this.keywords = e.detail.value;
			},
			cancelSearch() {
				this.isSearch = false;
				this.searchVal = false;
				this.keywords = '';
				this.hasSearch=false;
				this.tabList[0].active = false
				this.tabList[1].active = true
				this.pageType = 1;
				this.resetData();
				this.initData();
			},
			searchData(e) {
				let val = this.keywords;
				this.resetData();
				this.checkShop = 2;
				this.pageType = 1;
				let historyList = uni.getStorageSync('historyList') || [];
				if (val) {
					let goon = true
					historyList.filter(v => {
						if (v == val) {
							goon = false
						}
					})
					debugger
					if (goon) {
						if (historyList.length < 10) {
							if (historyList.length > 0) {
								historyList.unshift(val);
							} else {
								historyList.push(val);
							}

						} else {
							historyList.splice(9, 1);
							historyList.unshift(val);
						}
					}

				}

				uni.setStorageSync('historyList', historyList);
				this.historyList = historyList
				this.hasSearch=true
				this.initData();
			},
			tapSearch(val,type) {
				if(type&&type=='history'){
					let historyList = uni.getStorageSync('historyList');
					historyList.filter((v,i) => {
						if (v == val) {
							historyList.splice(i, 1);
							historyList.unshift(val)
						}
					})
					this.historyList = historyList
					uni.setStorageSync('historyList', historyList);
				}
				this.resetData();
				this.hasSearch=true
				this.pageType = 1;
				this.keywords = val;
				this.checkShop = 2
				this.initData();
			},
			//清空历史
			clearHistory() {
				uni.setStorageSync('historyList', []);
				this.historyList = []
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
			loadMoreData() {
				let pageIndex = this.pageIndex
				pageIndex++
				if (pageIndex <= this.pageTotal) {
					this.pageIndex = pageIndex
					this.initData()
					this.nomore = false
				} else {
					this.nomore = true
				}
			},
			resetData() {
				this.pageIndex = 1;
				this.pageSize = 10;
				this.dataList = [];
				this.serchList = []
				this.checkShop = 1
				this.nodate = false;
				this.nomore = false
			},
			dianzan(id, ind) { //likeComment
				let self = this
				let params = {
					articleId: id,
				}
				let listInfo = self.dataList[ind]
				self.$acFrame.HttpService.likeComment(params).then(res => {
					if (res.success) {
						if (res.data) {
							self.$acFrame.Util.mytotal('点赞成功！');
							listInfo.articleInfo.numTotalUp++
						} else {
							listInfo.articleInfo.numTotalUp--
							self.$acFrame.Util.mytotal('已取消！');
						}
						listInfo.articleInfo.hasUp = res.data
						self.dataList[ind] = listInfo
					}
				})
			},
			followPost(code, ind) { //likeComment
				let self = this
				let params = {
					userCode: code,
				}
				let listInfo = self.dataList[ind]
				self.$acFrame.HttpService.followPost(params).then(res => {
					if (res.success) {
						if (res.data) {
							self.$acFrame.Util.mytotal('关注成功！');
						} else {
							self.$acFrame.Util.mytotal('关注已取消！');
						}
						listInfo.publishUser.hasFollow = res.data
						self.dataList[ind] = listInfo
					}
				})
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			},
			showAll(ind) {
				if (this.isSearch) {
					this.serchList[ind].articleInfo.showMore = true;
				} else {
					this.dataList[ind].articleInfo.showMore = true;
				}

			},
			hideMore(ind) {
				if (this.isSearch) {
					this.serchList[ind].articleInfo.showMore = false;
				} else {
					this.dataList[ind].articleInfo.showMore = false;
				}
			},
		}
	};
</script>

<style lang="less">
	// page {
	// 	height: 100%;
	// }

	.content {
		// height: 100%;
		position: relative;
		overflow: hidden;
	}

	.searchBox {
		position: fixed;
		z-index: 11;
		width: 100%;
		top:0;
		left:0;
		padding: 20rpx 24rpx;
		background: #fff;

		.input {
			position: relative;
			height: 80rpx;
			line-height: 80rpx;
			margin-right: 24rpx;
			background: #eee;
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
				line-height: 80rpx;
				text-align: center;
				color: #999;

				&::before {
					line-height: 80rpx;
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
				z-index: 10;
				width: 180%;
				top: 90rpx;
				right: 0;
				border-radius: 0.3em;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
				background: #2c2c2c;

				.item {
					height: 80rpx;
					line-height: 80rpx;
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
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.nav-tabs {
		background: #fff;
		text-align: center;
		font-size: 34rpx;
         position:fixed;
		 z-index: 10;
		 top:120rpx;
		 left:0;
		 width: 100%;
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
				font-weight: 600;

				text {
					border-color: #b40000;
				}
			}
		}
	}

	.listBox {
		padding-top:200rpx;
		.list-content {
			height: calc(100% - 50rpx);

			.myscroll {
				min-height: calc(100vh - 240rpx);
				padding-bottom: 20rpx;
				box-sizing: border-box;
			}
		}
	}

	.resBox {
		padding-top:120rpx;
        min-height:100vh;
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
