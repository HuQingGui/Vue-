<template>
<transition name="mine">
    <div class="mine">
        <div class="scroll">
            <div class="head">
            <ul>
                <!-- <li>
                    <div class="font">
                        <i class="iconfont icon-yinyue"></i>
                    </div>
                    <div class="item">本地音乐(0)</div>
                </li> -->
                 <li>
                    <div class="font">
                        <i class="iconfont icon-zuijinbofang"></i>
                    </div>
                    <div class="item">最近播放({{ LatelyPlaysNum() }})</div>
                    
                </li>
                <div class="latelyList">
                    <div class="list-item" v-for="(item,index) in LatelyPlays" :key="item.id" @click="getPlayInfo(index,LatelyPlays)">
                        <div class="index">{{ index + 1}}</div>
                        <div class="right">
                            <div class="name">{{ item.name }}</div>
                            <div class="singe">{{ item.singer }}</div>
                        </div>  
                    </div>
                </div>
                 <!-- <li>
                    <div class="font">
                        <i class="iconfont icon-ziyuan1"></i>
                    </div>
                    <div class="item">下载管理(0)</div>
                </li> -->
                 <!-- <li>
                    <div class="font">
                        <i class="iconfont icon-wodediantai"></i>
                    </div>
                    <div class="item">我的电台(0)</div>
                </li> -->
                 <li>
                    <div class="font">
                        <i class="iconfont icon-wodeshoucang"></i>
                    </div>
                    <div class="item">我的收藏({{ faListNum() }})</div>
                </li>
                <div class="latelyList">
                    <div class="list-item" v-for="(item,index) in faListList" :key="item.id" @click="getPlayInfo(index,faListList)">
                        <div class="index">{{ index + 1}}</div>
                        <div class="right">
                            <div class="name">{{ item.name }}</div>
                            <div class="singe">{{ item.singer }}</div>
                        </div>  
                    </div>
                </div>
            </ul>
        </div>
        <div class="rank">
            <div class="rank_head">
                <div class="title">创建的歌单({{rank.length}})</div>
            </div>
            <div class="rank_list">
                <ul>
                    <li v-for="(item,index) in rank" :key="index">
                        <div class="img">
                            <img :src="item.coverImgUrl" :alt="item.name">
                        </div>
                        <div class="text_list">
                            <div class="rank_title">{{ item.name }}</div>
                            <div class="rank_count">{{ item.playCount }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        </div>
    </div>
</transition>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import userRank from 'Api/user_rank.js'
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            rank:[],
            faListList:[],
            LatelyPlays:[]
        }
    },
    created(){
        if(Cookies.get('wangyiId')){
            this._getUserRank()
        };
        
    },
    methods:{
        ...mapActions( ['getPlayList'] ),
        ...mapActions( ['getPlayIndex'] ),
        ...mapActions( ['changePlayerFlag']),
        _getUserRank(){
            userRank(Cookies.get('wangyiId')).then( res => {
                if (res.data.code == 200) {
                    this.rank = res.data.playlist
                    } else {
                        console.error('userRank 获取失败')
                    }
            })
        },
        faListNum(){//收藏数量
            var storage=window.localStorage;
            if(storage.getItem('favorite')){
                var faList = JSON.parse(storage.getItem('favorite')) 
                // this.faListList = faList 
               return faList.length
            }else{
                return 0
            }
        },
        LatelyPlaysNum(){//最近播放数量
            var storage=window.localStorage;
            if(storage.getItem('LatelyPlays')){
                var LatelyPlays = JSON.parse(storage.getItem('LatelyPlays')) 
               return LatelyPlays.length
            }else{
                return 0
            }
        },
        getPlayInfo (index,list) {//获取播放信息 
            let listData = [];
            list.map( (item,index) => { 
                let tem = {};
                tem.id = item.id;
                tem.img = item.img;
                tem.name = item.name;
                tem.singer = item.singer
                listData.push(tem)
            })
            this.getPlayList(listData)
            this.getPlayIndex(index)
            this.changePlayerFlag(true)
           
        }
    },
    computed:{
        ...mapGetters(['getFavorites']),
        ...mapGetters(['getNearLists'])
    },
    mounted(){
        if(!Cookies.get('wangyiId')){
            alert('你还没有登录')
            this.$router.push('/login')
        }
        var storage=window.localStorage;
        if(storage.getItem('favorite')){//收藏
            // var faList = JSON.parse(storage.getItem('favorite')) 
            this.faListList = this.getFavorites 
        }
        if(storage.getItem('LatelyPlays')){
            // var LatelyPlays = JSON.parse(storage.getItem('LatelyPlays')) 
            this.LatelyPlays = this.getNearLists
        }
        new BScroll('.mine',{
            scrollY: true,
            click: true
        })
    },
    watch:{
        getFavorites(){
            this.faListList = this.getFavorites
        },
        getNearLists(){
            this.LatelyPlays = this.getNearLists
        }
    }
}
</script>

<style lang="scss" scoped>
.mine-enter-active, .mine-leave-active {
  transition: all 0.3s;
}
.mine-enter, .mine-leave-to {
  transform: translate3d(-50%, 0, 0);
  opacity: 0;
  transition: all 0.3s;
}
.mine{
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0.8rem;;
    bottom: 0;
    background: #f2f3f4;
    z-index: 1;
    .head{
        width: 100%;
        margin: 0 auto;
        background: #fff;
        ul{
            
            li{
                display: flex;
                width: 100%;
                border-top: 1px solid #ccc;
                .font{
                    width: 0.44rem;
                    height: 0.44rem;
                    flex: 0.5rem;
                    display: flex;
                    text-align: center;
                    i{
                        color: #131313;
                        width: 100%;
                        height: 100%;
                        line-height: 0.44rem;
                        font-weight: bold;
                    }
                }
                .item{
                    line-height: 0.44rem;
                    font-size: 0.18rem;
                    color: #818181;
                    flex: 3rem;
                    width: 100%;
                }
            }
            .latelyList{
                    display: flex;
                    flex-direction: column;
                    .list-item{
                        width: 100%;
                        display: flex;
                        height: 0.45rem;
                        background: #f2f3f4;
                        border-bottom: 1px solid #ccc;
                        .index{
                            width: 0.45rem;
                            height: 0.45rem;
                            text-align: center;
                            line-height: 0.45rem;
                            font-size: 0.14rem;
                        }
                        .right{
                            flex: 1;
                            font-size: 0.12rem;
                            .name{
                                height: 0.3rem;
                                line-height: 0.4rem;
                            }
                            .singe{
                                height: 0.15rem;
                                line-height: 0.1rem;
                            }
                        }
                    }
                }
        }
    }
    .rank{
        width: 100%;
        background: #fff;
        margin-top: 0.1rem;
        .rank_head{
            width: 95%;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.18rem;
            margin: 0 auto;
            font-weight: bold;
        }
        .rank_list{
            width: 95%;
            margin: 0 auto;
            ul{
                li{
                    display: flex;
                    margin: 0.1rem 0;
                    .img{
                        width: 0.6rem;
                        height: 0.6rem;
                        flex: 0.6rem;
                        display: flex;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 0.1rem;
                        }
        
                    }

                    .text_list{                
                        margin-left: 0.1rem;
                        flex: 3rem;
                        .rank_title{
                            font-size: 0.14rem;
                            line-height: 0.3rem;
                        }
                        .rank_count{
                            font-size: 0.14rem;
                            line-height: 0.2rem;
                            color: #8f8f8f;
                        }
                    }
                }
            }
        }
    }
}
</style>

