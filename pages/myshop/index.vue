<template>
	<view class="content">
		<view class="searchBox flex">
			<view class="flex-1 input">
				<icon class="iconfont icon-search"></icon>
				<input type="text" value="" confirm-type="search" v-model="searchVal" @confirm="searchData" @tap="searchClick" readyonly />
				<icon class="iconfont icon-clear"></icon>
			</view>
			<view class="search" v-if="isSearch"><button @tap="cancelSearch" size="mini" type="text" hover-class="none">取消</button></view>
		</view>
		<view class="resBox" v-if="isSearch">
			<view class="fastSearch" v-if="!nosearch">
				<view class="histroy">
					<view class="title">
						<text>历史记录</text>
						<icon class="iconfont icon-delete"></icon>
					</view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in histroySearch" :key="index">
							<view class="item">{{ item }}</view>
						</block>
					</view>
				</view>
				<view class="hotSearch">
					<view class="title"><text>热门搜索</text></view>
					<view class="h_list clearfix">
						<block v-for="(item, index) in hotSearch" :key="index">
							<view class="item">{{ item }}</view>
						</block>
					</view>
				</view>
			</view>
			<view class="searchList" v-else>
				<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMoreData"><commentItem :dataList="dataList"></commentItem></scroll-view>
				<view class="noData flex f-row just-con-c item-center">
					<view class="text-center">
						<image src="/static/images/defaultpro.png" mode=""></image>
						<button class="radiuBtn" type="rednull" @tap="cancelSearch">随便看看</button>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox" v-else>
			<view class="title">精品小店</view>
			<view class="shopList">
				<view class="item">
					<view class="shopMsg flex item-center" @tap="shopDetail">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="flex-1">
							<view class="name clearfix">
								<view class="shopname float-left textEllipsis">这边是店铺的名称</view>
								<text class="float-left">广告</text>
								<view class="fs12 c999 float-right">已被6000人圈粉</view>
							</view>
							<view class="text c999 textEllipsis">这边相关店铺的描述</view>
						</view>
					</view>
					<scroll-view scroll-x="true">
						<view class="proItem" v-for="(item,ind) in dataList" :key="ind" @tap="productDetail">
							<view class="pic"><image :src="item.pic" mode="widthFix"></image></view>
							<view class="name textEllipsis">{{item.name}}</view>
							<view class="price red">
								<text class="fs12">¥</text>
								<text class="fs15">{{item.price}}</text>
								<text class="mark">拼</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="item">
					<view class="shopMsg flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="flex-1">
							<view class="name clearfix">
								<view class="shopname float-left textEllipsis">这边是店铺的名称</view>
								<text class="float-left">广告</text>
								<view class="fs12 c999 float-right">已被6000人圈粉</view>
							</view>
							<view class="text c999 textEllipsis">这边相关店铺的描述</view>
						</view>
					</view>
					<scroll-view scroll-x="true">
						<view class="proItem" v-for="(item,ind) in dataList" :key="ind">
							<view class="pic"><image :src="item.pic" mode="widthFix"></image></view>
							<view class="name textEllipsis">{{item.name}}</view>
							<view class="price red">
								<text class="fs12">¥</text>
								<text class="fs15">{{item.price}}</text>
								<text class="mark">拼</text>
							</view>
						</view>
					</scroll-view>
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
			searchVal: '',
			histroySearch: ['苹果的nfc怎么打开', '王者的积分战队怎么玩的流', '苹果手机被锁住了怎么办'],
			hotSearch: ['四大名著', '护肤品', '女士口红', '女士香水', '怎么让孩子听话'],
			nosearch: false,
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
			]
		};
	},
	methods: {
		searchClick() {
			this.isSearch = true;
		},
		cancelSearch() {
			this.isSearch = false;
			this.searchVal = false;
		},
		searchData() {},
		shopDetail(){
			wx.navigateTo({
				url:"shopDetail"
			})
		},
		productDetail(){
			wx.navigateTo({
				url:"productDetail"
			})
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
		height: 60rpx;
		line-height: 60rpx;
		background: #fff;
		border-radius: 0.2em;
		input {
			width: 100%;
			padding: 0 60rpx;
			height: 60rpx;
			line-height: 60rpx;
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
			height: 60rpx;
			line-height: 60rpx;
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
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 0.3em;
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
					}
					.name{
						padding:10rpx 0;
					}
					.mark {
						font-size: 20rpx;
						padding: 0 6rpx;
						border-radius: 10rpx;
						border:1px solid #b40000;
					}
				}
			}
		}
	}
}
</style>
