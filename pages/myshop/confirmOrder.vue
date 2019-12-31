<template>
	<view class="content">
		<view class="modal address flex item-center" @tap="add_address">
			<view class="pic">
				<icon class="iconfont icon-dizhi"></icon>
			</view>
			<view class="msg flex-1">
				<block v-if="addrVO.id">
					<view class="name">
						<text class="fs15">{{addrVO.name}}</text>
						<text class="c999">{{addrVO.mobilePhone}}</text>
					</view>
					<view class="detail">
						{{addrVO.areaProvince}}
						{{addrVO.areaCity}}
						{{addrVO.areaCounty}}
						{{addrVO.address}}
					</view>
				</block>
				<block v-else>
					<view class="c999 text-right">请选择收货地址</view>
				</block>

			</view>
			<view class="chooseAddress">
				<icon class="iconfont icon-right"></icon>
			</view>
		</view>
		<view class="modal order_detail">
			<view class="shopName fs15">{{details.shopInfo.name}}</view>
			<view class="product flex">
				<view class="pic" style="overflow: hidden;">
					<image :src="this.$acFrame.Util.setImgUrl(details.img)" mode="widthFix"></image>
				</view>
				<view class="center flex-1">
					<view class="name clamp clamp-2">
						{{details.name}}
					</view>
					<view class="spec">
						{{(details.chooseSpec && details.chooseSpec.propValue)?details.chooseSpec.propValue:''}}
					</view>
				</view>
				<view class="price text-right">
					<view class="">
						<text class="fs12">¥</text>
						<text v-if="operType=='order'"> {{details.chooseSpec.priceSale}}</text>
						<text v-else> {{details.chooseSpec.priceSpell}}</text>
					</view>
					<view class="c999">
						x{{details.goodsNum}}
					</view>
				</view>
			</view>
			<view class="orderMsg fs13">
				<view class="item flex">
					<view class="name">运费</view>
					<view class="flex-1 text-right" v-if="priceVO.priceLogistic==0">
						免运费
					</view>
					<view class="flex-1 text-right" v-else>
						￥{{priceVO.priceLogistic}}
					</view>

				</view>
				<view class="item flex item-center" @tap="cickCoupon" v-if="operType=='order'">
					<view class="name">优惠券</view>
					<view class="flex-1 text-right">
						<block v-if="couponList.length>0">
							<text class="red">您有可使用的优惠券</text>
							<icon class="iconfont icon-right"></icon>
						</block>
						<text v-else class="c999">无优惠券可用</text>
					</view>
				</view>
				<view class="item flex">
					<view class="name">精灵折扣</view>
					<view class="flex-1 text-right">
						已减免{{priceVO.priceShopReduce}}
					</view>
				</view>
				<view class="item flex">
					<view class="name">减免</view>
					<view class="flex-1 text-right">
						{{priceVO.priceShopSpirit}}
					</view>
				</view>
			</view>
		</view>
		<view class="modal texarea">
			<view class="name">买家留言：</view>
			<view class="textBox" v-if="!showCouponModal">
				<textarea :value="messageBuyer" @input="changeText" placeholder="选填，请先和商家协商一致请先和商家协商一致" />
				</view>
		</view>
		<view class="footBtn flex">
			<view class="flex-1 text-right pr15">
				<text class="fs13">实付：</text>
				<text class="fs13 red">¥</text>
				<text class="fs18 red">{{payTotal}}</text>
			</view>
			<view class="btn" @tap="choosePayWay">
				立即付款
			</view>
		</view>
		<view class="modalmask couponModal" v-if="showCouponModal">
			<view class="modalMain">
				<view class="title fs16">
					优惠券
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="list">
					<block v-for="(item,ind) in couponList" :key="ind">
					<view class="item flex red item-center" :class="{'hasReceived':item.hasReceived}" @tap="chooseConpons(item,ind)">
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
								{{item.type==1?"本店通用":"部分商品使用"}}
							</view>
							<view class="fs10">
								{{item.timeStart}} ~ {{item.timeEnd}}
							</view>
						</view>
						<block v-if="item.hasReceived">
							<view class="right fs15 blod">
								已使用
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
			    <view class="foot">
			    	<label class="radio" @tap="choose">
			    		<radio :checked="checked" /><text>不使用优惠券</text>
			    	</label>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{},//带过来胡产品信息
				couponList:[],//优惠券列表
				useList:[],
				addrVO:{},
				checked:false,
				showCouponModal:false,
				messageBuyer:'',
				priceVO:{
					priceLogistic:0,
					priceShopReduce:0,
					priceShopSpirit:0
				},
				payTotal:0.00,
				operType:'order'
			}
		},
		onLoad(options){
            this.details = JSON.parse(decodeURIComponent(options.details));
			this.operType=options.type
			this.getAddress();
			
			
		},
		onShow(){
			if(this.operType=='order'){
				this.getCoupon()
			}
		},
		methods: {
			getCoupon(){
				let self = this
				let params = {
					goodsId:self.details.goodsId,
					buyNum:self.details.goodsNum,
					goodsSkuId:self.details.goodsSkuId
				}
				/* self.$acFrame.HttpService.couponList(params).then(res => {
					if(res.success){
						self.couponList = res.data
					}
				})
				 */
				self.$acFrame.HttpService.post('product/coupon_receive/can_use',params).then(res => {
					if(res.success){
						let couponList= res.data
						couponList.filter(v=>{
							v.hasReceived =false
							v.timeEnd= self.$acFrame.Util.formatTime(v.timeEnd,'dayhm')
							v.timeStart= self.$acFrame.Util.formatTime(v.timeStart,'dayhm')
						})
						self.couponList = couponList
					}
				})
				
				
			},
			
			getAddress(){
				let self = this
				self.$acFrame.HttpService.defaultAddr().then(res => {
					if(res.success){
						self.addrVO = res.data
						self.getTotalPrice();
					}
				})
			},
			logistPrice(){
				let self = this
				let params = {
					addressId:this.addrVO.id,
					buyNum:this.details.goodsQty,
					goodsSkuId:this.details.chooseSpec.goodsSkuId
				}
				self.$acFrame.HttpService.logistPrice(params).then(res => {
					if(res.success){
						return res.data
					}
				})
			},
			changeText(e){
				this.messageBuyer = e.detail.value
			},
			closeModal(){
				this.showCouponModal = false
			},
			chooseConpons(obj,ind){
				if(this.couponList[ind].hasReceived){
					
				}else{	
					this.couponList.filter((v,i)=>{
						v.hasReceived= false
						if(i==ind){
							v.hasReceived= true
						}
					})
					this.useList[0] = obj
					console.log(this.useList[0])
					this.getTotalPrice()
				}
			},
			cickCoupon(){
				if(this.couponList.length>0){
					this.showCouponModal = true
				}else{
					
				}
				
			},
			choose(){
				this.checked = !this.checked
				this.getTotalPrice()
			},
			getTotalPrice(){
				let self =this
				let params={
					addressId:this.addrVO.id,
					buyNum:this.details.goodsNum,
					couponIdReceiveList:this.useList.length>0?[this.useList[0].couponId]:[],
					goodsId:this.details.goodsId,
					goodsSkuId:this.details.chooseSpec.goodsSkuId,
				}
				if(this.checked){
					params.couponIdReceiveList = []
				}
				self.$acFrame.HttpService.priceSum(params).then(res=>{
					if(res.success){
						this.payTotal = res.data.pricePay
						this.priceVO = res.data
					}
				})
				// if(this.useList.length>0){
				// 	if(!this.checked){
				// 		let obj = this.useList[0]
				// 		if(obj.effectType==1){
				// 			this.payTotal = this.$acFrame.Util.money(this.payTotal * 1 - obj.effectVal)
				// 		}else{
				// 			this.payTotal = this.$acFrame.Util.money(this.payTotal * obj.effectVal)
				// 		}
				// 	} else {
				// 		if(this.operType == 'order'){
				// 			this.payTotal =  this.details.chooseSpec.priceSale *  this.details.goodsNum
				// 		} else {
				// 			this.payTotal =  this.details.chooseSpec.priceSpell *  this.details.goodsNum
				// 		}
				// 	}
				// }else{
				// 	if(this.operType == 'order'){
				// 		this.payTotal =  this.details.chooseSpec.priceSale *  this.details.goodsNum
				// 	} else {
				// 		this.payTotal =  this.details.chooseSpec.priceSpell *  this.details.goodsNum
				// 	}
				// }
				
			},
			choosePayWay(){
				if(this.operType=='order'){
					this.createOrder()  //直接购买
				}else if(this.operType=='spell'){
					this.createSpell()  //发起拼单
				}else{
					//加入拼单
					this.joinSpell()
				}
				
			},
			createOrder(){
				let obj={
					addressId: this.addrVO.id?this.addrVO.id:'',
					buyNum: this.details.goodsNum,
					couponIdReceiveList: [],
					goodsId: this.details.goodsId,
					goodsSkuId: this.details.chooseSpec.goodsSkuId?this.details.chooseSpec.goodsSkuId:'',
					messageBuyer: this.messageBuyer
				}
				if(this.checked){
					obj.couponIdReceiveList = []
				}else{
					if(this.useList.length>0){
						obj.couponIdReceiveList[0]=this.useList[0].couponId
					}
				}
				console.log(obj);
				var self = this;
				this.$acFrame.HttpService.post('order/info/buy',obj).then(res => {
					if(res.success){
						console.log(res);
						var info = res.data;
						//console.log(info);return;
						uni.navigateTo({
							url:'payWay?order='+JSON.stringify(info)
						}) 
						getApp().globalData.orderType = self.operType
						getApp().globalData.prodVO=self.details
					}
				})
			},
			createSpell(){//createSpell
				let obj={
					addressId: this.addrVO.id?this.addrVO.id:'',
					buyNum: this.details.goodsNum,
					goodsId: this.details.goodsId,
					goodsSkuId: this.details.chooseSpec.goodsSkuId?this.details.chooseSpec.goodsSkuId:'',
				}
				console.log(obj);
				var self = this;
				this.$acFrame.HttpService.createSpell(obj).then(res => {
					if(res.success){
						console.log(res);
						var info = res.data;
						uni.navigateTo({
							url:'payWay?order='+JSON.stringify(info)
						}) 
						getApp().globalData.orderType = self.operType
						getApp().globalData.prodVO=self.details
					}
				})
			},
			joinSpell(){
				let obj={
					addressId: this.addrVO.id?this.addrVO.id:'',
					buyNum: this.details.goodsNum,
					goodsId: this.details.goodsId,
					goodsSkuId: this.details.chooseSpec.goodsSkuId?this.details.chooseSpec.goodsSkuId:'',
					spellId:this.details.spellId
				}
				console.log(obj);
				var self = this;
				this.$acFrame.HttpService.joinSpell(obj).then(res => {
					if(res.success){
						console.log(res);
						var info = res.data;
						uni.navigateTo({
							url:'payWay?order='+JSON.stringify(info)
						}) 
						getApp().globalData.orderType = self.operType
						getApp().globalData.prodVO=self.details
					}
				})
			},
			setAddr(addrVO){
				this.addrVO = addrVO
			},
			add_address(){
				uni.navigateTo({
					url:'../mycenter/addressList'
				})
			}
		}
	}
</script>

<style lang="less">
page{
	min-height:100%;
	background: #efefef;
}
.fs40{
	font-size:60rpx;
}
.content{
	padding:0 24rpx 100rpx;
	.modal{
		background: #fff;
		border-radius: 0.2em;
		margin-top:20rpx;
	}
	.address{
		padding:20rpx;
		.pic{
			width:60rpx;
			height:60rpx;
			background:linear-gradient(180deg,rgba(219,11,0,1) 0%,rgba(253,89,89,1) 100%);
			border-radius:50%;
			text-align: center;
			margin-right:20rpx;
			.iconfont{
				line-height: 60rpx;
				width: 60rpx;
				color:#fff;
				position:relative;
				&::before{
					position:absolute;
					width: 100%;
					left:0;
					top:-26rpx;
				}
			}
		}
		.msg{
			width: 60%;
			.detail{
				margin-top:10rpx;
			}
			.name{
				text{
					display: inline-block;
					margin-right:20rpx;
				}
			}
		}
		.chooseAddress{
			.confont{
				color:#999;
				height:60rpx;
				width: 60rpx;
				line-height: 60rpx;
				text-align: right;
			}
		}
	}
    .order_detail{
		padding: 10rpx 24rpx 20rpx;
		.shopName{
			padding:10rpx 0;
		}
		.product{
			margin:10rpx 0;
			.pic{
				width:180rpx;
				height: 180rpx;
				margin-right:20rpx;
			}
			.center{
				width: 50%;
			}
			.spec{
				margin-top:10rpx;
				text{
					display: inline-block;
					background: #efefef;
					color:#999;
					padding:4rpx 6rpx;
					font-size:24rpx;
					margin-right:20rpx;
				}
			}
		}
		.price{
			padding-left:20rpx;
		}
	}
	.orderMsg{
		.item{
			line-height: 40rpx;
			margin-top:10rpx;
			.iconfont{
				color:#999;
				font-size:28rpx;
				line-height: 40rpx;
				float: right;
				width: 30rpx;
				height:40rpx;
				position:relative;
&::before{
	position:absolute;
	top:2rpx;
	right:0;
}
			}
		}
	}
	.texarea{
		padding:24rpx;
		line-height: 40rpx;
		margin-top:10rpx;
		.textBox{
			textarea{
				height:160rpx;
				width:100%;
			}
		}
	}
	.footBtn{
		position:fixed;
		width: 100%;
		left:0;
		bottom:0;
		z-index: 4;
		
		padding-bottom:constant(safe-area-inset-bottom);
		background: #fff;
		padding-left:24rpx;
		box-shadow: 0 1px 5px rgba(0,0,0,0.2);
		.pr15{
			padding-right:30rpx;
		}
		text{
			line-height: 100rpx;
		}
		.btn{
			line-height: 100rpx;
			color:#fff;
			background: #B40000;
			width: 30%;
			min-width: 160rpx;
			text-align: center;
		}
	}
	.couponModal{
		.modalMain{
			position:absolute;
			width: 100%;
			left:0;
			bottom:0;
			background: #fff;
			padding:0 24rpx 20rpx;
			.title {
				line-height: 100rpx;
				text-align: center;
				position: relative;
				border-bottom: 1px solid #ccc;
				.iconfont {
					position: absolute;
					width: 100rpx;
					right: 0;
					top: 0;
					color: #999;
				}
			}
			.list{
				margin-top:20rpx;
				max-height:510rpx;
				overflow: hidden;
				overflow-y: auto;
				.item{
					background: #FFF4F1;
					border-radius: 0.3em;
					overflow: hidden;
					margin-bottom:20rpx;
					padding:10rpx 0;
					
					.left{
						width: 220rpx;
						padding-top:6rpx;
						text-align: center;
					}
					.center{
						margin-right:20rpx;
					}
					.right{
						width: 160rpx;
						text-align: center;
						line-height: 144rpx;
						border-left:1px dashed #b40000;
					}
					&.hasReceived{
						background: #f1f1f1;
						color:#999 !important;
						.right{
							border-color:#999;
						}
					}
				}
			}
		}
	    .foot{
			padding:20rpx 0;
		}
	}
}
</style>
