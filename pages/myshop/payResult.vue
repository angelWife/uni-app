<template>
	<view class="content">
		<view class="comResult">
			<view class="pic">
				<image :src="resImg" mode="widthFix"></image>
			</view>
			<view class="text orange blod fs20">
				{{resText}}
			</view>
			<view class="text" v-if="type=='spell'">
				还差<text class="red">{{resdata.lackPersonNum}}</text>人，赶紧邀请好友来拼单吧
			</view>
		</view>
		<view class="btnBox">
			<view class="text text-center fs13 c999" v-if="type=='spell'">
				人满发货，人不满退款
				<block v-if="resdata.showTimer">
					<uni-count-down :show-day="false" :color="color" :splitorColor="color"
					:show-style="false" 
					:hour="resdata.hour" 
					:minute="resdata.minute" 
					:second="resdata.second" />
				</block>
				
			</view>
			<view v-if="resdata.orderId||resdata.spellId" class="btn1" @tap="goshop">随便逛逛</view>
			<view v-else class="btn1">重新支付</view>
			<button v-if="type=='spell'" type="null" open-type="share">推荐给好友</button>
			<view class="linkBox fs16" v-if="type=='reward'">谢大人打赏！</view>
			<view class="linkBox" @tap="baoku" v-else-if="type=='xuni'">去宝库看看!</view>
			<view class="linkBox" v-else @tap="linkTo(resdata)" >查看订单详情</view>
			<official-account></official-account>
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
				resdata:{},
				type:'',
				resText:'支付成功',
				color:'#999',
				resImg:'../../static/images/paySuc.png'
			};
		},
		onLoad(options){
			let res  = {success:true,data:JSON.parse(options.res)}
			console.log(res)
			this.type = getApp().globalData.orderType;
			let resdata = res.data
			if(res.success){
				this.resdata = resdata
				this.resText = '支付成功'
				this.resImg='/static/images/paySuc.png'
			} else {
				this.resText = '支付失败'
				this.resImg='/static/images/payFalse.png'
			}
			let self = this
			if(resdata.endTime){
				resdata.hour=self.$acFrame.Util.countTime(resdata.endTime,'hour')
				resdata.minute=self.$acFrame.Util.countTime(resdata.endTime,'minute')
				resdata.second=self.$acFrame.Util.countTime(resdata.endTime,'second')
				resdata.showTimer=false
				setTimeout(()=>{
					self.resdata.showTimer=true
				},500)
			}
			
		},
		onShareAppMessage(){
			let prodVO = getApp().globalData.prodVO
			let settings = {}
			
				// settings.type='article'
				settings.title = `发现好物【${prodVO.name}】`
				settings.imageUrl = this.$acFrame.Util.setImgUrl(prodVO.imgList[0]||prodVO.img)
				settings.pagePath =
					`/pages/myshop/productDetail?id=${prodVO.goodsId}&userCode=${uni.getStorageSync('userCode')}`
			return settings
		},
		onShow(){},
		methods:{
			linkTo(resdata){
				let prodVO = getApp().globalData.prodVO
				if(this.type=='spell'){
					uni.reLaunch({
						url:`/pages/order/orderDetailSpeci?id=${resdata.spellId}`
					})
				}else{
					uni.reLaunch({
						url:`/pages/order/orderDetail?id=${resdata.orderId}`
					})
				}
				
			},
			goshop(){
				uni.switchTab({
					url:'/pages/myshop/index'
				})
			},
			baoku(){ //
				uni.reLaunch({
					url:`/pages/mycenter/myWallet`
				})
			}
		}
	}
</script>

<style lang="less">

.btnBox{
	padding:0 24rpx;
	.btn1{
		width: 100%;
		border-radius:80rpx;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		color:#fff;
		margin-top:30rpx;
		background:linear-gradient(180deg,rgba(219,11,0,1) 0%,rgba(253,89,89,1) 100%);
	}
	button{
		margin-top:30rpx;
		line-height: 80rpx;
		border-radius:80rpx;
		width: 100%;
	}
	.linkBox{
		margin-top:30rpx;
		text-align: center;
		margin-top:30rpx;
	}
}

</style>
