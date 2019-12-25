<template>
	<view class="content">
		<view class="desc flex">
			<view class="detail flex-1" v-if="goodsVO.useType==2||goodsVO.useType==3">
				<view class="name blod">
					{{goodsVO.useType==2?'精灵名称：':(goodsVO.useType==3?'神兽名称：':'')}}{{goodsVO.name}}
				</view>
				<view class="listBox clearfix">
					<view class="sex">
						<text class="c999">性别：</text>{{goodsVO.spirit.genderType?(goodsVO.spirit.genderType==1?'男':'女'):'--'}}
					</view>
					<view class="item">
						<text class="c999">体力：</text>{{goodsVO.spirit.valStrength?goodsVO.spirit.valStrength:'--'}}
					</view>
					<view class="item">
						<text class="c999">智力：</text>{{goodsVO.spirit.valIntellect?goodsVO.spirit.valIntellect:'--'}}
					</view>
					<view class="item">
						<text class="c999">速度：</text>{{goodsVO.spirit.valSpeed?goodsVO.spirit.valSpeed:'--'}}
					</view>
					<view class="item">
						<text class="c999">力量：</text>{{goodsVO.spirit.valPower?goodsVO.spirit.valPower:'--'}}
					</view>
					<view class="item">
						<text class="c999">幸运：</text>{{goodsVO.spirit.valLucky?goodsVO.spirit.valLucky:'--'}}
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
				<image :src="setImg(goodsVO.imgPath)" mode="widthFix"></image>
			</view>
		</view>
		<view class="swiperBox">
			<swiper indicator-color="rgba(0,0,0,0.6)" indicator-active-color="#b40000" :indicator-dots="true" :autoplay="false"
			 :interval="3000" :duration="400">
				<swiper-item v-for="(item,ind) in goodsVO.imgList" :key="ind">
					<view class="swiper-item">
						<image :src="setImg(item)" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="otherSpirit clearfix">
			<view class="item" v-for="(item,ind) in goodsList" :key="ind" @tap="chooseItem(ind)" :class="{'active':item.choose}">
				<view class="pic">
					<image :src="setImg(item.virtualVo.imgPath)" mode="widthFix"></image>
				</view>
				<view class="text">{{item.virtualVo.name}}</view>
			</view>
			<view class="item add" @tap="buy">
				<icon class="iconfont icon-remove"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsVO:{},
				goodsList:[]
			};
		},
		onLoad(options) {
			
		},
		onShow(){
			this.getReceiveList()
		},
		methods: {
			getReceiveList() {
				let self = this
				let params = {
					pageIndex: 1,
					pageSize:100,
					fetchImgList:true,
					useType:''
				}
				this.$acFrame.HttpService.myReceiveGoods(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						if (list.length > 0) {
							list.filter((v,i)=>{
								if(i==0){
									v.choose=true
								}else{
									v.choose=false
								}
							})
							self.goodsList = list
							self.goodsVO = list[0].virtualVo
						}
					}
				})
			},
			chooseItem(index){
				let self = this
				this.goodsList.filter((v,i)=>{
					if(i==index){
						v.choose=true
						self.goodsVO = v.virtualVo
					}else{
						v.choose=false
					}
				})
				console.log(self.goodsVO)
				
			},
			buy(){
				uni.navigateTo({
					url:'myWallet'
				})
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			}
		}
	}
</script>

<style lang="less">
	.desc {
		padding: 20rpx 30rpx;

		.pic {
			width: 200rpx;
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
				border:1px solid #ccc;
				box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
			}
			&.active{
				.pic{
					border-color:#B40000;
				}
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
</style>
