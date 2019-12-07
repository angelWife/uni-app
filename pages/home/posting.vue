<template>
  <view class="content">
    <view class="textarea">
      <textarea
        value="editText"
        placeholder="请输入"
        v-model="text"
        @input="textChange"
      />
      <view class="text-right">
        <text class="c999">{{ textNum }}/500</text>
        <button type="red" size="mini">发布</button>
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
    <view class="linkBox flex item-center" v-if="linkObj.price">
      <view class="pic">
        <image :src="linkObj.pic" mode="widthFix"></image>
      </view>
      <view class="msg flex-1">
        <view class="name textEllipsis">{{ linkObj.name }}</view>
        <view class="price red">
          <text class="fs12">¥</text>
          <text class="fs16">{{ linkObj.price }}</text>
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
      <view class="item" @tap="chooseLink">
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
      extendList: []
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
    chooseLink() {
      uni.navigateTo({
        url: "ranking"
      });
    },
    changeData(obj) {
      console.log(obj);
      this.linkObj = obj;
    },
    choosePic() {
      let self = this;
      this.$acFrame.Util.uploadPic().then(res => {
        self.picList.push(res);
      });
    },
    removePic(ind) {
      this.picList.splice(ind, 1);
    },
    showpic(ind) {
      this.$acFrame.Util.showBigPic(this.picList[ind], this.picList);
    },
    linkTo(name) {
	  this.getText()
      uni.navigateTo({
        url: name,
        success: res => {},
        fail: () => {},
        complete: () => {}
      });
    },
    setVal(id, name, type) {
      
      let len = this.onlyTetxt.length;
      let text = this.editText;

      let obj = {};
      if (type == "friend") {
        obj.atId = id;
        obj.atName = name;
        index = len;
        text += "@" + name;
      } else {
        obj.atId = id;
        obj.topicName = name;
		index = len;
		text+='#'+name+'#'
	  }
	  this.editText = text
    },
    getText() {
	  let text = this.editText;
	  let self = this
      if (this.extendList.length > 0) {
        let star = 0;
        this.extendList.filter((v, i) => {
          let mark = "";

          if (v.atName) {
            mark = "@" + v.atName;
          } else {
            mark = "#" + v.topicName + "#";
          }
		  let end = text.indexOf(mark);
		  let len = mark.length;
		  self.onlyTetxt+=text.substring(star,end);
		  star = end+len;
        });
      }else{
		  self.onlyTetxt = text
	  }
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
    height: 100rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    background: #eee;
    .item {
      width: 20%;
      float: left;
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
