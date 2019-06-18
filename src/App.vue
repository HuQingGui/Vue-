<template>
  <div id="app">
    <MyHeader></MyHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
      <Player v-show="this.getPlayerFlags"></Player>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import MyHeader from 'Common/MyHeader.vue'
import Tab from 'Common/Tab.vue'
import Recommend from 'Pages/Recommend.vue'
import Player from 'Common/Player.vue'
import BScroll from 'better-scroll'

export default {
  name: 'app',
  components: {
    MyHeader,Tab,Recommend,Player
  },
  computed:{
        ...mapGetters( ['getPlayerFlags'] ),
    }
}
</script>

<style lang="scss">
#app {
  font-family: PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
