<template>
	<view class="content">
		<view class="searchBox flex">
			<view class="flex-1 input">
				<icon @tap="searchData" class="iconfont icon-search"></icon>
				<input v-if="isSearch" type="text" @input="changeVal" confirm-type="search" v-model="keywords" @confirm="searchData" />
				<input v-else type="text" value="" @tap="searchClick" disabled />
				<icon class="iconfont icon-clear"></icon>
			</view>
			<view class="search" v-if="isSearch"><button @tap="cancelSearch" size="mini" type="text" hover-class="none">取消</button></view>
		</view>
		<view class="resBox" v-if="isSearch">
			<view class="fastSearch" v-if="nosearch">
				<view class="histroy" v-if="historyList.length > 0">
					<view class="title">
						<text>历史记录</text>
						<icon class="iconfont icon-delete" @tap="clearHistory"></icon>
					</view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in historyList" :key="index">
							<view class="item" @tap="tapSearch(item)">{{ item }}</view>
						</block>
					</view>
				</view>
				<view class="hotSearch" v-if="hotSearch.length > 0">
					<view class="title"><text>热门搜索</text></view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in hotSearch" :key="index">
							<view class="item" @tap="tapSearch(item)">{{ item }}</view>
						</block>
					</view>
				</view>
			</view>
			<view class="searchList" v-else>
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData">
					<view class="shopList">
						<view class="item" v-for="(item,ind) in dataList" :key="ind">
							<view class="shopMsg flex item-center" @tap="shopDetail(item.shopInfoVo.id)">
								<view class="pic">
									<image :src="setImg(item.shopInfoVo.imgPath)" mode="widthFix"></image>
								</view>
								<view class="flex-1">
									<view class="name clearfix">
										<view class="shopname float-left textEllipsis">{{item.shopInfoVo.name}}</view>
										<view class="fs12 c999 float-right">已被{{item.shopInfoVo.numTotalFollow}}人圈粉</view>
									</view>
									<view class="text c999 textEllipsis">{{item.shopInfoVo.describe}}</view>
								</view>
							</view>
							<scroll-view scroll-x="true">
								<view class="proItem" v-for="(proItem,proInd) in item.goodsList" :key="proInd" @tap="productDetail(proItem.goodsId)">
									<view class="pic"><image :src="setImg(proItem.imgPath)" mode="widthFix"></image></view>
									<view class="name textEllipsis">{{proItem.goodsName}}</view>
									<view class="price red">
										<text class="fs12">¥</text>
										<text class="fs15">{{proItem.priceSale}}</text>
										<text class="mark" v-if="proItem.flagSpell==1">拼</text>
									</view>
								</view>
							</scroll-view>
							<view class="advent c999 fs10" v-if="item.type==2">
								广告
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
				</scroll-view>
			</view>
		</view>
		<view class="listBox" v-else>
			<view class="title">精品小店</view>
			<view class="shopList">
				<view class="item" v-for="(item,ind) in dataList" :key="ind">
					<view class="shopMsg flex item-center"  @tap="shopDetail(item.shopInfoVo.id)">
						<view class="pic">
							<image :src="setImg(item.shopInfoVo.imgPath)" mode="widthFix"></image>
						</view>
						<view class="flex-1">
							<view class="name clearfix">
								<view class="shopname float-left textEllipsis">{{item.shopInfoVo.name}}</view>
								<view class="fs12 c999 float-right">已被{{item.shopInfoVo.numTotalFollow}}人圈粉</view>
							</view>
							<view class="text c999 textEllipsis">{{item.shopInfoVo.describe}}</view>
						</view>
					</view>
					<scroll-view scroll-x="true">
						<view class="proItem" v-for="(proItem,proInd) in item.goodsList" :key="proInd" @tap="productDetail(proItem.goodsId)">
							<view class="pic"><image :src="setImg(proItem.imgPath)" mode="widthFix"></image></view>
							<view class="name textEllipsis">{{proItem.goodsName}}</view>
							<view class="price red">
								<text class="fs10">¥</text>
								<text class="fs16">{{proItem.priceSale}}</text>
								<text class="mark" v-if="proItem.flagSpell==1">拼</text>
							</view>
						</view>
					</scroll-view>
					<view class="advent c999 fs10" v-if="item.type==2">
						广告
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
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isSearch: false,
			showOper: false, // 发布的操作
			showPic: false, // 打开图片无需重新加载数据
			keywords: '',
			historyList: ['苹果的nfc怎么打开', '王者的积分战队怎么玩的流', '苹果手机被锁住了怎么办'],
			hotSearch: ['四大名著', '护肤品', '女士口红', '女士香水', '怎么让孩子听话'],
			nosearch: true,
			dataList: [
				{
					name: '这边的是产品的名称，最多显示两行，超出两行的省略号',
					price: '52.00',
					salesNum: 21623,
					pic:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'
				},
				{
					name: '韩版新款复古水晶耳饰饰品欧美时尚高档小香耳钉耳环批发',
					price: '7.50',
					salesNum: 152000,
					pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'
				},
				{
					name: '溢彩水彩手帐本随身旅行绘画皮面便携手账本300g中粗纹进口水彩纸',
					price: '7.50',
					salesNum: 152000,
					pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg'
				},
				{
					name: '这边的是产品的名称，最多显示两行，超出两行的省略号',
					price: '52.00',
					salesNum: 21623,
					pic:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg'
				},
				{
					name: '韩版新款复古水晶耳饰饰品欧美时尚高档小香耳钉耳环批发',
					price: '7.50',
					salesNum: 152000,
					pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'
				},
				{
					name: '溢彩水彩手帐本随身旅行绘画皮面便携手账本300g中粗纹进口水彩纸',
					price: '7.50',
					salesNum: 152000,
					pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=123919148,3561097999&fm=15&gp=0.jpg'
				}
			],
			pagesize:100,
			pageIndex:1,
			pageTotal:1,
			nodata:false
		};
	},
	onShow(){
		this.initData();
	},
	methods: {
		initData(){
			let self = this
			let params = {
				keywords:'',
				pageIndex:this.pageIndex,
				pageSize:this.pageSize
			}
			self.$acFrame.HttpService.shopList(params).then(res => {
                if(res.success){
					let list = res.data.rows
					self.pageTotal = res.data.pageTotal
					if(list.length>0){
						self.nodata=false
						self.dataList = list
					}else{
						self.nodata=true
						self.dataList = []
					}
					if(self.isSearch){
						self.nosearch = false
					}
				}else{

				}
			})
		},
		searchClick() {
			this.isSearch = true;
			this.dataList = []
			this.historyList = uni.getStorageSync('historyList') || [];
			this.hotSearch = this.$acFrame.Util.getHotList(2);
		},
		cancelSearch() {
			this.isSearch = false;
			this.searchVal = false;
			this.nosearch = true
		},
		searchData() {
			let val = this.keywords;
			this.pageIndex = 0;
			this.pageSize = 10;
			this.pageType = null;
			let historyList = uni.getStorageSync('historyList') || [];
			if (historyList.length < 10) {
				historyList.shift(val);
			} else {
				historyList.splice(9, 1);
				historyList.shift(val);
			}
			uni.setStorageSync('historyList', historyList);
			this.initData();
		},
		//清空历史
		clearHistory() {
			uni.setStorageSync('historyList', []);
		},
		tapSearch(val) {
			this.resetData();
			this.pageType = null;
			this.keywords = val;
			this.initData();
		},
		shopDetail(id){
			
			wx.navigateTo({
				url:`shopDetail?id=${id}`
			})
		},
		productDetail(id){
			console.log(id);
			wx.navigateTo({
				url:"productDetail?id="+id
			})
		},
		setImg(src){
			return  this.$acFrame.Util.setImgUrl(src);
		}
	}
};
</script>

<style lang="less">
page {
	min-height: 100%;
	background: #eee;
}
.content {
	padding-top: 90rpx;
	.advent{
		margin-top:10rpx;
	}
}
.searchBox {
	padding: 20rpx 24rpx 10rpx;
	background: #eee;
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	.input {
		position: relative;
		height: 80rpx;
		line-height: 80rpx;
		background: #fff;
		border-radius: 0.2em;
		input {
			width: 100%;
			padding: 0 60rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		.iconfont {
			position: absolute;
			top: 0;
			width: 60rpx;
			text-align: center;
			color: #999;
		}
		.icon-clear {
			right: 0;
		}
	}
	.search {
		position: relative;
		margin-left: 24rpx;
		button {
			height: 80rpx;
			line-height: 80rpx;
		}
	}
}
.resBox {
	height: calc(100% - 90rpx);
	.title {
		padding: 0 20rpx;
		font-size: 30rpx;
		line-height: 60rpx;
		icon {
			float: right;
			color: #999;
		}
	}
	.histroy {
		margin-top: 10rpx;
		.h_list {
			font-size: 26rpx;
			.item {
				float: left;
				width: 50%;
				padding: 10rpx 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:nth-child(2n) {
					border-left: 1px solid #efefef;
				}
			}
		}
	}

	.hotSearch {
		margin-top: 10rpx;
		.h_list {
			font-size: 24rpx;
			padding: 0 10rpx;
			.item {
				float: left;
				background: #eeeeee;
				color: #999;
				line-height: 40rpx;
				padding: 0 10rpx;
				border-radius: 0.3em;
				margin: 10rpx;
			}
		}
	}
	.searchList {
		height: 100%;
	}
	.noData {
		height: 100%;
	}
}
.listBox {
	.title {
		font-size: 16px;
		font-weight: 600;
		color: #b40000;
		padding: 20rpx 24rpx;
	}
	.shopList {
		padding: 0 24rpx;
		.item {
			background: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;
			padding: 24rpx;
			margin-bottom:24rpx;
			.shopMsg {
				.pic {
					width: 60rpx;
					height: 60rpx;
					border-radius: 60rpx;
					overflow: hidden;
					margin-right: 20rpx;
				}
				.shopname {
					max-width: 50%;
					font-weight: 600;
				}
				text {
					border: 1px solid #999;
					font-size: 20rpx;
					padding: 0 6rpx;
					border-radius: 0.2em;
					margin-left: 10rpx;
					margin-top: 6rpx;
				}
				.text {
					margin-top: 4rpx;
					font-size: 26rpx;
				}
			}
			scroll-view {
				width: 100%;
				margin-top:20rpx;
				white-space: nowrap;
				.proItem {
					width: 200rpx;
					display: inline-block;
					margin-right: 10rpx;
					&:last-child{
						margin-right: 0;
					}
					.pic {
						width: 100%;
						height: 200rpx;
						overflow: hidden;
					}
					.name{
						padding:10rpx 0;
					}
					.mark {
						font-size: 20rpx;
						padding: 0 6rpx;
						border-radius: 20rpx;
						border:1px solid #b40000;
					}
				}
			}
		}
	}
}
</style>
