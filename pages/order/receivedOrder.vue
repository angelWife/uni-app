<template>
  <view class="content pagebg">
    <view class="timeBox">
      剩余<uni-count-down
        :show-day="false"
        :show-style="true"
        :hour="12"
        :minute="12"
        :second="12"
      />自动收货
    </view>
    <view class="modal logist flex item-center">
      <view class="icon"></view>
      <view class="name">
        <text class="c999">物流编号：</text>
        中通物流
      </view>
      <view class="flex-1 text-right">
        <text class="number m-r-20">sad44455415415</text>
        <text class="copy blue">复制</text>
      </view>
    </view>
    <view class="modal address flex item-center">
      <view class="pic">
        <image src="../../static/images/icon-address.png" mode="widthFix" />
      </view>
      <view class="msg">
        <view>
          <text class="fs15 m-r-20">姓名</text>
          <text class="c999">187957763145</text>
        </view>
        <view>上海市常烈区天海路街道星星路星能小区30号301室</view>
      </view>
    </view>
    <view class="modal product">
      <view class="item_head flex item-center">
        <view class="pic">
          <image src="../../static/images/head1.png" mode="widthFix" />
        </view>
        <view class="name flex-1 textEllipsis"></view>
      </view>
      <view class="item_body flex">
        <view class="pic"></view>
        <view class="flex-1">
          <view class="flex">
            <view class="name flex-1 clamp clamp-2">
              商品名称
            </view>
            <view class="text-right">
              <view class="salePrice">¥139.20</view>
              <view class="nums fs12 c999">x1</view>
            </view>
          </view>
          <view class="spec">
            <text>红色/XL</text>
          </view>
        </view>
      </view>
      <view class="payprice text-right red">
        实付：<text class="fs12">¥</text><text>39.20</text>
      </view>
      <view class="p_list">
        <view class="flex">
          <view class="name flex-1">运费</view>
          <view>¥5.00</view>
        </view>
      </view>
      <view class="contact">
        <image src="../../static/images/contact.png" mode="widthFix" />联系店主
      </view>
    </view>
    <view class="modal orderMsg">
      <view class="item flex">
        <view class="flex-1">订单编号：23456786543234567</view>
        <view class="blue">复制</view>
      </view>
    </view>
    <view class="footBtn">
<button type="red">邀请好友拼单</button>
        <button type="rednull">付款</button>
        <button type="null">申请退款</button>
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
.content{
    padding-bottom:100rpx;
}
.timeBox {
  line-height: 60rpx;
  text-align: center;
}
.modal {
  background: #fff;
  margin-bottom: 20rpx;
  padding: 20rpx 24rpx;
}
.address {
  .pic {
    width: 50rpx;
    margin-right: 20rpx;
  }
}
.product {
  .item_head {
    padding: 10rpx 0;
    .pic {
      width: 60rpx;
      height: 60rpx;
      border-radius: 60rpx;
      overflow: hidden;
      margin-right: 20rpx;
    }
    .name {
      width: 70%;
    }
  }
  .item_body {
    padding: 10rpx 0 0;
    .pic {
      width: 160rpx;
      height: 160rpx;
      overflow: hidden;
      margin-right: 20rpx;
    }
    .spec {
      text {
        display: inline-block;
        font-size: 24rpx;
        padding: 0 10rpx;
        background: #f8f8f8;
        color: #999;
        margin: 10rpx 10rpx 0 0;
      }
    }
  }
  .payprice {
    line-height: 80rpx;
    border-bottom: 1px solid #ccc;
  }
  .p_list {
    border-bottom: 1px solid #ccc;
    .item {
      line-height: 60rpx;
    }
  }
  .contact {
    line-height: 72rpx;
    image {
      width: 20px;
    }
  }
}
.orderMsg{
    .item{
        line-height: 60rpx;
    }
}
.footBtn{
    position: fixed;
    bottom:0;
    width: 100%;
    left:0;
    height:100rpx;
    padding:20rpx 0;
    text-align: right;
    button{
        display: inline-block;
        height: 80rpx;
      line-height: 80rpx;
      padding: 0 20rpx;
      border-radius: 80rpx;
      margin-right: 20rpx;
    }
}
</style>
