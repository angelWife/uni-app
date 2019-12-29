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
			<view class="pic">
				<image :src="goodsVO.showPicPath" mode="widthFix"></image>
				<text v-if="goodsVO.spirit.isDefault">使用中</text>
			</view>
		</view>
		<view class="swiperBox" v-if="goodsVO.imgList.length>0">
			<swiper indicator-color="rgba(0,0,0,0.6)" indicator-active-color="#b40000" :indicator-dots="true" :autoplay="false"
			 :interval="3000" :duration="400">
				<swiper-item v-for="(item,ind) in goodsVO.imgList" :key="ind">
					<view class="swiper-item">
						<image :src="item" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="otherSpirit">
			<scroll-view scroll-x="true" >
				<view class="picbox clearfix" :style="mystyle">
					<view class="item" v-for="(item,ind) in goodsList" :key="ind" @tap="chooseItem(ind)" :class="{'active':item.choose}">
						<view class="pic">
							<image :src="item.virtualVo.showPicPath" mode="widthFix"></image>
						</view>
						<view class="text textEllipsis">{{item.virtualVo.name}}</view>
					</view>
					<view class="item">
						<view class="add" @tap="buy">
							<icon class="iconfont icon-remove"></icon>
						</view>
						<view class="text"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="footbtn">
			<button type="red" @tap="setDefault">设为默认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsVO:{},
				goodsList:[],
				mystyle:''
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
					useTypeList:[2,3],
					showDefault:true,
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
								let _obj = v.virtualVo
								let showPicPath = (_obj.spirit&&_obj.spirit.imgHeadPath)?_obj.spirit.imgHeadPath:_obj.imgPath
								_obj.showPicPath = self.setImg(showPicPath)
								_obj.imgList.filter((img,j)=>{
									_obj.imgList[j] = self.setImg(img)
								})
								list[i].virtualVo = _obj
							})
							self.mystyle = `width:${(list.length+1)*180}rpx`
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
			setDefault(){
				let self = this 
				let params = {
					id:this.goodsVO.id
				}
				this.$acFrame.HttpService.setDefault(params).then(res=>{
					if(res.success){
						self.$acFrame.Util.mytotal('设置成功！')
						self.getReceiveList()
					}
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
			width: 300rpx;
			margin-left: 20rpx;
			border-radius:0.3em;
			position:relative;
			overflow: hidden;
			text{
				position: absolute;
				top: -10px;
				right: -40px;
				z-index: 5;
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
				color: #fff;
				background: #b40000;
				width: 100px;
				text-align: center;
				line-height: 55px;
				font-size: 20rpx;
				height: 40px;

			}
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
		
		scroll-view{
			height:220rpx;
		}
		.picbox{
			white-space: nowrap;
			height:100%;
		}
		.item {
			float:left;
			width: 160rpx;
			margin: 0 10rpx;
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
				height:60rpx;
				line-height: 60rpx;
				text-align: center;
			}
		}

		.add {
			height: 160rpx;
			width: 160rpx;
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
	.footbtn{padding:20rpx 30rpx;}
</style>
