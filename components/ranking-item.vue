<template>
	<view class="content">
		<view class="item flex item-center" v-for="(item,index) in list" :key="index">
			<view class="icon">
				<image :src="item.icon" :class="'pic'+index" mode="widthFix"></image>
			</view>
			<view class="name flex-1" @tap="chooseRank(item)">
				{{item.name}}
			</view>
			<view class="share">
				<button type="red" class="radiuBtn" size="mini" open-type="share">分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ranking-item',
		props: {
			list: {
				// 要显示的数组
				type: Array,
				default() {
					return [];
				}
			}
		},
		methods:{
			chooseRank(obj){
				this.$emit("setRank",obj);
			}
		}
	}
</script>

<style lang="less">
.content{
	border:0;
}
.item{
	padding:20rpx 0;
	
}
.icon{
	width: 40rpx;
	margin:0 20rpx;
	height:40rpx;
	overflow: hidden;
	position:relative;
	image{
		position:absolute;
		top:0;
		left:0;
		&.pic1{
			top:-54rpx;
		}
		&.pic2{
			top:-118rpx;
		}
		&.pic3{
			top:-182rpx;
		}
		&.pic4{
			top:-240rpx;
		}
	}
	
}
.name{
	width: 50%;
}
.share{
	padding:0 20rpx;
}
</style>
