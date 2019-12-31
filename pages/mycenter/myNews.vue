<template>
	<view class="content pagebg">
		<view class="newsType comNews">
			<view v-for="(item, ind) in newsTypes" :key="ind" class="listBox">
				<view class="newBox flex item-center" @tap="newsList(ind)">
					<!-- <text class="mark" v-if="item>0"></text> -->
					<view class="pic">
						<image :src="'/static/images/n'+ind+'.png'" mode="widthFix" />
					</view>
					<view class="main flex-1">
						<view class="title fs16">
							<text v-if="ind==1">系统消息</text>
							<text v-if="ind==2">帖子消息</text>
							<text v-if="ind==3">订单消息</text>
						</view>
						<view class="text c999">
							<block v-if="item>0">{{item}}条未阅读</block>
							<block v-else>暂无消息</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="newsType comNews">
			<view v-for="(item, ind) in dataList" :key="ind" class="listBox" @touchstart="touchstart" @touchend="touchend($event, ind)">
				<view class="newBox flex item-center" :style="item.style">
					<view class="pic">
						<image src="../../static/images/n1.png" mode="widthFix" />
					</view>
					<view class="main flex-1">
						<view class="title fs16">系统消息</view>
						<view class="text c999">
							<block>5条未阅读</block>
							<block>暂无消息</block>
						</view>
					</view>
				</view>
				<view class="btn delete float-right" @tap="delNews(ind)">删除</view>
				<view class="btn look float-right" @tap="readyNews(ind)">查看</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemstyle: "left:0;",
				dataList: [{style: "left:0;"}],
				t_x: 0,
				t_y: 0,
				newsTypes:[]
			};
		},
		onShow(){
			this.getNewsType()
		},
		methods: {
			getNewsType(){
				let self =this
				this.$acFrame.HttpService.newsType().then(res=>{
					if(res.success){
						self.newsTypes = res.data
					}
				})
			},
			newsList(type) {
				uni.navigateTo({
					url:'newsList?type='+type
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
				let dataList = this.dataList;
				let tmX = touchMoveX - this.t_x;
				let tmY = touchMoveY - this.t_y;
				let absX = Math.abs(tmX);
				let absY = Math.abs(tmY);
				if (absX > 2 * absY && absX > 5) {
					if (tmX < 0) {
						dataList.filter((v, i) => {
							if (i == ind) {
								v.style = "left:-280rpx";
							} else {
								v.style = "left:0";
							}
						});
					} else {
						dataList[ind].style = "left:0";
					}
				}
				this.dataList = dataList;
				this.t_y = 0;
				this.t_x = 0;
			}
		}
	};
</script>

<style lang="less">
	.newsType {
		margin-bottom: 20rpx;
	}
	.newBox{
		position:relative;
		.mark{
			position:absolute;
			width: 15rpx;
			height:15rpx;
			border-radius:100%;
			background: #B40000;
			left:20rpx;
			top:20rpx;
		}
	}
</style>
