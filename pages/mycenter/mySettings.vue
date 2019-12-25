<template>
	<view class="content">
		<view class="item flex item-center" @tap="linkTo('payPassword')">
			<view class="name flex-1">
				支付密码
			</view>
			<view class="text-right">
				<text class="c999">{{payPwd?'已设置':'未设置'}}</text>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				打赏弹幕
			</view>
			<view class="text-right">
				<switch :checked="barrage" @change="changeBarrage" :color="switchColor" />
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				系统推送
			</view>
			<view class="text-right">
				<switch :checked="system" @change="changeSystem" :color="switchColor" />
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				版本号
			</view>
			<view class="text-right">
				<text class="c999"></text>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				用户协议
			</view>
			<view class="text-right">
				<text class="c999"></text>
			</view>
		</view>
		<view class="item flex item-center">
			<view class="name flex-1">
				常见问题
			</view>
			<view class="text-right">
				<text class="c999"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchColor:'#4C8FF7',
				barrage:false,
				system:true,
				payPwd:false
			};
		},
		onLoad(options){
			this.payPwd = options.passwdPaySet
			this.getFlag()
		},
		methods:{
			changeBarrage(e){
				this.barrage = e.detail.value
				this.editFlag()
			},
			changeSystem(event){
				this.system = e.detail.value
				this.editFlag()
			},
			getFlag(){
				let self = this
				this.$acFrame.HttpService.switchFlag().then(res=>{
					if(res.success){
						self.barrage = res.data.flagRewardPop==1?true:false
						self.system = res.data.flagMessagePush==1?true:false
					}
				})
			},
			editFlag(){ //editSwitchFlag
				let self = this
				let params = {
					flagRewardPop:self.barrage?1:2,
					flagMessagePush:self.system?1:2
				}
				this.$acFrame.HttpService.editSwitchFlag(params).then(res=>{
					if(res.success){
						
					}
				})
			},
			linkTo(name){
				uni.navigateTo({
					url:name
				})
			},
			changeStatus(){
				this.payPwd=true
			}
		}
	}
</script>

<style lang="less">
	.content{
		padding-left:30rpx;
	}
.item{
	border-bottom:1px solid #ccc;
	height: 100rpx;
	padding-right:30rpx;
}
</style>
