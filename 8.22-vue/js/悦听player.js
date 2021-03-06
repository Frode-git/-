/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var player = new Vue({
    el: '#player',
    data: {
        // 搜索内容
        query: '',
        // 搜索结果
        musicList: [],
        // 歌曲地址
        musicUrl: '',
        // mv地址
        mvUrl: '',
        // 歌曲封面
        picUrl: '',
        // 热评
        hotComments: [],
        // 是否播放歌曲
        isPlaying: false,
        // 是否播放mv
        showVideo: false
    },
    methods: {
        // 搜索歌曲
        searchMusic: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function (response) {
                // console.log(response);
                that.musicList = response.data.result.songs;
            }, function (err) {})
        },
        // 播放歌曲
        musicPlay: function (musicId) {
            // 获取歌曲地址
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function (response) {
                // console.log(response);
                that.musicUrl = response.data.data[0].url;
            }, function (err) {});
            // 歌曲详情(图片)
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function (response) {
                // console.log(response);
                that.picUrl = response.data.songs[0].al.picUrl;
            }, function (err) {});
            // 热评
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(function (response) {
                // console.log(response);
                that.hotComments = response.data.hotComments;
            }, function (err) {})
        },
        // 歌曲播放
        play: function () {
            this.isPlaying = true;
        },
        // 歌曲暂停
        pause: function () {
            this.isPlaying = false;
        },
        // 播放mv
        mvPlay: function (mvId) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvId).then(function (response) {
                // console.log(response);
                that.mvUrl = response.data.data.url;
                that.showVideo = true;
                // 播放mv时，如已在播放音乐，强行关闭
                that.musicUrl = '';
                that.pause();
                that.hotComments = [];
            }, function (err) {})
        },
        // 关闭mv
        closeMv: function () {
            this.showVideo = false;
            this.mvUrl = '';
        }
    }
})