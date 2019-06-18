<template>
    <div class="rank">
        <div class="toplist">
            <ul>
                <li class="item" v-for="(item) in rankList" :key="item.id" @click="goRankDetail(item)">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.coverImgUrl">
                    </div> 
                    <ul class="songlist">
                        <li class="song" v-for="(item) in item.top" :key="item.dt">
                            <span>{{ item.name }}</span> 
                            <span>{{ item.ar[0].name }}</span>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import getRankList from 'Api/rank.js'
import BScroll from 'better-scroll'
import { mapActions,mapGetters } from 'vuex'
const YUNMUSIC_TOP = [0, 1, 2, 3, 4, 22, 23]
export default {
    data(){
        return{
           rankList:[] 
        }
    },
    created(){
        this._getRankList()
    },
    methods:{
        ...mapActions(['getRankId']),
        _getRankList(){
            for ( let i = 0;i < YUNMUSIC_TOP.length;i ++){
                getRankList(YUNMUSIC_TOP[i]).then(res=>{
                    let list = res.data.playlist
                    list.top = res.data.playlist.tracks.slice(0, 3)
                    this.rankList.push(list)
                })
            }
        },
        goRankDetail (item) {
            this.$router.push({
                path: `/rank/${item.id}`
            })
            this.getRankId(item.id)
        }
    },
    mounted(){
        this.$nextTick(()=>{//DOM跟新结束后再触发,区别于this.nextTick
           new BScroll('.toplist',{//实例化betterscroll
                scrollY: true,
                click: true
            })
        });  
    }

}
</script>

<style lang="scss" scoped>
.rank{
    position: fixed;
    width: 100%;
    top: 0.88rem;
    bottom: 0;
    .toplist{
        height: 100%;
        overflow: hidden;
        padding-top: 0.05rem;
        .item{
            display: flex;
            margin: 0 0.1rem;
            padding: 0.03rem 0;
            height: 1rem;
            border-bottom: 1px solid #e4e4e4;
            .icon{
                flex: 0 0 1rem;
                width: 1rem;
                height: 1rem;
                img{
                    border-radius: 0.1rem;
                }
            }
            .songlist{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 0.2rem;
                height: 1rem;
                overflow: hidden;
                color: #2e3030;
                font-size: 0.12rem;
                .song{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 0.3rem;
                }
            }
        }
    }
}
</style>

