<template>
	<view class="content pagebg">
		<view v-for="(item,ind) in list" :key="ind" class="item flex item-center" @tap="detail(item.id)">
			<view class="pic">
				<image :src="item.res.data" mode="widthFix"></image>
			</view>
			<view class="flex-1 main flex item-center">
				<view class="left flex-1">
					<view class="title fs16">
						{{item.name}}
					</view>
					<view class="text c999">
						{{item.describe}}
					</view>
				</view>
				<view class="btnBox">
					<button type="red" class="radiuBtn" size="mini" @tap.stop="chooseIt(ind)">参与话题</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			};
		},
		onShow(){
			this.list=[]
			this.intData()
		},
		methods:{
			intData(){
				let self =this
				let params ={
					pageIndex: 1,
					pageSize: 100
				}
				this.$acFrame.HttpService.getToicList().then(res => {
				  if (res.success) {
					  let list = res.data
					  list.filter(v=>{
						  v.img = self.$acFrame.Util.setImgUrl(v.img)
					  })
				    self.list = list
				  }
				});
			},
			chooseIt(ind){
				let pages = getCurrentPages()
				let obj=this.list[ind]
				if(pages.length>1){
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.changeData) {
					  prePage.$vm.setVal(obj.id,obj.name,'subject')
					  wx.navigateBack({})
					}
				}
			},
			detail(id){
				uni.navigateTo({
					 url: 'topicIndex?id='+id
				});
			}
		}
	}
</script>

<style lang="less">
.item{
	background: #fff;
	.pic{
		width: 80rpx;
		height:80rpx;
		border-radius: 80rpx;
		overflow: hidden;
		margin:0 30rpx;
	}
	.main{
		padding:20rpx 0;
		border-bottom:1px solid #cccc;
		.left{
			width: 60%;
		}
		.btnBox{
			margin:0 30rpx;
		}
	}
}
</style>
