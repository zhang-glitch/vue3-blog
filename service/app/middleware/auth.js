'use strict'

module.exports = options => {
  return async function adminauth(ctx, next) {
    // console.log('=========session-auth', ctx.session, ctx.username, ctx.session[ctx.username]);
    const url = ctx.request.url.split('?')[0]

    const sessionValue = ctx.session[ctx.username]
    // console.log(
    //   '============sessionvalue是否优质',
    //   url,
    //   ctx.username,
    //   sessionValue
    // ) // 有值
    // 获取请求传递的token
    const token = ctx.request.header.token
    // 判断前端和后端的token是否相等
    // const user = sessionValue === token
    const user = token
    // console.log('===============', ctx.header, sessionValue, '++++++++++++');
    // console.log('user', token, sessionValue, user);
    if (ctx.request.url.includes('admin') && !options.exclude.includes(url)) {
      if (!user) {
        console.log('未登录', token)
        ctx.body = { status: 1001, data: '用户未登录' }
      } else {
        console.log('登录', token)
        await next()
      }
    } else {
      await next()
    }
  }
}
