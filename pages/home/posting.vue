<template>
	<view class="content">
		<view class="textarea">
			<textarea value="text" placeholder="请输入" v-model="text"/>
			<view class="text-right">
				<text class="c999">0/500</text>
				<button type="red" size="mini">发布</button>
			</view>
		</view>
		<view class="picList">
			<view class="item">
				<image src="../../static/images/head2.png" mode="widthFix"></image>
				<icon class="remove iconfont icon-remove"></icon>
			</view>
			<view class="item">
				<image src="../../static/images/head2.png" mode="widthFix"></image>
				<icon class="remove iconfont icon-remove"></icon>
			</view>
			<view class="item">
				<image src="../../static/images/head2.png" mode="widthFix"></image>
				<icon class="remove iconfont icon-remove"></icon>
			</view>
			<view class="item">
				<image src="../../static/images/head2.png" mode="widthFix"></image>
				<icon class="remove iconfont icon-remove"></icon>
			</view>
			<view class="item">
				<image src="../../static/images/head2.png" mode="widthFix"></image>
				<icon class="remove iconfont icon-remove" @tap="removePic"></icon>
			</view>
		</view>
		<view class="picBtn">
			<view class="upload">+</view>
		</view>
		<view class="linkBox flex item-center" v-if="linkObj.price">
			<view class="pic">
				<image :src="linkObj.pic" mode="widthFix"></image>
			</view>
			<view class="msg flex-1">
				<view class="name textEllipsis">{{linkObj.name}}</view>
				<view class="price red">
					<text class="fs12">¥</text>
					<text class="fs16">{{linkObj.price}}</text>
				</view>
				<icon class="remove iconfont icon-remove" @tap="removeLink"></icon>
			</view>
		</view>
		<view class="operBox">
			<view class="item">
				<icon class="iconfont icon-tupian"></icon>
			</view>
			<view class="item">
				@
			</view>
			<view class="item">
				#
			</view>
			<view class="item" @tap="chooseLink">
				<icon class="iconfont icon-link"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:"1111",
				linkObj:{}
			};
		},
		methods:{
			chooseLink(){
				uni.navigateTo({
					url:'ranking'
				})
			},
			changeData(obj){
				console.log(obj)
				this.linkObj = obj
			}
		}
	}
</script>

<style lang="less">
.content{
	padding:0 20rpx 100rpx;
	.textarea{
		margin-bottom: 20rpx;
		textarea{
			padding:20rpx 0;
			height:160px;
		}
		.text-right{
			padding:20rpx 0;
		}
		text{
			display: inline-block;
			margin-right:20rpx;
		}
	}
	.picList{
		overflow: hidden;
		.item{
			float:left;
			position: relative;
			width: calc(25% - 10rpx);
			height:calc((100vw - 20rpx) / 4 - 10rpx);
			margin:0 10rpx 10rpx 0;
			overflow: hidden;
		}
	}
	.upload{
		width: calc(25% - 10rpx);
		height:calc((100vw - 20rpx) / 4 - 10rpx);
		border:1px dashed #d6d6d6;
		font-size:50px;
		text-align: center;
		line-height: calc((100vw - 20rpx) / 5);
	}
	.operBox{
		position: fixed;
		width: 100%;
		left:0;
		bottom:0;
		height:100rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		background: #eee;
		.item{
			width: 20%;
			float:left;
			line-height: 100rpx;
			text-align: center;
			color:#999;
			font-size:40rpx;
			.iconfont{
				font-size:40rpx;
			}
		}
	}
	.linkBox{
		background: #eee;
		padding:5px;
		margin:20rpx 0;
		position: relative;
		.pic{
			width:100rpx;
			height:100rpx;
			margin-right:20rpx;
		}
		.msg{
			width: 50%;
			padding-right:30rpx;
		}
	}
}
</style>
