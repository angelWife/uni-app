<template>
	<view class="content pagebg">
		<block v-if="details.status">
			<view class="timer" v-if="details.status==1&&details.flagStatusRefund!=1">
				剩余
				<block v-if="show_time">
					<uni-count-down :show-day="false" :backgroundColor="backgroundColor" :color="color" :splitorColor="color"
					 :show-style="false" :fontSize="fontSize" :hour="hour" :minute="minute" :second="second" />
				</block>
				自动取消订单
			</view>
			<view class="timer" v-if="details.status == 3&&details.flagStatusRefund!=1">
				剩余
				<block v-if="show_time">
					<uni-count-down :show-day="false" :color="color" :backgroundColor="backgroundColor" :splitorColor="color"
					 :show-style="false" :fontSize="fontSize" :hour="hour" :minute="minute" :second="second" />
				</block>
				自动收货
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
				<view class="copy blue" v-if="details.logistics.logisticsNo" @tap="textPaste(details.logistics.logisticsNo)">
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
						{{details.address.areaProvinceName?details.address.areaProvinceName:''}}
						{{details.address.areaCityName?details.address.areaCityName:''}}
						{{details.address.areaCountyName?details.address.areaCountyName:''}}
						{{details.address.address?details.address.address:''}}
					</view>
				</view>
			</view>
			<view class="modal">
				<view class="item order_detail">
					<view class="shopMsg flex item-center" @tap="shopDetail(item.shopInfoVo.id)">
						<view class="pic">
							<image :src="details.shopInfo.imgPath" mode="widthFix"></image>
						</view>
						<view class="flex-1">
							<view class="shopName fs15">{{details.shopInfo.name}}</view>
						</view>
					</view>
			
					<view class="product flex" v-for="(item,index) in details.detailList" :key="index" @tap="goodsDetail()">
						<view class="pic" style="overflow: hidden;">
							<image :src="item.goodsImgPath" mode="widthFix"></image>
						</view>
						<view class="center flex-1">
							<view class="name clamp clamp-2">
								{{item.goodsName}}
							</view>
							<view class="spec">
								{{item.goodsSkuPropValue}}
							</view>
						</view>
						<view class="price text-right">
							<view class="">
								<text class="fs12">¥</text>
								<text v-if="operType=='order'">{{item.priceBuy}}</text>
								<text v-else> {{item.priceBuy}}</text>
							</view>
							<view class="c999">
								x{{item.buyNum}}
							</view>
						</view>
					</view>
				</view>
				<view class="item orderMsg fs13">
					<view class="item_c flex">
						<view class="name">运费</view>
						<!-- <view class="flex-1 text-right" v-if="details.priceVo.priceLogistic==0">
							免运费
						</view> -->
						<view class="flex-1 text-right">
							￥{{details.priceVo.priceLogistic?details.priceVo.priceLogistic:'0.00'}}
						</view>
					</view>
					<!-- <view class="item_c flex item-center" @tap="cickCoupon" v-if="operType=='order'">
						<view class="name">优惠券</view>
						<view class="flex-1 text-right">
							<block v-if="couponList.length>0">
								<text class="red">您有可使用的优惠券</text>
								<icon class="iconfont icon-right"></icon>
							</block>
							<text v-else class="c999">无优惠券可用</text>
						</view>
					</view> -->
					<view class="item_c flex">
						<view class="name">精灵折扣</view>
						<view class="flex-1 text-right">
							{{details.priceVo.priceShopReduce?details.priceVo.priceShopReduce:'0.00'}}
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
			<view class="modal fs13">
				<view class="orderMsg">
					<view class="item_c">
						订单编号：{{details.code?details.code:'--'}} <text class="blue float-right" v-if="details.code" @tap="textPaste(details.code)">复制</text>
					</view>
					<!-- <view class="">
						支付方式：星票
					</view> -->
					<view class="item_c">
						下单时间：{{ formatTime(details.createTime) }}
					</view>
					<view class="item_c" v-if="details.status >= 1 && details.status < 6 ">
						付款时间：{{ formatTime(details.timePay ) }}
					</view>
					
					<view class="item_c" v-if="details.status >= 3  && details.status < 6 ">
						发货时间：{{ formatTime(details.timeSend) }}
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="noData flex f-row just-con-c item-center">
				<view class="text-center">
					<image src="/static/images/nodata.png" mode="widthFix"></image>
					<view class="text-center c666 fs16">
						这里还没有内容
					</view>
				</view>
			</view>
		</block>
		
		<view class="footBtn">
			<block v-if="details.status==1">
				<button type="rednull" @tap="topay(details.id)" class="radiuBtn">付款</button>
				<button type="null" @tap="tocancel()" class="radiuBtn">取消订单</button>
			</block>
			<block v-if="details.status==2">
				<button type="null" v-if="detail.flagStatusRefund !=1" class="radiuBtn" @tap="refoundMoney(details)">申请退款</button>
				<!-- <button type="null" v-if="details.flagStatusRefund !=1" @tap="tocancel()" class="radiuBtn">取消订单</button> -->
			</block>
			<block v-if="details.status==3">
				<button type="rednull" v-if="details.flagStatusRefund !=1" @tap="shouhuo()" class="radiuBtn">确认收货</button>
				<button type="null" v-if="details.flagStatusRefund !=1" class="radiuBtn" @tap="applyService(details)">申请售后</button>
			</block>
			<block v-if="details.status==4">
				<button type="rednull" @tap="pingjia()" class="radiuBtn">评价</button>
			</block>
			<block v-if="details.status==5">
				<button type="rednull" @tap="createOrder()" v-if="details.flagStatusRefund !=1" class="radiuBtn">再来一单</button>
				<button type="null" @tap="delOrder()" v-if="details.flagStatusRefund !=1" class="radiuBtn">删除订单</button>
				
			</block>
			<block v-if="details.status==6||details.status==7">
				<button type="rednull" @tap="createOrder()" v-if="details.flagStatusRefund !=1" class="radiuBtn">再来一单</button>
				<button type="null" @tap="delOrder()" v-if="details.flagStatusRefund !=1" class="radiuBtn">删除订单</button>
				
			</block>
			<block v-if="details.flagStatusRefund==1">
				<button type="null" @tap="cancelRefund()" class="radiuBtn">取消售后</button>
			</block>
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
				obj: {},
				hour: 0,
				minute: 0,
				second: 0,
				show_time: false,
				goods_id: 0,
				orderStatus:[],
			}
		},
		onLoad(options) {

			this.id = options.id

		},
		onShow() {
			this.getStatus()
		},
		methods: {
			applyService(orderVO) {
				let obj = {
					orderId: orderVO.id,
					orderDetailId: orderVO.detailList[0].id,
					price: orderVO.pricePay,
					askNum: orderVO.detailList[0].buyNum,
					phone: orderVO.address ? orderVO.address.receiverMobilePhone : ''
				}
				uni.navigateTo({
					url: '/pages/order/applyAfter?orderData=' + JSON.stringify(obj)
				})
			},
			refoundMoney(orderVO) {
				let obj = {
					orderId: orderVO.id,
					orderDetailId: orderVO.detailList[0].id,
					price: orderVO.pricePay,
					askNum: orderVO.detailList[0].buyNum,
					phone: orderVO.address ? orderVO.address.receiverMobilePhone : ''
				}
				uni.navigateTo({
					url: '/pages/order/returnForm?orderData=' + JSON.stringify(obj) + '&type=nullgoods'
				})
			},
			getStatus() {
				let self = this;
				this.$acFrame.HttpService.get("dict/order/orderStatusList").then(res => {
					console.log(res);
					if (res.success) {
						console.log(res.data);
						var tabs = res.data;
						var st = {};
						tabs.forEach(function(item) {
							st[item.val] = item.key;
							self.orderStatus[item.key] = item.val;
						});
						self.getDetail();
			
					}
				})
			},
			getDetail() {
				let self = this
				let params = {
					id: self.id
				}
				self.$acFrame.HttpService.orderDetail(params).then(res => {
					console.log(res);
					if (res.success) {
						let details = res.data
						details.shopInfo.imgPath = self.setImg(details.shopInfo.imgPath)
						details.detailList.filter((v,i)=>{
							details.detailList[i].goodsImgPath = self.setImg(v.goodsImgPath)
						})
						self.details = details
						self.goods_id = details.detailList[0].goodsId;
						let title = self.orderStatus[details.status]  
						if(details.flagStatusRefund ==1){
							if(details.status==2){
								title = '退款申请中'
							}else if(details.status==3){
								title = '退换货中'
							}
							
						}
						uni.setNavigationBarTitle({
							title: title
						});
						if (self.details.status == 1 || self.details.status == 3) {
							self.init_time();
						}

					}
				})
			},
			init_time() {
				var time = ''
				// if (this.details.status == 1) {
					time = new Date(this.details.timeEnd);
				// } else if (this.details.status == 3) {
				// 	time = new Date(this.details.timeConfirm);
				// }

				this.hour = time.getHours();
				this.minute = time.getMinutes();
				this.second = time.getSeconds();
				this.show_time = false;
				setTimeout(() => {
					this.show_time = true
				}, 300)
			},
			setImg(url) {
				if (!url) {
					return "/static/images/shop.png";
				} else {
					return this.$acFrame.Util.setImgUrl(url);
				}

			},
			goodsDetail() {
				uni.navigateTo({
					url: '/pages/myshop/productDetail?id=' + this.goods_id
				})
			},
			topay(id) {
				this.$acFrame.HttpService.orderPay({
					id: id
				}).then(res => {
					if (res.success) {
						uni.navigateTo({
							url: '/pages/myshop/payWay?order=' + JSON.stringify(res.data)
						})
					}
				})
			},
			tocancel() {
				var self = this;
				self.$acFrame.HttpService.post("order/info/cancle", {
					id: this.id
				}).then(res => {
					console.log(res);
					if (res.success) {
						self.getDetail()
					}
				})

			},
			//取消售后
			cancelRefund(id) {
				let self = this
				this.show_time = false
				this.$acFrame.HttpService.cancelOrderRefund({
					id: self.id
				}).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('取消售后成功！')
						setTimeout(() => {
							self.getDetail()
						}, 1000)
					}
				})
			},
			shouhuo() {
				var self = this;
				wx.showModal({
					content: '确定收获吗？',
					success(res) {
						if (res.confirm) {
							self.$acFrame.HttpService.post("order/info/confirm", {
								id: self.id
							}).then(res => {
								console.log(res);
								if (res.success) {
									self.getDetail()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			},
			pingjia() {
				uni.navigateTo({
					url: '/pages/mycenter/evaluate?id=' + this.id + "&speci=" + JSON.stringify(this.details)
				})
			},
			createOrder() {
				let details = this.details;
				let speci = details.detailList[0];
				let priceVo = details.priceVo;
				let args = {
					couponList: [],
					chooseSpec: {
						"priceSale": speci.priceBuy,
						"propValue": speci.goodsSkuPropValue,
						"goodsSkuId": speci.goodsSkuId,
					},
					prod: speci,
					goodsNum: speci.buyNum,
					spellId: '',
					freight: priceVo ? priceVo.priceLogistic : 0,
					name: speci.goodsName,
					priceSale: speci.priceBuy,
					sum_price: priceVo ? priceVo.pricePay : 0,
					img: speci.goodsImgPath,
					goodsId: speci.goodsId,
					goodsSkuId: speci.goodsSkuId
				};
				args = encodeURIComponent(JSON.stringify(args))
				uni.navigateTo({
					url: '/pages/myshop/confirmOrder?details=' + args + '&type=order'
				})

			},
			delOrder() {
				var self = this;
				self.$acFrame.HttpService.post("order/info/remove", {
					id: this.id
				}).then(res => {
					console.log(res);
					if (res.success) {
						uni.navigateTo({
							url: '/pages/order/index'
						})
					}
				})
			},
			formatTime(t) {
				return this.$acFrame.Util.formatTime(t, "dayhm");
			},
			textPaste(code) {
				var self = this;
				wx.showToast({
					title: '复制成功',
				})
				wx.setClipboardData({
					data: code,
					success: function(res) {
						wx.getClipboardData({
							success: function(res) {
								console.log(res.data)
							}
						})
					}
				})
			},
			phoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					fail: (error) => {
						console.error(error)
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
			padding: 20rpx 0;

			.item_c {
				line-height: 50rpx;
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
