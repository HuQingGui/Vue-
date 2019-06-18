<template>
    <header class="head" :style="{zIndex:this.$route.path === '/recommend' ? '100' : '0'}">
        <router-link to = "/mine" tag = "div" class="nav">
            <i class="iconfont icon-caidan"></i>
        </router-link>
        网易云音乐
        <router-link to = "/search" tag = "div" class="sou">
            <i class="iconfont icon-xiazai17"></i>
        </router-link>
    </header>
</template>

<script>
export default {
    
}
</script>


<style lang="scss" scoped>
.head {
    width: 100%;
    position: relative;
    line-height: 0.44rem;
    background: #d44439;
    text-align: center;
    color: #fff;
    letter-spacing: 0.03rem;/*可以更改文字间的间距*/
    font-size: 0.16rem;
    z-index: 100;
    .nav{
        width: 0.44rem;
        height: 0.44rem;
        position: absolute;
        left: 0;
        top: 0;
        .iconfont{
            color: #fff;
            font-size: 0.22rem;
        }
    }
    .sou{
        width: 0.44rem;
        height: 0.44rem;
        position: absolute;
        right: 0;
        top: 0;
        .iconfont{
            color: #fff;
            font-size: 0.22rem;
        }
    }
}
</style>

