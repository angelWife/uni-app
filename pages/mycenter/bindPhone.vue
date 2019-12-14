<template>
	<view class="content pagebg">
		<view class="formBox">
			<view class="item">
				<input type="number" value="" placeholder="请输入手机号码" />
			</view>
			<view class="item flex">
				<view class="flex-1">
					<input type="number" value="" placeholder="验证码" />
				</view>
				<view :class="[isSend?'#c999':'blue']">
					{{message}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:'发送验证码',
				isSend:false
			};
		},
		methods:{
			sendMark(){
				let num =10;
				let self = this
				const downCount=()=>{
					if(num>0){
						isSend = true
						self.message= num+'s后重新发送'
						num--
					}else{
						isSend=false
						self.message= '发送验证码'
					}
				}
				setInterval(()=>{
					downCount()
				},1000)
			}
		}
	}
</script>

<style lang="less">
.formBox{
	margin:20rpx 0 ;
	background: #fff;
	padding:0 24rpx;
	.item{
		height:96rpx;
		line-height: 96rpx;
		input{
			display: block;
			height:96rpx;
			line-height: 96rpx;
		}
		border-bottom:1px solid #fff;
		&:last-child{
			border:0;
		}
	}
}
</style>
