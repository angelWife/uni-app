<template>
	<view class="content">
		<view class="">
			<view class="navBar">
				<view v-for="(item,index) in bar" :key="index" class="item" :class="{'red':item.key==cur}" @tap="chooseTab(item.key)">
					{{item.val}}
					<text class="line" v-if="item.key==cur"></text>
				</view>
			</view>
			<view class="listBox">
				<view class="productList" v-if="showProduct">
					<ProductList :list="productList" @setProduct="chooseRes"></ProductList>
				</view>
				<view class="rankList" v-else>
					<RankList :list="rankList" @setRank="chooseRes"></RankList>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ProductList from '@/components/product-list.vue';
	import RankList from '@/components/ranking-item.vue';
	export default {
		props: {
			showNum: {
				// 要显示的数组
				type: Boolean,
				default () {
					return false;
				}
			},
		},
		components:{
			ProductList,
			RankList
		},
		data() {
			return {
				showProduct:true,
				bar:[{name:'商品',choose:true},{name:'排行',choose:false}],
				productList:[],
				rankList:[{"icon":"","name":"AAAAAAAA"}],
				cur:1,
				pageIndex:1,
			};
		},
		onLoad(options){
			var self = this;
			this.$acFrame.HttpService.get("dict/article/infoItemLinkTypeList").then(res => {
					console.log(res);
			    if(res.success){
					console.log(res.data);
					self.bar=res.data;
					self.chooseTab(1);
				}else{
			
				}
			})
		},
		methods:{
			chooseTab(index){
				var self = this;
				this.cur = index;
				if(index==1){
					this.showProduct = true;
					var parms = {"loadOwner":true,"pageIndex":this.pageIndex,"pageSize":500};
					this.$acFrame.HttpService.post("product/goods/table_data",parms).then(res => {
							console.log(res);
					    if(res.success){
							console.log(res.data);
							var goods = res.data.rows;
							self.productList = goods.concat(goods).concat(goods)
						}else{
					
						}
					})
				}else{
					
					this.showProduct = false;
					this.$acFrame.HttpService.get("dict/sys/rankTypeList").then(res => {
							console.log(res);
					    if(res.success){
							console.log(res.data);
							var ranks = res.data;
							self.rankList=ranks;
						}else{
					
						}
					})
				}
			},
			getGoods(){
				
			},
			chooseRes(obj){
				let pages = getCurrentPages()
				debugger
				obj.type = this.cur
				if(pages.length>1){
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.setLink) {
					  prePage.$vm.setLink(obj)
					  wx.navigateBack({})
					}
				}
			}
		},
		/* onReachBottom: function () {
			if(this.cur==1){
				this.pageIndex += 1;
				var parms = {"loadOwner":true,"pageIndex":this.pageIndex,"pageSize":100};
				this.$acFrame.HttpService.post("product/goods/table_data",parms).then(res => {
						console.log(res);
				    if(res.success){
						console.log(res.data);
						var goods = res.data.rows;
						var temps = [];
						goods.forEach(function(item){
							temps.push({name:item.goodsName,priceSale:item.priceSale,numTotalSale:item.numTotalSale,pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'});
						});
						self.productList.push(temps);
					}else{
				
					}
				})
			} 
		}*/
	}
</script>

<style lang="less">
page,.content{
	min-height: 100%;
	
}
.listBox{
	padding-left:200rpx;
	padding-bottom:20rpx;
}
.navBar{
	min-height:100vh;
	width: 200rpx;
	background: #f8f8f8;
	position: fixed;
	z-index: 10;
	top:0;
	left:0;
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
