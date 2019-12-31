<template>
	<view v-if="showReward" class="modalmask">
		<view class="modalBody flex f-col">
			<view class="nullModal flex-1" @tap="hideModal"></view>
			<view class="rewardModal">
				<view class="title">
					<block v-for="(item,index) in modalBar" :key="index">
						<text :class="{'active':item.active}" @tap="clickTap(index)">{{item.name}}</text>
					</block>
				</view>
				<view class="giftList">
					<block v-if="showType==5">
						<view class="item" v-for="(item,index) in rewardList" :key="index">
							<view class="box flex f-col just-con-c" :class="{'active':item.choose}" @tap="chooseItem(index)">
								<view class="text">{{item.name}}</view>
								<view class="pic">
									<image :src="item.imgPath" mode="widthFix"></image>
								</view>
								<view class="text">
									{{item.priceSale}}元({{item.priceSale*10}}星票)
								</view>
							</view>
						</view>
					</block>
					
				</view>
				<view class="modalfoot flex item-center">
					<view class="text">
						<checkbox-group>
							<label>
								<checkbox :value="usename" :checked="checked" color="#b40000" @tap="checkChange" /><text>优先使用星票，余额{{accountVO.balance}} </text>
							</label>
						</checkbox-group>

					</view>
					<view class="btn flex-1 text-right">
						<button class="radiuBtn" type="red" size="mini" @tap.stop="sureRward">打赏</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			rewardList: {
				type: Array,
				default () {
					return [];
				}
			},
			accountVO:{
				type: Object,
				default () {
					return {};
				}
			},
			userCode: {
				type: String,
				default () {
					return '';
				}
			},
			showReward: {
				type: Boolean,
				default () {
					return false;
				}
			}
		},
		data() {
			return {
				modalBar: [{
					name: '礼物',
					active: true,
					type:5
				}, {
					name: '我的道具',
					active: false,
					type:6
				}],
				checked: true,
				usename: 'use',
				showType:5,
				listVO:{},
			};
		},
		methods: {
			hideModal() {
				this.$emit('hideModal')
				this.modalBar[0].active=true
				this.modalBar[1].active=false
			},
			clickTap(ind) {
				let modalBar = this.modalBar
				let self = this
				modalBar.filter((v, i) => {
					if (i == ind) {
						v.active = true
						self.showType=v.type
					} else {
						v.active = false
					}
				})
				if(ind==0){
					self.$emit('getRewardList');
				} else{
					this.$.$parent.rewardList = []
				}
				this.modalBar = modalBar
			},
			checkChange(e) {
				let val = e.detail.value
				this.checked = !this.checked
			},
			chooseItem(index) {
				this.listVO = this.rewardList[index]
				this.$parent.chooseReward(index)
				//this.$emit('chooseReward',index)
			},
			sureRward() {
                	let self = this
                	let params = {
                		buyNum : 1,
                		userCode : this.userCode,
                		virtualId : this.listVO.id,
                		sceneType: 2 
                	}
                	this.$acFrame.HttpService.virtualBuy(params).then(res => {
                		if (res.success) {
							self.hideModal()
							let orderVO=res.data
							getApp().globalData.orderType = 'reward'
							uni.navigateTo({
								url:'/pages/myshop/payWay?order='+JSON.stringify(orderVO)
							})
                		}
                	})
			},
			rewardUser(id, useType) {
				this.$emit('rewardUser', id, useType)
			},
		}
	}
</script>

<style lang="less">
	.modalBody {
		height: 100%;
	}

	.rewardModal {
		background: #fff;
		bottom: 0;
		transform: bottom 0.3s easy;
		padding-bottom:60rpx;
		.title {
			height: 80rpx;
			line-height: 80rpx;

			text {
				display: inline-block;
				padding: 0 20rpx;
			}

			.active {
				font-size: 32rpx;
				color: #b40000;
			}
		}

		.giftList {
			padding: 10rpx;
			overflow: hidden;
			min-height:180rpx;
			.item {
				padding: 10rpx;
				width: 25%;
				float: left;

				.box {
					height: calc((100vw - 20rpx) / 4 - 20rpx);
					border-radius: 0.5em;
					background: #eee;
					border:1px solid #eee;
					.pic {
						padding: 0 20%;
					}

					.text {
						font-size: 20rpx;
						color: #999;
						padding: 10rpx 0;
						text-align: center;

						>view {
							width: 50%;
							text-align: center;
						}
					}

					&.active {
						background: #fff;
						box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
						border-color:#B40000;
						.text {
							color: #B40000;
						}
					}
				}

			}
		}

		.modalfoot {
			height: 80rpx;
			padding: 0 20rpx 20rpx;
			margin-top:20rpx;
			.text {
				margin-right: 30rpx;
			}
		}
	}
</style>
