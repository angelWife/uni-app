<template>
	<view class="content">
		<view class="modal">
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">头像</view>
				<view class="pic flex-1"><image src="../../static/images/head1.png" mode="widthFix" @tap="upLoadPic"></image></view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">用户名</view>
				<view class="text c999 flex-1">小甜甜</view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">介绍</view>
				<view class="text textEllipsis c999 flex-1">这个人很懒什么也没留下</view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">我的二维码</view>
				<view class="text flex-1">查看</view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
			<view class="item flex item-center" @tap="linkTo('bindPhone')">
				<view class="name">手机号码</view>
				<view class="text c999 flex-1">未绑定</view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">地区</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="mypicker pr60" @change="bindAreaChange" mode="region" :value="region" :custom-item="customItem">
						<view class="uni-input">{{region[0]}}{{region[1]}}{{region[2]}}</view>
					</picker>
					<view class="oper abs_right"><icon class="iconfont icon-right"></icon></view>
				</view>
			</view>
			<view class="item flex item-center" @tap="linkTo('addressList')">
				<view class="name">收货地址</view>
				<view class="text textEllipsis c999 flex-1"></view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">性别</view>
				<view class="text textEllipsis pr60 c999 flex-1">
					<text>男</text>
					<view class="oper abs_right"><icon class="iconfont icon-right"></icon></view>
				</view>
			</view>
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">星座</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="mypicker pr60" mode="selector" :value="index" :range="array"  @change="bindPickerChange">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<view class="oper abs_right"><icon class="iconfont icon-right"></icon></view>
				</view>
			</view>
			<view class="item flex item-center">
				<view class="name">生日</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="mypicker pr60" mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ birthday }}</view>
					</picker>
					<view class="oper abs_right"><icon class="iconfont icon-right"></icon></view>
				</view>
			</view>
			<view class="item flex item-center" @tap="linkTo('mycenter')">
				<view class="name">爱好</view>
				<view class="text textEllipsis c999 flex-1">跑步</view>
				<view class="oper"><icon class="iconfont icon-right"></icon></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			headPic: '../../static/images/head1.png',
			birthday: '2019-12-12',
			array:['白虎','青龙','玄武','朱雀'],
			index:0,
			region: ['广东省', '广州市', '海珠区'],
			customItem: '全部'
		};
	},
	methods: {
		upLoadPic() {
			let img = this.$acFrame.Util.uploadPic();
			this.headPic = img;
		},
		bindDateChange(e) {
			this.birthday = e.target.value;
		},
		bindPickerChange(e){
			this.index = e.detail.value
		},
		bindAreaChange(e){
			this.region= e.detail.value
		},
		linkTo(name){
			uni.navigateTo({
				url:name
			})
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		startDate(){
			return this.getDate('start');
		},
		endDate(){
			return this.getDate('end');
		}
	},
};
</script>

<style lang="less">
page {
	min-height: 100%;
	background: #efefef;
}
.modal {
	background: #fff;
	margin-bottom: 20rpx;
	padding: 0 24rpx;
	.item {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #ccc;
		.icon {
			width: 40rpx;
			margin: 0 24rpx;
		}
		.pic {
			padding: 10rpx 0;
			text-align: right;
			image {
				width: 80rpx !important;
				height: 80rpx;
				border-radius: 100%;
			}
		}

		.text {
			width: 60%;
			text-align: right;
			position: relative;
			padding-left: 60rpx;
			.mypicker {
				height: 100rpx;
				line-height: 100rpx;
			}
		}
		.pr60 {
			padding-right: 60rpx;
		}
		.oper {
			&.abs_right {
				position: absolute;
				right: 0;
				top: 0;
			}
			.iconfont {
				width: 60rpx;
				text-align: center;
				height: 100rpx;
				color: #999;
			}
		}
		&:last-child {
			border: 0;
		}
	}
}
</style>
