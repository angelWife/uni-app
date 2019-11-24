<template>
	<view class="content">
		<view class="modal address flex item-center">
			<view class="pic">
				<icon class="iconfont icon-dizhi"></icon>
			</view>
			<view class="msg flex-1">
				<view class="name">
					<text class="fs15">阿童木</text>
					<text class="c999">18755641514</text>
				</view>
				<view class="detail">
					上海市常烈区天海路街道星星路星能小区30号301室
				</view>
			</view>
			<view class="chooseAddress">
				<icon class="iconfont icon-right"></icon>
			</view>
		</view>
		<view class="modal order_detail">
			<view class="shopName fs15">湖南弘道图书专营店</view>
			<view class="product flex">
				<view class="pic">
					<image src="../../static/images/head1.png" mode="widthFix"></image>
				</view>
				<view class="center">
					<view class="name clamp clamp-2">
						商品名称商品名称商品 名商品名称商品…
					</view>
					<view class="spec">
						<text>XL/180</text>
						<text>j黑色</text>
					</view>
				</view>
				<view class="price text-right">
					<view class="">
						<text class="fs12">¥</text>
						<text>1935.24</text>
					</view>
					<view class="c999">
						x1
					</view>
				</view>
			</view>
			<view class="orderMsg fs13">
				<view class="item flex">
					<view class="name">运费</view>
					<view class="flex-1 text-right">
						免运费
					</view>
				</view>
				<view class="item flex" @tap="chooseCoupon">
					<view class="name">优惠券</view>
					<view class="flex-1 text-right">
						无优惠券可用
					</view>
				</view>
				<view class="item flex">
					<view class="name">精灵折扣</view>
					<view class="flex-1 text-right">
						已减免126
					</view>
				</view>
				<view class="item flex">
					<view class="name">减免</view>
					<view class="flex-1 text-right">
						200
					</view>
				</view>
			</view>
		</view>
		<view class="modal texarea flex">
			<view class="name">买家留言：</view>
			<view class="flex-1">
				<textarea value="" placeholder="选填，请先和商家协商一致请先和商家协商一致" />
			</view>
		</view>
		<view class="footBtn flex">
			<view class="flex-1">
				<text class="fs13">实付：</text>
				<text class="fs13 red">¥</text>
				<text class="fs18 red">1258.66</text>
			</view>
			<view class="btn" @tap="choosePayWay">
				立即付款
			</view>
		</view>
		<view class="modalmask couponModal" v-if="showCouponModal">
			<view class="modalMain">
				<view class="title fs16">
					优惠券
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="list">
					<view class="item flex red item-center">
						<view class="left">
							<text class="fs40 blod">7</text>
							<text class="fs12">折</text>
						</view>
						<view class="center flex-1">
							<view class="text blod">满1000可使用</view>
							<view class="fs12">
								部分商品使用
							</view>
							<view class="fs12">
								2019.10.27-2019.11.11
							</view>
						</view>
						<view class="right fs15 blod">
							立即使用
						</view>
					</view>
				</view>
			    <view class="foot">
			    	<label class="radio" @tap="choose">
			    		<radio :checked="checked" /><text>不使用优惠券</text>
			    	</label>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				showCouponModal:false
			}
		},
		methods: {
			closeModal(){
				this.showCouponModal = false
			},
			chooseCoupon(){
				this.showCouponModal = true
			},
			choose(){
				this.checked = !this.checked
			},
			choosePayWay(){
				uni.navigateTo({
					url:'payWay'
				})
			}
		}
	}
</script>

<style lang="less">
page{
	min-height:100%;
	background: #efefef;
}
.fs40{
	font-size:80rpx;
}
.content{
	padding:0 24rpx 100rpx;
	.modal{
		background: #fff;
		border-radius: 0.2em;
		margin-top:20rpx;
	}
	.address{
		padding:20rpx;
		.pic{
			width:60rpx;
			height:60rpx;
			background:linear-gradient(180deg,rgba(219,11,0,1) 0%,rgba(253,89,89,1) 100%);
			border-radius:50%;
			text-align: center;
			margin-right:20rpx;
			.iconfont{
				line-height: 60rpx;
				width: 60rpx;
				color:#fff;
			}
		}
		.msg{
			width: 60%;
			.detail{
				margin-top:10rpx;
			}
			.name{
				text{
					display: inline-block;
					margin-right:20rpx;
				}
			}
		}
		.chooseAddress{
			.confont{
				color:#999;
				height:60rpx;
				width: 60rpx;
				line-height: 60rpx;
				text-align: right;
			}
		}
	}
    .order_detail{
		padding: 10rpx 24rpx 20rpx;
		.shopName{
			padding:10rpx 0;
		}
		.product{
			margin:10rpx 0;
			.pic{
				width:180rpx;
				height: 180rpx;
				margin-right:20rpx;
			}
			.center{
				width: 50%;
			}
			.spec{
				margin-top:10rpx;
				text{
					display: inline-block;
					background: #efefef;
					color:#999;
					padding:4rpx 6rpx;
					font-size:24rpx;
					margin-right:20rpx;
				}
			}
		}
		.price{
			padding-left:20rpx;
		}
	}
	.orderMsg{
		.item{
			line-height: 40rpx;
			margin-top:10rpx;
		}
	}
	.texarea{
		padding:24rpx;
		.flex-1{
			width: 60%;
			textarea{
				height:160rpx;
				width:100%;
			}
		}
	}
	.footBtn{
		position:fixed;
		width: 100%;
		left:0;
		bottom:0;
		z-index: 4;
		line-height: 100rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		background: #fff;
		padding-left:24rpx;
		box-shadow: 0 1px 5px rgba(0,0,0,0.2);
		.btn{
			color:#fff;
			background: #B40000;
			width: 30%;
			min-width: 160rpx;
			text-align: center;
		}
	}
	.couponModal{
		.modalMain{
			position:absolute;
			width: 100%;
			left:0;
			bottom:0;
			background: #fff;
			padding:0 24rpx;
			.title {
				line-height: 100rpx;
				text-align: center;
				position: relative;
				border-bottom: 1px solid #ccc;
				.iconfont {
					position: absolute;
					width: 100rpx;
					right: 0;
					top: 0;
					color: #999;
				}
			}
			.list{
				padding-top:20rpx;
				.item{
					background: #FFF4F1;
					border-radius: 0.3em;
					overflow: hidden;
					margin-bottom:20rpx;
					padding:10rpx 0;
					.left{
						width: 150rpx;
						margin-right:30rpx;
						text-align: center;
					}
					.center{
						
					}
					.right{
						width: 200rpx;
						text-align: center;
						line-height: 144rpx;
						border-left:1px dashed #b40000;
					}
				}
			}
		}
	    .foot{
			padding:20rpx 0;
		}
	}
}
</style>
