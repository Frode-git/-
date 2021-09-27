const path = require('path') // 导入 node.js 中专门操作路径的模块

// 1.导入 html-webpack-plugin 插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2.new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  // 指定要复制哪个页面
  template: './src/index.html',
  // 指定复制出来的文件名和存放路径
  filename: './index.html'
})

// 使用 node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
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
    filename: 'bundle.js' // 输出文件的名称
  },

  // 3.插件的数组，将来 webpack 在运行时，会加载并调用这些插件
  plugins: [htmlPlugin],

  devServer: {
    // 首次打包成功后，自动打开浏览器
    open: true,
    // 在 HTTP 协议中，如果端口号是 80，则可以被省略
    port: 80,
    // 指定运行的主机地址
    host: '127.0.0.1'
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
        use: ['style-loader', 'css-loader']
      },
      // 处理 .less 文件的 loader
      {
        test: /\.less$/,
        // 这里 不需要声明 less 包，这属于less-loader 的内置依赖项，安装好即可
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}