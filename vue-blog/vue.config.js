module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        views: '@/views',
        hooks: '@/hooks',
        util: '@/util'
      }
    },
    devServer: {
      port: 3001
    }
    // optimization: {
    //   // 将 runtime 单独打包
    //   runtimeChunk: 'single',
    //   // 分割 vendors 包，将第三依赖包单独打包
    //   splitChunks: {
    //     chunks: 'all',
    //     minSize: 1000,
    //     maxInitialRequests: Infinity,
    //     cacheGroups: {
    //       vue: {
    //         name: 'vue',
    //         test: /[\\/]node_modules[\\/]vue[\\/]/,
    //         priority: -10
    //       },
    //       'vue-i18n': {
    //         name: 'vue-i18n',
    //         test: /[\\/]node_modules[\\/]vue-i18n[\\/]/,
    //         priority: -11
    //       },
    //       'vue-router': {
    //         name: 'vue-router',
    //         test: /[\\/]node_modules[\\/]vue-router[\\/]/,
    //         priority: -12
    //       },
    //       vuex: {
    //         name: 'vuex',
    //         test: /[\\/]node_modules[\\/]vuex[\\/]/,
    //         priority: -13
    //       },
    //       'element-plus': {
    //         name: 'element-plus',
    //         test: /[\\/]node_modules[\\/]vui-design[\\/]/,
    //         priority: -14
    //       },
    //       echarts: {
    //         name: 'echarts',
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -20
    //       }
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      }
    }
  }
}
