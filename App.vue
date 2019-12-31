<script>
import MyConfig from "@/common/config";
import AcFrame from "@/common/acFrame";
export default {
  globalData: {
    config: MyConfig,
    comFunc: AcFrame,
	userCode:'',
	isShowPic:false,
	orderType:'', //下单的时候用
	prodVO:{}//下单的时候用
  },
  onLaunch: function(options) {
	  console.error(options)
	  // let userCode = 
  },
  onShow: function() {},
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="less">
/*重定义*/
input,
view {
  box-sizing: border-box;
}
image {
  vertical-align: middle;
  width: 100%;
  height: 0;
  display: inline-block;
  &[mode='aspectFit']{
	  height:100%;
  }
  &[mode='aspectFill']{
	   height:100%;
  }
}
button {
  vertical-align: middle;
  font-size: 28rpx !important;
  &.radiuBtn {
    border-radius: 60rpx;
  }
  &.noradius {
    border-radius: 0;
  }
}
text {
  display: inline-block;
}
.pagebg {
  background: #eeeeee;
  min-height: 100vh;
}
.content {
  font-size: 28rpx;
  color: #444;
  border-top: 1px solid #e1e1e1;
}
.m-r-20 {
  margin-right: 20rpx;
}
.myscroll {
  height: 100%;
}
.blod {
  font-weight: 600;
}
.imgCirc {
  border-radius: 100%;
  overflow: hidden;
}
/*个人新增*/
.float-left {
  float: left;
}

.float-right {
  float: right;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}
.clearfix {
  clear: both;
}
.clearfix:after {
  display: block;
  clear: both;
  content: "";
}

.border-box {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.breakWord {
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.modalmask {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 20;
  .centerModal{
	  width:80%;
	  margin:0 auto;
	  background: #fff;
	  border-radius:20rpx;
	  overflow: hidden;
	  box-shadow: 0 0 5px rgba(0,0,0,0.1);
	  .title{
		  line-height: 80rpx;
		  padding:0 30rpx;
		  position:relative;
		  border-bottom: 1px solid #e6e6e6;
		  .close{
			  position:absolute;
			  top:0;
			  right:0;
			  height:80rpx;
			  width: 80rpx;
			  text-align:center;
			  color:#999;
		  }
	  }
	  .center{
		  padding:20rpx 30rpx;
		  text-align: center;
	  }
	  .foot{
		  border-top:1px solid #e6e6e6;
		  > view{
			  height:80rpx;
			  line-height: 80rpx;
			  text-align: center;
		  }
		  .sure{
			  color:#007AFF;
		  }
		  .cancel{
			  color:#999;
			  border-right:1px solid #e6e6e6;
		  }
	  }
  }
}
.comModal {
  position: absolute;
  width: 100%;
  background: #fff;
  left: 0;
  bottom: 0;
}
.comfootBtn {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  background: #b40000;
  font-size: 30rpx;
  letter-spacing: 5px;
  padding-bottom: constant(safe-area-inset-bottom);
}
.comNumber {
  border: 1px solid #ccc;
  border-radius: 0.3em;
  height: 74rpx;
  line-height: 70rpx;
  overflow: hidden;
  input {
    float: left;
    width: 100rpx;
    line-height: 70rpx;
    height: 70rpx;
    background: #fff;
    border: none;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    text-align: center;
  }
  .iconfont {
    float: left;
    background: #efefef;
    width: 70rpx;
    line-height: 70rpx;
    height: 70rpx;
    text-align: center;
    color: #fff;
    &.touch {
      background: #ccc;
    }
  }
}
.comHeadPic {
  position: relative;
  border-radius: 100%;
  .headPic {
    border-radius: 100%;
	height:100%;
  }
  .grade {
    position: absolute;
    width: calc(100% + 30rpx) !important;
    top: -10rpx;
    left: -15rpx;
  }
}
.comNews {
  background: #fff;
  .listBox {
    position: relative;
    height: 140rpx;
    .btn {
      height: 100%;
      width: 140rpx;
      text-align: center;
      line-height: 140rpx;
      color: #fff;
    }
    .look {
      background: #4c8ff7;
    }
    .delete {
      background: #b40000;
    }
  }
  .newBox {
    position: absolute;
	height: 140rpx;
	width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    transition: left 0.3s ease;
    .pic {
      width: 100rpx;
      height: 100rpx;
      overflow: hidden;
      border-radius: 100rpx;
      margin: 0 40rpx;
    }
    .main {
	height: 140rpx;
      border-bottom: 1px solid #ccc;
      padding: 24rpx 0;
      .text {
        margin-top: 10rpx;
      }
    }
  }
}
.comListBox {
  padding: 0 24rpx;
  background: #fff;
  .item {
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border: 0;
    }
  }
}
.comItem {
  .pic {
    margin: 0 24rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 60rpx;
    overflow: hidden;
  }
  .main {
    padding: 20rpx 0;
    border-bottom: 1px solid #ccc;
  }
  .right-pic {
    height: 80rpx;
    line-height: 80rpx;
  }
}
.comResult {
  padding: 70rpx 0;
  text-align: center;
  .pic {
    width: 180rpx;
    max-width: 90px;
    margin: 0 auto;
  }
  .text {
    margin-top: 20rpx;
  }
}
icon.remove {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
  height: 40rpx;
  width: 40rpx;
  border-radius:40rpx;
  background: #b40000;
  color: #fff;
  line-height: 40rpx;
  text-align: center;
  font-size: 24rpx;
  &::before {
    line-height: 40rpx;
    position: absolute;
    top: 2rpx;
    left: 10rpx;
    text-align: center;
  }
}
.noData {
	position:absolute;
	height:100%;
	top:0;
	left:0;
	width: 100%;
  image {
    width: 400rpx;
    margin: 60rpx 20rpx;
  }
  button {
    margin-top: 40rpx;
    width: 240rpx;
  }
  navigator {
    display: inline-block;
    margin-top: 40rpx;
    width: 240rpx;
    line-height: 80rpx;
    text-align: center;
    color: #b40000;
    border: 1px solid #b40000;
    border-radius: 80rpx;
  }
}
.noMore {
  line-height: 60rpx;
  text-align: center;
  color: #999;
  font-size: 24rpx;
}
.lh42{
	line-height: 42rpx;
}
.pr30{
	padding-right:30rpx;
}
/*字体大小*/
.fs10 {
  font-size: 20rpx;
}
.fs11 {
  font-size: 22rpx;
}
.fs12 {
  font-size: 24rpx;
}
.fs13 {
  font-size: 26rpx;
}
.fs15 {
  font-size: 30rpx;
}
.fs16 {
  font-size: 32rpx;
}
.fs18 {
  font-size: 36rpx;
}
.fs20 {
  font-size: 40rpx;
}
.lh42{
  line-height: 42rpx;
}
/*字体颜色*/
.red {
  color: #b40000 !important;
}
.blue {
  color: #4c8ff7;
}
.white {
  color: #fff;
}
.orange {
  color: #ff9d19;
}
.c666 {
  color: #666;
}
.c999 {
  color: #999;
}

/*自定义按钮*/
button[type="red"] {
  background: #b40000 !important;
  color: #fff !important;
  &::after {
    border: none !important;
    box-shadow: none !important;
  }
}
button[type="default"] {
  color: #999 !important;
}
button[type="rednull"] {
  background: none !important;
  color: #b40000 !important;
  border: 1px solid #b40000;
  &::after {
    border: none !important;
  }
}
button[type="text"] {
  background: none !important;
  color: #444;
  border: none;
  &::after {
    border: none !important;
    box-shadow: none !important;
  }
}
button[type="share"] {
  background: none !important;
  border: none;
  color:inherit;
  &::after {
    border: none !important;
    box-shadow: none !important;
  }
  &.red{
	 color:#B40000; 
  }
}
button[type="null"] {
  background: none !important;
  color: #666 !important;
  border: 1px solid #ccc;
  box-shadow: 50%;
  &::after {
    border: none !important;
    box-shadow: none !important;
  }
}
button[type="orange"] {
  background: #ff9d19 !important;
  color: #fff !important;
  border: none;
  &::after {
    border: none !important;
    box-shadow: none !important;
  }
}
button[type="blue"] {
  background: #4c8ff7 !important;
  color: #fff !important;
  border: none;
  &::after {
    border: none !important;
    box-shadow: none !important;
  }
}
button[size="mini"] {
  font-size: 26rpx !important;
  line-height: 72rpx;
  &::after {
    box-shadow: none;
    border: 0;
  }
}
.linear_btn {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  color: #fff;
  border-radius: 0.3em;
  background: linear-gradient(180deg, #b40000 0%, #ef180d 100%);
}
/*flex布局*/
.flex {
  display: -webkit-box;
  display: flex;
}

.flex.f-row {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
}

.flex.row-rev {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  flex-direction: row-reverse;
}

.flex.f-col {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
}

.flex.col-rev {
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  flex-direction: column-reverse;
}

.flex.nowrap {
  flex-wrap: nowrap;
}

.flex.f-wrap {
  flex-wrap: wrap;
}

.flex.wrap-rev {
  flex-wrap: wrap-reverse;
}

.flex.item-base {
  -webkit-box-align: baseline;
  align-items: baseline;
}

.flex.item-top {
  -webkit-box-align: start;
  align-items: flex-start;
}

.flex.item-bottom {
  -webkit-box-align: end;
  align-items: flex-end;
}

.flex.item-center {
  -webkit-box-align: center;
  align-items: center;
}

.flex.item-full {
  -webkit-box-align: stretch;
  align-items: stretch;
}

.flex.just-con-l {
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.flex.just-con-r {
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.flex.just-con-c {
  -webkit-box-pack: center;
  justify-content: center;
}

.flex.just-con-b {
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.flex.just-con-a {
  justify-content: space-around;
}

.flex.align-star {
  align-content: flex-start;
}

.flex.align-end {
  align-content: flex-end;
}

.flex.align-center {
  align-content: center;
}

.flex.align-full {
  align-content: stretch;
}

.flex.align-between {
  align-content: space-between;
}

.flex.align-round {
  align-content: space-around;
}

.flex.align-stretch {
  align-content: stretch;
}

.flex .order {
  -webkit-box-ordinal-group: 2;
  order: 1;
}

.flex .flex-1 {
  -webkit-box-flex: 1;
  flex-grow: 1;
}

.flex .flex-2 {
  -webkit-box-flex: 2;
  flex-grow: 2;
}

.flex .flex-3 {
  -webkit-box-flex: 3;
  flex-grow: 3;
}

.flex .flex-4 {
  -webkit-box-flex: 4;
  flex-grow: 4;
}

.flex .shrink-0 {
  flex-shrink: 0;
}

.flex .shrink-1 {
  flex-shrink: 1;
}

.flex .flex-basis {
  flex-basis: auto;
}

.flex .flex-basis-0 {
  flex-basis: 0;
}

.flex .self {
  align-self: auto;
}

.flex .self-top {
  align-self: flex-start;
}

.flex .self-base {
  align-self: baseline;
}

.flex .self-bottom {
  align-self: flex-end;
}

.flex .self-center {
  align-self: center;
}

.flex .self-full {
  align-self: stretch;
}

.clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
}

.textEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clamp.clamp-3 {
  -webkit-line-clamp: 3;
}

.clamp.clamp-2 {
  -webkit-line-clamp: 2;
}

.clamp.clamp-1 {
  -webkit-line-clamp: 1;
}

.imagemiddle {
  align-items: center;
  display: -webkit-flex;
}

.fw {
  width: 100%;
}

.fh {
  height: 100%;
}
</style>
