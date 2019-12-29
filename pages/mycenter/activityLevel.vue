<template>
	<view class="content pagebg flex f-col">
		<view class="head">
			<view class="">
				<text v-if="totals.type==1">人名币</text>
				<text v-if="totals.type==2">星票</text>
				<text v-if="totals.type==3">活跃度</text>
				<text class="float-right blue">规则说明</text>
			</view>
			<view class="red blod fs16">
				{{totals.total?totals.total:0}}
			</view>
		</view>
		<view class="listBox flex-1">
			<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMore">
				<view class="item flex item-center" v-for="(item,ind) in list" :key="ind">
					<view class="flex-1">
						<view class="">
							{{item.typeName?item.typeName:''}}
						</view>
						<view class="fs10 c999">
							{{item.bizTime?item.bizTime:""}}
						</view>
					</view>
					<view class="blod" :class="[item.itemType?'blue':'red']">
						<text v-if="item.itemType">+</text>
						<text v-else>-</text>
						{{item.amount}}
					</view>
				</view>
			</scroll-view>
			<view v-if="nodata" class="noData flex f-row just-con-c item-center">
				<view class="text-center">
					<image src="/static/images/nodata.png" mode="widthFix"></image>
					<view class="text-center c666 fs16">
						这里还没有内容
					</view>
				</view>
			</view>
			<view class="noMore" v-if="nomore">
				~已经到底了！~
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				totals: {},
				xpTypes: [],
				list: [],
				pageIndex: 1,
				pageSize: 20,
				pageTotal: 1,
				nodata: false,
				nomore: false
			};
		},
		onLoad(options) {
			this.type = options.type*1
			let name = ''
			switch (this.type) {
				case 1:
					name = '人名币'
					break;
				case 2:
					name = '星票'
					break;
				case 3:
					name = '活跃度'
					break;
				default:
					break;
			}
			uni.setNavigationBarTitle({
				title: name
			})
		},
		onShow() {
			this.setparams()
			this.accountInfo()
			this.getXPTypes()
		},
		methods: {
			setparams() {
				this.pageIndex = 1
				this.nodata = false
				this.nomore = false
				this.list = []
				this.xpTypes = []
			},
			loadMore() {
				if (this.pageIndex < this.pageTotal) {
					this.pageIndex++
					this.getList()
				} else {
					this.nodata = true
				}
			},
			accountInfo() { //1.人名币2.星票3.活跃度
				let self = this
				let params = {
					type: this.type
				}
				this.$acFrame.HttpService.accountNums(params).then(res => {
					if (res.success) {
						self.totals = res.data
					}
				})
			},
			getList() {
				let self = this
				let params = {
					type: this.type,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				this.$acFrame.HttpService.accountInfo(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							debugger
							list.filter(fv => {
								if (fv.bizTime) {
									fv.bizTime = self.$acFrame.Util.formatTime(fv.bizTime, 'dayhm')
								}
								self.xpTypes.forEach((cv,i) => {
									if (fv.bizType == cv.key) {
										fv.typeName = cv.val
										fv.itemType = cv.extendData
									}
								})
								fv.amount=Math.abs(fv.amount)
							})
							self.list = self.list.concat(list)
						} else {
							self.nodata = true
						}

					}
				})
			},
			getXPTypes() {
				let self = this
				// let xpTypes=uni.getStorageSync('xpTypes')
				// if(xpTypes){
				// 	this.xpTypes = xpTypes
				// 	this.getList()
				// }else{
				if (this.type == 1) {
					this.$acFrame.HttpService.getRMBTypes().then(res => {
						if (res.success) {
							self.xpTypes = res.data
							// uni.setStorageSync('xpTypes', res.data)
							self.getList()
						}
					})
				} else if (this.type == 2) {
					this.$acFrame.HttpService.getXPTypes().then(res => {
						if (res.success) {
							self.xpTypes = res.data
							// uni.setStorageSync('xpTypes', res.data)
							self.getList()
						}
					})
				} else if (this.type == 3) {
					this.$acFrame.HttpService.getActiveTypes().then(res => {
						if (res.success) {
							self.xpTypes = res.data
							// uni.setStorageSync('xpTypes', res.data)
							self.getList()
						}
					})
				}

				// }


			}
		}
	}
</script>

<style lang="less">
	.content {
		height: 100vh;
		overflow: hidden;
	}

	.head {
		padding: 20rpx 24rpx;
		background: #fff;
	}

	.listBox {
		margin-top: 20rpx;
		height: calc(100vh - 150rpx);
		background: #fff;
		padding: 0 24rpx;

		.item {
			padding: 20rpx 0;
			border-bottom: 1px solid #ccc;
		}
	}
</style>
