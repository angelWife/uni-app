<template>
	<view class="content">
		<view class="shopHead">
			<view class="shopMsg flex item-center">
				<view class="name flex-1">
					<view class="title">
						{{shopDetail.name}}
					</view>
					<view class="text fs13 clamp clamp-2">
						{{shopDetail.describe}}
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
						<button v-if="shopDetail.hasFollow" type="red" class="radiuBtn" size="mini" @tap="followShop(shopDetail.id)">关注</button>
						<button v-else class="contact radiuBtn" size="mini" @tap="followShop(shopDetail.id)">关注</button>
					</view>
				</view>
			</view>
			<view class="shopCoupon">
				<scroll-view scroll-x="true">
					<block  v-for="(item,ind) in shopDetail.couponList" :key="ind">
						<view class="item" :class="{'hasReceived':item.hasReceived}">
							<text class="doll">¥</text>
							<text class="price blod">15</text>
							<text class="t1 fs12" :class="{'c999':item.hasReceived}">满100元使用</text>
							<text class="t2">优惠券</text>
							<text class="t3 white">{{item.hasReceived?'已领取':'立即领取'}}</text>
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
				tabs:[{name:'首页',choose:true,type:2},{name:'销量',choose:false,type:3},{name:'新品',choose:false,type:4},{name:'价格',choose:false,type:5}],
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
				if(ind==0){
					this.resetData()
					this.initProduct()
					return false
				}
				if(choose){
					if(this.sortType){
						this.sortType = false
					} else {
						this.sortType = true
					}
				} else {
					this.sortType = false
				}
				this.resetData()
				this.tabs.filter((v,i)=>{
					if(i==ind){
						v.choose = true
						this.pageType = v.type
					} else {
						v.choose = false
					}
				})
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
		}
		.name{
			width: 60%;
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
			.pic{
				image{
					width: 120rpx;
					height:120rpx;
					border-radius: 120rpx;
				}
			}
			.btn{
				margin-top:20rpx;
				button{
					border:1px solid #b40000;
				}
			}
		}
	}
	.shopCoupon{
		margin-top:20rpx;
		height:100rpx;
		width: 100%;
		scroll-view{
			white-space: nowrap;
			height:100%;
			overflow: hidden;
			.item{
				display: inline-block;
				width: 200rpx;
				height:100rpx;
				margin-right:20rpx;
				position:relative;
				padding-top:20rpx;
				background: rgb(241, 241, 63);
				&:last-child{
					margin-right:0;
				}
				&.hasReceived{
					background: #f1f1f1;
				}
				.doll{
					float:left;
					margin-left:20rpx;
				}
				.price{
					float:left;
					font-size:60rpx;
				}
				.t1{
					float:left;
				}
				.t2{
					float:left;
				}
				.t3{
					float:right;
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
