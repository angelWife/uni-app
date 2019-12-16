<template>
	<view class="content">
		<view class="textarea">
			<textarea value="editText" placeholder="请输入" v-model="editText" @input="textChange" />
			<view class="text-right">
        <text class="c999">{{ textNum }}/500</text>
        <button type="red" size="mini" @tap="confirmPost">发布</button>
      </view>
    </view>
    <view class="picList">
      <view class="item" v-for="(item, ind) in picList" :key="ind">
        <image :src="item" mode="widthFix" @tap="showpic(ind)"></image>
        <icon
          class="remove iconfont icon-remove"
          @tap.stop="removePic(item)"
        ></icon>
      </view>
    </view>
    <view class="picBtn">
      <view class="upload" @tap="choosePic">+</view>
    </view>
    <view class="linkBox flex item-center" v-if="linkObj.type">
      <view class="pic">
        <image :src="setImg(linkObj.pic)" mode="widthFix"></image>
      </view>
      <view class="msg flex-1">
        <view class="name textEllipsis">{{ linkObj.goodsName||linkObj.val }}</view>
        <view class="price red" v-if="linkObj.priceSale" >
          <text class="fs12">¥</text>
          <text class="fs16">{{ linkObj.priceSale }}</text>
        </view>
        <icon class="remove iconfont icon-remove" @tap="removeLink"></icon>
      </view>
    </view>
    <view class="operBox">
      <view class="item" @tap="choosePic">
        <icon class="iconfont icon-tupian"></icon>
      </view>
      <view class="item" @tap="linkTo('friends')">
        @
      </view>
      <view class="item" @tap="linkTo('subject')">
        #
      </view>
      <view class="item" @tap="linkTo('ranking')">
        <icon class="iconfont icon-link"></icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      linkObj: {},
      picList: [],
      onlyText: "",
      editText: "",
      textNum: 0,
      extendList: [],
      picInd: 0
    };
  },
  methods: {
    textChange(e) {
      let val = e.detail.value;
      this.editText = val;
      let len = val.length;
      if (len > 500) {
        this.$acFrame.Util.mytotal("亲，放不下太多的文字了！");
      } else {
        this.textNum = len;
      }
    },
    changeData(obj) {
      console.log(obj);
      this.linkObj = obj;
    },
    choosePic() {
      let self = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          let tempFilePaths = res.tempFilePaths;
          self.picList.push(tempFilePaths[0]);
        }
      });
    },
	setImg(src){
		return  this.$acFrame.Util.setImgUrl(src);
	},
    uploadPic(id) {
      let token = uni.getStorageSync("access_token");
      let channel = "MP_WX";
      let self = this;
      let _data = { id: id };
      let imgUrl = self.picList[self.picInd];
      let len = self.picList.length;
      if (self.picInd < len) {
        wx.uploadFile({
          url:
            getApp().globalData.config.basePath +
            "article/info/publish_tie_img?articleTieId=" +
            id, // 仅为示例，非真实的接口地址
          filePath: imgUrl,
          header: {
            token,
            channel
          },
          // formData:_data,
          name: "file",
          success: function(res) {
            let _data = JSON.parse(res.data);
            debugger;
            if (_data.success) {
              self.picInd++;
              self.uploadPic(id);
            }
          },
          fail: error => {
            self.$acFrame.Util.mytotal("error");
          }
        });
      } else {
        uni.navigateBack({});
      }
    },
    removePic(ind) {
      this.picList.splice(ind, 1);
    },
    showpic(ind) {
      this.$acFrame.Util.showBigPic(this.picList[ind], this.picList);
    },
    linkTo(name) {
      this.getText();
      uni.navigateTo({
        url: name,
        success: res => {},
        fail: () => {},
        complete: () => {}
      });
    },
    setLink(obj) {
		console.log(obj);
		this.linkObj = obj;
	},
	removeLink(){
		this.linkObj = null;
	},
    setVal(id, name, type) {
      let len = this.onlyText.length;
      let text = this.editText;
      let obj = {};
      if (type == "friend") {
        obj.atId = id;
        obj.atName = name;
        obj.index = len;
        text += "@" + name;
      } else {
        obj.atId = id;
        obj.topicName = name;
        obj.index = len;
        text += "#" + name + "#";
      }
      this.extendList.push(obj);
      this.editText = text;
    },
    getText() {
      let text = this.editText;
	  debugger
      let self = this;
      if (this.extendList.length > 0) {
        let star = 0;
        this.extendList.filter((v, i) => {
          let mark = "";

          if (v.atName) {
            mark = "@" + v.atName;
          } else {
            mark = "#" + v.topicName + "#";
          }
		  let len = text.length
          let end = text.indexOf(mark);
          let _len = mark.length;
		  star = _len+end
		  let aftertetxt = text.substring(star, len);
		  
          self.onlyText += aftertetxt
          star = end + len;
        });
      } else {
        self.onlyText = text;
      }
    },
    confirmPost() {
      this.getText();
      let self = this;
      let params = {
        content: this.onlyText,
        extendList: this.extendList,
		itemLinkList:[],
      };
		let _obj = {
			linkType:self.linkObj.type,
		};
		if(self.linkObj.type==1){
			 _obj.goodsId  = self.linkObj.goodsId
			 params.itemLinkList.push(_obj)
		}else if(self.linkObj.type==2){
			_obj.rankType   = self.linkObj.key
			params.itemLinkList.push(_obj)
		}
      if (!params.content) {
        this.$acFrame.Util.mytotal("请输入帖子内容！");
        return false;
      }
      this.$acFrame.HttpService.raleasePost(params).then(res => {
        if (res.success) {
          if (self.picList.length > 0) {
            self.uploadPic(res.data);
          } else {
            uni.navigateBack({});
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.content {
  padding: 0 20rpx 100rpx;
  .textarea {
    margin-bottom: 20rpx;
    textarea {
      padding: 20rpx 0;
      height: 160px;
      width: 100%;
      box-sizing: border-box;
    }
    .text-right {
      padding: 20rpx 0;
    }
    text {
      display: inline-block;
      margin-right: 20rpx;
    }
  }
  .picList {
    overflow: hidden;
    .item {
      float: left;
      position: relative;
      width: calc(25% - 10rpx);
      height: calc((100vw - 20rpx) / 4 - 10rpx);
      margin: 0 10rpx 10rpx 0;
      overflow: hidden;
    }
  }
  .upload {
    width: calc(25% - 10rpx);
    height: calc((100vw - 20rpx) / 4 - 10rpx);
    border: 1px dashed #d6d6d6;
    font-size: 50px;
    text-align: center;
    line-height: calc((100vw - 20rpx) / 5);
    color: #999;
  }
  .operBox {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    background: #eee;
    .item {
      width: 20%;
      float: left;
	  height:100rpx;
      line-height: 100rpx;
      text-align: center;
      color: #999;
      font-size: 40rpx;
      .iconfont {
        font-size: 40rpx;
      }
    }
  }
  .linkBox {
    background: #eee;
    padding: 5px;
    margin: 20rpx 0;
    position: relative;
    .pic {
      width: 100rpx;
      height: 100rpx;
      margin-right: 20rpx;
    }
    .msg {
      width: 50%;
      padding-right: 30rpx;
    }
  }
}
</style>
