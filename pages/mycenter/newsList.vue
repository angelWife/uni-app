<template>
	<view class="content">
		<view class="newsType comNews">
			<view v-for="(item, ind) in newsList" :key="ind" class="listBox" @touchstart="touchstart" @touchend="touchend($event, ind)">
				<view class="newBox flex item-center" :style="item.style">
					<view class="pic" @tap="mycenter(item)">
						<image :src="setImg(item.userInfo.imgHeadPath)" mode="widthFix" />
					</view>
					<view class="main flex-1">
						<view class="title">
							<text class="name fs16 m-r-20" @tap="mycenter(item)">{{item.userInfo?item.userInfo.nickName:'--'}}</text>
							<text v-if="item.fromType==2" class="c999">
								{{item.newsMsg}}
							</text>
						</view>
						<view class="msg" @tap="articlDetail(item)">
							<text>{{item.content?item.content:''}}</text>
						</view>
						<view class="time fs12 c999">
							{{item.createTime}}
						</view>
					</view>
				</view>
				<view class="btn delete float-right" @tap="delNews(item)">删除</view>
			</view>
		</view>
		
		<!-- <view class="item flex" v-for="(item,ind) in newsList" :key="ind">
			<view class="pic" @tap="mycenter(item)">
				<image :src="setImg(item.userInfo.imgHeadPath)" mode="widthFix"></image>
			</view>
			<view class="flex-1">
				<view class="title">
					<text class="name fs16 m-r-20" @tap="mycenter(item)">{{item.userInfo?item.userInfo.nickName:'--'}}</text>
					<text v-if="item.fromType==2" class="c999">
						{{item.newsMsg}}
					</text>
				</view>
				<view class="msg" @tap="articlDetail(item)">
					<text>{{item.content?item.content:''}}</text>
				</view>
				<view class="time fs12 c999">
					{{item.createTime}}
				</view>
			</view>
		</view> -->
		<view class="footbtn">
			<button type="primary" @tap="clearAll">清空消息</button>
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
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				newsList: [],
				pageSize: 20,
				pageIndex: 1,
				pageTotal: 1,
				nodata: false,
				nomore: false,
				t_x: 0,
				t_y: 0,
			};
		},
		onLoad(options) {
			this.type = options.type
			let title = ''
			if (this.type == 1) {
				title = '系统消息'
			} else if (this.type == 2) {
				title = '帖子消息'
			} else if (this.type == 3) {
				title = '订单消息'
			}
			uni.setNavigationBarTitle({
				title: title
			})
		},
		onShow() {
			this.setParams()
			this.getNewsList()
			
		},
		onPullDownRefresh() {
			this.setParams()
			this.getNewsList()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.pageIndex < this.pageTotal) {
				this.pageIndex++
				this.getNewsList()
			} else {
				this.nomore = true
			}
		},
		methods: {
			setParams() {
				this.pageIndex = 1
				this.nomore = false
				this.nodata = false
				this.newsList = []
			},
			getNewsList() {
				let self = this
				let params = {
					fromType: this.type,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					flagRead:2
				}
				this.$acFrame.HttpService.newsList(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						self.pageTotal = res.data.pageTotal
						if (list.length > 0) {
							list.filter(v => {
								v.createTime = self.$acFrame.Util.formatTime(v.createTime, 'day')
								if (v.fromType == 2) {
									switch (v.type) {
										case 1:
											v.newsMsg = '关注'
											break;
										case 2:
											v.newsMsg = '取消关注'
											break;
										case 3:
											v.newsMsg = '点赞'
											break;
										case 4:
											v.newsMsg = '取消点赞'
											break;
										case 5:
											v.newsMsg = '点赞评论'
											break;
										case 6:
											v.newsMsg = '取消点赞评论'
											break;
										case 7:
											v.newsMsg = '转发分享'
											break;
										case 8:
											v.newsMsg = '评论'
											break;
										case 9:
											v.newsMsg = '回复评论'
											break;
										default:
											v.newsMsg = ''
											break;
									}
								}
								v.style="left:0;"
							})
							console.log(list)
							self.newsList = self.newsList.concat(list)
							self.readyNews()
						} else {
							self.nodata = true
						}
					}
				})
			},
			clearAll(){
				let idList = [],self=this
				this.newsList.filter(v=>{
					idList.push(v.id)
				})
				let params = {
					fromType: this.type,
					idList:idList
				}
				uni.showModal({
					title:'提示',
					content:'确认清空消息？',
					cancelColor:"#999",
					confirmColor:'#4c8ff7',
					success:(res)=>{
						if(res.confirm){
							self.$acFrame.HttpService.delNews(params).then(res => {
								if (res.success) {
									self.$acFrame.Util.mytotal('您确认要清空消息吗！')
									setTimeout(function() {
										self.setParams()
										self.getNewsList()
									}, 1000);
								}
							})
						}
					}
				})
			},
			touchstart: function(e) {
				this.t_x = e.touches[0].pageX;
				this.t_y = e.touches[0].pageY; // 获取触摸时的原点
				// timeInterval = setInterval(function() {
				//   times++;
				// }, 50);
			},
			touchend: function(e, ind) {
				let touchMoveX = e.changedTouches[0].pageX;
				let touchMoveY = e.changedTouches[0].pageY;
				let dataList = this.newsList;
				let tmX = touchMoveX - this.t_x;
				let tmY = touchMoveY - this.t_y;
				let absX = Math.abs(tmX);
				let absY = Math.abs(tmY);
				if (absX > 2 * absY && absX > 5) {
					if (tmX < 0) {
						dataList.filter((v, i) => {
							if (i == ind) {
								v.style = "left:-140rpx";
							} else {
								v.style = "left:0";
							}
						});
					} else {
						dataList[ind].style = "left:0";
					}
				}
				this.newsList = dataList;
				this.t_y = 0;
				this.t_x = 0;
			},
			setImg(src) {
				if (!src) {
					src = ''
				}
				return this.$acFrame.Util.setImgUrl(src);
			},
			readyNews() {
				let idList = []
				this.newsList.filter(v=>{
					idList.push(v.id)
				})
				let params = {
					fromType: this.type,
					idList: idList
				}
				this.$acFrame.HttpService.readNews(params).then(res => {
					if (res.success) {}
				})
			},
			mycenter(item) {
				// this.readyNews(item)
				uni.navigateTo({
					url: 'mycenter?userCode=' + item.userInfo.userCode
				})
			},
			articlDetail(item) {
				// this.readyNews(item)
				uni.navigateTo({
					url: "/pages/home/commentDetail?id=" + item.articleId
				})
			},
			delNews(item){
				let self = this
				let params = {
					fromType: this.type,
					idList:[item.id]
				}
				uni.showModal({
					title:'提示',
					content:'确认删除该消息？',
					cancelColor:"#999",
					confirmColor:'#4c8ff7',
					success:(res)=>{
						if(res.confirm){
							self.$acFrame.HttpService.delNews(params).then(res => {
								if (res.success) {
									self.$acFrame.Util.mytotal('删除成功！')
									setTimeout(function() {
										self.setParams()
										self.getNewsList()
									}, 1000);
								}
							})
							
						}
					}
				})
				
			}
		}
	}
</script>

<style lang="less">
	.content {
		min-height: 100vh;
		padding-bottom:120rpx;
	}
.footbtn{
	position: fixed;
	bottom:0;
	z-index: 10;
	left:0;
	width: 100%;
	padding:20rpx 30rpx;
	background: #fff;
	box-shadow: 0 -1px 5px rgba(0,0,0,0.1);
}
	.item {
		margin: 0 30rpx;
		border-bottom: 1px solid #ccc;
		padding: 20rpx 0;

		.pic {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			overflow: hidden;
			margin-right: 20rpx;
		}

		.msg {
			padding: 10rpx 0;
		}
	}
</style>
