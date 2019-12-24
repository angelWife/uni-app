<template>
	<view class="content">
		<view class="topmsg">
			<view class="">
				以下商品可使用如下优惠
			</view>
			<view class="center">
				<image src="/static/images/conponMark.png" mode="widthFix"></image> {{couponVO.shopInfo?"【"+couponVO.shopInfo.name+"】":""}}{{couponVO.name}}
			</view>
			<view class="c999 fs12">
				使用时间 {{couponVO.timeStart}}~{{couponVO.timeEnd}}
			</view>
		</view>
		<view class="prodList">
			<ProductList :nodata="nodata" :nomore="nomore" :dataList="dataList"></ProductList>
		</view>
	</view>
</template>

<script>
	import ProductList from '@/components/shop-product.vue'
	export default {
		components: {
			ProductList
		},
		data() {
			return {
				dataList: [],
				nodata: false,
				nomore: false,
				pageSize: 10,
				pageIndex: 1,
				pageTotal: 1,
				couponVO: {}
			};
		},
		onLoad(options) {
			this.couponVO = JSON.parse(options.obj);
			uni.setNavigationBarColor({
				backgroundColor: "#ffffff",
				frontColor: '#000000',
				animation: {
					duration: 100,
					timingFunc: 'easeIn'
				}
			})
		},
		onShow() {
			this.resetData();
			this.proList();
		},
		onPullDownRefresh(){
			this.resetData(); 
			this.proList(); 
			wx.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.proList()
			} else {
				this.nomore = true
				return false;
			}
		},
		methods: {
			proList() {
				let self = this
				let params = {
					couponId: this.couponVO.couponId,
					loadOwner: false,
					pageIndex: this.pageIndex,
					pasgeSize: this.pasgeSize
				}
				this.$acFrame.HttpService.productList(params).then(res => {
					if (res.success) {
						self.pageTotal = res.data.pageTotal
						let list = res.data.rows
						if (list.length > 0) {
							self.dataList = self.dataList.concat(list);
						} else {
							self.nodata = true
						}
					}
				})
			},
			resetData() {
				this.pageSize = 10
				this.pageIndex = 1
				this.nodata = false
				this.nomore = false
				this.dataList=[]
			}
		}
	}
</script>

<style lang="less">
	.topmsg {
		margin: 20rpx 30rpx;
		border-radius: 5px;
		background: #FFF4F1;
		padding: 20rpx 30rpx;
		.center{
			line-height: 40rpx;
			image{
				width: 150rpx;
				display: inline-block;
				margin-right:10rpx;
				margin-top:-4rpx;
			}
		}
	}

	.prodList {
		padding-toop: 20rpx;
	}
</style>
