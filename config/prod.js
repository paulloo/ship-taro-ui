module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  mini: {
    postcss: {
      // 小程序端样式引用本地资源内联
      url: {
        enable: true,
        config: {
          limit: 102400000000
        }
      }
    }
  },
  h5: {
    publicPath: './',
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
