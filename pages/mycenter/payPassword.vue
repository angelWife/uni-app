<template>
	<view class="content pagebg">
		<view class="formBox">
			<view class="item">
				<input type="number" :value="pwd1" @input="changeInput($event,'pwd1')" maxlength="6" placeholder="请输入新的支付密码" />
			</view>
			<view class="item flex">
				<input type="number" :value="pwd2" @input="changeInput($event,'pwd2')" maxlength="6" placeholder="验证新支付密码" />
			</view>
		</view>
		<view class="btnBox">
			<button type="red" @tap="checkPassword">验证</button>
		</view>
	</view>
</template>

<script>
		let MD5 = require('@/js_sdk/js-md5/src/md5.js')
	export default {
		data() {
			return {
				pwd1:'',
				pwd2:''
				
			};
		},
		onLoad(options){
			let type=options.type
			if(type){
				this.checkPwd = true
			}
		},
		methods:{
			changeInput(e,name){
				this[name] = e.detail.value
			},
			checkPassword(){
				let self=this
				let secret = uni.getStorageSync('secret')
				let timestamp = new Date().getTime();
				if(this.pwd1!==this.pwd2){
					this.$acFrame.Util.mytotal('两次输入的密码不相同，请重新输入')
					return false
				}
				if(this.pwd1.length<6){
					this.$acFrame.Util.mytotal('请输入六位数字密码')
					return false
				}
				debugger
				let res = this.pwd1+timestamp+secret;
				res = res.toUpperCase()
				res = res.split('').sort().join('');
				res = MD5(res).toUpperCase()
                let params = {
					passwd:this.pwd1,
					sign:res,
					timestamp:timestamp
				}
				this.$acFrame.HttpService.setPayPwd(params).then(res=>{
					if(res.success){
						self.$acFrame.Util.mytotal("设置支付密码成功！")
					}else{
						if(res.code=='PD_SIGN_ERROR'){
							self.$acFrame.Util.mytotal("签名错误！")
						}
					}
				})
				
			},
			changeData(){
				let pages=getCurrentPages()
				if(pages.length>1){
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.changeStatus) {
					  prePage.$vm.setVal(changeStatus)
					  wx.navigateBack({})
					}
				}
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
