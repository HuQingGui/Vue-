import Vue from 'vue'
import App from './App.vue'
//全局实用路由
import router from './router' //需要和router里的命名一样,否则无效
//引入重置样式
import 'Css/reset.css'
//引入字体图标
import 'Css/font/iconfont.css'
//引入过滤器
import 'Filters/index.js'
//引入vuex
import store from './store'
//引入vue-lazyload
import VueLazyload from 'vue-lazyload'
//axios拦截器
import axios from 'axios'
import { Indicator } from 'mint-ui';
// Add a request 拦截器
axios.interceptors.request.use(function (config) {
// Do something before request is sent
  Indicator.open({//自己添加的加载
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
}, function (error) {
// Do something with request error
  return Promise.reject(error);
});

// Add a response 拦截器
axios.interceptors.response.use(function (response) {
// Do something with response data
  Indicator.close()//开了是要关的
  return response;
}, function (error) {
// Do something with response error
  return Promise.reject(error);
});

Vue.config.productionTip = false

Vue.use(VueLazyload, {//注册lazyload
  loading: require('Img/default.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
