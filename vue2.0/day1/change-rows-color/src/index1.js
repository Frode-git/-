// 1. 使用ES6 导入语法， 导入 jQuery
import $ from 'jquery';

// 导入样式(在 webpack 中，一切皆模块，都可以通过 ES6 导入语法进行导入和使用)
// 如果某个模块中，使用 from 接收到的成员为 undefined，则没必要进行接收
import '@/css/index.css';
import '@/css/index.less';
import '@/js/test/info.js';

// 1.导入图片，得到图片文件
import logo from '@/images/logo.jpg';
// 2.给 img 标签的 src 动态赋值
$('.box').attr('src', logo);

// 2.定义 jQuery 的入口函数
$(function () {
	// 3.实现奇偶行的变色效果
	// 奇数行为红色
	$('li:odd').css('background', 'red');
	$('li:even').css('background', 'pink');
});

// 定义装饰器函数  修饰器（react中的）
function info(target) {
	target.info = 'Person info';
}

// 定义一个普通的类
@info
class Person {}

console.log(Person.info);
