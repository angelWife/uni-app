<template>
  <view class="content pagebg">
    <view class="modal mod1">
      <view class="fs16 red">售后处理中</view>
      <view>
        剩余处理时间：
        <uni-count-down
          :show-day="false"
          :show-style="true"
          :hour="12"
          :minute="12"
          :second="12"
        ></uni-count-down>
      </view>
    </view>
    <view class="modal mod2 flex item-center">
      <view class="pic"></view>
      <view class="name">湖南弘道图书专营店</view>
    </view>
    <view class="modal">
        <view class="item flex">
            <view class="name c999">
                申请类型
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item flex">
            <view class="name c999">
                申请原因
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item flex">
            <view class="name c999">
                退款金额
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item flex">
            <view class="name c999">
                申请说明
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item flex">
            <view class="name c999">
                商品名称
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item flex">
            <view class="name c999">
                订单编号
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item flex">
            <view class="name c999">
                申请时间
            </view>
            <view class="flex-1">退款</view>
        </view>
        <view class="item">
            <button type="rednull">取消申请</button>
        </view>
    </view>
  </view>
</template>

<script>
import uniCountDown from "@/components/countDown.vue";
export default {
  components: {
    uniCountDown
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.modal {
  background: #fff;
  padding: 24rpx;
  margin-bottom: 20rpx;
  .item{
      padding:20rpx 0;
      .name{
          width: 160rpx;
      }
  }
}
.mod2 {
  .pic {
    height: 60rpx;
    width: 60rpx;
    border-radius: 60rpx;
    overflow: hidden;
    margin-right: 20rpx;
  }
}
</style>
