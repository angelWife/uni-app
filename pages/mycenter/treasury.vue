<template>
	<view class="content">
		<view class="tabBox clearfix">
			<view class="item" v-for="(item,ind) in tabList" :key="ind" :class="{'active':item.choose}" @tap="chooseTap(ind)">
				<text class="name">{{item.name}}</text>
				<text class="line"></text>
			</view>
		</view>
		<view class="listBox">
			<view class="conpont" v-if="showModal=='coupon'">
				<block v-for="(item,ind) in couponList" :key="ind">
					<view class="item flex red item-center" :class="{'hasReceived':item.statusReceive==4}" @tap="chooseConpons(item,ind)">
						<view class="left">
							<block v-if="item.effectType == 1">

								<text class="fs40 blod">{{item.effectVal}}</text>
								<text class="fs12">元</text>
							</block>
							<block v-else>
								<text class="fs40 blod">{{item.effectVal}}</text>
								<text class="fs12">折</text>
							</block>

						</view>
						<view class="center flex-1">
							<view class="text blod">满{{item.priceFull}}可使用</view>
							<view class="fs12">
								{{item.type==1?"本店通用":"部分商品使用"}}<text>{{item.shopInfo?"【"+item.shopInfo.name+"】":""}}</text>
							</view>
							<view class="fs10">
								{{item.timeStart}} ~ {{item.timeEnd}}
							</view>
						</view>
						<block v-if="item.statusReceive==4">
							<view class="right fs15 blod">
								暂不可用
							</view>
						</block>
						<block v-else>
							<view class="right fs15 blod">
								立即使用
							</view>
						</block>

					</view>
				</block>

			</view>
			<view v-else class="goods">
				<view v-for="(item, ind) in goodsList" :key="ind" class="item" @touchstart="touchstart" @touchend="touchend($event, ind)">
					<view class="newBox flex item-center" :style="item.style" @tap="readyNews(ind)">
						<view class="pic">
							<image :src="setImg(item.virtualVo.imgPath)" mode="widthFix" />
						</view>
						<view class="main">
							<view class="title fs16">{{item.virtualVo.name}}</view>
							<view class="text c999">
								{{item.virtualVo.briefInfo?item.virtualVo.briefInfo:''}}
							</view>
						</view>
					</view>
					<view class="btn delete float-right">使用</view>
					<view class="btn look float-right" @tap="backGoods(item)">回收</view>
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
				tabList: [{
					name: '优惠券',
					choose: true,
					type: 'coupon'
				}, {
					name: '虚拟物品',
					choose: false,
					type: 'goods'
				}],
				showModal: 'coupon',
				couponList: [],
				goodsList: [],
				pageTotal: 1,
				pageIndex: 1,
				pageSize: 10,
				t_x: 0,
				t_y: 0,
				nomore: false,
				nodata: false
			};
		},
		onShow() {
			this.getCoupon()
		},
		onPullDownRefresh() {
			if (this.showModal == 'coupon') {
				this.getCoupon()
			} else {
				this.setparams()
				this.getReceiveList()
			}
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.showModal == 'goods') {
				if (this.pageIndex < this.pageTotal) {
					this.pageIndex++
					this.getReceiveList()
				} else {
					this.nomore = true
				}
			}

		},
		methods: {
			setparams() {
				this.pageIndex = 1
				this.pageSize = 20
				this.nomore = false
				this.nodata = false
				this.goodsList = []
			},
			chooseTap(ind) {
				let tabList = this.tabList
				tabList.filter((v, i) => {
					if (i == ind) {
						v.choose = true
						this.showModal = v.type
					} else {
						v.choose = false
					}
				})
				this.setparams()
				if (this.showModal == 'goods') {
					this.getReceiveList()
				} else {
					this.getCoupon()
				}
				this.tabList = tabList
			},
			getCoupon() {
				let self = this
				let params = {
					pageIndex: 1,
					pageSize: 20,
				}
				self.$acFrame.HttpService.couponsList(params).then(res => {
					if (res.success) {
						let couponList = res.data.rows
						couponList.filter(v => {
							v.hasReceived = false
							v.timeEnd = self.$acFrame.Util.formatTime(v.timeEnd, 'dayhm')
							v.timeStart = self.$acFrame.Util.formatTime(v.timeStart, 'dayhm')
						})
						self.couponList = couponList
					}
				})
			},
			getReceiveList() {
				let self = this
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
				}
				this.$acFrame.HttpService.myReceiveGoods(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							list.filter(v => {
								v.style = "left:0;"
							})
							self.goodsList = self.goodsList.concat(list)
						} else {
							this.nodata = true
						}
					}
				})
			},
			backGoods(item) {
				let self =this
				let params = {
					id:item.virtualVo.id
				}
				this.$acFrame.HttpService.myReceiveBack(params).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('回收数量为'+res.data.numTotal +'件，总回收星票'+res.data.priceBackTotal)
						setTimeout(function() {
							this.setparams()
							this.getReceiveList()
						}, 1000);
					}
				})
			},
			touchstart: function(e) {
				this.t_x = e.touches[0].pageX;
				this.t_y = e.touches[0].pageY; // 获取触摸时的原点
				// timeInterval = setInterval(function() {
				//   times++;
				// }, 50);
			},
			touchend: function(e, ind) {
				let touchMoveX = e.changedTouches[0].pageX;
				let touchMoveY = e.changedTouches[0].pageY;
				let goodsList = this.goodsList;
				let tmX = touchMoveX - this.t_x;
				let tmY = touchMoveY - this.t_y;
				let absX = Math.abs(tmX);
				let absY = Math.abs(tmY);
				if (absX > 2 * absY && absX > 5) {
					if (tmX < 0) {
						goodsList.filter((v, i) => {
							if (i == ind) {
								v.style = "left:-280rpx";
							} else {
								v.style = "left:0";
							}
						});
					} else {
						goodsList[ind].style = "left:0";
					}
				}
				this.goodsList = goodsList;
				this.t_y = 0;
				this.t_x = 0;
			},
			chooseConpons(obj, ind) {
				if (obj.statusReceive == 1) {
					uni.navigateTo({
						url: "goodsList?obj=" + JSON.stringify(obj)
					})
				} else if (obj.statusReceive == 4) {

				}

			},
			setImg(src) {
				if (!src) {
					src = ''
				}
				return this.$acFrame.Util.setImgUrl(src);
			}
		}

	}
</script>

<style lang="less">
	.fs40 {
		font-size: 60rpx;
	}

	.content {
		padding-top: 80rpx;
		min-height: 100vh;
	}

	.tabBox {
		height: 80rpx;
		position: fixed;
		width: 100%;
		z-index: 10;
		top: 0;
		left: 0;

		.item {
			line-height: 80rpx;
			width: 50%;
			float: left;
			text-align: center;
			position: relative;
			font-size: 32rpx;

			.line {
				width: 0;
				height: 0;
			}

			&.active {
				color: #b40000;
				font-weight: 600;

				.line {
					position: absolute;
					height: 2px;
					width: 68rpx;
					bottom: 10rpx;
					left: 50%;
					margin-left: -34rpx;
					background: #b40000;
				}
			}

		}
	}

	.conpont {
		padding: 10rpx 30rpx 0;

		.item {
			background: #FFF4F1;
			border-radius: 0.3em;
			overflow: hidden;
			margin: 0 0 20rpx;
			padding: 10rpx 0;

			.left {
				width: 220rpx;
				text-align: center;
			}

			.center {}

			.right {
				width: 160rpx;
				text-align: center;
				line-height: 144rpx;
				border-left: 1px dashed #b40000;
			}

			&.hasReceived {
				background: #f1f1f1;
				color: #999 !important;

				.right {
					border-color: #999;
				}
			}
		}
	}

	.goods {
		background: #fff;

		.item {
			position: relative;
			height: 140rpx;

			.btn {
				height: 100%;
				width: 140rpx;
				text-align: center;
				line-height: 140rpx;
				color: #fff;
			}

			.look {
				background: #4c8ff7;
			}

			.delete {
				background: #b40000;
			}
		}

		.newBox {
			position: absolute;
			height: 140rpx;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 2;
			background: #fff;
			transition: left 0.3s ease;
			border-bottom: 1px solid #ccc;

			.pic {
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				overflow: hidden;
				border-radius: 100rpx;
				margin: 0 40rpx;
			}

			.main {
				height: 140rpx;
				padding: 24rpx 0;

				.text {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
