<template>
	<view class="productContent clearfix">
		<view class="item" v-for="(item,ind) in dataList" :key="ind" @tap="goodsDetail(item.goodsId)">
			<view class="item-box">
				<view class="pic">
					<image :src="setImg(item.imgPath)" mode="widthFix"></image>
				</view>
				<view class="prd_msg">
					<view class="name clamp clamp-1">{{ item.goodsName }}</view>
					<view class="price flex just-con-b">
						<view class="red">
							<text class="fs10">¥</text>
							<text class="fs16">{{ item.priceSale }}</text>
							<text v-if="item.accountType==2" class="c999">
								(2000星票)
							</text>
							<text v-if="item.flagSpell" class="mark fs10">拼</text>
						</view>
						<view v-if="listType != 'wallet'" class="fs12 c999">已售{{item.numTotalSale}}</view>
					</view>
					<view v-if="listType == 'wallet'" class="fs10 c999">
						已兑14.8万件
					</view>
				</view>
			</view>
		</view>
		<view v-if="nomore" class="noMore">
			~已经到底了！~
		</view>
		<view v-if="nodata" class="noData flex f-row just-con-c item-center">
			<view class="text-center">
				<image src="/static/images/nodata.png" mode="widthFix"></image>
				<view class="text-center c666 fs16">
					这里还没有内容
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataList: {
				type: Array,
				default() {
					return [];
				}
			},
			nodata:{
				type: Boolean,
				default() {
					return '';
				}
			},
			nomore:{
				type: Boolean,
				default() {
					return '';
				}
			}
		},
		onShow(){
			console.log(this.dataList)
		},
		data() {
			return {
				
			};
		},
		methods:{
			setImg(src){
				return  this.$acFrame.Util.setImgUrl(src);
			},
			goodsDetail(id){
				uni.navigateTo({
					url:`/pages/myshop/productDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="less">
.productContent{
	padding:20rpx 10rpx 0;
	.item{
		float:left;
		width: 50%;
		padding:0 20rpx;
		margin-bottom:20rpx;
		.item-box{
			border-radius:0.3em;
			overflow: hidden;
			box-shadow: 0 0 5px rgba(0,0,0,0.2);
		}
		.pic{
			width: 100%;
			height:calc((100vw - 20rpx) / 2 - 20px);
			overflow: hidden;
		}
		.prd_msg{
			padding:0 10rpx 20rpx;
		}
		.name{
			margin:10rpx 0;
			text-align: justify;
		}
		.mark{
			position:relative;
			top:-2rpx;
			display: inline-block;
			padding:0 8rpx;
			border:1px solid #b40000;
			border-radius: 14rpx;
			margin-left:10rpx;
			
		}
		.price{
			padding:0 0 10rpx;
		}
	}
}
</style>
