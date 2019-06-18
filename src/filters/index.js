import Vue from 'vue'
Vue.filter('countFilter',function(count){//播放人数过滤成万单位
   return Math.floor(count / 10000) + '万'
})

Vue.filter('format',function(interval){
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second 
})

Vue.filter('formatUpdataTime',function(time){
  let mytime = new Date(time)
  return mytime.getMonth() + 1 + '月' + mytime.getDate() + '日'
})