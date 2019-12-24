<template>
	<view class="content">
		<view class="item flex item-center" v-for="(item,index) in list" :key="index" @tap="linkTo(item.key)">
			<view class="icon">
				<image :src="'/static/images/ranking/'+item.key+'.png'" mode="widthFix"></image>
			</view>
			<view class="name flex-1">
				{{item.val}}排行榜
			</view>
			<view class="share" @tap.stop="chooseRank(item)">
				<button type="red" class="radiuBtn" size="mini">邀请</button>
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
				default () {
					return [];
				}
			}
		},
		methods: {
			chooseRank(obj) {
				this.$emit("setRank", obj);
			},
			linkTo(key) {
				let url = ''
				switch (key) {
					case 1:
						url = '/pages/ranking/friends'
						break;
					case 2:
						url = '/pages/ranking/post'
						break;
					case 3:
						url = '/pages/ranking/invitation'
						break;
					case 4:
						url = '/pages/ranking/product'
						break;
					case 5:
						url = '/pages/ranking/product'

						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		border: 0;
	}

	.item {
		padding: 20rpx 0;

	}

	.icon {
		width: 40rpx;
		margin: 0 20rpx;
		height: 40rpx;
		overflow: hidden;
		position: relative;

		image {
			position: absolute;
			top: 0;
			left: 0;

			&.pic1 {
				top: -54rpx;
			}

			&.pic2 {
				top: -118rpx;
			}

			&.pic3 {
				top: -182rpx;
			}

			&.pic4 {
				top: -240rpx;
			}
		}

	}

	.name {
		width: 50%;
	}

	.share {
		padding: 0 20rpx;
	}
</style>
