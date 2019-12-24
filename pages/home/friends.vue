<template>
	<view class="content pagebg">
		<view v-for="(item,ind) in list" :key="ind" class="item flex item-center">
			<view class="pic">
				<image src="../../static/images/head1.png" mode="widthFix"></image>
			</view>
			<view class="flex-1 main flex item-center">
				<view class="left flex-1">
					<view class="title">
						{{item.userName}}
					</view>
				</view>
				<view class="btnBox">
					<button type="red" class="radiuBtn" size="mini" @tap="chooseIt(item)">@他</button>
				</view>
			</view>
		</view>
		<view v-if="nodata" class="noData flex f-row just-con-c item-center">
			<view class="text-center">
				<image src="/static/images/nodata.png" mode="widthFix"></image>
				<view class="text-center c666 fs16">
					这里还没有内容
				</view>
				<button class="radiuBtn" @tap="linktoshop" type="rednull">随便看看</button>
				<!-- <navigator url="/pages/home/index" class="radiuBtn" hover-class="none">随便看看</navigator> -->
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
				list:[],
				nodata:false,
				nomore:false
			};
		},
		onLoad(){
			var self = this;
			var parms = {};
			this.$acFrame.HttpService.post("app/user_follow/list_data",parms).then(res => {
					console.log(res);
			    if(res.success){
					console.log(res.data);
					if(res.data.length>0){
						self.list = res.data;
					}else{
						self.nodata=true
						self.$acFrame.Util.mytotal('暂无好友数据');
					}
					
				}
			})
			
		},
		methods:{
			chooseIt(obj){
				let pages = getCurrentPages()
				//let obj=this.list[ind]
				if(pages.length>1){
					let prePage = pages[pages.length - 2]
					if (prePage.$vm.changeData) {
					  wx.navigateBack({})
					  setTimeout(()=>{
						  prePage.$vm.setVal(obj.userCode,obj.userName,'friend')
					  },100)
					}
				}
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
