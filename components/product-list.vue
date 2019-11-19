<template>
	<view class="content">
		<view v-for="(item, index) in list" :key="index" class="item flex item-center">
			<view class="pic"><image :src="item.pic" mode="widthFix" @tap="showPic(item.pic)"></image></view>
			<view class="msg flex-1" @tap="choosePord(item)">
				<view class="name clamp clamp-2">{{ item.name }}</view>
				<view class="nums c999">已售{{ item.salesNum }}件</view>
				<view class="price red">
					<text>¥</text>
					<text class="fs18">{{ item.price }}</text>
				</view>
			</view>
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
		}
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
		}
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
	border-radius: 0.3em;
}
.nums{
	padding:10rpx 0;
}
.msg {
	width: 50%;
	margin-left: 20rpx;
}
</style>
