module.exports = {
  configureWebpack: {
    devServer: {
        port: 3002
    },
    optimization: {
      // 将 runtime 单独打包
      runtimeChunk: 'single',
      // 分割 vendors 包，将第三依赖包单独打包
      splitChunks: {
        chunks: 'all',
        minSize: 1000,
        maxInitialRequests: Infinity,
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: -10
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            priority: -12
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: -13
          },
          'element-plus': {
            name: 'element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: -14
          },
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/]/,
            priority: -20
          },
          // 如果要分包vue，这个必须写
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -20
          },
        }
      }
    },
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  }
};
