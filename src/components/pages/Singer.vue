<template>
    <div class="singer">
      <div class="list-view" ref="listView" v-show="this.$route.path === '/singer'">
        <!-- <mt-index-list ref="list">
            <mt-index-section v-for="(item,index) in singerList" :index="item.title" :key="index">
              <ul>
                <li class="list-group-item" v-for="(item,index) in item.items" :key="index" :style="{color:'red'}">
                  <img class="avatar" :alt = " item.name " v-lazy=" item.avatar "> 
                  <span class="name">{{ item.name }}</span>
                </li>
              </ul>
            </mt-index-section>
        </mt-index-list> -->
        <ul>
          <li v-for="group in singerList" 
          class="list-group" 
          :key="group.id" 
          ref="listGroup">
            <h2 class="list-group-title">{{ group.title }}</h2>
            <ul>
                <li v-for="item in group.items" 
                class="list-group-item" :key="item.id" @click="goSingerDetail(item)">
                  <img v-lazy="item.avatar" class="avatar">
                  <span class="name">{{ item.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="list-shortcut">
            <ul>
              <li v-for="(item, index) in singerList"
              class="item"
              :data-index="index"
              :key="item.title"
               @touchstart="onShortcutStart"
              @touchmove.stop.prevent="onShortcutMove"
              :class="{'current': currentIndex === index}"

              >
                {{ item.title }}
              </li>
            </ul>
          </div>
       
      </div>
      <router-view></router-view> 
       
    </div>
</template>
<script>
// import Vue from 'vue';
// import { IndexList, IndexSection, Cell } from 'mint-ui';
import BScroll from 'better-scroll'
// Vue.component(IndexList.name, IndexList);
// Vue.component(IndexSection.name, IndexSection);
// Vue.component(Cell.name, Cell);
import { mapActions,mapGetters } from 'vuex'
import getSinger from 'Api/singer'
import Singer from 'Common/js/singer'
const pinyin = require('pinyin')
const HOT_NAME = '热'
const HOT_SINGERS = 10
export default {
    data () {
        return {
            singerList : [],
            hot : [],
            scrollY: -1,
            currentIndex: 0
        }
    },
    created () {
      this._getSinger()
      this.touch = {}
      // 初始化 better-scroll 必须要等 dom 加载完毕
      this.$nextTick(()=>{
        setTimeout(() => {
        this._initSrcoll()
        this._calculateHeight()
        }, 1000)
      })
      setTimeout(() => {
      this._initSrcoll()
      this._calculateHeight()
      }, 1000)
      
    },
    mounted(){
      // console.log(this.$refs.list.$children[5])
    },
    methods : {
      ...mapActions(['getSingerId']),
        _getSinger(){//数据获取
            getSinger().then( res => {
                if (res.data.code == 200) {
                    let list = res.data.artists
                    list.map((item) => {
                        let py = pinyin(item.name[0], {
                            style: pinyin.STYLE_FIRST_LETTER
                    })
                    item.initial = py[0][0].toUpperCase()
                    })  
                    this.singerList = this._normalizeSinger(list)
                    } else {
                        console.error('artists 获取失败')
                    }
            })
        },
        _initSrcoll () {
          this.scroll = new BScroll(this.$refs.listView, {
            probeType: 3,
            click: true
          })
          this.scroll.on('scroll', (pos) => {
            this.scrollY = pos.y
          })
        },
        onShortcutStart (e) {
          // 获取到绑定的 index
          let index = e.target.getAttribute('data-index')
          // 使用 better-scroll 的 scrollToElement 方法实现跳转
          this.scrollToElement(index)
          // 记录一下点击时候的 Y坐标 和 index
          let firstTouch = e.touches[0].pageY
          this.touch.y1 = firstTouch
          this.touch.anchorIndex = index
        },
        onShortcutMove (e) {
          // 再记录一下移动时候的 Y坐标，然后计算出移动了几个索引
          let touchMove = e.touches[0].pageY
          this.touch.y2 = touchMove
          // 这里的 16.7 是索引元素的高度
          let delta = Math.floor((this.touch.y2 - this.touch.y1) / 16.7)
          // 计算最后的位置
          // * 1 是因为 this.touch.anchorIndex 是字符串，用 * 1 偷懒的转化一下
          let index = this.touch.anchorIndex * 1 + delta
          this.scrollToElement(index)
        },
        scrollToElement (index) {
          // 处理边界情况
          // 因为 index 通过滑动距离计算出来的
          // 所以向上滑超过索引框框的时候就会 < 0，向上就会超过最大值
          if (!index && index !== 0) {
            return
          }
          if (index < 0) {
            return
          } else if (index > this.listHeight.length - 2) {
            index = this.listHeight.length - 2
          }
          // listHeight 是正的， 所以加个 -
          this.scrollY = -this.listHeight[index]
          this.scroll.scrollToElement(this.$refs.listGroup[index])
        },
        _calculateHeight () {
          this.listHeight = []
          const list = this.$refs.listGroup
          let height = 0
          this.listHeight.push(height)
          if(this.$refs.listGroup){
            for (let i = 0; i < list.length; i++) {
            let item = list[i]
            height += item.clientHeight
            this.listHeight.push(height)
            }
          }
        },
        _normalizeSinger (list) {//数据格式
          let map = {
            hot: {
              title: HOT_NAME,
              items: []
            }
          }
          list.forEach((item, index) => {
            if (index < HOT_SINGERS) {
              map.hot.items.push(new Singer({
                id: item.id,
                name: item.name,
                avatar: item.img1v1Url,
                aliaName: item.alias.join(' / '),
                picId: item.img1v1Id
              }))
            }

            const key = item.initial
            if (!map[key]) {
              map[key] = {
                title: key,
                items: []
              }
            }
            map[key].items.push(new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
              aliaName: item.alias[0]
            }))
          })
          let hot = []
          let ret = []
          for (const key in map) {
            let val = map[key]
            if (val.title.match(/[A-Z]/)) {
              ret.push(val)
            } else if (val.title === HOT_NAME) {
              hot.push(val)
            }
          }
          ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
          })
          return hot.concat(ret)
        },
        goSingerDetail (item) {
            this.$router.push({
                path: `/singer/${item.id}`
            })
            this.getSingerId(item.id)
        }
    },
    watch:{
      data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
      scrollY (newVal) {
      // 向下滑动的时候 newVal 是一个负数，所以当 newVal > 0 时，currentIndex 直接为 0
      if (newVal > 0) {
        this.currentIndex = 0
        return
      }
      
      // 计算 currentIndex 的值
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (-newVal >= height1 && -newVal < height2) {
          this.currentIndex = i
          return
        }
      }
      
      // 当超 -newVal > 最后一个高度的时候
      // 因为 this.listHeight 有头尾，所以需要 - 2
      this.currentIndex = this.listHeight.length - 2
    }
    }
}
</script>

<style lang="scss">
.singer{
    background: #f2f3f4;
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    z-index: 0;
    .mint-indexsection-index{
            height: 0.15rem;
            line-height: 0.15rem;
            font-size: 0.11rem;
            color: #fff;
            background: rgba(0,0,0,.1);
            padding: 0 0 0 0.12rem;
    }
    .mint-indexlist-nav{
        position: fixed;
        z-index: 100;
        background: rgba(0,0,0,0);
        width: 0.2rem;
        border-left: 0;
        display: flex;
    }
    .mint-cell-wrapper{
        background: #f2f3f4;
    }
    .mint-indexlist-navitem{
        margin-bottom: 0.02rem;
    }
    * { touch-action: pan-y; } 
    .list-group-item{
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin: 0 5px;
        border-bottom: 1px solid #e4e4e4;
        img{
            width: 50px;
            height: 50px;
            border-radius: 3px;
            
        }
        .name{
            margin-left: 20px;
            color: #2e3030;
            font-size: 14px;
        }
    }
}
.list-group-title{
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      margin-bottom: 10px;
      font-size: 11px;
      color: #fff;
      background: rgba(0,0,0,.1);
}
.list-shortcut{
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: hsla(0,0%,65%,.5);
    font-family: Helvetica;
    .item{
      padding: 0.02rem;
      line-height: 1;
      color: #757575;
      font-size: 0.11rem;
      font-weight: 700;
      &.current{
          color: #d44439
      }
    }
}
.list-view{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f2f3f4;
}
</style>


