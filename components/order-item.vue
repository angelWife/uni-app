<template>
  <view class="orderList">
    <view v-for="(item, index) in dataList" :key="index" class="item">
      <view class="item_head flex item-center">
        <view class="pic">
          <image :src="setImg(item.shopInfo.imgPath?item.shopInfo.imgPath:'')" mode="widthFix" />
        </view>
        <view class="name flex-1 textEllipsis">{{item.shopInfo.name}}</view>
        <view class="status orange">
          <text class="mr20">{{item.status}}</text>
          <!-- <uni-count-down
            :color="timeStyle.color"
            :show-day="false"
            :show-style="true"
            :hour="12"
            :minute="12"
            :second="12"
          /> -->
        </view>
      </view>
      <view class="item_body flex" v-for="(ditem,dind) in item.detailList " :key = "dind"  >
        <view class="pic">
			<image :src="setImg(ditem.goodsImgPath?ditem.goodsImgPath:'')" mode="widthFix" />
		</view>
        <view class="flex-1">
          <view class="flex">
            <view class="name flex-1 clamp clamp-2">
              {{ditem.goodsName}}
            </view>
            <view class="text-right">
              <view class="salePrice">¥{{ditem.priceBuy}}</view>
              <view class="nums fs12 c999">x{{ditem.buyNum}}</view>
            </view>
          </view>
          <view class="spec">
            <text>{{ditem.goodsSkuPropValue}}</text>
          </view>
        </view>
      </view> 
      <view class="payprice text-right red" v-if="item.status==1" >
        实付：<text class="fs12">¥</text><text>{{item.pricePayWait}}</text>
      </view>
	  <view class="payprice text-right red" v-else >
	    实付：<text class="fs12">¥</text><text>{{item.pricePay}}</text>
	  </view>
      <view class="orderBtn text-right">
        <button type="red">邀请好友拼单</button>
        <button type="rednull">付款</button>
        <button type="null">申请退款</button>
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
  </view>
</template>

<script>
import uniCountDown from "@/components/countDown.vue";
export default {
  components: {
    uniCountDown
  },
  props: {
    dataList: {
      // 要显示的数组
      type: Array,
      default() {
        return [];
      }
    },
    nodata: {
      // 是否是详情
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      timeStyle: {
        color: "#ff9d19"
      }
    };
  },
  methods: {
    setImg(src) {
      return this.$acFrame.Util.setImgUrl(src);
    }
  }
};
</script>

<style lang="less">
.item {
  background: #fff;
  margin: 0 24rpx 20rpx;
  border-radius: 0.4em;
  .item_head {
    padding: 10rpx 20rpx;
    .pic {
      width: 60rpx;
      height: 60rpx;
      border-radius: 60rpx;
      overflow: hidden;
      margin-right: 20rpx;
    }
    .name {
      width: 50%;
    }
    .status {
      text {
        display: inline-block;
      }
    }
  }
  .item_body {
    padding: 10rpx 20rpx 0;
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
    padding: 0 20rpx;
    line-height: 60rpx;
  }
  .orderBtn {
    padding: 20rpx;
    button {
      display: inline-block;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0 20rpx;
      border-radius: 80rpx;
      margin-left: 20rpx;
    }
  }
}
.mr20 {
  margin-right: 20rpx;
}
</style>
