<template>
	<view class="content">
		<view class="modal listBox">
			<view class="item flex" @tap="linkTo('activityLevel',2)">
				<view class="name">
					<image src="../../static/images/starticke.png" mode="widthFix"></image>
					<text>星票</text>
				</view>
				<view class="nums text-right flex-1">
					{{totals.total?totals.total:0}}
				</view>
				<view class="iconfont icon-right"></view>
			</view>
			<!-- <view class="item flex">
				<view class="name">
					<image src="../../static/images/icon-energy.png" mode="widthFix"></image>
					<text>星能</text>
				</view>
				<view class="nums text-right flex-1">
					10000
				</view>
				<view class="iconfont icon-right"></view>
			</view> -->
			<view class="item flex" @tap="linkTo('bankCards')">
				<view class="name">
					<image src="../../static/images/icon-bankcard.png" mode="widthFix"></image>
					<text>银行卡</text>
				</view>
				<view class="nums text-right flex-1">
					
				</view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="modal prodList">
			<view class="navBox flex">
				<view class="item flex-1" v-for="(item,ind) in nav" :key="ind" :class="{'active':item.choose}" @tap="changeNav(ind,item.key)">
					<text>{{item.val}}</text>
				</view>
			</view>

			<view class="productContent clearfix">
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMore">
					<view class="clearfix">
						<view v-for="(item, index) in dataList" :key="index" class="item flex item-center">
							<view class="item-box" @tap="gotoDetail(item)">
								<view class="pic">
									<image :src="item.imgPath" mode="widthFix"></image>
								</view>
								<view class="prd_msg">
									<view class="name clamp clamp-1">{{ item.name }}</view>
									<view class="price flex just-con-b">
										<view class="red">
											<text class="fs10">¥</text>
											<text class="fs16">{{ item.priceSale }}</text>
											<text class="c999">
												({{item.priceSale*10}}星票)
											</text>
										</view>
									</view>
									<view class="fs10 c999">
										已兑{{item.numTotalSale}}件
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="nodata" class="noData flex f-row just-con-c item-center">
						<view class="text-center">
							<image src="/static/images/nodata.png" mode="widthFix"></image>
							<view class="text-center c666 fs16">
								这里还没有内容
							</view>
						</view>
					</view>
					<view v-if="nomore" class="noMore">
						~已经到底了！~
					</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav: [],
				dataList: [],
				useType: '',
				nodata:false,
				nomore:false,
				pageIndex: 1,
				pageSize: 20,
				pageTotal: 1,
				totals:{},
				xpTypes:[]
			};
		},
		onShow() {
			if (getApp().globalData.isShowPic) {
				getApp().globalData.isShowPic = false
			} else {
				this.setParams();
				this.getTabList();
				this.getData();
				this.accountInfo()
			}
		},
		methods: {
			getTabList() {
				let self = this
				this.$acFrame.HttpService.virtualTab().then(res => {
					if (res.success) {
						let list = res.data
						let nav= []
						list.unshift(
						{
							key: '',
							val: '热销'
						});
						list.filter((v, i) => {
							if (i == 0) {
								v.choose = true
							} else {
								v.choose = false
							}
							if(v.key!=4&&v.key!=5){
								nav.push(v)
							}
						})
						self.nav = nav
					}
				})
			},
			getData() { // virtualList
				let self = this
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					useType:this.useType 
				}
				this.$acFrame.HttpService.virtualList(params).then(res => {
					if (res.success) {
						self.pageTotal = res.data.pageTotal
						let list = res.data.rows
						if(list.length>0){
							list.filter(v => {
								v.imgPath = self.$acFrame.Util.setImgUrl(v.imgPath);
								v.choose=false
								if(v.totalNums){
									if(v.totalNums>9999){
										v.totalNums = Math.round(v.totalNums/100)/100+'万件'
									}else{
										v.totalNums=v.totalNums+'件'
									}
								}else{
									v.totalNums='0件'
								}
							})
							self.dataList = self.dataList.concat(list)
						}else{
							self.nodata=true
						}
						
					}
				})
			},
			gotoDetail(item){
				uni.navigateTo({
					url:`spiritDetail?id=${item.id }&useType=${item.useType}`
				})
			},
			loadMore(){
				if(this.pageTotal>this.pageIndex){
					this.pageIndex++
					this.getData()
				}else{
					this.nomore=true
				}
			},
			changeNav(ind,type) {
				this.nav.filter((v, i) => {
					if (i == ind) {
						v.choose = true
					} else {
						v.choose = false
					}
				})
				this.setParams()
				this.useType = type
				this.getData()
			},
			setParams(){
				this.pageIndex=1
				this.dataList=[]
				this.nodata=false
				this.nomore=false
			},
			linkTo(name,type) {
				let url = ''
				debugger
				if(name=='activityLevel'){
					url+=name+'?type='+type
				}
				uni.navigateTo({
					url: url,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			accountInfo(){  //1.人名币2.星票3.活跃度
				let self =this
				let params = {
					type:2
				}
				this.$acFrame.HttpService.accountNums(params).then(res=>{
					if(res.success){
						self.totals = res.data
					}
				})
			},
			
		}
	}
</script>

<style lang="less">
	page {
		min-height: 100%;
		background: #efefef;
	}

	.modal {
		background: #fff;
		margin-top: 20rpx;
	}

	.listBox {
		padding: 0 30rpx;

		.item {
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #ccc;

			&:last-child {
				border: 0;
			}

			image {
				position: relative;
				top: -2rpx;
				width: 40rpx;
				display: inline-block;
				margin-right: 20rpx;
			}

			.iconfont {
				color: #999;
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}
	}

	.navBox {
		padding: 20rpx 0;

		.item {
			text-align: center;

			text {
				display: inline-block;
				padding: 10rpx 0;
				border-bottom: 2px solid #fff;
			}

			&.active {
				text {
					color: #b40000;
					border-color: #b40000;
				}
			}
		}
	}

	.productContent{
		padding:20rpx 10rpx 0;
		height: calc(100vh - 300rpx);
		.item{
			float:left;
			width: 50%;
			padding:0 10rpx;
			margin-bottom:20rpx;
			.item-box{
				border-radius:0.3em;
				width: 100%;
				overflow: hidden;
				box-shadow: 0 0 5px rgba(0,0,0,0.2);
			}
			.pic{
				width: 100%;
				height:auto;
				overflow: hidden;
			}
			.prd_msg{
				padding:0 20rpx 20rpx;
			}
			.name{
				margin:10rpx 0;
				text-align: justify;
			}
			.mark{
				position:relative;
				top:-2rpx;
				display: inline-block;
				padding:0 8rpx;
				border:1px solid #b40000;
				border-radius: 14rpx;
				margin-left:10rpx;
				
			}
			.price{
				padding:0 0 10rpx;
			}
		}
	}
</style>
