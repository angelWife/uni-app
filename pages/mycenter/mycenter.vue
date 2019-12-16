<template>
	<view class="content">
		<view class="headBox flex item-center">
			<view class="pic comHeadPic">
				<image class="grade" src="../../static/images/baihu.png" mode="widthFix"></image>
				<image class="headpic" :src="this.$acFrame.Util.setImgUrl(userInfo.imgHeadPath )"></image>
			</view>
			<view class="msg flex-1">
				<view class="text textEllipsis">
					<icon class="iconfont icon-location"></icon>
					黑龙江哈尔滨市双城区
				</view>
				<view class="text textEllipsis">
					<icon class="iconfont icon-yezi"></icon>
					{{userInfo.introduce}}
				</view>
				<view class="btn">
					<block v-if="!userInfo.isOwner">
						<text>私信</text>
						<text>已关注</text>
					</block>
				</view>
			</view>
			<view class="offical"><image class="grade" src="../../static/images/zhunwei.png" mode="widthFix"></image></view>
		</view>
		<view class="mydatas flex">
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">{{userInfo.numTotalArticle}}</view>
				<view class="text">帖子</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">{{userInfo.numTotalFollow}}</view>
				<view class="text">关注</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">{{userInfo.numTotalFans}}</view>
				<view class="text">粉丝</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">{{userInfo.numTotalUp}}</view>
				<view class="text">获赞</view>
			</view>
		</view>
		<view class="infoTab">
			<view class="item" v-for="(item, index) in infoTab" :key="index" :class="{ active: item.choose }" @tap="tapClick(index)">{{ item.name }}</view>
		</view>
		<scroll-view class="myscroll" scroll-y="true">
			<view class="post" v-if="modalName=='post'">
				<commentItem :nodata="nodata" :nomore="nomore" :dataList="dataList" @dianzan="dianzan"
				 @followPost="followPost"></commentItem>
			</view>
			<view class="shop" v-if="modalName=='shop'">
				<productList :nodata="nodata" :dataList="dataList"></productList>
			</view>
			<view class="honor" v-if="modalName=='honor'">
				<view class="topMsg flex">
					<view>打赏记录</view>
					<view class="flex-1 text-right c999">我收到过100次打赏</view>
				</view>
				<view class="comItem flex item-center">
					<view class="pic">
						<image src="../../static/images/head1.png" mode="widthFix" />
					</view>
					<view class="main flex-1 flex item-center">
						<view class="flex-1">
							<view class="title fs16"></view>
							<view class="text fs12 c999"></view>
						</view>
						<view class="right-pic">
							<image src="../../static/images/icon-aircraft.png" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<view class="reward clearfix" v-if="modalName=='reward'">
				<view class="item">
					<view class="itemBox">
						<view class="mydate">
							<image class="mark" src="../../static/images/icon-label.png" mode="widthFix" />
							<text>12月12日</text>
						</view>
						<view class="item-modal flex item-center just-con-c">
							<image src="../../static/images/first.png" mode="" />
						</view>
					</view>
				</view>
				<view class="item">
					<view class="itemBox">
						<view class="mydate">
							<image class="mark" src="../../static/images/icon-label.png" mode="widthFix" />
							<text>12月12日</text>
						</view>
						<view class="item-modal flex item-center just-con-c">
							<image src="../../static/images/first.png" mode="" />
						</view>
					</view>
				</view>
				<view class="item">
					<view class="itemBox">
						<view class="mydate">
							<image class="mark" src="../../static/images/icon-label.png" mode="widthFix" />
							<text>12月12日</text>
						</view>
						<view class="item-modal flex item-center just-con-c">
							<image src="../../static/images/first.png" mode="" />
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import commentItem from '@/components/comment-item.vue';
import productList from '@/components/shop-product.vue'
export default {
	components: {
		commentItem,
		productList
	},
	data() {
		return {
			infoTab: [{ name: '帖子', choose: true ,type:"post"}, 
			{ name: '小店', choose: false ,type:"shop"}, 
			{ name: '荣誉', choose: false ,type:"honor"}, 
			{ name: '受赏', choose: false ,type:"reward"}],
			userInfo:{},
			dataList: [],
			prodNodata:false,
			modalName:'post',
			userCode:'',
			nodata: false,
			nomore: false,
			pageTotal:1,
			pageSize:10,
			pageIndex:1,
		};
	},
	onLoad(options){
		let userCode=options.userCode;
		this.userCode=userCode?userCode:uni.getStorageSync('userCode')
	},
	onShow(){
		this.getUserInfo();
		this.initData();
	},
	methods: {
		initData() {
			let self = this;
			console.error(self.keywords)
			let params = {
				checkShop: 1,
				pageIndex: self.pageIndex,
				pageSize: self.pageSize,
				pageType:0,
				userCode:this.userCode
			};
			self.$acFrame.HttpService.postList(params).then(res => {
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
						self.dataList = [...self.dataList, ...dataList];
		
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
		getProdList(){ // shopList
			let self = this
			let params = {
				loadOwner:true,
				shopUserCode:this.userCode,
				pageIndex:this.pageIndex,
				pageSize:this.pageSize
			}
			self.$acFrame.HttpService.productList(params).then(res => {
				if(res.success){
					let list = res.data.rows
					self.pageTotal = res.data.pageTotal
					if(list.length>0){
						self.dataList=self.dataList.concat(list)
						console.log(self.dataList)
						self.nodata = false
					} else {
						self.nodata = true
					}
					
				}
			})
		},
		getUserInfo(){
			let self=this
			let params = {
				userCode:self.userCode
			}
			this.$acFrame.HttpService.userInfo(params).then(res=>{
				if(res.success){
					self.userInfo = res.data
				}
			})
		},
		tapClick(ind){
			let self = this
			self.pageTotal=1
			self.pageSize=10
			self.pageIndex=1
			self.nodata = false
			self.dataList=[]
			this.infoTab.filter((v,i)=>{
				if(i==ind){
					v.choose = true
					self.modalName = v.type
				} else {
					v.choose = false
				}
			})
			if(self.modalName == 'post'){
				self.initData()
			} else if(self.modalName == 'shop'){
				self.getProdList()
			}
		},
	}
};
</script>

<style lang="less">
page {
	height: 100%;
}
.myscroll{
	padding-top:20rpx;
}
.content {
	border: 0;
	height: 100%;
}
.headBox {
	background: #810d21;
	padding: 20rpx 0;
	color: #fff;
	font-size: 26rpx;
	.pic {
		position: relative;
		height: 100rpx;
		width: 100rpx;
		margin: 0 20rpx;
		.headpic {
			border-radius: 100rpx;
			width: 100rpx;
			height:100rpx;
		}
		.grade {
			position: absolute;
			width: 120rpx;
			top: -10rpx;
			left: -10rpx;
		}
	}
	.msg {
		width: 50%;
		.text {
			line-height: 40rpx;
		}
		.iconfont {
			float:left;
			height: 40rpx;
			width: 40rpx;
			text-align: center;
			line-height: 40rpx;
			overflow: hidden;
			position: relative;
			&::before {
				position: absolute;
				line-height: 40rpx;
				top: 0;
				left: 0;
			}
		}
		.btn {
			margin-top: 10rpx;
			text {
				display: inline-block;
				padding: 0 20rpx;
				border-radius: 60rpx;
				border: 1px solid #fff;
				margin: 0 10rpx;
			}
		}
	}
	.offical {
		width: 160rpx;
		margin: 0 20rpx;
	}
}
.mydatas {
	height: 100rpx;
	.item {
		width: 25%;
		background: #d83d52;
		text-align: center;
		&:nth-child(2n) {
			background: #e55266;
		}
		.num {
			color: #fff;
		}
		.text {
			color: #f2a8b2;
			font-size: 24rpx;
		}
	}
}
.infoTab {
	background: #fff;
	height: 80rpx;
	.item {
		float: left;
		color: #999;
		border-bottom: 2px solid #fff;
		padding: 0 10rpx;
		margin: 0 20rpx;
		height: 80rpx;
		line-height: 100rpx;
		&.active {
			border-color: #b40000;
			color: #b40000;
		}
	}
}
.myscroll {
	height: calc(100% - 360rpx);
	.topMsg{
		padding:20rpx 30rpx;
		border-bottom:1px solid #ccc;
	}
	.comItem{
		.main{
			padding:10rpx 0;
		}
	}
	.reward{
		padding:0 10rpx;
	   .item{
		   float:left;
		   width: 50%;
		   padding: 0 10px;
		   margin:10rpx 0;
		   .itemBox{
			   background: #fff;
			   border-radius:0.5em;
			   box-shadow: 0 0 3px rgba(0,0,0,0.1);
			   height:calc((100vw - 20rpx) / 2 - 20rpx);
			   position: relative;
		   }
		   .mydate{
			   position:absolute;
			   top:0;
			   left:-10rpx;
			   width: 120rpx;
			   text-align: center;
			   color:#fff;
			   line-height: 40rpx;
			   image{
				   position: absolute;
				   top:0;
				   left:0;
			   }
		   }
		   .item-modal{
			   text-align: center;
			   width: 80%;
		   }
	   }
	   
	}
}
</style>
