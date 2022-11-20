'use strict'

module.exports = {
  get username() {
    // 为了防止恶意获取token,我们请求时，在前端加上一个字符串。"llm2zh"
    // === 'null' ? null : this.request.header.token;
    const token = this.request.header.token
    // { username: 'jszhen', iat: 1625725784 }
    const tokenCache = token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined
    return tokenCache ? tokenCache.username : undefined
  }
}
