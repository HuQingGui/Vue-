<template>
    <div class="tab" :style="{zIndex:this.$route.path === '/recommend' ? '100' : '0'}">
        <div class="tab-item">
           <router-link to="/recommend" tag="span" active-class="active">推荐</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/rank" tag="span" active-class="active">排行</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/singer" tag="span" active-class="active">歌手</router-link>
        </div>
        <!-- <div class="tab-item">
            <router-link to="/mine" tag="span" active-class="active">我的</router-link>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.tab{
    width: 100%;
    height: 0.44rem;
    display: flex;
    justify-content: space-between;
    background: #d44439;
    position: relative;
    z-index: 100;
    line-height: 0.44rem;
    .tab-item{
        text-align: center;
        flex: 1;
        line-height: 0.44rem;
        background: #d44439;
        height: 0.44rem;
        span{
            font-size: 0.14rem;
            color: #e4e4e4;
            font-weight: 700;
            padding-bottom: 0.02rem;
            position: relative;
            top: -0.3rem;
        }
        .active{
            border-bottom: 0.02rem solid #f1f1f1;
            color: #fff;
        }
    }
}
</style>

