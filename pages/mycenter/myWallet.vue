<template>
	<view class="content">
		<view class="modal listBox">
			<view class="item flex" @tap="linkTo('cashOut')">
				<view class="name">
					<image src="../../static/images/starticke.png" mode="widthFix"></image>
					<text>星票</text>
				</view>
				<view class="nums text-right flex-1">
					10000
				</view>
				<view class="iconfont icon-right"></view>
			</view>
			<view class="item flex">
				<view class="name">
					<image src="../../static/images/icon-energy.png" mode="widthFix"></image>
					<text>星能</text>
				</view>
				<view class="nums text-right flex-1">
					10000
				</view>
				<view class="iconfont icon-right"></view>
			</view>
			<view class="item flex" @tap="linkTo('bankCards')">
				<view class="name">
					<image src="../../static/images/icon-bankcard.png" mode="widthFix"></image>
					<text>银行卡</text>
				</view>
				<view class="nums text-right flex-1">
					10000
				</view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
	    <view class="modal prodList">
			<view class="navBox flex">
				<view class="item flex-1" v-for="(item,ind) in nav" :key="ind" :class="{'active':item.choose}" @tap="changeNav(ind)">
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<product-list :dataList="dataList" :listType="listType"></product-list>
			
		</view>
	</view>
</template>

<script>
	import productList from '@/components/shop-product.vue'
	export default {
		components:{
			productList
		},
		data() {
			return {
				nav:[{name:'热销',choose:true},
				{name:'精灵',choose:false},
				{name:'勋章',choose:false},
				{name:'星能',choose:false},
				{name:'道具',choose:false}],
				dataList:[{name:"这边的是产品的名称，最多显示两行，超出两行的省略号",price:'52.00',salesNum:21623,pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'},
				{name:"韩版新款复古水晶耳饰饰品欧美时尚高档小香耳钉耳环批发",price:'7.50',salesNum:152000,pic:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'},
				{name:"溢彩水彩手帐本随身旅行绘画皮面便携手账本300g中粗纹进口水彩纸",price:'7.50',salesNum:152000,pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg'}],
				listType:'wallet'
			};
		},
		methods:{
			changeNav(ind){
				this.nav.filter((v,i)=>{
					if(i==ind){
						v.choose=true
					}else{
						v.choose=false
					}
				})
			},
			linkTo(name){
				uni.navigateTo({
					url: name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
	margin-top:20rpx;
}
.listBox{
	padding:0 24rpx;
	.item{
		height:80rpx;
		line-height: 80rpx;
		border-bottom:1px solid #ccc;
		&:last-child{
			border:0;
		}
		image{
			position:relative;
			top:-2rpx;
			width: 40rpx;
			display: inline-block;
			margin-right:20rpx;
		}
		.iconfont{
			color:#999;
			font-size:28rpx;
			margin-left:20rpx;
		}
	}
}
.navBox{
	padding:20rpx 0;
	.item{
		text-align: center;
		text{
			display: inline-block;
			padding:10rpx 0;
			border-bottom:2px solid #fff;
		}
		&.active{
			text{
				color:#b40000;
				border-color:#b40000;
			}
		}
	}
}
</style>
