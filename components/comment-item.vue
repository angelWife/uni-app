<template>
	<view class="">
		<view v-for="(item, index) in dataList" :key="index" class="listItem">
			<block v-if="item.type == 1">
				<view class="item-head flex item-center">
					<view class="img item-center comHeadPic" @tap="userInfo(item.publishUser.userCode)">
						<image class="headPic" mode="aspectFit"  :src="item.publishUser.imgPathHead"></image>
						<!-- <image class="grade" :src="'/static/images/juewei/'+item.publishUser.nobilityType+'.png'" mode="widthFix"></image> -->
						<image v-if="item.publishUser.nobilityType>1" class="grade" :src="'/static/images/juewei/'+(item.publishUser.nobilityType-1)+'.png'" mode="widthFix"></image>
					</view>
					<view class="flex-1 head-msg">
						<view class="flex item-center">
							<view class="name fs15" @tap="userInfo(item.publishUser.userCode)">{{ item.publishUser.userName }}</view>
							<!-- <block v-if="item.publishUser.militaryRankType">
								<image :src="'/static/images/junxian/'+item.publishUser.militaryRankType+'.png'" mode="widthFix"></image>
							</block> -->
							<block v-if="item.publishUser.shopId">
								<image src="/static/images/shop/dian.png" mode="widthFix" @tap="shopDetail(item.publishUser.shopId)"></image>
							</block>
							<text v-if="showNum" classs="numMark">{{index}}</text>
						</view>
						<view class="timer c999 fs12 clearfix">
							<text>{{item.articleInfo.timeInfo}}</text>
							<!-- <text class="mark">受赏</text>
							<text class="mark">置顶</text> -->
						</view>
					</view>
					<view class="followBox" v-if="!item.isOwner" @tap="guanzhu(item.publishUser.userCode,index)">
						<text class="follow" v-if="item.publishUser.hasFollow">已关注</text>
						<text class="follow active" v-else>关注</text>
					</view>
					<view class="operPost" v-else>
						<icon v-if="showOper" class="iconfont iconcaozuo" @tap="operPost(item)"></icon>
					</view>
				</view>
				<block v-if="item.articleInfo.type == 2">
					<view class="articalBox">
						<view class="msg lh42 fs30" :class="{ 'clamp clamp-3': !item.articleInfo.showMore && !item.articleInfo.isDetail }" @tap="linkDetail(item)">
							<block v-if="item.articleInfo.showContent.length>0">
								<block v-for="(conitem, comind) in item.articleInfo.showContent" :key="comind">
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
								<text class="text">{{item.articleInfo.content}}</text>
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
						<view v-for="(imgItem, imgInd) in item.articleInfo.imgList" :key="imgInd" @tap="linkDetail(item)" class="imgItem flex-1">
							<image :src="imgItem" mode="aspectFill" @error="setErrorPic(index,imgInd)"></image>
						</view>
					</view>
				</block>
				<block v-else-if="item.articleInfo.type == 1">
					<view class="articalBox news flex" v-if="item.articleInfo.imgList.length > 0" @tap="linkDetail(item)">
						<view class="a_pic">
							<image :src="item.articleInfo.imgList[0]" mode="widthFix" @tap.stop="showBigImg(index, 0)"></image>
						</view>
						<view class="a_main flex-1 lh42 fs30">
							<view class="title blod clamp clamp-2">{{ item.articleInfo.title }}</view>
							<view class="msg fs12 clamp clamp-2">{{ item.articleInfo.zyao }}</view>
						</view>
					</view>
					<view class="articalBox flex item-center" v-else @tap="linkDetail(item)">
						<view class="a_main flex-1  lh42 fs30">
							<view class="title blod clamp clamp-2">{{ item.articleInfo.title }}</view>
							<view class="msg fs12 clamp clamp-2">{{ item.articleInfo.zyao }}</view>
						</view>
					</view>
				</block>
				<block v-if="!isRanking" v-for="(linkitem, linkInd) in item.itemLinkList" :key="linkInd">
					<view v-if="linkitem.type == 1" class="adventBox shopProduct flex item-center" @tap="prodDetail(linkitem.goods.goodsId)">
						<view class="p_pic">
							<image :src="linkitem.goods.imgPath"></image>
						</view>
						<view class="p_main flex-1">
							<view class="name">
								<text class="textEllipsis">{{ linkitem.goods.goodsName }}</text>
							</view>
							<view class="price red fs12">{{ linkitem.goods.priceSale }}元</view>
						</view>
						<view class="p_buy"><button size="mini" type="red" class="">购买</button></view>
					</view>
					<view v-else class="adventBox ranking flex item-center" @tap="linkProd(linkitem.rankType)">
						<view class="p_pic icon">
							<image :src="'/static/images/ranking/'+linkitem.rankType+'.png'" mode="widthFix"></image>
							<!-- <image :src="linkitem.goods.imgPath"></image> -->
						</view>
						<view class="p_main flex-1">{{linkitem.name}}</view>
						<view class="p_buy"><button size="mini" type="red" class="radiuBtn">去看看</button></view>
					</view>
				</block>

				<view class="itemOperBox flex">
					<button class="flex-1" type="share" :data-index="index" open-type="share">
						<icon class="iconfont icon-share"></icon>
						<text>{{ item.articleInfo.numTotalShare }}</text>
					</button>
					<button class="flex-1" type="share" @tap="linkDetail(item,'isComment')">
						<icon class="iconfont icon-pinglun"></icon>
						<text>{{item.articleInfo.numTotalComment}}</text>
					</button>
					<button class="flex-1" type="share" @tap="linkDetail(item,'showReward')">
						<icon class="iconfont icon-shang"></icon>
						<text>{{ item.publishUser.numTotalReward}}</text>
					</button>
					<button class="flex-1" type="share" :class="{'red':item.articleInfo.hasUp}" @tap="dianzan(item.articleInfo.id,index)">
						<icon class="iconfont icon-dianzan"></icon>
						<text>{{ item.articleInfo.numTotalUp }}</text>
					</button>
				</view>
			</block>
			<block v-else-if="item.type == 2">
				<!-- item.adInfo -->
				<view class="item-head flex item-center">
					<view class="img item-center">
						<image :src="item.publishUser.imgPathHead" mode="widthFix"></image>
					</view>
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
					<view class="adventPic">
						<image src="http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg" mode="widthFix"></image>
					</view>
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
				<button v-if="!hideFootBtn" class="radiuBtn" @tap="linktoshop" type="rednull">随便看看</button>
				<!-- <navigator url="/pages/home/index" class="radiuBtn" hover-class="none">随便看看</navigator> -->
			</view>
		</view>
		<view class="noMore" v-if="nomore">
			~已经到底了！~
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
				default () {
					return [];
				}
			},
			pageType: {
				type: Number,
				default () {
					return 1;
				}
			},
			nodata: {
				// 是否有数据
				type: Boolean,
				default () {
					return false;
				}
			},
			showNum: {
				// 是否有数据
				type: Boolean,
				default () {
					return false;
				}
			},
			isDetail: {
				// 是否是详情
				type: Boolean,
				default () {
					return false;
				}
			},
			nomore: {
				// 是否有更多数据
				type: Boolean,
				default () {
					return false;
				}
			},
			showOper:{
			  type: Boolean,
			  default(){
			    return false;
			  }
			},
			isRanking:{
			  type: Boolean,
			  default(){
			    return false;
			  }
			},
			hideFootBtn:{ // 隐藏随便看看
			  type: Boolean,
			  default(){
			    return false;
			  }
			},
		},
		data() {
			return {};
		},
		methods: {
			showAll(ind) {
				this.$emit('showAll',ind);
			},
			hideMore(ind) {
				this.$emit('hideMore',ind);
				// this.dataList[ind].showMore = false;
			},
			setImg(src) {
				this.$emit('setImg', src)
			},
			showBigImg(listInd, imgInd) {
				let info = this.dataList[listInd];
				let imgList = info.articleInfo.imgList;
				this.$acFrame.Util.showBigPic(imgList[imgInd], imgList);
				getApp().globalData.isShowPic = true
			},
			loadMoreData() {},
			linkDetail(obj, type) {
				uni.navigateTo({
					url: `/pages/home/commentDetail?id=${obj.articleInfo.id}&type=${type?type:''}`
				});
			},
			rewardList(id){
				wx.navigateTo()
			},
			linktoshop() {
				// debugger
				// uni.switchTab({
				// 	url:"pages/home/index"
				// })
				this.$parent.cancelSearch()
				// this.$emit('childLink');
			},
			guanzhu(code, ind) {
				let selef = this
				this.$emit('followPost', code, ind)
			},
			linkUser(id) {
				uni.navigateTo({
					url: `/pages/mycenter/mycenter?id=${id}`
				})
			},
			linkTheme(id) {
				this.$acFrame.HttpService.readTopic({id:id}).then(res=>{
					if(res.success){}
				})
				uni.navigateTo({
					url: `/pages/home/topicIndex?id=${id}`
				})
			},
			shopDetail(id){
				uni.navigateTo({
					url:"/pages/myshop/shopDetail?id="+id
				})
			},
			userInfo(userCode) {
				uni.navigateTo({
					url: `/pages/mycenter/mycenter?userCode=${userCode}`
				})
			},
			setErrorPic(ind_p, ind_c) {
				this.dataList[ind_p].articleInfo.imgList[ind_c] = "/images/head1.png"

			},
			dianzan(id, ind) {
				this.$emit('dianzan', id, ind)
			},
			prodDetail(id){
				uni.navigateTo({
					url:"/pages/myshop/productDetail?id="+id
				})
			},
			linkProd(key) {
				let url = ''
				switch (key) {
					case 1:
						url = '/pages/ranking/friends'
						uni.navigateTo({
							url: url
						})
						break;
					case 2:
						url = '/pages/ranking/post'
						uni.navigateTo({
							url: url
						})
						break;
					case 3:
						url = '/pages/ranking/invitation'
						uni.navigateTo({
							url: url
						})
						break;
					case 4:
						url = '/pages/ranking/product'
						uni.navigateTo({
							url: url
						})
						break;
					case 5:
						url = '/pages/ranking/product'
						uni.navigateTo({
							url: url
						})
						break;
					default:
						break;
				}
				// uni.navigateTo({
				// 	url: `/pages/myshop/productDetail?goodsId=${id}`
				// })
			},
			linkRanking(type) {
				let url = ''
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
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			operPost(obj){
				let self = this
				uni.showActionSheet({
					itemList:['查看','删除'],
					itemColor:'#007AFF',
					success:(res)=>{
						if(res.tapIndex==0){
							uni.navigateTo({
								url: `/pages/home/commentDetail?id=${obj.articleInfo.id}`
							});
						}else{
							self.$acFrame.HttpService.deletePost({id:obj.articleInfo.id}).then(res=>{
								if(res.success){
									self.$acFrame.Util.mytotal("删除成功！")
									setTimeout(function() {
										self.$parent.setParams()
										self.$parent.initData()
									}, 1000);
								}
							})
						}
					}
						
				})
			}
		},
		watch: {}
	};
</script>

<style lang="less">
	.listItem {
		padding: 20rpx 0;
		border-bottom: 1px solid #efefef;

		.item-head {
			padding: 0 30rpx;

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

				.numMark {
					margin-left: 20rpx;
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 40rpx;
					width: 40rpx;
					text-align: center;
					background: #f6f6f6;
					color: #999;
				}
			}
			.operPost{
				position:relative;
				width: 80rpx;
				height:80rpx;
				.iconfont{
					position: absolute;
					top:0;
					right:0;
					color:#999;
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
			margin: 20rpx 30rpx 0;

			.msg {
				text-align: justify;
				word-break: break-all;
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
			padding: 0 20rpx 0;

			.imgItem {
				float: left;
				width: 33.3333%;
				padding: 0 10rpx;
				height: calc((100vw - 24rpx) / 3 - 20rpx);
				overflow: hidden;
				margin-top:20rpx;
				image{
					height: 100%;
				}
			}
		}

		.adventBox {
			background: #FEF6F6;
			margin: 20rpx 30rpx 0;
			min-height: 128rpx;
			padding: 16rpx 20rpx 16rpx 16rpx;
			box-sizing: border-box;

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
			font-size: rpx;
			color: #999;
			padding-top: 20rpx;

			button {
				line-height: 1.2;
			}

			&.red {
				color: #B40000;
			}

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
