<template>
	<view class="orderList">
		<view v-for="(item, index) in dataList" :key="index" class="item" @tap="orderDetail(item)">
			<view class="item_head flex item-center">
				<view class="pic">
					<image :src="setImg(item.shopInfo.imgPath?item.shopInfo.imgPath:'')" mode="widthFix" />
				</view>
				<view class="name flex-1 textEllipsis">{{item.shopInfo.name}}</view>
				<view class="status orange">
					<text  v-if="orderType==100">{{item.status==1?'待支付':(item.status==1)?'待加入成团':""}}</text>
					<text class="" v-else>
						{{item.flagStatusRefund ==1 ?'退换货中':item.statusName}}
					</text>
				</view>
				<view class="" v-if="orderType==100&&item.showTimer">
					<uni-count-down :color="timeStyle.color" :splitorColor="timeStyle.color" :show-day="false" :show-style="false"
					 :hour="item.hour" :minute="item.minute" :second="item.second" />
				</view>
			</view>
			<view v-if="orderType==100" class="item_body flex">
				<view class="pic">
					<image :src="item.detail.goodsImgPath" mode="widthFix" />
				</view>
				<view class="flex-1">
					<view class="flex">
						<view class="name flex-1 clamp clamp-2">
							{{item.detail.goodsName}}
						</view>
						<view class="text-right">
							<view class="salePrice">¥{{item.detail.priceBuy}}</view>
							<view class="nums fs12 c999">x{{item.detail.buyNum}}</view>
						</view>
					</view>
					<view class="spec">
						<text>{{item.detail.goodsSkuPropValue}}</text>
					</view>
				</view>
			</view>
			<view v-else class="item_body flex" v-for="(ditem,dind) in item.detailList " :key="dind">
				<view class="pic">
					<image :src="ditem.goodsImgPath" mode="widthFix" />
				</view>
				<view class="flex-1">
					<view class="flex">
						<view class="name flex-1 clamp clamp-2">
							{{ditem.goodsName}}
						</view>
						<view class="text-right">
							<view class="salePrice">¥{{ditem.priceBuy}}</view>
							<view class="nums fs12 c999">x{{ditem.buyNum}}</view>
						</view>
					</view>
					<view class="spec">
						<text>{{ditem.goodsSkuPropValue}}</text>
					</view>
				</view>
			</view>

			<view class="payprice text-right red" v-if="item.status==1">
				待付：<text class="fs12">¥</text><text>{{item.pricePayWait}}</text>
			</view>
			<view class="payprice text-right red" v-else>
				实付：<text class="fs12">¥</text><text>{{item.pricePay}}</text>
			</view>
			<view class="orderBtn text-right">
				<block v-if="orderType==100">
					<button type="red" :data-index="index" open-type="share" @tap.stop="" >邀请好友拼单</button>
				</block>
				<block v-if="item.status==1">
					<button type="rednull" @tap.stop="topay(item)">付款</button>
					<button type="null" @tap.stop="cancelOrder(item)">取消订单</button>
				</block>
				<block v-if="item.status==2">
					<button type="null" v-if="item.flagStatusRefund !=1" @tap.stop="refoundMoney(item)">申请退款</button>
					<button type="null" v-if="item.flagStatusRefund!=1" @tap.stop="cancelOrder(item)">取消订单</button>
				</block>
				<block v-if="item.status==3">
					<button type="rednull" v-if="item.flagStatusRefund!=1" @tap.stop="shouhuo(item)">确认收货</button>
					<button type="null" v-if="item.flagStatusRefund !=1" @tap.stop="applyService(item)">申请售后</button>
				</block>
				<block v-if="item.status==4">
					<button type="rednull"  @tap.stop="pingjia(item)" >评价</button>
				</block>
				<block v-if="item.status==5">
					<button type="rednull"  @tap.stop="createOrder(item)"  >再来一单</button>
					<button type="null" @tap.stop="delOrder(item)" >删除订单</button>
				</block>
				<block v-if="item.status==6||item.status==7">
					<button type="rednull"  @tap.stop="createOrder(item)"  >再来一单</button>
					<button type="null" @tap.stop="delOrder(item)" >删除订单</button>
				</block>
				<block v-if="item.flagStatusRefund==1">
					<button type="null" @tap="cancelRefund(item)" class="radiuBtn">取消售后</button>
				</block>

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
	import uniCountDown from "@/components/countDown.vue";
	export default {
		components: {
			uniCountDown
		},
		props: {
			dataList: {
				// 要显示的数组
				type: Array,
				default () {
					return [];
				}
			},
			orderType: {
				// 状态
				type: String,
				default () {
					return '';
				}
			},
			nodata: {
				// 是否是详情
				type: Boolean,
				default () {
					return false;
				}
			},
			nomore: {
				// 是否是详情
				type: Boolean,
				default () {
					return false;
				}
			}
		},
		data() {
			return {
				timeStyle: {
					color: "#ff9d19"
				}
			};
		},
		methods: {
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			},
			orderDetail(item) {
				if (item.spellIdUser) {
					uni.navigateTo({
						url: '/pages/order/orderDetailSpeci?id=' + item.spellIdUser + "&obj=" + JSON.stringify(item)
					})
				} else {
					uni.navigateTo({
						url: '/pages/order/orderDetail?id=' + item.id + "&obj=" + JSON.stringify(item)
					})
				}

			},
			// createOrder(item){
			// 	console.log(item);
			// 	let speci = item.detailList[0];
			// 	//let priceVo = details.priceVo;
			// 	let args={
			// 		couponList:[],
			// 		chooseSpec:{"priceSale":speci.priceBuy,"propValue":speci.goodsSkuPropValue,"goodsSkuId":speci.goodsSkuId,},
			// 		prod:speci,
			// 		goodsNum:speci.buyNum,
			// 		spellId:'',
			// 		freight:0,
			// 		name:speci.goodsName,
			// 		priceSale:speci.priceBuy,
			// 		sum_price:item.pricePay,
			// 		img:speci.goodsImgPath,
			// 		goodsId:speci.goodsId,
			// 		goodsSkuId:speci.goodsSkuId
			// 	};
			// 		args= encodeURIComponent(JSON.stringify(args))
			// 		uni.navigateTo({
			// 			url:'/pages/myshop/confirmOrder?details='+args+'&type=order'
			// 		})
			// },
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
			createOrder(item){
				let speci = item.detailList[0];
				let priceVo = item.priceVo;
				let args={
					couponList:[],
					chooseSpec:{"priceSale":speci.priceBuy,"propValue":speci.goodsSkuPropValue,"goodsSkuId":speci.goodsSkuId,},
					prod:speci,
					goodsNum:speci.buyNum,
					spellId:'',
					freight:priceVo?priceVo.priceLogistic:0,
					shopInfo:item.shopInfo,
					name:speci.goodsName,
					priceSale:speci.priceBuy,
					sum_price:priceVo?priceVo.pricePay:0,
					img:speci.goodsImgPath,
					goodsId:speci.goodsId,
					goodsSkuId:speci.goodsSkuId
				};
					args= encodeURIComponent(JSON.stringify(args))
					uni.navigateTo({
						url:'/pages/myshop/confirmOrder?details='+args+'&type=order'
					})
				
			},
			cancelOrder(item) {
				let self = this
				let id = ''
				let params = {}
				if (self.orderType == 100) {
					params.spellIdUser = item.spellIdUser
					params.spellId = item.spellId
				} else {
				self.$acFrame.HttpService.post("order/info/cancle",{id:item.id}).then(res => {
					console.log(res);
					if (res.success) {
						self.$acFrame.Util.mytotal('取消成功')
						setTimeout(() => {
							self.$parent.setParams()
							if (self.orderType == 100) {
								self.$parent.getPGList();
							} else {
								self.$parent.getList();
							}
						}, 1000)
					}
				})
				return true;
				}

				self.$acFrame.HttpService.cancelSpellOrder(params).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('取消成功')
						setTimeout(() => {
							self.$parent.setParams()
							if (self.orderType == 100) {
								self.$parent.getPGList();
							} else {
								self.$parent.getList();
							}
						}, 1000)

					}
				})
			},
			//取消售后
			cancelSpell() {
				let self = this
				let params = {
					id:self.details.id,
				}
				
				self.$acFrame.HttpService.cancelOrderRefund(params).then(res => {
					if (res.success) {
						self.$acFrame.Util.mytotal('取消成功')
						setTimeout(()=>{
							self.$parent.getList();
						},1000)
						
					}
				})
			},
			topay(item){
				//debugger
				if(this.orderType == 100){
					this.$acFrame.HttpService.spellPay({id:item.spellIdUser}).then(res=>{
						if(res.success){
							uni.navigateTo({
								url:'/pages/myshop/payWay?order='+JSON.stringify(res.data)
							}) 
						}
					})
				}else{
					this.$acFrame.HttpService.orderPay({id:item.id}).then(res=>{
						if(res.success){
							uni.navigateTo({
								url:'/pages/myshop/payWay?order='+JSON.stringify(res.data)
							}) 
						}
					})
				}
				
			},
			shouhuo(item){
				var self = this;
				wx.showModal({
				  content: '确定收获吗？',
				  success (res) {
				    if (res.confirm) {
				      self.$acFrame.HttpService.post("order/info/confirm",{id:item.id}).then(res => {
				      	if (res.success) {
				      		self.$parent.getList();
				      	}
				      })
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
				  }
				})
				
			}, 
			pingjia(item){
				uni.navigateTo({
					url:'/pages/mycenter/evaluate?id='+item.id+"&speci="+ JSON.stringify(item)
				}) 
			},
			delOrder(item){
				var self = this;
				self.$acFrame.HttpService.post("order/info/remove",{id:item.id}).then(res => {
					if (res.success) {
						self.$parent.getList();
					}
				})
			},
		}
	};
</script>

<style lang="less">
	.item {
		background: #fff;
		margin: 0 24rpx 20rpx;
		border-radius: 0.4em;

		.item_head {
			padding: 10rpx 20rpx;

			.pic {
				width: 60rpx;
				height: 60rpx;
				border-radius: 60rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.name {
				width: 50%;
			}

			.status {
				text {
					display: inline-block;
				}
			}
		}

		.item_body {
			padding: 10rpx 20rpx 0;

			.pic {
				width: 160rpx;
				height: 160rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.spec {
				text {
					display: inline-block;
					font-size: 24rpx;
					padding: 0 10rpx;
					background: #f8f8f8;
					color: #999;
					margin: 10rpx 10rpx 0 0;
				}
			}
		}

		.payprice {
			padding: 0 20rpx;
			line-height: 60rpx;
		}

		.orderBtn {
			padding: 20rpx;

			button {
				display: inline-block;
				height: 60rpx;
				line-height: 60rpx;
				min-width: 160rpx;
				padding: 0 20rpx;
				border-radius: 60rpx;
				margin-left: 20rpx;
			}
		}
	}

	.mr20 {
		margin-right: 20rpx;
	}
</style>
