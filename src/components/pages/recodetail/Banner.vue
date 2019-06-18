<template>
   <div class="banner">
      <div class="red_bg"></div>
        <div class="swiper-container">
            <div class="swiper-wrapper" ref="bannerList">
                <div class="swiper-slide" v-for=" item in banner " :key="item.id">
                    <img :alt = "item.typeTitle" :src="item.imageUrl"/>
                </div>
            </div>
            <div class="swiper-pagination"></div>
       </div>
   </div>
</template>

<script>
import Swiper from 'swiper'
import getBanner from 'Api/banner.js'
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            banner : []
        }
    },
    created () {
        this._getBanner ()
    },
    methods : {
        _getBanner () {//获取bannerlist
            getBanner ().then(res=>{
                if (res.data.code == 200) {
                    let list = res.data.banners
                    this.banner = list.splice(4)
                    setTimeout (() => {//实例化swiper
                        var mySwiper = new Swiper ('.swiper-container', {
                            loop: true,// 循环模式选项
                            pagination: {// 如果需要分页器
                                el: '.swiper-pagination',
                            },
                            autoplay: {//自动轮播配置
                                delay: 1500,
                                stopOnLastSlide: false,
                                disableOnInteraction: true,
                            }
                            })
                    })
                    } else {
                        console.error('Banner 获取失败')
                    }
            })
        }
    },
    mounted () {//实例化在这个钩子里,但如果数据请求例外
            
    }
}
</script>


<style lang="scss" scoped>
@import '~swiper/dist/css/swiper.css';
.red_bg{
    width: 100%;
    height: 4rem;
    background: #d44439;
    position: absolute;
    top: -2.68rem;
    overflow: hidden;
}

.swiper-container {
    width: 97%;
    height: 1.66rem;
    border-radius: 0.05rem;
    img{
        width: 100%;
        height: 100%;
    }
} 

.swiper-pagination-bullet-active {/*轮播active圆点*/
    background: #d44439;
}
</style>

