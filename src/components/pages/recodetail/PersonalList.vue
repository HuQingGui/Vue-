<template>
    <div class="recommend-list">
        <h1 class="title">推荐歌单</h1>
        <ul>
           <li class="item" v-for=" item in personallist " :key="item.id" @click="goRankDetail(item)">
                <div class="icon">
                    <div class="gradients"></div>
                    <img :alt = "item.name" v-lazy=" item.picUrl "/>
                </div>
                <p class="play-count">
                    <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                    {{ item.playCount | countFilter }}
                </p>
                <div class="text">
                    <p class="name">{{ item.name }}</p>
                </div>
            </li>
        </ul>
    </div>
    
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import getPersonal from 'Api/personlist'
export default {
     data () {
        return {
            personallist : []
        }
    },
    created () {
        this._getPersonal()
    },
    methods : {
        ...mapActions(['getRankId']),
        _getPersonal () {
            getPersonal ().then(res => {
                if (res.data.code == 200) {
                    let list = res.data.result
                    this.personallist = list.splice(0,9)
                    } else {
                        console.error('Banner 获取失败')
                    }
            })
        },
        goRankDetail (item) {
            this.$router.push({
                path: `/recommend/${item.id}`
            })
            this.getRankId(item.id)
        }
    },
    computed : {
        ...mapGetters( ['getRankIds'] )
    }
}
</script>
<style lang="scss" scoped>
.recommend-list{
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
            .play-count{
                position: absolute;
                top: 0.05rem;
                right: 0.08rem;
                font-size: 0.08rem;
                color: #f1f1ff;
                .iconfont{
                    font-size: 0.08rem;
                    margin-right: 0.02rem;
                }
            }
            .text{
                text-align: left;
                height: 0.4rem;
                line-height: 0.16rem;
                font-size: 0.11rem;
                margin-top: -0.1rem;
                margin-bottom: 0.1rem;
                .name{
                    font-size: 0.11rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>

