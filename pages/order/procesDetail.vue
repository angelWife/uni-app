<template>
	<view class="content pagebg">
		<view class="modal mod1" v-if="details.status == 1">
			<view class="fs16 red">{{details.statusRefund?details.statusRefund:''}}</view>
			<view>
				剩余处理时间：
				<block v-if="show_time">
					<uni-count-down :show-day="false" :backgroundColor="backgroundColor" :color="color" :splitorColor="color"
					 :show-style="false" :fontSize="fontSize" :hour="hour" :minute="minute" :second="second" />
				</block>
			</view>
		</view>
		<view class="modal mod2 flex item-center">
			<view class="pic">
				<image :src="setImg(details.shopInfo.imgPath)" mode="widthFix" />
			</view>
			<view class="name">{{details.shopInfo.name}}</view>
		</view>
		<view class="modal">
			<view class="item flex">
				<view class="name c999">
					申请类型
				</view>
				<view class="flex-1">{{details.type==2?'退货退款':'退款'}}</view>
			</view>
			<view class="item flex">
				<view class="name c999">
					申请原因
				</view>
				<view class="flex-1">{{details.reasonType?reasonList[details.reasonType]:'--'}}</view>
			</view>
			<view class="item flex">
				<view class="name c999">
					退款金额
				</view>
				<view class="flex-1">{{details.moneyAsk?details.moneyAsk:0.00}}</view>
			</view>
			<view class="item flex">
				<view class="name c999">
					申请说明
				</view>
				<view class="flex-1">{{details.explainBuyer?details.explainBuyer:'--'}}</view>
			</view>
			<view class="item flex">
				<view class="name c999">
					商品名称
				</view>
				<view class="flex-1">{{details.detailList[0].goodsName?details.detailList[0].goodsName:'--'}}</view>
			</view>
			<view class="item flex">
				<view class="name c999">
					订单编号
				</view>
				<view class="flex-1">{{details.orderInfo.code?details.orderInfo.code:'--'}}</view>
			</view>
			<view class="item flex">
				<view class="name c999">
					申请时间
				</view>
				<view class="flex-1">{{details.createTime}}</view>
			</view>
			<view class="item">
				<block v-if="details.status==1">
					<button type="rednull" @tap="cancelRefund(details.id)">取消申请</button>
				</block>
				<block v-if="details.status==2||details.status==4">
					<button type="rednull" @tap="refundAgain">重新申请</button>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountDown from "@/components/countDown.vue";
	export default {
		components: {
			uniCountDown
		},
		data() {
			return {
				show_time: true,
				color: '#666',
				backgroundColor: 'none',
				details: {},
				hour: 0,
				minute: 0,
				second: 0,
				orderStatus: [],
				reasonList: []
			};
		},
		onLoad(options) {
			this.id = options.id
			uni.setNavigationBarTitle({
				title: '售后详情'
			})
		},
		onShow() {
			this.getReasons()
			this.getStatus()
			this.getDetail()
		},
		methods: {
			init_time() {
				var time = new Date(this.details.timeEnd);
				this.hour = time.getHours();
				this.minute = time.getMinutes();
				this.second = time.getSeconds();
				this.show_time = false;
				setTimeout(() => {
					this.show_time = true
				}, 300)
			},
			getReasons() {
				let self = this
				this.$acFrame.HttpService.returnReasons().then(res => {
					if (res.success) {
						res.data.filter(function(item) {
							self.reasonList[item.key] = item.val;
						});
					}
				})
			},
			getStatus() {
				let self = this;
				this.$acFrame.HttpService.refundStatus().then(res => {
					if (res.success) {
						console.log(res.data);
						var tabs = res.data;
						var st = {};
						tabs.filter(function(item) {
							self.orderStatus[item.key] = item.val;
						});
					}
				})
			},
			getDetail() {
				let self = this
				console.log(this.id);
				this.$acFrame.HttpService.refundDetail({
					id: this.id
				}).then(res => {
					if (res.success) {
						let _data = res.data;
						_data.createTime = self.$acFrame.Util.formatTime(_data.createTime)
						self.details = _data;
						self.init_time()
					}
				})
			},
			cancelRefund(id) {
				let self = this
				this.$acFrame.HttpService.cancelRefund({
					id: id
				}).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('取消售后成功！')
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							});
						}, 1000)
					}
				})
			},
			refundAgain() {
				let obj = {
					orderId: this.details.orderId,
					orderDetailId: this.details.detailList[0]?this.details.detailList[0].id:'',
					price: this.details.moneyAsk,
					askNum: this.details.detailList[0]?this.details.detailList[0].buyNum:'',
					phone: this.details.address ? this.details.address.receiverMobilePhone : ''
				}
				let type = this.details.type == 2 ? 'hasgoods' : 'nullgoods'
				uni.navigateTo({
					url: '/pages/order/returnForm?orderData=' + JSON.stringify(obj) + '&type=' + type
				})
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			},
		}
	};
</script>

<style lang="less" scoped>
	.modal {
		background: #fff;
		padding: 24rpx;
		margin-bottom: 20rpx;

		.item {
			padding: 20rpx 0;

			.name {
				width: 160rpx;
			}
		}
	}

	.mod1 {
		line-height: 60rpx;
		padding: 20rpx 24rpx;
	}

	.mod2 {
		.pic {
			height: 60rpx;
			width: 60rpx;
			border-radius: 60rpx;
			overflow: hidden;
			margin-right: 20rpx;
		}
	}
</style>
