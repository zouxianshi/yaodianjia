'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '海典商户平台' // page title
const port = 7002 // dev port

// 引用uglifyjs，代码压缩、去除console
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 引用gzip
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// gizp文件后缀
// const productionGzipExtensions = ['js', 'css']
// 强制将打包环境统一为production，统一打包后的文件夹格式
process.env.NODE_ENV = process.env.VUE_APP_ENV ? 'production' : 'development'
console.log('build evn：', process.env.VUE_APP_ENV)
console.log('build evn api base：', process.env.VUE_APP_API_BASE)
console.log('build evn static base url：', process.env.VUE_APP_BASE_URL)
module.exports = {
  // 文件基础路径（配置的阿里云静态资源路径）
  publicPath: process.env.VUE_APP_BASE_URL,
  // 输出基础路径
  outputDir: 'dist',
  indexPath: 'index.html',
  // 去除文件hash
  filenameHashing: false,
  lintOnSave: true,
  productionSourceMap: false,
  // 配置css
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 根据环境设置不同的oss图片地址，在scss中调用 _functions.scss中的oss-bg-config函数返回对应的url，本地为空，则不处理原路径
        data: `$static-url:'${
          process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : ''
        }';`
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: `http://middle.test.ydjia.cn/businesses-gateway`,
        target: `http://middle.test.ydjia.cn/businesses-gateway`,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          // '^/api': `http://middle.test.ydjia.cn`
          '^/api': `http://middle.test.ydjia.cn`
        }
      },
      '/hss': {
        // target: `http://middle.test.ydjia.cn/businesses-gateway`,
        target: `http://10.200.25.183:8080/`,
        // target: `https://hudit-cloud.dev.ydjia.cn/businesses-gateway`,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          // '^/api': `http://middle.test.ydjia.cn`
          '^/hss': ``
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    performance: {
      hints: 'warning', // 枚举
      maxAssetSize: 30000000, // 整数类型（以字节为单位）
      maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
      assetFilter: function(assetFilename) {
        // 提供资源文件名的断言函数
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    optimization: {
      // // 压缩
      // minimizer: [
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       warnings: !process.env.VUE_APP_ENV || process.env.VUE_APP_ENV === 'dev', // 开发环境或review环境开启警告
      //       compress: {
      //         drop_console: process.env.VUE_APP_ENV && process.env.VUE_APP_ENV !== 'dev', // 非开发环境或review环境去除console
      //         drop_debugger: process.env.VUE_APP_ENV && process.env.VUE_APP_ENV !== 'dev', // 非开发环境或review环境去除debugger
      //         pure_funcs: ['console.log']// 移除console
      //       }
      //     }
      //   })
      // ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',

        jQuery: 'jquery',

        'windows.jQuery': 'jquery'
      })
      //   // GZIP配置
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 10240, // gzip最小文件大小(b)
      //     minRatio: 0.8
      //   })
    ]
  },
  chainWebpack(config) {
    config.output.filename('[name].[hash].js').end()
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
