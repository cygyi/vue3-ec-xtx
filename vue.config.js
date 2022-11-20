const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  // 自动导入样式文件的配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // __dirname: 获取的是当前文件所在目录的绝对路径
        // __filename: 获取的是当前文件的绝对路径
        // 添加 variables.less
        path.join(__dirname, './src/styles/variables.less')
      ]
    }
  },
  // 开发服务器
  devServer: {
    // 告诉webpack通过这个域名访问项目，默认只会找localhost
    host: 'www.corho.com'
  },
  configureWebpack: {
    externals: {
      // 用来去除打包时候的常用不变模块
      // key: 包名
      // value：变量名
      qc: 'QC'
    }
  }
})

// 浏览器网址栏输入域名，敲回车之后，ip地址解析过程：
// 1. 优先去本机的 hosts 文件查找当前域名和ip的对应关系
// 2. 如果查找到了，就把域名对应的ip服务器上资源返回
// 3. 否则，就去线上的DNS服务器上查找，把对应的域名解析成ip
// 4. 返回ip服务器上资源
// 一句话：服务器只认ip，人只认域名
