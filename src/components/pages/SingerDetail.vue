<template>
    <transition name="rankDetail">
    <div class="rankDetail">
        <div class="music-list">
            <div class="header">
                <div class="back" @click="backHome">
                    <i class="iconfont icon-fanhui"></i>
                </div> 
                <div class="text">
                    <h1 class="title">歌单</h1>
                </div>
            </div>
            <div class="list" ref="list">
                <div class="scroll">
                    <div class="bg-image" v-lazy:background-image="singerInfo && singerInfo.picUrl">
                        <div class="filter"></div> 
                        <div class="text">
                            <h2 class="list-title">
                                {{ singerInfo && singerInfo.name }}
                            </h2> 
                            <!-- <p class="play-count">
                                 <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                                {{ playList.playCount | countFilter }}
                            </p> -->
                        </div>
                    </div>
                    <div class="song-list-wrapper">
                        <div class="sequence-play">
                            <i class="iconfont icon-bofang"></i> 
                            <span class="text">播放全部</span> 
                            <span class="count">(共{{ playList && playList.length }}首)</span>
                        </div>
                        <div class="song-list">
                            <ul>
                                <li class="item" v-for=" (item,index) in playList" :key="item.id" @click="getPlayInfo(index,playList)">
                                    <p class="count">{{ index + 1 }}</p>
                                    <div class="content">
                                        <h2 class="name">{{ item.name }}</h2> 
                                        <p class="desc">{{ item.ar[0].name }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import getSingerDetail from 'Api/singerdetail'
import BScroll from 'better-scroll'
export default {
    data () {
        return {
            playList : [],
            singerInfo : null
        }
    },
    created () {
        if(this.getSingerIds){
            this._getSingerDetail()
        }else{
             this.$router.push({
                 path: '/singer'
            })
        }
        
    },
    methods : {
        ...mapActions( ['getPlayList'] ),
        ...mapActions( ['getPlayIndex'] ),
        ...mapActions( ['changePlayerFlag']),
        _getSingerDetail(){//获取歌单数据
            getSingerDetail ( this.getSingerIds ).then( res => {
                if (res.data.code == 200) {
                    let list = res.data.hotSongs
                    let info = res.data.artist
                    this.playList = list
                    this.singerInfo = info
                    } else {
                        console.error('playList 获取失败')
                    }
            })
        },
        backHome () {
            this.$router.push({
                 path: '/singer'
            })
        },
        getPlayInfo (index,list) {//获取播放信息 
            let listData = [];
            // console.log('list',list)
            list.map( (item,index) => { 
                let tem = {};
                tem.id = this.playList && item.id;
                tem.img = this.playList && item.al.picUrl;
                tem.name = this.playList && item.name;
                tem.singer = this.playList && item.ar[0].name
                listData.push(tem)
            })
            // console.log(list)
            this.getPlayList(listData)
            this.getPlayIndex(index)
            this.changePlayerFlag(true)
           
        }
    },
    computed:{
      ...mapGetters( ['getSingerIds'] )
    },
    mounted () {
        
        setTimeout( ()=>{
        new BScroll('.list',{
            scrollY: true,
            click: true
        })
        },1000)
    }
    
}
</script>


<style lang="scss" scoped>
.rankDetail-enter-active, .rankdetail-leave-active {
  transition: all 0.3s;
}
.rankDetail-enter, .rankdetail-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
  transition: all 0.3s;
}
.music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f2f3f4;
    .header{
        position: fixed;
        top: 0;
        width: 100%;
        height: 0.44rem;
        color: #fff;
        z-index: 100;
        font-size: 0;
        .back{
            position: absolute;
            top: 0;
            left: 0.04rem;
            .iconfont{
                padding: 0.05rem 0.1rem;
                font-size: 0.16rem;
                line-height: 0.44rem;
            }
        }
        .text{
            position: absolute;
            left: 0.38rem;
            line-height: 0.44rem;
            font-size: 0.16rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            .title{
                font-size: 0.16rem;
                margin: 0;
            }
        }
    }
    .list{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #f2f3f4;
        .bg-image{
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 75%;
            transform-origin: top;
            background-size: cover;
            background-position: 0 30%;
            .filter{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                opacity: .2;
            }
            .text{
                position: absolute;
                width: 80%;
                height: 0.4rem;
                bottom: 0.5rem;
                left: 0.2rem;
                color: #fff;
                .list-title{
                    position: absolute;
                    bottom: 0;
                    font-style: italic;
                    font-size: 0.18rem;
                    line-height: 0.18rem;
                    font-weight: 700;
                    letter-spacing: 1px
                }
                .update{
                    position: absolute;
                    top: 0.45rem;
                    // left: 0.07rem;
                    line-height: 0.14rem;
                    font-size: 0.11rem;
                }
                .iconfont{
                    font-size: 0.14rem;
                    margin-right: 0.02rem;
                }
                .play-count{
                    position: absolute;
                    top: 0.45rem;
                    line-height: 0.14rem;
                    font-size: 0.11rem; 
                }
            }
        }
        .song-list-wrapper{
            padding: 0.41rem 0 0.2rem;
            border-radius: 0.1rem;
            position: relative;
            top: -0.2rem;
            background: #f2f3f4;
            .sequence-play{
                position: absolute;
                top: 0;
                display: flex;
                align-items: center;
                width: 100%;
                height: 0.4rem;
                padding-left: 0.16rem;
                border-bottom: 1px solid #e4e4e4;
                .iconfont{
                    font-size: 0.2rem;
                    color: #2e3030;
                    padding-right: 0.1rem;
                }
                .text{
                    font-size: 0.16rem;
                    margin-right: 0.03rem;
                }
                .count{
                    font-size: 0.14rem;
                    color: #757575;
                }
            }
            .song-list{
                ul{
                    .item{
                        position: relative;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        height: 0.6rem;
                        border-bottom: 1px solid #e4e4e4;
                        .count{
                            flex: 0 0 0.5rem;
                            width: 0.5rem;;
                            text-align: center;
                            color: #757575;
                            font-size: 0.16rem;
                        }
                        .content{
                            flex: 1;
                            line-height: 0.2rem;
                            overflow: hidden;
                            font-size: 0.15rem;
                            .name{
                                margin-top: 0.04rem;
                                width: 80%;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                color: #2e3030;
                            }
                            .desc{
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                width: 80%;
                                font-size: 0.12rem;
                                color: #757575;
                            }
                        }
                    }
                }
            }
        }
    }
}
.rankDetail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f2f3f4;
}
</style>

