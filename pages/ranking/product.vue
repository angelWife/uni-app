<template>
	<view class="content ">
		<view class="advent" style="background:url() center center no-repeat;background-size:100% auto;"></view>
		<view class="productList">
			<view v-for="(item, index) in productList" :key="index" class="item flex">
				<view class="pic" :style="'background:url('+setImg(item.imgPath)+') center center no-repeat;background-size:100% auto;'" @tap="showPic(item.imgPath)">
					<!-- <image :src="" mode="widthFix" @tap="showPic(item.imgPath)">
						
					</image> -->
					<text v-if="showNum" class="shownum" :class="'num'+index">{{index+1}}</text>
				</view>
				<view class="msg flex-1" @tap="choosePord(item)">
					<view class="name clamp clamp-2">{{ item.goodsName }}</view>
					<view class="nums c999">已售{{ item.numTotalSale }}件</view>
					<view class="price red">
						<text>¥</text>
						<text class="fs18">{{ item.priceSale }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList:[],
				showNum:true
			};
		},
		onShow(){
			this.initData()
		},
		methods:{
			initData(){
				let self = this
				this.$acFrame.HttpService.prodRank().then(res=>{
					if(res.success){
						self.productList = res.data
					}
				})
			},
			setImg(src){
				return  this.$acFrame.Util.setImgUrl(src);
			},
		}
	}
</script>

<style lang="less">
.advent{
	height:320rpx;
}
.item {
	padding: 20rpx 20rpx 0;
}
.pic {
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
	border-radius: 0.3em;
	position: relative;
	.shownum{
		position:absolute;
		background: #f6f6f6;
		text-align: center;
		height:40rpx;
		width: 40rpx;
		font-size:20rpx;
		line-height: 40rpx;
		border-radius: 0.4em;
		color:#999;
		left:0;
		top:0;
	}
	.num0{
		background: #B40000;
		color:#fff;
	}
	.num1{
		background: #ff9d19;
		color:#fff;
	}
	.num2{
		background: #4c8ff7;
		color:#fff;
	}
	
}
.nums{
	padding:10rpx 0;
}
.msg {
	width: 50%;
	margin-left: 20rpx;
}
</style>
