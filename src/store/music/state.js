const state = {
    rankId : null,
    playList : null,
    playFlag : false,//是否在放歌
    playerFlag : false,//播放界面是否打开
    index : null,//播放索引
    member : null,
    password : null,
    singerId : null,//歌手id
    favoriteList : JSON.parse(localStorage.getItem('favorite')),//歌曲收藏
    nearList : JSON.parse(localStorage.getItem('LatelyPlays')),//最近播放
}

export default state