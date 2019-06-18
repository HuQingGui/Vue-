import * as type from './type.js'

const actions = {
    getRankId ({commit},id) {//获取歌单id
        let action = {
            type : type.RANK_ID,
            payload : id
        }
        commit( action )
    },
    getPlayList ({commit},playlist){//获取播放列表
        let action = {
            type : type.PLAY_LIST,
            payload : playlist
        }
        commit( action )
    },
    getPlayIndex ({commit},index){//获取播放索引
        let action = {
            type : type.PLAY_INDEX,
            payload : index
        }
        commit ( action )
    },
    PlayIndexJia({commit}){
        let action = {
            type:type.PLAY_JIA,
        }
        commit ( action )
    },
    PlayIndexJian({commit}){
        let action = {
            type:type.PLAY_JIAN,
        }
        commit ( action )
    },
    changePlayFlag ({commit},flag){//改变播放状态
        let action = {
            type : type.PLAYFLAG,
            payload : flag
        }
        commit ( action)
    },
    changePlayerFlag ({commit},flag){
        let action = {
            type : type.PLAYERFLAG,
            payload : flag
        }
        commit ( action )
    },
    getMember ({commit},member){//账号
        let action = {
            type : type.MEMBER,
            payload : member
        }
        commit( action )
    },
    getPassword ({commit},password){//密码
        let action = {
            type : type.PASSWORD,
            payload : password
        }
        commit( action )
    },
    getSingerId( {commit},id ){
        let action = {
            type : type.SINGER_ID,
            payload : id
        }
        commit( action )
    },
    getNearList ( {commit},list){
        let action = {
            type : type.NEARPLAY,
            payload : list
        }
        commit ( action )
    },
    getFavorite ( {commit},list){
        let action = {
            type : type.FAVORITE,
            payload : list
        }
        commit ( action )
    }
}

export default actions