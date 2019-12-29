<template>
	<view class="content">
		<view class="headBox flex item-center" :style="headpg">
			<view class="pic comHeadPic">
				<image class="grade" v-if="userInfo.nobilityType>1" :src="'/static/images/juewei/'+(userInfo.nobilityType-1)+'.png'"  mode="widthFix"></image>
				<image class="headpic" :src="this.$acFrame.Util.setImgUrl(userInfo.imgHeadPath,userInfo.genderType)"></image>
			</view>
			<view class="msg flex-1">
				<view class="text textEllipsis">
					<icon class="iconfont icon-location"></icon>
					{{userInfo.address?userInfo.address:'暂无信息'}}
				</view>
				<view class="text textEllipsis">
					<icon class="iconfont icon-yezi"></icon>
					{{userInfo.introduce?userInfo.introduce:'这个家伙很懒，什么也没留下'}}
				</view>
				<view class="btn">
					<block v-if="!userInfo.isOwner">
						<text>私信</text>
						<text @tap="followUser(userInfo.userCode)">{{userInfo.hasFollow?'已关注':'未关注'}}</text>
					</block>
				</view>
			</view>
			<view class="offical"><image class="grade" :src="'/static/images/junxian/'+userInfo.militaryRankType+'.png'" mode="widthFix"></image></view>
		</view>
		<view class="mydatas flex">
			<view class="item flex-1 flex f-col just-con-c">
				<view class="num">{{userInfo.numTotalArticle}}</view>
				<view class="text">帖子</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c" @tap="followList(1)">
				<view class="num">{{userInfo.numTotalFollow}}</view>
				<view class="text">关注</view>
			</view>
			<view class="item flex-1 flex f-col just-con-c" @tap="followList(2)" >
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
		<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData">
			<view class="post" v-if="modalName=='post'">
				<commentItem :nodata="nodata" :nomore="nomore" :dataList="dataList" @dianzan="dianzan"
				 @followPost="followPost" @hideMore="hideMore" @showAll="showAll" :showOper="showOper"></commentItem>
			</view>
			<view class="shop" v-if="modalName=='shop'">
				<productList :nodata="nodata" :nomore="nomore" :dataList="dataList"></productList>
			</view>
			<view class="reward" v-if="modalName=='reward'">
				<view class="topMsg flex">
					<view>打赏记录</view>
					<view class="flex-1 text-right c999">我收到过{{rewardTotal}}次打赏</view>
				</view>
				<view class="comItem flex item-center"  v-for="(item,index) in dataList" :key="index">
					<view class="pic">
						<image :src="item.imgHeadPath " mode="widthFix" />
					</view>
					<view class="main flex-1 flex item-center">
						<view class="flex-1">
							<view class="title fs16">{{item.nickName}}</view>
							<view class="text fs12 c999">{{item.createTime}}</view>
						</view>
						<view class="right-pic">
							<image :src="item.virtualImgPath " mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<view class="honor clearfix" v-if="modalName=='honor'">
				<!-- <view class="item">
					<view class="itemBox">
						<view class="mydate">
							<image class="mark" src="../../static/images/icon-label.png" mode="widthFix" />
							<text>12月12日</text>
						</view>
						<view class="item-modal flex item-center just-con-c">
							<image src="../../static/images/first.png" mode="" />
						</view>
					</view>
				</view> -->
				<view class="noData flex f-row just-con-c item-center">
					<view class="text-center">
						<image src="/static/images/nodata.png" mode="widthFix"></image>
						<view class="text-center c666 fs16">
							这里还没有内容
						</view>
					</view>
				</view>
				<view class="noMore" v-if="nomore">
					~已经到底了！~
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
			showOper:true,
			rewardTotal:0,
			headpg:'background:url("'+getApp().globalData.config.businessPath+'static/ss/mp/images/mine_main.png") center center no-repeat;background-size: auto 100%;'
		};
	},
	onLoad(options){
		wx.setNavigationBarColor({
		  frontColor: '#ffffff',
		  backgroundColor: '#7a0719',
		  animation: {
		    duration: 200,
		    timingFunc: 'easeIn'
		  }
		})
		let userCode=options.userCode;
		this.userCode=userCode?userCode:uni.getStorageSync('userCode')
	},
	onShow(){
		if(getApp().globalData.isShowPic){
			getApp().globalData.isShowPic=false
		}else{
			this.setParams();
			if(this.modalName =='post'){
				this.initData();
			}else if(this.modalName =='shop'){
				this.getProdList()
			}else if(this.modalName == 'reward'){
				this.getRewardList()
			}
			
			this.getUserInfo();
			
		}
		
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
	methods: {
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
		loadMoreData(){
			if(this.pageTotal>this.pageIndex){
				this.pageIndex++
				this.initData()
			}else{
				this.nomore=true
			}
			console.log(this.nomore)
		},
		initData() {
			let self = this;
			let params = {
				checkShop: 1,
				pageIndex: self.pageIndex,
				pageSize: self.pageSize,
				pageType:1,
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
							if (v.publishUser) {
								v.publishUser.imgPathHead = self.$acFrame.Util.setImgUrl(v.publishUser.imgPathHead,v.publishUser.genderType);
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
		getRewardList(){
			let self = this
			let params = {
				pageIndex:this.pageIndex,
				pageSize:this.pageSize
			}
			this.$acFrame.HttpService.rewardTable(params).then(res=>{
				if(res.success){
					let list = res.data.rows
					self.pageTotal = res.data.pageTotal
					self.rewardTotal = res.data.total
					if(list.length>0){
						list.filter(v=>{
							v.imgHeadPath  = self.setImg(v.imgHeadPath)
							v.virtualImgPath   = self.setImg(v.virtualImgPath)
							v.createTime = self.$acFrame.Util.formatTime(v.createTime,'dayhm')
						})
						self.dataList = self.dataList.concat(list)
					}else{
						self.nodata=true
					}
					
				}
			})
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
					if(!res.data.isOwner){
						uni.setNavigationBarTitle({
							title:res.data.nickName+'的主页'
						})
					}
					
				}
			})
		},
		tapClick(ind){
			let self = this
			self.setParams();
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
			} else if(self.modalName == 'reward'){
				self.getRewardList()
			}
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
					this.getUserInfo();
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
		followUser(code){
			let self = this
			let params = {
				userCode: code,
			}
			self.$acFrame.HttpService.followPost(params).then(res => {
				if (res.success) {
					if (res.data) {
						self.$acFrame.Util.mytotal('关注成功！');
					} else {
						self.$acFrame.Util.mytotal('关注已取消！');
					}
					self.userInfo.hasFollow = res.data
				}
			})
		},
		setImg(src) {
			return this.$acFrame.Util.setImgUrl(src);
		},
		showAll(ind) {
			this.dataList[ind].articleInfo.showMore = true;
		},
		hideMore(ind) {
			this.dataList[ind].articleInfo.showMore = false;
		},
		setParams(){
			this.pageIndex=1
			this.nodata = false
			this.nomore=false
			this.pageSize=10
			this.pageTotal=1
			this.dataList=[]
		},
		followList(type){
			if(type){
				uni.navigateTo({
					url:'followList?type='+type
				})
			}
		}
		
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
	padding: 20rpx 0;
	height:230rpx;
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
	height: calc(100% - 430rpx);
	.topMsg{
		padding:20rpx 30rpx;
		border-bottom:1px solid #ccc;
	}
	.comItem{
		.main{
			padding:10rpx 0;
		}
		.pic{
			width: 60rpx;
		}
		.right-pic{
			width: 96rpx;
			margin-right:30rpx;
		}
	}
	.honor{
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
