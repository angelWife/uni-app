
<script>
	export default {
		globalData:{
			
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*重定义*/
	input,view{
		box-sizing: border-box;
	}
	image {
	  vertical-align: middle;
	  width: 100%;
	  height: 0;
	}
	button{
		vertical-align: middle;
		font-size:28rpx !important;
		&.radiuBtn{
			border-radius: 60rpx;
		}
	}
	.pagebg{
		background: #eeeeee;
		min-height:100%;
	}
	.content{
		font-size:28rpx;
		color:#444;
		border-top: 1px solid #e1e1e1;
	}
	.myscroll{
		height:100%;
	}
	.blod{
		font-weight: 600;
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
	.clearfix{
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
	
	.modalmask{
		height:100%;
		width: 100%;
		overflow: hidden;
		position:fixed;
		background: rgba(0,0,0,0.2);
		top:0;
		left:0;
		z-index: 10;
	}
	.comModal{
		position:absolute;
		width: 100%;
		background: #fff;
		left:0;
		bottom:0;
	}
	.comfootBtn{
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		color:#fff;
		background: #b40000;
		font-size: 30rpx;
		letter-spacing: 5px;
	}
	icon.remove{
		position: absolute;
		top:0rpx;
		right:0rpx;
		height:40rpx;
		width: 40rpx;
		background: #d5d5d5;
		color:#fff;
		line-height: 40rpx;
		text-align: center;
		font-size:24rpx;
		&::before{
			line-height: 40rpx;
			position:absolute;
			top:4rpx;
			left:8rpx;
			text-align: center;
		}
	}
	/*字体大小*/
	.fs10{
		font-size:20rpx;
	}
	.fs11{
		font-size:22rpx;
	}
	.fs12{
		font-size:24rpx;
	}
	.fs13{
		font-size:26rpx;
	}
	.fs15{
		font-size:30rpx;
	}
	.fs16{
		font-size:32rpx;
	}
	.fs18{
		font-size:36rpx;
	}
	.fs20{
		font-size:40rpx;
	}
	/*字体颜色*/
	.red{
		color:#b40000;
	}
	.blue{
		color:#4c8ff7;
	}
	.c999{
		color:#999;
	}
	/*自定义按钮*/
	button[type='red']{
		background: #b40000 !important;
		color:#fff !important;
	}
	button[type='rednull']{
		background: none !important;
		color:#b40000 !important;
		border:1px solid #b40000;
		&::after{
		   border:none !important;
		}
	}
	button[type='text']{
		background: none !important;
		color:#444 !important;
		border:none;
		&::after{
		   border:none !important;
		   box-shadow: none !important;
		}
	}
	button[size='mini']{
		font-size:26rpx !important;
		line-height: 2;
		
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
