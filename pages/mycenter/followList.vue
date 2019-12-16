<template>
    <view class="content pagebg">
        <view class="item flex item-center">
            <view class="pic"></view>
            <view class="main flex-1 flex item-center">
                <view class="msg flex-1">
                    <view class="title"></view>
<view class="text fa12 c999"></view>
                </view>
                <view class="btn">
                    <button type="red" size="mini">关注</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        onLoad(options){
            uni.setNavigationBarTitle({
                title: ''
            });
        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>
.item{
    .pic{
        height:80rpx;
        width: 80rpx;
        border-radius:80rpx;
        overflow: hidden;
        margin:0 24rpx;
    }
    .main{
        min-height:100rpx;
        padding: 20rpx 0;
        border-bottom:1px solid #ccc;
        .title{
            width: 60%;
        }
        .btn{
            button{
                width: 180rpx;
                padding:0;
                height:72rpx;
                line-height: 72px;
                text-align: center;
            }
        }
    }
}
</style>