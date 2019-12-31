<template>
	<view class="content">
		<view class="productPic">
			<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="400" @animationfinish="imgChange">
				<swiper-item v-for="(item, ind) in prodDetail.imgList" :key="ind">
					<view class="swiper-item">
						<image :src="setImg(item)" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="page">{{ imgInd }}/{{ prodDetail.imgList.length }}</view>
		</view>
		<view class="modal prod1">
			<view class="name clamp clamp-2 fs15">{{prodDetail.name}}</view>
			<view class="price red">
				<text class="fs12">¥</text>
				<text class="fs18">{{prodDetail.priceSale}}</text>
				<text class="yunfei" v-if="freight>0">运费：{{freight}}元</text>
				<text class="float-right c999 fs12" v-if="prodDetail.isSellOut">已售罄</text>
				<text class="float-right c999 fs12" v-else>销量{{prodDetail.numTotalSale}}件</text>
			</view>
			<button open-type="share" class="iconfont icon-share">分享</button>
		</view>
		<view class="modal prod2">
			<!-- <view class="flex item-center">
				<view class="flex-1">该商品入选了某某排行</view>
				<view class="c999">查看排行</view>
			</view> -->
			<view class="flex item-center">
				<view class="c999">精灵</view>
				<view class="pic" v-if="prodDetail.spiritDiscount.hasDiscount">
					<image src="/static/images/animal/jl1.png" mode="widthFix"></image>
				</view>
				<view class="flex-1 text-right red" v-if="prodDetail.spiritDiscount.hasDiscount">
					{{prodDetail.spiritDiscount.spiritList[0].name}}
					{{prodDetail.spiritDiscount.spiritList[0].priceDiscount}}折
				</view>
				<view class="flex-1 text-right c999" v-else>本商品不支持精灵折扣</view>
			</view>
		</view>
		<view class="modal prod3">
			<view class="coupon flex">
				<view class="name c999">领取</view>
				<view class="listBox flex-1" v-if="prodDetail.couponList.length>0">
					<scroll-view scroll-x="true">
						<block v-for="(item,ind) in prodDetail.couponList" :key="ind">
							<view @tap="chooseCoupon(ind,item.couponId)" class="item" :class="{'hasReceived':item.hasReceived}">
								{{item.name}}
							</view>
						</block>
					</scroll-view>
				</view>
				<view v-else class="text flex-1">
					暂无可领取的优惠券
				</view>
			</view>
			<view class="service flex">
				<view class="name c999">服务</view>
				<view class="listBox flex-1">
					<scroll-view scroll-x="true">
						<view class="item">假一赔三</view>
						<view class="item">无理由退款</view>
						<view class="item">消费者保障</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="modal assemble" v-if="prodDetail.flagSpell==1&&prodDetail.orderSpellList.length>0">
			<view class="title">
				{{prodDetail.orderSpellList.length}}人在拼单，可直接参与
				<text class="float-right red" @tap="moreassemble()">查看全部</text>
			</view>
			<view class="list">
				<view v-for="(item,ind) in prodDetail.orderSpellList" :key="ind" class="item flex item-center">
					<view class="pic">
						<image :src="setImg(item.firstUserImgPath)" mode="widthFix"></image>
					</view>
					<view class="name textEllipsis">{{item.firstUserName}}</view>
					<view class="time flex-1 text-center">
						<view>还差{{item.numUserLeft}}人成团</view>
						<view class="fs12 c999" v-if="item.showTimer">
							剩余
							<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="item.hour"
							 :minute="item.minute" :second="item.second" />
						</view>
					</view>
					<view class="spellBtn">
						<!-- <block v-if="item.firstUserIsOwner">
							<button type="blue" size="mini" open-type="share">邀请好友</button>
						</block>
						<block v-else> -->
							<button v-if="item.hasJoin" type="blue" @tap="spellDetail(item)" size="mini">查看</button>
							<button v-else type="orange" size="mini" @tap="joinGroup(item)">去拼单</button>
						<!-- </block> -->

					</view>
				</view>
			</view>
		</view>
		<view class="modal prod4 flex item-center">
			<view class="pic">
				<image :src="setImg(prodDetail.shopInfo && prodDetail.shopInfo.imgPath ?prodDetail.shopInfo.imgPath:'')" mode="widthFix"></image>
			</view>
			<view class="name flex-1">
				<view class="title blod">{{prodDetail.shopInfo.name}}</view>
				<view class="textEllipsis c999 fs13">{{prodDetail.shopInfo.describe}}</view>
			</view>
			<view class="btn">
				<button class="radiuBtn" type="red" size="mini" @tap="shopDetail(prodDetail.shopInfo.id)">进店逛逛</button>
			</view>
		</view>
		<view class="modal prod5">
			<view class="title">
				商品评价（{{commontList.length}}条）
				<text class="red float-right" @tap="showAllComment()">查看全部</text>
			</view>
			<view class="list" v-if="commontList.length>0">
				<view v-for="(item,ind) in commontList" :key="ind" class="item">
					<view class="item-top flex item-center">
						<view class="pic imgCirc">
							<image :src="setImg('',item.genderType)" mode="widthFix"></image>
						</view>
						<view class="name flex-1 textEllipsis">
							{{item.userInfo.nickName}}
						</view>
						<view class="star">
							<block v-for="(numitem,numind) in [1,2,3,4,5]" :key="numind">
								<image v-if="numitem<=item.gradeZh" src="/static/images/yellow_star.png" mode="widthFix"></image>
								<image v-else src="/static/images/gray_star.png" mode="widthFix"></image>
							</block>
						</view>
					</view>
					<view class="text clamp clamp-2">
						{{item.content?item.content:''}}
					</view>
					<!-- <view class="imgList clearfix">
						<view class="imgItem" v-for="(imgItem,imgInd) in item.imgPathList" :key="imgInd">
							<view class="imgBox" @tap="showBig(ind,imgInd)">
								<image :src="setImg(imgItem)" mode="widthFix"></image>
							</view>
						</view>
					</view> -->
					<view class="time fs12 c999">
						<text>{{item.skuPropValue }}</text>
						<text>{{item.commentTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="modal productDetail">
			<view class="title blod">
				商品详情
			</view>
			<view class="goodsAttr">
				<view class="flex">
					<view class="name c999">
						商品编号
					</view>
					<view class="value flex-1">
						{{prodDetail.code}}
					</view>
				</view>
				<view class="flex">
					<view class="name c999">
						品牌
					</view>
					<view class="value flex-1">
						{{prodDetail.brandName}}
					</view>
				</view>
			</view>
			<view class="goodsMsg">
				<rich-text :nodes="prodDetail.describe"></rich-text>
			</view>
		</view>
		<view class="prodFoot">
			<view class="flex item-center">
				<view class="item" @tap="shopDetail(prodDetail.shopInfo.id)">
					<icon class="iconfont icon-shop"></icon>
					<view class="fs12 c999">店铺</view>
				</view>
				<view class="item">
					<icon class="iconfont icon-kefu"></icon>
					<view class="fs12 c999">客服</view>
				</view>
				<view class="item">
					<icon class="iconfont iconshare2"></icon>
					<view class="fs12 c999">分享</view>
					<button open-type="share"></button>
				</view>
				<view class="flex-1 flex">
					<block v-if="prodDetail.flagSpell==1">
						<view class="btn btn2 flex-1 flex f-col just-con-c" @tap="setSpecInfo('order')">
							<view class="price">
								¥ {{chooseSpec.priceSale}}
							</view>
							<view class="text">
								单独购买
							</view>
						</view>
						<view class="btn btn1 flex-1 flex f-col just-con-c" @tap="setSpecInfo('spell')">
							<view class="price">
								¥ {{chooseSpec.priceSpell}}
							</view>
							<view class="text">
								发起拼单
							</view>
						</view>
					</block>
					<block v-else>
						<view class="btn btn1 flex-1 flex f-col just-con-c">
							<view class="buy" @tap="setSpecInfo('order')">
								立即购买
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="comDialog assembleModal flex item-center just-con-c" v-if="showAssembleModal">
			<view class="moadl-main">
				<view class="title">
					正在拼单
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="assemble listBox">
					<view v-for="(item,ind) in prodDetail.orderSpellList" :key="ind" class="item flex item-center">
						<view class="pic">
							<image :src="setImg(item.firstUserImgPath)" mode="widthFix"></image>
						</view>
						<view class="name textEllipsis">{{item.firstUserName}}</view>
						<view class="time flex-1 text-center">
							<view>还差{{item.numUserLeft}}人成团</view>
							<view class="fs12 c999" v-if="item.showTimer">
								剩余
								<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="item.hour"
								 :minute="item.minute" :second="item.second" />
							</view>
						</view>
						<view class="spellBtn">
							<!-- 	<block v-if="item.firstUserIsOwner">
								<button type="blue" size="mini" open-type="share">邀请好友</button>
							</block>
							<block v-else> -->
							<button v-if="item.hasJoin" type="blue" size="mini" open-type="share">邀请好友</button>
							<!-- <button  type="green" @tap="spellDetail(item)" size="mini">查看</button> -->
							<button v-else type="orange" size="mini" @tap="joinGroup(item)">去拼单</button>
							<!-- </block> -->

						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="comDialog flex item-center just-con-c assembleDetail" v-if="showAssembleDetailModal">
			<view class="moadl-main">
				<view class="title">
					参与拼单
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="detailMain">
					<view class="msg">
						仅剩<text class="red">{{spellVO.numUserLeft}}个</text>名额，还剩
						<view class="fs12 c999" v-if="spellVO.showTimer">
							<uni-count-down :show-day="false" :color="color" :splitorColor="color" :show-style="false" :hour="spellVO.hour"
							 :minute="spellVO.minute" :second="spellVO.second" />
						</view>
					</view>
					<view class="picList">
						<!-- <view class="item">
							<view class="name">拼主</view>
							<view class="pic">
								<image :src="spellVO.firstUserImgPath" mode="widthFix"></image>
							</view>
						</view> -->
						<view class="item" v-for="(item,ind) in spellVO.userList" :key="ind">
							<view class="name">{{ind==0?'拼主':item.userName}}</view>
							<view class="pic">
								<image :src="setImg(item.imgHeadPath)" mode="widthFix"></image>
							</view>
						</view>
						<view class="item null" v-if="spellVO.numUserLeft>0">
							<view class="name"></view>
							<view class="pic fs18 c666">
								?
							</view>
						</view>
					</view>
					<view class="btnBox">
						<button v-if="spellVO.hasJoin" type="red" open-type="share">邀请好友</button>
						<button v-else type="red" @tap="joinSpell(spellVO.orderSpellId)">参与拼单</button>
					</view>
				</view>
			</view>
		</view>
		<view class="comDialog specsModal" v-if="showSpecModal">
			<div class="specsBody">
				<view class="md_head flex item-center">
					<view class="pic">
						<image :src="setImg(prodDetail.imgList && prodDetail.imgList.length >0 ?prodDetail.imgList[0]:'')"></image>
					</view>
					<view class="price flex-1">
						<view class="red">
							<text class="fs12">¥</text>
							<text class="fs18">{{chooseSpec.priceSale}}</text>
						</view>
						<view class="text">
							请选择规格
						</view>
					</view>
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="spec_main">
					<view class="item">
						<!-- <view class="title">
							{{item.propValue}}
						</view> -->
						<view class="specBox">
							<block v-for="(item,ind) in prodDetail.skuList" :key="ind">
								<view @tap="chooseSku(ind)" class="item_child textEllipsis" :class="{'active':item.choose}">{{item.propValue}}</view>
							</block>
						</view>
					</view>
				</view>
				<view class="nums flex item-center">
					<view class="flex-1">购买数量</view>
					<view class="comNumber clearfix">
						<view class="iconfont icon-minus" hover-class="touch" style="color:#333333" @tap="minus()"></view>
						<input type="number" v-model="goodsNum" value="1" />
						<view class="iconfont icon-plus" hover-class="touch" style="color:#333333" @tap="plus()"></view>
					</view>
				</view>
				<view class="btnBox">
					<button type="red" class="noradius" @tap="confirmOrder">确定</button>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import uniCountDown from '@/components/countDown.vue';
	export default {
		components: {
			uniCountDown
		},
		data() {
			return {
				id: 0,
				prodDetail: {},
				imgList: [
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574140134898&di=9b8d75803e617d449499df2f5a8d300f&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fpop%2Fjfs%2Ft24241%2F145%2F1818221682%2F18886%2F71aac218%2F5b696accN052717a7.jpg',
					'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg',
					'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786988750,209248222&fm=15&gp=0.jpg'
				],
				imgInd: 1,
				goodsNum: 1, //数量
				prodModal: '请选择',
				couponList: [], //已选择的优惠券
				chooseSpec: {}, //已选择的规格型号
				color: '#999',
				showAssembleModal: false,
				showAssembleDetailModal: false,
				showSpecModal: false,
				timeStyle: {
					color: "#fff",
					borderColor: "#b40000",
					backgroundColor: "#b40000"
				},
				freight: 0,
				sum_price: 100,
				cur_price: 0,
				operType: '',
				spellId: '',
				spellVO: {},
				richNode: '',
				commontList: [],
				detailVO: {}
			};
		},
		onLoad(options) {
			this.id = options.id;
		},
		onShow() {
			if (getApp().globalData.isShowPic) {
				getApp().globalData.isShowPic = false
			} else {
				this.initData();
			}

		},
		onShareAppMessage(res) {
			let settings = {}

			// settings.type='article'
			settings.title = `发现好物【${this.prodDetail.name}】`
			settings.imageUrl = this.setImg(this.prodDetail.imgList[0])
			settings.pagePath =
				`/pages/myshop/productDetail?id=${this.id}&userCode=${uni.getStorageSync('userCode')}`

			getApp().globalData.isShowPic = true
			return settings

			//this.$acFrame.Util.shareUrl(res,settings);
		},
		methods: {
			initData() {
				let self = this
				let params = {
					id: this.id
				}
				self.$acFrame.HttpService.productDetail(params).then(res => {
					if (res.success) {
						let mydata = res.data
						let orderSpellList = mydata.orderSpellList
						if (orderSpellList && orderSpellList.length > 0) {
							orderSpellList.filter((v, i) => {
								v.hour = self.$acFrame.Util.countTime(v.endTime, 'hour')
								v.minute = self.$acFrame.Util.countTime(v.endTime, 'minute')
								v.second = self.$acFrame.Util.countTime(v.endTime, 'second')
								v.showTimer = false
							})
						}
						if (mydata.skuList && mydata.skuList.length > 0) {
							var speci_list = mydata.skuList;
							speci_list.filter((v, i) => {
								v.choose = false
								if (i == 0) {
									v.choose = true
								}
							})
							mydata.orderSpellList = orderSpellList
							mydata.skuList = speci_list
							self.chooseSpec = speci_list[0];
							self.get_freight(speci_list[0]["goodsSkuId"]);
							self.sum_price = speci_list[0]["priceSale"] ? speci_list[0]["priceSale"] : mydata.priceSale;
						} else {
							self.sum_price = mydata.priceSale;
						}
						self.cur_price = self.sum_price;
						self.prodDetail = mydata
						setTimeout(() => {
							self.prodDetail.orderSpellList.filter(v => {
								v.showTimer = true
							})
						}, 500)
						self.getCommentList()
					}
				})
			},
			getCommentList() {
				let self = this
				let params = {
					pageIndex: 1,
					pageSize: 2,
					id: this.prodDetail.goodsId
				}
				this.$acFrame.HttpService.prodComments(params).then(res => {
					if (res.success) {
						let list = res.data.rows
						list.filter(v => {
							v.commentTime = self.$acFrame.Util.formatTime(v.commentTime, 'day')
						})
						self.commontList = list
					}
				})
			},
			showBig(pind, cind) {
				let info = this.commontList[pind];
				let imgList = info.imgPathList;
				imgList.filter((v, i) => {
					imgList[i] = this.$acFrame.Util.setImgUrl(v)
				})
				console.log(imgList)
				this.$acFrame.Util.showBigPic(imgList[cind], imgList);
				getApp().globalData.isShowPic = true
			},
			showAllComment() {
				uni.navigateTo({
					url: 'commentList?goodsId=' + this.prodDetail.goodsId
				})
			},
			get_freight(speci_id, num = 1) {
				var self = this;
				self.$acFrame.HttpService.post("app/user_address/load_dft", {}).then(res => {
					if (res.success) {
						console.log(self.res);
						var address = res.data;
						self.$acFrame.HttpService.post("logistics/calculate/buy", {
							addressId: address.id,
							buyNum: num,
							goodsSkuId: speci_id
						}).then(res => {
							if (res.success) {
								self.freight = res.data;
							}
						})
					} else {
						self.freight = 0;
					}
				})
			},
			imgChange(event) {
				console.log(event);
				this.imgInd = event.detail.current + 1;
			},
			moreassemble() {
				this.showAssembleModal = true
			},
			spellDetail(item) {
				this.showAssembleDetailModal = true
				this.spellVO = item
			},
			joinGroup(item) {
				// this.showSpecModal = true
				this.showAssembleDetailModal = true
				this.spellId = item.orderSpellId
				this.operType = 'joinSpell'
				this.spellVO = item
			},
			joinSpell(id) {
				this.showAssembleDetailModal = false
				this.showSpecModal = true
				this.spellId = id
			},
			closeModal() {
				this.showAssembleModal = false
				this.showAssembleDetailModal = false
				this.showSpecModal = false
			},
			setSpecInfo(type) {
				this.showSpecModal = true
				this.operType = type
			},
			confirmOrder() {
				this.showSpecModal = false;
				let self = this
				let detail = this.prodDetail

				delete detail.couponList
				delete detail.skuList
				delete detail.orderSpellList
				let obj = {
					couponList: this.couponList,
					chooseSpec: this.chooseSpec,
					prod: detail,
					goodsNum: this.goodsNum,
					spellId: this.spellId,
					freight: this.freight,
					name: detail.name,
					priceSale: detail.priceSale,
					sum_price: this.sum_price,
					img: detail.imgList[0],
					goodsId: detail.goodsId,
					goodsSkuId: this.chooseSpec.goodsSkuId ? this.chooseSpec.goodsSkuId : ''
				}
				obj = encodeURIComponent(JSON.stringify(obj))
				if (this.chooseSpec.goodsSkuId) {
					uni.navigateTo({
						url: 'confirmOrder?details=' + obj + '&type=' + self.operType
					})
				}

			},
			shopDetail(id) {
				uni.navigateTo({
					url: "shopDetail?id=" + id
				})
			},
			// 选择拼单对象
			chooseCoupon(ind, id) {
				let self = this
				let _obj = self.prodDetail.couponList[ind]
				if (_obj.hasReceived) {
					this.$acFrame.Util.mytotal('亲，该优惠券已经领取过了！')
					return false;
				}
				this.$acFrame.HttpService.getCoupons({
					id: id
				}).then(res => {
					if (res.success) {
						this.$acFrame.Util.mytotal('领取成功！')
						self.prodDetail.couponList[ind].hasReceived = true
						let list_c = [] // 未使用的
						let list_u = [] // 已使用的
						self.prodDetail.couponList.filter(v => {
							if (v.hasReceived) {
								list_u.push(v)
							} else {
								list_c.push(v)
							}
						})
						self.prodDetail.couponList = [...list_c, ...list_u];
					}
				})
			},
			// 选择属性
			chooseSku(ind) {
				this.prodDetail.skuList.filter((v, i) => {
					if (i == ind) {
						v.choose = true
						this.chooseSpec = v
					} else {
						v.choose = false
					}
				})
			},
			setImg(src, genderType) {
				return this.$acFrame.Util.setImgUrl(src, genderType);
			},
			plus() {
				this.goodsNum += 1;
				this.sum_price = this.cur_price * this.goodsNum;
			},
			minus() {
				if (this.goodsNum > 1) {
					this.goodsNum -= 1;
					this.sum_price = this.cur_price * this.goodsNum;
				}
			}
		}
	};
</script>

<style lang="less">
	page {
		min-height: 100%;
		background: #efefef;
		padding-bottom: 100rpx;
	}

	.content {
		border: 0;
	}

	.productPic {
		swiper {
			height: 100vw;
		}

		position: relative;

		.page {
			position: absolute;
			padding: 10rpx 0;
			width: 100rpx;
			text-align: center;
			font-size: 24rpx;
			color: #fff;
			background: rgba(51, 51, 51, 0.3);
			right: 30rpx;
			bottom: 30rpx;
			border-radius: 22px;
		}
	}

	.modal {
		background: #fff;
		padding: 24rpx;
		position: relative;
		margin-bottom: 20rpx;
	}

	.prod1 {
		.name {
			margin-right: 180rpx;
		}

		.price {
			margin-top: 10rpx;
			line-height: 60rpx;
		}

		.yunfei {
			display: inline-block;
			position: relative;
			min-width: 140rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 40rpx;
			text-align: center;
			font-size: 24rpx;
			color: #fff;
			background: #fd7e77;
			margin-left: 20rpx;
			top: -4rpx;
		}

		.iconfont {
			position: absolute !important;
			top: 24rpx;
			width: 140rpx;
			right: 0;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			color: #999;
			background: #efefef;
			border-top-left-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			overflow: hidden;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			padding: 0;

			&::before {
				margin-right: 10rpx;
				position: relative;
				top: 2rpx;
			}

			&::after {
				border: 0;
				border-radius: none;
			}
		}
	}

	.prod2 {
		padding: 10rpx 24rpx;
		line-height: 60rpx;

		.pic {
			width: 100rpx;
			margin-left: 20rpx;
		}
	}

	.prod3 {
		padding: 20rpx 0 20rpx;
		line-height: 60rpx;

		.name {
			padding: 0 24rpx;
		}

		.listBox {
			overflow: hidden;
			width: 80%;

			scroll-view {
				width: 100%;
				white-space: nowrap;
			}

			.item {
				display: inline-block;
				text-align: center;
				min-width: 180rpx;
				border-radius: 50rpx;
				font-size: 20rpx;
				padding: 0 20rpx;
				line-height: 50rpx;
				margin-right: 20rpx;

			}
		}

		.coupon {
			margin-bottom: 10rpx;

			.text {
				padding-right: 30rpx;
				color: #999999;
			}

			.item {
				border: 1px solid #b40000;
				color: #b40000;
			}

			.hasReceived {
				border-color: #999;
				color: #999;
			}
		}

		.service {
			.item {
				background: #efefef;
				color: #666;
			}
		}

	}

	.assemble {
		padding: 0;

		.title {
			line-height: 80rpx;
			border-bottom: 1px solid #ccc;
			padding: 0 24rpx;
		}

		.item {
			padding: 20rpx 0;
			margin: 0 24rpx;
			border-bottom: 1px solid #ccc;

			&:last-child {
				border: 0;
			}

			.pic {
				width: 60rpx;
				height: 60rpx;
				margin-right: 24rpx;
				border-radius: 60rpx;
				overflow: hidden;
			}

			>.name {
				width: 30%;
				font-weight: 600;
				font-size: 30rpx;
			}

			.time {
				.name {
					max-width: 200rpx;
					margin-right: 20rpx;
					font-weight: 600;
				}
			}

			button {
				padding: 0 20rpx;
			}
		}
	}

	.prod4 {
		.pic {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			overflow: hidden;
			margin-right: 20rpx;
		}

		.name {
			width: 50%;
			margin-right: 20rpx;
		}
	}

	.prod5 {
		padding: 0;

		.title {
			padding: 20rpx 24rpx;
			
		}
		.list{
			border-top: 1px solid #ccc;
			.item {
				margin: 0 24rpx;
				padding: 20rpx;
				border-bottom: 1px solid #ccc;
				&:last-child{
					border:0;
				}
				.item-top {
					.pic {
						width: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
					}
			
					.name {
						width: 30%;
					}
			
					.star {
						image {
							width: 40rpx;
							display: inline-block;
							margin-left: 10rpx;
						}
					}
				}
			
				.imgList {
					margin-top: 20rpx;
					padding: 0 10rpx;
			
					.imgItem {
						width: 25%;
						height: calc((100vw - 20rpx) / 4 - 20rpx);
						float: left;
						padding: 0 10rpx;
						margin-bottom: 20rpx;
			
						.imgBox {
							overflow: hidden;
							height: 100%;
						}
					}
				}
			
				.text {
					margin: 20rpx 0;
				}
			
				.time {
					text {
						display: inline-block;
						margin-right: 20rpx;
					}
				}
			}
		}
	}

	.productDetail {
		padding: 0;

		.title {
			padding: 20rpx 24rpx;
		}

		.goodsAttr {
			padding: 10rpx 24rpx;

			>.flex {
				line-height: 50rpx;
			}

			.name {
				width: 120rpx;
			}

			.value {
				width: 60%;
			}
		}

		.goodsMsg {
			overflow: hidden;
			padding: 24rpx;

			.text {
				text-align: justify;
				padding: 10rpx 24rpx;
			}

			.img {
				padding: 10rpx 0;
				text-align: center;

				img {
					width: 100%;
				}
			}
		}
	}

	.prodFoot {
		position: fixed;
		z-index: 5;
		width: 100%;
		left: 0;
		bottom: 0;

		background: #fff;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);

		>view {
			padding-bottom: constant(safe-area-inset-bottom);
		}

		.iconfont {
			font-size: 40rpx;
		}

		.item {
			width: 100rpx;
			text-align: center;
			font-size: 24rpx;
			color: #999;
			position: relative;

			button {
				border: 0;
				position: absolute;
				background: none;
				height: 100rpx;
				padding: 0;
				width: 100rpx;
				top: 0;
				left: 0;

				&::after {
					border: none !important;
					box-shadow: none !important;
				}
			}
		}

		.btn {
			color: #fff;
			height: 100rpx;
			text-align: center;

			.price {
				font-size: 32rpx;
			}

			.text {
				font-size: 26rpx;
			}
		}

		.buy {
			line-height: 100rpx;
		}

		.btn1 {
			background: #b40000;
		}

		.btn2 {
			background: #FD7E77;
		}
	}

	.comDialog {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		background: rgba(0, 0, 0, 0.6);

		.moadl-main {
			width: 80%;
			background: #fff;
			border-radius: 0.6em;

			.title {
				line-height: 100rpx;
				text-align: center;
				position: relative;
				border-bottom: 1px solid #ccc;

				.iconfont {
					position: absolute;
					width: 100rpx;
					right: 0;
					top: 0;
					color: #999;
				}
			}

			.listBox {
				max-height: 600rpx;
				overflow: hidden;
				overflow-y: auto;
			}
		}
	}

	.assembleDetail {
		.moadl-main{
			width: 90% !important;
		}
		.detailMain {
			padding: 14rpx 24rpx 24rpx;

			.msg {
				padding: 20rpx;
				text-align: center;
			}
		}

		.picList {
			text-align: center;
			padding: 20rpx 0;

			.item {
				display: inline-block;
				margin: 10rpx;

				.name {
					line-height: 40rpx;
					padding: 0 4rpx;
					border-radius: 40rpx;
					color: #fff;
					background: #b40000;
					font-size: 24rpx;
				}

				.pic {
					width: 100rpx;
					height: 100rpx;
					border: 2px solid #b40000;
					border-radius: 100rpx;
					overflow: hidden;
				}

				&.null {
					.name {
						background: none;
					}

					.pic {
						border: 1px dashed #ccc;
						line-height: 96rpx;
						text-align: center;
					}
				}
			}
		}

		.btnBox {
			margin-top: 20rpx;
		}
	}

	.specsModal {
		.specsBody {
			background: #fff;
			position: absolute;
			bottom: 0;
			width: 100%;

			.md_head {
				margin: 0 30rpx;
				border-bottom: 1px solid #ccc;
				padding: 20rpx 0;
				position: relative;

				.pic {
					height: 100rpx;
					width: 160rpx;
					margin-right: 20rpx;
					position: relative;

					image {
						position: absolute;
						height: 160rpx;
						bottom: 0;
					}
				}

				.iconfont {
					position: absolute;
					width: 80rpx;
					line-height: 80rpx;
					text-align: center;
					top: 0;
					right: -24rpx;
				}
			}
		}

		.spec_main {
			.title {
				padding: 20rpx 24rpx;
			}

			.specBox {
				max-height: 160rpx;
				padding: 20rpx 14rpx;
				overflow: hidden;
				overflow-y: auto;

				.item_child {
					float: left;
					width: calc((100% / 2) - 20rpx);
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					margin: 0 10rpx 20rpx;
					background: #EFEFEF;
					border-radius: 0.2em;
					padding: 0 20rpx;

					&.active {
						color: #fff;
						background: #B40000;
					}
				}
			}
		}

		.nums {
			padding: 24rpx;
		}

		.btnBox {
			margin-top: 20rpx;

			button {
				line-height: 80rpx;
			}
		}
	}
	.spellBtn {
		button{
			padding:0 !important;
			width: 130rpx;
		}
	}
</style>
