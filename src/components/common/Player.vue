<template>
    <div class="player">
        <div class="normal-player">
            <div class="background">
                <div class="filter"></div> 
                <img alt="" width="100%" height="100%" src="http://p1.music.126.net/NgIotppbv3RGGi9FpslMUQ==/109951164092096675.jpg"/>
            </div>
            <div class="top">
                <div class="back" @click="closePlayer">
                    <i class="iconfont icon-xiala"></i>
                </div> 
                <h1 class="title">{{mytitle}}</h1> 
                <h2 class="subtitle">{{myauthor}}</h2>
            </div>
            <div class="middle" @click="this.changeLyricFlag">
                <div class="middle-l" :style="{display:!lyricFlag?'none':'block'}">
                    <div class="cd-wrapper">
                        <div class="cd play" :class="this.getPlayFlags && 'pause'">
                        <img alt="" class="image" :src="img"/>
                        </div>
                    </div>
                </div>
                <scroll class="middle-r" :style="{display:lyricFlag?'none':'block'}" ref="lyricList" :data="currentLyric && currentLyric.lines">
                    <div class="lyric-wrapper">
                        <div class="currentLyric" v-if="currentLyric">
                        <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}"
                            v-for="(line, index) in currentLyric.lines" :key="line.key">
                            {{line.txt}}
                        </p>
                        </div>
                        <p class="no-lyric" v-if="currentLyric === null">没有歌词</p>
                    </div>
                </scroll>
            </div>
            <div class="bottom">
                <div class="progress-wrapper">
                    <span class="time time-l">{{ currentTime | format }}</span>
                    <div class="progress-bar-wrapper">
                         <ProgressBar :percent="percent" @percentChangeEnd="percentChangeEnd" @percentChange="percentChange"></ProgressBar>
                    </div>
                    <span class="time time-r">{{ duration | format }}</span>

                </div>
                <div class="operators">
                    <div class="icon i-left">
                        <i class="iconfont" :class="!loopFlag && 'icon-liebiaoxunhuan'" @click="changeLoopFlag"></i>
                        <i class="iconfont" :class="loopFlag && 'icon-danquxunhuan'" @click="changeLoopFlag"></i>
                    </div> 
                    <div class="icon i-left">
                        <i class="iconfont icon-047caozuo_shangyishou" @click="prev"></i>
                    </div> 
                    <div class="icon i-center">
                        <i class="iconfont" :class="!playFlag && 'icon-zanting'" @click="pause"></i>
                        <i class="iconfont mode" :class="playFlag && 'icon-bofang1'" @click="play"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="iconfont icon-49xiayishou" @click="next"></i>
                    </div> 
                    <div class="icon i-right">
                        <i class="iconfont icon-shoucang" @click="setPlayList(getPlayLists[getPlayIndexs])" :style="{color:faListFlag() ? 'red' : ''}">{{getLyric}}</i>
                    </div>
                </div>
            </div>
        </div>
        <audio ref="music" autoplay @ended="end" @canplay="getDuration" @timeupdate="updateTime" :src="myurl"></audio>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import getSongInfo from 'Api/getSongInfo'
import getLyric from 'Api/getLyric'
import Lyric from 'lyric-parser'
import scroll from 'Common/base/scroll'
import ProgressCircle from 'Common/base/progress-circle'
import ProgressBar from 'Common/base/progress-bar'
import { Toast } from 'mint-ui'
export default {
    components: {
         scroll,ProgressCircle,ProgressBar
    },
    data () {
        return {
            duration:null,
            currentTime:[],
            currentLyric: null,
            currentLineNum: 0,
            lyricFlag : true,
            loopFlag : false,
            percent: 0,
            img:''
        }
    },
    created(){
        this.move = false
    },
    methods:{
        ...mapActions( ['changePlayFlag'] ),
        ...mapActions( ['changePlayerFlag'] ),
        ...mapActions( ['PlayIndexJia'] ),
        ...mapActions( ['PlayIndexJian'] ),
        ...mapActions( ['getPlayIndex'] ),
        ...mapActions( ['getFavorite'] ),
        ...mapActions( ['getNearList'] ),
        _getSongInfo(id){
            getSongInfo(id).then( res=> {
                if (res.data.code == 200) {
                    let list = res.data.songs[0]
                    // this.songInfo = list
                    this.img = list.al.picUrl
                    } else {
                        console.error('songinfo 获取失败')
                    }
            })
        },
        _getLyric(id){
            getLyric(id).then( res=> {
                if ( !res.data.nolyric && res.data.code == 200 ) {
                    this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
                    console.log(this.currentLyric)
                    if (this.currentLyric && this.duration) {
                        this.currentLyric.play()
                        // 歌词重载以后 高亮行设置为 0
                        this.currentLineNum = 0
                        this.$refs.lyricList.scrollTo(0, 0, 1000)
                    }
                    } else {
                        console.error('lyric 获取失败')
                    }
            })
        },
        handleLyric ({lineNum, txt}) {
            // console.log('lyric')
            // console.log(lineNum,txt)
            this.currentLineNum = lineNum
            if (lineNum > 5) {
                let lineEl = this.$refs.lyricLine[lineNum -5]
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            } else {
                this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        },
        play(){//播放
            console.log('play')
            this.$refs.music.play()   
            this.changePlayFlag(false)
            this.currentLyric.play()
        },
        pause(){//暂停
            console.log('pause')
            this.$refs.music.pause()
            this.changePlayFlag(true)
            this.currentLyric.stop()//关闭歌词滚动
            console.log(this.$refs.music.ended)
        },
        next(){//下一首
            if(this.getPlayIndexs<this.getPlayLists.length-1){
                this.PlayIndexJia()
                this.currentLineNum = 0
                this.currentLyric.stop()
            }else{
                this.getPlayIndex(0)
                this.currentLineNum = 0
                this.currentLyric.stop()
            }  
        },
        prev(){//上一首
          if(this.getPlayIndexs>0){
                this.PlayIndexJian()
                this.currentLineNum = 0
                this.currentLyric.stop()
            }else{
                this.getPlayIndex(this.getPlayLists.length-1)
                this.currentLineNum = 0
                this.currentLyric.stop()
            }  
        },
        closePlayer(){//关闭播放页面
            this.changePlayerFlag(false)
            this.currentLyric.stop()
        },
        getDuration() {//获取播放时长
            let stop = setInterval(() => { //获取播放总时长
                this.duration = this.$refs.music.duration
                if (this.duration) {
                    clearInterval(stop)
                }
      }, 150)
        },
        updateTime() {//已播放时长
            this.currentTime = this.$refs.music.currentTime;  //获取audio当前播放时间
        },
        changeLyricFlag(){//显示or隐藏歌词
            this.lyricFlag = !this.lyricFlag
        },
        percentChange (percent) {//歌曲进度条
            this.move = true
            const currentTime = this.duration * percent
            this.currentTime = currentTime
            if (this.currentLyric) {
                this.currentLyric.seek(currentTime * 1000)
            }
        },
        percentChangeEnd (percent) {//歌曲进度条
            this.move = false
            const currentTime = this.duration * percent
            this.$refs.music.currentTime = currentTime
            if (this.getPlayFlags) {
                this.$refs.music.play()
                this.changePlayFlag(true)
            }
            if (this.currentLyric) {
                this.currentLyric.seek(currentTime * 1000)
            }
        },
        end () {//判断是否循环
            if (this.loopFlag) {
                this.loop()
            } else {
                this.next()
            }
    },
        loop () {//循环
            this.$refs.music.currentTime = 0
            this.$refs.music.play()
            if (this.currentLyric) {
                this.currentLyric.seek()
            }
        },
        changeLoopFlag(){//改变循环方式
            this.loopFlag=!this.loopFlag
        },
        setPlayList(item){//收藏歌曲
            if(!window.localStorage){
            alert("浏览器不支持localstorage");
            return false;
            }else{
                var storage=window.localStorage;
                if(storage.getItem('favorite')){
                    var faList = JSON.parse(storage.getItem('favorite')) 
                    
                }else{
                    var faList = []
                }
                let tem = {}
                tem.id=item.id;
                tem.img=this.img;
                tem.name=item.name;
                tem.singer=item.singer
                
                if(this.faListFlag()){
                    let value = this.getPlayLists[this.getPlayIndexs].id
                    let arr = JSON.parse(storage.getItem('favorite'))
                    for(var i = 0; i < arr.length; i++){
                        if(value === arr[i].id){
                            arr.splice(i,1) 
                            faList=arr
                            storage.setItem('favorite',JSON.stringify(faList)) 
                            this.getFavorite(faList) 
                            Toast('取消收藏成功');
                        }
                    }
                   
                }
                else{
                    faList.push(tem)
                    faList = this.unique4(faList)
                    // console.log(JSON.stringify(faList))
                    storage.setItem('favorite',JSON.stringify(faList))  
                    this.getFavorite(faList)
                    Toast('收藏成功');
                    } 
                }
                
        },
        setLatelyPlays(){//最近播放
            if(!window.localStorage){
                alert("浏览器支持localstorage");
                return false;
            }else{
                var storage=window.localStorage;
                if(storage.getItem('LatelyPlays')){
                    var LatelyPlays = JSON.parse(storage.getItem('LatelyPlays')) 
                }else{
                    var LatelyPlays = []
                }
                let tem = {}
                tem.id=this.getPlayLists[this.getPlayIndexs].id;
                tem.img=this.img;
                tem.name=this.getPlayLists[this.getPlayIndexs].name;
                tem.singer=this.getPlayLists[this.getPlayIndexs].singer
                LatelyPlays.push(tem);
                LatelyPlays = this.unique4(LatelyPlays)
                let arr = LatelyPlays
                // console.log(JSON.stringify(LatelyPlays))
                
                storage.setItem('LatelyPlays',JSON.stringify(LatelyPlays))  
                // console.log(LatelyPlays)
                this.getNearList(arr)
                }
        },
        unique4(arr){//数组去重
            var hash=[];
            for (var i = 0; i < arr.length; i++) {
                for (var j = i+1; j < arr.length; j++) {
                if(arr[i].id===arr[j].id){
                    ++i;
                }
                }
                hash.push(arr[i]);
            }
            return hash;
        },
        faListFlag(){//判断是否已经收藏
            var storage=window.localStorage
            if(this.getPlayLists && storage.getItem('favorite')){
                let value = this.getPlayLists[this.getPlayIndexs].id
                let arr = JSON.parse(storage.getItem('favorite'))
                for(var i = 0; i < arr.length; i++){
                    if(value === arr[i].id){
                        return true;
                    }
                }
            return false;
            }
            
        }
    },
    computed:{
        ...mapGetters( ['getPlayFlags'] ),
        ...mapGetters( ['getPlayIndexs'] ),
        ...mapGetters( ['getPlayLists'] ),
        ...mapGetters( ['getPlayerFlags'] ),
        myurl:function(){//音乐地址
            if(this.getPlayerFlags){//音乐url
                return `https://music.163.com/song/media/outer/url?id=${this.getPlayLists[this.getPlayIndexs].id}.mp3`
            }
        },
        
        mytitle:function(){//歌曲标题
             if(this.getPlayerFlags){
                return `${this.getPlayLists[this.getPlayIndexs].name}`
             }
        },
        myauthor:function(){//歌曲作者
            if(this.getPlayerFlags){
               return `${this.getPlayLists[this.getPlayIndexs].singer}` 
            }
        },
        playFlag:function(){//是否在播放
            return this.getPlayFlags
        },
        getLyric(){ //获取歌词
            if(this.getPlayerFlags){
                this._getLyric(this.getPlayLists[this.getPlayIndexs].id)
            }
        },
    },
    mounted(){
        if(this.getPlayFlags){
            this.play() 
        };        
    },
    watch:{
        currentTime () {
            this.percent = this.currentTime / this.duration
        },
        getPlayIndexs(){
            this.setLatelyPlays()
            this.faListFlag()
            if(this.getPlayerFlags){
                 if(this.getPlayLists[this.getPlayIndexs].need){
                    console.log(1)
                    this._getSongInfo(this.getPlayLists[this.getPlayIndexs].id)
                    return
                 }
                this.img = `${this.getPlayLists[this.getPlayIndexs].img}`
             }
        },
        
    }
}
</script>

<style lang="scss" scoped>
.player{
    .normal-player{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: #f2f3f4;
        .background{
            position: absolute;
            left: -50%;
            top: -50%;
            width: 300%;
            height: 300%;
            z-index: -1;
            opacity: .6;
            -webkit-filter: blur(30px);
            filter: blur(0.3rem);
            .filter{
                position: absolute;
                width: 100%;
                height: 100%;
                background: #000;
                opacity: .6;
            }
        }
        .top{
            position: relative;
            margin-bottom: 0.25rem;
            .back{
                position: absolute;
                top: 0;
                left: 0.06rem;
                z-index: 50;
                .iconfont{
                    display: block;
                    padding: 0.1rem 0.09rem;
                    font-size: 0.25rem;
                    color: #f1f1f1;
                }
            }
            .title{
                padding-top: 0.1rem;
                font-size: 0.18rem;
                font-weight: 700;
                width: 70%;
                margin: 0 auto;
                line-height: 0.2rem;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #f1f1f1;
            }
            .subtitle{
                width: 70%;
                margin: 0 auto;
                line-height: 0.2rem;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #f1f1f1;
                font-weight: 400;
                font-size: 0.13rem;
            }
        }
        .middle{
            display: flex;
            align-items: center;
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 1.7rem;
            white-space: nowrap;
            font-size: 0;
            .middle-l{
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;
                .cd-wrapper{
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;
                    .cd{
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        border: 0.15rem solid hsla(0,0%,100%,.1);
                        border-radius: 50%;
                        &.play{
                            animation: cd 20s linear infinite;
                        }
                        &.pause{
                            animation-play-state: paused;
                        }
                        img{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .middle-r{
                display: inline-block;
                position: absolute;
                top: 0;
                vertical-align: top;
                width: 100%;
                height: 100%;
                overflow: hidden;
                -webkit-mask: -webkit-linear-gradient(top,rgba(0,0,0,0.2),#fff 30%,#fff 50%,rgba(0,0,0,0.4));
                .lyric-wrapper{
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .currentLyric{
                        
                        .text{
                            font-size: 0.14rem;
                            line-height: 0.25rem;
                            &.current {
                                color: #FFF;
                            }
                        }
                    }
                    .no-lyric{
                        line-height: 0.4rem;
                        margin-top: 60%;
                        color: #c7c7c7;
                        font-size: 0.14rem;
                    }
                    .lyric__para{
                        line-height: 2;
                        margin: 0 .2rem;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: .15rem;
                        color: rgba(255, 255, 255, 0.9);
                        &.current{
                            color: #31c27c;
                        }
                    }
                }
            }
        }
        .bottom{
            position: absolute;
            bottom: 0.5rem;
            width: 100%;
            .progress-wrapper{
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0 auto;
                padding: 0.1rem 0;
                .time{
                    color: #f1f1f1;
                    font-size: 0.11rem;
                    flex: 0 0 0.3rem;
                    line-height: 0.3rem;
                    width: 0.3rem;
                    &.time-l{
                        text-align: left;
                    }
                    &.time-r{
                        text-align: right;
                        color: #dbdbdb;
                    }
                }
                .progress-bar-wrapper{
                    flex : 1;
                    .progress-bar{
                        height: 0.3rem;
                        .bar-inner{
                            position: relative;
                            top: 0.13rem;
                            height: 0.04rem;
                            background: rgba(0,0,0,.3);
                            .progress{
                                position: absolute;
                                height: 100%;
                                background: #d44439;
                            }
                            .progress-btn-wrapper{
                                position: absolute;
                                left: -0.08rem;
                                top: -0.13rem;
                                width: 0.3rem;
                                height: 0.3rem;
                                .progress-btn{
                                    position: relative;
                                    top: 0.07rem;
                                    left: 0.07rem;
                                    box-sizing: border-box;
                                    width: 0.16rem;
                                    height: 0.16rem;
                                    border: 0.05rem solid #f1f1f1;
                                    border-radius: 50%;
                                    background: #d44439;
                                }
                            }
                        }
                    }
                }
            }
            .operators{
                display: flex;
                align-items: center;
                height: 0.4rem;
                .icon{
                    flex: 1;
                    color: #f1f1f1;
                    font-size: 0;
                    &.i-left{
                        text-align: right;
                    }
                    &.i-center{
                        padding: 0 0.2rem;
                        text-align: center; 
                    }
                    &.i-right{
                        text-align: left;
                    }
                    .iconfont{
                        font-size: 0.28rem;
                    }
                    .mode{
                        font-size: 0.4rem;
                    }
                    .icon-zanting{
                        font-size: 0.4rem
                    }
                }
            }
        }
    }
}
@keyframes cd {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(1turn);
    }
}

/*进度条和拖拽样式*/
// progress{
//     width: 100%
// }
// input[type=range]{
//     -webkit-appearance: none;
//     width: 300px;
//     border-radius: 10px;
// }
//  /* 表示已完成进度背景色 */
// progress::-webkit-progress-value{
//     background-color:#f91604;
// }
// #range {
//     width: 100%;
//     height: 0rem;;
//     position: absolute;
//     height: 100%;
//     background: rgba(255, 255, 255, 0);
//     border: 0;
// }
// input[type="range"]::-webkit-slider-thumb{
//     -webkit-appearance: none;
//     position: relative;    /* 設為相對位置，為了前後區塊的絕對位置而設定 */
//     width:0.15rem;
//     height:0.15rem;
//     background:#f22;
//     border-radius:50%;
//     transition:.2s;        /* 點選放大時候的漸變時間 */
//     border: 0.04rem solid #fff;
//   }


</style>
