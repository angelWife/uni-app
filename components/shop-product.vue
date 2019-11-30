<template>
	<view class="productContent clearfix">
		<view class="item" v-for="(obj,ind) in dataList" :key="ind">
			<view class="item-box">
				<view class="pic">
					<image :src="obj.pic" mode="widthFix"></image>
				</view>
				<view class="prd_msg">
					<view class="name clamp clamp-1">{{ obj.name }}</view>
					<view class="price flex just-con-b">
						<view class="red">
							<text class="fs10">¥</text>
							<text class="fs16">{{ obj.price }}</text>
							<text v-if="listType == 'wallet'" class="c999">
								(2000星票)
							</text>
							<text v-else class="mark fs10">拼</text>
						</view>
						<view v-if="listType != 'wallet'" class="fs12 c999">已售{{obj.salesNum}}</view>
					</view>
					<view v-if="listType == 'wallet'" class="fs10 c999">
						已兑14.8万件
					</view>
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
			listType:{
				type: String,
				default() {
					return '';
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
		padding:0 10rpx;
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
