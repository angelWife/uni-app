<template>
	<view class="content">
		<view class="flex f-row">
			<view class="navBar">
				<view v-for="(item,index) in bar" :key="index" class="item" :class="{'red':item.choose}" @tap="chooseTab(index)">
					{{item.name}}
					<text class="line" v-if="item.choose"></text>
				</view>
			</view>
			<view class="flex-1">
				<view class="productList" v-if="showProduct">
					<ProductList :list="productList" v-on:setProduct="chooseRes"></ProductList>
				</view>
				<view class="rankList" v-else>
					<RankList :list="rankList" v-on:setRank="chooseRes"></RankList>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ProductList from '@/components/product-list.vue';
	import RankList from '@/components/ranking-item.vue';
	export default {
		components:{
			ProductList,
			RankList
		},
		data() {
			return {
				showProduct:true,
				bar:[{name:'商品',choose:true},{name:'排行',choose:false}],
				productList:[{name:"这边的是产品的名称，最多显示两行，超出两行的省略号",price:'52.00',salesNum:21623,pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'},
				{name:"韩版新款复古水晶耳饰饰品欧美时尚高档小香耳钉耳环批发",price:'7.50',salesNum:152000,pic:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'},
				{name:"溢彩水彩手帐本随身旅行绘画皮面便携手账本300g中粗纹进口水彩纸",price:'7.50',salesNum:152000,pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg'}],
				rankList:[
					{icon:'/static/images/icon.png',name:'邀请好友排行榜'},
					{icon:'/static/images/icon.png',name:'热帖排行榜'},
					{icon:'/static/images/icon.png',name:'话题行榜'},
					{icon:'/static/images/icon.png',name:'热卖商品排行榜'},
					{icon:'/static/images/icon.png',name:'转发商品排行榜'}
				]
			};
		},
		methods:{
			chooseTab(index){
				this.bar.filter((v,i)=>{
					if(i == index){
						v.choose = true
					}else{
						v.choose = false
					}
				})
				if(index==0){
					this.showProduct = true
				}else{
					this.showProduct = false
				}
			},
			chooseRes(obj){
				let pages = getCurrentPages()
				if(pages.length>1){
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.changeData) {
					  prePage.$vm.changeData(obj)
					  wx.navigateBack({})
					}
				}
			}
		}
	}
</script>

<style lang="less">
page,.content{
	min-height: 100%;
}
.navBar{
	min-height:100vh;
	width: 200rpx;
	background: #f8f8f8;
	.item{
		line-height:100rpx;
		padding-left:30rpx;
		position: relative;
		&.red{
			background: #fff;
		}
		.line{
			position:absolute;
			background: #b40000;
			width: 3px;
			height:40rpx;
			top:30rpx;
			left:0;
		}
	}
}
</style>
