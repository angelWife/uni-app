<template>
	<view class="content">
		<view class="info">
			<view class="mark flex f-col just-con-c">
				<view class="pic">
					<image src="/static/images/head2.png" mode="widthFix"></image>
				</view>
				<view class="text">
					打赏小白熊的帖子
				</view>
			</view>
		</view>
		<view class="rewardList">
			<view class="title flex">
				<view class="flex-1">打赏记录</view>
				<view class="c999 text-right">
					他收到过{{dataList.length}}次打赏
				</view>
			</view>
			<scroll-view scroll-y>
				<view v-for="(item,ind) in dataList" :key="ind" class="item flex item-center">
					<view class="pic">
						<image src="/static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="name">
						林丁洋
					</view>
					<view class="msg c999 text-right flex-1">
						打赏10个西瓜
					</view>
				</view>

				<view v-if='dataList.length==0' class="noData flex f-row just-con-c item-center">
					<view class="text-center">
						<image src="/static/images/nodata.png" mode="widthFix"></image>
						<view class="text-center c666 fs16">
							这里还没有内容
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="rewardBtn" @tap="rewardPeople">
			我要打赏
		</view>
		<rewardList :showReward="showReward"  @hideModal="hideModal"></rewardList>
	</view>
</template>
<script>
	let giftModal = uni.createAnimation({
		duration: 300,
		timingFunction: "ease",
		delay: 0
	})
	import rewardList from '@/components/reward-modal.vue';
	export default {
		components: {
			rewardList
		},
		data() {
			return {
				showReward: false,
				modalBar: [{
					name: '礼物',
					active: true
				}, {
					name: '我的道具',
					active: false
				}],
				dataList:[],
				animationData: {},
				usename: 'xp'
			}
		},
		onLoad(options) {
			this.articleId = options.articleId
		},
		onShow() {
             this.initData()
		},
		methods: {
			initData() {
				let self = this
				let params = {
					articleId: this.articleId,
					pageIndex: 1,
					pageSize: 100
				}
				this.$acFrame.HttpService.rewardList(params).then(res=>{
					if(res.success){
						self.dataList=res.data?res.data:[]
					}
				})
			},
			rewardPeople() {
				this.showReward = true
			},
			hideModal() {
				this.showReward = false
			},
			chooseItem(ind) {
				console.log(ind)
			},
			rewardInit() {
				this.showmask = false
			}
		}
	}
</script>
<style lang="less">
	page,
	.content {
		height: 100%;
	}

	.info {
		height: 240rpx;
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		overflow: hidden;
		background: url('http://img.taopic.com/uploads/allimg/120925/235089-12092500254595.jpg') center center no-repeat;
		background-color: rgba(0, 0, 0, 0.3);
		background-size: 100% auto;
		text-align: center;
		position: relative;

		.mark {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.3);
		}

		.pic {
			image {
				width: 100rpx;
				border-radius: 100rpx;
			}
		}

		.text {
			margin-top: 10rpx;
			color: #fff;
		}
	}

	.rewardList {
		height: calc(100% - 320rpx);

		.title {
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 20rpx;
		}

		scroll-view {
			height: calc(100% - 80rpx);
		}

		.item {
			height: 100rpx;
			line-height: 100rpx;

			.pic {
				height: 60rpx;
				width: 60rpx;
				line-height: 60rpx;
				margin: 10rpx 20rpx;
				border-radius: 60rpx;
				overflow: hidden;
			}

			.name,
			.msg {
				border-top: 1px solid #efefef;
				padding-right: 20rpx;
			}
		}
	}

	.rewardBtn {
		background: #b40000;
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	

	.modalBody {
		height: 100%;
	}

	/*checkbox 选项框大小  */
	checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
	}

	/*checkbox选中后样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #B40000;
	}

	/*checkbox选中后图标样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>
