import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入组件
import Recommend from 'Pages/Recommend'
import Search from 'Pages/Search'
import RankDetail from 'Pages/RankDetail'
import Singer from 'Pages/Singer'
import Rank from 'Pages/Rank'
import Login from 'Pages/Login'
import Login1 from 'Pages/logindetail/Login1'
import Login2 from 'Pages/logindetail/Login2'
import Mine from 'Pages/Mine'
import SingerDetail from 'Pages/SingerDetail'
import SearchRankDetail from 'Pages/SearchRankDetail'

//创建路由表
const routes = [
    {
        path : '/',
        redirect: '/recommend'
    },
    {
        path : '/recommend',
        component : Recommend,
        children: [//二级路由
            {
              path: ':id',
              component: RankDetail,
              name : 'rankdetail'
            }
          ]
    },
    {
        path : '/search',
        component : Search,
        children: [//二级路由
            {
              path: ':id',
              component: SearchRankDetail,
              name : 'searchrankdetail'
            }
          ]
    },
    {
        path : '/singer',
        component : Singer,
        children : [
            {
                path: ':id',
                component:SingerDetail,
                name: 'singerdetail'
            }
        ]
    },
    {
        path : '/rank',
        component : Rank,
        children : [
            {
                path: ':id', 
                component:RankDetail,
                name:'rankdetail1'  
            }
        ]
    },
    {
        path : '/login',
        component : Login
    },
    {
        path : '/login1',
        component : Login1
    },
    {
        path : '/login2',
        component : Login2
    },
    {
        path : '/mine',
        component : Mine
    }
]

//创建route实例
const router = new VueRouter ({
    
    routes,//路由表,必须的
    mode: 'history',//history路由
    // modules: {},//可以不写

})

export default router