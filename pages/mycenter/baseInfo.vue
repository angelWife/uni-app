<template>
	<view class="content">
		<view class="modal">
			<view class="item flex item-center" @tap="upLoadPic">
				<view class="name">头像</view>
				<view class="flex-1"></view>
				<view class="pic">
					<image :src="headPic"></image>
				</view>
				<view class="oper">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
			<view class="item flex item-center" @tap="show_info('nickName')">
				<view class="name">用户名</view>
				<view class="text c999 flex-1">{{userInfo.nickName}}</view>
				<view class="oper">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
			<view class="item flex item-center" @tap="show_info('introduce')">
				<view class="name">介绍</view>
				<view class="text textEllipsis c999 flex-1">{{userInfo.introduce}}</view>
				<view class="oper">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
		</view>
		<view class="modal">
			<view class="item flex item-center">
				<view class="name">我的二维码</view>
				<view class="text flex-1">查看</view>
				<view class="oper">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
			<view class="item flex item-center" @tap="linkTo('bindPhone')">
				<view class="name">手机号码</view>
				<view class="text c999 flex-1" v-if="userInfo.mobilePhone">{{userInfo.mobilePhone}}</view>
				<view class="text c999 flex-1" v-else @tap="bindMobile">未绑定</view>
				<view class="oper">
					<icon v-if="!userInfo.mobilePhone" class="iconfont icon-right"></icon>
				</view>
			</view>
			<view class="item flex item-center">
				<view class="name">地区</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="mypicker pr60" @change="bindAreaChange" mode="region" :value="region">
						<view class="uni-input">{{region[0]}}{{region[1]}}{{region[2]}}</view>
					</picker>
					<view class="oper abs_right">
						<icon class="iconfont icon-right"></icon>
					</view>
				</view>
			</view>
			<view class="item flex item-center" @tap="linkTo('addressList')">
				<view class="name">收货地址</view>
				<view class="text textEllipsis c999 flex-1">
				{{addrVO.areaProvince?addrVO.areaProvince:''}}
				{{addrVO.areaCity?addrVO.areaCity:''}}
				{{addrVO.areaCounty?addrVO.areaCounty:''}}
				{{addrVO.address?addrVO.address:''}}
				</view>
				<view class="oper">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view>
			<view class="item flex item-center">
				<view class="name">性别</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="pr60" @change="bindSexChange" :value="sex_index" :range="sexs">
						<view class="picker">
							{{sexs[sex_index]}}
						</view>
						<view class="oper abs_right">
							<icon class="iconfont icon-right"></icon>
						</view>
					</picker>
				</view>
			</view>
			<view class="item flex item-center">
				<view class="name">星座</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="mypicker pr60" mode="selector" :value="index" :range="array" @change="bindPickerChange">
						<view class="uni-input">{{array[index]}}</view>
						<view class="oper abs_right">
							<icon class="iconfont icon-right"></icon>
						</view>
					</picker>
					
				</view>
			</view>
			<view class="item flex item-center">
				<view class="name">生日</view>
				<view class="text textEllipsis c999 flex-1">
					<picker class="mypicker pr60" mode="date" :value="[userInfo.birthDate?userInfo.birthDate:'']" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ userInfo.birthDate?userInfo.birthDate:'请选择' }}</view>
						<view class="oper abs_right">
							<icon class="iconfont icon-right"></icon>
						</view>
					</picker>
					
				</view>
			</view>
			<!-- <view class="item flex item-center">
				<view class="name">爱好</view>
				<view class="text textEllipsis c999 flex-1">跑步</view>
				<view class="oper">
					<icon class="iconfont icon-right"></icon>
				</view>
			</view> -->
		</view>
		<view class="modalmask" v-if="show_box==1">
			<view class="comModal">
				<textarea v-model="text" cursor-spacing="30" fixed="true"></textarea>
				<view class="btnBox text-right">
					<button class="float-left" type="default" @tap="cancel">取消</button>
					<button type="red" @tap="sure">确定</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				headPic: '',
				birthday: '2019-12-12',
				array: ['请选择'],
				index: 0,
				region: ['', '', '请选择'],
				customItem: '全部',
				userInfo: {},
				show_box: 0,
				tip: '',
				text: "aaaa",
				name: "xxxxx",
				cur: '',
				nickName: "",
				mobilePhone: "",
				introduce: "",
				imgHeadPath: "",
				genderType: 0,
				birthDate: "",
				areaAddress: "",
				address: "",
				sex: "男",
				sexs: ["男", "女"],
				sex_index: 0,
				addrVO:{}
			};
		},
		onShow() {
			if(getApp().globalData.isShowPic){
				getApp().globalData.isShowPic=false
			}else{
				this.initData()
				this.getAddr()
				this.getConstellat()
			}
			
		},
		methods: {
			initData() { //settingsInfo
				let self = this
				this.$acFrame.HttpService.settingsInfo().then(res => {
					if (res.success) {
						console.log(res.data);
						let userInfo = res.data
						self.region[0] = userInfo.areaProvinceName?userInfo.areaProvinceName:''
						self.region[1] = userInfo.areaCityName?userInfo.areaCityName:''
						self.region[2] = userInfo.areaCountyName?userInfo.areaCountyName:'请选择'
						self.sex_index = userInfo.genderType ? userInfo.genderType - 1 : 0
						self.index = userInfo.constellatType?userInfo.constellatType:0
						 
						userInfo.birthDate = userInfo.birthDate?self.$acFrame.Util.formatTime(userInfo.birthDate,'day'):''
						
						self.headPic = self.$acFrame.Util.setImgUrl(userInfo.imgHeadPath,userInfo.genderType);
						
						self.userInfo = userInfo
					}
				})
			},
			getConstellat(){
				let self= this
				self.array = ['请选择']
				this.$acFrame.HttpService.getConstellat().then(res => {
					if (res.success) {
						console.log(res.data);
						res.data.filter(v=>{
							self.array.push(v.val)
						})
					}
				})
			},
			getAddr(){
				
				let self = this;
				this.$acFrame.HttpService.defaultAddr().then(res => {
					console.log(res.data);
					if (res.success) {
						self.addrVO=res.data
					}
				})
			},
			setAddr(addrVO){
				this.addrVO = addrVO
			},
			upLoadPic() {
				var self = this;
				getApp().globalData.isShowPic = true
				this.$acFrame.Util.uploadPic("app/user_info/upd_img_head",1).then(res => {
					self.headPic = res;
					// self.initData();
				})
				


			},
			updateInfo(params){
				let self = this;
				delete params.imgHeadPath
				this.$acFrame.HttpService.modifyInfo(params).then(res => {
					console.log(res.data);
					if (res.success) {
						self.$acFrame.Util.mytotal('更新成功')
						self.show_box = 0
					}
				})
			},
			bindDateChange(e) {
				let self = this;
				let birthday = e.target.value;
				self.userInfo.birthDate = birthday;
				this.updateInfo(self.userInfo);
			},
			bindPickerChange(e) {
				let val = e.detail.value
				this.index = val
				this.userInfo.constellatType = val * 1
				this.updateInfo(this.userInfo);
			},
			bindAreaChange(e) {
				this.region = e.detail.value;
				console.log(this.region);
				let self = this;
				var userInfo = self.userInfo;
				userInfo["areaProvinceName"] = this.region[0];
				userInfo["areaCityName"] = this.region[1];
				userInfo["areaCountyName"] = this.region[2];
				this.updateInfo(userInfo);
			},
			bindSexChange(e) {
				this.sex_index = e.detail.value;
				console.log(this.sex_index);
				let self = this;
				var userInfo = self.userInfo;
				userInfo["genderType"] = this.sex_index*1+1;
				this.updateInfo(userInfo);
			},
			linkTo(name) {
				if (name == 'bindPhone' && userInfo.mobilePhone) {
					return false
				}
				uni.navigateTo({
					url: name
				})
				// getApp().globalData.isShowPic=true
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
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			cancel() {
				this.show_box = 0;
			},
			show_info(info) {
				this.cur = info;
				this.show_box = 1;
				this.text = this[info];
			},
			sure() {
				var key = this.cur;
				let self = this
				var userInfo = self.userInfo;
				userInfo[key] = this.text;
				self.userInfo = userInfo;
				console.log(userInfo);
				this.$acFrame.HttpService.modifyInfo(userInfo).then(res => {
					console.log(res.data);
					if (res.success) {
						self[key] = self.text;
						self.show_box = 0;
					}
				})
			},
			bindMobile() {
				uni.navigateTo({
					url: "bindPhone",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
				width: 80rpx !important;
				height: 80rpx;
				border-radius: 80rpx;
				overflow: hidden;
                border:1px solid #f1f1f1;
				image {
					vertical-align: top;
					height:80rpx;
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
				width: 60rpx;

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

	.comModal {
		padding: 24rpx;

		textarea {
			height: 240rpx;
			width: 100%;
			background: #f9f9f9;
			border: 1px solid #ccc;
			border-radius: 0.3em;
			box-sizing: border-box;
			padding: 20rpx;
		}

		.btnBox {
			margin-top: 24rpx;

			button {
				display: inline-block;
			}
		}
	}
</style>
