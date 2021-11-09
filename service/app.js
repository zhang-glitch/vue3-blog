// app.js

'use strict';

module.exports = app => {
  // 是否并发请求过多
  // app.config.coreMiddleware.push('interfaceLimit');
  // // 当前端请求接口时，先判断接口是否存在
  // app.config.coreMiddleware.push('notFound');
  app.config.coreMiddleware.push('auth');
};
