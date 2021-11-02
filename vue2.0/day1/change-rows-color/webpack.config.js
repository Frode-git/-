const path = require('path'); // 导入 node.js 中专门操作路径的模块

// 1.导入 html-webpack-plugin 插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin');
// 2.new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
	// 指定要复制哪个页面
	template: './src/index.html',
	// 指定复制出来的文件名和存放路径
	filename: './index.html',
});

// 构造函数（插件--发布项目时，删除 dist 旧文件）
// 注意：左侧的 { } 是解构复制
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');

// 使用 node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
	// 在开发调试阶段，建议把 devtool 的值设置为 eval-source-map 这样浏览器报错时，显示的行数与源码一致
	// 在发布的时候，出于安全性的考虑，建议关掉 source-map 或者 将其值改为 nosources-source-map
	// devtool: 'eval-source-map',
	devtool: 'nosources-source-map',

	// mode 用来指定构建模式 可选值有 development 和 production
	// 开发时使用 development，因为开发时追求的是开发效率（速度），而不是体积
	// 反过来，发布上线的时候，一定要用 production，因为上线追求的是体积小，而不是打包速度快
	mode: 'development',

	// entry: '指定要处理哪个文件'
	entry: path.join(__dirname, './src/index1.js'), // 打包入口文件路径    默认的打包入口文件为 src->index.js

	// 指定生成的文件要存放到哪里
	output: {
		// 这里的第一个 path 不是指node.js中的模块，而是指文件存放路径
		path: path.join(__dirname, './dist'), // 输出文件的存放路径     默认的输出文件路径为 dist->main.js
		filename: 'js/bundle.js', // 输出文件的名称
	},

	// 3.插件的数组，将来 webpack 在运行时，会加载并调用这些插件
	// 把创建的 cleanPlugin 插件实例对象，挂载到 plugins 节点中
	plugins: [htmlPlugin, new CleanWebpackPlugin()],

	devServer: {
		// 首次打包成功后，自动打开浏览器
		open: true,
		// 在 HTTP 协议中，如果端口号是 80，则可以被省略
		port: 80,
		// 指定运行的主机地址
		host: '127.0.0.1',
	},

	// loader 调用的过程(从后往前调用)
	// 1.webpack 默认只能打包处理 .js 结尾的文件，处理不了其他后缀的文件
	// 2.由于代码中包含了 index.css 文件，因此 webpack 默认处理不了
	// 3.当 webpack 发现某个文件处理不了时，会查找 webpack.config.js 这个配置文件，看 module.rules 数组中，是否配置了对应的 loader 加载器
	// 4.webpack 把 index.css 这个文件，先转交给最后一个loader进行处理（先转交给 css-loader）
	// 5.当 css-loader 处理完毕之后，会把处理的结果，转交给下一个 loader （转交给 style-loader）
	// 6.当 style-loader 处理完毕之后，发现没有下一个 loader 了，于是就把处理的结果，转交给了 webpack
	// 7.webpack 把 style-loader 处理的结果，合并到 /dist/bundle.js 中，最终生成打包好的文件
	module: {
		// 定义了不同模块对应的 loader
		rules: [
			// 处理 .css 文件的loader
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// 处理 .less 文件的 loader
			{
				test: /\.less$/,
				// 这里 不需要声明 less 包，这属于less-loader 的内置依赖项，安装好即可
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			// 处理图片文件的 loader
			// 如果需要调用的 loader 只有一个，则只传递一个字符串也行，如果有多个，必须用数组
			{
				test: /\.jpg|png|gif$/,
				// 设置参数，limit=1600 表示，当图片大小 <= 1600 时，才会被转成 base64 的格式
				// 在配置 url-loader 的时候，多个参数之间，使用 & 符号进行分隔
				use: 'url-loader?limit=1600&outputPath=images',
			},
			// 使用 babel 处理高级的 js 语法
			{
				test: /\.js$/,
				use: 'babel-loader',
				// 在配置 babel-loader 时，只需要把自己的代码进行转换即可，一定要排除 node_modules 目录中的 JS 文件，因为第三方包中的 JS 兼容性无需管
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		alias: {
			// 告诉 webpack 代码中的 @ 表示 src 这一层目录
			'@': path.join(__dirname, './src'),
		},
	},
};
