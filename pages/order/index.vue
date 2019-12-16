<template>
    <view class="content pagebg">
        <view class="tabBox flex item-center">
           <view v-for="(item,ind) in tabList" :key="ind" class="item" :class="{'active':item.type==orderType}" @tap="tabClick(item.type)">
               {{item.name}}
           </view>
        </view>
        <OrderItem :dataList="dataList" :nodata="nodata" :type="orderType"></OrderItem>
    </view>
</template>

<script>
import OrderItem from '@/components/order-item.vue'

    export default {
        components:{
            OrderItem,
		},
        data(){
            return {
                tabList:[
                    {name:'全部',type:''},
                    {name:'待付款',type:1},
                    {name:'待拼单',type:-1},
                    {name:'待发货',type:2},
                    {name:'待收货',type:3},
                    {name:'待评价',type:4},
                ],
                dataList:[
                   // {imgPath:'',shopName:'',}
                ],
                orderType:"",
                nodata:false,
                pageSize:10,
                pageTotal:1,
                pageIndex:1,
				is_over:false,
				orderStatus:{}
            }
        },
        onLoad(options){
			var self = this;
			this.$acFrame.HttpService.get("dict/order/orderStatusList").then(res => {
					console.log(res);
			    if(res.success){
					console.log(res.data);
					var tabs = res.data;
					var st = {};
					tabs.forEach(function(item){
						st[item.val]=item.key;
						self.orderStatus[item.key]=item.val;
					});
					self.tabList.forEach(function(item1){
						if(st[item1.name]){
							item1.type = st[item1.name];
						}
					});
					console.log(self.tabList);
					
					this.getList();
					
				}
			})
			
			
		},
        onShow(){},
        methods:{
			tabClick(n){
				let self = this
				this.orderType= n;
				self.pageIndex=1;
				self.dataList=[];
				self.is_over = false;
				this.getList();
			},
            getList(){
				if(this.is_over){
					return ;
				}
                let self = this
                let params = {
                    status:self.orderType,
                    pageSize:self.pageSize,
                    pageIndex:self.pageIndex,
                }
                self.$acFrame.HttpService.orderList(params).then(res => {
					console.log(res);
                if(res.success){
					let list = res.data.rows
					self.pageTotal = res.data.pageTotal
					if(list.length>0){
						list.forEach(function(item){
							item["status"] = self.orderStatus[item["status"]];
						});
						self.nodata=false
						if(self.pageIndex==1){
							self.dataList = list;
						}else{
							self.dataList = self.dataList.concat(list)
						}
					
					}else{
						self.is_over = true;
						if(self.pageIndex==1){
							self.nodata=true
						}
					}
				}else{

				}
			})
        },
		getPGList(){
		        let self = this
		        let params = {
		            filterWait:1,
		            pageSize:self.pageSize,
		            pageIndex:self.pageIndex,
		        }
		        self.$acFrame.HttpService.orderList(params).then(res => {
					console.log(res);
		        if(res.success){
					let list = res.data.rows
					self.pageTotal = res.data.pageTotal
					if(list.length>0){
						self.nodata=false
						self.dataList.push(list)
					}else{
						if(self.pageIndex==1){
							self.nodata=true
						}
					}
				}else{
		
				}
			})
		},
    },
	onReachBottom: function () {
	    var index = this.orderType;
		
	    if (index == -1) {
		  this.pageIndex += 1;
	      getPGList();
	    } else {
		  this.pageIndex += 1;
	      this.getList();
	    }
	  }
	}
</script>

<style lang="less" scoped>
.content{
    padding-top:80rpx;
}
.tabBox{
    position:fixed;
    width: 100%;
    height:80rpx;
	top:0;
    padding:0 10rpx;
    .item{
        padding:0 10rpx;
        line-height: 40rpx;
        color:#999;
		margin:0 10rpx;
        border-bottom: 2px solid transparent;
        &.active{
            color:#b40000;
            border-color:#b40000;
        }
    }
}
</style>