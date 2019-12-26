<template>
	<view class="content">
		<view class="item flex" v-for="(item,ind) in newsList" :key="ind">
			<view class="pic" @tap="mycenter(item.userInfo)">
				<image :src="setImg(item.userInfo?item.userInfo.imgPath:'')" mode="widthFix"></image>
			</view>
			<view class="flex-1">
				<view class="title">
					<text class="name fs16" @tap="mycenter(item.userInfo)">{{item.userInfo?item.userInfo.name:'--'}}</text>
					<text v-if="type==2" class="c999"></text>
				</view>
				<view class="msg" @tap="articlDetail(item)">
					{{item.content}}
				</view>
				<view class="time fs12 c999">
					{{item.createTime}}
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
		data() {
			return {
				type: 1,
				newsList: [],
				pageSize: 20,
				pageIndex: 1,
				pageTotal: 1,
				nodata: false,
				nomore: false
			};
		},
		onLoad(options) {
			this.type = options.type
			let title = ''
			if (this.type == 1) {
				title = '系统消息'
			} else if (this.type == 2) {
				title = '文章消息'
			} else if (this.type == 3) {
				title = '订单消息'
			}
			uni.setNavigationBarTitle({
				title: title
			})
		},
		onShow() {
			this.getNewsList()
		},
		onPullDownRefresh() {
			this.setParams()
			this.getNewsList()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.getNewsList()
			} else {
				this.nomore = true
			}
		},
		methods: {
			setParams() {
				this.pageIndex = 1
				this.nomore = false
				this.nodata = false
				this.newsList = []
			},
			getNewsList() {
				let self = this
				let params = {
					fromType: this.type,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				this.$acFrame.HttpService.newsList(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							list.filter(v => {
								v.createTime = self.$acFrame.Util.formatTime(v.createTime, 'day')
							})
							self.newsList = self.newsList.concat(list)
						} else {
							self.nodata = true
						}
					}
				})
			},
			setImg(src) {
				if (!src) {
					src = ''
				}
				return this.$acFrame.Util.setImgUrl(src);
			},
			mycenter(info) {
				uni.navigateTo({
					url: 'mycenter?userCode=' + info.userCode
				})
			},
			articlDetail(id) {
				uni.navigateTo({
					url: "/pages/home/commentDetail?articalId=" + id
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		min-height: 100vh;
	}

	.item {
		margin: 0 30rpx;
		border-bottom: 1px solid #ccc;
		padding: 20rpx 0;

		.pic {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			overflow: hidden;
			margin-right:20rpx;
		}
		.msg{
			padding:10rpx 0;
		}
	}
</style>
