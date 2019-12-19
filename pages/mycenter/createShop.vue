<template>
	<view class="content pagebg">
		<view class="shopAffir">
			<view class="text">
				1.为保障账号信息安全，请上传本人身份证照片
			</view>
			<view class="text">
				2.拍照时请确保拍摄光线均匀，图像清晰，边框完整
			</view>
		</view>
		<view class="formBox">
			<input class="input" type="text" v-model="name" value="" placeholder="请输入店铺名称" />
			<input class="input" type="text" v-model="userName" placeholder="请输入店主姓名" />
			<input class="input" type="idcard" value="" placeholder="请输入身份证号" />
			<textarea class="input" value="" placeholder="主营业介绍" />
		</view>
		<view class="uploadCard">
			<view class="title">第三方支付授权承诺函</view>
			<view class="flex uploadBox">
				<view class="flex-1">
					<view class="pic" @tap="downFile">
						<image src="/static/images/fileDown.png" mode="widthFix"></image>
					</view>
					<view class="text">
						下载承诺函
					</view>
				</view>
				<view class="flex-1">
					<view class="pic" @tap="uploadPic('bookfile')">
						<image src="/static/images/fileUp.png" mode="widthFix"></image>
					</view>
					<view class="text">
						上传签字承诺函
					</view>
				</view>
			</view>
		</view>
		<view class="uploadCard">
			<view class="title">上传身份证</view>
			<view class="flex uploadBox">
				<view class="flex-1">
					<view class="pic" @tap="uploadPic('front')">
						<image :src="card.front" mode="widthFix"></image>
					</view>
					<view class="text">
						上传身份证人像面照片
					</view>
				</view>
				<view class="flex-1">
					<view class="pic" @tap="uploadPic('back')">
						<image :src="card.back" mode="widthFix"></image>
					</view>
					<view class="text">
						上传身份证国徽面照片
					</view>
				</view>
			</view>
		</view>
		<view class="price">
			(开店成功需支付保证金：¥3,000.00)
		</view>
		<view class="aggrement">
			<label class="c999">
				<checkbox :checked="aggrement" color="#B40000" @click="agreeOn"/><text>我已阅读并同意</text>
			</label>
			<text url="">星购服务条款</text>
		</view>
		<view class="btnBox">
			<button type="red" v-if="aggrement"  @click="submit" >立即认证</button>
			<button type="default" v-else hover-class="none">立即认证</button>
		</view>
		<view class="fs10 c999 text-center">
			信息仅用于身份认证，我们将严格保护您的数据和隐私安全
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aggrement:false,
				card:{
					front:'../../static/images/card1.png',
					back:'../../static/images/card2.png'
				},
				name:"",
				userName:""
			};
		},
		methods:{
			agreeOn(event){
				this.aggrement = !this.aggrement
			},
			uploadPic(name){
				let self =this
				this.$acFrame.Util.uploadPic().then((res)=>{
					self.card[name] = res
				})
			},
			submit(){
				let self =this
				if(!self.name){
					this.$acFrame.Util.mytotal('请输入店铺名称！');
					return false;
				}
				if(!self.userName){
					this.$acFrame.Util.mytotal('请输入店主姓名！');
					return false;
				}
				this.$acFrame.HttpService.shopInfoApply({name:self.name,userName:self.userName}).then(res => {
					if(res.success){
						self.$acFrame.Util.mytotal('提交成功，店铺审核中，请耐心等待');
						setTimeout(()=>{
							uni.navigateBack({})
						},1500)
					}else{
						
						if(res.code=='NEED_BIND_MOBILE'){
								console.log(res.code);
							uni.navigateTo({
								url: "bindPhone",
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
							
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
.content{
	padding: 24rpx;
}
.formBox{
	.input{
		height:80rpx;
		line-height: 80rpx;
		background: #fff;
		padding:0 20rpx;
		display: block;
		margin-top:20rpx;
	}
	textarea.input{
		padding:20rpx;
		height:200rpx;
		line-height: 1.2;
		width: 100%;
		box-sizing: border-box;
	}
}
.uploadCard{
	background: #fff;
	margin-top:20rpx;
	padding-bottom:20rpx;
	.title{
		padding:20rpx;
	}
	.uploadBox{
		padding:0 10rpx;
		> view{
			margin:0 10rpx;
		}
		.text{
			height:60rpx;
			line-height: 60rpx;
			text-align:center;
			background: #007AFF;
			color:#fff;
		}
	}
}
.price{
	margin-top:10rpx;
}
.aggrement{
	margin:10rpx 0;
	line-height: 40rpx;
}
.btnBox{
	margin:10rpx 0;
}
</style>
