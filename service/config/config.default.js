/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624953265452_4735'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'ZH123456',
    database: 'blog', // 数据库名称
    define: {
      timestamps: false, // 不自动添加时间戳
      freezeTableName: true // 将指定的模块名称当做表名使用。模板名称与表名称相同
    }
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'ZH123456',
      database: 'blog'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }

  config.security = {
    csrf: {
      enable: false
      // enable: true, // missing csrf token
    }
    // domainWhiteList: [ 'http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8080',
    //   'http://127.0.0.1:8081' ],
  }

  // 跨域设置
  config.cors = {
    origin({ req }) {
      const { origin } = req.headers
      const whiteList = [
        // 'http://localhost:8080',
        // 'http://localhost:8081',
        // 'http://127.0.0.1:8080',
        // 'http://127.0.0.1:8081',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3002',
        'http://localhost:8080',
        'http://127.0.0.1:8080'
      ]
      if (whiteList.includes(origin)) {
        console.log('正确')
        return origin
      }
    },
    // credentials: true, // 开启认证。开启cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  }

  // 这个挂载到app上。
  config.jwt = {
    secret: 'zhllm' // 设置秘钥
  }

  // 中间件变量
  config.auth = {
    exclude: [
      '/admin/login',
      '/admin/getMessageList',
      '/admin/totalChartCount',
      '/admin/getCommentResponseByTypeId',
      '/admin/getCommentResponseCountByArticleId'
    ]
  }

  // 设置session选项
  config.session = {
    key: 'userInfo',
    httpOnly: true,
    renew: true
  }
  // config.session = {
  //   key: 'userId',
  // };

  // 处理文件上传
  config.multipart = {
    mode: 'file',
  };
  return {
    ...config,
    ...userConfig
  }
}
