<template>
	<view class="content flex">
		<view class="head">
			<view class="title fs16 blod">{{detail.name}}</view>
			<view class="text">
				<text class="c999 fs12">阅读：{{detail.numTotalRead}}</text>
				<text class="c999 fs12">评论：{{detail.numTotalComment}}</text>
			</view>
		</view>
		<view class="flex-1 main">
			<scroll-view class="myscroll" scroll-y="true" @scrolltolower="loadMore">
				<commentItem :nodata="nodata" :nomore="nomore" :pageType="pageType" :dataList="dataList"></commentItem>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import commentItem from '@/components/comment-item.vue';
	export default {
		components: {
			commentItem
		},
		data() {
			return {
				detail:{name:'测试样式',numTotalRead:20,numTotalComment:100},
				dataList:[],
				nodata:false,
				pageType:1,
				pageIndex:1,
				pageSize:10,
				pageTotal:1,
				id:0,
				nomore:false
			};
		},
		onLoad(options){
			this.id=options.id
		},
		methods:{
			getData(){
				let self=this
				let params={
					id:this.id
				}
				this.$acFrame.HttpService.loadTopic(params).then(res => {
					if(res.seccess){
						self.detail= res.data
						self.getList()
					}
				})
			},
			getList(){
				let self=this
				let  params={
					id:self.detail.id,
					pageSize:this.pageSize,
					pageIndex:tis.pageIndex
				}
				this.$acFrame.HttpService.loadTopicList(params).then(res => {
					let _data = res.data;
						let dataList = _data.rows;
						self.pageTotal = _data.pageTotal;
					if (res.success) {
						if (dataList.length > 0) {
							dataList.filter((v, i) => {
								v.adInfo.imgList.filter(v => {
									v = self.$acFrame.Util.setImgUrl(v);
								});
								v.articleInfo.imgList.filter(v => {
									v = self.$acFrame.Util.setImgUrl(v);
								});
								v.itemLinkList.filter(v => {
									v.imgPath = self.$acFrame.Util.setImgUrl(v.imgPath);
								});
								v.publishUser.imgPathHead = self.$acFrame.Util.setImgUrl(v.publishUser.imgPathHead);
								if (v.type == 1) {
									v.articleInfo.showContent = self.setContent(v.articleInfo.contentExtendList);
									v.articleInfo.showMore = false;
								}
								if (v.articleInfo.content.length > 60) {
									v.articleInfo.isDetail = false;
								}
							});
							self.dataList = self.dataList.concat(dataList);
							
							self.nodata = false;
						} else {
							self.nodata = true;
						}
					} else {
						self.$acFrame.Util.mytotal(res.code);
					}
				})
			},
			loadMore(){
				let pageIndex = this.pageIndex
				pageIndex++
				if(pageIndex<=this.pageTotal){
					this.getList()
					this.nomore = false
				}else{
					this.nomore = true
				}
			}
		}
	}
</script>

<style lang="less">
.head{
	padding:24rpx 30rpx;
	border-bottom:1px solid #ccc;
	.title{
		margin-bottom:20rpx;
	}
	text{
		display: inline-block;
		margin-right:40rpx;
	}
}
.main{
	height:80%;
}
</style>
