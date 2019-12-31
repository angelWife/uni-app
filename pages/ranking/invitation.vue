<template>
	<view class="content pagebg">
		<view class="noData flex f-row just-con-c item-center">
			<view class="text-center">
				<image src="/static/images/nodata.png" mode="widthFix"></image>
				<view class="text-center c666 fs16">
					这里还没有内容
				</view>
				<button class="radiuBtn" @tap="linktoshop" type="rednull">随便看看</button>
				<!-- <navigator url="/pages/home/index" class="radiuBtn" hover-class="none">随便看看</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			linktoshop(){
				uni.switchTab({
					url:"/pages/home/index"
				})
			}
		}
	}
</script>

<style lang="less">
.content{
	height:100vh;
	position:relative;
}
</style>
