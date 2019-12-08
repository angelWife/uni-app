<template>
	<view class="modalmask" v-if="showModal">
		<view class="comModal">
			<textarea @input="inputChange" @confirm="sureText" cursor-spacing="30" fixed="true" placeholder="优质评论将会被优先展示"></textarea>
			<view class="btnBox text-right">
				<button class="float-left" type="default" @tap="cancelRelase">取消</button>
				<button type="red" @tap="relaseComment">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showModal: {
				// 要显示的数组
				type: Boolean,
				default() {
					return false;
				}
			}
		},
		data() {
			return {
				text:''
			};
		},
		methods:{
			inputChange(e){
				this.text=e.detail.value
			},
			relaseComment(){
				this.$emit('relaseComment',this.text)
			},
			cancelRelase(){
				this.text=""
				this.$emit('cancelRelase')
			}
		}
	}
</script>

<style lang="less">
.comModal{
	padding:24rpx;
	textarea{
		height:240rpx;
		width: 100%;
		background: #f9f9f9;
		border:1px solid #ccc;
		border-radius:0.3em;
		box-sizing: border-box;
		padding:20rpx;
	}
	.btnBox{
		margin-top:24rpx;
		
		button{
			display: inline-block;
		}
	}
}
</style>
