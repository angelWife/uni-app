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
				<uni-count-down :show-day="false" :color="color" :splitorColor="color" 
				:show-style="false" 
				:hour="this.$acFrame.Util.countTime(resdata.endTime,'hour')" 
				:minute="this.$acFrame.Util.countTime(resdata.endTime,'minute')" 
				:second="this.$acFrame.Util.countTime(resdata.endTime,'second')" />
			</view>
			<view v-if="resdata.success" class="btn1">随便逛逛</view>
			<view w-else class="btn1">重新支付</view>
			<button v-if="type=='spell'" type="null" open-type="share">推荐给好友</button>
			<navigator url="">查看订单详情</navigator>
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
			//let resdata  = JSON.parse(options.res)
			let resdata  = {success:true};
			this.type = options.type;
			if(resdata.success){
				this.resdata = resdata.data
				this.resText = '支付成功'
				this.resImg='../../static/images/paySuc.png'
			} else {
				this.resText = '支付失败'
				this.resImg='../../static/images/payFalse.png'
			}
		},
		onShow(){},
		methods:{}
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
	navigator{
		margin-top:30rpx;
		display: block;
		text-align: center;
		margin-top:30rpx;
	}
}

</style>
