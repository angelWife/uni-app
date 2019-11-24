<template>
	<view class="content">
		<view class="productPic">
			<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="400" @animationfinish="imgChange">
				<swiper-item v-for="(item, ind) in imgList" :key="ind">
					<view class="swiper-item"><image :src="item" mode="widthFix"></image></view>
				</swiper-item>
			</swiper>
			<view class="page">{{ imgInd }}/{{ imgList.length }}</view>
		</view>
		<view class="modal prod1">
			<view class="name clamp clamp-2 fs15">现摘党纪新鲜水果应季陕西苹果红富士一张整箱10斤</view>
			<view class="price red">
				<text class="fs12">¥</text>
				<text class="fs18">138.00</text>
				<text class="yunfei">运费：5元</text>
				<text class="float-right c999 fs12">销量13241件</text>
			</view>
			<button open-type="share" class="iconfont icon-share">分享</button>
		</view>
		<view class="modal prod2">
			<view class="flex item-center">
				<view class="flex-1 fs12">该商品入选了某某排行</view>
				<view class="red">查看排行</view>
			</view>
			<view class="flex item-center">
				<view class="flex-1 c999">精灵</view>
				<view class="red">持有喵喵精灵可享5折</view>
			</view>
		</view>
		<view class="modal prod3">
			<view class="coupon flex">
				<view class="name c999">领取</view>
				<view class="listBox flex-1">
					<view class="item">满100减10</view>
					<view class="item">满200减30</view>
				</view>
			</view>
			<view class="service flex">
				<view class="name c999">服务</view>
				<view class="listBox flex-1">
					<view class="item">假一赔三</view>
					<view class="item">无理由退款</view>
					<view class="item">消费者保障</view>
				</view>
			</view>
		</view>
		
		<view class="modal assemble">
			<view class="title">
				4人在拼单，可直接参与
				<text class="float-right red" @tap="moreassemble">查看全部</text>
			</view>
			<view class="list">
				<view class="item flex item-center">
					<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
					<view class="name textEllipsis">特别阿童木</view>
					<view class="time flex-1 text-center">
						<view>还差1人成团</view>
						<view class="fs12 c999">
							剩余
							<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
						</view>
					</view>
					<view class="去拼单"><button type="orange" size="mini" @tap="joinGroup">去拼单</button></view>
				</view>
				<view class="item flex item-center">
					<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
					<view class="name textEllipsis">特别阿童木</view>
					<view class="time flex-1 text-center">
						<view>还差1人成团</view>
						<view class="fs12 c999">
							剩余
							<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
						</view>
					</view>
					<view class="去拼单"><button type="orange" size="mini" @tap="joinGroup">去拼单</button></view>
				</view>
			</view>
		</view>
		<view class="modal prod4 flex item-center">
			<view class="pic">
				<image src="../../static/images/head2.png" mode="widthFix"></image>
			</view>
			<view class="name flex-1">
				<view class="title blod">老七诚信旗舰店</view>
				<view class="textEllipsis c999 fs13">描述信息描述信息描述信息</view>
			</view>
			<view class="btn">
				<button class="radiuBtn" type="red" size="mini">进店逛逛</button>
			</view>
		</view>
		<view class="modal prod5">
			<view class="title">
				商品评价（103条）
				<text class="red float-right">查看全部</text>
			</view>
			<view class="list">
				<view class="item">
					<view class="item-top flex item-center">
						<view class="pic imgCirc">
							<image src="../../static/images/head2.png" mode="widthFix"></image>
						</view>
						<view class="name flex-1 textEllipsis">
							殷桃丸子
						</view>
						<view class="star">
							<block  v-for="(item,ind) in [1,2,3,4,5]" :key="ind">
								<image v-if="item<4" src="../../static/images/yellow_star.png" mode="widthFix"></image>
								<image v-else src="../../static/images/gray_star.png" mode="widthFix"></image>
							</block>
						</view>
					</view>
					<view class="text clamp clamp-2">
						针对于事物进行主观或客观的自我印象阐述。评论易 让人听到不利于自己的一面，因此评论的话语容…
					</view>
					<view class="time fs12 c999">
						<text>红色/XL</text>
						<text>2019-12-12</text>
					</view>
				</view>
			</view>
		</view>
		<view class="modal productDetail">
			<view class="title blod">
商品详情				
			</view>
			<view class="goodsAttr">
				<view class="flex">
					<view class="name c999">
						商品编号
					</view>
					<view class="value flex-1">
						51156415re
					</view>
				</view>
				<view class="flex">
					<view class="name c999">
						品牌
					</view>
					<view class="value flex-1">
						雅思
					</view>
				</view>
			</view>
		<view class="goodsMsg">
			<rich-text :nodes="richNode"></rich-text>
		</view>
		</view>
		<view class="prodFoot flex item-center">
			<view class="item">
				<icon class="iconfont icon-share"></icon>
				<view class="fs12 c999">店铺</view>
			</view>
			<view class="item">
				<icon class="iconfont icon-share"></icon>
				<view class="fs12 c999">客服</view>
			</view>
			<view class="item">
				<icon class="iconfont icon-share"></icon>
				<view class="fs12 c999">分享</view>
				<button open-type="share"></button>
			</view>
			<view class="flex-1 flex">
				<view class="btn btn1 flex-1 flex f-col just-con-c">
					<view class="buy" @tap="confirmOrder">
						立即购买
					</view>
				</view>
				<!-- <view class="btn btn2 flex-1 flex f-col just-con-c">
					<view class="price">
						¥ 955
					</view>
					<view class="text">
						单独购买
					</view>
				</view>
				<view class="btn btn1 flex-1 flex f-col just-con-c">
					<view class="price">
						¥ 955
					</view>
					<view class="text">
						发起拼单
					</view>
				</view> -->
			</view>
		</view>
		<view class="comDialog assembleModal flex item-center just-con-c" v-if="showAssembleModal">
			<view class="moadl-main">
				<view class="title">
					正在拼单
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="assemble listBox">
					<view class="item flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="time flex-1">
							<view class="clearfix">
								<view class="float-left name textEllipsis">特别阿童木</view>
								<text class="float-left">还差1人</text>
							</view>
							<view class="fs12 c999">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
							</view>
						</view>
						<view class="去拼单"><button type="orange" size="mini">去拼单</button></view>
					</view>
					<view class="item flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="time flex-1">
							<view class="clearfix">
								<view class="float-left name textEllipsis">特别阿童木</view>
								<text class="float-left">还差1人</text>
							</view>
							<view class="fs12 c999">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
							</view>
						</view>
						<view class="去拼单"><button type="orange" size="mini">去拼单</button></view>
					</view>
					<view class="item flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="time flex-1">
							<view class="clearfix">
								<view class="float-left name textEllipsis">特别阿童木</view>
								<text class="float-left">还差1人</text>
							</view>
							<view class="fs12 c999">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
							</view>
						</view>
						<view class="去拼单"><button type="orange" size="mini">去拼单</button></view>
					</view>
					<view class="item flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="time flex-1">
							<view class="clearfix">
								<view class="float-left name textEllipsis">特别阿童木</view>
								<text class="float-left">还差1人</text>
							</view>
							<view class="fs12 c999">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
							</view>
						</view>
						<view class="去拼单"><button type="orange" size="mini">去拼单</button></view>
					</view>
					<view class="item flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="time flex-1">
							<view class="clearfix">
								<view class="float-left name textEllipsis">特别阿童木</view>
								<text class="float-left">还差1人</text>
							</view>
							<view class="fs12 c999">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
							</view>
						</view>
						<view class="去拼单"><button type="orange" size="mini">去拼单</button></view>
					</view>
					<view class="item flex item-center">
						<view class="pic"><image src="../../static/images/head1.png" mode="widthFix"></image></view>
						<view class="time flex-1">
							<view class="clearfix">
								<view class="float-left name textEllipsis">特别阿童木</view>
								<text class="float-left">还差1人</text>
							</view>
							<view class="fs12 c999">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="12" :minute="12" :second="12" />
							</view>
						</view>
						<view class="去拼单"><button type="orange" size="mini">去拼单</button></view>
					</view>
				</view>
			</view>
		</view>
        <view class="comDialog flex item-center just-con-c assembleDetail" v-if="showAssembleDetailModal">
			<view class="moadl-main">
				<view class="title">
					参与拼单
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="detailMain">
					<view class="msg">
						仅剩<text class="red">12个</text>名额，还剩
						<uni-count-down :borderColor="timeStyle.borderColor" :backgroundColor="timeStyle.backgroundColor" :color="timeStyle.color" :show-day="false" :show-style="true" :hour="12" :minute="12" :second="12" />
					</view>
					<view class="picList">
						<view class="item">
							<view class="name">拼主</view>
							<view class="pic">
								<image src="../../static/images/head2.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="item">
							<view class="name">成员</view>
							<view class="pic">
								<image src="../../static/images/head2.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="item">
							<view class="name">成员</view>
							<view class="pic">
								<image src="../../static/images/head1.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="item">
							<view class="name">成员</view>
							<view class="pic">
								<image src="../../static/images/head1.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="item null">
							<view class="name"></view>
							<view class="pic fs18 c666">
								?
							</view>
						</view>
					</view>
					<view class="btnBox">
						<button type="red">参与拼单</button>
					</view>
				</view>
			</view>
		</view>
	    <view class="comDialog specsModal" v-if="showSpecModal">
	    	<div class="specsBody">
				<view class="md_head flex item-center">
					<view class="pic">
						<image src="../../static/images/head1.png" mode="widthFix"></image>
					</view>
					<view class="price flex-1">
						<view class="red">
							<text class="fs12">¥</text>
							<text class="fs18">138.56</text>
						</view>
						<view class="">
							请选择规格
						</view>
					</view>
					<icon class="iconfont icon-remove"  @tap="closeModal"></icon>
				</view>
				<view class="spec_main">
					<view class="item">
						<view class="title">
							颜色
						</view>
						<view class="specBox">
							<view class="item_child textEllipsis">红色</view>
							<view class="item_child textEllipsis">蓝色</view>
							<view class="item_child textEllipsis">黄的</view>
							<view class="item_child textEllipsis">红色</view>
							<view class="item_child textEllipsis">蓝色</view>
							<view class="item_child textEllipsis">黄的</view>
						</view>
					</view>
					<view class="item">
						<view class="title">
							尺寸
						</view>
						<view class="specBox">
							<view class="item_child textEllipsis">XXL</view>
							<view class="item_child textEllipsis">XL</view>
							<view class="item_child textEllipsis">M</view>
						</view>
					</view>
				</view>
			    <view class="nums flex item-center">
					<view class="flex-1">购买数量</view>
					<view class="comNumber clearfix">
						<view class="iconfont icon-minus" hover-class="touch"></view>
						<input type="number" value="1" />
						<view class="iconfont icon-plus" hover-class="touch"></view>
					</view>
				</view>
				<view class="btnBox">
					<button type="red" class="noradius">确定</button>
				</view>
			</div>
	    </view>
	</view>
</template>

<script>
import uniCountDown from '@/components/countDown.vue';
export default {
	components: {
		uniCountDown
	},
	data() {
		return {
			imgList: [
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg',
				'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg',
				'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'
			],
			imgInd: 1,
			color:'#999',
			showAssembleModal:false,
			showAssembleDetailModal:false,
			showSpecModal:false,
			timeStyle:{
				color:"#fff",
				borderColor:"#b40000",
				backgroundColor:"#b40000"
			},
			richNode:'<p class="text">这边是商品文案描述这边是商品文案描述这边是商品文案描述这边是商品文案描述这边是商品文案描述这边是商品文案描述这边是商品文案描述</p><p class="img"><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg"/></p>'
		};
	},
	methods: {
		imgChange(event) {
			console.log(event);
			this.imgInd = event.detail.current + 1;
		},
		moreassemble(){
			this.showAssembleModal = true
		},
		joinGroup(){
			this.showAssembleDetailModal = true
		},
		closeModal(){	
			this.showAssembleModal = false
			this.showAssembleDetailModal = false
			this.showSpecModal=false
		},
		confirmOrder(){
			uni.navigateTo({
				url:'confirmOrder'
			})
		}
	}
};
</script>

<style lang="less">
page {
	min-height: 100%;
	background: #efefef;
	padding-bottom:100rpx;
}
.productPic {
	swiper {
		height: 100vw;
	}
	position: relative;
	.page {
		position: absolute;
		padding: 10rpx 0;
		width: 100rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(51, 51, 51, 0.3);
		right: 30rpx;
		bottom: 30rpx;
		border-radius: 22px;
	}
}
.modal {
	background: #fff;
	padding: 24rpx;
	position: relative;
	margin-bottom: 20rpx;
}
.prod1 {
	.name {
		margin-right: 180rpx;
	}
	.price {
		margin-top: 10rpx;
		line-height: 60rpx;
	}
	.yunfei {
		display: inline-block;
		position: relative;
		min-width: 140rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: #fd7e77;
		margin-left: 20rpx;
		top: -4rpx;
	}
	.iconfont {
		position: absolute !important;
		top: 24rpx;
		width: 140rpx;
		right: 0;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #999;
		background: #efefef;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		overflow: hidden;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		padding: 0;
		&::before {
			margin-right: 10rpx;
			position: relative;
			top: 2rpx;
		}
		&::after {
			border: 0;
			border-radius: none;
		}
	}
}
.prod2 {
	padding: 10rpx 24rpx;
	line-height: 40rpx;
}
.prod3 {
	padding: 20rpx 0 0;
	line-height: 50rpx;
	.name {
		padding: 0 24rpx;
	}
	.listBox {
		overflow: hidden;
		.item {
			float: left;
			text-align: center;
			min-width: 180rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}
	}
	.coupon .item {
		border: 1px solid #b40000;
		color: #b40000;
	}
	.service .item {
		background: #efefef;
		color: #666;
	}
}
.assemble {
	padding: 0;
	.title {
		line-height: 80rpx;
		border-bottom: 1px solid #ccc;
		padding: 0 24rpx;
	}
	.item {
		padding: 20rpx 0;
		margin: 0 24rpx;
		border-bottom: 1px solid #ccc;
		&:last-child {
			border: 0;
		}
		.pic {
			width: 60rpx;
			height: 60rpx;
			margin-right: 24rpx;
			border-radius: 60rpx;
			overflow: hidden;
		}
		> .name {
			width: 30%;
			font-weight: 600;
			font-size: 30rpx;
		}
		.time {
			.name {
				max-width: 200rpx;
				margin-right: 20rpx;
				font-weight: 600;
			}
		}
		button {
			padding: 0 20rpx;
		}
	}
}
.prod4{
	.pic{
		width: 100rpx;
		height:100rpx;
		border-radius:100%;
		overflow: hidden;
		margin-right:20rpx;
	}
	.name{
		width: 50%;
		margin-right:20rpx;
	}
}
.prod5{
	padding:0;
	.title{
		padding: 20rpx 24rpx;
		border-bottom: 1px solid #ccc;
	}
	.item{
		margin:0 24rpx;
		padding:20rpx;
		border-bottom: 1px solid #ccc;
		.item-top{
			.pic{
				width: 60rpx;
				height:60rpx;
				margin-right:20rpx;
			}
			.name{
				width: 30%;
			}
			.star{
				image{
					width: 40rpx;
					display: inline-block;
					margin-left:10rpx;
				}
			}
		}
		.text{
			margin:20rpx 0;
		}
		.time{
			text{
				display: inline-block;
				margin-right:20rpx;
			}
		}
	}
}
.productDetail{
	padding:0;
	.title{
		padding:20rpx 24rpx;
	}
	.goodsAttr{
		padding:10rpx 24rpx;
		> .flex{
			line-height: 50rpx;
		}
		.name{
			width: 120rpx;
		}
		.value{
			width: 60%;
		}
	}
	.goodsMsg{
		overflow: hidden;
		.text{
			text-align: justify;
			padding:10rpx 24rpx;
		}
		.img{
			padding:10rpx 0;
			text-align: center;
			img{
				width: 100%;
			}
		}
	}
}
.prodFoot{
	position:fixed;
	z-index: 5;
	width: 100%;
	height:100rpx;
	left:0;
	bottom:0;
	background: #fff;
	box-shadow: 0 -1px 5px rgba(0,0,0,0.1);
	.item{
		width: 100rpx;
		text-align: center;
		font-size:24rpx;
		color:#999;
		position: relative;
		button{
			border:0;
			position: absolute;
			background: none;
			height:100rpx;
		    padding:0;
			width: 100rpx;
            top:0;
			left:0;
			&::after {
				border: none !important;
				box-shadow: none !important;
			}
		}
	}
    .btn{
		color:#fff;
		height:100rpx;
		text-align: center;
		.price{
			font-size:32rpx;
		}
		.text{
			font-size:26rpx;
		}
	}
	.buy{
		line-height:100rpx;
	}
	.btn1{
		background: #b40000;
	}
	.btn2{
		background: #FD7E77;
	}
}
.comDialog {
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 10;
	background: rgba(0, 0, 0, 0.6);
	.moadl-main {
		width: 80%;
		background: #fff;
		border-radius: 0.6em;
		.title {
			line-height: 100rpx;
			text-align: center;
			position: relative;
			border-bottom: 1px solid #ccc;
			.iconfont {
				position: absolute;
				width: 100rpx;
				right: 0;
				top: 0;
				color: #999;
			}
		}
		.listBox {
			max-height: 600rpx;
			overflow: hidden;
			overflow-y: auto;
		}
	}
}
.assembleDetail{
	.detailMain{
		padding: 14rpx 24rpx 24rpx;
		.msg{padding: 20rpx;text-align: center;}
	}
	.picList{
		text-align: center;
		padding:20rpx 0;
		.item{
			display: inline-block;
			margin:10rpx;
			.name{
				line-height: 40rpx;
				padding:0 4rpx;
				border-radius:40rpx;
				color:#fff;
				background: #b40000;
				font-size:24rpx;
			}
			.pic{
				width:100rpx;
				height:100rpx;
				border:2px solid #b40000;
				border-radius:100rpx;
				overflow: hidden;
			}
			&.null{
				.name{
					background: none;
				}
				.pic{
					border:1px dashed #ccc;
					line-height: 96rpx;
					text-align: center;
				}
			}
		}
	}
	.btnBox{
		margin-top:20rpx;
	}
}
.specsModal{
	.specsBody{
		background: #fff;
		position:absolute;
		bottom:0;
		width: 100%;
		.md_head{
			margin:0 24rpx;
			border-bottom:1px solid #ccc;
			padding:20rpx;
			position:relative;
			.pic{
				height:100rpx;
				width: 160rpx;
				margin-right:20rpx;
				position:relative;
				image{
					position:absolute;
					bottom:0;
				}
			}
			.iconfont{
				position:absolute;
				width: 80rpx;
				line-height: 80rpx;
				text-align: center;
				top:0;
				right:-24rpx;
			}
		}
	}
    .spec_main{
		.title{
			padding:20rpx 24rpx;
		}
		.specBox{
			max-height:160rpx;
			padding:0 14rpx;
			overflow: hidden;
			overflow-y: auto;
			.item_child{
				float:left;
				width: calc((100% / 2) - 20rpx);
				height:60rpx;
				text-align: center;
				line-height: 60rpx;
				margin:0 10rpx 20rpx;
				background: #EFEFEF;
				border-radius:0.2em;
				padding: 0 20rpx;
				&.active{
					color:#fff;
					background: #B40000;
				}
			}
		}
	}
	.nums{
		padding:24rpx;
	}
	.btnBox{
		margin-top:20rpx;
		button{
			line-height: 80rpx;
		}
	}
}
</style>
