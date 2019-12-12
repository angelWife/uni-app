<template>
    <view class="content pagebg">
        <view class="tabBox flex item-center">
           <view v-for="(item,ind) in tabList" :key="ind" class="item" :class="{'active':item.choose}" @tap="tabClick(ind)">
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
                    {name:'全部',choose:true,type:'all'},
                    {name:'待付款',choose:false,type:'pay'},
                    {name:'待拼单',choose:false,type:'spell'},
                    {name:'待发货',choose:false,type:'send'},
                    {name:'待收货',choose:false,type:'receiving'},
                    {name:'待评价',choose:false,type:'evaluate'},
                ],
                dataList:[
                    {imgPath:'',shopName:'',}
                ],
                orderType:'all',
                nodata:fasle
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
    padding:0 20rpx;
    .item{
        padding:0 10rpx;
        line-height: 40rpx;
        color:#999;
        border-bottom: 2px solid transparent;
        &.active{
            color:#b40000;
            border-color:#b40000;
        }
    }
}
</style>