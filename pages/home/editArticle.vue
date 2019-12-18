<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="editBox">
				<view class="title"><input type="text" placeholder="请输入标题" maxlength="60" v-model="title"  @input="changeTitle"/></view>
				<view class="textarea">
					<!-- <textarea id="editDist" placeholder="请输入正文" v-model="articleMsg"></textarea> -->
					<editor id="editDist" placeholder="请输入正文" :value="articleMsg" @input="changeInput" @statuschange="changeClass"></editor>
				</view>
				<!-- <view class="pic">
					<view class="item" v-for="(item, index) in imgList" :key="index">
						<image :src="item" mode="widthFix" @tap="showImg(index)"></image>
						<icon class="iconfont icon-clear" @tap="deleteImg(index)"></icon>
					</view>
					<view class="upload" @tap="getPic"><image src="../../static/images/defaultpro.png" mode="widthFix"></image></view>
				</view> -->
			</view>
		</scroll-view>
		<view class="operBox clearfix">
			<view class="item" @tap="choosePic">
				<icon class="iconfont icon-tupian"></icon>
			</view>
			<!-- <view class="item" @tap="linkTo('friends')">
        @
      </view>
      <view class="item" @tap="linkTo('subject')">
        #
      </view>
      <view class="item" @tap="linkTo('ranking')">
        <icon class="iconfont icon-link"></icon>
      </view> -->
		</view>
		<view class="comfootBtn" @tap="postActical">发布</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleMsg: "",
				textDetail: "",
				title: "",
				imgList: [],
				textContent:'',
				editModal:''
			};
		},
		onReady(){
			// this.editModal = uni.createSelectorQuery().select('#editDist');
		},
		methods: {
			choosePic() {
				let self = this;
				this.$acFrame.Util.uploadPic().then(res => {
					let url = res;
					self.imgList.push(url);
					// self.textDetail=self.articleMsg+`<br><img src="${url}"/><br>`
					// self.articleMsg+=`<br><img src="${url}"/><br>`
					//let editModal = uni.createSelectorQuery().in(self).select('#editDist')
					// debugger
					// self.editModal.editorContext.insertImage({
					// 	src:url,
					// 	success:(res)=>{
					// 		console.log(res)
					// 	}
					// })
				});
			},
			changeTitle(e) {
				let val = e.detail.value
				this.title=val
			},
			changeInput(e) {
				let val = e.detail.html
				let text = e.detail.text
				this.articleMsg = val
				this.textContent = text
			},
			changeClass() {

			},
			postActical(){
				let self = this
				let params = {
					content:this.articleMsg,
					title:this.title,
					imgPathList :this.imgList[0]||[],
					zyao:this.textContent
				}
				if(!params.title){
					this.$acFrame.Util.mytotal('请输入标题！');
					return false;
				}
				if(!params.content){
					this.$acFrame.Util.mytotal('请输入文章内容！');
					return false;
				}
				this.$acFrame.HttpService.raleaseArtical(params).then(res => {
					if(res.success){
						self.$acFrame.Util.mytotal('发布成功！！');
						setTimeout(function() {
							uni.navigateBack({})
						}, 1000);
					}
				});
			},
			deleteImg(index) {},
			showImg(index) {}
		},
	};
</script>

<style lang="less">
	page,
	.content {
		height: 100%;
		background: #fff;
	}

	.editBox {
		padding: 0 20rpx;
		overflow: hidden;
	}

	.title {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px dashed #efefef;

		input {
			line-height: 100rpx;
			height: 100%;
			width: 100%;
			font-size: 40rpx;
		}
	}

	scroll-view {
		height: calc(100% - 180rpx);
	}

	.textarea {
		margin-top: 20rpx;

		textarea {
			width: 100%;
			height: 400rpx;
			border-radius: 0.3em;
			background: #eee;
			padding: 20rpx;
			box-sizing: border-box;
		}
	}

	.pic {
		overflow: hidden;
		width: 105%;
		margin-top: 40rpx;

		.item {
			float: left;
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			position: relative;

			icon {
				position: absolute;
				top: 0;
				right: 0;
				width: 40rpx;
				height: 40rpx;
				text-align: center;
				color: #b40000;

				&::before {
					position: absolute;
					width: 100%;
					top: 10rpx;
					left: 0;
				}
			}
		}

		.upload {
			float: left;
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}
	}

	.operBox {
		padding-bottom: constant(safe-area-inset-bottom);
		background: #eee;

		.item {
			width: 20%;
			float: left;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #999;
			font-size: 40rpx;

			.iconfont {
				font-size: 40rpx;
			}
		}
	}
</style>
