<template>
	<view class="content pagebg">
		<view class="modal input flex">
			<view class="name">申请类型</view>
			<view class="textBox flex-1">
				<text v-if="ordertype=='hasgoods'">退货退款</text>
				<text v-else>退款</text>
			</view>
		</view>
		<view class="modal input flex">
			<view class="name">申请原因</view>
			<view class="textBox flex-1" :class="{ c999: !hasChoose }" @tap="showList">
				{{ reason }}
			</view>
		</view>
		<view class="modal input flex">
			<view class="name">退款金额</view>
			<view class="textBox flex-1">
				¥{{orderData.price}}
			</view>
		</view>
		<view class="expalin">
			<view class="title">申请说明</view>
			<textarea name="" val="reasontext" maxlength="100" class="mytext" placeholder="（必填）请详细描述申请原因"
			 @input="areaChange"></textarea>
		</view>
		<view class="modal input flex">
			<view class="name">联系电话</view>
			<view class="textBox flex-1">
				{{orderData.phone}}
			</view>
		</view>
		<view class="footBtn">
			<button type="red" @tap="orderRefound">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason: "点击选择申请原因",
				reasontext: '',
				hasChoose: false,
				reasonList: '',
				reasonKey: '',
				orderData: {},
				ordertype: ''
			};
		},
		onLoad(options) {
			debugger
			let orderData = JSON.parse(options.orderData)
			this.orderData = orderData
			this.ordertype = options.type
			let title = ''
			if (this.ordertype == "hasgoods") {
				title = '申请退货退款'
			} else {
				title = '申请退款'
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		onShow() {
			this.getReasons()
		},
		methods: {
			areaChange(e) {
this.reasontext=e.detail.value
			},
			getReasons() {
				let self = this
				this.$acFrame.HttpService.returnReasons().then(res => {
					if (res.success) {
						self.reasonList = res.data.map((v) => {
							return v.val
						})
					}
				})
			},
			orderRefound() {
				let self = this
				let params = {
					askNum: this.orderData.askNum,
					explainBuyer: this.reasontext,
					orderDetailId: this.orderData.orderDetailId,
					orderId: this.orderData.orderId,
					reasonType: this.reasonKey
				}
				if (this.ordertype == "hasgoods") {
					this.$acFrame.HttpService.orderRefound(params).then(res => {
						if (res.success) {
							self.$acFrame.Util.mytotal('申请成功！');
							setTimeout(() => {
								uni.redirectTo({
									url: 'afterSale'
								})
							}, 1500)
						}
					})
				}else{
					params.moneyAsk = this.orderData.price
					this.$acFrame.HttpService.orderRefoundMoney(params).then(res => {
						if (res.success) {
							self.$acFrame.Util.mytotal('申请成功！');
							setTimeout(() => {
								uni.redirectTo({
									url: 'afterSale'
								})
							}, 1500)
						}
					})
				}
				
			},
			showList() {
				let self = this
				uni.showActionSheet({
					itemList: this.reasonList,
					success: function(res) {
						self.hasChoose = true
						self.reason = self.reasonList[res.tapIndex];
						self.reasonKey = res.tapIndex + 1
						console.log(self.reason)
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.content {
		padding: 20rpx 24rpx 0;
	}

	.modal {
		background: #fff;
		border-radius: 0.3m;
		margin-bottom: 20rpx;

		.name {
			width: 150rpx;
		}

		input {
			height: 100rpx;
			line-height: 100rpx;
		}
	}

	.input {
		line-height: 100rpx;
		height: 100rpx;
		padding: 0 20rpx;
	}

	.expalin {
		margin-bottom: 20rpx;

		.title {
			line-height: 60rpx;
		}

		.mytext {
			width: 100%;
			height: 240rpx;
			background: #fff;
			border-radius: 0.3m;
			padding: 20rpx;
			box-sizing: border-box;
		}
	}

	.footBtn {
		padding: 24rpx;
		margin-top: 40rpx;
	}
</style>
