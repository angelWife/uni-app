<template>
	<view class="content pagebg">
		<view v-for="(item,index) in listData" :key="index" class="item flex item-center">
			<view class="pic">
				<image :src="item.imgHeadPath" mode="widthFix"></image>
			</view>
			<view class="main flex-1 flex item-center">
				<view class="msg flex-1">
					<view class="title">{{item.userName}}</view>
					<view class="text fa12 c999">{{item.numTotalFollow }}人关注</view>
				</view>
				<view class="btn" v-if="type=='1'"  >
					<button type="red" size="mini" @tap="followUser(item.userCode,index)">
						<block v-if="item.hasHuxiang ">
							相互关注
						</block>
						<block v-else>
							<block>已关注</block>
						</block>
					</button>
				</view>
				<view class="btn" v-else  >
					<button type="red" size="mini" v-if="item.hasHuxiang" @tap="followUser(item.userCode,index)" >
							相互关注
					</button>
					<button type="red" size="mini" v-else  @tap="followUser(item.userCode,index)"  >
							关注
					</button>
				</view>
			</view>
		</view>
		<view v-if="nomore" class="noMore">
			~已经到底了！~
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
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				pageTotal:1,
				pageSize:10,
				pageIndex:1,
				nodata:false,
				nomore:false,
				type:1
			}
		},
		onLoad(options) {
			this.type= options.type;
			if(this.type=='1'){
				uni.setNavigationBarTitle({
					title: '我的关注'
				});
			}else{
				uni.setNavigationBarTitle({
					title: '关注我的'
				});
			}
			
		},
		onShow(){
			this.initData()
		},
		onReachBottom(){
			if(this.pageIndex<this.pageTotal){
				this.pageIndex++
				this.initData()
			}else{
				this.nomore=true
			}
		},
		methods: {
			initData() {
				let self = this
				let params={
					pageSize:this.pageSize,
					pageIndex:this.pageIndex,
					fromType:self.type=='1'?true:false
				}
				self.$acFrame.HttpService.followListOwner(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if(list.length>0){
							list.filter(v=>{
							  v.imgHeadPath = self.$acFrame.Util.setImgUrl(v.imgHeadPath);
							})
							self.listData=self.listData.concat(list)
						}else{
							self.nodata=true
						}
						
					}
				})
			},
			followUser(code,ind){ // 
				let self=this
				self.$acFrame.HttpService.followPost({userCode:code}).then(res => {
					if (res.success) {
						if(res.data){
							self.$acFrame.Util.mytotal('关注成功！')
						}else{
							self.$acFrame.Util.mytotal('已取消关注！')
						}
						self.reGet()
					}
				})
			},
			reGet(){
				this.pageIndex = 1
				this.pageSize = 10
				this.nodata=false
				this.nomore=false
				this.listData=[]
				this.initData()
			}
		}
	}
</script>

<style lang="less" scoped>
	.item {
		.pic {
			height: 80rpx;
			width: 80rpx;
			border-radius: 80rpx;
			overflow: hidden;
			margin: 0 24rpx;
		}

		.main {
			min-height: 100rpx;
			padding: 20rpx 0;
			border-bottom: 1px solid #ccc;

			.title {
				width: 60%;
			}

			.btn {
				padding-right:24rpx;
				button {
					width: 180rpx;
					padding: 0;
					height: 72rpx;
					line-height: 72rpx;
					text-align: center;
				}
			}
		}
	}
</style>
