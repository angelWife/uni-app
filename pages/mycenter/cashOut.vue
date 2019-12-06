<template>
	<view class="content">
		<view class="model">
			<view class="title">
				兑换星票
			</view>
			<view class="input">
				<input type="number" v-modal="xinpiao" @input="changeVal" placeholder="请输入兑奖星票" />
			</view>
			<view class="text c999">
				现有星票128,398，兑奖比例:10星票可兑奖1元
			</view>
		</view>
		<view class="model">
			<view class="title">
				<text>提现手续费</text>
				<view class="float-right">
					<text class="fs10">¥</text>
					2.00
				</view>
			</view>
		</view>
		<view class="model">
			<view class="title">
				奖金
			</view>
			<view class="input">
				<input type="text" value="¥1120" placeholder="请输入兑奖星票" />
			</view>
			<view class="text c999">
				现有星票128,398，兑奖比例:10星票可兑奖1元
			</view>
		</view>
		<view class="btnBox">
			<view class="linear_btn" :class="{'opacity':!canUse}" @tap="sureBtn">预计两小时内到账，确认提现</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canUse:false,
				xinpiao:''
			};
		},
		methods:{
			changeVal(event){
				let val = event.target.value
				this.xinpiao=val
				if(val){
					this.canUse=true
				}else{
					this.canUse=false
				}
			},
			sureBtn(){
				if(!this.canUse){
					this.$acFrame.Util.mytotal('请输入兑换的星票数量')
				}else{
					uni.navigateTo({
						url: 'cashOutSucces',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
	}
</script>

<style lang="less">
page{
	min-height:100%;
	background: #efefef;
}
.model{
	background: #fff;
	padding:0 24rpx;
	margin-bottom:20rpx;
	.title{
		line-height: 80rpx;
	}
	.input{
		padding:10rpx 0 20rpx;
		input{
			height:80rpx;
			line-height: 80rpx;
			font-size:60rpx;
		}
	}
	.text{
		padding:10rpx 0;
		border-top:1px solid #ccc;
	}
}
.btnBox{
	margin:30px 24rpx 20px;
	.linear_btn.opacity{
		opacity: 0.4;
	}
}
</style>
