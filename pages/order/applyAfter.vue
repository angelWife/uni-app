<template>
  <view class="content pagebg">
    <view class="modal" @tap="linkTo('hasgoods')">
      <view class="pic">
        <image src="/static/images/sale1.png" mode="widthFix" />
      </view>
      <view class="text fs16 text-center">我要退货退款</view>
      <view class="text c999 text-center">已收到货，需要退还已收到的货物</view>
    </view>
    <view class="modal" @tap="linkTo('nullgoods')">
      <view class="pic">
        <image src="/static/images/sale2.png" mode="widthFix" />
      </view>
      <view class="text fs16 text-center">我要退货退款（无需退货）</view>
      <view class="text c999 text-center">未收到货，或与商家协商之后申请</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		orderData:''
	};
  },
  onLoad(options){
	  this.orderData = options.orderData
  },
  methods: {
    linkTo(title) {
      uni.navigateTo({
        url: `returnForm?type=${title}&orderData=${this.orderData}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.modal {
  background: #fff;
  border-radius: 0.3em;
  margin: 24rpx 24rpx 0;
  padding: 30rpx;
  .pic {
    width: 240rpx;
    margin: 0 auto 30rpx;
  }
  .text {
    line-height: 50rpx;
  }
}
</style>
