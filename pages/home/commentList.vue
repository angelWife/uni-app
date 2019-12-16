<template>
	<view class="content">
		<view class="item selfComment flex">
			<view class="img">
				<image :src="setImg(details.headPic)" mode="widthFix"></image>
			</view>
			<view class="flex-1 head-msg">
				<view class="clearfix">
					<text class="name fs15 blod">{{details.userName}}</text>
					<text class="rank">{{details.militaryRankType}}</text>
					<view class="float-right dianzan c999 fs12" :class="{'red':details.hasUp}" @tap="dianzan(details.id)">
						<icon class="iconfont icon-dianzan"></icon>
						{{details.numTotalUp }}
					</view>
				</view>
				<view class="text">
					{{details.content}}
				</view>
				<view class="timer c999 fs12 clearfix">
					<text class="m-r-20">{{details.timeInfo}}</text>
					<text class="blue" @tap="showComment">回复</text>
				</view>
				<view class="blue look" @tap="lookSelf">查看原帖</view>
			</view>
		</view>
		<view v-for="(item,index) in dataList" :key="index" class="item flex">
			<view class="img item-center">
				<image :src="setImg(item.headPic)" mode="widthFix"></image>
			</view>
			<view class="flex-1 head-msg">
				<view class="clearfix">
					<text class="name fs15 blod">{{item.userName}}</text>
					<text class="rank">{{item.militaryRankType}}</text>
					<view class="float-right dianzan c999 fs12" :class="{'red':item.hasUp}" @tap="dianzanList(item.id,index)">
						<icon class="iconfont icon-dianzan"></icon>
						{{item.numTotalUp }}
					</view>
				</view>
				<view class="text">
					{{item.content}}
				</view>
				<view class="timer c999 fs12 clearfix">
					<text>2{{item.timeInfo}}</text>
				</view>
			</view>
		</view>
		<view class="footInput" @tap="showComment">
			<input type="text" value="" disabled="true" placeholder="回复评论" />
		</view>
		<commentModal :showModal="showModal" @relaseComment="relaseComment" @cancelRelase="cancelRelase"></commentModal>
	</view>
</template>

<script>
	import commentModal from '@/components/comment.vue';
	export default {
		components: {
			commentModal
		},
		data() {
			return {
				showModal: false,
				pageIndex: 1,
				pageSize: 100,
				pageTotal: 1,
				details: '',
				dataList: []
			};
		},
		onLoad(options) {
			this.details = JSON.parse(options.obj)
			this.getCommentList()

		},
		methods: {
			getCommentList() {
				let self = this
				let params = {
					articleId: this.details.articleId,
					parentId: this.details.id,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				self.$acFrame.HttpService.commentList(params).then(res => {
					if (res.success) {
						let _row = res.data.rows
						_row.filter(v => {
							v.militaryRankType = self.$acFrame.Util.setRankName(v.militaryRankType)
						})
						self.dataList = _row
						self.pageTotal = res.data.pageTotal
					}
				})
			},
			showComment() {
				this.showModal = true
			},
			relaseComment(val) {
				let self = this
				let params = {
					articleId: this.details.articleId,
					articleCommentId: this.details.id,
					content: val
				}
				self.$acFrame.HttpService.relasePublishChild(params).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('评论成功！');
						self.showModal = false
						self.getCommentList()
					}
				})
			},
			cancelRelase() {
				this.showModal = false
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			},
			lookSelf() {
				wx.navigateBack()
			},
			dianzan(id) { //likeComment
				let self = this
				let params = {
					articleCommentId: id,
				}
				self.$acFrame.HttpService.commentPublish(params).then(res => {
					if (res.success) {
						if (res.data) {
							self.$acFrame.Util.mytotal('点赞成功！');
							self.details.numTotalUp++

						} else {
							self.details.numTotalUp--
							self.$acFrame.Util.mytotal('已取消！');
						}
						self.details.hasUp = res.data
					}
				})
			},
			dianzanList(id, ind) { //likeComment
				let self = this
				let params = {
					articleCommentId: id,
				}
				self.$acFrame.HttpService.commentPublish(params).then(res => {
					if (res.success) {
						if (res.data) {
							self.$acFrame.Util.mytotal('点赞成功！');
							self.dataList[ind].numTotalUp++

						} else {
							self.dataList[ind].numTotalUp--

							self.$acFrame.Util.mytotal('已取消！');
						}
						self.dataList[ind].hasUp = res.data
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.content {
		padding-bottom: 100rpx;
	}

	.item {
		padding: 0 30rpx;

		.img {
			margin-right: 20rpx;
			margin-top:20rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			overflow: hidden;
			image {
				width: 100%;
			}
		}

		.head-msg {
			padding: 20rpx;
			border-bottom: 1px solid #ccc;

			text {
				float: left;
				margin-right: 20rpx;
			}

			.text {
				padding: 10rpx 0;
			}

			.name {
				max-width: 240rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.dianzan {
				margin-top: -10rpx;

				&.red {
					color: #B40000;
				}
			}

			.rank {
				margin-top: 4rpx;
				border-radius: 40rpx;
				padding: 0 16rpx;
				background: #46d88c;
				color: #ffffff;
				font-size: 26rpx;
			}

			.shop {
				border-radius: 40rpx;
				padding: 0 16rpx;
				background: #ffaf43;
				color: #ffffff;
				font-size: 26rpx;
			}

			.look {
				margin-top: 10rpx;
			}


		}

		.timer {
			text {
				float: left;
				margin-right: 20rpx;
			}

			.mark {
				font-size: 22rpx;
				border-radius: 30rpx;
				line-height: 32rpx;
				padding: 0 16rpx;
				border: 1px solid #b40000;
				color: #b40000;
				margin-top: 10rpx;
			}
		}

		&.selfComment {
			border-bottom: 1px solid #ccc;

			.head-msg {
				border: 0;
			}
		}
	}

	.footInput {
		height: 100rpx;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		padding: 18rpx 24rpx;
		border-top: 1px solid #ccc;

		input {
			height: 64rpx;
			line-height: 64rpx;
			padding: 0 20rpx;
			border-radius: 64rpx;
			border: 1px solid #ccc;
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
