<template>
	<view class="content">
		<view class="clearfix">
			<view v-for="(item, index) in list" :key="index" class="item flex item-center">
				<view class="pic" :style="'background:url('+setImg(item.imgPath)+') center center no-repeat;background-size:100% auto;'" @tap="showPic(item.imgPath)">
					<!-- <image :src="" mode="widthFix" @tap="showPic(item.imgPath)">
						
					</image> -->
					<text v-if="showNum" class="shownum" :class="'num'+index">item</text>
				</view>
				<view class="msg flex-1" @tap="choosePord(item)">
					<view class="name clamp clamp-2">{{ item.goodsName }}</view>
					<view class="nums c999" v-if="item.isSellOut">已售罄</view>
					<view class="nums c999" v-else>已售{{ item.numTotalSale }}件</view>
					<view class="price red">
						<text>¥</text>
						<text class="fs18">{{ item.priceSale }}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="nodata" class="noData flex f-row just-con-c item-center">
			<view class="text-center">
				<image src="/static/images/nodata.png" mode="widthFix"></image>
				<view class="text-center c666 fs16">
					这里还没有内容
				</view>
			</view>
		</view>
		<view class="noMore" v-if="nomore">
			~已经到底了！~
		</view>
	</view>
</template>

<script>
export default {
	name: 'product-item',
	props: {
		list: {
			// 要显示的数组
			type: Array,
			default() {
				return [];
			}
		},
		fromShop: {
			// 是否是详情
			type: Boolean,
			default() {
				return false;
			}
		},
		nodata: {
			// 是否是详情
			type: Boolean,
			default() {
				return false;
			}
		},
		nomore: {
			// 是否是详情
			type: Boolean,
			default() {
				return false;
			}
		},
	},
	data() {
		return {};
	},
	methods: {
		showPic(src) {
			this.$acFrame.Util.showBigPic(src, [src]);
		},
		choosePord(obj){
			 this.$emit('setProduct',obj)
			/* uni.navigateTo({
				 url: 'productDetail?id='+obj.goodsId
			}); */
		},
		setImg(src){
			return  this.$acFrame.Util.setImgUrl(src);
		},
	}
};
</script>

<style lang="less">
.content {
	border: 0;
}
.item {
	padding: 20rpx 20rpx 0;
}
.pic {
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
	border-radius: 0.3em !important;
	position: relative;
	.shownum{
		position:absolute;
		background: #f6f6f6;
		text-align: center;
		height:40rpx;
		width: 40rpx;
		line-height: 40rpx;
		border-radius: 40rpx;
		color:#999;
		left:10rpx;
		top:10rpx;
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
