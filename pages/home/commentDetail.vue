<template>
	<view class="content" id="myContent">
		<view class="detail listItem">
			<block v-if="dataInfo.type == 1">
				<view class="item-head flex item-center">
					<view class="img item-center comHeadPic" @tap="userInfo(dataInfo.publishUser.userCode)">
						<image class="headPic" :src="dataInfo.publishUser.imgPathHead" mode="aspectFit"></image>
						<image class="grade" v-if="dataInfo.publishUser.nobilityType>1" :src="'/static/images/juewei/'+(dataInfo.publishUser.nobilityType-1)+'.png'"
						 mode="widthFix"></image>
					</view>
					<view class="flex-1 head-msg">
						<view class="flex item-center clearfix">
							<view class="name fs15" @tap="userInfo(dataInfo.publishUser.userCode)">{{ dataInfo.publishUser.userName }}</view>
							<!-- <block v-if="dataInfo.publishUser.militaryRankType">
								<image :src="'/static/images/junxian/'+dataInfo.publishUser.militaryRankType+'.png'" mode="widthFix"></image>
							</block> -->
							<block v-if="dataInfo.publishUser.shopId">
								<image src="/static/images/shop/dian.png" mode="widthFix" @tap="shopDetail(dataInfo.publishUser.shopId)"></image>
							</block>
						</view>
						<view class="timer c999 fs12 clearfix">
							<text>{{ dataInfo.articleInfo.timeInfo }}</text>
							<!-- <text class="mark">受赏</text>
								<text class="mark">置顶</text> -->
						</view>
					</view>
					<view class="followBox" v-if="!dataInfo.isOwner" @tap="guanzhu(dataInfo.publishUser.userCode)">
						<text class="follow" v-if="dataInfo.publishUser.hasFollow">已关注</text>
						<text class="follow active" v-else>关注</text>
					</view>
				</view>
				<block v-if="dataInfo.articleInfo.type == 2">
					<view class="articalBox">
						<view class="msg lh42 fs30" @tap="linkDetail(item)">
							<block v-if="dataInfo.articleInfo.showContent.length>0">
								<block v-for="(conitem, comind) in dataInfo.articleInfo.showContent" :key="comind">
									<block v-if="conitem.type == 'text' ">
										<text class="text">{{ conitem.content }}</text>
									</block>
									<block v-else-if="conitem.type == 'post' ">
										<!-- @tap.stop="linkUser(conitem.id)" -->
										<text class="name blue">@{{ conitem.name }}</text>
									</block>
									<block v-else-if="conitem.type == 'article' ">
										<text class="name blue" @tap.stop="linkTheme(conitem.id)">#{{ conitem.name }}#</text>
									</block>
									<block v-else>
										<text class="text">{{conitem.content}}</text>
									</block>
								</block>
							</block>
							<block v-else>
								<text class="text">{{dataInfo.articleInfo.content}}</text>
							</block>
							<!-- <view class="blue lookPic">
								<icon class="iconfont icon-tupian"></icon>
								查看图片
							</view> -->
						</view>
					</view>
					<view class="imgList clearfix">
						<view v-for="(imgItem, imgInd) in dataInfo.articleInfo.imgList" :key="imgInd" @tap="showBigImg(imgInd)" class="imgItem flex-1">
							<image :src="imgItem" mode="widthFix"></image>
						</view>
					</view>
				</block>
				<block v-else>
					<!-- <view class="articalBox news flex item-center" v-if="dataInfo.articleInfo.imgList.length > 0">
						 <view class="a_pic">
							<image :src="dataInfo.articleInfo.imgList[0]" mode="widthFix"></image>
						</view> 
						<view class="a_main flex-1 lh42 fs30">
							<view class="title blod clamp clamp-2">{{ dataInfo.articleInfo.title }}</view>
							<view class="msg fs12">
								<rich-text :nodes="dataInfo.articleInfo.content"></rich-text>
							</view>
						</view>
					</view> -->
					<view class="articalBox flex item-center">
						<view class="a_main flex-1 lh42 fs30">
							<view class="title blod clamp clamp-2">{{ dataInfo.articleInfo.title }}</view>
							<view class="msg fs12">
								<rich-text :nodes="dataInfo.articleInfo.content"></rich-text>
							</view>
						</view>
					</view>
				</block>
				<block v-for="(linkitem, linkInd) in dataInfo.itemLinkList" :key="linkInd">
					<view v-if="linkitem.type == 1" class="adventBox shopProduct flex item-center" @tap="linkProd(linkitem.goodsId)">
						<view class="p_pic">
							<image :src="linkitem.goods.imgPath"></image>
						</view>
						<view class="p_main flex-1">
							<view class="name">
								<text class="textEllipsis">{{ linkitem.goodsName }}</text>
							</view>
							<view class="price red fs12">{{ linkitem.priceSale }}元</view>
						</view>
						<view class="p_buy"><button size="mini" type="red" class="">购买</button></view>
					</view>
					<view v-else class="adventBox ranking flex item-center" @tap="linkRanking(linkitem.rankType)">
						<view class="p_pic icon">

							<image :src="'/static/images/ranking/'+linkitem.rankType+'.png'" mode="widthFix"></image>
						</view>
						<view class="p_main flex-1">{{linkitem.name}}</view>
						<view class="p_buy"><button size="mini" type="red" class="radiuBtn">去看看</button></view>
					</view>
				</block>

				<!-- <view class="itemOperBox flex">
					<view class="flex-1">
						<icon class="iconfont icon-share"></icon>
						<text>{{ dataInfo.articleInfo.numTotalShare }}</text>
					</view>
					<view class="flex-1">
						<icon class="iconfont icon-pinglun"></icon>
						<text>{{ dataInfo.articleInfo.numTotalPersonReward }}</text>
					</view>
					<view class="flex-1">
						<icon class="iconfont icon-dianzan"></icon>
						<text>{{ dataInfo.articleInfo.numTotalUp }}</text>
					</view>
				</view> -->
				<view class="readNums text-right c999">{{dataInfo.articleInfo.numTotalRead}}阅读</view>
				<!-- <view class="shareBox flex">
					<view>分享到：</view>
					<view class="flex-1"><icon class="iconfont icon-shang"></icon></view>
				</view> -->
				<view class="operBox clearfix">
					<view class="item " @tap="reward(dataInfo.publishUser.userCode)">
						<view class="mybtn item_red flex item-center just-con-c">
							<!-- <icon class="iconfont icon-shang"></icon> -->
							<image src="/static/images/icon/icon-reward.png" mode="widthFix"></image>
							<text>打赏</text>
						</view>
					</view>
					<view class="item" @tap="report(dataInfo.articleInfo.id)">
						<view class="mybtn flex item-center just-con-c">
							<icon class="iconfont icon-jubao"></icon>
							<text>举报</text>
						</view>
					</view>
					<view class="item">
						<view class="mybtn flex item-center just-con-c" :class="{'item_red':dataInfo.articleInfo.hasUp}" @tap="dianzan">
							<icon class="iconfont icon-dianzan"></icon>
							<text>{{dataInfo.articleInfo.numTotalUp}}</text>
						</view>
					</view>
					<view class="item">
						<view class="mybtn flex item-center just-con-c">
							<icon class="iconfont iconshare2"></icon>
							<text>分享</text>
							<button type="share" class="mybtn" open-type="share"></button>
						</view>
					</view>
				</view>
			</block>
			<block v-else-if="dataInfo.type == 2">
				<!-- dataInfo.adInfo -->
				<view class="item-head flex item-center">
					<view class="img item-center">
						<image :src="dataInfo.publishUser.imgPathHead" mode="widthFix"></image>
					</view>
					<view class="flex-1 head-msg">
						<view class="clearfix">
							<text class="name fs15">{{ dataInfo.adInfo.createName }}</text>
						</view>
						<view class="timer c999 fs12">{{ dataInfo.adInfo.createTime }}</view>
					</view>

					<view class="followBox">
						<!-- follow -->
						<text class="follow">广告</text>
					</view>
				</view>
				<view class="adventPicBox">
					<view class="adventPic">
						<image src="http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg" mode="widthFix"></image>
					</view>
					<view class="text-right addventBtn"><button size="mini" type="red">立即查看</button></view>
				</view>
			</block>

		</view>
		<view class="comment">
			<view class="title">评论 {{dataInfo.articleInfo.numTotalComment}}</view>
			<view class="commentList">
				<block v-if="listData.length>0">
					<view class="item flex" v-for="(item,ind) in listData" :key="ind">
						<view class="pic comHeadPic" @tap="userInfo(item.userCode)">
							<image class="grade" v-if="item.nobilityType>1" :src="'/static/images/juewei/'+(item.nobilityType-1)+'.png'"
							 mode="widthFix"></image>
							<image class="headPic" :src="setImg(item.headPic,item.genderType)"></image>
						</view>
						<!-- <view class="img item-center comHeadPic" @tap="userInfo(item.publishUser.userId)">
							<image class="headPic" :src="item.publishUser.imgPathHead"></image>
							<image class="grade" :src="'/static/images/juewei/'+item.publishUser.nobilityType+'.png'" mode="widthFix"></image>
						</view> -->
						<view class="commentMain flex-1">
							<view class="name" @tap="userInfo(item.userCode)">
								<text class="blod">{{item.userName}}</text>
								<!-- <text class="follow">{{item.militaryRankType}}</text> -->
							</view>
							<view class="msg clamp clamp-2">{{item.content}}</view>
							<view class="oper flex item-center">
								<view class="timer c999 fs12 flex-1">{{item.timeInfo}}</view>
								<view class="operIocn flex item-center c999" @tap="commentDetail(item)">
									<icon class="iconfont icon-comment"></icon>
									<text>{{item.numTotalReply>0?item.numTotalReply:0}}</text>
								</view>
								<view class="operIocn flex item-center" :class="{'red':item.hasUp}" @tap="commentDianzan(item.id,ind)">
									<icon class="iconfont icon-dianzan"></icon>
									<text>{{item.numTotalUp }}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="noData flex f-row just-con-c item-center" style="padding:40px 0;">
						<view class="text-center">
							<image src="/static/images/nodata.png" mode="widthFix"></image>
							<view class="text-center c666 fs16">
								这里还没有内容
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="operFoot flex">
			<view class="flex-1">

				<input type="text" value="" disabled="true" placeholder="说点什么吧" @tap="showComment" />
			</view>
			<!-- @tap="commentClick" -->
			<view class="oper flex f-col" @tap="commentClick">
				<icon class="iconfont icon-comment"></icon>
				<text>评论</text>
				<text v-if="dataInfo.articleInfo.numTotalComment>0" class="mark">{{dataInfo.articleInfo.numTotalComment}}</text>
			</view>
			<view class="oper flex f-col" :class="[dataInfo.articleInfo.hasUp?'red':'']" @tap="dianzan">
				<icon class="iconfont icon-dianzan"></icon>
				<text>赞</text>
			</view>
			<button type="share" class="oper flex f-col shareBtn" open-type="share">
				<icon class="iconfont icon-share-b"></icon>
				<text>分享</text>
			</button>
		</view>
		<commentModal :showModal="showModal" @relaseComment="relaseComment" @cancelRelase="cancelRelase"></commentModal>
		<!-- <view class="noData" v-if="showFoot">
			~没有更多~
		</view> -->
		<RewardList :showReward="showReward" :accountVO="accountVO" :userCode="dataInfo.publishUser.userCode" :rewardList="rewardList"
		 @chooseReward="chooseReward" @hideModal="hideModal" @getRewardList="getRewardList"></RewardList>
		<!-- 	<view class="rewardListBox">
			 <view class="item" v-for="(item,ind) in rewardRecodList" :key="ind">
				 {{item}}
			 </view>
		 </view> -->
		<l-barrage ref="lBarrage" @end="loadRewardAnimate"></l-barrage>
	</view>
</template>

<script>
	import commentModal from '@/components/comment.vue';
	import RewardList from '@/components/reward-modal.vue';
	import LBarrage from '@/components/l-barrage/l-barrage.vue'
	export default {
		components: {
			commentModal,
			RewardList,
			LBarrage
		},
		data() {
			return {
				isDetail: true,
				dataInfo: {},
				listData: [],
				rewardList: [],
				pageIndex: 1,
				pageSize: 10,
				pageTotal: 1,
				showModal: false,
				showFoot: false,
				isComent: false, //是否滚动到底部
				showReward: false,
				accountVO: {},
				rewardRecodList: '',
				id: ''
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.detailtype = options.type
			setTimeout(() => {
				if (this.detailtype == 'showReward') {
					this.showReward = true
					this.getRewardList();
				}
			}, 500)
		},
		onShow() {
			let self = this
			if (getApp().globalData.isShowPic) {
				getApp().globalData.isShowPic = false
			} else {
				this.listData = []
				this.postDetail()


				this.getAccount()
			}
			var animation = uni.createAnimation({
				duration: 2000,
				timingFunction: 'ease',
			})

			this.animation = animation


		},
		onShareAppMessage(res) {
			let self = this
			getApp().globalData.isShowPic = true
			let settings = {}
			if (res.from === 'button') {
				let title = self.dataInfo.articleInfo.content.replace(new RegExp("{-----}", "gm"), "").substr(0, 24);
				this.shareStat(self.dataInfo.articleInfo.id);
				settings.imageUrl = ''
				if (self.dataInfo.articleInfo.type == 1) {
					settings.title = self.dataInfo.articleInfo.title
					settings.pagePath =
						`/pages/home/commentDetail?id=${self.dataInfo.articleInfo.id}&userCode=${uni.getStorageSync('userCode')}`
				} else {
					settings.title = title
					settings.pagePath =
						`/pages/home/commentDetail?id=${self.dataInfo.articleInfo.id}&userCode=${uni.getStorageSync('userCode')}`
				}
			} else {
				settings.imageUrl = '/static/images/sharePic.png'
				settings.title = ''
				settings.pagePath = ''
			}
			return settings
		},
		onReachBottom() {
			if (this.pageTotal > this.pageIndex) {
				this.pageIndex++
				this.getCommentList()
				this.showFoot = false
			} else {
				this.showFoot = true
			}
		},
		methods: {
			shareStat(id) {
				let self = this
				let params = {
					articleId: id,
				}

				self.$acFrame.HttpService.sharePost(params).then(res => {
					if (res.success) {
						self.dataInfo.articleInfo.numTotalShare++
					}
				})
			},
			getReadNum() {
				let self = this
				this.$acFrame.HttpService.readPost({
					id: this.dataInfo.articleInfo.id
				}).then(res => {
					if (res.success) {
						self.dataInfo.articleInfo.numTotalRead = res.data
					}
				})
			},
			postDetail() {
				let self = this
				let params = {
					id: this.id,
				}
				self.$acFrame.HttpService.postDetail(params).then(res => {
					if (res.success) {
						let _obj = res.data
						if (_obj.type == 1) {
							_obj.articleInfo.showContent = this.setContent(_obj.articleInfo);
						}
						_obj.articleInfo.imgList.filter((v, i) => {
							_obj.articleInfo.imgList[i] = self.setImg(v)
						})
						_obj.publishUser.imgPathHead = self.setImg(_obj.publishUser.imgPathHead, _obj.publishUser.genderType)

						self.dataInfo = _obj
						self.getCommentList()
						self.rewardRecod()
						self.getReadNum()
					}
				})
			},
			getCommentList() {
				let self = this
				let params = {
					articleId: this.dataInfo.articleInfo.id,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				self.$acFrame.HttpService.commentList(params).then(res => {
					if (res.success) {
						let _row = res.data.rows
						// _row.filter(v => {
						// 	v.militaryRankType = self.$acFrame.Util.setRankName(v.militaryRankType)
						// })
						self.listData = self.listData.concat(_row);
						self.pageTotal = res.data.pageTotal
						if (self.detailtype == "isComment") {
							self.isComent = false
							setTimeout(() => {
								self.commentClick()
							}, 300)
						}
					}
				})
			},
			commentClick() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#myContent').boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: 230,
						duration: 300
					})
				}).exec();
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
				while ((i = content.indexOf('{-----}')) >= 0 && k > 0) {
					k--;
					if (i > 0) {
						texts.push(content.slice(0, i));
						content = content.slice(i);
					} else {
						content = content.replace("{-----}", "");
						texts.push("");
					}
				}
				texts.forEach(function(item) {
					var obj = {};
					if (item != '') {
						obj["type"] = "text";
						obj["content"] = item;
						showContent.push(obj);
					} else {
						if (contentExtendList.length > 0) {
							var ext = contentExtendList.shift();
							//console.log(ext);
							if (ext.type == 1) {
								obj["type"] = "post";
								obj["id"] = ext.atUserCode;
								obj["name"] = ext.atName;
							} else if (ext.type == 2) {
								obj["type"] = "article";
								obj["id"] = ext.topicId;
								obj["name"] = ext.topicName;
							}
							showContent.push(obj);
						}
					}
				});
				return showContent;
			},
			linkUser(id) {
				uni.navigateTo({
					url: `/pages/mycenter/mycenter?userCode=${id}`
				})
			},
			linkTheme(id) {
				this.$acFrame.HttpService.readTopic({
					id: id
				}).then(res => {
					if (res.success) {}
				})
				uni.navigateTo({
					url: `/pages/home/topicIndex?id=${id}`
				})
			},
			reward(code) {
				// uni.navigateTo({
				// 	url: '/pages/home/reward?id=' + id
				// })
				this.showReward = true
				this.getRewardList();
			},
			hideModal() {
				this.showReward = false
				this.rewardList = []
			},
			report(id) {
				uni.navigateTo({
					url: '/pages/home/report?id=' + id
				})
			},
			guanzhu(code) {
				let self = this
				this.$acFrame.HttpService.followPost({
					userCode: code
				}).then(res => {
					if (res.success) {
						self.dataInfo.publishUser.hasFollow = res.data
					}
				})
			},
			commentDetail(obj) {
				obj = JSON.stringify(obj)
				uni.navigateTo({
					url: `/pages/home/commentList?obj=${obj}`
				})
			},
			showComment() {
				this.showModal = true
			},
			relaseComment(val) {
				let self = this
				let params = {
					articleId: this.dataInfo.articleInfo.id,
					content: val
				}
				self.$acFrame.HttpService.relasePublish(params).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('评论成功！');
						self.showModal = false
						self.listData = []
						self.getCommentList()
					}
				})
			},
			cancelRelase() {
				this.showModal = false
			},
			dianzan() { //likeComment
				let self = this
				let params = {
					articleId: this.dataInfo.articleInfo.id,
				}
				self.$acFrame.HttpService.likeComment(params).then(res => {
					if (res.success) {
						if (res.data) {
							self.$acFrame.Util.mytotal('点赞成功！');
							self.dataInfo.articleInfo.numTotalUp++
						} else {
							self.dataInfo.articleInfo.numTotalUp--
							self.$acFrame.Util.mytotal('已取消！');
						}
						self.dataInfo.articleInfo.hasUp = res.data
					}
				})
			},
			userInfo(userCode) {
				uni.navigateTo({
					url: `/pages/mycenter/mycenter?userCode=${userCode}`
				})
			},
			commentDianzan(id, ind) {
				let self = this
				let params = {
					articleCommentId: id,
				}
				self.$acFrame.HttpService.commentPublish(params).then(res => {
					if (res.success) {
						if (res.data) {
							self.$acFrame.Util.mytotal('点赞成功！');
							self.listData[ind].numTotalUp++
						} else {
							self.listData[ind].numTotalUp--
							self.$acFrame.Util.mytotal('已取消！');
						}
						self.listData[ind].hasUp = res.data
					}
				})
			},
			setImg(src, sex) {
				return this.$acFrame.Util.setImgUrl(src, sex);
			},
			linkProd(id) {
				uni.navigateTo({
					url: `/pages/myshop/productDetail?goodsId=${id}`
				})
			},
			shopDetail(id) {
				uni.navigateTo({
					url: "/pages/myshop/shopDetail?id=" + id
				})
			},
			linkRanking(type) {
				let url = ''
				debugger
				switch (type) {
					case 1:
						url = `/pages/ranking/friends?type=${type}`
						break;
					case 2:
						url = `/pages/ranking/post?type=${type}`
						break;
					case 3:
						url = `/pages/ranking/invitation?type=${type}`
						break;
					case 4:
						url = `/pages/ranking/product?type=${type}`
						break;
					case 5:
						url = '/pages/ranking/product'
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			getRewardList(useType = 5) { // virtualList
				let self = this
				let params = {
					pageIndex: 1,
					pageSize: 100,
					// useType: useType,
					sceneType: 2
				}
				this.$acFrame.HttpService.virtualDashang(params).then(res => {
					if (res.success) {
						let list = res.data
						list.filter(v => {
							v.imgPath = self.$acFrame.Util.setImgUrl(v.imgPath);
							v.choose = false
						})
						self.rewardList = list

					}
				})
			},
			rewardUser(id, type) {
				let self = this
				let params = {
					buyNum: 1,
					userCode: 100,
					virtualId: id,
					sceneType: type
				}
				this.$acFrame.HttpService.virtualBuy(params).then(res => {
					if (res.success) {

					}
				})
			},
			chooseReward(ind) {
				// let list = this.rewardList
				this.rewardList.filter((v, i) => {
					if (i == ind) {
						v.choose = true
					} else {
						v.choose = false
					}
				})
				// this.rewardList = list
			},
			rewardRecod() {
				let self = this
				let params = {
					filterConfig:true,
					userCode: this.dataInfo.publishUser.userCode
				}
				this.$acFrame.HttpService.rewardRecod(params).then(res => {
					if (res.success) {
						let list = res.data
						if (list.length > 0) {
							// for(let i = 0;i<10;i++){
							// 	list.push('')
							// }
							self.rewardRecodList = list
							self.loadRewardAnimate(list)
						}
					}
				})
			},
			loadRewardAnimate() {
				this.$refs.lBarrage.start(this.rewardRecodList);
			},
			getAccount() {
				let self = this
				let params = {
					type: 2
				}
				this.$acFrame.HttpService.accountNums(params).then(res => {
					if (res.success) {
						self.accountVO = res.data
					}
				})
			},
			showBigImg(imgInd) {
				let imgList = this.dataInfo.articleInfo.imgList;
				this.$acFrame.Util.showBigPic(imgList[imgInd], imgList);
				getApp().globalData.isShowPic = true
			},
		},
		onHide() {
			this.$refs.lBarrage.over();
		},
		onUnload() {
			this.$refs.lBarrage.over();
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
		padding-bottom: 120rpx;
		position: relative;

		.noData {
			position: absolute;
			height: auto;
			width: 100%;
			line-height: 40rpx;
			bottom: 110rpx;
			left: 0;
			text-align: center;
		}
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

				image {
					width: 100%;
				}
			}

			.head-msg {
				line-height: 50rpx;

				image {
					margin-right: 20rpx;
					width: 60rpx;
				}


				.name {
					margin-right: 20rpx;
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
			margin: 20rpx auto 0;

			.msg {
				text-align: justify;
				word-break: break-all;
				overflow: hidden;

				text {
					display: inline;
				}

				.name {
					margin-right: 10rpx;
				}

				.from {
					margin-left: 10rpx;
				}

				p {
					margin: 5px 0;
					overflow: hidden;

					img {
						width: 100% !important;
					}
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
			padding: 20rpx 0 0;

			.imgItem {
				float: left;
				width: 33.3333%;
				padding: 0 15rpx;
				height: calc((100vw - 24rpx) / 3 - 20rpx);
				overflow: hidden;
				margin-bottom: 20rpx;
			}
		}

		.adventBox {
			background: #FEF6F6;
			margin-top: 20rpx;
			height: 128rpx;
			padding: 16rpx 20rpx 16rpx 16rpx;

			.p_main {
				width: 150px;
				padding: 0 20rpx;

				text {
					display: block;
				}
			}

			.p_pic {
				width: 96rpx;
				height: 96rpx;

				image {
					height: 96rpx;
				}

				&.icon {
					width: 40rpx;
					margin: 0 20rpx;
					height: 40rpx;
					overflow: hidden;
					position: relative;

					image {
						position: absolute;
						top: 0;
						left: 0;

						&.pic1 {
							top: -54rpx;
						}

						&.pic2 {
							top: -118rpx;
						}

						&.pic3 {
							top: -182rpx;
						}

						&.pic4 {
							top: -240rpx;
						}
					}

				}
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

		.readNums {
			margin-top: 20rpx;
		}

		.operBox {
			padding: 20rpx 0 0;
			text-align: center;
			overflow: hidden;
			margin: 0 -10rpx;

			.item {
				float: left;
				width: 25%;
				padding: 0 10rpx;
				overflow: hidden;

				.mybtn {
					// padding: 0 0 10rpx;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 50rpx;
					color: #999;
					position: relative;
					overflow: hidden;
					background: #fff;
					border: 1px solid #9f9f9f;

					image {
						width: 40rpx;
						display: inline-block;
						margin-right: 10rpx;
					}

					&.item_red {
						height: 70rpx;
						background: #b40000;
						border-color: #b40000;
						padding: 0;
						color: #fff;
					}

					button {
						position: absolute;
						width: 100%;
						height: 100%;
						opacity: 0;
						z-index: 1;
					}
				}



				.iconfont {
					height: 70rpx;
					width: 40rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 40rpx;
					margin-right: 10rpx;

					&::before {
						line-height: 100%;
					}
				}


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

		.commentList {
			.noData {
				position: relative !important;
			}

			.commentMain {
				width: 60%;
			}
		}

		.item {
			padding: 20rpx;
			border-top: 1px solid #e9e9e9;

			.pic {
				width: 80rpx;
				height: 80rpx;
				margin: 0 30rpx 0 20rpx;

				.headPic {
					height: 100%;
					border-radius: 80rpx;
				}
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
				text-align: justify;
			}

			.oper {
				text {
					margin-left: 10rpx;
				}

				.timer {}
			}

			.operIocn {
				margin-left: 20rpx;
				color: #999;
				.iconfont {
					position: relative;
					top: -5rpx;
				}
			}

			.hasUp {
				.iconfont {
					color: #B40000;
				}

			}

		}
	}

	.operFoot {
		position: fixed;
		z-index: 10;
		width: 100%;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		background: #fff;

		input {
			display: block;
			margin: 15rpx 20rpx;
			height: 70rpx;
			line-height: 70rpx;
			padding: 0 20rpx;
			background: #eeeeee;
			border-radius: 70rpx;
		}

		.oper {
			width: 80rpx;
			height: 100rpx;
			text-align: center;
			color: #999;
			position: relative;

			text {
				font-size: 24rpx;
			}

			&.shareBtn {
				line-height: 1.3;
				padding: 0;
			}

			&.red {
				color: #d40000;

				.iconfont {
					color: #d40000;
				}
			}

			.mark {
				position: absolute;
				background: #B40000;
				font-size: 20rpx;
				width: 30rpx;
				height: 30rpx;
				border-radius: 30rpx;
				line-height: 30rpx;
				text-align: center;
				color: #fff;
				top: 10rpx;
				right: 0rpx;
			}
		}
	}

	.rewardListBox {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 20;
	}
</style>
