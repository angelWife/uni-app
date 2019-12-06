<template>
	<view class="content">
		<view class="price text-center red">
			<text>¥</text>
			<text class="fs40">1862.22</text>
		</view>
		<view class="fs16 text-center">
			支付剩余时间：<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :fontSize="fontSize" :hour="12" :minute="12" :second="12" />
		</view>
		<view class="pay">
			<view class="title">
				支付方式
			</view>
			<view class="item flex item-center">
				<view class="pic">
					<!-- <image src="" mode=""></image> -->
				</view>
				<view class="text flex-1">
					微信支付
				</view>
				<view class="">
					<label class="radio">
						<radio :checked="checked" color="#b40000"/><text></text>
					</label>
				</view>
			</view>
			<view class="item flex item-center">
				<view class="pic">
					<!-- <image src="" mode=""></image> -->
				</view>
				<view class="text flex-1">
					<view class="">
						星票支付
					</view>
					<view class="c999">
						(账户余额40星票，本订单可用10）
					</view>
				</view>
				<view class="">
					<switch @change="switchChange" color="#B40000"/>
				</view>
			</view>
		</view>
		<view class="payBtn">
			<view class="btn" @tap="payResult">
				立即支付
			</view>
		</view>
		<view class="modalmask passwordModal flex f-col just-con-c" v-if="showPassModal">
			<view class="modalMain">
				<view class="title fs16">
					安全验证
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="center text-center">
					<block v-if="showPayPass">
						<view class="red">
							<text class="fs13">¥</text>
							<text class="fs16">138.22</text>
						</view>
						<view class="text">
							请输入支付密码
						</view>
					</block>
					<block v-else>
						<view class="text">
							短信验证码已发送到
						</view>
						<view class="text">
							180****1214（59S）
						</view>
					</block>
				</view>
				<view class="textBox">
					<input type="text" value="" />
					<input type="text" value="" />
					<input type="text" value="" />
					<input type="text" value="" />
					<input type="text" value="" />
					<input type="text" value="" />
				</view>
			</view>
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
				color:'#b40000',
				checked:true,
				fontSize:'30rpx',
				showPayPass:false,
				showPassModal:false
			};
		},
		methods:{
			closeModal(){
				this.showPassModal = false
			},
			payResult(){
				uni.navigateTo({
					url:'payResult'
				})
			}
		}
	}
</script>

<style lang="less">
.content{
	padding:24rpx;
	.fs40{font-size:80rpx;}
	.price{
		padding: 80rpx 0 40rpx;
	}
	.pay{
		margin-top:40rpx;
		.title{
			padding:20rpx 0;
		}
		.item{
			padding:20rpx 0;
			border-bottom:1px solid #cccc;
		}
	}
	.payBtn{
		position:fixed;
		width: 100%;
		padding:24rpx;
		bottom:0;
		left:0;
		z-index: 5;
		padding-bottom:constant(safe-area-inset-bottom);
		.btn{
			width: 100%;
			border-radius:80rpx;
			left:0;
			height:80rpx;
			line-height: 80rpx;
			text-align: center;
			color:#fff;
			background:linear-gradient(180deg,rgba(219,11,0,1) 0%,rgba(253,89,89,1) 100%);
		}
	}
}
.passwordModal{
	.modalMain{
		width: 80%;
		margin:0 auto;
		background: #fff;
		border-radius: 0.3em;
	}
	.title {
		line-height: 100rpx;
		padding-left:24rpx;
		position: relative;
		border-bottom: 1px solid #ccc;
		.iconfont {
			position: absolute;
			width: 100rpx;
			right: 0;
			top: 0;
			color: #999;
			text-align: center;
		}
	}
	.center{
		padding:40rpx 24rpx 20rpx;
	}
	.textBox{
		width: 432rpx;
		margin:30rpx auto 40rpx;
		height:72rpx;
		border:1px solid #ccc;
		border-radius:0.3em;
		overflow: hidden;
		input{
			height:70rpx;
			float:left;
			width: calc(100% / 6);
			line-height: 70rpx;
			border-right:1px solid #ccc;
			background: #fff;
			text-align: center;
			&:last-child{
				border:0;
			}
		}
	}
}
</style>
