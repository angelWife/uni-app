<template>
	<view class="content">
		<view class="item" v-for="(item,ind) in addrList" :key="ind">
			<view class="top">
				<text class="fs15">{{item.name}}</text>
				<text class="c999">{{item.phone}}</text>
			</view>
			<view class="center flex">
				<view class="text flex-1">
					{{item.areaProvince}}{{item.areaCity}}{{item.areaCounty}}{{item.address}}
				</view>
				<view class="btn">
					<button type="null" size="mini" @tap="chooseAddr(ind)">使用</button>
				</view>
			</view>
			<view class="foot flex item-center">
				<view class="flex-1">
					<label class="radio" :class="[item.isDefault?'red':'c999']">
						<radio :value="item.id" :checked="item.flagDft" @tap="changeDefault(ind)" color="#B40000" />设为默认</label>
				</view>
				<view class="c999">
					<text class="c999" @tap="editAddr(ind)">编辑</text>
					<text class="c999" :class="{'red':item.flagTop}" @tap="setAddr(item.id,'top')">置顶</text>
				</view>
			</view>
			<icon class="iconfont icon-clear" @tap="deleteAddr(ind)"></icon>
		</view>
		<view class="addBtn" @tap="showModal">
			<icon class="iconfont icon-add"></icon>
			新增地址
		</view>
		<view class="modalmask addAddr flex item-center just-con-c" v-if="showAddrModal">
			<view class="modalmian">
				<view class="title">
					{{modalTitle}}
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="modalCenter">
					<view class="flex border">
						<view class="flex-1 input border-right">
							<input type="text" v-model="name" placeholder="收货人姓名" />
						</view>
						<view class="flex-1 input">
							<input type="text" v-model="mobilePhone" placeholder="联系电话" />
						</view>
					</view>
					<view class="input border">
						<picker class="mypicker" @change="bindAreaChange" mode="region" :value="region">
							<view class="uni-input">{{region[0]}}{{region[1]}}{{region[2]}}</view>
						</picker>
					</view>
					<view class="input border">
						<input type="text" v-model="address" placeholder="详细地址（如街道、小区、乡镇、村)" />
						<view class="location">
							<icon class="iconfont icon-dizhi"></icon>
							<view class="fs10">定位</view>
						</view>
					</view>
				</view>
				<view class="foot">
					<button type="red" @tap="save">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrList: [],
				modalTitle: '新增收货地址',
				region: ['', '', '请选择'],
				customItem: '全部',
				showAddrModal: false,
				addrVO: {},
				type: 'add',
				name: '',
				mobilePhone: '',
				address: ''
			};
		},
		onLoad(options) {},
		onShow() {
			this.addrList = []
			this.getList()
		},
		methods: {
			getList() {
				let self = this
				self.$acFrame.HttpService.addrList().then(res => {
					if (res.success) {
						let addrList = res.data
						addrList.filter(v=>{
							if(v.flagDft==1){
								v.flagDft = true
							}else{
								v.flagDft=false
							}
							if(v.flagTop ==1){
								v.flagTop  = true
							}else{
								v.flagTop =false
							}
						})
						self.addrList = addrList
					}
				})
			},
			editAddr(ind) {
				this.type = 'edit'
				this.modalTitle = '编辑收货地址'
				let addrVO = this.addrList[ind];
				this.addrVO = addrVO;
				this.name = addrVO.name;
				this.mobilePhone = addrVO.mobilePhone;
				this.address = addrVO.address;
				console.log(addrVO);
				this.region = [addrVO.areaProvince, addrVO.areaCity, addrVO.areaCounty];
				this.showAddrModal = true;
			},
			deleteAddr(ind) {
				let self = this
				let params = {
					id: this.addrVO.id
				}
				uni.showModal({
					title: '提示',
					content: '是否删除改收货地址？',
					success: function(res) {
						if (res.confirm) {
							self.$acFrame.HttpService.deleteAddr(params).then(res => {
								if (res.success) {
									self.getList()
								}
							})
						} else if (res.cancel) {

						}
					}
				});

			},
			changeVal(e, name) {
				this.addrVO[name] = e.detail.value
			},
			save() {
				let self = this;
				let params = this.addrVO;
				params["name"] = this.name;
				params["mobilePhone"] = this.mobilePhone;
				params["address"] = this.address;
				params["flagTop"] = 1;
				if (this.type == 'add') {
					self.$acFrame.HttpService.addAddr(params).then(res => {
						if (res.success) {
							self.$acFrame.Util.mytotal('新增成功')
							self.getList()
							self.showAddrModal = false;
						}
					})
				} else {

					self.$acFrame.HttpService.deitAddr(params).then(res => {
						if (res.success) {
							self.$acFrame.Util.mytotal('编辑成功');
							self.getList();
							self.showAddrModal = false;
						}
					})
				}

			},
			changeDefault(ind) {
				let item = this.addrList[ind]
				this.addrList.filter((v, i) => {
					if (i == ind) {
						v.flagDft = true
					} else {
						v.flagDft = false
					}
				})
				this.setAddr(item.id,'default');

			},
			setAddr(id,type){
				let self = this
				let text=''
				let params = {
					isDft:false,
					isTop:false,
					id:id
				}
				if(type=='top'){
					params.isTop=true
					text='置顶成功'
				} else{
					params.isDft=true
					text='设置默认地址成功'
				}
				self.$acFrame.HttpService.setAddr(params).then(res => {
					if (res.success) {
						self.getList()
					}
				})
			},
			bindAreaChange(e) {
				let vals = e.detail.value
				this.region = vals
				this.addrVO.areaProvince = vals[0]
				this.addrVO.areaCity = vals[1]
				this.addrVO.areaCounty = vals[2]
			},
			showModal() {
				this.showAddrModal = true
				this.modalTitle = '新增收货地址'
				this.type = 'add'
				this.addrVO = {},
					this.name = '';
				this.mobilePhone = '';
				this.address = '';
				this.region = ['', '', '请选择']
			},
			closeModal() {
				this.showAddrModal = false
			},
			chooseAddr(ind) {
				let pages = getCurrentPages()
				let addrVO = this.addrList[ind]
				if (pages.length > 1) {
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.setAddr) {
						prePage.$vm.setAddr(addrVO)
						wx.navigateBack({})
					}
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		min-height: 100%;
		background: #efefef;
	}

	.item {
		background: #fff;
		padding: 0 24rpx;
		margin-bottom: 20rpx;
		position: relative;

		text {
			display: inline-block;
		}

		.top {
			line-height: 40rpx;
			padding-top: 20rpx;

			text {
				margin-right: 30rpx;
			}
		}

		.center {
			padding: 10rpx 0;

			.text {
				width: 80%;
			}

			.btn {
				padding-left: 40rpx;

				button {
					padding: 0;
					line-height: 40rpx;
					width: 80rpx;
					font-size: 24rpx;
				}
			}
		}

		.iconfont {
			position: absolute;
			height: 50rpx;
			line-height: 50rpx;
			width: 60rpx;
			text-align: center;
			color: #999;
			top: 0;
			right: 0;
		}

		.foot {
			border-top: 1px solid #ccc;
			padding: 16rpx 0;

			text {
				margin-left: 30rpx;
			}
		}
	}

	.addBtn {
		margin: 30rpx;
		border-radius: 0.3em;
		background: #B40000;
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;

		.iconfont {
			margin-right: 20rpx;
		}
	}

	.addAddr {
		.modalmian {
			background: #fff;
			width: 80%;
			margin: 0 auto;
			border-radius: 0.3em;
			overflow: hidden;

			.title {
				line-height: 80rpx;
				text-align: center;
				position: relative;
				font-size: 30rpx;
				border-bottom: 1px solid #ccc;

				.iconfont {
					position: absolute;
					width: 100rpx;
					right: 0;
					top: 0;
					color: #999;
				}
			}

			.input {
				height: 80rpx;
				position: relative;

				.mypicker {
					line-height: 80rpx;
					padding: 0 20rpx;
				}

				input {
					line-height: 80rpx;
					height: 80rpx;
					padding: 0 20rpx;
				}

				.location {
					position: absolute;
					height: 80rpx;
					line-height: 1;
					z-index: 5;
					top: 0;
					right: 0;
					width: 80rpx;
					text-align: center;

					.iconfont {
						color: #B40000;
					}
				}
			}

			.border {
				border-bottom: 1px solid #ccc;
			}

			.border-right {
				border-right: 1px solid #ccc;
			}

			.foot {
				padding: 20rpx;
			}
		}
	}
</style>
