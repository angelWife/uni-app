<template>
	<view class="content">
		<view class="modal">
			<view class="head flex item-center">
				<view class="pic comHeadPic"  @tap="linkTo('baseInfo')">
					<image class="headPic" :src="userInfo.imgHeadPath" mode="widthFix" ></image>
					<image class="grade" v-if="userInfo.nobilityType >1" :src="'/static/images/juewei/'+(userInfo.nobilityType-1)+'.png'"  mode="widthFix"></image>
				</view>
				<view class="center flex-1">
					<view class="name">
						<text class="fs15 blod">{{userInfo.nickName}}</text>
						<!-- <text class="mark" @tap="linkTo('militaryRank')">少校</text> -->
						<image :src="'/static/images/junxian/'+userInfo.militaryRankType +'.png'" mode="widthFix" @tap="linkTo('militaryRank')"></image>
					</view>
					<view class="text c999 fs13" @tap="linkTo('activityLevel')">
						活跃度：{{userInfo.totalActive?userInfo.totalActive:0}}
					</view>
				</view>
				<view class="btnBox">
					<!-- <button class="radiuBtn" size="mini" type="red" @tap="linkTo('createShop')">申请开店</button> -->
					<button v-if="userInfo.shopIngType==3" class="radiuBtn" size="mini" type="red" @tap="linkTo('createShop')">申请开店</button>
					<button v-else-if="userInfo.shopIngType==1" class="radiuBtn" size="mini" type="red" @tap="showModal('showShopModal')">店主</button>
					<button v-else-if="userInfo.shopIngType==2" class="radiuBtn" size="mini" type="red" @tap="showModal('showCheckModal')">审核中</button>
				</view>
				<view class="right" @tap="linkTo('baseInfo')">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex" @tap="linkTo('mycenter')">
				<view class="icon">
					<image src="/static/images/icon-homepage.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					我的主页
				</view>
			</view>
			<view class="item flex">
				<view class="icon">
					<image src="/static/images/icon-weixin.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					<button type="text" open-type="getUserInfo" @getuserinfo="getUserInfo">同步微信信息</button>
					<!-- <text class="c999">信息已绑定</text> -->
				</view>
			</view>
			<view class="item flex" @tap="linkTo('myWallet')">
				<view class="icon">
					<image src="/static/images/icon-wallet.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					钱包
				</view>
			</view>
		</view>
		<view class="modal">
			<!-- <view class="item flex"  @tap="linkTo('myTask')">
				<view class="icon">
					<image src="/static/images/icon-mission.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					任务
				</view>
			</view> -->
			<view class="item flex"  @tap="linkTo('/pages/order/index')">
				<view class="icon">
					<image src="/static/images/icon-order.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					订单
				</view>
			</view>
			<view class="item flex"  @tap="linkTo('/pages/order/afterSale')">
				<view class="icon">
					<image src="/static/images/icon-aftersale.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					售后
				</view>
			</view>
		</view>
		<view class="modal">
			<!-- <view class="item flex">
				<view class="icon">
					<image src="/static/images/icon-ranking.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					排行
				</view>
			</view>
			<view class="item flex">
				<view class="icon">
					<image src="/static/images/icon-goodfriends.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					好友
				</view>
			</view>-->
			<view class="item flex" @tap="linkTo('myNews')">
				<view class="icon">
					<image src="/static/images/icon-infom.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					消息
					<text class="mark" v-if="hasNews"></text>
				</view>
			</view>
			<view class="item flex" @tap="linkTo('treasury')">
				<view class="icon">
					<image src="/static/images/icon-treasury.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					宝库
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex" @tap="linkTo('mySpirit')">
				<view class="icon">
					<image src="/static/images/icon-spirit.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					精灵
				</view>
			</view>
			<view class="item flex" @tap="linkTo('mySettings')">
				<view class="icon">
					<image src="/static/images/icon-setting.png" mode="widthFix"></image>
				</view>
				<view class="right flex-1">
					设置
				</view>
			</view>
		</view>
		<MessageModal :title="checktitle" :showMessage="showCheckModal" @closeModal="closeModal" @sureModalBtn="sureModal('showCheckModal')">
			<view class="message">
				<view class="">
					请耐心等待...如需帮助请联系
				</view>
				<view class="blue" @tap="callShop('010-12322222')">
					010-12322222
				</view>
			</view>
		</MessageModal>
		<MessageModal :title="shoptitle" :showMessage="showShopModal" @closeModal="closeModal" @sureModalBtn="sureModal('showShopModal')">
			<view class="message">
				<view class="">
					访问 <text class="blue">http://sj.xxl.com</text> 
				</view>
				<view>
					快速上传商品
				</view>
			</view>
		</MessageModal>
	</view>
</template>

<script>
	import MessageModal from '@/components/messageModal.vue';
	export default {
		components: {
			MessageModal
		},
		data() {
			return {
				userInfo:{},
				showCheckModal:false,
				showShopModal:false,
				checktitle:'资料审核种',
				shoptitle:'你已具备开店资格',
				hasNews:false
			}
		},
		onShow(){
			this.infoData()
			this.getNewsType()
		},
		methods: {
			infoData(){
				let self=this
				this.$acFrame.HttpService.ownerInfoMain().then(res=>{
					if(res.success){
						let userInfo = res.data
						userInfo.imgHeadPath=this.$acFrame.Util.setImgUrl(userInfo.imgHeadPath,userInfo.genderType);
						self.userInfo = userInfo
					}
				})
			},
			getNewsType(){
				let self =this
				this.$acFrame.HttpService.newsType().then(res=>{
					if(res.success){
						let newsVO = res.data
						let nums = 0
						for(let i =1;i<4;i++){
							nums+=newsVO[i]
						}
						if(nums>0){
							self.hasNews = true
						}else {
							self.hasNews = false
						}
					}
				})
			},
			linkTo(url){
				if(url=="mysettings"){
					url+='?passwdPaySet='+userInfo.passwdPaySet
				}
				if(url=="activityLevel"){
					url+='?type=3'
				}
				uni.navigateTo({
					url: url
				});
			},
			callShop(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			showModal(name){
				this[name]=true
			},
			sureModal(name){
				this[name]=false
			},
			closeModal(){
				this.showCheckModal=false
				this.showShopModal=false
			},
			getUserInfo(e){
				let userinfo = e.detail.userInfo;
				let self =this
				let params = {
					imgHead:userinfo.avatarUrl,
					nickName:userinfo.nickName,
				}
				this.$acFrame.HttpService.bindwxInfo(params).then(res=>{
					if(res.success){
						self.$acFrame.Util.mytotal('信息绑定成功！')
					}
				})
			}
		}
	}
</script>

<style lang="less">
page{
	min-height:100%;
	background: #efefef;
}
.modal{
	background: #fff;
	margin-bottom:20rpx;
	.item{
		height:96rpx;
		line-height: 96rpx;
		.icon{
			width: 40rpx;
		    margin:0 30rpx;
		}
		.right{
			border-bottom:1px solid #ccc;
			position:relative;
			.mark{
				position:absolute;
				width: 16rpx;
				height:16rpx;
				border-radius: 16rpx;
				top:16rpx;
				left:50rpx;
				background: #B40000;
			}
			button{
				line-height: 100rpx;
				text-align: left;
				padding:0;
			}
		}
		&:last-child{
			.right{
				border:0;
			}
			
		}
		
	}
}
.head{
	padding:20rpx 0;
	.pic{
		width: 100rpx;
		height:100rpx;
		margin:0 24rpx;
	}
	.center{
		line-height: 40rpx;
		.mark{
			display: inline-block;
			margin-left:30rpx;
			border-radius: 40rpx;
			padding:0 20rpx;
			background: #46D88C;
			color:#fff;
			font-size:24rpx;
		}
		.text{
			margin-top:10rpx;
		}
		image{
			display: inline-block;
			margin-left:20rpx;
			width: 80rpx;
		}
	}
	.btnBox{
		margin-left:24rpx;
	}
	.right{
		height:100rpx;
		line-height: 100rpx;
		width: 80rpx;
		text-align: center;
		.iconfont{
			color:#999;
		}
	}
	
}
.message{
	margin:40rpx 0;
}
</style>
