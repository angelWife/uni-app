<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="editBox">
				<view class="title"><input   type="text" placeholder="请输入标题" maxlength="30" v-model="title"  @input="changeTitle"/></view>
				<view class="textarea">
					<!-- <textarea id="editDist" placeholder="请输入正文" v-model="articleMsg"></textarea> -->
					<editor   show-img-toolbar="true" show-img-resize="true"  style="height:100%;" id="editDist" placeholder="请输入正文" :value="articleMsg" @input="changeInput" @statuschange="changeClass"></editor>
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
				editModal:'',
				editor_focus:true
			};
		},
		onReady(){
			 var self = this;
			 var editModal = uni.createSelectorQuery().select('#editDist');
			 editModal.context(function(res){
				 if(!res){
					 return;
				 }
			 	self.ctx = res.context;
			 }).exec()
		},
		methods: {
			ff(e){
				this.articleMsg = this.articleMsg.replace(/<br\/>/g,"");
				this.articleMsg = this.articleMsg + "<br/>";
				this.setContent();
				console.log(this.articleMsg);
			},
			choosePic() {
				let self = this
				this.$acFrame.Util.uploadFullPic(1).then(res => {
					let url = res;
					self.imgList.push(url);
					self.setImg(url);
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
			setImg(url){
				var self = this;
				self.articleMsg = self.articleMsg.replace("<p><br></p><p><br></p><p><br></p>","");
				console.log(self.articleMsg);
				self.articleMsg = self.articleMsg + `<p><img style="max-width:100%;height:auto;" src='${url}' /></p><p><br></p><p><br></p><p><br></p>`;
				this.ctx.setContents({
					html:self.articleMsg,
					success:function(ret){
						console.log("successs");
						console.log(ret);
					},
					fail:function(ret){
						console.log("fail");
						console.log(ret);
					}
				}); 
			},
			setContent(){
				var self = this;
				this.ctx.setContents({
					html:self.articleMsg,
					success:function(ret){
						console.log("successs");
						console.log(ret);
					},
					fail:function(ret){
						console.log("fail");
						console.log(ret);
					}
				}); 
			},
			postActical(){
				let self = this
		
				let params = {
					content:self.articleMsg,
					title:this.title,
					imgPathList :this.imgList,
					zyao:this.textContent
				}
				if(!params.title){
					this.$acFrame.Util.mytotal('请输入标题！');
					return false;
				}
				/* if(params.title.length > 30){
					this.$acFrame.Util.mytotal('文章标题不能低于30个字');
					return false;
				} */
				if(!params.content){
					this.$acFrame.Util.mytotal('请输入文章内容！');
					return false;
				}
				console.log(params);
				//return;
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
		height:100%;
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
		height:100%;
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
