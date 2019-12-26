<template>
	<view class="content pagebg">
		<view class="tabBox flex item-center">
			<view v-for="(item, ind) in tabList" :key="ind" class="item" :class="{ active: item.choose }" @tap="tabClick(ind)">
				{{ item.name }}
			</view>
		</view>
		<view class="orderList">
			<view v-for="(item, index) in dataList" :key="index" class="item" @tap.stop="goOrderDetail(item)">
				<view class="item_head flex item-center">
					<view class="pic">
						<image :src="setImg(item.shopInfo.imgPath?item.shopInfo.imgPath:'')" mode="widthFix" />
					</view>
					<view class="name flex-1 textEllipsis">{{item.shopInfo.name}}</view>
					<view class="status orange">
						<text class="">{{item.statusName}}</text>
					</view>
				</view>
				<view class="item_body flex" v-for="(ditem,dind) in item.detailList " :key="dind">
					<view class="pic">
						<image :src="ditem.goodsImgPath" mode="widthFix" />
					</view>
					<view class="flex-1">
						<view class="flex">
							<view class="name flex-1 clamp clamp-2">
								{{ditem.goodsName}}
							</view>
							<view class="text-right">
								<view class="salePrice">¥{{ditem.priceBuy}}</view>
								<view class="nums fs12 c999">x{{ditem.buyNum}}</view>
							</view>
						</view>
						<view class="spec">
							<text>{{ditem.goodsSkuPropValue}}</text>
						</view>
					</view>
				</view>

				<view class="payprice text-right red">
					
					实付：<text class="fs12">¥</text><text class="pr30">{{item.orderInfo.pricePay}}</text>
					<block v-if="item.status==3||item.status==1">
						退款：<text class="fs12">¥</text><text>{{item.moneyAsk}}</text>
					</block>
				</view>
				<view class="orderBtn text-right">
					<block v-if="item.status==1">
						<button type="null" @tap.stop="cancelRefund(item.id)">取消申请</button>
					</block>
					<block v-if="item.status==2||item.status==4">
						<button type="null" @tap.stop="refundAgain(item)">重新申请</button>
					</block>
					<button type="rednull" @tap.stop="goDetail(item)">售后详情</button>
				</view>
			</view>
			<view v-if="nodata" class="noData flex f-row just-con-c item-center">
				<view class="text-center">
					<image src="/static/images/nodata.png" mode="widthFix"/>
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
	import OrderItem from "@/components/order-item.vue";

	export default {
		components: {
			OrderItem
		},
		data() {
			return {
				tabList: [{
						name: "全部",
						choose: true,
						type: ""
					},
					{
						name: "处理中",
						choose: false,
						type: "1"
					},
					{
						name: "已完成",
						choose: false,
						type: "3"
					},
					{
						name: "已取消",
						choose: false,
						type: "2"
					},
					{
						name: "已拒绝",
						choose: false,
						type: "4"
					}
				],
				dataList: [],
				orderStatus: [],
				orderType: "",
				title:'全部',
				nodata: false,
				nomore: false,
				pageIndex: 1,
				pagesize: 10,
				pageTotal: 1
			};
		},
		onShow() {
			this.getStatus()
		},
		onPullDownRefresh() {
			this.setParams()
			this.getList();
			wx.stopPullDownRefresh()
		},
		onReachBottom() {

			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.getList();
			} else {

				this.nomore = true
				return false;
			}
		},
		methods: {
			getStatus() {
				let self = this;
				this.$acFrame.HttpService.refundStatus().then(res => {
					if (res.success) {
						console.log(res.data);
						var tabs = res.data;
						var st = {};

						tabs.filter(function(item) {
							self.orderStatus[item.key] = item.val;
						});
						self.getList();

					}
				})
			},
			getList() {
				let self = this
				let params = {
					status: this.orderType,
					pageSize: self.pagesize,
					pageIndex: self.pageIndex,
				}
				self.$acFrame.HttpService.refundList(params).then(res => {
					console.log(res);
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							list.forEach(function(item) {
								item["statusName"] = self.orderStatus[item["status"]];
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
			goDetail(item){
				let title = ''
				uni.navigateTo({
					url:"procesDetail?id="+item.id+'&title='+title
				})
			},
			goOrderDetail(item){
				let title = ''
				uni.navigateTo({
					url:"orderDetail?id="+item.orderId+'&title='+title
				})
			},
			tabClick(ind) {
				this.tabList.filter((v,i)=>{
					if(i==ind){
						v.choose=true
						this.orderType = v.type?v.type * 1:'';
						this.title = v.name
					}else{
						v.choose=false
					}
				})
				this.setParams()
				this.getList();
			},
			cancelRefund(id){
				let self = this
				this.$acFrame.HttpService.cancelRefund({id:id}).then(res => {
					if (res.success) {
				self.$acFrame.Util.mytotal('取消售后成功！')
				setTimeout(()=>{

					self.getList()
				},1000)
					}
				})
			},
			refundAgain(item){
        		let obj={
					orderId: item.orderId,
					orderDetailId: item.detailList[0]?item.detailList[0].id:'',
					price: item.moneyAsk,
					askNum: item.detailList[0]?item.detailList[0].buyNum:'',
					phone: item.address ? item.address.receiverMobilePhone : ''
        		}
        		let type = item.type == 2 ? 'hasgoods':'nullgoods'
				uni.navigateTo({
					url:'/pages/order/returnForm?orderData=' + JSON.stringify(obj) + '&type='+type
				})
    		},
			setParams(){
				this.nomore=false
				this.nodata=false
				this.pageIndex = 1;
				this.dataList = [];
			},
			setImg(src) {
				return this.$acFrame.Util.setImgUrl(src);
			},
		}
	};
</script>

<style lang="less" scoped>
	.content {
		padding-top: 80rpx;
	}

	.tabBox {
		position: fixed;
		width: 100%;
		height: 80rpx;
		top: 0;
		left: 0;
		z-index: 10;
		padding: 0 20rpx;
		background: #eee;
		.item {
			padding: 0 10rpx;
			line-height: 40rpx;
			color: #999;
			margin-right: 20rpx;
			border-bottom: 2px solid transparent;

			&.active {
				color: #b40000;
				border-color: #b40000;
			}
		}
	}

	.orderList {
		.item {
			background: #fff;
			margin: 0 24rpx 20rpx;
			border-radius: 0.4em;

			.item_head {
				padding: 10rpx 20rpx;

				.pic {
					width: 60rpx;
					height: 60rpx;
					border-radius: 60rpx;
					overflow: hidden;
					margin-right: 20rpx;
				}

				.name {
					width: 50%;
				}

				.status {
					text {
						display: inline-block;
					}
				}
			}

			.item_body {
				padding: 10rpx 20rpx 0;

				.pic {
					width: 160rpx;
					height: 160rpx;
					overflow: hidden;
					margin-right: 20rpx;
				}

				.spec {
					text {
						display: inline-block;
						font-size: 24rpx;
						padding: 0 10rpx;
						background: #f8f8f8;
						color: #999;
						margin: 10rpx 10rpx 0 0;
					}
				}
			}

			.payprice {
				padding: 0 20rpx;
				line-height: 60rpx;
			}

			.orderBtn {
				padding: 20rpx;

				button {
					display: inline-block;
					height: 60rpx;
					line-height: 60rpx;
					min-width: 160rpx;
					padding: 0 20rpx;
					border-radius: 60rpx;
					margin-left: 20rpx;
				}
			}
		}

		.mr20 {
			margin-right: 20rpx;
		}
	}
</style>
