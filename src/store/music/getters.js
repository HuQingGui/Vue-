const getters = {
    getRankIds ( state ) {
        return state.rankId
    },
    getPlayFlags ( state ) {
        return state.playFlag
    },
    getPlayerFlags ( state ) {
        return state.playerFlag
    },
    getPlayLists ( state ) {
        return state.playList
    },
    getPlayIndexs ( state ) {
        return state.index
    },
    getMembers ( state ) {
        return state.member
    },
    getPasswords ( state ) {
        return state.password
    },
    getSingerIds ( state ) {
        return state.singerId
    },
    getNearLists ( state ) {
        return state.nearList
    },
    getFavorites ( state ) {
        return state.favoriteList
    },
    
}

export default getters