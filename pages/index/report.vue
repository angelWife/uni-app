<template>
	<view class="content">
		<view class="modal reasons">
			<view class="title">请选择您想要举报的类型（必选）</view>
			<view class="resonlist flex f-wrap just-con-l">
				<view class="item" v-for="(item,index) in reasons" :key="index" :class="{'choose':item.choose}" @tap="chooseReason(index)">{{item.text}}</view>
			</view>
		</view>
		<view class="modal picList">
			<view class="title">上传证明图片（选填）</view>
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
				<view class="item upload">
					<view class="loadpic flex item-center just-con-c">
						<view>+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="modal textarea">
			<view class="title">补充说明（选填100字以内）</view>
			<textarea v-modal="textVal" placeholder="请详细填写" maxlength="100"/>
		</view>
		<view class="btnBox">
			<button type="red">确认</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			reasons:[{text:'垃圾营销',choose:false},
			{text:'涉黄信息',choose:false},
			{text:'不实信息',choose:false},
			{text:'人身攻击',choose:false},
			{text:'有害信息',choose:false},
			{text:'内容抄袭',choose:false},
			{text:'违法信息',choose:false},
			{text:'诈骗信息',choose:false}],
			textVal:'猜测是'
		}
	},
	methods: {
		chooseReason(ind){
			this.reasons[ind].choose = !this.reasons[ind].choose
		}
	},
}
</script>

<style lang="less">
page {
	background: #eeeeee;
	min-height: 100%;
}
.content {
	padding: 20rpx;
	.modal {
		background: #fff;
		margin-bottom: 20rpx;
		.title {
			line-height: 60rpx;
			padding: 0 20rpx;
		}
		.resonlist{
			padding:0 10rpx 10rpx;
			.item{
				width: 30.5%;
				heigth:60rpx;
				line-height: 60rpx;
				text-align: center;
				background:#e6e6e6;
				color:#999;
				border-radius:0.2em;
				margin:10rpx;
				&.choose{
					color:#fff;
					background-color: #b40000;
				}
			}
		}
		.picList{
			padding:10rpx;
			overflow: hidden;
			.item{
				float: left;
				width: 25%;
				height:calc((100vw - 60rpx) / 4);
				padding:10rpx;
				position: relative;
				icon{
					top:10rpx;
					right:10rpx;
				}
				.loadpic{
					width: 100%;
					height:100%;
					border:1px dashed #e6e6e6;
					font-size:80rpx;
					color:#999;
					text-align: center;
				}
			}
		}
		textarea{
			padding:10rpx 20rpx 20rpx;
			height:120rpx;
			width: 100%;
		}
	}
	.btnBox{
		margin:40rpx 0 20rpx;
	}
}
</style>
