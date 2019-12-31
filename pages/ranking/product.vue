<template>
	<view class="content ">
		<view class="advent" :style="'background:url('+banner+') center center no-repeat;background-size:100% auto;'">
			<!-- <image :src="banner" mode="widthFix"></image> -->
		</view>
		<view class="productList">
			<view v-for="(item, index) in productList" :key="index" class="item flex">
				<view class="pic" :style="'background:url('+setImg(item.imgPath)+') center center no-repeat;background-size:100% auto;'" @tap="showPic(item.imgPath)">
					<!-- <image :src="" mode="widthFix" @tap="showPic(item.imgPath)">
						
					</image> -->
					<text v-if="showNum" class="shownum" :class="'num'+index">{{index+1}}</text>
				</view>
				<view class="msg flex-1" @tap="choosePord(item)">
					<view class="name blod fs15 clamp clamp-2">{{ item.goodsName }}</view>
					<view class="nums c999">已售{{ item.numTotalSale }}件</view>
					<view class="price red">
						<text>¥</text>
						<text class="fs18">{{ item.priceSale }}</text>
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
				pageIndex:1,
				pageSize:10,
				pageTotal:1,
				nomore:false,
				nodata:false,
				productList:[],
				showNum:true,
				banner:getApp().globalData.config.businessPath+'static/ss/mp/images/top_goods.png'
			};
		},
		onShow(){
			this.initData()
		},
		onReachBottom(){
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.initData()
			} else {
				this.nomore = true
				return false;
			}
		},
		onPullDownRefresh(){
			this.resetData()
			this.initData()
			uni.stopPullDownRefresh();
		},
		methods:{
			initData(){
				let self = this
				let params = {
					pageSize:this.pageSize,
					pageIndex:this.pageIndex
				}
				this.$acFrame.HttpService.prodRank(params).then(res=>{
					if(res.success){
						let list= res.data.rows
						self.pageTotal = res.data.pageTotal
						self.pageSize = res.data.pageSize
						if(list.length>0){
							self.productList = self.productList.concat(list)
						}else{
							self.nodata = true
						}
					}
				})
			},
			setImg(src){
				return  this.$acFrame.Util.setImgUrl(src);
			},
			resetData(){
				this.pageSize = 10
				this.pageIndex = 1
				this.nodata = false
				this.nomore = false
				this.productList=[]
			}
		}
	}
</script>

<style lang="less">
.advent{
	height:320rpx;
}
.item {
	padding: 20rpx 20rpx 0;
}
.pic {
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
	border-radius: 0.3em;
	position: relative;
	.shownum{
		position:absolute;
		background:rgba(239,239,239,1);
		text-align: center;
		height:50rpx;
		width: 44rpx;
		font-size:20rpx;
		line-height: 45rpx;
		border-radius:8px 0px 20px 20px;
		color:#999;
		left:0;
		top:0;
	}
	.num0{
		background: linear-gradient(180deg,rgba(255,213,85,1) 0%,rgba(255,161,0,1) 100%);
		color:#fff;
	}
	.num1{
		background:linear-gradient(180deg,rgba(236,250,255,1) 0%,rgba(166,167,168,1) 100%);
		color:#fff;
	}
	.num2{
		background:linear-gradient(180deg,rgba(251,200,132,1) 0%,rgba(212,158,85,1) 100%);
		color:#fff;
	}
	
}
.nums{
	padding:10rpx 0;
}
.msg {
	width: 50%;
	margin-left: 20rpx;
}
</style>
