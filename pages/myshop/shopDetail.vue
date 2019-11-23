<template>
	<view class="content">
		<view class="shopHead">
			<view class="shopMsg flex item-center">
				<view class="name flex-1">
					<view class="title">
						伊宁专卖店
					</view>
					<view class="text fs13 clamp clamp-2">
						店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述。
					</view>
					<view class="btn">
						<button class="contact radiuBtn" open-type="contact" size="mini">客服</button>
					</view>
				</view>
				<view class="right">
					<view class="pic">
						<image src="../../static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="btn">
						<button type="red" class="radiuBtn" size="mini">关注</button>
					</view>
				</view>
			</view>
			<view class="shopCoupon">
				<scroll-view scroll-x="true">
					<image src="../../static/images/head1.png" mode="widthFix"></image>
					<image src="../../static/images/head1.png" mode="widthFix"></image>
					<image src="../../static/images/head1.png" mode="widthFix"></image>
					<image src="../../static/images/head1.png" mode="widthFix"></image>
					<image src="../../static/images/head1.png" mode="widthFix"></image>
					<image src="../../static/images/head1.png" mode="widthFix"></image>
				</scroll-view>
			</view>
		</view>
		<view class="shopNav">
			<view class="item" v-for="(item,ind) in tabs" :key="ind" :class="{'active':item.choose}" @tap="clickBar(ind)">
				<text class="name">{{item.name}}</text>
				<view class="sanjiao" v-if="item.choose">
					<text class="up" :class="{'red':sortType=='asc'}"></text>
					<text class="down" :class="{'red':sortType=='desc'}"></text>
				</view>
			</view>
		</view>
		<view class="shopList">
			<scroll-view class="myscroll" scroll-y="true">
				<ProductList :dataList="dataList"></ProductList>
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
				tabs:[{name:'首页',choose:true},{name:'销量',choose:false},{name:'新品',choose:false},{name:'价格',choose:false}],
				dataList:[{name:"这边的是产品的名称，最多显示两行，超出两行的省略号",price:'52.00',salesNum:21623,pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'},
				{name:"韩版新款复古水晶耳饰饰品欧美时尚高档小香耳钉耳环批发",price:'7.50',salesNum:152000,pic:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'},
				{name:"溢彩水彩手帐本随身旅行绘画皮面便携手账本300g中粗纹进口水彩纸",price:'7.50',salesNum:152000,pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg'}],
				sortType:'desc' //asc
			}
		},
		methods: {
			clickBar(ind){
				let choose = this.tabs[ind].choose
				if(choose){
					if(this.sortType == 'asc'){
						this.sortType = 'desc'
					} else {
						this.sortType = 'asc'
					}
				} else {
					this.sortType = 'desc'
				}
				this.tabs.filter((v,i)=>{
					if(i==ind){
						v.choose = true
					} else {
						v.choose = false
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
			image{
				width: 100px;
				margin-right:20rpx;
				&:last-child{
					margin-right:0;
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
