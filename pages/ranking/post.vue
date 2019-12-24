<template>
	<view class="content">
		<view class="banner">
			<image :src="banner" mode="widthFix"></image>
		</view>
		<commentItem :nodata="nodata" :nomore="nomore" :pageType="pageType" :dataList="dataList" @dianzan="dianzan" :showNum="showNum"
		 @followPost="followPost"  @hideMore="hideMore" @showAll="showAll"></commentItem>
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
				pageIndex:1,
				pageSize:10,
				pageTotal:1,
				nomore:false,
				nodata:false,
				dataList:[],
				pageType:'',
				showNum:true,
				isRanking:true,
				banner:getApp().globalData.config.businessPath+'static/ss/mp/images/top_article.png'
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
			if(getApp().globalData.isShowPic){
				getApp().globalData.isShowPic = false
			}else{
				this.initData();
			}
			
		},
		onReachBottom(){
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.initData()
			} else {
				this.nomore = true
				return false;
			}
		},
		onPullDownRefresh(){
			this.resetData()
			this.initData()
			uni.stopPullDownRefresh();
		},
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
		methods:{
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
			initData() {
				let self = this;
				let params = {
					pageSize:this.pageSize,
					pageIndex:this.pageIndex
				}
				self.$acFrame.HttpService.articleRank(params).then(res => {
					if (res.success) {
						let dataList = res.data.rows;
						self.pageTotal = res.data.pageTotal
						self.pageSize = res.data.pageSize
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
										v.articleInfo.showContent = self.setContent(v.articleInfo);
									} else {
										v.articleInfo.showContent = []
									}
			
									v.articleInfo.showMore = false;
								}
								if (v.articleInfo.content.length > 80) {
									v.articleInfo.isDetail = false;
								} else {
									v.articleInfo.isDetail = true;
								}
							});
							self.dataList = self.dataList.concat(dataList);
							self.nodata = false;
						} else {
			
							self.nodata = true;
						}
					} else {
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
						if(contentExtendList.length>0){
							var ext = contentExtendList.shift();
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
			showAll(ind) {
				this.dataList[ind].articleInfo.showMore = true;
			},
			hideMore(ind) {
				this.dataList[ind].articleInfo.showMore = false;
			},
			resetData(){
				this.pageSize = 10
				this.pageIndex = 1
				this.nodata = false
				this.nomore = false
				this.dataList=[]
			}
		}
	}
</script>

<style lang="less">
	.content{
		border:0;
	}
</style>
