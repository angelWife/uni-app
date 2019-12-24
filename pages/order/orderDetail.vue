<template>
	<view class="content pagebg">
		<view class="timer" v-if="details.status==1">
			剩余
			<block v-if="show_time">
				<uni-count-down :show-day="false" :backgroundColor="backgroundColor" :color="color" :splitorColor="color"
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
						<image :src="setImg(details.shopInfo.imgPath)" mode="widthFix"></image>
					</view>
					<view class="flex-1">
						<view class="shopName fs15">{{details.shopInfo.name}}</view>
					</view>
				</view>
				
				<view class="product flex" v-for="(item,index) in details.detailList" :key="index">
					<view class="pic" style="overflow: hidden;">
						<image :src="setImg(item.goodsImgPath)" mode="widthFix"></image>
					</view>
					<view class="center flex-1">
						<view class="name clamp clamp-2">
							{{item.goodsName }}
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
					<view class="flex-1 text-right" v-if="details.priceVo.priceLogistic==0">
						免运费
					</view>
					<view class="flex-1 text-right" v-else>
						￥{{details.priceVo.priceLogistic}}
					</view>
				</view>
				<view class="item_c flex item-center" @tap="cickCoupon" v-if="operType=='order'">
					<view class="name">优惠券</view>
					<view class="flex-1 text-right">
						<block v-if="couponList.length>0">
							<text class="red">您有可使用的优惠券</text>
							<icon class="iconfont icon-right"></icon>
						</block>
						<text v-else class="c999">无优惠券可用</text>
					</view>
				</view>
				<view class="item_c flex">
					<view class="name">精灵折扣</view>
					<view class="flex-1 text-right">
						已减免{{details.priceVo.priceShopReduce}}
					</view>
				</view>
				<view class="item_c flex">
					<view class="name">减免</view>
					<view class="flex-1 text-right">
						{{details.priceVo.priceShopSpirit}}
					</view>
				</view>
			</view>
			<view class="item phoneCall flex">
				<view class="pic">
					<image src="/static/images/icon-server.png" mode=""></image>
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
				订单编号：{{details.code}} <text class="blue float-right" @tap="textPaste()">复制</text>
			</view>
			<!-- <view class="">
				支付方式：星票
			</view> -->
			<view class="">
				下单时间：{{ formatTime(details.createTime) }}
			</view>
			<view class="" v-if="details.status >= 1 && details.status < 6 ">
				付款时间：{{ formatTime(details.timePay ) }}
			</view>

			<view class="" v-if="details.status >= 3  && details.status < 6 ">
				发货时间：{{ formatTime(details.timeSend ) }}
			</view>
		</view>
		<view class="footBtn">
			<block v-if="details.status==1">
				<button type="rednull" @tap="topay(details.id)" class="radiuBtn">付款</button>
				<button type="rednull" @tap="createOrder()" class="radiuBtn">再来一单</button>
				<button type="null" @tap="tocancel()" class="radiuBtn" >取消订单</button>
			</block>
			<block v-if="details.status==2">
				<button type="null" class="radiuBtn" @tap="refoundMoney(details)">申请退款</button>
				<button type="null" @tap="tocancel()" class="radiuBtn" >取消订单</button>
				</block>
			<block v-if="details.status==3">
				<button type="rednull" @tap="shouhuo()" class="radiuBtn">确认收货</button>
				<button type="null" class="radiuBtn" @tap="applyService(details)">申请售后</button>
			</block>
			<block v-if="details.status==4">
				<button type="rednull" @tap="pingjia()" class="radiuBtn">评价</button>
			</block>
			<block v-if="details.status==5">
				<button type="null" @tap="delOrder()" class="radiuBtn">删除订单</button>
			</block>
			<block v-if="details.status==6">
				<button type="rednull" @tap="createOrder()" class="radiuBtn">再来一单</button>
				<button type="null" @tap="delOrder()" class="radiuBtn">删除订单</button>
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
				goods_id:0
			}
		},
		onLoad(options) {
			
			this.id = options.id
			this.obj = JSON.parse(options.obj)
			console.log(this.obj),
			this.goods_id=this.obj.detailList[0].goodsId;
			uni.setNavigationBarTitle({
				title: this.obj.statusName
			});
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			applyService(orderVO){
				let obj={
					orderId:orderVO.id,
					orderDetailId:orderVO.detailList[0].id,
					price:orderVO.pricePay,
					askNum:orderVO.detailList[0].buyNum,
					phone:orderVO.address?orderVO.address.receiverMobilePhone:'' 
				}
				uni.navigateTo({
					url:'/pages/order/applyAfter?orderData='+JSON.stringify(obj)
				})
			},
			refoundMoney(orderVO){
				let obj = {
					orderId: orderVO.id,
					orderDetailId: orderVO.detailList[0].id,
					price: orderVO.pricePay,
					askNum: orderVO.detailList[0].buyNum,
					phone: orderVO.address ? orderVO.address.receiverMobilePhone : ''
				}
				uni.navigateTo({
					url: '/pages/order/returnForm?orderData=' + JSON.stringify(obj)+'&type=nullgoods'
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
						self.details = res.data
						self.init_time();
					}
				})
			},
			init_time() {
				var time = new Date(this.details.endTime);
				this.hour = time.getHours();
				this.minute = time.getMinutes();
				this.second = time.getSeconds();
				this.show_time=false;
				setTimeout(()=>{
					this.show_time=true
				},300)
			},
			setImg(url) {
				if(!url){
					return false
				}else{
					return this.$acFrame.Util.setImgUrl(url);
				}
				
			},
			topay(id){
				this.$acFrame.HttpService.orderPay({id:id}).then(res=>{
					if(res.success){
						uni.navigateTo({
							url:'/pages/myshop/payWay?order='+JSON.stringify(res.data)
						}) 
					}
				})
			},
			tocancel(){
				var self = this;
				self.$acFrame.HttpService.post("order/info/cancle",{id:this.id}).then(res => {
					console.log(res);
					if (res.success) {
						self.getDetail()
					}
				})
				
			},
			shouhuo(){
				var self = this;
				self.$acFrame.HttpService.post("order/info/confirm",{id:this.id}).then(res => {
					console.log(res);
					if (res.success) {
						self.getDetail()
					}
				})
			}, 
			pingjia(){
				uni.navigateTo({
					url:'/pages/mycenter/evaluate?id='+this.id+"&speci="+ JSON.stringify(this.details)
				}) 
			},
			createOrder(){
				let details = this.details;
				let speci = details.detailList[0];
				let priceVo = details.priceVo;
				let args={
					couponList:[],
					chooseSpec:{"priceSale":speci.priceBuy,"propValue":speci.goodsSkuPropValue,"goodsSkuId":speci.goodsSkuId,},
					prod:speci,
					goodsNum:speci.buyNum,
					spellId:'',
					freight:priceVo.priceLogistic,
					name:speci.goodsName,
					priceSale:speci.priceBuy,
					sum_price:priceVo.pricePay,
					img:speci.goodsImgPath,
					goodsId:speci.goodsId,
					goodsSkuId:speci.goodsSkuId
				};
					args= encodeURIComponent(JSON.stringify(args))
					uni.navigateTo({
						url:'/pages/myshop/confirmOrder?details='+args+'&type=order'
					})
				
			},
			delOrder(){
				var self = this;
				self.$acFrame.HttpService.post("order/info/remove",{id:this.id}).then(res => {
					console.log(res);
					if (res.success) {
						uni.navigateTo({
							url:'/pages/order/index'
						})
					}
				})
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
