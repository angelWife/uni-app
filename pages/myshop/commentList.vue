<template>
	<view class="list">
		<view v-for="(item,ind) in commontList" :key="ind" class="item">
			<view class="item-top flex item-center">
				<view class="pic imgCirc">
					<image :src="setImg('',item.genderType)" mode="widthFix"></image>
				</view>
				<view class="name flex-1 textEllipsis">
					{{item.nickName}}
				</view>
				<view class="star">
					<block  v-for="(numitem,numind) in [1,2,3,4,5]" :key="numind">
						<image v-if="numitem<=item.gradeZh" src="/static/images/yellow_star.png" mode="widthFix"></image>
						<image v-else src="/static/images/gray_star.png" mode="widthFix"></image>
					</block>
				</view>
			</view>
			<view class="text">
				{{item.content?item.content:''}}
			</view>
			<view class="imgList clearfix">
				<view class="imgItem" v-for="(imgItem,imgInd) in item.imgPathList" :key="imgInd">
					<view class="imgBox" @tap="showBig(ind,imgInd)">
						<image :src="setImg(imgItem)" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="time fs12 c999">
				<text>{{item.skuPropValue }}</text>
				<text>{{item.commentTime}}</text>
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
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				pageIndex:1,
				pageSize:20,
				pageTotal:1,
				commontList:[],
				nodata:false,
				nomore:false
			};
		},
		onLoad(options){
			this.id = options.goodsId
		},
		onShow(){
			if(getApp().globalData.isShowPic){
				getApp().globalData.isShowPic=false
			}else{
				this.getCommentList()
			}
			
		},
		onReachBottom(){
			if(this.pageIndex<this.pageTotal){
				this.pageIndex++
				this.getCommentList()
			}else{
				this.nomore=true
			}
		},
		onPullDownRefresh(){
			this.setParams()
			this.getCommentList()
			uni.stopPullDownRefresh()
		},
		methods:{
			getCommentList(){
				let self = this
				let params = {
					pageIndex:this.comIndex,
					pageSize:this.comSize,
					id:this.id
				}
				this.$acFrame.HttpService.prodComments(params).then(res=>{
					if(res.success){
						self.comTotal=res.data.pageTotal
						let list = res.data.rows
						if(list.length>0){
							list.filter(v=>{
								v.commentTime  = self.$acFrame.Util.formatTime(v.commentTime,'day')
							})
							self.commontList= self.commontList.concat(list)
						}else{
							self.nodata=true
						}
					}
				})
			},
			showBig(pind,cind){
				let info = this.commontList[pind];
				let imgList = info.imgPathList;
				
				imgList.filter(v=>{
					v=this.setImg(v)
				})
				this.$acFrame.Util.showBigPic(imgList[cind], imgList);
				getApp().globalData.isShowPic = true
			},
			setParams(){
				this.pageIndex=1
				this.nodata=false
				this.nomore=false
				this.commontList=[]
			},
			setImg(src,genderType){
				return  this.$acFrame.Util.setImgUrl(src,genderType);
			},
		}
	}
</script>

<style lang="less">
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
		.imgList{
			margin-top:20rpx;
			padding:0 10rpx;
			.imgItem{
				width: 25%;
				height:calc((100vw - 20rpx) / 4 - 20rpx);
				float:left;
				padding:0 10rpx;
				margin-bottom:20rpx;
				.imgBox{
					overflow: hidden;
					height:100%;
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
</style>
