<template>
  <view class="content pagebg">
    <view class="city-box" wx:if="{{letter}}">
      <view class="city-left">
        <view class="scroll-view">
          <view class="city-list-box">
            <block
              v-for="(letterItem,letterIndex) in customers"
              :key="letterIndex"
            >
              <view
                class="city-first-letter"
                data-code="{{letterItem.key}}"
                id="{{letterItem.key == '#' ? 'NULL' : letterItem.key}}"
                @touchstart="touchstart"
                @touchend="touchend(event, ind)"
                >{{ letterItem.key }}
              </view>
              <block
                v-for="(item,index) in letterItem.customerList"
                :key="index"
              >
                <view class="city-name" @tap="jumpOrder(item)">
                  <text class="name">{{ item }}</text>
                </view>
              </block>
            </block>
          </view>
        </view>
      </view>
      <view class="city-right">
        <repeat for="{{letter}}" key="index" index="index" item="item">
          <text
            class="letter-item {{item}} {{item == clickLetter ? 'active' : ''}}"
            @tap.stop="letterTap"
            data-item="{{item == '#' ? 'NULL' : item}}"
            >{{ item }}
          </text>
        </repeat>
      </view>
      <view class="city-choose" wx:if="{{showCode}}">{{ showCode }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      letter: [], // 字母集合
      clickLetter: "", // 点击的字母
      customers: [],
      showCode: "", // 显示字母
      startY: 0, // A坐标位置
      scrollHeight: 0,
      t_x: 0,
      t_y: 0
    };
  },
  methods: {
     touchstart: function(e) {
      this.t_x = e.touches[0].pageX;
      this.t_y = e.touches[0].pageY; // 获取触摸时的原点
      // timeInterval = setInterval(function() {
      //   times++;
      // }, 50);
    },
    touchend: function(e, ind) {
      let touchMoveX = e.changedTouches[0].pageX;
      let touchMoveY = e.changedTouches[0].pageY;
      let dataList = this.dataList;
      let tmX = touchMoveX - this.t_x;
      let tmY = touchMoveY - this.t_y;
      let absX = Math.abs(tmX);
      let absY = Math.abs(tmY);
      if (absX > 2 * absY && absX > 5) {
        if (tmX < 0) {
          dataList.filter((v, i) => {
            uni.showModal({
              title: '',
              
              content: '你确定解除好友关系吗？',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
          });
        } else {
          
        }
      }
      this.dataList = dataList;
      this.t_y = 0;
      this.t_x = 0;
    },
    letterTap(e) {
      const item = e.currentTarget.dataset.item;
      this.clickLetter = item;
      this.showCode = item == "NULL" ? "#" : item;

      
        wx.createSelectorQuery()
        .select("#" + item.toLocaleUpperCase())
        .boundingClientRect(res => {
          if (res.top) {
            wepy.pageScrollTo({
              scrollTop: res.top + this.scrollHeight - 102,
              duration: 0
            });
          }
        }).exec();

      let time = setTimeout(() => {
        this.showCode = "";
        clearTimeout(time);
      }, 1000);
    },
    getData(key) {
      let params = {
        consignee: key
      };
      this.$acFrame.HttpService.customers(params)
        .then(res => {
          this.renderLetter(res);
        })
        .catch(err => {
          console.error(err);
        });
    },

    // 渲染字母
    renderLetter(res) {
      if (!(res && res.keyList)) {
        this.showNoImg = true;
        this.letter = [];
        this.customers = [];
        return;
      }
      this.showNoImg = false;
      this.letter = res.keyList;
      this.customers = res.types;
      this.$apply();
      wx.createSelectorQuery()
        .select(".letter-item." + this.letter[0])
        .boundingClientRect(res => {
          this.startY = res.top;
        }).exec();
    }
  }
};
</script>

<style lang="less" scoped>
.city-box {
  padding-top: 200rpx;
  background: #fff;
  display: flex;
}

.city-left {
  flex: 1;
  .scroll-view {
    width: 100%;
    height: 100%;
  }
}

.city-right {
  position: fixed;
  top: calc(50% + 102rpx);
  right: 4rpx;
  z-index: 11;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60rpx;

  .letter-item {
    color: #00a6f5;
    font-size: 26rpx;
  }
}

.letter-item {
  flex: 1;
  display: block;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 24rpx;
  color: #333;
  text-align: center;
  transition: all 0.3 ease-in-out;
  &.active {
    font-weight: 600;
  }
}

.city-first-letter {
  line-height: 52rpx;
  height: 52rpx;
  padding-left: 25rpx;
  font-size: 28rpx;
  background: #efeff4;
  color: #333;
}

.city-name {
  display: flex;
  justify-content: space-between;
  line-height: 98rpx;
  height: 98rpx;
  border-bottom: 2rpx solid #ededf2;
  font-size: 30rpx;
  color: #333;
  margin-right: 24rpx;
  margin-left: 24rpx;
  background-color: #fff;

  &:last-child {
    border-bottom: 0 none;
  }
}

.city-choose {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 140rpx;
  height: 140rpx;
  line-height: 140rpx;
  text-align: center;
  font-size: 80rpx;
  background-color: rgb(128, 128, 128);
  color: #fff;
}
</style>
