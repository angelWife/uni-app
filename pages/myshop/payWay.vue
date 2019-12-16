<template>
	<view class="content">
		<view class="price text-center red">
			<text>¥</text>
			<text class="fs40">{{orderVO.pricePayTotal}}</text>
		</view>
		<view class="fs16 text-center" v-if="show_time==1" >
			支付剩余时间：
			<uni-count-down 
			:show-day="false" 
			:color="color" 
			:splitorColor="color" 
			:show-style="false" 
			:fontSize="fontSize" 
			:hour="hour" 
			:minute="minute" 
			:second="second"
			 />
		</view>
		<view class="pay">
			<view class="title">
				支付方式
			</view>
			<view v-for="(item,ind) in orderVO.payMethodList" :key="ind" class="item flex item-center">
				<view class="pic">
					<!-- <image src="" mode=""></image> -->
				</view>
				
				<view class="text flex-1">
					<view class="">
						{{item.type == 2?'微信支付':'星票支付'}}
					</view>
					<view class="c999" v-if="item.type == 1">
						(账户余额{{item.total}}星票，本订单可用{{item.amount}}）
					</view>
				</view>
				<view class="">
					<label v-if="item.type == 2" class="radio">
						<radio :checked="payway" color="#b40000" @change="choosePayway"/><text></text>
					</label>
					<switch v-if="item.type == 1" :checked="payOther" @change="switchChange(event,index)" color="#B40000"/>
				</view>
			</view>
		</view>
		<view class="payBtn">
			<view class="btn" @tap="payResult">
				立即支付
			</view>
		</view>
		<view class="modalmask passwordModal flex f-col just-con-c" v-if="showPassModal">
			<view class="modalMain">
				<view class="title fs16">
					安全验证
					<icon class="iconfont icon-remove" @tap="closeModal"></icon>
				</view>
				<view class="center text-center">
					<block v-if="showPayPass">
						<view class="red">
							<text class="fs13">¥</text>
							<text class="fs16">138.22</text>
						</view>
						<block>
						<view class="text">
							请输入支付密码
						</view>
						</block>
						<block>
						<view class="text">
							请设置支付密码
						</view>
						</block>
					</block>
					<block v-else>
						<view class="text">
							短信验证码已发送到
						</view>
						<view class="text">
							180****1214（59S）
						</view>
					</block>
				</view>
				<view class="pwdBox">
					<view class="textBox" @tap='getFocus'>
						<block v:for="(item,ind) in pwdVO.myArr" :key="ind">
							<input :value="pwdVO.Value[ind]" disabled :password='pwdVO.ispassword' @tap.stop='Tap'/>
						</block>
					</view>
					<input type="number" :password="pwdVO.ispassword" class='password-input' :maxlength="pwdVO.myArr.length" :focus="pwdVO.isFocus"   @input="password_input"/>
				</view>
			</view>
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
				color:'#b40000',
				checked:true,
				fontSize:'30rpx',
				showPayPass:false,
				showPassModal:false,
				payOther:false,
				orderVO:{},
				details:{},
				payVO:{},
				pwdVO:{
					focus: false,
					myArr: [0,1,2,3,4,5],        //输入框个数  
					isFocus: true,    //聚焦  
					Value: [],        //输入的内容  
					ispassword: false, //是否密文显示 true为密文， false为明文。
				},
				orderId:1,
				order:{},
				amount:100,
				hour:0,
				minute:0,
				second:0,
				show_time:0
			};
		},
		onLoad(options){
			this.orderVO = JSON.parse(options.order);
			var time = new Date(this.orderVO.endTime);
			console.log(time);
			this.hour = time.getHours();
			this.minute = time.getMinutes();
			this.second = time.getSeconds(); 
			this.show_time=1;
			console.log("hour---"+this.hour+"----"+this.minute+"----"+this.second);
		},
		onShow(){
	
		},
		methods:{
			createOrder(){
				let self = this
				let params=self.details
				self.$acFrame.HttpService.directBuy().then(res => {
					if(res.success){
						self.orderVO = res.data
					}
				})
			},
			switchChange(e,ind){
				let val = e.target.value
				let _data = this.orderVO.payMethodList[ind]
				this.payOther = val
				this.payVO.amount = _data.amount
				this.payVO.total  = _data.total
			},
			closeModal(){
				this.showPassModal = false
			},
			payResult(){
				let amount =this.payVO.amount
				//还需判断是否设置密码，如果没有设置支付密码，跳转设置支付密码
				if(amount>0&&amount<1000){
					this.showPassModal = true
					this.showPayPass = false
				} else if(amount>=1000){
					this.showPassModal = true
					this.showPayPass = true
				} else {
					this.showPassModal = false
					this.showPayPass = false
					//请求支付接口
					//支付结果:如果直接支付，直接跳转；如果拼单，增需请求拼单接口，带数据跳转
					uni.navigateTo({
						url:'payResult?res=&type=spell'
					})
				}
				
			},
			//参与拼单
            joinSpell(){
				let self = this
				let params={
					addressId:this.addrVO.id,
					goodsSkuId:this.details.chooseSpec.goodsSkuId,
					spellId:this.details.spellId
				}
				self.$acFrame.HttpService.joinSpell().then(res => {
					if(res.success){
						self.addrVO = res.data
					}
				})
			},
			//自主拼单
			createSpell(){
				let self = this
				let params={
					
				}
				self.$acFrame.HttpService.couponList().then(res => {
					if(res.success){
						self.addrVO = res.data
					}
				})
			},
			password_input: function (e) {
				let inputValue = e.detail.value;
				let self = this;
				let _arr=[]
				if(inputValue.length>0){
					for(let i=0;i<inputValue.length;i++){
						let val = inputValue.substr(i,1);
						_arr.push(val)
					}
				}
				self.pwdVO.Value = _arr
				if(_arr.length == this.pwdVO.Length){
					let params ={
						type:1,
                        passwd:inputValue
					}
					self.$acFrame.checkPaypwd.checkPaypwd(params).then(res => {
						if(res.success){
							//密码验证成功后  去支付
							//1.支付星票
							//2.支付钱
						}
					})
				}
			},
            payOtherWay(){
				let self = this
				let params ={
					bizId:0,
					passPay:false,
					type:1,
					passwd:inputValue
				}
				self.$acFrame.checkPaypwd.payByOther(params).then(res => {
					if(res.success){
						
					}

				})
					
			},
			Tap() {
				this.pwdVO.isFocus=true
			},

			getFocus: function () {
				this.pwdVO.focus=!this.pwdVO.focus
			},
		}
	}
</script>

<style lang="less">
.content{
	padding:24rpx;
	.fs40{font-size:80rpx;}
	.price{
		padding: 80rpx 0 40rpx;
	}
	.pay{
		margin-top:40rpx;
		.title{
			padding:20rpx 0;
		}
		.item{
			padding:20rpx 0;
			border-bottom:1px solid #cccc;
		}
	}
	.payBtn{
		position:fixed;
		width: 100%;
		padding:24rpx;
		bottom:0;
		left:0;
		z-index: 5;
		padding-bottom:constant(safe-area-inset-bottom);
		.btn{
			width: 100%;
			border-radius:80rpx;
			left:0;
			height:80rpx;
			line-height: 80rpx;
			text-align: center;
			color:#fff;
			background:linear-gradient(180deg,rgba(219,11,0,1) 0%,rgba(253,89,89,1) 100%);
		}
	}
}
.passwordModal{
	.modalMain{
		width: 80%;
		margin:0 auto;
		background: #fff;
		border-radius: 0.3em;
	}
	.title {
		line-height: 100rpx;
		padding-left:24rpx;
		position: relative;
		border-bottom: 1px solid #ccc;
		.iconfont {
			position: absolute;
			width: 100rpx;
			right: 0;
			top: 0;
			color: #999;
			text-align: center;
		}
	}
	.center{
		padding:40rpx 24rpx 20rpx;
	}
	.textBox{
		width: 432rpx;
		margin:30rpx auto 40rpx;
		height:72rpx;
		border:1px solid #ccc;
		border-radius:0.3em;
		overflow: hidden;
		input{
			height:70rpx;
			float:left;
			width: calc(100% / 6);
			line-height: 70rpx;
			border-right:1px solid #ccc;
			background: #fff;
			text-align: center;
			&:last-child{
				border:0;
			}
		}
	}
	.password-input{  
		width: 0;  
		height: 0;  
	} 
}
</style>
