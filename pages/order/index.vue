<template>
	<view class="content pagebg">
		<view class="tabBox flex item-center just-con-a">
			<view v-for="(item,ind) in tabList" :key="ind" class="item" :class="{'active':item.type==orderType}" @tap="tabClick(item.type)">
				{{item.name}}
			</view>
		</view>
		<OrderItem :dataList="dataList" :nomore="nomore" :nodata="nodata" :orderType="orderType"></OrderItem>
	</view>
</template>

<script>
	import OrderItem from '@/components/order-item.vue'

	export default {
		components: {
			OrderItem,
		},
		data() {
			return {
				tabList: [{
						name: '全部',
						type: ''
					},
					{
						name: '待付款',
						type: 1
					},
					{
						name: '待拼单',
						type: 100
					},
					{
						name: '待发货',
						type: 2
					},
					{
						name: '待收货',
						type: 3
					},
					{
						name: '待评价',
						type: 4
					},
				],
				dataList: [
					// {imgPath:'',shopName:'',}
				],
				orderType: "",
				nodata: false,
				nomore: false,
				pageSize: 10,
				pageTotal: 1,
				pageIndex: 1,
				is_over: false,
				orderStatus: {},
				sts: {}
			}
		},
		onLoad(options) {
			this.getStatus()
		},
		onShow() {
			if (getApp().globalData.isShowPic) {
				getApp().globalData.isShowPic = false
			} else {
				this.setParams()
				if (this.orderType == 100) {
					this.getPGList();
				} else {
					this.getStatus();
				}
			}

		},
		onShareAppMessage(res) {
			getApp().globalData.isShowPic = true
			let settings = {}
			let index = res.target.dataset.index
			let item = this.dataList[index];
			let id = ''
			if (this.orderType == 100) {
				settings.title = `发现好物【${item.detail.goodsName}】`
				id = item.detail.goodsId
				settings.imageUrl = item.detail.goodsImgPath
			} else {
				settings.title = `发现好物【${item.detailList[0].goodsName}】`
				id = item.detailList[0].id
				settings.imageUrl = item.detailList[0].goodsImgPath
			}

			settings.pagePath = `/pages/myshop/productDetail?id=${id}&userCode=${uni.getStorageSync('userCode')}`
			return settings

			//this.$acFrame.Util.shareUrl(res,settings);
		},
		methods: {
			getStatus() {
				let self = this;
				this.$acFrame.HttpService.get("dict/order/orderStatusList").then(res => {
					console.log(res);
					if (res.success) {
						console.log(res.data);
						var tabs = res.data;
						var st = {};
						tabs.forEach(function(item) {
							st[item.val] = item.key;
							self.orderStatus[item.key] = item.val;
						});
						self.sts = st;
						self.tabList.forEach(function(item1) {
							if (st[item1.name]) {
								item1.type = st[item1.name];
							}
						});
						console.log(self.orderStatus)
						self.getList();

					}
				})
			},
			tabClick(n) {
				this.orderType = n;
				this.pageIndex = 1;
				this.dataList = [];
				this.nomore=false
				this.nodata=false
				this.is_over = false;
				if (n == 100) {
					this.getPGList()
				} else {
					this.getList();
				}

			},
			getList() {
				if (this.is_over) {
					return;
				}
				let self = this
				let params = {
					status: self.orderType,
					pageSize: self.pageSize,
					pageIndex: self.pageIndex,
				}
				self.$acFrame.HttpService.orderList(params).then(res => {
					console.log(res);
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							list.forEach(function(item) {
								
								item.statusName = self.orderStatus[item["status"]];
								item.detailList.filter(v => {
									v.goodsImgPath = self.$acFrame.Util.setImgUrl(v.goodsImgPath);
								})
							});
							if (self.pageIndex == 1) {
								self.dataList = list;
							} else {
								self.dataList = self.dataList.concat(list)
							}

						} else {
							self.is_over = true;
							self.nodata = true
						}
					} else {

					}
				})
			},
			getPGList() {
				let self = this
				let params = {
					filterWait: true,
					pageSize: self.pageSize,
					pageIndex: self.pageIndex,
				}
				self.$acFrame.HttpService.spellList(params).then(res => {
					console.log(res);
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						list.filter(v => {
							v.hour = self.$acFrame.Util.countTime(v.endTime, 'hour')
							v.minute = self.$acFrame.Util.countTime(v.endTime, 'minute')
							v.second = self.$acFrame.Util.countTime(v.endTime, 'second')
							v.showTimer = false
							v.detail.goodsImgPath = self.$acFrame.Util.setImgUrl(v.detail.goodsImgPath);
						})
						if (list.length > 0) {
							self.nodata = false
							self.dataList = self.dataList.concat(list)
						} else {
							if (self.pageIndex == 1) {
								self.nodata = true
							}
						}
						setTimeout(() => {
							self.dataList.filter(v => {
								v.showTimer = true
							})
						}, 500)
					} else {

					}
				})
			},
			setParams(){
				this.nodata = false;
				this.nomore=false
				this.dataList = []
				this.pageIndex=1
			}
		},
		onPullDownRefresh() {
			this.setParams()
			this.is_over = false;
			if (this.orderType == 100) {
				this.getPGList();
			} else {
				this.getList();
			}
			wx.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++;
				if (this.orderType == 100) {
					this.getPGList();
				} else {
					this.getList();
				}
			} else {
				this.nomore = true
				return false;
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding-top: 80rpx;
		position: relative;
	}

	.tabBox {
		position: fixed;
		width: 100%;
		height: 80rpx;
		background: #eeeeee;
		top: 0;
		padding: 0 10rpx;
		z-index: 10;
		padding: 0;

		.item {
			padding: 0;
			line-height: 40rpx;
			color: #999;
			border-bottom: 2px solid transparent;

			&.active {
				color: #b40000;
				border-color: #b40000;
			}
		}
	}
</style>
