<template>
	<view class="content pagebg">
		<view class="formBox">
			<view class="item">
				<input type="number" :value="phone" @input="changeInput($event,'phone')" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="item flex">
				<view class="flex-1">
					<input type="number" :value="code" @input="changeInput($event,'code')" placeholder="验证码" />
				</view>
				<view :class="[isSend?'#c999':'blue']" @tap="sendMark">
					{{message}}
				</view>
			</view>
		</view>
		<view class="btnBox">
			<button type="red" @tap="bindPhone">立即绑定</button>
		</view>
		<view class="followUs">
			<label>
				<checkbox :value="follow" checked="checked" /><text>关注星购公众号</text>
			</label>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:'发送验证码',
				isSend:false,
				phone:'',
				checked:true,
				code:''
			};
		},
		methods:{
			changeInput(e,name){
				this[name] = e.detail.value
				console.log(this.phone)
			},
			sendMark(){
				if(this.isSend){
					return false;
				}
				if(this.phone == ''){
					this.$acFrame.Util.mytotal('请输入手机号码')
					return false
				} else {
					let reg = /^1[345789]\d{9}$/
					if(!reg.test(this.phone)){
						this.$acFrame.Util.mytotal('请输入正确的手机号码')
						return false
					}
				}
				let num =10;
				let self = this
				let timer=null
				this.getMark();
				function downCount(){
					if(num>0){
						num--
						self.isSend = true
						self.message= num+'s后重新发送'
						
					}else{
						self.isSend=false
						clearInterval(timer)
						self.message= '发送验证码'
					}
				}
				setInterval(()=>{
					timer=downCount()
				},1000)
			},
			getMark(){
				let self = this
				let params={
					mobilePhone:this.phone,
					type:1
				}
				this.$acFrame.HttpService.sendMark(params).then(res=>{
					if(res.success){
						this.$acFrame.Util.mytotal('发送验证码成功！')
					}
				})
			},
			bindPhone(){
				let self = this
				let params={
					checkCode:this.code,
					mobilePhone:this.phone,
					type:1
				}
				if(this.phone == ''){
					this.$acFrame.Util.mytotal('请输入手机号码')
					return false
				} else {
					let reg = /^1[345789]\d{9}$/
					if(!reg.test(this.phone)){
						this.$acFrame.Util.mytotal('请输入正确的手机号码')
						return false
					}
				}
				if(this.code == ''){
					this.$acFrame.Util.mytotal('请输验证码')
					return false
				}
				this.$acFrame.HttpService.submitMark(params).then(res=>{
					if(res.success){
						this.$acFrame.Util.mytotal('绑定成功！')
						setTimeout(()=>{
							uni.navigateBack({})
						},1000)
					}
				})
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
		border-bottom:1px solid #ccc;
		&:last-child{
			border:0;
		}
	}
}
.btnBox{
	padding:60rpx 24rpx 0;
}
.followUs{
	padding:20rpx;
	text-align: center;
	checkbox{
		transform: scale(0.7);
		margin-top:-4rpx;
	}
}
</style>
