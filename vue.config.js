const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'dev' ? '/' : './',
  outputDir: 'study',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 80,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 配置代理
    proxy: {
      '/qingling': {
        // target: 'http://app.luyaoschool.com/qingling', // 正式
        target: 'http://47.104.128.212:80/qingling', // 测试
        changeOrigin: true,
        pathRewrite: {
          '^/qingling': '',
        },
      },
    },
  },
  // 配置别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  // 生产环境清楚console
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        }),
      ],
    },
  },
}
