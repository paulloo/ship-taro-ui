const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isBuildComponent = process.env.TARO_BUILD_TYPE === 'component'
const config = {
  projectName: 'ship-taro-ui',
  date: '2020-3-18',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: isBuildComponent ? 'dist' : `dist/${process.env.TARO_ENV}`,
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  plugins: [
    '@tarojs/plugin-sass',
    '@tarojs/plugin-uglify'
  ],
  defineConstants: {
  },
  alias: {
    'ship-taro-ui': path.resolve(__dirname, '../src/ui.ts'),
  },
  mini: {},
  h5: {
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true
      }
    }
  }
}

if (isBuildComponent) {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  })
  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin')
    chain.plugins.delete('addAssetHtmlWebpackPlugin')
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'taro-ui'
      },
      externals: {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        'weui': 'commonjs2 weui'
      },
      plugin: {
        extractCSS: {
          plugin: MiniCssExtractPlugin,
          args: [{
            filename: 'css/index.css',
            chunkFilename: 'css/[id].css'
          }]
        }
      }
    })
  }
}
module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
