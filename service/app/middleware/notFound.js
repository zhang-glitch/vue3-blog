'use strict';

module.exports = options => {
  return async function adminauth(ctx, next) {
    // console.log("router", ctx.app.router)
    // router.stack[0].path;可以去除路由路径
    // 获取请求的url
    const url = ctx.request.url.split('?')[0];
    const result = ctx.app.router.stack.filter(item => item.regexp.test(url));
    // if (ctx.app.router.stack && ctx.app.router.stack.includes(url)) {
    if (result.length) {
      await next();
    } else {
      ctx.body = {
        status: 404,
        errMsg: '接口不存在'
      }
    }
  }
}
