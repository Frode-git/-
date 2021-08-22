/*
  请求地址:http://wthrcdn.etouch.cn/weather_mini
  请求方法:get
  请求参数:city(城市名)
  响应内容:天气信息

  1. 点击回车
  2. 查询数据
  3. 渲染数据
*/

var app = new Vue({
    el: '#app',
    data: {
        city: '',
        weather: []
    },
    methods: {
        searchWeather: function () {
            // 调用接口 "http://wthrcdn.etouch.cn/weather_mini?city= this.city" 注意不要这样写，此时this.city为data中的数据，放在引号里成了字符串（不变的数据）
            var that = this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
                .then(function (response) {
                    console.log(response.data.data.forecast);
                    that.weather = response.data.data.forecast;
                })
                .catch(function (err) {})
        },
        changeCity: function (city) {
            this.city = city;
            this.searchWeather();
        }
    }
})