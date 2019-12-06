<template>
	<view class="content">
		<view class="prodBox flex">
			<view class="pic"><image src="../../static/images/head2.png" mode="widthFix"></image></view>
			<view class="name flex-1">商品名称商品名称商品名商品名称商品名称商品名称商品名商品名称</view>
		</view>
		<view class="starBox">
			<view class="item flex">
				<view class="name">服务态度</view>
				<view class="starList">
					<block v-for="(item, ind) in server" :key="ind"><image :src="item.src" mode="widthFix" @tap="clickstar('server',ind)"></image></block>
				</view>
			</view>
			<view class="item flex">
				<view class="name">物流服务</view>
				<view class="starList">
					<block v-for="(item, ind) in logist" :key="ind"><image :src="item.src" mode="widthFix" @tap="clickstar('logist',ind)"></image></block>
				</view>
			</view>
			<view class="item flex">
				<view class="name">综合评分</view>
				<view class="starList">
					<block v-for="(item, ind) in compre" :key="ind"><image :src="item.src" mode="widthFix" @tap="clickstar('compre',ind)"></image></block>
				</view>
			</view>
		</view>
	    <view class="evalText">
	    	<view class="title">评价内容(选填)</view>
			<textarea value="" placeholder="说说你用完宝贝后的感想吧" />
	    </view>
		<view class="imgList">
			<view class="item" v-for="(iten,ind) in imgList" :key="ind">
				<image  :src="iten" mode="widthFix"></image>
			</view>
			<view class="item upLoad">
				<icon class="iconfont icon-camaer"></icon>
				<text class="fs10">上传图片</text>
			</view>
		</view>
		<view class="btnBox">
			<view class="linear_btn">
				确认评价
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList:['../../static/images/defaultpro.png'],
			server: [
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false }
			],
			logist: [
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false }
			],
			compre: [
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false },
				{ src: '../../static/images/null_star.png', choose: false }
			]
		};
	},
	methods:{
		clickstar(name,ind){
			let _data = this[name];
			_data.filter((v,i)=>{
				if(i<ind){
					v.choose=true
					v.src="../../static/images/yellow_star.png"
				}else if(i==ind){
					if(v.choose){
						v.choose=false
						v.src="../../static/images/null_star.png"
					}else{
						v.choose=true
						v.src="../../static/images/yellow_star.png"
					}
				}else{
					v.choose=false
					v.src="../../static/images/null_star.png"
				}
			})
			this[name]=_data
		}
	}
};
</script>

<style lang="less">
.prodBox {
	padding: 24rpx 24rpx 0;
	.pic {
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
	}
	.name {
		margin-left: 20rpx;
		width: 50%;
	}
}
.starBox {
	padding: 20rpx 0;
	border-bottom:1px solid #ccc;
	.item {
		line-height: 60rpx;
		.name {
			margin: 0 24rpx;
		}
		.starList {
			image {
				display: inline-block;
				margin-right: 24rpx;
				width: 20px;
			}
		}
	}
}
.evalText{
	padding: 0 24rpx;
	.title{
		padding:24rpx 0;
	}
	textarea{
		width: 100%;
		height:200rpx;
	}
}
.imgList{
	margin-top:20rpx;
	padding:0 10rpx;
	.item{
		display: inline-block;
		width: 140rpx;
		height:140rpx;
		margin:14rpx;
		overflow: hidden;
	}
	.upLoad{
		text-align: center;
		border:1px dashed #ccc;
		border-radius: 0.2em;
		padding-top:30rpx;
		.iconfont{
			font-size:50rpx;
			color:#999;
		}
		text{
			display: block;
			color:#999;
		}
	}
}
.btnBox{
	padding:24rpx;
    margin-top:40rpx;
}
</style>
