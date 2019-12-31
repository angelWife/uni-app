<template>
	<view class="content">
		<view class="shopHead">
			<view class="shopMsg flex item-center">
				<view class="name flex-1">
					<view class="title">
						{{shopDetail.name}}
					</view>
					<view class="text fs13 clamp clamp-2">
						{{shopDetail.describe?shopDetail.describe:'店主很懒，什么也没留下！'}}
					</view>
					<view class="btn" v-if="!shopDetail.isOwner">
						<button class="contact radiuBtn" open-type="contact" size="mini">客服</button>
					</view>
				</view>
				<view class="right">
					<view class="pic">
						<image :src="setImg(shopDetail.imgPath)" mode="widthFix"></image>
					</view>
					<view class="btn" v-if="!shopDetail.isOwner">
						<button v-if="shopDetail.hasFollow" class="follow radiuBtn" size="mini" @tap="followShop(shopDetail.id)">已关注</button>
						<button v-else type="red" class="radiuBtn" size="mini" @tap="followShop(shopDetail.id)">关注</button>
					</view>
				</view>
			</view>
			<view class="shopCoupon">
				<scroll-view scroll-x="true">
					<block  v-for="(item,ind) in shopDetail.couponList" :key="ind">
						<view v-if="item.hasReceived" class="item hasReceived" @tap="getCoupon(item.couponId,ind)">
							<image src="/static/images/pic-coupon-d.png" mode="widthFix"></image>
							<view class="item_box">
								<view class="text-box">
									<block v-if="item.effectType==1">
										<text class="doll">¥</text>
										<text class="price blod">{{item.effectVal}}</text>
									</block>
									<block v-else>
										<text class="zhekou blod">{{item.effectVal}}</text>
										<text class="fs12">折</text>
									</block>
								</view>
								<text class="text">满{{item.priceFull}}元使用</text>
							</view>
							<view class="couponMark"></view>
						</view>
						<view v-else class="item" @tap="getCoupon(item.couponId,ind)">
							<image src="/static/images/pic-coupon-n.png" mode="widthFix"></image>
							<view class="item_box">
								<view class="text-box">
								<block v-if="item.effectType==1">
									<text class="doll">¥</text>
									<text class="price blod">{{item.effectVal}}</text>
								</block>
								<block v-else>
									<text class="zhekou blod">{{item.effectVal}}</text>
									<text class="fs12">折</text>
								</block>
								</view>
								<text class="text">满{{item.priceFull}}元使用</text>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<view class="shopNav">
			<view class="item" v-for="(item,ind) in tabs" :key="ind" :class="{'active':item.choose}" @tap="clickBar(ind)">
				<text class="name">{{item.name}}</text>
				<view class="sanjiao" v-if="item.choose&&ind!=0">
					<text class="up" :class="{'red':sortType}"></text>
					<text class="down" :class="{'red':!sortType}"></text>
				</view>
			</view>
		</view>
		<view class="shopList">
			<scroll-view class="myscroll" scroll-y="true">
				<ProductList :nodata="nodata" :dataList="dataList"></ProductList>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import ProductList from '@/components/shop-product.vue'
	export default {
		components:{
			ProductList
		},
		data() {
			return {
				id:0,
				pageIndex:1,
				pageSize:20,
				pageTotal:1,
				tabs:[{name:'首页',choose:true,type:2},
				{name:'销量',choose:false,type:3},
				{name:'新品',choose:false,type:4},
				{name:'价格',choose:false,type:5}],
				shopDetail:{},
				dataList:[{name:"这边的是产品的名称，最多显示两行，超出两行的省略号",price:'52.00',salesNum:21623,pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'},
				{name:"韩版新款复古水晶耳饰饰品欧美时尚高档小香耳钉耳环批发",price:'7.50',salesNum:152000,pic:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'},
				{name:"溢彩水彩手帐本随身旅行绘画皮面便携手账本300g中粗纹进口水彩纸",price:'7.50',salesNum:152000,pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg'}],
				sortType:false,
				pageType:2,
			}
		},
		onLoad(options){
			this.id = options.id;
			wx.setNavigationBarColor({
			  frontColor: '#000000',
			  backgroundColor: '#ffffff',
			  animation: {
			    duration: 200,
			    timingFunc: 'easeIn'
			  }
			})
		},
		onShow(){
			this.resetData()
			this.initShop()
			this.initProduct()
		},
		methods: {
			initShop(){
				let self = this
				let params = {
					id:this.id
				}
				self.$acFrame.HttpService.shopDetail(params).then(res => {
					if(res.success){
						self.shopDetail = res.data
						uni.setNavigationBarTitle({
							title:res.data.name
						})
					}
				})
			},
			initProduct(){
				let self = this
				let params = {
					shopId:this.id,
					shopPageType :this.pageType,
					shopPageSortAsc:this.sortType,
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
			clickBar(ind){
				let choose = this.tabs[ind].choose
				if(choose&&ind!=0){
					if(this.sortType){
						this.sortType = false
					} else {
						this.sortType = true
					}
				} else {
					this.sortType = false
				}
				
				this.tabs.filter((v,i)=>{
					if(i==ind){
						v.choose = true
						this.pageType = v.type
					} else {
						v.choose = false
					}
				})
				this.resetData()
				this.initProduct()
			},
			followShop(id){
				let self = this
				let params = {
					id:this.id
				}
				self.$acFrame.HttpService.shopFollow(params).then(res => {
					if(res.success){
						self.shopDetail.hasFollow = res.data.hasFollow
					}
				})
			},
			resetData(){
				this.pageIndex=1
				this.pageSize=20
				this.dataList=[]
			},
			setImg(src){
				return  this.$acFrame.Util.setImgUrl(src);
			},
			getCoupon(id,ind){
				let self=this
				let _obj = self.shopDetail.couponList[ind]
				if(_obj.hasReceived){
					this.$acFrame.Util.mytotal('亲，该优惠券已经领取过了！')
					return false;
				}
				this.$acFrame.HttpService.getCoupons({id:id}).then(res=>{
					if(res.success){
						self.shopDetail.couponList[ind].hasReceived = true
						let list_c = [] // 未使用的
						let list_u = [] // 已使用的
						self.shopDetail.couponList.filter(v=>{
							if(v.hasReceived){
								list_u.push(v)
							}else{
								list_c.push(v)
							}
						})
						self.shopDetail.couponList = [...list_c,...list_u];
					}
				})
			}
		}
	}
</script>

<style lang="less">
page,.content{
	height:100%;
	border:0;
	background: #eee;
}
.shopHead{
	background:rgba(0,0,0,0.2) url(http://www.mypcera.com/star/mm/uploadfile/201005/4/A142330696.jpg) center center no-repeat;
	border-bottom-left-radius: 1em;
	border-bottom-right-radius: 1em;
	overflow: hidden;
	background-size: 100% auto;
	color:#fff;
	padding:0 20rpx 20rpx;
	.shopMsg{
		padding-top:20rpx;
		.title{
			font-size:36rpx;
			height:60rpx;
			line-height: 60rpx;
		}
		.name{
			width: 60%;
			height:200rpx;
			padding-top:10rpx;
			.text{
				height:76rpx;
			}
			.btn{
				margin-top:10rpx;
				.contact{
					border:1px solid #fff;
					color:#fff;
					background: none;
					&::after{
						border:none;
						box-shadow: none;
					}
				}
			}
		}
		button{
			width: 160rpx;	
			line-height: 50rpx;
		}
		.right{
			margin-left:20rpx;
			text-align: center;
			height:200rpx;
			.pic{
				padding-top:10rpx;
				image{
					width: 120rpx;
					height:120rpx;
					border-radius: 120rpx;
				}
			}
			.btn{
				margin-top:20rpx;
				.follow{
					border:1px solid #ccc !important;
					color:#fff;
					background: #ccc;
					&::after{
						border:none;
						box-shadow: none;
					}
				}
			}
		}
	}
	.shopCoupon{
		margin-top:20rpx;
		width: 100%;
		scroll-view{
			white-space: nowrap;
			height:100%;
			overflow: hidden;
			.item{
				display: inline-block;
				width: 240rpx;
				margin-right:20rpx;
				position:relative;
				color:#1A0000;
				image{
					vertical-align: top;
				}
				.item_box{
					position:absolute;
					width: 100%;
					height:100%;
					top:0;
					left:0;
				}
				&:last-child{
					margin-right:0;
				}
				.zhekou{
					margin-left:20rpx;
					line-height: 2.5;
					font-size:40rpx;
				}
				.text-box{
					display: inline-block;
					min-width:100rpx;
					text-align: center;
				}
				.doll{
					margin-left:20rpx;
					font-size:20rpx;
					line-height: 2.5;
				}
				.price{
					line-height: 2.5;
					font-size:40rpx;
				}
				.text{
					position:absolute;
					right:30rpx;
					top:20rpx;
					color:#604B1B;
					font-size:10px;
					
				}
				.couponMark{
					position:absolute;
					width: 100%;
					height:100%;
					// background: rgba(0,0,0,0.1);
					top:0;
					left:0;
				}
				&.hasReceived{
					.text{
						color:#604B1B;
					}
				}
			}
		}
	}
}
.shopNav{
	padding:20rpx;
	overflow: hidden;
	.item{
		width: 25%;
		float:left;
		text-align: center;
		position:relative;
		.name{
			display: inline-block;
			height:40rpx;
			line-height: 40rpx;
			border-bottom:2px solid #eee;
		}
		&.active{
			.name{
				border-color:#b40000;
				color:#b40000;
			}
			
		}
		.sanjiao{
			position:absolute;
			height:100%;
			right:20%;
			top:0;
			width: 20rpx;
			.up{
				position: absolute;
				right: 0;
				top: 10rpx;
				width: 0;
				height: 0;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-bottom: 10rpx solid #999;
				&.red{
					border-bottom-color:#b40000;
				}
			}
			.down{
				position: absolute;
				right: 0;
				bottom: 10rpx;
				width: 0;
				height: 0;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-top: 10rpx solid #999;
				&.red{
				border-top-color:#b40000;
			}
			}
			
		}
	}
}
.shopList{
	height:calc(100% - 450rpx);
}
</style>
