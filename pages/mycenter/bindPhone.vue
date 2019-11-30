<template>
	<view class="content">
		<view class="input">
			<input type="text" placeholder="请输入手机号码"/>
		</view>
		<view class="input">
			<input class="border0" type="text" placeholder="验证码"/>
			<button type="text" class="c999" @tap="sendMark">{{btntext}}</button>
		</view>
		<view class="btnBox">
			<button type="red">立即绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btntext:'发送验证码',
				cansend:true,
			};
		},
		methods:{
			sendMark(){
				let t= 10
				let self = this
				let timer;
				if(!this.cansend){
					return false;
				}
				this.cansend = false;
				function uptime(){
					if(t>0){
						self.btntext =  t+'s后重新发送'
						t--;
					} else {
						clearInterval(timer);
						self.btntext = '发送验证码'
						self.cansend = true;
					}
				}
				timer = setInterval(uptime,1000);
			}
		}
	}
</script>

<style lang="less">
page {
	min-height: 100%;
	background: #efefef;
	padding-top:20rpx;
}
.input{
	padding:0 24rpx;
	position:relative;
	height:80rpx;
	background: #fff;
	line-height: 80rpx;
	input{
		height:80rpx;
		line-height: 80rpx;
		border-bottom:1px solid #ccc;
	}
	button{
		position: absolute;
		right:0;
		top:0;
		color:#999;
		z-index: 5;
	}
	.border0{
		border:0;
	}
}
.btnBox{
	padding: 24rpx;
	margin-top:20rpx;
}
</style>
