<template>

    <div class="recommend">
        <div class="recommend-content" v-show="this.$route.path == '/recommend'">
            <Banner></Banner>
            <PersonalList></PersonalList>
            <NewSong></NewSong>
        </div> 
        <router-view></router-view>
    </div>
   
</template>

<script>
import Banner from './recodetail/Banner'
import PersonalList from './recodetail/PersonalList'
import NewSong from './recodetail/NewSong'
import BScroll from 'better-scroll'
export default {
    components : {
        Banner,PersonalList,NewSong
    },
    mounted () {
        this.$nextTick(()=>{
            setTimeout( ()=>{
                new BScroll('.recommend',{
                    scrollY: true,
                    click: true
                }) 
            },0)  
        })
        
        
    }
}
</script>

<style lang="scss" scoped>
.recommend {
    position: fixed;
    width: 100%;
    top: 0.88rem;
    bottom: 0;
    z-index: 0;
    .recommend-content{
        width: 100%;
        flex: 1;
    }
}
</style>




