import * as type from './type'
const mutations = {
    [type.RANK_ID] ( state,action ) { // 请求结束后，修改首页列表数据   null  -> payload
        state.rankId = action.payload
    },
    [type.PLAYFLAG] ( state,action ) {
        state.playFlag = action.payload
    },
    [type.PLAY_LIST] ( state,action ) {
        state.playList = action.payload
    },
    [type.PLAY_INDEX] ( state,action ) {
        state.index = action.payload
    },
    [type.PLAY_JIA] ( state,action ) {
        state.index++
    },
    [type.PLAY_JIAN] ( state,action ) {
        state.index--
    },
    [type.PLAYERFLAG] ( state,action ) {
        state.playerFlag = action.payload
    },
    [type.MEMBER] ( state,action ) { // 获取输入的会员信息   null  -> payload
        state.member = action.payload
    },
    [type.PASSWORD] ( state,action ) { // 获取输入的密码信息   null  -> payload
        state.password = action.payload
    },
    [type.SINGER_ID] ( state,action ) { // 获取歌手id   null  -> payload
        state.singerId= action.payload
    },
    [type.FAVORITE] ( state,action ) {
        state.favoriteList = action.payload
    },
    [type.NEARPLAY] ( state,action ) {
        state.nearList = action.payload
    }
}

export default mutations