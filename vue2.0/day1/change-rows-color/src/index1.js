// 1. 使用ES6 导入语法， 导入 jQuery
import $ from 'jquery'

// 导入样式(在 webpack 中，一切皆模块，都可以通过 ES6 导入语法进行导入和使用)
import './css/index.css'
import './css/index.less'

// 2.定义 jQuery 的入口函数
$(function () {
  // 3.实现奇偶行的变色效果
  // 奇数行为红色
  $('li:odd').css('background', 'red')
  $('li:even').css('background', 'pink')
})