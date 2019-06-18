<template>
    <div class="recommend-song">
        <h1 class="title">推荐歌曲</h1>
        <ul>
            <li class="item" v-for=" (item,index) in newSong " :key=" item.id " @click="getPlayInfo(index,newSong)">
                <div class="icon">
                    <div class="gradients"></div>
                    <img :alt = " item.name " v-lazy=" item.song.album.picUrl "/>
                </div>
                <div class="text">
                    <p class="name">{{ item.name }}</p>
                </div>
                <div class="singe">{{ item.song.artists[0].name }}</div>
            </li> 
        </ul>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import getNewSong from 'Api/newsong'
export default {
    data () {
        return {
            newSong : []
        }
    },
    created () {
        this._getNewSong()
    },
    methods : {
        ...mapActions( ['getPlayList'] ),
        ...mapActions( ['getPlayIndex'] ),
        ...mapActions( ['changePlayerFlag']),
        _getNewSong () {//获取最新歌曲
            getNewSong ().then(res => {
                if (res.data.code == 200) {
                    let list = res.data.result
                    this.newSong = list.splice(0,9)
                    } else {
                        console.error('Banner 获取失败')
                    }
            })
        },
        getPlayInfo (index,list) {//获取播放信息 
            let listData = [];
            list.map( (item,index) => { 
                let tem = {};
                tem.id = item.id;
                tem.img = item.song.album.picUrl;
                tem.name = item.name;
                tem.singer = item.song.artists[0].name
                listData.push(tem)
            })
            this.getPlayList(listData)
            this.getPlayIndex(index)
            this.changePlayerFlag(true)
           
        }
    }
}
</script>

<style lang="scss" scoped>
.recommend-song{
    .title{
        height: 0.44rem;
        width: 100%;
        font-size: 0.14rem;
        color: #2e3030;
        padding-left: 1.5%;
        text-align: left;
        font-weight: 700;
        line-height: 0.44rem;     
    }
    ul{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;/*子元素自动换行*/
        .item{
            box-sizing: border-box;
            padding: 0 1%;
            width: 33%;
            position: relative;
            a{
                color: #2e3030;
            }
            .icon{
                margin-bottom: 0.05rem;
                width: 100%;
                position: relative;
                border-radius: 0.1rem;
                .gradients{
                    position: absolute;
                    width: 100%;
                    height: 0.35rem;
                    border-radius: 0.05rem;
                    background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
                    top: 0;
                    border-radius: 0.1rem;
                }
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 0.1rem;
                }
            }
            .text{
                text-align: left;
                line-height: 0.18rem;
                height: 0.18rem;
                font-size: 0.11rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-top: -0.13rem;
                .name{
                    font-size: 0.11rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .singe{
                line-height: 0.2rem;
                height: 0.2rem;
                margin-bottom: 0.1rem;
                text-align: left;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 0.11rem;
                color: #757575
            }
        }
    }
}
</style>


