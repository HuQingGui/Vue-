<template>
<transition name="search">
    <div class="search">
        <div class="search-box-wrapper">
            <i class="iconfont back icon-fanhui" @click="goHome"></i> 
            <div class="search-box">
                <input placeholder="搜索歌曲、歌手" type="text" v-model="enterValue" class="box" ref="searchBox"> 
                <i class="iconfont delete icon-shanchu" @click="clearInput"></i>
            </div>
        </div>
        <div class="search-scroll-wrapper">
          <div>
            <div class="search-hots" :style="{display: !boxFlag ? 'block' : 'none'}">
                <p  class="title">热门搜索</p> 
                <span  class="search-hots-item" v-for = " (item,index) in search " :key = "index" @click="hotEnter(item.first)">{{ item.first }}</span>
          </div>
          <div class="shortcut-wrapper" :style="{display: !boxFlag ? 'block' : 'none'}">
              <div class="search-history" :style="{display: !historyList ? 'none' : 'block'}">
                  <h1 class="title">
                      <span class="text">搜索历史</span> 
                      <span class="clear" @click="confirm">
                          <i class="iconfont icon-ziyuan"></i>
                      </span>
                  </h1> 
                  <div class="search-list">
                    <ul>
                        <li class="search-item" v-for="(item,index) in historyList" :key="index">
                            <span class="text" @click="hotEnter(item)">{{ item }}</span> 
                            <span class="icon" @click="removeHistoryItem(index)">
                                <i class="iconfont icon-shanchu"></i>
                            </span>
                        </li>
                    </ul>
                   </div>
               </div>
            </div>
            <div class="search-result" :style="{display: boxFlag ? 'block' : 'none'}">
                <div class="suggest">
                    <div class="search-suggest" >
                        <p class="title">最佳匹配</p>
                        <div class="search-suggest-item" @click="goRankDetail(playRank)">
                            <img :src="playRank && playRank.coverImgUrl" width="50" height="50"> 
                            <div class="text">
                                <p> 歌单:{{ playRank && playRank.name }}</p> 
                                <p class="singe">{{ playRank && playRank.description }}</p>
                            </div>
                        </div>
                    </div>
                    <ul class="suggest-list">
                        <li class="suggest-item" v-for=" (item,index) in resultList " :key="item.id" @click="getPlayInfo(index,resultList)">
                            <div class="icon">
                                <i></i>
                            </div>
                            <div class="name">
                                <p class="song">{{ item.name }}</p> 
                                <p class="singe">{{ item.artists[0].name }}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="no-result-wrapper" :style="{ display : resultFlag ? 'none' : 'block'}">
                        抱歉，暂无搜索结果
                    </div>
                </div>
            </div>
           </div>
        </div>
        <router-view></router-view>
    </div>
</transition>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import getSearch from 'Api/search.js'
import {getSearchResult,getSearchResultList} from 'Api/searchresult.js'
import { MessageBox } from 'mint-ui'
import BScroll from 'better-scroll'
export default {
    data () {
        return {
            search : [],//热门搜索
            enterValue : '',
            boxFlag : false,
            playRank :null,
            resultFlag : true,
            resultList : [],
            historyList : null
        }
    },
    created () {
        this._getSearch()
        this.getHistory()
    },
    methods : {
        ...mapActions( ['getPlayList'] ),
        ...mapActions( ['getPlayIndex'] ),
        ...mapActions( ['changePlayerFlag']),
         ...mapActions(['getRankId']),
        getFocus () {//焦点获得
            this.$refs.searchBox.focus()
        },
        _getSearch () {//获取热门搜索列表
            getSearch ().then( res => {
                if (res.data.code == 200) {
                    let list = res.data.result.hots
                    this.search = list
                    } else {
                        console.error('Banner 获取失败')
                    }
            })
        },
        clearInput () {//清空searchinput
            this.enterValue = ''
        },
        confirm () {//提示框
            MessageBox.confirm('是否清空历史记录?').then(action => {
               localStorage.removeItem('history')
               this.getHistory()
            })
        },
        goHome () {
            this.$router.push('/recommend')
        },
        setHistory () {//添加搜索记录
             if(localStorage.getItem('history')){
                    var history = JSON.parse(localStorage.getItem('history')) 
                }else{
                    var history = []
                }
                history.push(this.enterValue)
                localStorage.setItem('history',JSON.stringify(history));
        },
        getHistory () {//获取历史记录
            this.historyList = JSON.parse(localStorage.getItem('history'));  
            
        },
        removeHistoryItem(index){//删除搜索历史记录某一项
            MessageBox.confirm('是否删除当前项?').then(action => {
                let list = JSON.parse(localStorage.getItem('history'));
                if(list.length === 1){
                    localStorage.removeItem('history')
                }
                else{
                    let arr=list.splice(index,1)
                    localStorage.setItem('history',JSON.stringify(arr) );
                }
                
               this.getHistory()
            })
            
        },
        getRank () {//获取数据,歌单和搜索列表
            getSearchResult(this.enterValue).then( res=>{
                if(res.data.code == 200){
                    if(res.data.result.playlists){
                     let list = res.data.result.playlists[0]
                     this.playRank = list  
                     this.resultFlag = true 
                    }else{
                        this.resultFlag = false
                    }
                     
                }
            })
            getSearchResultList(this.enterValue).then( res=>{//获取搜索结果
                if(res.data.code == 200){
                    let list = res.data.result.songs
                    this.resultList = list
                }
            })
        },
        hotEnter(item){//将热门搜索键入输入框
            this.enterValue = item
        },
        getPlayInfo (index,list) {//获取播放信息 
            let listData = [];
            list.map( (item,index) => { 
                let tem = {};
                tem.id = item.id;
                // tem.img = `http://p1.music.126.net/LiRR__0pJHSivqBHZzbMUw==/${item.album.picId}.jpg`;
                tem.img = item.artists[0].img1v1Url;
                tem.name = item.name;
                tem.singer = item.artists[0].name;
                tem.need = true;
                listData.push(tem)
            })
            this.setHistory()
            this.getPlayList(listData)
            this.getPlayIndex(index)
            this.changePlayerFlag(true)
            this.getHistory()
        },
        goRankDetail (item) {//获取歌单详情并路由跳转
            this.$router.push({
                path: `/search/${item.id}`
            })
            this.setHistory()
            this.getRankId(item.id)
            this.getHistory()
        },
        searchHistoryFlag(){//判断是否已经在搜索历史记录
            var storage=window.localStorage
            if(storage.getItem('history')){

            }
            
        }
    },
    mounted () {
        this.getFocus(),//自动获得input焦点
        new BScroll('.search-scroll-wrapper',{//实例化betterscroll
            scrollY: true,
            click: true
        })
    },
    watch:{
        enterValue(old){//监听enterValue
            if(this.enterValue != ''){
                this.boxFlag = true
                this.getRank()
            }else{
                this.boxFlag = false
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
.search-enter-active, .search-leave-active {
  transition: all 0.3s;
}
.search-enter, .search-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
  transition: all 0.3s;
}

.search{
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f2f3f4;
    .search-box-wrapper{
        padding: 0.1rem 0.4rem 0.1rem 0.43rem;
        background: #d44439;
        height: 0.45rem;
        box-sizing: border-box;
        .back{
            position: absolute;
            left: 0.05rem;
            top: 0.1rem;
            padding: 0.03rem 0.1rem;
            font-size: 0.2rem;
            color: #fff;
        }
        .search-box{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            height: 0.25rem;
            border-bottom: 1px solid #ebebeb;
            .box{
                flex: 1;
                line-height: 0.25rem;
                background: #d44439;
                color: #fff;
                font-size: 0.14rem;
                border: none;
                outline: medium;
            }
        }
        .delete{
            position: absolute;
            right: 0.12rem;
            font-size: 0.14rem;
            color: hsla(0,0%,100%,.8);
            border: none;
        }
    }
    .search-scroll-wrapper{
        height: 100%;
        overflow: hidden;
        .search-hots{
            margin: 0 0.2rem;
            font-size:0;
            .title{
                padding: 0.15rem 0.05rem 0;
                height: 0.3rem;
                line-height: 0.3rem;
                font-size: 0.12rem;
                color: #757575;
            }
            .search-hots-item{
                display: inline-block;
                padding: 0.03rem 0.05rem;
                margin: 0.04rem;
                border: .8px solid #c7c7c7;
                border-radius: 0.05rem;
                line-height: 0.2rem;
                color: #2e3030;
                font-size: 0.14rem;

            }
        }
        .shortcut-wrapper{
            position: relative;
            margin: 0 auto;
            .search-history{
                position: relative;
                margin: 0.1rem 0.25rem;
                .title{
                    display: flex;
                    align-items: center;
                    height: 0.3rem;
                    font-size: 0.12rem;
                    color: #757575;
                    .text{
                        flex: 1;
                    }
                    .clear{
                        position: relative;
                        i{
                            font-size: 0.15rem;
                        }
                    }
                }
                .search-list{
                    .search-item{
                        display: flex;
                        align-items: center;
                        height: 0.35rem;
                        overflow: hidden;
                        font-size: 0.14rem;
                        .text{
                            flex: 1;
                            color: #2e3030;
                        }
                        .icon{
                            position: relative;
                            i{
                                font-size: 11px;
                                color: #2e3030;
                            }
                        }
                    }
                }
            }
        }
        .search-result{
            position: relative;
            width: 100%;
            top: 0.1rem;
            bottom: 0;
            .suggest{
                height: 100%;
                overflow: hidden;
                .search-suggest{
                    p{
                        padding-left: 0.2rem;
                        padding-bottom: 0.1rem;
                        color: #d44439;
                        font-size: 0.11rem;
                    }
                    .search-suggest-item{
                        display: flex;
                        align-items: center;
                        padding: 0.08rem 0.2rem;
                        border-bottom: 1px solid #e4e4e4;
                        font-size: 0.14rem;
                        img{
                            flex: 0 0 0.5rem;
                            padding-right: 0.15rem;
                        }
                        .text{
                            width: 100%;
                            p{
                                padding: 0.03rem 0;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                color: #2e3030;
                                font-size: 0.16rem;
                                font-weight: bold;
                                &.singe{
                                    font-size: 0.12rem;
                                    color: #2e3030;
                                    width: 80%;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    font-weight: normal;
                                }
                            }
                        }
                    }
                }
                .suggest-list{
                    padding-bottom: 0.03rem;
                    .suggest-item{
                        display: flex;
                        padding: 0.03rem 0.2rem;
                        height: 0.5rem;
                        align-items: center;
                        border-bottom: 1px solid #e4e4e4;
                        // .icon{

                        // }
                        .name{
                            flex: 1;
                            font-size: 0.14rem;
                            color: #2e3030;
                            overflow: hidden;
                            .song{
                                font-size: 0.16rem;
                                color: #2e3030;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                height: 0.18rem;
                            }
                            .singe{
                                font-size: 0.12rem;
                                color: #757575;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                height: 0.14rem;
                            }
                        }
                    }
                }
                .no-result-wrapper{
                    position: fixed;
                    overflow: hidden;
                    left: 50%;
                    transform: translatex(-50%);
                    color: #2e3030;
                    font-size: 0.14rem;
                }
            }
        }
    }
}
input::-webkit-input-placeholder{
    color:#DCDCDC;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#DCDCDC;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#DCDCDC;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#DCDCDC;
}
</style>


