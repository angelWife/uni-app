<template>
	<view class="content">
		<view class="banner">
			<image src="../../static/images/b1.png" mode="widthFix"></image>
		</view>
		<commentItem :nodata="nodata" :nomore="nomore" :pageType="pageType" :dataList="dataList" @dianzan="dianzan" :showNum="showNum"
		 @followPost="followPost"></commentItem>
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
				nodata:false,
				dataList:'',
				pageType:'',
				nomore:false,
				showNum:true
			};
		},
		onShow(){
			uni.setNavigationBarColor({
				backgroundColor: "#286AEF",
				frontColor: '#ffffff',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
			this.initData();
		},
		onShareAppMessage(res) {
			let settings = {}
			let index = res.target.dataset.index
			let item = this.dataList[index];
			if (item.articleInfo.type == 1) {
				// settings.type='article'
				settings.title = item.articleInfo.title
				settings.imageUrl = item.articleInfo.imgList[0]
				settings.pagePath =
					`/pages/home/commentDetail?data=${encodeURIComponent(JSON.stringify(item))}&pageType=${this.pageType}`
			} else {
				// settings.type='article'
				settings.title = item.articleInfo.content.substr(0, 24)
				settings.imageUrl = '/static/images/icon-loading.png'
				settings.pagePath =
					`/pages/home/commentDetail?data=${encodeURIComponent(JSON.stringify(item))}&pageType=${this.pageType}`
			}
			getApp().globalData.isShowPic = true
			return settings
		
			//this.$acFrame.Util.shareUrl(res,settings);
		},
		methods:{
			initData() {
				let self = this;
				console.error(self.keywords)
				self.$acFrame.HttpService.articleRank().then(res => {
					if (res.success) {
						let _data = res.data;
						let dataList = _data;
						if (dataList.length > 0) {
							dataList.filter((v, i) => {
								if (v.adInfo) {
									v.adInfo.imgList.filter((val, i) => {
										if (val) {
											v.adInfo.imgList[i] = self.$acFrame.Util.setImgUrl(val);
										}
									});
								}
								if (v.publishUser) {
									v.publishUser.militaryRankType = self.$acFrame.Util.setRankName(v.publishUser.militaryRankType)
								}
			
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
								if (v.publishUser.imgPathHead) {
									v.publishUser.imgPathHead = self.$acFrame.Util.setImgUrl(v.publishUser.imgPathHead);
								} else {
									v.publishUser.imgPathHead = '/static/images/head1.png'
								}
								if (v.type == 1) {
									if (v.articleInfo.contentExtendList && v.articleInfo.contentExtendList.length > 0) {
										v.articleInfo.showContent = self.setContent(v.articleInfo.contentExtendList);
									} else {
										v.articleInfo.showContent = []
									}
			
									v.articleInfo.showMore = false;
								}
								if (v.articleInfo.content.length > 60) {
									v.articleInfo.isDetail = false;
								} else {
									v.articleInfo.isDetail = true;
								}
							});
							self.dataList = dataList
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
		}
	}
</script>

<style lang="less">
	.content{
		border:0;
	}
</style>
