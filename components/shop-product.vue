<template>
	<view class="productContent clearfix">
		<view class="item" v-for="(obj,ind) in dataList" :key="ind">
			<view class="item-box">
				<view class="pic">
					<image :src="obj.pic" mode="widthFix"></image>
				</view>
				<view class="name clamp clamp-1">{{ obj.name }}</view>
				<view class="price flex just-con-b">
					<view class="red">
						<text class="fs10">¥</text>
						<text class="">{{ obj.price }}</text>
						<text class="mark fs10">拼</text>
					</view>
					<view class="fs12 c999">已售{{obj.salesNum}}</view>
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
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.productContent{
	padding:0 10rpx;
	.item{
		float:left;
		width: 50%;
		padding:0 10px;
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
		.name{
			margin:20rpx 10rpx;
			text-align: justify;
		}
		.mark{
			display: inline-block;
			padding:0 8rpx;
			border:1px solid #b40000;
			border-radius: 14rpx;
			margin-left:10rpx;
			
		}
		.price{
			padding:0 10rpx 20rpx;
		}
	}
}
</style>
