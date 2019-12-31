<template>

	<view class="modalmask flex item-center" v-if="showMessage">
		<view class="centerModal">
			<view class="title">
				{{title}}
				<icon class="close iconfont icon-remove" @tap="closeModal"></icon>
			</view>
			<view class="center">
				<slot></slot>
			</view>
			<view class="foot flex">
				<view v-if="showCancel" class="cancel flex-1">
					取消
				</view>
				<view class="sure flex-1" @tap="sureBtn">
					确认
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default () {
					return '提示';
				}
			},
			showCancel: {
				type: Boolean,
				default () {
					return false;
				}
			},
			showMessage: {
				type: Boolean,
				default () {
					return false;
				}
			},
		},
		data() {
			return {

			};
		},
		methods:{
			closeModal(){
				this.$emit('closeModal');
			},
			sureBtn(){
				this.$emit('sureModalBtn');
			}
		}
	}
</script>

<style lang="less">

</style>
