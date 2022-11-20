module.exports = {
  configureWebpack: {
    devServer: {
        port: 3002
    }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  }
};
