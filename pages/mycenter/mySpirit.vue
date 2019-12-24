<template>
	<view class="content">
		<view class="desc flex">
			<view class="detail flex-1">
				<view class="name blod">
					精灵名称：流氓兔
				</view>
				<view class="listBox clearfix">
					<view class="sex">
						<text class="c999">性别：</text>男
					</view>
					<view class="item">
						<text class="c999">体力：</text>100
					</view>
					<view class="item">
						<text class="c999">智力：</text>100
					</view>
					<view class="item">
						<text class="c999">速度：</text>100
					</view>
					<view class="item">
						<text class="c999">力量：</text>100
					</view>
					<view class="item">
						<text class="c999">幸运：</text>20
					</view>

				</view>
			</view>
			<view class="pic">
				<image src="../../static/images/defaultpro.png" mode="widthFix"></image>
			</view>
		</view>
	    <view class="swiperBox">
	    	<swiper indicator-color="rgba(0,0,0,0.6)" indicator-active-color="#b40000" :indicator-dots="true" :autoplay="false" :interval="3000" :duration="400">
	    		<swiper-item>
	    			<view class="swiper-item"><image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg" mode="widthFix"></image></view>
	    		</swiper-item>
	    		<swiper-item>
	    			<view class="swiper-item"><image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg" mode="widthFix"></image></view>
	    		</swiper-item>
	    	</swiper>
	    </view>
		<view class="otherSpirit clearfix">
			<view class="item">
				<view class="pic">
					<image src=".https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg" mode="widthFix"></image>
				</view>
				<view class="text">流氓兔</view>
			</view>
			<view class="item add" @tap="addSpirit">
				<icon class="iconfont icon-remove"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0
			};
		},
		onLoad(options){
			this.id = options.id
			console.log(this.id)
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
.desc{
	padding:20rpx 30rpx;
	.pic{
		width: 200rpx;
		margin-left:20rpx;
	}
	.detail{
		line-height: 50rpx;
		.item{
			float:left;
			width: 50%;
		}
	}
	
}
.swiperBox{
		margin:24rpx 30rpx;
		height:calc(100vw - 48rpx);
		swiper{
			height:100%;
		}
	}
	.otherSpirit{
		padding:0 14rpx;
		.item{
			float:left;
			width: 160rpx;
			margin:0 10rpx 20rpx;
			.pic{
				width:100%;
				height:160rpx;
				overflow: hidden;
				box-shadow: 0 0 3px rgba(0,0,0,0.2);
			}
			.text{
				line-height: 60rpx;
				text-align: center;
			}
		}
		.add{
			height:160rpx;
			box-sizing: border-box;
			line-height:160rpx;
			text-align: center;
			border:1px dashed #ccc;
			border-radius: 0.2em;
			 color:#999;
			 .iconfont{
				 transform: rotate(45deg);
				 font-size:48rpx;
			 }
		}
	}
</style>
