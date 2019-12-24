<template>
	<view class="content pagebg">
		<view class="timer">
			剩余
			<block v-if="show_time">
				<uni-count-down :show-day="false" :color="color" :backgroundColor="backgroundColor" :splitorColor="color"
				 :show-style="false" :fontSize="fontSize" :hour="hour" :minute="minute" :second="second" />
			</block>
			自动取消订单
		</view>
		<view class="modal logist flex item-center" v-if="details.logistics.carrierName">
			<view class="pic">
				<image src="/static/images/icon-logist.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1">
				<text class="c999">物流编号：</text>
				<text class="">{{details.logistics.carrierName}}</text>
			</view>
			<view>
				{{details.logistics.logisticsNo}}
			</view>
			<view class="copy blue">
				复制
			</view>
		</view>
		<view class="modal address flex item-center">
			<view class="pic">
				<image src="/static/images/icon-address.png" mode="widthFix"></image>
			</view>
			<view class="msg flex-1">
				<view class="name">
					<text class="fs15">{{details.address.receiverName}}</text>
					<text class="c999">{{details.address.receiverMobilePhone}}</text>
				</view>
				<view class="detail">
					{{details.address.areaProvinceName?details.address.areaProvinceName:''}}{{details.address.areaCityName?details.address.areaCityName:''}}{{details.address.areaCountyName?details.address.areaCountyName:''}}{{details.address.address?details.address.address:''}}
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item order_detail">
				<view class="shopMsg flex item-center" @tap="shopDetail(item.shopInfoVo.id)">
					<view class="pic">
						<image src="" mode="widthFix"></image>
					</view>
					<view class="flex-1">
						<view class="shopName fs15">{{details.shopInfo.name}}</view>
					</view>
				</view>
				<view class="product flex">
					<view class="pic" style="overflow: hidden;">
						<image :src="details.detail.goodsImgPath" mode="widthFix"></image>
					</view>
					<view class="center flex-1">
						<view class="name clamp clamp-2">
							{{details.detail.goodsName }}
						</view>
						<view class="spec">
							{{details.detail.goodsSkuPropValue}}
						</view>
					</view>
					<view class="price text-right">
						<view class="">
							<text class="fs12">¥</text>
							<text v-if="operType=='order'">{{details.detail.priceBuy}}</text>
							<text v-else> {{details.detail.priceBuy}}</text>
						</view>
						<view class="c999">
							x{{details.detail.buyNum}}
						</view>
					</view>
				</view>
			</view>
			<view class="item orderMsg fs13">
				<view class="item_c flex">
					<view class="name">运费</view>
					<view class="flex-1 text-right" v-if="details.priceVo.priceLogistic==0">
						免运费
					</view>
					<view class="flex-1 text-right" v-else>
						￥{{details.priceVo.priceLogistic?details.priceVo.priceLogistic:'0.00'}}
					</view>
				</view>
				<view class="item_c flex">
					<view class="name">精灵折扣</view>
					<view class="flex-1 text-right">
						{{details.priceVo.priceShopReduce?details.priceVo.priceShopReduce:"0.00"}}
					</view>
				</view>
				<view class="item_c flex">
					<view class="name">减免</view>
					<view class="flex-1 text-right">
						{{details.priceVo.priceShopSpirit?details.priceVo.priceShopSpirit:'0.00'}}
					</view>
				</view>
			</view>
			<view class="item phoneCall flex">
				<view class="pic">
					<image src="/static/images/icon-server.png" mode="widthFix"></image>
				</view>
				<view class="flex-1">
					联系店主
				</view>
				<view class="blue" @tap="phoneCall(details.shopInfo.phone)">
					{{details.shopInfo.phone?details.shopInfo.phone:''}}
				</view>
			</view>
		</view>
		<view class="modal orderMsg fs13">
			<view class="">
				订单编号：{{details.code?details.code:'--'}} <text class="blue float-right" @tap="textPaste()">复制</text>
			</view>
			<!-- <view class="">
				支付方式：星票
			</view> -->
			<view class="">
				下单时间：{{ details.createTime?formatTime(details.createTime):'--' }}
			</view>
			<view class="">
				付款时间：{{ details.timePay?formatTime(details.timePay):'--'}}
			</view>
			<!-- <view class="">
				拼单时间：{{ formatTime(details.createTime) }}
			</view> -->
			<view class="">
				发货时间：{{ details.timeSend?formatTime(details.timeSend):'--'}}
			</view>
		</view>
		<view class="footBtn">
			<button type="rednull" class="radiuBtn" v-if="details.status==1" size="mini">确认付款</button>
			<button type="null" class="radiuBtn" size="mini" @tap="cancelOrder">取消订单</button>
		</view>
	</view>
</template>

<script>
	import uniCountDown from '@/components/countDown.vue';
	export default {
		components: {
			uniCountDown
		},
		data() {
			return {
				color: '#666',
				backgroundColor: 'none',
				id: '',
				details: {},
				goods: {},
				obj: {},
				hour: 0,
				minute: 0,
				second: 0,
				show_time: false
			}
		},
		onLoad(options) {
			this.id = options.id
			this.obj = JSON.parse(options.obj)
			console.log(this.obj)
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				let self = this
				let params = {
					id: self.id
				}
				self.$acFrame.HttpService.orderDetailSpeci(params).then(res => {
					console.log(res);
					if (res.success) {
						let _data = res.data
						_data.detail.goodsImgPath = self.setImg(_data.detail.goodsImgPath)
						self.details = _data;
						self.init_time(res.data.endTime);
					}
				})
			},
			init_time(endTime) {
				this.hour = this.$acFrame.Util.countTime(endTime, 'hour')
				this.minute = this.$acFrame.Util.countTime(endTime, 'minute')
				this.second = this.$acFrame.Util.countTime(endTime, 'second')
				this.show_time = false;
				setTimeout(() => {
					this.show_time = true
				}, 300)
			},
			setImg(url) {
				return this.$acFrame.Util.setImgUrl(url);
			},
			formatTime(t) {
				return this.$acFrame.Util.formatTime(t, "dayhm");
			},
			textPaste() {
				var self = this;
				wx.showToast({
					title: '复制成功',
				})
				wx.setClipboardData({
					data: self.details.code,
					success: function(res) {
						wx.getClipboardData({
							success: function(res) {
								console.log(res.data)
							}
						})
					}
				})
			},
			phoneCall(phone){
				uni.makePhoneCall({
					phoneNumber:phone,
					fail:(error)=>{
						console.error(error)
					}
				})
			},
			cancelOrder() {
				let self = this
				let params = {
					spellIdUser:self.details.spellIdUser,
					spellId:self.details.spellId
				}
				
				self.$acFrame.HttpService.cancelSpellOrder(params).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('取消成功')
						setTimeout(()=>{
							uni.navigateBack({
								
							})
						},1000)
						
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.fs40 {
		font-size: 60rpx;
	}

	.content {
		padding: 0 0 100rpx;

		.modal {
			background: #fff;
			margin-bottom: 20rpx;
			padding: 0 30rpx;
		}

		.timer {
			line-height: 80rpx;
			text-align: center;
		}

		.item {
			border-bottom: 1px solid #ccc;

		}

		.shopMsg {
			.pic {
				width: 60rpx;
				height: 60rpx;
				border-radius: 60rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.shopname {
				max-width: 50%;
				font-weight: 600;
			}
		}

		.logist {
			padding: 20rpx 30rpx;

			.pic {
				width: 50rpx;
				margin-right: 20rpx;
			}
		}

		.address {
			padding: 20rpx 30rpx;

			.pic {
				width: 50rpx;
				margin-right: 20rpx;
			}

			.msg {
				width: 60%;

				.detail {
					margin-top: 10rpx;
				}

				.name {
					text {
						display: inline-block;
						margin-right: 20rpx;
					}
				}
			}
		}

		.order_detail {
			padding: 10rpx 0;
			line-height: 60rpx;

			.shopName {
				padding: 10rpx 0;
			}

			.product {
				margin: 10rpx 0;

				.pic {
					width: 180rpx;
					height: 180rpx;
					margin-right: 20rpx;
				}

				.center {
					width: 50%;
				}

				.spec {
					margin-top: 10rpx;

					text {
						display: inline-block;
						background: #efefef;
						color: #999;
						padding: 4rpx 6rpx;
						font-size: 24rpx;
						margin-right: 20rpx;
					}
				}
			}

			.price {
				padding-left: 20rpx;
			}
		}

		.phoneCall {
			line-height: 80rpx;
			border: 0;

			.pic {
				width: 40rpx;
				margin-right: 20rpx;
			}
		}

		.orderMsg {
			padding: 20rpx 30rpx;

			.item_c {
				line-height: 60rpx;
			}
		}

		.footBtn {
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			text-align: right;
			z-index: 4;
			padding-bottom: constant(safe-area-inset-bottom);
			background: #fff;
			padding-right: 30rpx;
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

			button {
				line-height: 60rpx;
				display: inline-block;
				margin: 14rpx 0 14rpx 14rpx
			}
		}

	}
</style>
