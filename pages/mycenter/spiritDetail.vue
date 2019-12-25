<template>
	<view class="content">
		<view class="desc flex">
			<view class="detail flex-1" v-if="useType==2||useType==3">
				<view class="name blod">
					{{details.useType==2?'精灵名称：':(details.useType==3?'神兽名称：':'')}}{{details.name}}
				</view>
				<view class="listBox clearfix">
					<view class="sex">
						<text class="c999">性别：</text>{{details.spirit.genderType?(details.spirit.genderType==1?'男':'女'):'--'}}
					</view>
					<view class="item">
						<text class="c999">体力：</text>{{details.spirit.valStrength?details.spirit.valStrength:'--'}}
					</view>
					<view class="item">
						<text class="c999">智力：</text>{{details.spirit.valIntellect?details.spirit.valIntellect:'--'}}
					</view>
					<view class="item">
						<text class="c999">速度：</text>{{details.spirit.valSpeed?details.spirit.valSpeed:'--'}}
					</view>
					<view class="item">
						<text class="c999">力量：</text>{{details.spirit.valPower?details.spirit.valPower:'--'}}
					</view>
					<view class="item">
						<text class="c999">幸运：</text>{{details.spirit.valLucky?details.spirit.valLucky:'--'}}
					</view>

				</view>
			</view>
			<view class="detail flex-1" v-else>
				<view class="name blod">
					精灵名称：流氓兔
				</view>
				<view class="listBox clearfix">
					虚拟商品简介
				</view>
			</view>
			<view class="pic">
				<image :src="setImg(details.imgPath)" mode="widthFix"></image>
			</view>
		</view>
		<view class="swiperBox">
			<swiper indicator-color="rgba(0,0,0,0.6)" indicator-active-color="#b40000" :indicator-dots="true" :autoplay="false"
			 :interval="3000" :duration="400">
				<swiper-item v-for="(item,ind) in details.imgList" :key="ind">
					<view class="swiper-item">
						<image :src="setImg(item)" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="footBin">
			<button type="red" @tap="sureRward">购买</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				useType:0,
				details:{}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.useType=options.useType
		},
		onShow(){
			this.getDetai()
		},
		methods: {
			getDetai() {
				let self = this
				let params = {
					fetchImgList:true,
					fetchReceive :true,
					useType :this.useType,
					virtualId:this.id
				}
				this.$acFrame.HttpService.receiveDetail(params).then(res => {
					if (res.success) {
						self.details = res.data
						uni.setNavigationBarTitle({
							title:res.data.name
						})
					}
				})
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			},
			sureRward() {
			    	let self = this
			    	let params = {
			    		buyNum : 1,
			    		userCode : this.details.userCode,
			    		virtualId : this.details.id,
			    		sceneType: 3
			    	}
			    	this.$acFrame.HttpService.virtualBuy(params).then(res => {
			    		if (res.success) {
							uni.navigateTo({
								url:'/pages/myshop/payWay?order='+JSON.stringify(res.data)
							})
			    		}
			    	})
			},
		}
	}
</script>

<style lang="less">
	.desc {
		padding: 20rpx 30rpx;

		.pic {
			width: 400rpx;
			margin-left: 20rpx;
		}

		.detail {
			line-height: 50rpx;

			.item {
				float: left;
				width: 50%;
			}
		}

	}

	.swiperBox {
		margin: 24rpx 30rpx;
		height: calc(100vw - 48rpx);

		swiper {
			height: 100%;
		}
	}

	.otherSpirit {
		padding: 0 14rpx;

		.item {
			float: left;
			width: 160rpx;
			margin: 0 10rpx 20rpx;

			.pic {
				width: 100%;
				height: 160rpx;
				overflow: hidden;
				box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
			}

			.text {
				line-height: 60rpx;
				text-align: center;
			}
		}

		.add {
			height: 160rpx;
			box-sizing: border-box;
			line-height: 160rpx;
			text-align: center;
			border: 1px dashed #ccc;
			border-radius: 0.2em;
			color: #999;

			.iconfont {
				transform: rotate(45deg);
				font-size: 48rpx;
			}
		}
	}
	.footBin{
		padding:20rpx 30rpx;
		button{
			width: 100%;
		}
	}
</style>
