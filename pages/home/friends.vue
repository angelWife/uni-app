<template>
	<view class="content pagebg">
		<view v-for="(item,ind) in list" :key="ind" class="item flex item-center">
			<view class="pic">
				<image :src="item.img" mode="widthFix"></image>
			</view>
			<view class="flex-1 main flex item-center">
				<view class="left flex-1">
					<view class="title">
						{{item.name}}
					</view>
				</view>
				<view class="btnBox">
					<button type="red" class="radiuBtn" size="mini" @tap="chooseIt(ind)">@他</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{name:'测试',pic:'../../static/images/head1.png',id:0}]
			};
		},
		methods:{
			chooseIt(ind){
				let pages = getCurrentPages()
				let obj=this.list[ind]
				if(pages.length>1){
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.changeData) {
					  prePage.$vm.setVal(obj.id,obj.name,'friend')
					  wx.navigateBack({})
					}
				}
			}
		}
	}
</script>

<style lang="less">
.item{
	background: #fff;
	.pic{
		width: 80rpx;
		height:80rpx;
		border-radius: 80rpx;
		overflow: hidden;
		margin:0 24rpx;
	}
	.main{
		padding:20rpx 0;
		border-bottom:1px solid #cccc;
		.left{
			width: 60%;
		}
		.btnBox{
			margin:0 24rpx;
		}
	}
}
</style>
