<template>
  <view class="content pagebg">
    <view class="modal input flex">
      <view class="name">申请类型</view>
      <view class="textBox flex-1">
        退货退款
      </view>
    </view>
    <view class="modal input flex">
      <view class="name">申请原因</view>
      <view
        class="textBox flex-1"
        :class="{ c999: !hasChoose }"
        @tap="showList"
      >
        {{ reason }}
      </view>
    </view>
    <view class="modal input flex">
      <view class="name">退款金额</view>
      <view class="textBox flex-1">
        ¥139.70
      </view>
    </view>
    <view class="expalin">
      <view class="title">申请说明</view>
      <textarea name="" class="mytext" placeholder="（必填）请详细描述申请原因"></textarea>
    </view>
    <view class="modal input flex">
      <view class="name">联系电话</view>
      <view class="textBox flex-1">
        18012341234
      </view>
    </view>
    <view class="footBtn">
      <button type="red">下一步</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      reason: "点击选择申请原因",
      hasChoose: fasle
    };
  },
  onLoad(options) {
    uni.setNavigationBarTitle({
      title: options.title
    });
  },
  onShow() {},
  methods: {
    showList() {
      uni.showActionSheet({
        itemList: ["A", "B", "C"],
        success: function(res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 20rpx 24rpx 0;
}
.modal {
  background: #fff;
  border-radius: 0.3m;
  margin-bottom: 20rpx;
  .name {
    width: 150rpx;
  }
  input {
    height: 100rpx;
    line-height: 100rpx;
  }
}
.input {
  line-height: 100rpx;
  height: 100rpx;
  padding: 0 20rpx;
}
.expalin {
  margin-bottom: 20rpx;
  .title {
    line-height: 60rpx;
  }
  .mytext {
    width: 100%;
    height: 240rpx;
    background: #fff;
    border-radius: 0.3m;
    padding:20rpx;
    box-sizing: border-box;
  }
}
.footBtn{
  padding:24rpx;
  margin-top:40rpx;
}
</style>
